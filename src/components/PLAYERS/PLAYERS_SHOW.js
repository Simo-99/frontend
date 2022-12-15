import * as Hooks from '../../hooks';

const PLAYERS_SHOW = () => { Hooks.useFetch("/players/" + Hooks.useFind().id, "PUT", { inside: 1 }, -1) }

export default PLAYERS_SHOW