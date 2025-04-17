import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from 'react-toastify';


const TodoCards = ({title, body , id , delid , update_div , updateId , toBeUpdate}) => {

  const checkCondition = () => {
    if(id){
        update_div("block");
        toBeUpdate(updateId);
    }else {
        toast.error("Please SignUp First");
    }
  }

  return (
    
    <div className='p-3 todo-card'>
        <div>
            <h5>{title}</h5>
            <p className='todo-card-p'>
                {body.split("",77)}
            </p>
        </div>
        <div className='d-flex justify-content-around '>
            <div  
            className='d-flex justify-content-center align-items-center card-icon-head px-2 py1'
            onClick={checkCondition}
            >
                <MdOutlineEdit className='card-icons'/>Edit
            </div>
            <div 
            className='d-flex justify-content-center align-items-center card-icon-head px-2 py1 text-danger'
            onClick={() => {
                delid(id);
            }}
            >
                <MdDelete className='card-icons del'/>Delete
            </div> 
        </div>
    </div>
  )
}

export default TodoCards