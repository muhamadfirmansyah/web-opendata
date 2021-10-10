import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import AppRoute from './Components/AppRoute';
import routes from './Config/routes';
import { AuthProvider } from './Context';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          { routes.map((route) => (
            <AppRoute 
              key={route.path}
              path={route.path}
              isPrivate={route.isPrivate}
              component={route.component} exact />
          )) }
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App;
