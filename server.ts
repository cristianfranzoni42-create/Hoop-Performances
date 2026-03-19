import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Groq from "groq-sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory product store (initialized with sample data)
  let products = [
    {
      id: '1',
      name: 'LeBron 21 "Abalone"',
      brand: 'Nike',
      price: 199.99,
      description: 'The LeBron 21 has a cabling system that works with Zoom Air cushioning and a light, low-to-the-ground design, giving you agile fluidity and explosiveness without excess weight.',
      images: ['https://picsum.photos/seed/lebron21/800/800'],
      sizes: [42, 43, 44, 45, 46],
      colors: ['Green', 'Blue'],
      techSpecs: {
        grip: 'Multi-directional herringbone pattern for elite traction.',
        cushion: 'Zoom Air units in the heel and forefoot.',
        support: 'Flywire cables for a locked-in feel.'
      },
      category: 'performance',
      stock: 15
    },
    {
      id: '2',
      name: 'KD16 "Boardroom"',
      brand: 'Nike',
      price: 159.99,
      description: 'Kevin Durant is a true basketball purist. The KD16 features Nike Air and Zoom Air to provide speed and stability for all four quarters.',
      images: ['https://picsum.photos/seed/kd16/800/800'],
      sizes: [40, 41, 42, 43, 44],
      colors: ['Black', 'Grey'],
      techSpecs: {
        grip: 'Gear-like traction pattern.',
        cushion: 'Bottom-loaded forefoot Zoom Air unit.',
        support: 'Midfoot TPU shank for stability.'
      },
      category: 'performance',
      stock: 10
    },
    {
      id: '3',
      name: 'Curry 11 "Future Curry"',
      brand: 'Under Armour',
      price: 160.00,
      description: 'UA Flow cushioning is totally rubberless, making it light and ridiculously grippy. The UA Warp upper works like mini seat belts locking you in.',
      images: ['https://picsum.photos/seed/curry11/800/800'],
      sizes: [41, 42, 43, 44, 45],
      colors: ['White', 'Black', 'Blue'],
      techSpecs: {
        grip: 'UA Flow technology for insane grip.',
        cushion: 'Full-length UA Flow cushioning.',
        support: 'UA Warp upper for lightweight lockdown.'
      },
      category: 'performance',
      stock: 8
    }
  ];

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.post("/api/products", (req, res) => {
    const newProduct = {
      ...req.body,
      id: Math.random().toString(36).substr(2, 9),
      images: req.body.images || [`https://picsum.photos/seed/${Math.random()}/800/800`],
      sizes: req.body.sizes || [40, 41, 42, 43, 44, 45],
      colors: req.body.colors || ['Black', 'White'],
      stock: req.body.stock || 10
    };
    products.unshift(newProduct);
    res.status(201).json(newProduct);
  });

  app.post("/api/generate-shoes", async (req, res) => {
    const { brand, customPrompt } = req.body;
    const apiKey = process.env.GROQ_API_KEY;

    console.log("Generating shoes for brand:", brand);
    console.log("API Key present:", !!apiKey);

    if (!apiKey) {
      return res.status(500).json({ error: "GROQ_API_KEY non configurata nei Secrets di AI Studio." });
    }

    try {
      const existingProductNames = products.map(p => p.name).join(", ");
      const groq = new Groq({ apiKey });
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a world-class basketball performance expert and historian. Return ONLY a JSON object with a 'shoes' key containing a massive, comprehensive array of as many performance basketball shoes as possible (aim for 40-50 shoes) for the requested brand. 
            STRICT RULE: Only include shoes intended for actual ON-COURT performance. Do NOT include models that are now primarily used as lifestyle sneakers (e.g., avoid Air Jordan 1 through 14, Nike Dunks, Air Force 1s, or Adidas Superstars). 
            Focus on modern performance technology, current signature lines, and high-tech team models.
            Each shoe object MUST have: name, brand, price (number), description, techSpecs (object with grip, cushion, support strings), category (either 'performance' or 'collector'). 
            IMPORTANT: Do NOT include any of the following shoes as they are already in the catalog: ${existingProductNames}`
          },
          {
            role: "user",
            content: customPrompt 
              ? `Provide a massive, exhaustive list of ON-COURT performance basketball shoes based on this request: ${customPrompt}. Focus on brand: ${brand}. Exclude lifestyle sneakers. Aim for 40-50 unique models.`
              : `Provide a massive, exhaustive list of all notable current and technical on-court performance basketball shoes for the brand: ${brand}. Include all modern signature lines (e.g., LeBron 20+, KD 15+, Giannis Freak 5+, Curry 10+, etc.) and technical team models like the GT Cut, GT Jump, or Cosmic Unity. Aim for 40-50 unique models.`
          }
        ],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" }
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No content received from Groq");
      }

      console.log("Groq response received");
      const result = JSON.parse(content);
      res.json(result);
    } catch (error: any) {
      console.error("Groq API Error:", error);
      const errorMessage = error.message || "Errore sconosciuto durante la chiamata a Groq";
      res.status(500).json({ error: `Errore Groq: ${errorMessage}` });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
