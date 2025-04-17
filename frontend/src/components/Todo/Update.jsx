import React, {useState , useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Update = ({update_div , update}) => {
  // console.log(update.title);
  // console.log(update.body);
  

  const [Inputs, setInputs] = useState({
    title: update?.title || '',
    body: update?.body || '',
  });

  // UseEffect to update state when update prop changes
  useEffect(() => {
    setInputs({
      title: update?.title || '',
      body: update?.body || '',
    });
  }, [update]); // Runs whenever `update` changes


  // console.log(Inputs);
  
  const change = (e) => {
    const {name, value} = e.target;
    setInputs({
      ...Inputs,
      [name]: value
    })
  }

  const submit = async () => {
    // console.log(update);
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title Or Body Should Not Be Empty");
      return;
    }
    try {
      await axios.put(`${window.location.origin}/api/v2/updateTasks/${update._id}`, {title: Inputs.title , body: Inputs.body}).then((response) => {
        toast.success("Your Task Is Updated");
      })
    }catch (error) {
      toast.error("Something went wrong!");
    }

    update_div("none");
  } 

  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
        <h3>Update Your Task</h3>
        <input type="text" className='todo-inputs my-4 w-100 p-3' value={Inputs.title} onChange={change} name='title'/>
        <textarea className='todo-inputs w-100 p-3' value={Inputs.body} onChange={change} name='body'/>
        <div>
            <button 
            className="btn btn-dark my-4"
            onClick={submit}
            >
              Update
            </button>
            <button 
            className="btn btn-danger my-4 mx-3" 
            onClick={() => {
              update_div("none");
            }}
            >
                Close
            </button>
        </div>
    </div>
  )
}

export default Update