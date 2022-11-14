import { useEffect, useState } from 'react'
import { UseTable, canManage, UseAxios } from "../../utility";
import { NavLink } from 'react-router-dom';

const Players = () => {

    const [actives, setActives] = useState([])

    useEffect(() => { (async function getData() { setActives(await UseAxios("/players?s=active&o=asc")); })() }, []);

    return (

        <>
            <div className="container my-4" style={{ width: '50%' }}>
                <table id="table" className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th className="clickable text-danger">Name</th>
                            <th className="clickable text-danger">Color</th>
                            {canManage() ? <th className="clickable text-danger text-center">Actions</th> : null}
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
                {UseTable()}

            </div >
        </>

    )

}
export default Players
