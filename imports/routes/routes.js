import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import App from '../App'
import Signup from '../ui/Signup'
import Links from '../ui/Link'
import NotFound from '../ui/NotFound'
import Login from '../ui/Login'

const history = createBrowserHistory()
const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/links']

const onEnterPublicPage = () => {
  if(Meteor.userId()) {
    history.replace('/links')
  }
}

const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    history.replace('/')
  }
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = location.pathname
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/links')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/')
    console.log('not able')
  }
}

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} onEnter={onEnterPublicPage} />
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
      <Route path="/links" component={Links} onEnter={onEnterPrivatePage  } />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)
