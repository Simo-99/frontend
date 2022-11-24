import { useEffect, useState } from 'react'
import { UseAxios } from "../../utility";
import * as Util from "../CUSTOM"

const PLAYERS = () => {

    const [actives, setActives] = useState([])

    useEffect(() => { (async () => setActives(await UseAxios("/players?s=active&o=asc")))() }, []);

    return (

        <>
            <div className="container my-4" style={{ width: '50%' }}>
                <table id="table" className="table table-striped table-dark">
                    <thead>
                        <tr className="text-danger sorting">
                            <Util.HeadersCreate headers={["Name", "Color"]} />
                            <Util.CanManage><th className="text-center">Actions</th></Util.CanManage>
                        </tr>
                    </thead>
                    <tbody>

                        {actives.map((player) => (

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
