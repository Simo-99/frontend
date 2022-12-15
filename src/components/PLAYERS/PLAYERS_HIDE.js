import * as Hooks from '../../hooks';

const PLAYERS_HIDE = () => { Hooks.useFetch("/players/" + Hooks.useFind().id, "PUT", { inside: 0 }, -1) }

export default PLAYERS_HIDE
