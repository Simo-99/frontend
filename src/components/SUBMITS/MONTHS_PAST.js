import * as Hooks from '../../hooks';
import * as Util from "../CUSTOM"

const MONTH_PAST = () => {

    const { data, loading } = Hooks.useFetch("/months/")

    if (!loading)
        return (

            <>
                <div className="container my-3">

                    <table id="table" className="table table-striped table-dark">

                        <thead>

                            <tr className="text-danger sorting">
                                <Util.HeadersCreate headers={["Year", "Month", "New Resources", "New Points", "New Trophies"]} />
                            </tr>

                        </thead>

                        <tbody>
                            {data.map((month) => (
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