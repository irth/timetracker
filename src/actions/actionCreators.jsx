import { ADD_TASK, REMOVE_TASK, UPDATE_TASK, START_TIMER, STOP_TIMER, PAUSE_TIMER } from './actionTypes'


// Tasks
export function addTask(id, name) {
    return {
        type: ADD_TASK,
        id: parseInt(id),
        name
    }
}

export function removeTask(id) {
    return {
        type: REMOVE_TASK,
        id: parseInt(id)
    }
}

export function updateTask(id, name) {
    return {
        type: UPDATE_TASK,
        id: parseInt(id),
        name
    }
}


// Timers
export function startTimer(id, time) {
    return {
        type: START_TIMER,
        id: parseInt(id),
        time: parseInt(time)
    }
}

export function stopTimer(id, time) {
    return {
        type: STOP_TIMER,
        id: parseInt(id),
        time: parseInt(time)
    }
}

export function pauseTimer(id, time) {
    return {
        type: PAUSE_TIMER,
        id: parseInt(id),
        time: parseInt(time)
    }
}