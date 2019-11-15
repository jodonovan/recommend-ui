import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateUser from "./components/create-user.component";
import Users from "./components/users.component";



function App() {
    return (<Router>
            <div className="App">
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <a className="navbar-brand"><strong>TSG Spark Hackathon - Ed Content Recommendations Service</strong></a>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                            </ul>
                        </div>
                    </nav>
                </header>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Switch>
                                <Route exact path='/' component={CreateUser} />
                                <Route path="/create-user" component={CreateUser} />
                                <Route path="/users" component={Users} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;