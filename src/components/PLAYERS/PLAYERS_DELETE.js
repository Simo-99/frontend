import * as Hooks from '../../hooks';

const PLAYERS_DELETE = () => { Hooks.useFetch('/players/' + Hooks.useFind().id, "DELETE", {}, -1) }

export default PLAYERS_DELETE