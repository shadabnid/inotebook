import { useState } from 'react'
import NoteContext from './noteContext';

const NotesState = (props) => {
  const host = "http://localhost:5000"
  const noteinitial = [];

  const [notes, setnote] = useState(noteinitial);
  //get all notes
  const getNotes = async()=>{
    const response =  await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzM2IwYmFlNzE1ZDRmZDg4NDU2MWExIn0sImlhdCI6MTY4MTE1MTkwM30.EO8vekTjx7MpZ-iJRWxn_VvO3eW6lWzFyoBEYCQ8oBg'
      }
      
    })
    const json = await response.json();
    setnote(json);
    
}
  //add note
  const addNote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzM2IwYmFlNzE1ZDRmZDg4NDU2MWExIn0sImlhdCI6MTY4MTE1MTkwM30.EO8vekTjx7MpZ-iJRWxn_VvO3eW6lWzFyoBEYCQ8oBg'
      },
      body: JSON.stringify({title,description,tag})

    });

    const json = await response.json();
    console.log(json);

    console.log("adding a new note");
   
    
    setnote(notes.concat(json));

  }
  //delete note
  const deleteNote = async(id) => {
   
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzM2IwYmFlNzE1ZDRmZDg4NDU2MWExIn0sImlhdCI6MTY4MTE1MTkwM30.EO8vekTjx7MpZ-iJRWxn_VvO3eW6lWzFyoBEYCQ8oBg'
      },
      

    });
    const json = await response.json();
    console.log(json);
    console.log(`deleting note witth id:${id}`);
    const newNote = notes.filter((note) => { return note._id !== id })
    setnote(newNote);
  }

  //edit note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzM2IwYmFlNzE1ZDRmZDg4NDU2MWExIn0sImlhdCI6MTY4MTE1MTkwM30.EO8vekTjx7MpZ-iJRWxn_VvO3eW6lWzFyoBEYCQ8oBg'
      },
      body: JSON.stringify({title,description,tag})

    });

    const json = response.json();
    for (let i = 0; i < notes.length; i++) {
      let element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider >
  )
}


export default NotesState;