import { useEffect, useState } from 'react'
import { getName, canManage, UseAxios } from "../../utility";
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { Icon } from '@mui/material';
import * as Util from "../CUSTOM"

const MONTHS_VIEW = () => {

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

    }, [month, year]);



    return (

        <div>
            {data.submits?.length > 0 ?

                < div className="container my-3" >
                    <table id="table" className="table table-striped table-dark">

                        <thead>
                            <tr>
                                <th className="text-start">
                                    <Util.True condition={month > 1}>
                                        <Util.Month month={month - 1} year={year} extraClasses="text-warning" />
                                    </Util.True>
                                </th>
                                <th className="text-primary  text-center" colSpan={canManage() ? '6' : '5'}>
                                    <NavLink to={'/years/' + year} style={{ textDecoration: 'none' }}>
                                        {year}
                                    </NavLink>
                                    -
                                    <span>{getName(month)}</span>
                                </th>
                                <th className="text-end">
                                    <Util.True condition={month < 12}>
                                        <Util.Month month={parseInt(month) + 1} year={year} extraClasses="text-warning" />
                                    </Util.True>
                                </th>
                            </tr>
                            <tr className='text-light'>
                                <th colSpan={4} className="text-muted">Totals</th>
                                <th><Util.Number value={data.totals.resources} /></th>
                                <th><Util.Number value={data.totals.points} /></th>
                                <th><Util.Number value={data.totals.trophies} /></th>
                                <Util.CanManage><th></th></Util.CanManage>
                            </tr >
                            <tr className="text-danger sorting">
                                <th>Name</th>
                                <th>Resources</th>
                                <th>Points</th>
                                <th>Trophies</th>
                                <th>New Resources</th>
                                <th>New Points</th>
                                <th>New Trophies</th>
                                <Util.CanManage><th className="text-center">Actions</th></Util.CanManage>
                            </tr>

                        </thead >

                        < tbody >
                            {
                                Object.values(data.submits)?.map((submit) => (

                                    <tr key={JSON.stringify(submit)}>

                                        <td><Util.PlayerName player={{ color: submit.color, id: submit.player_id, name: submit.name }} /></td>

                                        <Util.NumericCell value={submit.resources} />
                                        <Util.NumericCell value={submit.points} />
                                        <Util.NumericCell value={submit.trophies} />
                                        <td>
                                            <Util.Number value={submit.new_resources} />
                                            <Util.True condition={submit.new_resources < 280000}><Util.AngryFace /></Util.True>
                                            <Util.True condition={submit.player_id === winner_r.player_id}><Util.Trophy /></Util.True>
                                        </td>
                                        <td>
                                            <Util.Number value={submit.new_points} />
                                            <Util.True condition={submit.player_id === winner_p.player_id}><Util.Trophy /></Util.True>
                                        </td>
                                        <td>
                                            <Util.Number value={submit.new_trophies} />
                                            <Util.True condition={submit.player_id === winner_t.player_id}><Util.Trophy /></Util.True>
                                        </td>
                                        <Util.CanManage><td className="text-center">
                                            <NavLink to={'/submits/' + submit.id + '/edit'}> <button type="button"
                                                className="btn btn-success"><Icon fontSize='small'>edit</Icon></button></NavLink>
                                        </td >
                                        </Util.CanManage>
                                    </tr >
                                ))
                            }
                        </tbody >

                    </table >
                </div > : null

            }
        </div >


    )

}
export default MONTHS_VIEW