const LogoutButton = ({ onLogout }) => (
  <button onClick={onLogout} style={buttonStyle}>
    Logout
  </button>
);

const buttonStyle = {
  marginTop: '10px',
  padding: '8px 16px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default LogoutButton;
