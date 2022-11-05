import React from "react";
import { useEffect, useState } from 'react'
import { useClient, getUser, getNames, useTable } from "../../utility";
import { NavLink, useParams } from 'react-router-dom';

const Players_View = () => {

    const [player, setPlayer] = useState({});
    const [submits, setSubmits] = useState([]);
    const renderTable = useTable();

    const { id } = useParams();
    const names = getNames();
    const a = useClient();
    const user = getUser();



    useEffect(() => {
        async function getData() {

            let data;

            try {
                data = await a.get('/players/' + id + "?s=yes").then(({ data }) => data)

            } catch (e) { console.log(e) } finally {

                setPlayer(data.player);
                setSubmits(data.submits);

            }

        }

        getData();
        // renderTable();
    }, []);





    return (

        <>
            <div className="container my-3">

                <table id="table" className="table table-striped table-dark">

                    <thead>
                        <tr>
                            <th colSpan='9' className="text-center">
                                <span className={player.color == "#000000" ? 'outline2' : 'outline'} style={{ color: player.color }}>{player.name}</span>
                                {user.is_admin ? < NavLink to={'/players/' + player.id + '/edit'}>
                                    <button type="button" className="btn btn-dark"><i className="bi bi-pen"></i></button>
                                </NavLink> : null}
                            </th>
                        </tr>
                        <tr className="clickable text-danger">
                            <th>Year</th>
                            <th>Month</th>
                            <th>Resources</th>
                            <th>Points</th>
                            <th>Trophies</th>
                            <th>New Resources</th>
                            <th>New Points</th>
                            <th>New Trophies</th>

                            {user.is_admin ? <th className="text-center">Actions</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {submits.map((submit) => (
                            < tr key={submit.id} >
                                <td>
                                    <NavLink className="nav-link outline" to={'/years/' + submit.year}>
                                        {submit.year}
                                    </NavLink>
                                </td>
                                <td>
                                    <NavLink className="nav-link outline" to={'/months/' + submit.month + '?y=' + submit.year}>
                                        {names[submit.month]}</NavLink>
                                </td>
                                <td>{Intl.NumberFormat('en-GB',).format(submit.resources)}</td>
                                <td>{Intl.NumberFormat('en-GB',).format(submit.points)}</td>
                                <td>{Intl.NumberFormat('en-GB',).format(submit.trophies)}</td>
                                <td>
                                    {Intl.NumberFormat('en-GB',).format(submit.new_resources)}
                                    {submit.new_resources < 280000 ? <a href="#"><i className="text-danger bi bi-emoji-angry-fill outline">
                                    </i></a> : null}
                                    {submit.winner_r ? <i className="text-warning bi bi-trophy-fill outline"></i> : null}
                                </td>
                                <td>
                                    {Intl.NumberFormat('en-GB',).format(submit.new_points)}
                                    {submit.winner_p ? <i className="text-warning bi bi-trophy-fill outline"></i> : null}
                                </td>
                                <td>
                                    {Intl.NumberFormat('en-GB',).format(submit.new_trophies)}
                                    {submit.winner_t ? <i className="text-warning bi bi-trophy-fill outline"></i> : null}
                                </td>
                                {
                                    user.is_admin ? <td className="text-center">
                                        <NavLink to={'/submits/' + submit.id + '/edit'}>
                                            <button type="button" className="btn btn-success"><i className="bi bi-pencil-square"></i></button>
                                        </NavLink>
                                    </td> : null
                                }
                            </tr >
                        ))}
                    </tbody >

                </table >
                {renderTable()}

            </div >
        </>

    )

}
export default Players_View