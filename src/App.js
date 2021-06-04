import {TablePagination} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPassengersTC, setPassengersAC} from "./reducers/passenger-reducer";
import classes from './App.module.scss'
import planeImg from "../src/assets/plane.jpg";

function App() {
    const dispatch = useDispatch();
    const [currentRows, setCurrentRows] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const passengersData = useSelector(state => state.passengers?.passengers);
    const savedData = useSelector(state => state.passengers?.savedData);
    const totalPages = useSelector(state => state.passengers.totalCountPages);

    const savedDataKeys = Object.keys(savedData);
    const savedDataCurrentPage = savedData[currentPage];

      useEffect(() => {
        if (!savedDataKeys.map(item => +item).includes(currentPage)) {
            dispatch(fetchPassengersTC(currentPage, currentRows));
        } else {
            dispatch(setPassengersAC(savedDataCurrentPage));
        }

    }, [currentPage, currentRows,savedDataKeys,savedDataCurrentPage, dispatch]);

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
                    {passengersData?.data?.map(passanger => {
                        return <div className={classes.passengerItem} key={passanger["_id"]}>
                            {
                                passanger.airline.logo ?
                                    <img src={passanger.airline.logo} alt="logo"/>
                                    : <img src={planeImg} alt="planeImg"/>
                            }
                            {
                                passanger.name && <div>Name: {passanger.name}</div>
                            }
                            {
                                passanger.trips && <div>Trips: {passanger.trips}</div>
                            }
                            {
                                passanger.airline.name && <div>Airline name:{passanger.airline.name}</div>
                            }
                            {passanger.airline.website && <div>Website {passanger.airline.website}</div>}
                            {passanger.airline.established && <div>Established: {passanger.airline.established}</div>}
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
