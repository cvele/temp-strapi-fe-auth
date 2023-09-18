import { FC } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const ResetPasswordLinkSent: FC = () => {
  const { t } = useTranslation();

  return (
    <Row justify="center" align="middle">
      <Col span={12}>
        <Card>
          <Title level={3}>{t('resetPasswordLinkSentTitle')}</Title>
          <Text>{t('resetPasswordLinkSentMessage')}</Text>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPasswordLinkSent;
