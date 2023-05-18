import React, { useEffect, useState } from 'react';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { GetMenu, navRoutes } from '../router/router';
const { Header, Content, Footer, Sider } = Layout;
import { LogoutOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

import avt from '../assets/imgs/avatar.png';
import usa from '../assets/icons/usa.svg';
import { clearToken, clearUserInfo } from '../helpers/storage';

const DefaultLayout: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();

  const breadcrumbs = location.pathname
    .split('/')
    .filter((bc) => bc != '' && bc != '/');

  const userInfo = {
    name: 'admin',
  };

  const onLogout = () => {
    clearUserInfo();
    clearToken();
    location.href = '/login';
  };

  const headerDropdownitems: MenuProps['items'] = [
    {
      key: '0',
      label: userInfo.name,
    },
    {
      key: '1',
      label: (
        <Button
          style={{ float: 'right', marginBottom: '10px' }}
          type='primary'
          icon={<LogoutOutlined />}
          onClick={onLogout}
        >
          Logout
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const items = GetMenu(navRoutes);
    setItems(items);
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log(e);
    navigate(e.keyPath[0]);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu
          onClick={onClick}
          theme='dark'
          defaultSelectedKeys={[location.pathname]}
          mode='inline'
          items={items}
        />
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px' }}>
          <Header style={{ paddingLeft: '16px', background: colorBgContainer }}>
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                {breadcrumbs &&
                  breadcrumbs.map((breadcrumb, index) => (
                    <Breadcrumb.Item key={index}>{breadcrumb}</Breadcrumb.Item>
                  ))}
              </Breadcrumb>
              <div style={{ display: 'flex' }}>
                <div style={{ margin: '8px' }}>
                  <img src={usa} alt='lg' style={{ width: '32px' }} />
                </div>
                <div style={{ margin: '8px' }}>
                  <Dropdown
                    menu={{ items: headerDropdownitems }}
                    placement='bottomRight'
                    arrow
                  >
                    <img src={avt} alt='avatar' style={{ width: '32px' }} />
                  </Dropdown>
                </div>
              </div>
            </Space>
          </Header>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
