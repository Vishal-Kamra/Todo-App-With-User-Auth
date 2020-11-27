import React,{useEffect, useContext, useState} from "react"
import {signOut, todoCollection} from "../Firebase/Firebase"
import authContext from "../AuthProvider"

const Home = () =>{

    const {currentUser} = useContext(authContext)
    const [tasks, setTasks] = useState(null)
    const [newTask, setNewTask] = useState("")
    const [updatedTask, setUpdatedTask] = useState("")
    const [updatedId, setUpdatedId] = useState("")
    const [updateTaskWindow, setUpdateTaskWindow] = useState(false)

    useEffect(()=>{
        getTasks(currentUser.uid)
    },[])

    const getTasks = async(userId) => {
        await todoCollection.doc(userId).onSnapshot(doc => {
            if(doc.exists){
                setTasks(doc.data().todo || [])
            }
        })
    }

    const addTask = async(e) => {
        e.preventDefault()
        await todoCollection.doc(currentUser.uid).set(
            {
                "todo":[...tasks, {task:newTask,id:String(Math.random())}]
            }
        )
        setNewTask("")
    }

    const deleteTask = async(taskId) => {
        let newTaskList = tasks.filter(task =>{
            return task.id !== taskId
        })
        await todoCollection.doc(currentUser.uid).set({
            "todo":newTaskList
        })
    }

    const updateWindow = (task,taskId) =>{
        setUpdatedId(taskId)
        setUpdatedTask(task)
        setUpdateTaskWindow(true)
    }

    const updateTask = async(e,taskId) => {
        e.preventDefault()
        let newTaskList = tasks.filter(task =>{
            if(taskId === task.id){
                return task.task = updatedTask
            }
            return task
        })
        await todoCollection.doc(currentUser.uid).set({
            "todo":newTaskList
        })
        setUpdateTaskWindow(false)
        setUpdatedTask("")
    }

    const signout = () =>{
        signOut()
    }

    return(
        <>
            {currentUser.emailVerified ? null 
            : 
            <a href="#" className="email-verify">Your email address is not verified please verify it by clicking here.</a>}
            <button onClick={()=>signout()} className="sign-out">Sign Out</button>
            <div className="todo-container">
                <form onSubmit={(e)=>addTask(e)}>
                    <input type="text" value={newTask} onChange={(e)=>setNewTask(e.target.value)} />
                    <input type="submit" value="add" />
                </form>
                <div className="todo-list">
                    {tasks && tasks.map((data)=>{
                        return(
                            <div key={data.id}>
                                <span className="todo">{data.task}</span>
                                <button onClick={()=>updateWindow(data.task, data.id)} className="update">update</button>
                                <button onClick={()=>deleteTask(data.id)} className="delete">Delete</button>
                            </div>
                        )
                    })}
                    {updateTaskWindow && updatedTask && updatedId && 
                        <div>
                            <form onSubmit={(e)=>updateTask(e,updatedId)}>
                                <input type="text" value={updatedTask} onChange={(e)=>setUpdatedTask(e.target.value)} />
                                <input type="submit" value="update" />
                            </form>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Home;