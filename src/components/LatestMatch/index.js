import {Component} from 'react'

class LatestMatch extends Component {
  render() {
    const {latestMatch} = this.props
    const {
      competingTeam,
      umpires,
      result,
      manOfTheMatch,
      date,
      venue,
      competingTeamLogo,
      firstInnings,
      secondInnings,
    } = latestMatch

    return (
      <div className="card-container">
        <h1 className="heading">Latest Match</h1>
        <div className="match-card">
          <div className="logo-container">
            <div className="match-details">
              <p className="text">{competingTeam}</p>
              <p className="text">{date}</p>
              <p className="text">{venue}</p>
              <p className="text">{result}</p>
            </div>
            <img
              src={competingTeamLogo}
              alt={`latest match ${competingTeam}`}
            />
          </div>
          <div className="match-details-info">
            <div className="match-info-item">
              <p className="text">First Innings</p>
              <p className="text">{firstInnings}</p>
            </div>
            <div className="match-info-item">
              <p className="text">Second Innings</p>
              <p className="text">{secondInnings}</p>
            </div>
            <div className="match-info-item">
              <p className="text">Man Of The Match</p>
              <p className="text">{manOfTheMatch}</p>
            </div>
            <div className="match-info-item">
              <p className="text">Umpires</p>
              <p className="text">{umpires}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LatestMatch
