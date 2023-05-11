import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Page404() {
  const navigate = useNavigate();

  const backHome = () => {
    navigate('/');
  };

  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button onClick={backHome} type='primary'>
          Back Home
        </Button>
      }
    />
  );
}

export default Page404;
