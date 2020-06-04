import React from 'react'
import { connect } from 'react-redux'
import './App.css'

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            taskName: 'First Task'
        }
    }
    componentDidMount() {
        this.props.loadTasks()
    }
    render() {
        return (
            <div className="App">
                <input
                    value={this.state.taskName}
                    onChange={e =>
                        this.setState({
                            ...this.state,
                            taskName: e.target.value
                        })}
                />
                <button onClick={() => {
                    this.props.createNewTask(this.state.taskName)
                    this.setState({
                        ...this.state,
                        taskName: ''
                    })
                }}>Add</button>
                <ul>
                    {this.props.tasks.map((task) => (
                        <li>
                            <input
                                type="checkbox"
                                checked={task.done}
                                onChange={() => this.props.changeTaskStatus(task.id, !task.done)}
                            />
                            {task.name} ({task.done ? 'Hecha' : 'Por hacer'})
                            <button onClick={() => this.props.deleteTask(task.id)}>Borrar</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapState = state => ({
    tasks: state.taskReducer
})

export default connect(mapState)(App)