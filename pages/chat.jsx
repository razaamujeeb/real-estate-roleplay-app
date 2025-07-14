
"use client";
import { useEffect, useState } from "react";

export default function Chat({ searchParams }) {
  const level = searchParams?.level || "normal";
  const [character, setCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchCharacter = async () => {
      const res = await fetch("/data/characters.json");
      const allCharacters = await res.json();
      const filtered = allCharacters.filter((character) => {
        if (level === "hard") return character.difficulty === "high";
        if (level === "normal") return character.difficulty === "medium";
        if (level === "easy") return character.difficulty === "low";
        return true;
      });
      const randomCharacter =
        filtered[Math.floor(Math.random() * filtered.length)];
      setCharacter(randomCharacter);

      const greeting = getGreeting(randomCharacter);
      setMessages([{ role: "assistant", content: greeting }]);
    };

    fetchCharacter();
  }, [level]);

  const getGreeting = (character) => {
    const { age, occupation, personality, family, nationality } = character;

    if (nationality !== "日本") {
      return "Hi, I'm looking for a place to live in Japan.";
    }
    if (age >= 60) {
      return "こんにちは。年齢的にも落ち着いた場所を探してまして…";
    }
    if (family.includes("子ども")) {
      return "こんにちは。子どもがいるので学区や環境が気になります。";
    }
    if (["投資家", "会社役員", "起業家", "大学教授"].includes(occupation)) {
      return "こんにちは。条件が多いですが、的確に提案していただけると助かります。";
    }
    if (["主婦", "保育士", "看護師", "美容師"].includes(occupation)) {
      return "こんにちは。生活しやすい場所を探していて…よろしくお願いします。";
    }
    if (personality.includes("社交的") || personality.includes("明るい")) {
      return "こんにちは！今日はよろしくお願いします！";
    }
    if (personality.includes("内向") || personality.includes("慎重")) {
      return "こんにちは。少し緊張していますが、よろしくお願いします。";
    }
    if (personality.includes("論理的") || personality.includes("冷静")) {
      return "こんにちは。条件を整理してお伝えできればと思います。";
    }

    return "こんにちは。不動産について相談させてください。";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const systemPrompt = character
      ? `あなたは「${character.name}」という顧客です。不動産の購入を検討しています。不動産スタッフ（ユーザー）と自然な会話の中で、自分の年齢、職業、家族構成、希望条件などを徐々に伝えてください。会話が一方的にならないよう、相手に質問されたら丁寧に応答してください。`
      : "あなたは不動産を探している顧客です。社員のセールスパフォーマンスを向上させる為に、なるべく実例に基づいた、自然な会話をしてください。";

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          ...newMessages,
        ],
      }),
    });

    const data = await res.json();
    if (data.error || !data.reply) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "OpenAIの返答が空でした。" },
      ]);
    } else {
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    }
  };

  return (
    <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh", padding: "20px" }}>
      {character && (
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
          {character.name} {character.age}歳（{character.occupation} / {character.nationality}）<br/>
        </div>
      )}
      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            background: msg.role === "user" ? "#007bff" : "#e0e0e0",
            color: msg.role === "user" ? "white" : "black",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
            maxWidth: "70%",
            marginLeft: msg.role === "user" ? "auto" : "0",
          }}
        >
          {msg.content}
        </div>
      ))}
      <div style={{ display: "flex", marginTop: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
        />
        <button
          onClick={sendMessage}
          style={{
            background: "#333",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            marginLeft: "10px",
            borderRadius: "8px",
          }}
        >
          送信
        </button>
      </div>
    </div>
  );
}
