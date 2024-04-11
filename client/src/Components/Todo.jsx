import React ,{useState,useRef,useEffect} from 'react'
import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import './Todo.css'

const Todo = () => {
    

    const [todo,setTodo] = useState("")
    const [todos,setTodos] = useState([])
    const [editId,setEditId] = useState(0)

   

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const addTodo = () => {
        if(todo !== ""){
        setTodos([...todos,{list : todo , id : Date.now() , status: false}])
        setTodo("")
        }
        if(editId) {
            const editTodo = todos.find((todo) => todo.id === editId)
            const updateTodo = todos.map((to) =>  to.id === editTodo.id
            ? (to = {id : to.id , list : todo}) 
            : (to = {id : to.id , list : to.list}))
            setTodos(updateTodo)
            setEditId(0)
            setTodo("")
        }
    }

    const inputRef = useRef("null")

    useEffect(() => {
         inputRef.current.focus()
    })

    const onDelete = (id) => {
        setTodos(todos.filter((todoValues) => todoValues.id !== id ))
    }

    const onComplete = (id) => {
        let complete = todos.map((list)=>{
            if(list.id === id){
                return ({...list, status : !list.status})
            }
            return list
        })
        setTodos(complete)
    }

    const onEdit = (id) =>{
       const editTodo =  todos.find((to)=>to.id === id)
       setTodo(editTodo.list)
       setEditId(editTodo.id)
    }




  return (
    <>
    <div className='todo-container'>
        
        <form  className='input-section' onSubmit={handleSubmit} action="">
        <h1>TODO APP</h1>
            <input  type="text" value={todo} ref={inputRef} placeholder='Enter Events...' onChange={(e) => setTodo(e.target.value)} />
            <button className='add-btn' onClick={addTodo} >{editId ? "EDIT EVENT" : "ADD EVENT"}</button>
        </form>
        <div className='task-field' >
            <ul>
                    {
                        todos.map((todoValues) => (
                            <li className='list-items' >
                            <div className='list-item-list' id={todoValues.status ? "list-item" : ""} >{todoValues.list}</div>
                            <span className='react-icons'>
                            <IoCheckmarkDoneOutline className='list-item-icons'  id='complete' title='Complete' 
                            onClick={()=>onComplete(todoValues.id)}/>

                            
                            <FaRegEdit className='list-item-icons'  id='edit' title='Edit' 
                            onClick={() =>onEdit(todoValues.id)} />


                            <IoTrashOutline  className='list-item-icons' id='delete' title='Delete' 
                            onClick={()=>onDelete(todoValues.id)}  />
                            </span>   
                            </li>
                        ))
                    }
            </ul>
        </div>
    </div>
    </>
    
  )
}

export default Todo