import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, SignUp, Board, BoardDetail } from 'pages';
import Menu from 'components/Menu';

class App extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/signup" component={SignUp} />
                <Switch>
                    <Route path="/board/:name" component={BoardDetail} />
                    <Route path="/board" component={Board} />
                </Switch>
                {/* <Route exact path="/DashBoard" component={DashBoard}/>
                <Route exact path="/workloads" component={Workloads}/> */}
                {/* <Switch>
                    <Route path="/about/:name" component={About}/>
                    <Route path="/about" component={About}/>
                </Switch> */}
            </div>
        );
    }
}

export default App;