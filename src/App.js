import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';
import './App.css';

import Home from './containers/home';
import Lottery from './containers/lottery';
import Auction from './containers/auction';

class App extends Component {
  render() {
    return (
        <HttpsRedirect>
            <Router>
                <div className='app'>
                    <header className='app-header'>
                        <h1 className='app-title'>THE AMERICAN DREAM</h1>
                        <div className='menu'>
                            <ul>
                                <li> <Link to='/'>GOVERNANCE</Link> </li>
                                <li> <Link to='/lottery'>LOTTERY</Link> </li>
                                <li> <Link to='/auction'>AUCTION</Link> </li>
                            </ul>
                        </div>
                    </header>                    
                    <div className='App-intro'>
                        <Switch>
                            <Route exact path='/'  component={Home} />
                            <Route path='/lottery'  component={Lottery} />
                            <Route path='/auction'  component={Auction} />
                            <Redirect to='/' />
                        </Switch>
                    </div>
                </div>
            </Router>
        </HttpsRedirect>
    );
  }
}

export default App;