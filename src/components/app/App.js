import React from 'react'
import './App.css'
import Header from '../Header/Header'
import List from '../List/List';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import Detail from '../Detail/Detail'

const App = () =>  {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Switch>
          <Route path='/' component={List} exact/>
          <Route path='/currency/:id' component={Detail} exact/>
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
