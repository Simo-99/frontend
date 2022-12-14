import useFetch from '../../useFetch';
import * as Util from "../CUSTOM"

const PLAYERS = () => {

    const { data, loading } = useFetch('/players?s=active&o=asc')

    if (!loading)
        return (

            <>
                <div className="container my-4" style={{ width: '50%' }}>
                    <table id="table" className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <Util.NumericCell cellClasses='text-center outline text-muted' colSpan={3} pre="Active Members: " value={data.length} />
                            </tr>
                            <tr className="text-danger sorting">
                                <Util.HeadersCreate headers={["Name", "Color"]} />
                                <Util.CanManage><th className="text-center">Actions</th></Util.CanManage>
                            </tr>
                        </thead>
                        <tbody>

                            {data.map((player) => (

                                <tr key={player.id}>

                                    <Util.PlayerWithSquareCell player={player} />
                                    <td>{player.color}</td>
                                    <Util.CanManage>
                                        <td className="text-center">
                                            <Util.Icon link={'/players/' + player.id + '/edit'} iconName="edit" />
                                            <Util.Icon link={'/players/' + player.id + '/hide'} iconName="visibility_off" ButtonClass='btn btn-outline-warning' />
                                        </td>
                                    </Util.CanManage>
                                </tr >

                            ))
                            }


                        </tbody >
                    </table >

                </div >
            </>

        )

}
export default PLAYERS
