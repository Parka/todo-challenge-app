import React from 'react'
import { useSelector} from 'react-redux'
import styled from 'styled-components'
import Tasks from './features/tasks'
import Login from './features/login'

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    width: 100%;
    max-width: 30rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const App = () => {
    const token = useSelector(state => state.loginReducer)
    return (
        <Main>
            <Wrapper>
                {!token ? <Login /> : <Tasks />}
            </Wrapper>
        </Main>
    )
}

export default App;