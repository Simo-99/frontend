import { useEffect, useState } from 'react'
import { UseAxios, UseTable, getNames } from "../../utility";
import { NavLink, useParams } from 'react-router-dom';

const Years_View = () => {

    const [data, setData] = useState({ totals: {}, submits: {} });
    const { year } = useParams();
    const names = getNames();

    useEffect(() => { (async () => { setData(await UseAxios('/years/' + year + "?t=yes")); })() }, [])

    return (

        <>
            <div className="container my-3">

                <table id="table" className="table table-striped table-dark">


                    <thead>
                        <tr>
                            <th className="text-primary">{year}</th>
                            <th className="text-warning">{Intl.NumberFormat('en-GB').format(data.totals.resources)}</th>
                            <th className="text-warning">{Intl.NumberFormat('en-GB').format(data.totals.points)}</th>
                        </tr>
                        <tr className="clickable text-danger">
                            <th>Month</th>
                            <th>New Resources</th>
                            <th>New Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(data.submits).map((submit) => (

                            <tr key={submit[0]}>
                                <td>
                                    <NavLink className="nav-link outline" to={'/months/' + submit[1].month + '?y=' + submit[1].year}>
                                        {names[submit[1].month]} {submit[0].id}</NavLink>
                                </td>
                                <td>{Intl.NumberFormat('en-GB').format(submit[1].resources)}</td>
                                <td>{Intl.NumberFormat('en-GB').format(submit[1].points)}</td>
                            </tr>

                        ))}
                    </tbody>

                </table>
                {UseTable()}

            </div >


        </>

    )

}
export default Years_View