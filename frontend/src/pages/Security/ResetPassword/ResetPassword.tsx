import { FC, useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface FormData {
    password: string;
    passwordConfirmation: string;
}


const ResetPassword: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const [error, setError] = useState<string | null>(null);

    const handleResetPassword = async (values: FormData) => {
        try {
            const response = await fetch(`${String(import.meta.env.VITE_API)}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code, password: values.password, passwordConfirmation: values.passwordConfirmation }),
            });

            const responseData = await response.json();

            if (response.status === 200) {
                navigate('/signin');
            } else {
                if (responseData.error && responseData.error.name === 'ValidationError') {
                    setError(responseData.error.message || 'Validation error');
                } else {
                    setError(responseData.message || 'An error occurred');
                }
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
                    <Card title={t('resetPasswordTitle')}>
                        {error && <Alert message={error} type="error" closable />}
                        <Form name="resetPassword" layout="vertical" onFinish={handleResetPassword}>
                            <Form.Item label={t('newPasswordLabel')} name="password">
                                <Input.Password placeholder={t('newPasswordPlaceholder')} />
                            </Form.Item>
                            <Form.Item label={t('confirmPasswordLabel')} name="passwordConfirmation">
                                <Input.Password placeholder={t('confirmPasswordPlaceholder')} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    {t('resetPasswordButton')}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ResetPassword;
