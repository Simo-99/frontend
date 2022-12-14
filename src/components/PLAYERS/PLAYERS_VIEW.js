import * as Hooks from '../../hooks';
import * as Util from "../CUSTOM"

const PLAYERS_VIEW = () => {
    const { id } = Hooks.useFind()
    const { data, loading } = Hooks.useFetch("/players/" + id + "?s=yes")

    if (!loading)
        return (

            <div className="container my-3">

                <table id="table" className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th colSpan='9' className="text-center">
                                <Util.PlayerName player={data.player} />
                                <Util.CanManage>
                                    <Util.Icon ButtonClass='btn btn-dark' iconName="edit" link={'/players/' + data.player.id + '/edit'} />
                                </Util.CanManage>
                            </th>
                        </tr>
                        <tr className="text-danger sorting">
                            <Util.HeadersCreate headers={["Year", "Month", "Resources", "Points", "Trophies", "New Resources", "New Points", "New Trophies"]} />
                            <Util.CanManage><th className="text-center">Actions</th></Util.CanManage>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.submits.map((submit) => (
                                < tr key={submit.id} >
                                    <Util.YearCell year={submit.year} />
                                    <Util.MonthCell month={submit.month} year={submit.year} />
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
                                        <Util.True condition={submit.winner_r}><Util.Trophy /></Util.True>
                                    </td>
                                    <td>
                                        <Util.Number value={submit.new_points} />
                                        <Util.True condition={submit.winner_p}><i className="text-warning bi bi-trophy-fill outline"></i> </Util.True>
                                    </td>
                                    <td>
                                        <Util.Number value={submit.new_trophies} />
                                        <Util.True condition={submit.winner_t && submit.new_trophies > 0}><Util.Trophy /></Util.True>
                                    </td>
                                    <Util.CanManage>
                                        <td className="text-center">
                                            <Util.Icon iconName="edit" link={'/submits/' + submit.id + '/edit'} />
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