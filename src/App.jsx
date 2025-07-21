import React from 'react';
import SchemaBuilder from './components/SchemaBuilder';
import { Layout, Typography } from 'antd';

const { Title } = Typography;
const { Header, Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh', padding: '20px' }}>
      <Header style={{ background: '#fff', marginBottom: '20px' }}>
        <Title level={2}>HROne JSON Schema Builder</Title>
      </Header>
      <Content>
        <SchemaBuilder />
      </Content>
    </Layout>
  );
}

export default App;
