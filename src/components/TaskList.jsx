import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

import { connect } from 'react-redux'

import styles from '../css/TaskList.css'

class TaskList extends Component {
    render() {
        return (
            <div className={styles.taskList}>
                {this.props.tasks.map((task) => (
                    <div onClick={() => browserHistory.push(`/tasks/${task.id}`)} className="card waves-effect" key={task.id}>
                        <div className="card-content">
                            <span className="card-title">{task.name}</span>
                        </div>
                    </div>
                ))}
                <div className="fixed-action-btn">
                    <Link className="btn-floating btn-large waves-effect waves-light red" to="/tasks/add"><i className="material-icons">add</i></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps)(TaskList)