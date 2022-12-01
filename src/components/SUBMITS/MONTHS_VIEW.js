import { useEffect, useState } from 'react'
import { canManage, UseAxios } from "../../utility";
import { useParams, useSearchParams } from 'react-router-dom';
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

            < div className="container my-3" >
                <table id="table" className="table table-striped table-dark">

                    <thead>
                        <tr>
                            <th>
                                <Util.True condition={month > 1}>
                                    <Util.Month month={month - 1} year={year} extraClasses="text-warning" />
                                </Util.True>
                            </th>
                            <th className="text-primary  text-center" colSpan={canManage() ? '6' : '5'}>
                                <Util.Year year={year} /> - <Util.Month month={month} year={year} />
                            </th>
                            <th className="text-end">
                                <Util.True condition={month < 12}>
                                    <Util.Month month={parseInt(month) + 1} year={year} extraClasses="text-warning" />
                                </Util.True>
                            </th>
                        </tr>
                        {data.submits?.length > 0 ?
                            <>
                                <tr className='text-light'>
                                    <th colSpan={4} className="text-muted">Totals</th>
                                    <th><Util.Number value={data.totals.resources} /></th>
                                    <th><Util.Number value={data.totals.points} /></th>
                                    <th><Util.Number value={data.totals.trophies} /></th>
                                    <Util.CanManage><th></th></Util.CanManage>
                                </tr >
                                <tr className="text-danger sorting">
                                    <Util.HeadersCreate headers={["Name", "Resources", "Points", "Trophies", "New Resources", "New Points", "New Trophies"]} />
                                    <Util.CanManage><th className="text-center">Actions</th></Util.CanManage>
                                </tr>
                            </> : null}

                    </thead >

                    < tbody >
                        {
                            data.submits?.length > 0 ?
                                Object.values(data.submits)?.map((submit) => (

                                    <tr key={JSON.stringify(submit)}>

                                        <td><Util.PlayerName player={{ color: submit.color, id: submit.player_id, name: submit.name }} /></td>
                                        <Util.NumericCell value={submit.resources} />
                                        <Util.NumericCell value={submit.points} />
                                        <Util.NumericCell value={submit.trophies} />
                                        <td>
                                            <Util.Number value={submit.new_resources} />
                                            <Util.True condition={submit.new_resources < 280000}>
                                                <Util.True condition={submit.player_id == 6}>
                                                    <Util.Popcorn />
                                                </Util.True>
                                                <Util.True condition={submit.player_id == 3}>
                                                    <Util.Icon iconName="coffee" ButtonClass='btn' />
                                                </Util.True>
                                                <Util.True condition={submit.player_id != 3 && submit.player_id != 6}>
                                                    <Util.AngryFace />
                                                </Util.True>
                                            </Util.True>
                                            <Util.True condition={submit.player_id === winner_r.player_id}><Util.Trophy /></Util.True>
                                        </td>
                                        <td>
                                            <Util.Number value={submit.new_points} />
                                            <Util.True condition={submit.player_id === winner_p.player_id}><Util.Trophy /></Util.True>
                                        </td>
                                        <td>
                                            <Util.Number value={submit.new_trophies} />
                                            <Util.True condition={submit.player_id === winner_t.player_id && submit.new_trophies > 0}><Util.Trophy /></Util.True>
                                        </td>
                                        <Util.CanManage>
                                            <td className="text-center">
                                                <Util.Icon iconName="edit" link={'/submits/' + submit.id + '/edit'} />
                                            </td >
                                        </Util.CanManage>
                                    </tr >
                                ))
                                : null
                        }
                    </tbody >

                </table >
            </div >
        </div >


    )

}
export default MONTHS_VIEW