import axios from 'axios';

import $ from 'jquery';
import DataTable from "datatables.net"

export function useClient() {

    const user = getUser();
    let a = axios.create({ baseURL: 'https://nicehome.duckdns.org/siti/trial2/public/api/v1' });

    if (user?.token)
        a.defaults.headers.common["Authorization"] = "Bearer " + user?.token;

    return a;

}

export function useTable() {


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

        }, 1000);


    }

}

export function useTableHall() {

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
                    "aoColumnDefs": [{ "sType": "pct", "aTargets": [3] }]

                });

        }, 1000);

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
}


export function getNames() { return ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }
export function getUser() { return JSON.parse(localStorage.getItem("user")) }
export function getToken() { return getUser()?.token }
export function getRole() { return getUser()?.is_admin }


