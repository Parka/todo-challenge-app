import * as env from '../env'
import axios from 'axios'

const initialState = null

export const loadTasks = () =>
    async (dispatch) => {
        const result = await axios.get(env.api)
        dispatch(setTasksAction({
            type: 'SET_TASK',
            payload: { tasks: result.data }
        }))
    }

export const createNewTask = (name) =>
    async (dispatch) => {
        const result = await axios.post(env.api, { name })
        dispatch(addNewTaskAction({
            type: 'ADD_NEW_TASK',
            payload: { task: result.data }
        }))
    }

export const changeTaskStatus = (taskId, done) =>
    async (dispatch) => {
        const result = await axios.post(`${env.api}/${taskId}`, { done })
        dispatch(changeTaskStatusAction({
            type: 'CHANGE_TASK_STATUS',
            payload: { taskId, task: result.data }
        }))
    }

export const deleteTask = (taskId) =>
    async (dispatch) => {
        await axios.post(`${env.api}/${taskId}`)
        dispatch(deleteTaskAction({
            type: 'DELETE_TASK',
            payload: { taskId }
        }))
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