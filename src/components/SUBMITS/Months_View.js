import React from "react";
import { useEffect, useState } from 'react'
import { useClient, getUser, getNames, useTable } from "../../utility";
import { useNavigate, NavLink, useParams, useSearchParams } from 'react-router-dom';

const Months_View = () => {

    const [totals, setTotals] = useState({});
    const [submits, setSubmits] = useState([]);
    const [winner_r, setWinner_r] = useState();
    const [winner_t, setWinner_t] = useState();
    const [winner_p, setWinner_p] = useState();

    const renderTable = useTable();

    const { month } = useParams();
    const [search,] = useSearchParams();
    const names = getNames();
    const year = search.get("y");
    const a = useClient();
    const user = getUser();


    useEffect(() => {
        async function getData() {

            let data; let dataR; let dataP; let dataT;
            try {
                dataR = await a.get('/months/' + month + "?best=yes&o=r&y=" + year).then(({ data }) => data)
                dataP = await a.get('/months/' + month + "?best=yes&o=p&y=" + year).then(({ data }) => data)
                dataT = await a.get('/months/' + month + "?best=yes&o=t&y=" + year).then(({ data }) => data)
                data = await a.get('/months/' + month + "?t=yes&y=" + year).then(({ data }) => data)


            } catch (e) { console.log(e) } finally {

                setWinner_p(dataP.submit);
                setWinner_t(dataT.submit);
                setWinner_r(dataR.submit);

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
                            <th className="text-start">
                                {month > 1 ? <NavLink reloadDocument
                                    to={'/months/' + (month - 1) + '?y=' + year}
                                    style={{ textDecoration: 'none' }} className="text-warning">
                                    {names[month - 1]}
                                </NavLink> : null}
                            </th>
                            {user.is_admin ? <th className="flex-row text-primary  text-center" colSpan={6}>
                                <NavLink to={'/years/' + year} style={{ textDecoration: 'none' }} reloadDocument>
                                    {year}
                                </NavLink> -
                                <span>{names[month]}</span>
                            </th> :
                                <th className="flex-row text-primary  text-center" colSpan={5}>
                                    <NavLink to={'/years/' + year} style={{ textDecoration: 'none' }} reloadDocument>
                                        {year}
                                    </NavLink> -
                                    <span>{" " + names[month]}</span>
                                </th>}
                            <th className="text-end">
                                {parseInt(month) < 12 ? <NavLink reloadDocument to={'/months/' + (parseInt(month) + 1) + '?y=' + year} style={{ textDecoration: 'none' }} className="text-warning">
                                    {names[parseInt(month) + 1]}
                                </NavLink> : null}

                            </th>
                        </tr>
                        <tr>
                            <th colSpan={4} className="text-muted">Totals</th>

                            <th className="text-light text-start">{Intl.NumberFormat('en-GB',).format(totals.resources)}
                            </th>
                            <th className="text-light text-start">{Intl.NumberFormat('en-GB',).format(totals.points)}
                            </th>
                            <th className="text-light text-start">{Intl.NumberFormat('en-GB',).format(totals.trophies)}
                            </th>

                            {user.is_admin ? <th></th> : null}


                        </tr >
                        <tr className="text-danger clickable">
                            <th>Name</th>
                            <th>Resources</th>
                            <th>Points</th>
                            <th>Trophies</th>
                            <th>New Resources</th>
                            <th>New Points</th>
                            <th>New Trophies</th>
                            {user.is_admin ? <th className="text-center">Actions</th> : null}
                        </tr>

                    </thead >

                    < tbody >
                        {
                            submits.map((submit) => (
                                <tr key={JSON.stringify(submit)}>
                                    <td>
                                        <NavLink className={submit.color == '#000000' ? 'outline2 nav-link' : 'outline nav-link'}
                                            to={'/players/' + submit.player_id + '/submits'} style={{ color: submit.color }}>{submit.name}</NavLink>
                                    </td>
                                    <td>{Intl.NumberFormat('en-GB',).format(submit.resources)}</td>
                                    <td>{Intl.NumberFormat('en-GB',).format(submit.points)}</td>
                                    <td>{Intl.NumberFormat('en-GB',).format(submit.trophies)}</td>
                                    <td>
                                        {Intl.NumberFormat('en-GB',).format(submit.new_resources)}
                                        {submit.new_resources < 280000 ? <i className="text-danger bi bi-emoji-angry-fill outline">
                                        </i> : null}

                                        {submit.player_id === winner_r.player_id ? <i className="text-warning bi bi-trophy-fill outline"> </i> : null}


                                    </td>
                                    <td>
                                        {Intl.NumberFormat('en-GB',).format(submit.new_points)}
                                        {submit.player_id === winner_p.player_id ? <i className="text-warning bi bi-trophy-fill outline"> </i> : null}
                                    </td>
                                    <td>
                                        {Intl.NumberFormat('en-GB',).format(submit.new_trophies)}
                                        {submit.new_trophies > 0 && submit.player_id === winner_t.player_id ? <i className="text-warning bi bi-trophy-fill outline"> </i> : null}
                                    </td>
                                    {user.is_admin ? <td className="text-center">
                                        <NavLink to={'/submits/' + submit.id + '/edit'}> <button type="button"
                                            className="btn btn-success"><i className="bi bi-pencil-square"> </i></button></NavLink>
                                    </td > : null}
                                </tr >
                            ))
                        }
                    </tbody >

                </table >

            </div >

        </>

    )

}
export default Months_View