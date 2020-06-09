import * as env from '../env'
import axios from 'axios'
import { toast } from 'react-toastify';

const route = 'login'
const endpoint = `${env.api}/${route}`
const initialState = null

// SYNC ACTION GENERATORS
export const setTokenAction = ( {token} ) => ({
            type: 'SET_TOKEN',
            payload: { token }
})


// ASYNC ACTION GENERATORS
export const login = (email, pass) =>
    async (dispatch) => {
        try {
            const result = await axios.post(endpoint, {email, pass})
            dispatch(setTokenAction( result.data ))
            toast("Welcome back! 😃")
        } catch (e) {
            toast.error("Failed to login!")
        }
    }

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN': {
            return action.payload.token
        }
        default:
            return state
    }
}