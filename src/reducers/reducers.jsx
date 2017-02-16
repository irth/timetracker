import { ADD_TASK, REMOVE_TASK, UPDATE_TASK, START_TIMER, STOP_TIMER, PAUSE_TIMER } from '../actions/actionTypes'

import { combineReducers } from 'redux'

const initialTimer = {
    state: "stopped",
    currentLap: null,
    laps: [],
    previousTimes: []
}

function timersReducer(state = initialTimer, action) {
    switch (action.type) {
        case START_TIMER:
            return {
                ...state,
                currentLap: action.time,
                state: "running"
            }
        case PAUSE_TIMER:
            if (state.state == "paused") return state;
            return {
                ...state,
                currentLap: null,
                laps: [
                    ...state.laps,
                    [state.currentLap, action.time]
                ],
                state: "paused"
            }
        case STOP_TIMER:
            let paused = timersReducer(state, { ...action, type: PAUSE_TIMER });
            return {
                ...paused,
                laps: [],
                previousTimes: [
                    ...paused.previousTimes,
                    paused.laps
                ],
                state: "stopped"
            }
        default:
            return state
    }
}

function tasksReducer(state = [], action) {
    switch (action.type) {
        case ADD_TASK:
            return [
                ...state,
                {
                    name: action.name,
                    id: action.id,
                    ...initialTimer
                }
            ]
        case REMOVE_TASK:
            return state.filter((task) => task.id != action.id)
        case UPDATE_TASK:
            return state.map(
                (task) => task.id == action.id
                    ? {
                        ...task,
                        name: action.name
                    }
                    : task
            )
        case START_TIMER:
        case STOP_TIMER:
        case PAUSE_TIMER:
            return state.map(
                (task) => task.id == action.id ? { ...task, ...timersReducer(task, action) } : task
            )
        default:
            return state
    }
}

function taskCountReducer(state = 0, action) {
    switch (action.type) {
        case ADD_TASK:
            return state + 1
        default:
            return state
    }
}

export default combineReducers({
    tasks: tasksReducer,
    taskCount: taskCountReducer
})