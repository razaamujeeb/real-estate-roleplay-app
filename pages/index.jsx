import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <img
        src="https://1o1-estate.co.jp/wp-content/uploads/logo02.jpeg"
        alt="不動産ロールプレイ教育"
        style={{ width: '300px', marginBottom: '40px' }}
      />
      <button onClick={() => router.push('/scenario')}>START</button>
    </div>
  );
}
