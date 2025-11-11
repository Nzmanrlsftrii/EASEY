export default async function handler(req, res) {
  try {
    const { message } = await req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Kamu adalah asisten NisaaTalk yang lembut, menenangkan, dan peduli pada perasaan pengguna." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || "Maaf, aku tidak bisa menjawab itu sekarang." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan server." });
  }
}
