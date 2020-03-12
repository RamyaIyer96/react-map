import React from 'react';
import { Layout, Menu } from 'antd';

import './App.css';
import MapComponent from './components/Map';
const { Header, Content } = Layout;
function App() {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
        </Menu>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <div className="site-layout-content">
          <MapComponent />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
