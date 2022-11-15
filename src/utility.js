import axios from 'axios';

import $ from 'jquery';
import DataTable from "datatables.net"

export function useClient() {

    //let a = axios.create({ baseURL: 'http://localhost:3000' });

    let a = axios.create({ baseURL: 'https://therockisalie.cyclic.app' });

    if (getToken()) a.defaults.headers.common["Authorization"] = "Bearer " + getToken();

    return a;

}

export async function UseAxios(url, method = 'GET', params = {}) {

    return (await useClient()({ method: method, url: url, data: params }).then(({ data }) => data))
}


export function UseTable(delay = 1500) {


    setTimeout(() => {

        if (!$.fn.dataTable.isDataTable('#table'))
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
export function getUser() { return JSON.parse(getStorage("user")) }
export function getToken() { return getUser()?.token }
export function getRole() { return getUser()?.is_admin }
export function canManage() { return getRole() == 2 }

export function getStorage(key) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null

    const item = JSON.parse(itemStr)
    const now = new Date()

    if (now.getTime() > item.expiry) { localStorage.removeItem(key); return null; }
    return item.value
}

export function setStorage(key, value, ttl = 1000 * 60 * 59 * 2) { localStorage.setItem(key, JSON.stringify({ value: value, expiry: new Date().getTime() + ttl })) }
