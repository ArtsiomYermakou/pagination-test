import axios from "axios";

const instance = axios.create({
    baseURL: `https://api.instantwebtools.net/v1/`
})

export const passengersAPI = {
    getPassengers(page, countRows) {
        return instance.get(`passenger?page=${page}&size=${countRows}`)
    }
}