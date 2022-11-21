import { useEffect, useState } from 'react'
import { getName, UseAxios } from "../../utility";
import { NavLink, useParams } from 'react-router-dom';
import { Icon } from '@mui/material';
import * as Util from "../CUSTOM"

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
                            <Util.CanManage>
                                < NavLink to={'/players/' + data.player.id + '/edit'}>
                                    <button type="button" className="btn btn-dark">
                                        <Icon fontSize='small'>edit</Icon>
                                    </button>
                                </NavLink>
                            </Util.CanManage>
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
                        <Util.CanManage><th className="text-center">Actions</th></Util.CanManage>
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
                                <Util.NumericCell value={submit.resources} />
                                <Util.NumericCell value={submit.points} />
                                <Util.NumericCell value={submit.trophies} />

                                <td>
                                    <Util.Number value={submit.new_resources} />
                                    <Util.True condition={submit.new_resources < 280000}>
                                        <i className="text-danger bi bi-emoji-angry-fill outline"></i>
                                    </Util.True>

                                    <Util.True condition={submit.winner_r}><i className="text-warning bi bi-trophy-fill outline"></i></Util.True>
                                </td>
                                <td>
                                    <Util.Number value={submit.new_points} />
                                    <Util.True condition={submit.winner_p}><i className="text-warning bi bi-trophy-fill outline"></i> </Util.True>
                                </td>
                                <td>
                                    <Util.Number value={submit.new_trophies} />
                                    <Util.True condition={submit.winner_t && submit.new_trophies > 0}>
                                        <i className="text-warning bi bi-trophy-fill outline"></i>
                                    </Util.True>
                                </td>
                                <Util.CanManage>
                                    <td className="text-center">
                                        <NavLink to={'/submits/' + submit.id + '/edit'}>
                                            <button type="button" className="btn btn-success"><Icon fontSize='small'>edit</Icon></button>
                                        </NavLink>
                                    </td>
                                </Util.CanManage>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >

    )
}
export default PLAYERS_VIEW