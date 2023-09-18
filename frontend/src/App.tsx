import { Col, Layout, Row } from 'antd';
import AppHeader from './components/AppHeader/AppHeader';
import AppRoutes from './Routes';

const { Header, Content } = Layout;

const App = () => {
  console.log(import.meta.env.VITE_API)
  return (
    <Row gutter={[0, 32]}>
      <Col span={24}>
        <Header>
          <AppHeader />
        </Header>
      </Col>
      <Col span={22} offset={1}>
        <Content>
          <AppRoutes />
        </Content>
      </Col>
    </Row>
  );
};

export default App;
