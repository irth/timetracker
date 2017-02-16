import React, { Component } from 'react'

import styles from '../css/App.css'

export default class App extends Component {
    render() {
        return (
            <div>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper">
                            <a href="#" className="brand-logo">Time Tracker</a>
                        </div>
                    </nav>
                </div>
                <div className={`container ${styles.container}`}>{this.props.children}</div>
            </div>
        )
    }
}