import React, { Component } from 'react'

import styles from '../css/TaskDetail.css'

function formatDuration(t) {
    let dt;
    if (typeof t == 'object') {
        let [from, to] = t;
        if (to == undefined) to = new Date().getTime()
        dt = to - from;
    } else {
        dt = t;
    }

    let days = Math.floor(dt / (1000 * 60 * 60 * 24))
    dt -= days * (1000 * 60 * 60 * 24);
    let hours = Math.floor(dt / (1000 * 60 * 60))
    dt -= hours * (1000 * 60 * 60)
    let minutes = Math.floor(dt / (1000 * 60))
    dt -= minutes * (1000 * 60)
    let seconds = Math.floor(dt / (1000))

    let str = "";

    if (typeof t == 'object') {
        if (days > 0) str += days + (days == 1 ? " day " : " days ")
        if (hours > 0) str += hours + (hours == 1 ? " hour " : " hours ")
        if (minutes > 0) str += minutes + (minutes == 1 ? " minute " : " minutes ")
        if (seconds > 0 && minutes < 10 && hours < 1 && days < 1 || str.length == 0) str += seconds + " second" + (seconds == 1 ? "" : "s")
    } else if (typeof t == 'number') {
        str = ("0" + hours).substr(-2) + ':' + ("0" + minutes).substr(-2) + ':' + ("0" + seconds).substr(-2)
        if (days > 0) str = `${days}:${str}`
    }
    return str
}

function formatDay(t) {
    let d = new Date(t);
    return d.toLocaleDateString()
}

function getTime(s) {
    let d = new Date(s);
    return ("0" + d.getHours()).substr(-2) + ":" + ("0" + d.getMinutes()).substr(-2)
}

class TaskDetail extends Component {
    constructor() {
        super()
        this.state = {
            currentDuration: "00:00:00",
            currentLapDuration: "0 seconds",
            intervalId: null
        }
    }

    componentDidMount() {
        this.timer()
        var intervalId = setInterval(this.timer.bind(this), 250);
        this.setState({ intervalId })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    timer() {
        let duration = this.props.state == "running" ? (new Date().getTime()) - (this.props.currentLap) : 0;
        if (this.props.state != "stopped") this.props.laps.forEach(x => duration += x[1] - x[0])
        let lapDuration = this.props.currentLap ? formatDuration([this.props.currentLap]) : "0 seconds";
        this.setState({
            currentDuration: formatDuration(duration),
            currentLapDuration: lapDuration
        })
    }

    renderLaps(laps) {
        return laps
            .slice()
            .reverse()
            .map((x, i) => {
                let number = laps.length - i;

                let from = getTime(x[0])
                let to = getTime(x[1])

                return (
                    <li key={x[0]} className={`${styles.time} collection-item`}>
                        <span className={styles.number}>{number}.</span>
                        <span className={styles.duration}>{formatDuration(x)}</span>
                        <span className={styles.timestamps}>{from} - {to}</span>
                    </li>
                )
            });
    }

    renderTimes(times) {
        return times
            .slice()
            .reverse()
            .map((x, i) => {
                let number = times.length - i;

                let duration = 0;
                x.forEach(x => duration += x[1] - x[0])

                return (
                    <li key={x[0]} className={`${styles.time} collection-item`}>
                        <span className={styles.number}>{number}.</span>
                        <span className={styles.duration}>{formatDuration([0, duration])}</span>
                        <span className={styles.timestamps}>{formatDay(x[0][0])}</span>
                    </li>
                )
            });
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">{this.props.name}</span>
                        <p className={styles.timer}>{this.state.currentDuration}</p>
                    </div>
                    <div className="card-action">
                        <a href="#" onClick={this.props.state != "running" ? this.props.startTimer : this.props.pauseTimer}>{this.props.state != "running" ? "START" : "PAUSE"}</a>
                        {this.props.state != "stopped" ? <a href="#" onClick={this.props.stopTimer}>STOP</a> : null}
                    </div>
                </div>
                {this.props.state == "stopped" ? null : (
                    <ul className="collection with-header">
                        <li className="collection-header"><h5>Laps</h5></li>
                        {
                            this.props.currentLap
                                ? (
                                    <li key="current" className={`${styles.time} collection-item`}>
                                        <span className={styles.number}>{this.props.laps.length + 1}.</span>
                                        <span className={styles.duration}>
                                            {this.state.currentLapDuration}{" "}
                                            <span className={styles.inProgress}>in progress</span>
                                        </span>
                                        <span className={styles.timestamps}>{getTime(this.props.currentLap)} - now</span>
                                    </li>
                                )
                                : null
                        }
                        {this.renderLaps(this.props.laps)}
                    </ul>
                )}
                {this.props.previousTimes.length == 0 ? null : (
                    <ul className="collection with-header">
                        <li className="collection-header"><h5>Previous times</h5></li>
                        {this.renderTimes(this.props.previousTimes)}
                    </ul>
                )}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

import { startTimer, pauseTimer, stopTimer } from '../actions/actionCreators'

const mapDispatchToProps = (dispatch) => {
    return {
        startTimer: (id, time) => dispatch(startTimer(id, time)),
        pauseTimer: (id, time) => dispatch(pauseTimer(id, time)),
        stopTimer: (id, time) => dispatch(stopTimer(id, time))
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    let id = ownProps.params.id;
    let task = stateProps.tasks.filter((task) => task.id == id)[0];
    let time = () => (new Date()).getTime();
    return {
        previousTimes: task.previousTimes,
        currentLap: task.currentLap,
        laps: task.laps,
        state: task.state,
        name: task.name,
        startTimer: () => dispatchProps.startTimer(id, time()),
        pauseTimer: () => dispatchProps.pauseTimer(id, time()),
        stopTimer: () => dispatchProps.stopTimer(id, time())
    }
}

import { connect } from 'react-redux'

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskDetail)