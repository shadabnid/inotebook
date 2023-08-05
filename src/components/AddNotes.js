import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNotes = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setnote] = useState({title:"",description:"",tag:"default"});
    const handleclick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);

    }
    const onchange =(e)=>{
        setnote({...note,[e.target.name]: e.target.value});

    }
  return (
    <div className='container'>
    <h2>Add Note</h2>
    <form>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="title" 
        onChange={onchange}/>
        
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input type="text" className="form-control" id="description" name="description" placeholder="description" onChange={onchange}/>
      </div>
      <div className="form-group">
        <label htmlFor="tag">tag</label>
        <input type="text" className="form-control" id="tag" name="tag" placeholder="tag" onChange={onchange}/>
      </div>
      
      <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
    </form>
  </div>
  )
}

export default AddNotes;