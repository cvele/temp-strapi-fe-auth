import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../../context/AuthContext';

const EmailVerification = () => {
  const [message, setMessage] = useState('');
  const [hasConfirmation, setHasConfirmation] = useState<boolean | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { reloadUser, user, error } = useAuthContext();
  
  const confirmEmail = async (confirmation: string) => {
    const response = await fetch(`${import.meta.env.VITE_API}/auth/email-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ confirmation }),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const confirmation = urlSearchParams.get('confirmation');
    
    const verifyEmail = async () => {
      try {
        if (confirmation) {
          setHasConfirmation(true);
          await confirmEmail(confirmation);
          await reloadUser();
          if (user && !error  && !user.confirmed) {
            setMessage(t('Your email has been verified.'));
            navigate('/profile');
          }
        } else {
          setHasConfirmation(false);
          setMessage(t('Please verify your email. Check your email for a verification link.'));
        }
      } catch (error) {
        setMessage(t('An error occurred while confirming your email.'));
      }
    };
    
    verifyEmail();
  }, [location, navigate, t]);

  return (
    <Card title={t('emailVerificationTitle')}>
      {message ? (
        <Alert message={message} type={hasConfirmation ? "error" : "info"} showIcon />
      ) : (
        <Typography.Paragraph>
          {t('Verifying your email...')}
        </Typography.Paragraph>
      )}
    </Card>
  );
};

export default EmailVerification;
