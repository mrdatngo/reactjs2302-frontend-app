import React from 'react';
import { Button, Card, Checkbox, Form, Input, notification, Space } from 'antd';

import './style.scss';
import { login } from '../../apis/auth';
import { saveToken } from '../../helpers/storage';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    login(values)
      .then((data) => {
        saveToken(data.token);
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
        title={t('Login')}
        extra={<a href='#'>{t('Register')}</a>}
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
            label={t('Username')}
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('Password')}
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
            <Checkbox>{t('Remember me')}</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              {t('Submit')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
}

export default LoginPage;
