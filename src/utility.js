import axios from 'axios';

import $ from 'jquery';
import DataTable from "datatables.net"

export function useClient() {

    //# for just local testing
    //let a = axios.create({ baseURL: 'http://localhost:3000' });

    let a = axios.create({ baseURL: 'https://therockisalie.cyclic.app' });

    if (getToken()) {
        a.defaults.headers.common["Authorization"] = "Bearer " + getToken();
    }
    return a;

}

export async function UseAxios(url, method = 'GET', params = {}) {

    return await useClient()({ method: method, url: url, data: params }).then(({ data }) => data);
}

export function useTable(delay = 1000) {


    return () => {
        setTimeout(() => {

            if ($.fn.dataTable.isDataTable('#table'))
                $('#table').DataTable();
            else
                $('#table').DataTable({

                    paging: false,
                    searching: false,
                    "bInfo": false,
                    "order": [],

                });

        }, delay);


    }

}
export function UseTable(delay = 1000) {

    setTimeout(() => {

        if ($.fn.dataTable.isDataTable('#table'))
            $('#table').DataTable();
        else
            $('#table').DataTable({

                paging: false,
                searching: false,
                "bInfo": false,
                "order": [],

            });

    }, delay);


}
export function UseTableHall(delay = 900) {

    setTimeout(() => {

        if ($.fn.dataTable.isDataTable('#table'))
            $('#table').DataTable();
        else
            $('#table').DataTable({

                paging: false,
                searching: false,
                "bInfo": false,
                "order": [],
                "aoColumnDefs": [{ "sType": "pct", "aTargets": [3] }]

            });

    }, delay);

    $.fn.dataTableExt.oSort['pct-asc'] = function (x, y) {
        x = parseFloat(x);
        y = parseFloat(y);

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    };

    $.fn.dataTableExt.oSort['pct-desc'] = function (x, y) {
        x = parseFloat(x);
        y = parseFloat(y);

        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    };

}


export function getName(month) { return getNames()[month] }
export function getNames() { return ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }
export function getUser() { return JSON.parse(localStorage.getItem("user")) }
export function getToken() { return getUser()?.token }
export function getRole() { return getUser()?.is_admin }
export function canManage() { return getUser()?.is_admin == 2 }


