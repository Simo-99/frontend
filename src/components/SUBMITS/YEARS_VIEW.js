import * as Hooks from '../../hooks';
import * as Util from "../CUSTOM"

const YEAR_VIEW = () => {

    const { year } = Hooks.useFind();
    const { data, loading } = Hooks.useFetch('/years/' + year + "?t=yes")

    Hooks.useBind(39, "post")
    Hooks.useBind(37, "pre")

    if (!loading)
        return (

            <>
                <div className="container my-3">

                    <table id="table" className="table table-striped table-dark">


                        <thead>
                            <tr>
                                <Util.YearCell year={year - 1} cellClasses="text-warning" extraClasses='pre' />
                                <Util.YearCell year={year} cellClasses="text-center text-primary" colSpan={3} />
                                <Util.YearCell year={parseInt(year) + 1} cellClasses="text-end text-warning" extraClasses='post' />
                            </tr>
                            <Util.True condition={data?.totals}>
                                <tr className="text-light">
                                    <th colSpan={2} className="text-muted" >Totals</th>
                                    <Util.NumericCell cellClasses='outline' value={data?.totals?.resources} />
                                    <Util.NumericCell cellClasses='outline' value={data?.totals?.points} />
                                    <Util.NumericCell cellClasses='outline' value={data?.totals?.trophies} />
                                </tr>
                                <tr className="clickable text-danger sorting">
                                    <Util.HeadersCreate headers={["Year", "Month", "New Resources", "New Points", "New Trophies"]} />
                                </tr>
                            </Util.True>
                        </thead>
                        <tbody>
                            {

                                data?.submits?.map((submit) => (


                                    <tr key={submit.month}>
                                        <Util.YearCell year={submit.year} />
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