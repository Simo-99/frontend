import axios from 'axios';
import { activateSorting } from "./sorting"
import { getStorage } from "./storage"

export function useClient() {
    
    let a = axios.create({ baseURL: process.env.REACT_APP_TRIAL_BACKEND_URL });
    a = axios.create({ baseURL: 'http://localhost:3000' });

    if (getToken()) a.defaults.headers.common["Authorization"] = "Bearer " + getToken();

    return a;

}


export async function UseAxios(url, method = 'GET', params = {}) {

    return (await useClient()({ method: method, url: url, data: params }).then(({ data }) => data))
}

export function delay(delay) { return new Promise(res => setTimeout(res, delay)) }
export function UseSort() { activateSorting() }
export function getName(month) { return ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month] }
export function getUser() { return JSON.parse(getStorage("user")) }
export function getToken() { return getUser()?.token }
export function getRole() { return getUser()?.role }
export function canManage() { return getRole() === 2 }


