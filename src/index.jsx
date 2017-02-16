//import 'normalize.css'
import 'material-icons/css/material-icons.css'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'

import React, { Component } from 'react'
import { render } from 'react-dom'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { createStore } from 'redux'
import reducers from './reducers/reducers'

import { Provider } from 'react-redux'

import App from './components/App'
import TaskList from './components/TaskList'
import TaskDetail from './components/TaskDetail'

const store = createStore(reducers)
window.s = store
window.s.dispatch({ type: "ADD_TASK", "name": "xD", "id": window.s.getState().taskCount })

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={TaskList} />
        <Route path="/tasks/:id" component={TaskDetail} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))