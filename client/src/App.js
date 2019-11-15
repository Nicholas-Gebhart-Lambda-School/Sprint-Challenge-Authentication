import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./utils/Route";

import LoginForm from "./components/forms/LoginForm";
import Jokes from "./components/private/Jokes";

const App = () => (
  <>
    <Switch>
      <PrivateRoute path="/jokes" component={Jokes} />
      <Route path="/" component={LoginForm} />
    </Switch>
  </>
);
export default App;
