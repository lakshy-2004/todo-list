import React,{useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from './store';

import Navbar from './components/navebar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import SignUp from './components/Signup/SignUp';
import SignIn from './components/Signup/SignIn'; 
import Todo from './components/Todo/Todo'; 

export const App = () => {

  const dispatch = useDispatch(); 

  useEffect(() => {
    const id = sessionStorage.getItem("id"); 
    if(id){
      dispatch(authActions.login());  
    }
    
  }, [])
  

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element = {<Home />} />
          <Route path='/about' element = {<About />} />
          <Route path='/todo' element = {<Todo />} />
          <Route path='/signup' element = {<SignUp />} />
          <Route path='/signin' element = {<SignIn />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App;