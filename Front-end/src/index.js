import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import {  Router, Route, Switch } from "react-router-dom";
import ReactChatBot from './chatBot';


var hist = createBrowserHistory();

ReactDOM.render(
  <Router  history={hist}>
    <Switch>
    {/* routes */}
      <Route exact path="/chatbot" component={ReactChatBot} />

    </Switch>
  </Router>,
  document.getElementById("root")
);