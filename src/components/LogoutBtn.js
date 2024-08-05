const LogoutButton = ({ onLogout }) => (
  <button onClick={onLogout} style={buttonStyle}>
    Logout
  </button>
);

// 버튼 스타일
const buttonStyle = {
  marginTop: '10px',
  padding: '8px 16px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default LogoutButton;
