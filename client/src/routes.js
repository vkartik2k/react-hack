import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home/home'
import NoMatch from './components/NoMatch/noMatch'
import SignIn from './components/SignIn/signIn'
import SignUp from './components/SignUp/signUp'

class Routes extends Component{
    render() {
        return (
            <Switch>
                <Route path="/" exact component = {Home}/>
                <Route path="/signin" exact component = {SignIn}/>
                <Route path="/signup" exact component = {SignUp}/>
                <Route component = {NoMatch}/>
            </Switch>
        )
    }
}

export default Routes