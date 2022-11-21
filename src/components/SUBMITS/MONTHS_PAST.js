import { useEffect, useState } from 'react'
import { UseAxios } from "../../utility";
import * as Util from "../CUSTOM"

const MONTH_PAST = () => {

    const [submits, setSubmits] = useState([]);


    useEffect(() => { (async () => { setSubmits(await UseAxios("/months")); })() }, []);

    return (

        <>
            <div className="container my-3">

                <table id="table" className="table table-striped table-dark">

                    <thead>

                        <tr className="text-danger sorting">
                            <th>Year</th>
                            <th>Month</th>
                            <th>New Resources</th>
                            <th>New Points</th>
                            <th>New Trophies</th>
                        </tr>

                    </thead>

                    <tbody>
                        {submits.map((month) => (
                            <tr key={JSON.stringify(month)}>
                                <Util.YearCell year={month.year} />
                                <Util.MonthCell month={month.month} year={month.year} />
                                <Util.NumericCell value={month.resources} />
                                <Util.NumericCell value={month.points} />
                                <Util.NumericCell value={month.trophies} />
                            </tr>
                        ))}
                    </tbody>

                </table >
            </div >
        </>

    )

}
export default MONTH_PAST