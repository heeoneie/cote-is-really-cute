const LogoutButton = ({ onLogout }) => (
  <button onClick={onLogout} style={buttonStyle}>
    로그아웃
  </button>
);

const buttonStyle = {
  marginLeft: 'auto',
  padding: '8px 16px',
  fontSize: '16px',
  cursor: 'pointer',
  fontWeight: 'bold',
  border: 'none',
  backgroundColor: 'white',
};

export default LogoutButton;
