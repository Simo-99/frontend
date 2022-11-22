import { useEffect, useState } from 'react'
import { UseAxios } from "../../utility";
import * as Util from "../CUSTOM"

const FORMERS = () => {

    const [players, setPlayers] = useState([])

    useEffect(() => { (async () => { setPlayers(await UseAxios("/players?s=hidden&o=asc")); })() }, []);

    return (

        <>
            <div className="container my-4" style={{ width: '50%' }}>
                <table id="table" className="table table-striped table-dark">
                    <thead>
                        <tr className=' clickable text-danger sorting'>
                            <Util.HeadersCreate headers={["Name", "Color"]} />
                            <Util.CanManage><th className="text-center">Actions</th></Util.CanManage>
                        </tr>
                    </thead>
                    <tbody>

                        {players.map((player) => (

                            <tr key={player.id}>

                                <Util.PlayerWithSquareCell player={player} />
                                <td>{player.color}</td>
                                <Util.CanManage>
                                    <td className="text-center">
                                        <Util.Icon link={'/players/' + player.id + '/edit'} iconName="edit" />
                                        <Util.Icon link={'/players/' + player.id + '/show'} iconName="visibility" ButtonClass='btn btn-warning' />
                                        <Util.Icon link={'/players/' + player.id + '/delete'} iconName="delete" ButtonClass='btn btn-danger' />

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
