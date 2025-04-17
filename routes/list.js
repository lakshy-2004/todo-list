import express from 'express';

import User from '../models/user.js';
import List from '../models/list.js';

const router = express.Router();

// router.get("/check" , (req,res) => {
//     res.send("YES");
// });

// create
router.post("/addTask", async (req,res) => {

    try {
        const {title, body, id} = req.body;
        const existingUser = await User.findById(id);

        if(existingUser){
            const list = new List({title, body, user: existingUser });
            await list.save().then(() => {
                res.status(200).json({list});
            })
            existingUser.list.push(list);
            await existingUser.save();
        }
    } catch (error) {
        console.log("Error while addTask ----", error);
    }

});

// update

router.put("/updateTasks/:id", async (req,res) => {
    try {
        const {title, body} = req.body; 

        const list = await List.findByIdAndUpdate(req.params.id,{title, body});
        list.save().then(() => res.status(200).json({message: "Taks Updated"}));
    } catch (error) {
        console.log("Error while addTask ----", error);
    }

});

// Delete

router.delete("/deleteTasks/:id", async (req,res) => {

    try {
        const {id} = req.body;
        const existingUser = await User.findByIdAndUpdate(
            id,
            {$pull : {list: req.params.id} } // remove the task from the user array list
        )
        if(existingUser){
            await List.findByIdAndDelete(req.params.id).then(() => {
                res.status(200).json({message : "Taks Deleted"});
            })
        }
    } catch (error) {
        console.log("Error while delete ----", error);
    }

});

// Read

router.get("/getTasks/:id", async (req,res) => {
    const list = await List.find({user: req.params.id}).sort({createdAt: -1});
    if(list.length !==0){
        res.status(200).json({list});
    }else {
        res.status(200).json({message: "No Tasks"});
    }
})


export default router;