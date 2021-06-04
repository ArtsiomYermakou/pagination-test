import {TablePagination} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPassengersTC, setPassengersAC} from "./reducers/passenger-reducer";
import classes from './App.module.scss'
import planeImg from "../src/assets/plane.jpg";

function App() {
    const dispatch = useDispatch();
    const [currentRows, setCurrentRows] = useState(10);
    const [currentPage, setCurrentPage] = useState(0)

    const passengersData = useSelector(state => state.passengers?.passengers);
    const savedData = useSelector(state => state.passengers?.savedData);
    const totalPages = useSelector(state => state.passengers.totalCountPages)

    useEffect(() => {
        dispatch(fetchPassengersTC(currentPage, currentRows));
    }, [])

    useEffect(() => {
        if (!Object.keys(savedData).map(item => +item).includes(currentPage)) {
            dispatch(fetchPassengersTC(currentPage, currentRows));
        } else {
            dispatch(setPassengersAC(savedData[currentPage]))
        }

    }, [currentPage, currentRows, dispatch])

    const changePage = (event, newPage) => {
        setCurrentPage(newPage);
    }

    const setRows = (event) => {
        setCurrentRows(parseInt(event.target.value, 10));
        setCurrentPage(0);
    }

    return (
        <div>
            <div className={classes.contentSection}>
                <div className={classes.passengerItemWrapper}>
                    {passengersData?.data?.map(p => {
                        return <div className={classes.passengerItem} key={p["_id"]}>
                            {
                                p.airline.logo ?
                                    <img src={p.airline.logo} alt="logo"/>
                                    : <img src={planeImg} alt="planeImg"/>
                            }
                            {
                                p.name && <div>Name: {p.name}</div>
                            }
                            {
                                p.trips && <div>Trips: {p.trips}</div>
                            }
                            {
                                p.airline.name && <div>Airline name:{p.airline.name}</div>
                            }
                            {p.airline.website && <div>Website {p.airline.website}</div>}
                            {p.airline.established && <div>Established: {p.airline.established}</div>}
                        </div>
                    })}
                </div>
            </div>
            <div className={classes.pagination}>
                <TablePagination
                    component="div"
                    count={totalPages}
                    page={currentPage}
                    onChangePage={changePage}
                    rowsPerPage={currentRows}
                    onChangeRowsPerPage={setRows}
                />
            </div>
        </div>
    );
}

export default App;
