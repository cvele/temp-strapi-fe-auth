import { FC, useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Alert } from 'antd';
import { Rule } from 'antd/lib/form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface FormData {
  email: string;
}

const ForgotPassword: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  const emailRules: Rule[] = [
    { required: true, type: 'email', message: t('inputValidEmail') }
  ];

  const handleForgotPassword = async (values: FormData) => {
    try {
      const response = await fetch(`${String(import.meta.env.VITE_API)}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email }),
      });

      if (response.status === 200) {
        navigate('/reset-password-link-sent');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred');
      }

    } catch (err) {
      setError('An error occurred');
      console.error(err);
    }
  };

  return (
    <>
      <Row align="middle">
        <Col span={8} offset={8}>
          <Card title={t('forgotPasswordTitle')}>
            {error && <Alert message={error} type="error" closable />}
            <Form name="forgotPassword" layout="vertical" onFinish={handleForgotPassword}>
              <Form.Item label={t('emailLabel')} name="email" rules={emailRules}>
                <Input placeholder={t('emailPlaceholder')} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t('sendResetLinkButton')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
