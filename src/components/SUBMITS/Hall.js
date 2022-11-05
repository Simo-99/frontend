import React from "react";
import { useEffect, useState } from 'react'
import { useClient, getNames, useTableHall } from "../../utility";
import { NavLink } from 'react-router-dom';

const Hall = () => {

    const [submits, setSubmits] = useState([]);
    const renderTable = useTableHall();


    const names = getNames();
    const a = useClient();


    useEffect(() => {
        async function getData() {

            let data;
            try {

                data = await a.get('/winners').then(({ data }) => data)


            } catch (e) { console.log(e) } finally {

                setSubmits(data);

            }

        }

        getData();
        // renderTable();


    }, []);





    return (

        <div className="container my-3">

            <table id="table" className="table table-striped table-dark">

                <thead>
                    <tr className="clickable text-danger">
                        <th>Year</th>
                        <th>Month</th>
                        <th>New Resources</th>
                        <th>New Points</th>
                    </tr>
                </thead>
                <tbody>
                    {submits.map((submit) => (
                        < tr key={JSON.stringify(submit)} >
                            <td><NavLink className="nav-link outline" to={"/years/" + submit.year}>{submit.year}</NavLink></td>
                            <td><NavLink className="nav-link outline" to={"/months/" + submit.month + "?y=" + submit.year}>{names[submit.month]}</NavLink></td>
                            <td>
                                {Intl.NumberFormat('en-GB',).format(submit.res.new_resources)}
                                <NavLink to={"/players/" + submit.res.player_id + "/submits"} className={submit.res.player.color == '#000000' ? 'outline2' : 'outline'} style={{ color: submit.res.player.color, textDecoration: 'none' }}>{submit.res.player.name}</NavLink>
                            </td>
                            <td>
                                {Intl.NumberFormat('en-GB',).format(submit.points.new_points)}
                                <NavLink to={"/players/" + submit.points.player_id + "/submits"} className={submit.points.player.color == '#000000' ? 'outline2' : 'outline'} style={{ color: submit.points.player.color, textDecoration: 'none' }}>{submit.points.player.name}</NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {renderTable()}


        </div >

    )
}

export default Hall