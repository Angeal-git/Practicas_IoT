import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Falta el prompt" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(`
      Actúa como un diseñador web experto. Genera solo código CSS (sin texto adicional)
      para aplicar el siguiente estilo a una página HTML existente: ${prompt}.
      Usa selectores comunes como body, h1, p, button, input, etc.
    `);

    const css = result.response.text().replace(/```css|```/g, "").trim();
    res.status(200).json({ css });
  } catch (error) {
    console.error("Error al generar el estilo:", error);
    res.status(500).json({ error: "Error al generar el estilo" });
  }
}
