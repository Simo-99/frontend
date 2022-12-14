import useFetch from '../../useFetch';
import { canManage } from "../../utility";
import { useParams, useSearchParams } from 'react-router-dom';
import * as Util from "../CUSTOM"

const MONTHS_VIEW = () => {

    const { month } = useParams();
    const [search] = useSearchParams();
    const year = search.get("y");
    const { data, loading } = useFetch('/months/' + month + "?t=yes&b=yes&y=" + year)

    if (!loading)
        return (

            <div>

                < div className="container my-3" >
                    <table id="table" className="table table-striped table-dark">

                        <thead>
                            <tr>
                                <th>
                                    <Util.True condition={month > 1} otherwise={<Util.Month month={12} year={year - 1} extraClasses="text-warning" />}>
                                        <Util.Month month={month - 1} year={year} extraClasses="text-warning" />
                                    </Util.True>
                                </th>
                                <th className="text-primary  text-center" colSpan={canManage() ? '6' : '5'}>
                                    <Util.Year year={year} /> - <Util.Month month={month} year={year} />
                                </th>
                                <th className="text-end">
                                    <Util.True condition={month < 12} otherwise={<Util.Month month={1} year={parseInt(year) + 1} extraClasses="text-warning" />}>
                                        <Util.Month month={parseInt(month) + 1} year={year} extraClasses="text-warning" />
                                    </Util.True>
                                </th>
                            </tr>
                            <Util.True condition={data?.totals?.resources}>
                                <tr className='text-light'>
                                    <th colSpan={4} className="text-muted">Totals</th>
                                    <th><Util.Number value={data.totals?.resources} /></th>
                                    <th><Util.Number value={data.totals?.points} /></th>
                                    <th><Util.Number value={data.totals?.trophies} /></th>
                                    <Util.CanManage><th></th></Util.CanManage>
                                </tr >
                                <tr className="text-danger sorting">
                                    <Util.HeadersCreate headers={["Name", "Resources", "Points", "Trophies", "New Resources", "New Points", "New Trophies"]} />
                                    <Util.CanManage><th className="text-center">Actions</th></Util.CanManage>
                                </tr>
                            </Util.True>

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
                                                        <Util.Coffee />
                                                    </Util.True>
                                                    <Util.True condition={submit.player_id != 3 && submit.player_id != 6}>
                                                        <Util.AngryFace />
                                                    </Util.True>
                                                </Util.True>
                                                <Util.True condition={submit.player_id === data.winner_r.player_id}><Util.Trophy /></Util.True>
                                            </td>
                                            <td>
                                                <Util.Number value={submit.new_points} />
                                                <Util.True condition={submit.player_id === data.winner_p.player_id}><Util.Trophy /></Util.True>
                                            </td>
                                            <td>
                                                <Util.Number value={submit.new_trophies} />
                                                <Util.True condition={submit.player_id === data.winner_t.player_id && submit.new_trophies > 0}><Util.Trophy /></Util.True>
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