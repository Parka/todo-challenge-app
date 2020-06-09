import * as env from '../env'
import axios from 'axios'
import { toast } from 'react-toastify';

const route = 'tasks'
const endpoint = `${env.api}/${route}`
const initialState = null


const getRequestConfig = token => ({
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

// SYNC ACTION GENERATORS
export const setTasksAction = ( tasks ) => ({
            type: 'SET_TASKS',
            payload: { tasks }
})

export const addNewTaskAction = ( task ) => ({
            type: 'ADD_NEW_TASK',
            payload: { task }
})

export const changeTaskStatusAction = ( taskId, task ) => ({
            type: 'CHANGE_TASK_STATUS',
            payload: { taskId, task }
})

export const deleteTaskAction = ( taskId ) => ({
            type: 'DELETE_TASK',
            payload: { taskId }
})


// ASYNC ACTION GENERATORS
export const loadTasks = () =>
    async (dispatch, getState) => {
        const token = getState().loginReducer;
        try {
            const result = await axios.get(endpoint, getRequestConfig(token))
            dispatch(setTasksAction( result.data ))
        } catch (e) {
            toast.error("Failed to get tasks from the server!")
        }
    }

export const createNewTask = (name) =>
    async (dispatch, getState) => {
        const token = getState().loginReducer;
        try {
            const result = await axios.post(endpoint, { name }, getRequestConfig(token))
            dispatch(addNewTaskAction( result.data ))
        } catch (e) {
            toast.error("Failed to add new task to the server!")
        }
    }

export const changeTaskStatus = (taskId, done) =>
    async (dispatch, getState) => {
        const token = getState().loginReducer;
        try {
            const result = await axios.patch(`${endpoint}/${taskId}`, { done }, getRequestConfig(token))
            console.log(result);
            dispatch(changeTaskStatusAction( taskId, result.data ))
        } catch ({response}) {
            dispatch(loadTasks())
            toast.error(response.data.message)
        }
    }

export const deleteTask = (taskId) =>
    async (dispatch, getState) => {
        const token = getState().loginReducer;
        try {
            await axios.delete(`${endpoint}/${taskId}`, getRequestConfig(token))
            dispatch(deleteTaskAction( taskId ))
        } catch ({response}) {
            dispatch(loadTasks())
            toast.error(response.data.message)
        }
    }

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TASKS': {
            return action.payload.tasks
        }
        case 'ADD_NEW_TASK': {
            const tasks = [...state, action.payload.task]
            return tasks
        }
        case 'CHANGE_TASK_STATUS': {
            const index = state.findIndex(task => task.id === action.payload.taskId)
            return [
                ...state.slice(0, index),
                action.payload.task,
                ...state.slice(index+1)
            ]
        }
        case 'DELETE_TASK': {
            const index = state.findIndex(task => task.id === action.payload.taskId)
            return [
                ...state.slice(0, index),
                ...state.slice(index+1)
            ]
        }
        default:
            return state
    }
}