import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { MenuProps } from 'rc-menu';
import { RouteObject } from 'react-router-dom';

import DefaultLayout from '../layout/DefaultLayout';
import LoginPage from '../pages/login/LoginPage';
import Page404 from '../pages/result/Page404';

import Counter from '@/app-components/counter/Counter';
import { lazy } from 'react';

const CreateUser = lazy(
  () => import('@/app-components/users-management/create-user/CreateUser')
);

const ListUser = lazy(
  () => import('@/app-components/users-management/list-user/ListUser')
);

const AccountProfile = lazy(
  () => import('@/app-components/account-profile/AccountProfile')
);

interface IRoute {
  path: string;
  title: string;
  icon?: any;
  children?: IRoute[];
  component?: any;
}

const navRoutes: IRoute[] = [
  {
    path: 'user',
    title: 'Users',
    icon: <TeamOutlined />,
    children: [
      {
        path: '/user/create',
        title: 'Create User',
        component: <CreateUser />,
      },
      {
        path: '/user/list',
        title: 'List Users',
        component: <ListUser />,
      },
    ],
  },
  {
    path: 'account',
    title: 'Account',
    icon: <UserOutlined />,
    children: [
      {
        path: '/account/profile',
        title: 'Profile',
        component: <AccountProfile />,
      },
    ],
  },
  {
    path: '/counter',
    title: 'Counter',
    icon: <UserOutlined />,
    component: <Counter />,
  },
];

const getRoutes = function (rawRoutes: IRoute[]): RouteObject[] {
  const routes: RouteObject[] = [];
  for (let i = 0; i < rawRoutes.length; i++) {
    const rawRoute = rawRoutes[i];
    if (!rawRoute.children) {
      routes.push({
        path: rawRoute.path,
        element: rawRoute.component,
      });
    } else {
      routes.push(...getRoutes(rawRoute.children));
    }
  }
  return routes;
};
const navRouters = getRoutes(navRoutes);

const browserRouters: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: 'Page not found',
  },
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <Page404 />,
    children: navRouters,
  },
];

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

function GetMenu(routes: IRoute[] | undefined): MenuItem[] {
  if (!routes) {
    return [];
  }
  const items: MenuItem[] = [];
  routes.map((route) => {
    if (!route.children) {
      items.push(getItem(route.title, route.path, route.icon));
    } else {
      const children = GetMenu(route.children);
      items.push(getItem(route.title, route.path, route.icon, children));
    }
  });
  return items;
}

export { navRoutes, GetMenu };
export type { IRoute };

export default browserRouters;
