import React from 'react';
import { Link } from 'react-router-dom';

import "./Home.css";

const Home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
        <div className="container d-flex justify-content-center align-items-center flex-column text-center">
            <h1>
                Organize your <br /> work and life, finally.
            </h1>
            <p>Keep track on your tasks and stay on top of things with our simple-to-use to-do list. Put in your tasks, mark them off as you complete them, and remain productive each day. Whether work, school, or personal objectives are on your plate, we help you get everything done!</p>
          
            <Link to='/todo'>
            <button className='home-btn p-2'>Make Todo List</button>
            </Link>
            
        </div>
    </div>
  )
}

export default Home