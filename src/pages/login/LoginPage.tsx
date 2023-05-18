import React from 'react';
import { Button, Card, Checkbox, Form, Input, notification, Space } from 'antd';

import './style.css';
import { login } from '../../apis/auth';
import { saveToken, saveUserInfo } from '../../helpers/storage';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    // call api
    login(values)
      .then((data) => {
        // saveToken
        saveToken(data.token);
        // saveUserInfo
        // saveUserInfo({
        //   username: data.username,
        // });

        notification.success({
          message: 'Login',
          description: 'Login successful!',
        });

        // redirect to homepage
        navigate('/');
      })
      .catch((err) => {
        let description = 'Something went wrong!';
        if (err.response.data && err.response.data.message) {
          description = err.response.data.message;
        }
        notification.error({
          message: 'Login',
          description,
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Space direction='horizontal' className='login-container'>
      <Card
        title='Login'
        extra={<a href='#'>Register</a>}
        style={{ width: 500 }}
      >
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='remember'
            valuePropName='checked'
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
}

export default LoginPage;
