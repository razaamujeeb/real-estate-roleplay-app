import { useRouter } from 'next/router';

export default function Result() {
  const router = useRouter();
  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2>セールス評価</h2>
      <p>スコア: <strong>72点</strong></p>
      <p>改善点: お客様の条件確認を早めに行いましょう。</p>
      <button onClick={() => router.push('/scenario')} style={{ marginTop: '40px', backgroundColor: '#999' }}>BACK</button>
    </div>
  );
}
