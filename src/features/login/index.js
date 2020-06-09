import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/loginReducer';
import styled from 'styled-components'

const Form = styled.form`
  width: 100%;
  padding: 20px;
  input {
      width: 100%;
  }
`
const TaskList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 0px;
`
const Task = styled.li`
  list-style-type: none;
  label{
    width: 100%;
    margin: 0px;
  }
  span{
    overflow-wrap: anywhere;
    font-weight: bold;
  }
  .task-body{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background-color: #f1f1f1;
    padding: 1rem;
    border-radius: 5px;
  }
  input[type='checkbox']:checked+.task-body{
    background-color: #dedede;
    color: #aaaaaa;
    span{
      text-decoration: line-through;
      font-weight: normal;
    }
  }

  input[type='checkbox']:focus+.task-body{
    box-shadow: 0 0 0 2pt red;
  }
  &+*{
    margin-top: 1rem;
    &:before {
      content: '';
      border-top: 1px solid #dddddd;
      margin-left: 1rem;
      margin-right: 1rem;
      display: block;
      margin-bottom: 1rem;
    }
  }
  input{
    opacity: 0;
    position: absolute;
    height: 0px;
    width: 0px;
  }
`
const Delete = styled.button`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  font-weight: bold;
  margin-left: 1rem;
  user-select: none;
  flex-shrink: 0;
  &:focus{
    outline: none;
    box-shadow: 0 0 0 2pt red;
  }
`

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');

    const dispatch = useDispatch();

    return (
      <Form action="" onSubmit={e=>{
          dispatch(login(email, pass));
          setPassword('');
          e.preventDefault();
      }}>
          <input
              value={email}
              placeholder="email"
              onChange={e => setEmail(e.target.value)}
          />
          <input
              type="password"
              value={pass}
              placeholder="password"
              onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">LOGIN</button>
      </Form>
    )
}

export default Login;