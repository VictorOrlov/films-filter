import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import s from './App.module.css';
import HomePage from './pages/home-page';
import MarkedPage from './pages/marked-page';
import Header from './organisms/header';

const App = () => (
  <div className={s.wrapper}>
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" component={ HomePage } exact />
          <Route path="/markers" component={ MarkedPage } exact />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  </div>
);

export default App;
