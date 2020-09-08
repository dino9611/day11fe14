import React from 'react';
import './App.css';
import Home from './pages/Home'
import Header from './components/Header'
import Hitungkata from './pages/hitungkata'
import Comment from './pages/comments'
import {Switch,Route} from 'react-router-dom'

function App() {

  return (
    <div >
      <Header/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/hitung' component={Hitungkata}/>
        <Route path='/comments/:robin' component={Comment}/>
      </Switch>
    </div>
  );
}

export default App;
