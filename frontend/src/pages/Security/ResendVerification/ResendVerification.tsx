import { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'antd';
import { useAuthContext } from '../../../context/AuthContext';

const ResendVerification = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!user) return;
    if (user.confirmed) {
        setMessage('Your email has already been verified.');
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API}/auth/send-email-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessage('Verification email has been resent. Please check your inbox.');
    } catch (error) {
      setMessage('An error occurred while resending the verification email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle">
      <Col span={12}>
        <Card title="Resend Verification Email">
          {message && <Alert message={message} type="info" showIcon closable />}
          
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Resend Verification Email
              </Button>
            </Form.Item>
          </Form>

        </Card>
      </Col>
    </Row>
  );
};

export default ResendVerification;
