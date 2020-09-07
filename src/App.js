import React from 'react';
import './App.css';
import Home from './pages/Home'
import Header from './components/Header'
import Comment from './pages/comments'
import {Switch,Route} from 'react-router-dom'
function App() {

  return (
    <div >
      <Header/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/comments/:robin' component={Comment}/>
      </Switch>
    </div>
  );
}

export default App;
