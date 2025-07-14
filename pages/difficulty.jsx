import Link from 'next/link';

export default function Difficulty() {
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
      <h2 style={{ fontSize: '24px', marginBottom: '40px' }}>
        難易度を選択してください
      </h2>

      <Link href="/chat?level=hard">
        <button
          style={{
            backgroundColor: '#222',
            color: '#fff',
            fontSize: '18px',
            padding: '12px 28px',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s',
            marginBottom: '16px'
          }}
        >
          上級
        </button>
      </Link>

      <Link href="/chat?level=normal">
        <button
          style={{
            backgroundColor: '#222',
            color: '#fff',
            fontSize: '18px',
            padding: '12px 28px',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s',
            marginBottom: '16px'
          }}
        >
          中級
        </button>
      </Link>

      <Link href="/chat?level=easy">
        <button
          style={{
            backgroundColor: '#222',
            color: '#fff',
            fontSize: '18px',
            padding: '12px 28px',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s'
          }}
        >
          初級
        </button>
      </Link>
    </div>
  );
}
