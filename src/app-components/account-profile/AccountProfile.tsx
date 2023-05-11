import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space, Tabs, TabsProps, Typography } from 'antd';
import React from 'react';
import ProfileDetail from './profile-detail/ProfileDetail';

const { Text } = Typography;

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Detail`,
    children: <ProfileDetail />,
  },
  {
    key: '2',
    label: `Login Logs`,
    children: `Login logs`,
  },
];

const AccountProfile: React.FC = () => {
  return (
    <>
      <Space size={24}>
        <Badge dot>
          <Avatar shape='square' icon={<UserOutlined />} />
        </Badge>
        <Space direction='vertical'>
          <Text strong>mrdatngo@gmail.com</Text>
          <Text>Adminitrator</Text>
        </Space>
      </Space>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
    </>
  );
};

export default AccountProfile;
