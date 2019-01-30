import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from "./pages/Home";
import ResultsPage from "./pages/ResultsPage";
import Layout from "./components/layout/Layout";

class App extends Component {
  render() {
    return (
        <Router className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/results/animations"
              render={() => <ResultsPage type="animation"/>}
            />
            <Route
              exact
              path="/results/repas"
              render={() => <ResultsPage type="repas"/>}
            />
          </Switch>
        </Router>
    );
  }
}

export default App;
