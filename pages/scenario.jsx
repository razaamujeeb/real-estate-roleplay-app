import { useRouter } from 'next/router';

export default function Scenario() {
  const router = useRouter();
  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2 style={{ fontWeight: '600', marginBottom: '30px' }}>シナリオを選んでください</h2>
      <div style={{ margin: '20px' }}>
        <button onClick={() => router.push('/chat')} style={{ marginRight: '10px' }}>売買</button>
        <button disabled style={{ backgroundColor: '#ccc' }}>賃貸（準備中）</button>
      </div>
      <button onClick={() => router.push('/')} style={{ marginTop: '40px', backgroundColor: '#999' }}>BACK</button>
    </div>
  );
}
