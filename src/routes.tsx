import { Route, Switch } from 'react-router-dom';

import { Cart, Home } from './pages';

export function Routes() {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/cart' component={Cart} />
    </Switch>
  );
}
