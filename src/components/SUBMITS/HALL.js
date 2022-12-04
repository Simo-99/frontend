import { useEffect, useState } from 'react'
import { UseAxios } from "../../utility";
import * as Util from "../CUSTOM"

const HALL = () => {

    const [submits, setSubmits] = useState([]);
    useEffect(() => { (async () => { setSubmits(await UseAxios("/winners")); })() }, []);

    return (

        <div className="container my-3">

            <table id="table" className="table table-striped table-dark">

                <thead>
                    <tr className="text-danger sorting">
                        <Util.HeadersCreate headers={["Year", "Month", "New Resources", "New Points"]} />
                    </tr>
                </thead>
                <tbody>
                    {submits.map((submit) => (
                        < tr key={JSON.stringify(submit)} >
                            <Util.YearCell year={submit.year} />
                            <Util.MonthCell month={submit.month} year={submit.year} />
                            <td>
                                <Util.Number value={submit.res.new_resources} post=" " />
                                <Util.PlayerName player={submit.res.player} />
                            </td>
                            <td>
                                <Util.Number value={submit.points.new_points} post=" " />
                                <Util.PlayerName player={submit.points.player} />
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>


        </div >

    )
}

export default HALL