import { useEffect, useState } from 'react'
import { getName, canManage, UseAxios, UseSort } from "../../utility";
import { NavLink, useParams, useSearchParams } from 'react-router-dom';

const Months_View = () => {

    const [data, setData] = useState({ totals: {}, submits: {} });

    const [winner_r, setWinner_r] = useState();
    const [winner_t, setWinner_t] = useState();
    const [winner_p, setWinner_p] = useState();

    const { month } = useParams();
    const [search] = useSearchParams();
    const year = search.get("y");

    useEffect(() => {
        (async () => {

            await Promise.all([
                setWinner_p(await UseAxios('/months/' + month + "?best=yes&o=p&y=" + year)),
                setWinner_t(await UseAxios('/months/' + month + "?best=yes&o=t&y=" + year)),
                setWinner_r(await UseAxios('/months/' + month + "?best=yes&o=r&y=" + year)),
                setData(await UseAxios('/months/' + month + "?t=yes&y=" + year)),

            ]);

        })()

    }, [month]);



    return (

        <div>
            {data.submits?.length > 0 ?

                < div className="container my-3" >
                    <table id="table" className="table table-striped table-dark">

                        <thead>
                            <tr>
                                <th className="text-start">
                                    {month > 1 ? <NavLink reloadDocument
                                        to={'/months/' + (month - 1) + '?y=' + year}
                                        style={{ textDecoration: 'none' }} className="text-warning">
                                        {getName(month - 1)}
                                    </NavLink> : null}
                                </th>
                                {canManage() ? <th className="flex-row text-primary  text-center" colSpan={6}>
                                    <NavLink to={'/years/' + year} style={{ textDecoration: 'none' }} reloadDocument>
                                        {year}
                                    </NavLink> -
                                    <span>{getName(month)}</span>
                                </th> :
                                    <th className="flex-row text-primary  text-center" colSpan={5}>
                                        <NavLink to={'/years/' + year} style={{ textDecoration: 'none' }} reloadDocument>
                                            {year}
                                        </NavLink> -
                                        <span>{" " + getName(month)}</span>
                                    </th>}
                                <th className="text-end">
                                    {parseInt(month) < 12 ? <NavLink reloadDocument to={'/months/' + (parseInt(month) + 1) + '?y=' + year} style={{ textDecoration: 'none' }} className="text-warning">
                                        {getName(parseInt(month) + 1)}
                                    </NavLink> : null}

                                </th>
                            </tr>
                            {Object.entries(data.submits)?.length > 0 ?
                                <tr>
                                    <th colSpan={4} className="text-muted">Totals</th>

                                    <th className="text-light text-start">{Intl.NumberFormat('en-GB',).format(data.totals.resources)}
                                    </th>
                                    <th className="text-light text-start">{Intl.NumberFormat('en-GB',).format(data.totals.points)}
                                    </th>
                                    <th className="text-light text-start">{Intl.NumberFormat('en-GB',).format(data.totals.trophies)}
                                    </th>

                                    {canManage() ? <th></th> : null}


                                </tr > : null}
                            <tr className="text-danger clickable sorting">
                                <th>Name</th>
                                <th>Resources</th>
                                <th>Points</th>
                                <th>Trophies</th>
                                <th>New Resources</th>
                                <th>New Points</th>
                                <th>New Trophies</th>
                                {canManage() ? <th className="text-center">Actions</th> : null}
                            </tr>

                        </thead >

                        < tbody >
                            {
                                Object.entries(data.submits)?.length > 0 ?
                                    Object.values(data.submits).map((submit) => (
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
                                                {submit.new_resources < 280000 ?
                                                    submit.player_id == 6 ?
                                                        <i className="jonny"></i>
                                                        : <i className="text-danger bi bi-emoji-angry-fill outline"></i>
                                                    : null}


                                                {submit.player_id == winner_r.player_id ? <i className="text-warning bi bi-trophy-fill outline"> </i> : null}


                                            </td>
                                            <td>
                                                {Intl.NumberFormat('en-GB',).format(submit.new_points)}
                                                {submit.player_id == winner_p.player_id ? <i className="text-warning bi bi-trophy-fill outline"> </i> : null}
                                            </td>
                                            <td>
                                                {Intl.NumberFormat('en-GB',).format(submit.new_trophies)}
                                                {submit.new_trophies > 0 && submit.player_id == winner_t.player_id ? <i className="text-warning bi bi-trophy-fill outline"> </i> : null}
                                            </td>
                                            {canManage() ? <td className="text-center">
                                                <NavLink to={'/submits/' + submit.id + '/edit'}> <button type="button"
                                                    className="btn btn-success"><i className="bi bi-pencil-square"> </i></button></NavLink>
                                            </td > : null}
                                        </tr >
                                    ))
                                    : null
                            }
                        </tbody >

                    </table >
                </div > : null

            }
        </div >


    )

}
export default Months_View