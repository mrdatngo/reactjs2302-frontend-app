import { Button, Space, Switch, Tag, Typography } from 'antd';

const { Text } = Typography;

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const ProfileDetail: React.FC = () => {
  return (
    <>
      <Space size={24} direction='vertical'>
        <Space>
          <Text type='secondary'>Username</Text>
          <Text strong>admin</Text>
        </Space>
        <Space>
          <Text type='secondary'>Status</Text>
          <Text strong>
            <Switch defaultChecked onChange={onChange} />
          </Text>
        </Space>
        <Space>
          <Text type='secondary'>Password: ***</Text>
          <Text strong>
            <Button type='primary'>Change password</Button>
          </Text>
        </Space>
        <Space>
          <Text type='secondary'>
            Two Factor Authentication: <Tag color='red'>red</Tag>
            <Tag color='green'>green</Tag>
          </Text>
          <Text strong>
            <Button type='primary'>Enable/Disable</Button>
          </Text>
        </Space>
      </Space>
    </>
  );
};

export default ProfileDetail;
