import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getName, UseAxios } from "../../utility";

const Submit_Edit = () => {
    const [submit, setSubmit] = useState({});
    const [player, setPlayer] = useState({});

    const [resources, setResouces] = useState();
    const [points, setPoints] = useState();
    const [trophies, setTrophies] = useState();

    const [new_resources, setNew_resources] = useState();
    const [new_points, setNew_points] = useState();
    const [new_trophies, setNew_trophies] = useState();


    const { id } = useParams();


    const navigate = useNavigate()


    useEffect(() => {

        (async function getPlayer() {

            const data = await UseAxios('/submits/' + id + "?p=yes");
            setSubmit(data);
            setPlayer(data.player);
            setResouces(data.resources);
            setPoints(data.points);
            setTrophies(data.trophies);

            setNew_points(data.new_points);
            setNew_resources(data.new_resources);
            setNew_trophies(data.new_trophies);

        })()
    }, []);



    const handleSubmit = async (e) => {

        e.preventDefault();
        await UseAxios('/submits/' + id + "?p=yes", "PUT", { resources: resources, new_resources: new_resources, points: points, new_points: new_points, trophies: trophies, new_trophies: new_trophies });
        navigate(-1);

    }

    return (
        <>
            <br /><br />
            <div className="d-flex flex-column mx-auto w-75 justify-content-center">

                <table id="table" className="table table-striped table-dark">

                    <thead>
                        <tr>
                            <td className='text-primary'>{submit.year} - {getName(submit.month)}</td>
                            <td className='text-center' style={{ color: player.color }} colSpan={10}>{player.name}</td>
                        </tr >
                        <tr className='text-danger'>
                            <th>Resources</th>
                            <th>Points</th>
                            <th>Trophies</th>
                            <th>New Resources</th>
                            <th>New Points</th>
                            <th>New Trophies</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td><input onChange={(e) => setResouces(e.target.value)} type="text" className="form-control bg-secondary border-dark" defaultValue={submit.resources} /></td>
                            <td><input onChange={(e) => setPoints(e.target.value)} type="text" className="form-control bg-secondary border-dark" defaultValue={submit.points} /></td>
                            <td><input onChange={(e) => setTrophies(e.target.value)} type="text" className="form-control bg-secondary border-dark" defaultValue={submit.trophies} /></td>
                            <td><input onChange={(e) => setNew_resources(e.target.value)} type="text" className="form-control bg-secondary border-dark" defaultValue={submit.new_resources} /></td>
                            <td><input onChange={(e) => setNew_points(e.target.value)} type="text" className="form-control bg-secondary border-dark" defaultValue={submit.new_points} /></td>
                            <td><input onChange={(e) => setNew_trophies(e.target.value)} type="text" className="form-control bg-secondary border-dark" defaultValue={submit.new_trophies} /></td>

                        </tr>
                    </tbody>
                </table>
                <button onClick={handleSubmit} className="outline btn btn-dark text-success">Edit</button>
            </div>
        </>
    )

}
export default Submit_Edit