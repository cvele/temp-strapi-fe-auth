import { FC, useEffect } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Typography,
} from 'antd';
import { Rule } from 'antd/lib/form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import useScreenSize from '../../../hooks/useScreenSize';
import { useTranslation } from 'react-i18next';

interface FormData {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const { t } = useTranslation();
  const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();
  const { signIn, user, isLoading, error } = useAuthContext();

  const emailRules: Rule[] = [
    { required: true, type: 'email', message: t('inputValidEmail') }
  ];

  const passwordRules: Rule[] = [
    { required: true, message: t('inputPassword') }
  ];

  useEffect(() => {
    if (user && !error) {
      navigate('/profile');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (code) {
        const provider = urlParams.get('provider');
        try {
          const response = await fetch(`${String(import.meta.env.VITE_API)}/auth/${provider}/callback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });
          const data = await response.json();
          if (data.access_token) {
            await signIn({
              identifier: data.email,
              password: data.password,
            });
            if (user && !error) {
              navigate('/profile');
            }
          }
        } catch (err) {
          console.error('Error:', err);
        }
      }
    };
    fetchData();
  }, [signIn, navigate]);

  const handleGoogleSignIn = async () => {
    const redirectUri = `${window.location.origin}${window.location.pathname}`;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;
    window.location.href = authUrl;
  };

  const onFinish = async (values: FormData) => {
    try {
      await signIn({
        identifier: values.email,
        password: values.password,
      });
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <>
      <Row align="middle">
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <Card title={t('signInTitle')}>
            {error && (
              <Alert
                className="alert_error"
                message={error}
                type="error"
                closable
              />
            )}
            <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
              <Form.Item label={t('emailLabel')} name="email" rules={emailRules}>
                <Input placeholder={t('emailPlaceholder')} />
              </Form.Item>
              <Form.Item label={t('passwordLabel')} name="password" rules={passwordRules}>
                <Input.Password placeholder={t('passwordPlaceholder')} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login_submit_btn">
                  {t('loginButton')} {isLoading && <Spin size="small" />}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="default" onClick={handleGoogleSignIn} className="login_submit_btn">
                {t('signInWithGoogle')}
                </Button>
              </Form.Item>
            </Form>
            <Typography.Paragraph className="form_help_text">
              {t('newToApp')} <Link to="/signup">{t('signUpLink')}</Link>
            </Typography.Paragraph>
            <Typography.Paragraph className="form_help_text">
              {t('forgotPasswordLead')} <Link to="/forgot-password">{t('forgotPasswordLink')}</Link>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;
