import React from 'react';
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from 'react-admin';
import { Layout } from './Layout';
import dataProvider from './dataProvider';
import { ListaOnline } from './online';
import authProvider from './authProvider';
import { LoginPage } from './LoginPage';

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage} // Use custom login page
  >
    <Resource name="online" list={ListaOnline} />
  </Admin>
);