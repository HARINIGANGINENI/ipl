import {Component} from 'react'

class MatchCard extends Component {
  render() {
    const {matchData} = this.props
    const {matchStatus, competingTeamLogo, competingTeam, result} = matchData

    return (
      <li className="match-card">
        <img src={competingTeamLogo} alt={competingTeam} />
        <p className="name"> {competingTeam}</p>
        <p className="result">{result}</p>
        <p className="status">{matchStatus}</p>
      </li>
    )
  }
}
export default MatchCard
