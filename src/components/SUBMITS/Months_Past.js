import { useEffect, useState } from 'react'
import { useClient, getNames, useTable } from "../../utility";
import { NavLink } from 'react-router-dom';
import React from "react";

const Months_Past = () => {

    const [submits, setSubmits] = useState([]);
    const renderTable = useTable();

    const names = getNames();
    const a = useClient();



    useEffect(() => {
        async function getData() {

            let data;

            try {
                data = await a.get('/months').then(({ data }) => data)

            } catch (e) { console.log(e) } finally {

                setSubmits(data);

            }

        }
        getData();
        renderTable();

    }, []);





    return (

        <>
            <div className="container my-3">

                <table id="table" className="table table-striped table-dark">

                    <thead>

                        <tr className="text-danger clickable">
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
                                    <NavLink className="nav-link outline" to={'/months/' + month.month + '?y=' + month.year}>{names[month.month]}</NavLink>
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
export default Months_Past