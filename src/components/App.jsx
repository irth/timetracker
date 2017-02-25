import React, { Component } from 'react'

import { Link } from 'react-router'

import styles from '../css/App.css'

import TaskDetail from './TaskDetail'
import { TaskEditForm, TaskAddForm } from './TaskForm'

export default class App extends Component {
    render() {
        return (
            <div>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper">

                            <Link to="/" className="brand-logo">{this.renderTitle()}</Link>
                            <ul id="nav-mobile" className="left hide-on-med-and-down">
                                {this.renderBackButton()}
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className={`container ${styles.container}`}>{this.props.children}</div>
            </div>
        )
    }

    renderBackButton() {
        let url = null;
        let loc = this.props.location;
        const taskEdit = /^\/tasks\/(\d+)\/edit/
        switch (true) {
            case !!loc.pathname.match(/^\/tasks\/\d+$/):
            case loc.pathname == "/tasks/add":
                url = "/"
                break;
            case !!loc.pathname.match(taskEdit):
                url = `/tasks/${loc.pathname.match(taskEdit)[1]}`
                break;
        }
        return url == null
            ? null
            : <li><Link to={url}><i className="material-icons mi-arrow-back"></i></Link></li >
    }

    renderTitle() {
        switch (this.props.children.type) {
            case TaskDetail:
                return "Task details"
            case TaskAddForm:
                return "Add a task"
            case TaskEditForm:
                return "Edit a task"
            default:
                return "Time Tracker"
        }
    }
}