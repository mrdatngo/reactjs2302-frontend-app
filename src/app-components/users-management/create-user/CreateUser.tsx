import {
  Button,
  DatePicker,
  Form,
  Input,
  notification,
  Select,
  Space,
} from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createAUser } from '../../../apis/users';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function CreateUser() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: any) => {
    setLoading(true);
    createAUser({
      address: values.address,
      dateOfBirth: values.dateOfBirth,
      email: values.email,
      name: values.name,
      gender: values.gender,
    })
      .then((data) => {
        if (data.status) {
          notification.success({
            message: 'Create User',
            description: 'Create user successful!',
          });
        } else {
          notification.error({
            message: 'Create User',
            description: data.message,
          });
        }
      })
      .catch(() => {
        notification.error({
          message: 'Create User',
          description: 'Create user failed!',
        });
      })
      .finally(() => {
        setLoading(false);
      });
    return;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name='email'
        label='E-mail'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t('Name')}
        name='name'
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='DateOfBirth'
        name='dateOfBirth'
        rules={[
          { required: true, message: 'Please input your date of birth!' },
        ]}
      >
        <DatePicker format={'YYYY-MM-DD'} />
      </Form.Item>

      <Form.Item
        name='gender'
        label='Gender'
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <Select placeholder='select your gender'>
          <Option value='male'>Male</Option>
          <Option value='female'>Female</Option>
          <Option value='other'>Other</Option>
        </Select>
      </Form.Item>

      <Form.Item label='Address'>
        <Space.Compact>
          <Form.Item
            name={['address', 'province']}
            noStyle
            rules={[{ required: true, message: 'Province is required' }]}
          >
            <Select placeholder='Select province'>
              <Option value='HN'>Ha Noi</Option>
              <Option value='HCM'>Tp. Ho Chi Minh</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['address', 'street']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input style={{ width: '50%' }} placeholder='Input street' />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button loading={loading} type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateUser;
