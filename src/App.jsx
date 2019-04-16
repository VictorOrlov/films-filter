import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import s from './App.module.css';
import HomePage from './pages/home-page';
import MarkedPage from './pages/marked-page';

const App = () => (
  <div className={s.wrapper}>
    <BrowserRouter>
        <Switch>
          <Route path="/" component={ HomePage } exact />
          <Route path="/search-result/:id" component={ MarkedPage } exact />
        </Switch>
    </BrowserRouter>
  </div>
);

export default App;
