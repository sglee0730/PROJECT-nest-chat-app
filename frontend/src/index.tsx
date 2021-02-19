import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'antd/dist/antd.css'; 
import { Main } from './main';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie'

ReactDOM.render(
  <CookiesProvider>
  <RecoilRoot>
    <Main />
  </RecoilRoot>
  </CookiesProvider>
  ,
  document.getElementById('root')
);

