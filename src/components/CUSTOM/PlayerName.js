
function PlayerName({ player }) {
    return (<span className={player.color === "#000000" ? 'outline2' : 'outline'} style={{ color: player.color, display: "inline" }} > {player.name}</ span >)
}

export default PlayerName