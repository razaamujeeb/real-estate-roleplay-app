import Link from 'next/link';

export default function Home() {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src="https://1o1-estate.co.jp/wp-content/uploads/logo02.jpeg"
        style={{
          width: '300px',
          height: 'auto',
          marginBottom: '50px' // ★ロゴとボタンの距離調整
        }}
      />

      <Link href="/mode">
        <button
          style={{
            backgroundColor: '#222',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 28px',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s',
          }}
        >
          Start
        </button>
      </Link>
    </div>
  );
}
