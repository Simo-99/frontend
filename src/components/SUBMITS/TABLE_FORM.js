import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAxios } from "../../utility";

const TABLE_FORM = () => {

    const [tables, setTables] = useState([]);
    const day = new Date();
    const [month, setMonth] = useState(day.getMonth());
    const [year, setYear] = useState(day.getFullYear());
    const Navigate = useNavigate();
    useEffect(() => { (async function getPlayer() { setTables(await UseAxios("/tables")) })() }, []);

    const save = async (e) => {

        e.preventDefault();
        tables.map(async (table) => {

            if (table.resources > 0 || table.points > 0 || table.trophies > 0)
                await UseAxios("/tables/" + table.player, "PUT", { resources: table.resources, points: table.points, trophies: table.trophies });

        });


    }
    const executeSubmit = async (e) => {
        e.preventDefault();
        save(e)

        if (window.confirm("these data will be added into the DB, are you sure?")) {
            tables.map(async (table) => {

                if (table.resources > 0 || table.points > 0 || table.trophies > 0)
                    await UseAxios("/submits/", "POST", {
                        resources: table.resources, points: table.points, trophies: table.trophies,
                        player_id: table.player, month: month, year: year
                    });


            });

            Navigate("/months/" + month + "?y=" + year);
        }


    }

    const saveRow = async (table) => await UseAxios("/tables/" + table.player, "PUT", { resources: table.resources, points: table.points, trophies: table.trophies })

    return (
        <>
            <br /><br />


            <div className="d-flex flex-column mx-auto w-25 justify-content-center">
                <table id="table" className="table table-striped table-dark">
                    <thead className="text-primary"><tr><th>Year</th><th>Month</th></tr></thead>
                    <tbody><tr>
                        <td><input onChange={(e) => setYear(e.target.value)} type="text" className="form-control bg-secondary border-dark outline text-white" defaultValue={year} /> </td>
                        <td> <input onChange={(e) => setMonth(e.target.value)} type="text" className="form-control bg-secondary border-dark outline text-white" defaultValue={month} /></td>
                    </tr></tbody>
                </table>
            </div>
            <div className="d-flex flex-column mx-auto w-75 justify-content-center">


                <table id="table" className="table table-striped table-dark">

                    <thead className="text-danger">
                        <tr>
                            <th>Player</th>
                            <th>Resources</th>
                            <th>Points</th>
                            <th>Trophies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table, index) => (

                            <tr key={JSON.stringify(table)}>

                                <td className={table.Player.color === '#000000' ? "outline2" : "outline"} style={{ color: table.Player.color }}>{table.Player.name}</td>
                                <td><input onChange={(e) => tables[index].resources = e.target.value}
                                    onBlur={() => saveRow(table)}
                                    type="text" className="form-control bg-secondary border-dark outline text-white" defaultValue={table.resources} />
                                </td>

                                <td><input onChange={(e) => tables[index].points = e.target.value}
                                    onBlur={() => saveRow(table)}
                                    type="text" className="form-control bg-secondary border-dark outline text-white" defaultValue={table.points} />
                                </td>

                                <td><input onChange={(e) => tables[index].trophies = e.target.value}
                                    onBlur={() => saveRow(table)}
                                    type="text" className="form-control bg-secondary border-dark outline text-white" defaultValue={table.trophies} />
                                </td>

                            </tr>

                        ))}
                    </tbody>
                </table>
                <button onClick={save} className=" bg outline btn btn-secondary text-success border border-2 border-dark">Save</button>
                <button onClick={executeSubmit} className=" bg outline btn btn-secondary text-success border border-2 border-dark">Add Into DB</button>

                <br />
            </div>
        </>
    )

}
export default TABLE_FORM