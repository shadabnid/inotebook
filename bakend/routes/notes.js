const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const router = express.Router();

/*===================================================================================== 
      Route 1 -    get all notes using :GET "/api/auth/getuser". login require  
=======================================================================================*/
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
    const notes = await Notes.find({user:req.user.id});
    res.json(notes);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})
/*===================================================================================== 
      Route 2 -    add a new  notes using :POST "/api/auth/addnote". login require  
=======================================================================================*/

router.post('/addnotes',fetchuser,[body('title', "Enter title").isLength({ min: 3 }),
body('description', "Enter description").isLength({ min: 5 })],async (req,res)=>{
    try{
    const {title,description,tag} = req.body;
    //if any error occured then return bad request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const note = new Notes({
        title,description,tag,user:req.user.id
    })
    const savenote = await note.save();
    res.json(savenote);
   }
   catch(error){
    console.error(error.message);
    res.status(500).send("some error occured");
   }
})
/*===================================================================================== 
      Route 3 -    update existing notes using :PUT "/api/auth/addnote". login require  
=======================================================================================*/
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag} = req.body;
    //create new note object
    const newNote ={};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(title){newNote.tag = tag};

    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send("not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.send(note);
})

/*===================================================================================== 
      Route 4 -    delete existing notes using :PUT "/api/auth/deletenote". login require  
=======================================================================================*/
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    
   
    

    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send("not found")}
   //allow deletion only if user owns the note
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
    }
    note = await Notes.findOneAndRemove(req.params.id);
    res.send({"success":"note has been deleted",note:note});
})
module.exports = router;