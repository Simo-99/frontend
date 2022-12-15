import * as Hooks from '../../hooks';
import * as Util from "../CUSTOM"

const FORMERS = () => {
    const { data, loading } = Hooks.useFetch('/players?s=hidden&o=asc')

    if (!loading)
        return (

            <>
                <div className="container my-4" style={{ width: '50%' }}>
                    <table id="table" className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <Util.NumericCell cellClasses='text-center outline text-muted' colSpan={3} pre="Former members: " value={data.length} />
                            </tr>
                            <tr className=' clickable text-danger sorting'>
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
                                            <Util.Icon link={'/players/' + player.id + '/show'} iconName="visibility" ButtonClass='btn btn-outline-warning' />
                                            <Util.Icon link={'/players/' + player.id + '/delete'} iconName="delete" ButtonClass='btn btn-outline-danger' />

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
export default FORMERS
