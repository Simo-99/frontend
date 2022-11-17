import { useEffect, useState } from 'react'
import { getName, canManage, UseAxios } from "../../utility";
import { NavLink, useParams } from 'react-router-dom';

const PLAYERS_VIEW = () => {

    const [data, setData] = useState({ player: {}, submits: {} });
    const { id } = useParams();

    useEffect(() => { (async () => setData(await UseAxios("/players/" + id + "?s=yes")))() }, [id]);


    return (

        <div className="container my-3">

            <table id="table" className="table table-striped table-dark">

                <thead>
                    <tr>
                        <th colSpan='9' className="text-center">
                            <span className={data.player.color === "#000000" ? 'outline2' : 'outline'} style={{ color: data.player.color }}>{data.player.name}</span>
                            {canManage() ? < NavLink to={'/players/' + data.player.id + '/edit'}>
                                <button type="button" className="btn btn-dark"><i className="bi bi-pen"></i></button>
                            </NavLink> : null}
                        </th>
                    </tr>
                    <tr className="clickable text-danger sorting">
                        <th>Year</th>
                        <th>Month</th>
                        <th>Resources</th>
                        <th>Points</th>
                        <th>Trophies</th>
                        <th>New Resources</th>
                        <th>New Points</th>
                        <th>New Trophies</th>

                        {canManage() ? <th className="text-center">Actions</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.values(data.submits)?.map((submit) => (
                            < tr key={submit.id} >
                                <td>
                                    <NavLink className="nav-link outline" to={'/years/' + submit.year}>
                                        {submit.year}
                                    </NavLink>
                                </td>
                                <td>
                                    <NavLink className="nav-link outline" to={'/months/' + submit.month + '?y=' + submit.year}>
                                        {getName(submit.month)}</NavLink>
                                </td>
                                <td>{Intl.NumberFormat('en-GB',).format(submit.resources)}</td>
                                <td>{Intl.NumberFormat('en-GB',).format(submit.points)}</td>
                                <td>{Intl.NumberFormat('en-GB',).format(submit.trophies)}</td>
                                <td>
                                    {Intl.NumberFormat('en-GB',).format(submit.new_resources)}
                                    {submit.new_resources < 280000 ?
                                        submit.player_id === 6 ?
                                            <i className="jonny"></i>
                                            : <i className="text-danger bi bi-emoji-angry-fill outline"></i>
                                        : null}
                                    {submit.winner_r ? <i className="text-warning bi bi-trophy-fill outline"></i> : null}
                                </td>
                                <td>
                                    {Intl.NumberFormat('en-GB',).format(submit.new_points)}
                                    {submit.winner_p ? <i className="text-warning bi bi-trophy-fill outline"></i> : null}
                                </td>
                                <td>
                                    {Intl.NumberFormat('en-GB',).format(submit.new_trophies)}
                                    {submit.winner_t && submit.new_trophies > 0 ? <i className="text-warning bi bi-trophy-fill outline"></i> : null}
                                </td>
                                {
                                    canManage() ? <td className="text-center">
                                        <NavLink to={'/submits/' + submit.id + '/edit'}>
                                            <button type="button" className="btn btn-success"><i className="bi bi-pencil-square"></i></button>
                                        </NavLink>
                                    </td> : null
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >

    )
}
export default PLAYERS_VIEW