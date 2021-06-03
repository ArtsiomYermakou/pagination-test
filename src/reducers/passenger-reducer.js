import {passengersAPI} from "../api/api-passengers";


const initialState = {
    passengers: {},
    savedData: []
}

export const passengersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET-PASSENGERS":
            return {
                ...state,
                passengers: action.passengers
            }
        case "SET-PAGE-NUMBER":
            const newElementInArray = {
                id: action.numberPage,
                data: action.data
            }
            if (
                state.savedData.filter((item) => {
                    return item.id === action.numberPage
                }).length === 0
            ) {
                return {
                    ...state,
                    savedData: [...state.savedData, newElementInArray]
                }
            }
            return state
        default:
            return state
    }
}

export const setPassengersAC = (passengers) => (
    {type: "SET-PASSENGERS", passengers}
)
export const setPageNumber = (numberPage, data) => (
    {type: "SET-PAGE-NUMBER", numberPage, data}
)

export const fetchPassengersTC = (page, countRows) => {
    return (dispatch) => {
        passengersAPI.getPassengers(page, countRows)
            .then((res) => {
                dispatch(setPassengersAC(res.data))
                dispatch(setPageNumber(page, res.data.data))
            })
    }
}