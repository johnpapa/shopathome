import React, { Component, lazy, Suspense } from 'react';
import 'bulma/css/bulma.css';
import './styles.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { HeaderBar, NavBar, NotFound } from './components';
import Home from './Home';

const Products = withRouter(
  lazy(() => import(/* webpackChunkName: "products" */ './products/Products')),
);
const Discounts = withRouter(
  lazy(() => import(/* webpackChunkName: "discounts" */ './Discounts')),
);

class App extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <div className="section columns">
          <NavBar />
          <main className="column">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Redirect from="/" exact to="/home" />
                <Route path="/home" component={Home} />
                <Route path="/discounts" component={Discounts} />
                <Route path="/products" component={Products} />
                <Route exact path="**" component={NotFound} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
