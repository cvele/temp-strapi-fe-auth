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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useScreenSize from '../../../hooks/useScreenSize';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../../context/AuthContext';

interface FormValues {
  username?: string;
  email?: string;
  password?: string;
  provider?: string; 
}

const SignUp: FC = () => {
  const { t } = useTranslation();
  const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signUp, error, isLoading } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      if (code) {
        const provider = urlParams.get('provider');
        try {
          const response = await fetch(`${import.meta.env.VITE_API}/auth/${provider}/callback${location.search}`);
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
    if (user && !error) {
      navigate('/profile');
    }
  }, [user, navigate, location]);

  const usernameRules: Rule[] = [{ required: true, message: t('usernameRequiredMessage') }];
  const emailRules: Rule[] = [{ required: true, type: 'email', message: t('emailRequiredMessage') }];
  const passwordRules: Rule[] = [{ required: true, message: t('passwordRequiredMessage') }];

  const onFinish = async (values: FormValues) => {
    try {
      const redirectUri = `${window.location.origin}${window.location.pathname}?provider=${values.provider}`;
      // const redirectUri = `${import.meta.env.VITE_API}/connect/google/callback`
      if (values.provider === 'google') {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;
        window.location.href = authUrl;
      } else {
        await signUp({
          username: values.username as string,
          email: values.email as string,
          password: values.password as string,
        });
        if (!error) {
          navigate('/email-verification')
        };
      }
    } catch (error: any) {
      console.error(error);
    }
  };


  const urlParams = new URLSearchParams(location.search);
  const isEmailVerficationLink = urlParams.get('ev');
  console.log(isEmailVerficationLink);

  return (
    <>
      <Row align="middle">
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <Card title={t('signUpTitle')}> 
            {error && (
              <Alert
                className="alert_error"
                message={t(error)}  
                type="error"
                showIcon
                closable
                afterClose={() => {t(error)}}
              />
            )}
            {isEmailVerficationLink && (
              <Alert
                className="alert_info"
                message={t('emailVerificationMessage')} 
                type="info"
                showIcon
                closable
              />
            )}
            <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
              <Form.Item label={t('usernameLabel')} name="username" rules={usernameRules}>
                <Input placeholder={t('usernamePlaceholder')} /> 
              </Form.Item>
              <Form.Item label={t('emailLabel')} name="email" rules={emailRules}>
                <Input placeholder={t('emailPlaceholder')} /> 
              </Form.Item>
              <Form.Item label={t('passwordLabel')} name="password" rules={passwordRules}>
                <Input.Password placeholder={t('passwordPlaceholder')} /> 
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login_submit_btn">
                  {t('registerButton')} {isLoading && <Spin size="small" />}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="default" onClick={() => onFinish({ provider: 'google' })} className="login_submit_btn">
                {t('signUpWithGoogle')}
                </Button>
              </Form.Item>
            </Form>
            <Typography.Paragraph className="form_help_text">
              {t('oldToApp')} <Link to="/signin">{t('signInLink')}</Link>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SignUp;
