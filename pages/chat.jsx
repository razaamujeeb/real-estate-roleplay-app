import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [profile, setProfile] = useState({});
  const [recognition, setRecognition] = useState(null);

  const names = ['佐藤優太', '田中美咲', '鈴木健', '高橋彩花'];
  const personalities = ['やや頑固', 'とても協力的', '慎重で静か', '積極的'];
  const ages = [28, 35, 42, 50];

  useEffect(() => {
    const randomProfile = {
      name: names[Math.floor(Math.random() * names.length)],
      age: ages[Math.floor(Math.random() * ages.length)],
      personality: personalities[Math.floor(Math.random() * personalities.length)]
    };
    setProfile(randomProfile);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
  };

  const handleSpeech = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('このブラウザは音声認識に対応していません');
      return;
    }
    const recog = new webkitSpeechRecognition();
    recog.lang = 'ja-JP';
    recog.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };
    recog.start();
    setRecognition(recog);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>氏名: {profile.name}（{profile.age}歳）</h3>
      <p>性格: {profile.personality}</p>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px', marginTop: '20px', background: '#fff', borderRadius: '8px' }}>
        {messages.map((msg, idx) => (
          <p key={idx} style={{ textAlign: msg.from === 'user' ? 'right' : 'left' }}>{msg.text}</p>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input value={input} onChange={e => setInput(e.target.value)} style={{ width: '70%', padding: '8px' }} />
        <button onClick={handleSend}>送信</button>
        <button onClick={handleSpeech}>🎙️</button>
      </div>
      <button onClick={() => router.push('/result')} style={{ marginTop: '30px' }}>終了 → 評価を見る</button>
    </div>
  );
}
