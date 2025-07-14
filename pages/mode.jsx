import Link from 'next/link';

export default function Mode() {
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
        モードを選択してください
      </h2>

      <Link href="/difficulty">
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
          売買
        </button>
      </Link>

      <button
        disabled
        style={{
          backgroundColor: '#888',
          color: '#fff',
          fontSize: '18px',
          padding: '12px 28px',
          border: 'none',
          borderRadius: '12px',
          cursor: 'not-allowed',
          opacity: 0.6
        }}
      >
        賃貸（準備中）
      </button>
    </div>
  );
}
