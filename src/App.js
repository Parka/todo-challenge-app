import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadTasks, createNewTask, changeTaskStatus, deleteTask} from './reducers/taskReducer';
import './App.css'

const App = () => {
    const [taskName, setTaskName] = useState('');
    const tasks = useSelector(state => state.taskReducer)

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(loadTasks());
    }, []);


    if(!tasks) return "Loading...";
    return (
        <div className="App">
            <form action="" onSubmit={e=>{
                dispatch(createNewTask(taskName));
                setTaskName('');
                e.preventDefault();
            }}>
                <input
                    value={taskName}
                    placeholder="First Task"
                    onChange={e => setTaskName(e.target.value)}
                />
                <button>Add</button>
            </form>
            <ul>
                {tasks.map(({id, done, name}) => (
                    <li key={id}>
                        <input
                            type="checkbox"
                            checked={done}
                            onChange={() => dispatch(changeTaskStatus(id, !done))}
                        />
                        {name} ({done ? 'Hecha' : 'Por hacer'})
                        <button onClick={() => dispatch(deleteTask(id))}>Borrar</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App;