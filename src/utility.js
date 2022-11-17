import axios from 'axios';
import { activateSorting } from "./sorting"

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

export function UseSort() { activateSorting() }

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

