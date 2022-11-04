import { useEffect, useState } from 'react'
import { useClient, useTable, getNames } from "../../utility";
import { NavLink, useParams } from 'react-router-dom';
import React from "react";

const Years_View = () => {

    const [totals, setTotals] = useState({});
    const [submits, setSubmits] = useState([]);
    const renderTable = useTable();

    const { year } = useParams();
    const names = getNames();
    const a = useClient();



    useEffect(() => {

        async function getData() {

            let data;

            try {
                data = await a.get('/years/' + year + "?t=yes").then(({ data }) => data)

            } catch (e) { console.log(e) } finally {

                setTotals(data.totals);
                setSubmits(data.submits);


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
                        <tr>
                            <th className="text-primary">{year}</th>
                            <th className="text-warning">{Intl.NumberFormat('en-GB',).format(totals.resources)}</th>
                            <th className="text-warning">{Intl.NumberFormat('en-GB',).format(totals.points)}</th>
                        </tr>
                        <tr className="clickable text-danger">
                            <th>Month</th>
                            <th>New Resources</th>
                            <th>New Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submits.map((submit) => (

                            <tr key={submit.month}>
                                <td>
                                    <NavLink className="nav-link outline" to={'/months/' + submit.month + '?y=' + submit.year}>
                                        {names[submit.month]} {submit.id}</NavLink>
                                </td>
                                <td>{Intl.NumberFormat('en-GB',).format(submit.resources)}</td>
                                <td>{Intl.NumberFormat('en-GB',).format(submit.points)}</td>
                            </tr>

                        ))}
                    </tbody>

                </table>

            </div >


        </>

    )

}
export default Years_View