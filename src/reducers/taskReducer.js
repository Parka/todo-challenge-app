import * as env from '../env'
import axios from 'axios'

const route = 'tasks'
const endpoint = `${env.api}/${route}`
const initialState = null

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
    async (dispatch) => {
        const result = await axios.get(endpoint)
        dispatch(setTasksAction( result.data ))
    }

export const createNewTask = (name) =>
    async (dispatch) => {
        const result = await axios.post(endpoint, { name })
        dispatch(addNewTaskAction( result.data ))
    }

export const changeTaskStatus = (taskId, done) =>
    async (dispatch) => {
        const result = await axios.patch(`${endpoint}/${taskId}`, { done })
        dispatch(changeTaskStatusAction( taskId, result.data ))
    }

export const deleteTask = (taskId) =>
    async (dispatch) => {
        await axios.delete(`${endpoint}/${taskId}`)
        dispatch(deleteTaskAction( taskId ))
    }

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TASKS': {
            return action.payload.tasks
        }
        case 'ADD_NEW_TASK': {
            const tasks = state.push(action.payload.task)
            return tasks
        }
        case 'CHANGE_TASK_STATUS': {
            const index = state.findIndex(task => task.id === action.payload.taskId)
            state[index] = action.payload.task
            return state
        }
        case 'DELETE_TASK': {
            const index = state.findIndex(task => task.id === action.payload.taskId)
            state.splice(index, 1)
            return state
        }
        default:
            return state
    }
}