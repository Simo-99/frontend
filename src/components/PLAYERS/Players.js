import { useEffect, useState } from 'react'
import { canManage, UseAxios } from "../../utility";
import { NavLink } from 'react-router-dom';

const PLAYERS = () => {

    const [actives, setActives] = useState([])

    useEffect(() => { (async () => setActives(await UseAxios("/players?s=active&o=asc")))() }, []);

    return (

        <>
            <div className="container my-4" style={{ width: '50%' }}>
                <table id="table" className="table table-striped table-dark">
                    <thead>
                        <tr className="clickable text-danger sorting">
                            <th >Name</th>
                            <th >Color</th>
                            {canManage() ? <th className="text-center">Actions</th> : null}
                        </tr>
                    </thead>
                    <tbody>

                        {actives.map((player) => (

                            <tr key={player.id}>


                                <td className="clickable ">
                                    <div className="d-flex">
                                        <span className="btn mx-1" style={{ background: player.color, minWidth: '2em', maxHeight: "2em" }}></span>
                                        <NavLink className="nav-link" to={"/players/" + player.id + "/submits"}>{player.name}</NavLink>
                                    </div>
                                </td>
                                <td>{player.color}</td>
                                {
                                    canManage()
                                        ?
                                        <td className="text-center">
                                            <NavLink to={'/players/' + player.id + '/edit'}>
                                                <button type="button" className="btn btn-success"><i className="bi bi-pencil-square"> </i></button>
                                            </NavLink>

                                            <NavLink to={'/players/' + player.id + '/hide'}>
                                                <button type="button" className="btn btn-success m-2"><i className="bi bi-eye-slash-fill"></i></button>
                                            </NavLink>

                                        </td> : null
                                }
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
