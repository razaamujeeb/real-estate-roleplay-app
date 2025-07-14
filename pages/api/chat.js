export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages,
      }),
    });

    const data = await response.json();

    // コンソールに表示してデバッグ
    console.log("🔍 OpenAI API Response:", JSON.stringify(data, null, 2));

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(200).json({ reply: "⚠️ OpenAIの返答が空でした。" });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("❌ OpenAI API error:", error);
    return res.status(500).json({ reply: "サーバーエラーが発生しました。" });
  }
}
