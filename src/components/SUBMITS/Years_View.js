import { useEffect, useState } from 'react'
import { UseAxios } from "../../utility";
import { useParams } from 'react-router-dom';
import * as Util from "../CUSTOM"

const YEAR_VIEW = () => {

    const [data, setData] = useState({ totals: {}, submits: {} });
    const { year } = useParams();

    useEffect(() => { (async () => { setData(await UseAxios('/years/' + year + "?t=yes")); })() }, [year])

    return (

        <>
            <div className="container my-3">

                <table id="table" className="table table-striped table-dark">


                    <thead>
                        <tr className="text-warning">
                            <Util.YearCell year={year} extraClasses="text-primary" />
                            <Util.NumericCell value={data.totals.resources} />
                            <Util.NumericCell value={data.totals.points} />
                            <Util.NumericCell value={data.totals.trophies} />
                        </tr>
                        <tr className="clickable text-danger sorting">
                            <th>Month</th>
                            <th>New Resources</th>
                            <th>New Points</th>
                            <th>New Trophies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.values(data.submits)?.map((submit) => (


                                <tr key={submit.month}>
                                    <Util.MonthCell month={submit.month} year={submit.year} />
                                    <Util.NumericCell value={submit.resources} />
                                    <Util.NumericCell value={submit.points} />
                                    <Util.NumericCell value={submit.trophies} />
                                </tr>

                            ))

                        }
                    </tbody>

                </table>

            </div >


        </>

    )

}
export default YEAR_VIEW