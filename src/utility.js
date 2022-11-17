import axios from 'axios';

import $ from 'jquery';
import DataTable from "datatables.net"

export function useClient() {

    //UseSort()
    //let a = axios.create({ baseURL: 'http://localhost:3000' });

    let a = axios.create({ baseURL: 'https://therockisalie.cyclic.app' });

    if (getToken()) a.defaults.headers.common["Authorization"] = "Bearer " + getToken();

    return a;

}

export async function UseAxios(url, method = 'GET', params = {}) {

    return (await useClient()({ method: method, url: url, data: params }).then(({ data }) => data))
}

export function UseSort() {

    $(setTimeout(() => {

        $('.sorting th').off("click")
        $('.sorting th').on("click", function () {

            var table = $(".table")
            var rows = table.find('tbody').children().toArray().sort(comparer($(this).index()))

            $(this).asc = !$(this).asc;
            rows = $(this).asc ? rows : rows.reverse()

            for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
        })

    }, 1000));

}

export function getName(month) { return getNames()[month] }
export function getNames() { return ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }
export function getUser() { return JSON.parse(getStorage("user")) }
export function getToken() { return getUser()?.token }
export function getRole() { return getUser()?.role }
export function canManage() { return getRole() == 2 }
export function setStorage(key, value, ttl = 1000 * 60 * 59 * 2) { localStorage.setItem(key, JSON.stringify({ value: value, expiry: new Date().getTime() + ttl })) }
export function getStorage(key) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null

    const item = JSON.parse(itemStr)
    const now = new Date()

    if (now.getTime() > item.expiry) { localStorage.removeItem(key); return null; }
    return item.value
}

function getCellValue(row, index) { return $(row).children('td').eq(index).text() }
function parseNumeric(value) { return +value.replace(/,/g, '') }
function isNumeric2(value) { return !isNaN(+value.replace(/,/g, '')); }
function cleanCellValue(value) { return value.split(" ")[0] }
function comparer(index) {
    return function (a, b) {
        var valA = cleanCellValue(getCellValue(a, index))
        var valB = cleanCellValue(getCellValue(b, index))
        return isNumeric2(valA) && isNumeric2(valB) ? parseNumeric(valA.replace(',', '')) - parseNumeric(valB.replace(',', '')) : valA.toString().localeCompare(valB.toString())
    }
}