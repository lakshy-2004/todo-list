import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';


import "./SignUp.css";
import HeadingComponent from './HeadingComponent';

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

   const [Inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
   });

  const change = (e) => {
    const {name, value} = e.target;
    setInputs({...Inputs,[name]: value});
  }

  const submit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(Inputs.email)) {
        toast.error("Please enter a valid email address");
        return;
    }

    if(Inputs.password.length<8){
      toast.error("Password Should Have Atleast 8 Characters");
      return;
    }

    try {
      await axios.post(`${window.location.origin}/api/v1/register`, Inputs).then((response) => {
      
        if(response.data.message === "User Already Exists"){
          toast.error(response.data.message);
        }else {
          setInputs(
            {
              email: "",
              username: "",
              password: "",
             }
          ) 
          dispatch(authActions.login());
          sessionStorage.setItem("id", response.data.others._id);
          history('/todo');
        }  
      });
    }catch (error) {
      toast.error("Something went wrong!");
    }
    
  }

  return (
    <div className='signup vh-100 d-flex justify-content-center align-items-center'>
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-8 col-lg-8 d-flex justify-content-center align-items-center order-2 order-md-1">
            <div className='d-flex flex-column justify-content-center align-items-center w-100 p-4'>
              <form className='d-flex flex-column w-100 p-4 justify-content-center align-items-center'>
                <input 
                  type="email" 
                  name="email" 
                  className='p-2 my-2 input-details' 
                  placeholder='Enter your Email' 
                  onChange={change}
                  value={Inputs.email}
                  
                />  
                <input 
                  className='p-2 my-2 input-details' 
                  type="text" 
                  name="username" 
                  placeholder='Enter your Username' 
                  onChange={change}
                  value={Inputs.username}
                  
                />
                <input 
                  className='p-2 my-2 input-details' 
                  autoComplete='off'
                  type="password" 
                  name="password" 
                  placeholder='Enter your Password' 
                  onChange={change}
                  value={Inputs.password}
                  
                />
                <button 
                type="submit"
                className='btn-signup input-details p-2'
                onClick={submit}
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 d-flex justify-content-center align-items-center order-1 order-md-2 mb-4 mb-md-0">
            <HeadingComponent first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
