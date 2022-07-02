import { Route, Switch } from 'react-router-dom';

import { Home } from './pages';
import Cart from './pages/Cart';

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/cart' component={Cart} />
    </Switch>
  );
};

export default Routes;
