
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";  // ✅ 追加
import characters from "../data/characters"; // ✅ キャラ読み込み

export default function Chat() {
  const router = useRouter();
  const level = router.query.level || "normal"; // ✅ クエリから取得
  const [character, setCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!router.isReady) return; // ✅ これがないと最初 null のままになる
    const levelKey = ["easy", "normal", "hard"].includes(level) ? level : "normal";
    const levelCharacters = characters[levelKey];
    const randomCharacter = levelCharacters[Math.floor(Math.random() * levelCharacters.length)];
    setCharacter(randomCharacter);
    const greeting = getGreeting(randomCharacter);
    setMessages([{ role: "assistant", content: greeting }]);
  }, [router.isReady, level]);

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
      ? `あなたは以下の設定の不動産購入希望者として振る舞ってください：
名前：${character.name}
職業：${character.occupation}
国籍：${character.nationality}
年齢：${character.age}
家族構成：${character.family}
性格：${character.personality}

あなたは不動産購入を真剣に検討している顧客として振る舞い、以下のように会話を進めてください：
1. 不動産スタッフ（ユーザー）との対話を通じて、自然に自分の状況や希望を伝えてください
2. 年齢、職業、家族構成に合わせた具体的な希望条件（予算、広さ、場所など）について話してください
3. スタッフからの質問には丁寧に答え、適宜自分からも質問をしてください
4. 常に不動産購入を検討している顧客としての立場を維持してください

この設定を守りながら、自然な会話を心がけてください。`
      : "";

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
    {character.name}（{character.occupation} / {character.nationality}）<br/>
    年齢: {character.age} ／ 性格: {character.personality} ／ 家族構成: {character.family}
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
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }}
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
