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

import { useAppSelector } from '@/_redux/hooks';
import { AccountSelector } from '@/_redux/features/auth';

const { Text } = Typography;

const onChange = (key: string) => {
  console.log(key);
};

const AccountProfile: React.FC = () => {
  // const [account, setAccount] = useState<IAccountInfo>();

  // const loading = useAppSelector((state) => state.auth.account.loading);

  // const account = useAppSelector((state) => state.auth.account.accountData);

  const accountSelector = AccountSelector();

  const account = accountSelector.accountData;

  // useEffect(() => {
  //   getAccountInfo()
  //     .then((accountInfo) => {
  //       setbAccount(accountInfo);
  //     })
  //     .catch(() => {
  //       notification.error({
  //         message: 'Get user Info',
  //         description: 'Get user infor failed!',
  //       });
  //     });
  // }, []);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Detail`,
      children: (
        <ProfileDetail loading={accountSelector.loading} account={account} />
      ),
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
