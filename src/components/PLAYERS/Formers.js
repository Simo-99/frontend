import { useEffect, useState } from 'react'
import { canManage, UseAxios } from "../../utility";
import { NavLink } from 'react-router-dom';
import { Icon } from '@mui/material';


const FORMERS = () => {

    const [players, setPlayers] = useState([])

    useEffect(() => { (async () => { setPlayers(await UseAxios("/players?s=hidden&o=asc")); })() }, []);

    return (

        <>
            <div className="container my-4" style={{ width: '50%' }}>
                <table id="table" className="table table-striped table-dark">
                    <thead>
                        <tr className=' clickable text-danger sorting'>
                            <th >Name</th>
                            <th >Color</th>
                            {canManage() ? <th className="text-center">Actions</th> : null}
                        </tr>
                    </thead>
                    <tbody>

                        {players.map((player) => (

                            <tr key={player.id}>


                                <td className="clickable ">
                                    <div className="d-flex">
                                        <i className="btn mx-1" style={{ background: player.color, minWidth: '2em', maxHeight: "2em" }}></i>
                                        <NavLink className="nav-link" to={"/players/" + player.id + "/submits"}>{player.name}                                        </NavLink>
                                    </div>
                                </td>
                                <td>{player.color}</td>
                                {
                                    canManage()
                                        ?
                                        <td className="text-center">
                                            <NavLink to={'/players/' + player.id + '/edit'}>
                                                <button type="button" className="btn btn-success m-1"><Icon fontSize='small'>edit</Icon></button>
                                            </NavLink>

                                            <NavLink to={'/players/' + player.id + '/show'}>
                                                <button type="button" className="btn btn-success m-1"><Icon fontSize='small'>visibility</Icon></button>
                                            </NavLink>

                                            <NavLink to={'/players/' + player.id + '/delete'}>
                                                <button type="button" className="btn btn-danger m-1"><Icon fontSize='small'>delete</Icon></button>
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
export default FORMERS
