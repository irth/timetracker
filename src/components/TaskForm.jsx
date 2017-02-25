import React, { Component } from 'react'

import { browserHistory } from 'react-router'
class TaskForm extends Component {
    constructor() {
        super()
        this.state = {
            nameValid: true
        }
    }

    componentDidMount() {
        // it doesn't work when called immediately
        setTimeout(() => this.nameInput.focus(), 0);
    }

    render() {
        return (
            <div>
                <div className="input-field">
                    <input
                        type="text" id="taskName"
                        className={`validate ${this.state.nameValid ? '' : 'invalid'}`}
                        defaultValue={this.props.name}
                        onChange={this.validate.bind(this)}
                        ref={(el) => this.nameInput = el} />
                    <label htmlFor="taskName">Task name</label>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.submit.bind(this)}>
                        {this.props.edit ? "Save" : "Add"} task
                    </button>
                </div>
            </div>
        )
    }

    validate() {
        console.log("validating")
        let value = this.nameInput.value;
        let valid = (value.trim().length > 0);
        this.setState({ nameValid: valid });
        return valid
    }

    submit() {
        let val = this.nameInput.value
        if (this.validate()) {
            if (this.props.edit) {
                this.props.updateTask(val)
                browserHistory.push(`/tasks/${this.props.id}`)
            } else {
                this.props.addTask(val)
                browserHistory.push('/')
            }
        } else {
            alert(":(")
        }
    }
}

export default () => <TaskForm edit name="penis"></TaskForm>

import { connect } from 'react-redux'

import { addTask } from '../actions/actionCreators'

export const TaskAddForm = connect(
    (state) => {
        return {
            taskCount: state.taskCount
        }
    },
    (dispatch) => {
        return {
            addTask: (id, name) => dispatch(addTask(id, name))
        }
    },
    (stateProps, dispatchProps, ownProps) => {
        return {
            addTask: (name) => dispatchProps.addTask(stateProps.taskCount, name)
        }
    }
)(TaskForm)


import { updateTask } from '../actions/actionCreators'


export const TaskEditForm = connect(
    (state) => {
        return {
            tasks: state.tasks
        }
    },
    (dispatch) => {
        return {
            updateTask: (id, name) => dispatch(updateTask(id, name))
        }
    },
    (stateProps, dispatchProps, ownProps) => {
        return {
            name: stateProps.tasks[ownProps.params.id].name,
            id: ownProps.params.id,
            edit: true,
            updateTask: (name) => dispatchProps.updateTask(ownProps.params.id, name)
        }
    }
)(TaskForm)

