import { Alert, Button, Space } from "antd";
import { CgWebsite } from "react-icons/cg";
import { useAuthContext } from "../../context/AuthContext";

const AppHeader = () => {
  const { user, signOut } = useAuthContext();

  const UnconfirmedAlert = () => (
    <Alert
      message={
        <>
          Your email is not verified. 
          <Button href="/resend-verification" type="link">Resend verification email.</Button>
        </>
      }
      type="warning"
      showIcon
    />
  );

  const AuthButtons = () => (
    user ? (
      <>
        <Button className="auth_button_login" href="/profile" type="link">
          {user.username}
        </Button>
        <Button className="auth_button_signUp" type="primary" onClick={signOut}>
          Logout
        </Button>
      </>
    ) : (
      <>
        <Button className="auth_button_login" href="/signin" type="link">
          Login
        </Button>
        <Button className="auth_button_signUp" href="/signup" type="primary">
          SignUp
        </Button>
      </>
    )
  );

  return (
    <>
      {user && !user.confirmed && <UnconfirmedAlert />}
      <Space className="header_space">
        <Button className="header_space_brand" href="/" type="link">
          <CgWebsite size={64} />
        </Button>
        <Space className="auth_buttons">
          <AuthButtons />
        </Space>
      </Space>
    </>
  );
};

export default AppHeader;
