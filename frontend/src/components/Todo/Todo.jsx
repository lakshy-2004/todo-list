import React, {useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import './Todo.css';
import TodoCards from './TodoCards';
import Update from './Update';

let id = sessionStorage.getItem("id");
let toUpdateArray = [];

const Todo = () => {
    
    const [Inputs , setInputs] = useState({title:"", body:""});

    const [Array, setArray] = useState([]);
    
  const show = () => {
    document.getElementById('textarea').style.display= "block";
    }

  const change = (e) => {
    const {name , value} = e.target;
    setInputs({...Inputs, [name]:value});
  }

  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title Or Body Should Not Be Empty");
      return;
    }
  
    if (id) {
        try {
            await axios.post(`${window.location.origin}/api/v2/addTask`, {
                title: Inputs.title,
                body: Inputs.body,
                id: id
            });
          
            setInputs({ title: "", body: "" });
            toast.success("Your Task Is Added");
        } catch (error) {
            toast.error("Something went wrong!");
        }
    } else {
        setArray([...Array, Inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Your Task Is Added");
        toast.error("Your Task Is Not Saved! Please Sign Up");
    }

  }
  const dis = (value) => {
    document.getElementById("todo-update").style.display= value;
  }

  const del = async (cardit) => {
    // console.log(cardit); => task id 
    // console.log(id);     => use id
    if(id){
      try {
        await axios.delete(`${window.location.origin}/api/v2/deleteTasks/${cardit}`, {data: {id:id}}).then((response) => {
          toast.success("Your Task Is Deleted");
        })
      }catch (error) {
        toast.error("Something went wrong!");
      }
    }else {
      toast.error("Please SignUp First");
    }
  }   

  const update = (val) => {
    toUpdateArray =(Array[val]);
  }

  useEffect(() => {
    const fetch = async () => {
      try {

        id = sessionStorage.getItem("id");
        if(id){
          const response = await axios.get(`${window.location.origin}/api/v2/getTasks/${id}`);
          setArray(response.data.list);
      }
      
      }catch (error) {
        toast.error("Something went wrong!");
      }
    }
    fetch();  
  },[Array])

  return (
    <>
    <div className='todo'>
      <ToastContainer />
        <div className="container todo-main d-flex flex-column justify-content-center align-items-center">
            <div className='d-flex flex-column todo-inputs-div w-sm-100 p-1'>

            <input 
            type="text" 
            placeholder='TITLE' 
            className='todo-inputs my-2 p-2' 
            name='title'
            value={Inputs.title}
            onClick={show}
            onChange={change}
            />
            <textarea 
            id='textarea' 
            type="text" 
            placeholder='BODY' 
            className='todo-inputs  p-2'
            name='body'
            value={Inputs.body}
            onChange={change}
            />
            </div>

            <div className='home-btn-div w-sm-100 d-flex justify-content-end'>
            <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
            </div>
            
        </div>
        <div className="todo-body">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    {
                      Array && Array.map((item, index) => (
                          
                        <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                            <TodoCards
                            title= {item.title}
                            body= {item.body}
                            id={item._id}
                            delid={del}
                            update_div={dis}
                            updateId={index}
                            toBeUpdate={update}
                            />
                        </div>
                          
                      ))
                    }
                </div>
            </div>
        </div>
    </div>
    <div className="todo-update" id='todo-update'>
      <div className="container " >
        <Update 
        update_div={dis}
        update={toUpdateArray}
        /> 
      </div> 
    </div>
    </>
  )
}

export default Todo