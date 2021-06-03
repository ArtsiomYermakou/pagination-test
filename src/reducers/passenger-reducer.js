import {passengersAPI} from "../api/api-passengers";


const initialState = {
    passengers: []
}

export const passengersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET-PASSENGERS":
            return {
                ...state,
                passengers: action.passengers
            }
        default:
            return state
    }
}

export const setPassengersAC = (passengers) => (
    {type: "SET-PASSENGERS", passengers}
)

export const fetchPassengersTC = (page, countRows) => {
    return (dispatch) => {
        passengersAPI.getPassengers(page, countRows)
            .then((res) => {
                dispatch(setPassengersAC(res.data))
            })
    }
}