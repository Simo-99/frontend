import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getName, UseAxios } from "../../utility";

const Submit_Edit = () => {
    const [submit, setSubmit] = useState({ player: {}, submit: {} });
    const { id } = useParams();


    const navigate = useNavigate()


    useEffect(() => { (async function getPlayer() { setSubmit(await UseAxios('/submits/' + id + "?p=yes")); })() }, [id]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        await UseAxios('/submits/' + id, "PUT", submit);
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
                            <td className='text-center' style={{ color: submit.player.color }} colSpan={10}>{submit.player.name}</td>
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
                            <td><input onChange={(e) => setSubmit(prev => ({ ...prev, resources: e.target.value }))}
                                className="form-control bg-secondary border-dark" defaultValue={submit.resources} /></td>
                            <td><input onChange={(e) => setSubmit(prev => ({ ...prev, points: e.target.value }))}
                                className="form-control bg-secondary border-dark" defaultValue={submit.points} /></td>
                            <td><input onChange={(e) => setSubmit(prev => ({ ...prev, trophies: e.target.value }))}
                                className="form-control bg-secondary border-dark" defaultValue={submit.trophies} /></td>
                            <td><input onChange={(e) => setSubmit(prev => ({ ...prev, new_resources: e.target.value }))}
                                className="form-control bg-secondary border-dark" defaultValue={submit.new_resources} /></td>
                            <td><input onChange={(e) => setSubmit(prev => ({ ...prev, new_points: e.target.value }))}
                                className="form-control bg-secondary border-dark" defaultValue={submit.new_points} /></td>
                            <td><input onChange={(e) => setSubmit(prev => ({ ...prev, new_trophies: e.target.value }))}
                                className="form-control bg-secondary border-dark" defaultValue={submit.new_trophies} /></td>

                        </tr>
                    </tbody>
                </table>
                <button onClick={handleSubmit} className="outline btn btn-dark text-success">Edit</button>
            </div>
        </>
    )

}
export default Submit_Edit