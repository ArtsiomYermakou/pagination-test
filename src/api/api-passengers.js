import axios from "axios";

const instance = axios.create({
    baseURL: ``
})

export const passengersAPI = {
    getPassengers(page, countRows) {
        return instance.get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${countRows}`)
    }
}