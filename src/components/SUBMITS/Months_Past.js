import { useEffect, useState } from 'react'
import { UseAxios, getName } from "../../utility";
import { NavLink } from 'react-router-dom';

const MONTH_PAST = () => {

    const [submits, setSubmits] = useState([]);


    useEffect(() => { (async () => { setSubmits(await UseAxios("/months")); })() }, []);

    return (

        <>
            <div className="container my-3">

                <table id="table" className="table table-striped table-dark">

                    <thead>

                        <tr className="text-danger clickable sorting">
                            <th>Year</th>
                            <th>Month</th>
                            <th>New Resources</th>
                            <th>New Points</th>
                            <th>New Trophies</th>
                        </tr>

                    </thead>

                    <tbody>
                        {submits.map((month) => (
                            <tr key={JSON.stringify(month)}>
                                <td>
                                    <NavLink className="nav-link outline" to={'/years/' + month.year}>{month.year}</NavLink>
                                </td>
                                <td>
                                    <NavLink className="nav-link outline" to={'/months/' + month.month + '?y=' + month.year}>{getName(month.month)}</NavLink>
                                </td>
                                <td> {Intl.NumberFormat('en-GB',).format(month.resources)}</td>
                                <td>{Intl.NumberFormat('en-GB',).format(month.points)}</td>
                                <td>{Intl.NumberFormat('en-GB',).format(month.trophies)}</td>

                            </tr>

                        ))}
                    </tbody>

                </table >
            </div >
        </>

    )

}
export default MONTH_PAST