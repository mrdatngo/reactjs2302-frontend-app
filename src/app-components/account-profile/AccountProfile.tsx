import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Badge,
  notification,
  Space,
  Tabs,
  TabsProps,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { getAccountInfo } from '../../apis/auth';
import { IAccountInfo } from '../../types/account';
import ProfileDetail from './profile-detail/ProfileDetail';

const { Text } = Typography;

const onChange = (key: string) => {
  console.log(key);
};

const AccountProfile: React.FC = () => {
  const [account, setAccount] = useState<IAccountInfo>();

  useEffect(() => {
    getAccountInfo()
      .then((accountInfo) => {
        setAccount(accountInfo);
      })
      .catch(() => {
        notification.error({
          message: 'Get user Info',
          description: 'Get user infor failed!',
        });
      });
  }, []);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Detail`,
      children: <ProfileDetail account={account} />,
    },
    {
      key: '2',
      label: `Login Logs`,
      children: `Login logs`,
    },
  ];

  return (
    <>
      <Space size={24}>
        <Badge dot>
          <Avatar shape='square' icon={<UserOutlined />} />
        </Badge>
        <Space direction='vertical'>
          <Text strong>{account?.email}</Text>
          <Text>{account?.role}</Text>
        </Space>
      </Space>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
    </>
  );
};

export default AccountProfile;
