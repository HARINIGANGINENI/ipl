import Loader from 'react-loader-spinner'

import {Component} from 'react'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {matchesData: [], isLoading: true}

  componentDidMount = () => {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()

    const updatedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: {
        id: fetchedData.latestMatchDetails.id,
        umpires: fetchedData.latestMatchDetails.umpires,
        result: fetchedData.latestMatchDetails.result,
        date: fetchedData.latestMatchDetails.data,
        venue: fetchedData.latestMatchDetails.venue,
        manOfTheMatch: fetchedData.latestMatchDetails.man_of_the_match,
        competingTeam: fetchedData.latestMatchDetails.competing_team,
        competingTeamLogo: fetchedData.latestMatchDetails.competing_team_logo,
        firstInnings: fetchedData.latestMatchDetails.first_innings,
        secondInnings: fetchedData.latestMatchDetails.second_innings,
        matchStatus: fetchedData.latestMatchDetails.match_status,
      },
      recentMatches: fetchedData.recent_matches.map(eachMatch => ({
        umpires: eachMatch.umpires,
        result: eachMatch.result,
        manOfTheMatch: eachMatch.man_of_the_match,
        id: eachMatch.id,
        date: eachMatch.date,
        venue: eachMatch.venue,
        competingTeam: eachMatch.competing_team,
        competingTeamLogo: eachMatch.competing_team_logo,
        firstInnings: eachMatch.first_innings,
        secondInnings: eachMatch.second_innings,
        matchStatus: eachMatch.match_status,
      })),
    }
    this.setState({matchesData: updatedData, isLoading: false})
  }

  renderTeamMatches = () => {
    const {matchesData} = this.props
    const {teamBannerUrl, latestMatchDetails} = matchesData
    return (
      <div>
        <img src={teamBannerUrl} alt="team banner" />
        <LatestMatch LatestMatch={latestMatchDetails} />
        {this.renderRecentMatchList()}
      </div>
    )
  }

  renderRecentMatchList = () => {
    const {matchesData} = this.state
    const {recentMatches} = matchesData

    return (
      <ul>
        {recentMatches.map(eachMatch => (
          <MatchCard key={eachMatch.id} matchData={eachMatch} />
        ))}
      </ul>
    )
  }

  renderLoader = () => {
    ;<div data-testid="loader">
      <Loader type="Rings" color="blue" height={80} width={80} />
    </div>
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>{isLoading ? this.renderLoader() : this.renderTeamMatches()}</div>
    )
  }
}
export default TeamMatches
