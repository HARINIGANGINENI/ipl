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
        id: fetchedData.latest_match_details.id,
        umpires: fetchedData.latest_match_details.umpires,
        result: fetchedData.latest_match_details.result,
        date: fetchedData.latest_match_details.data,
        venue: fetchedData.latest_match_details.venue,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        firstInnings: fetchedData.latest_match_details.first_innings,
        secondInnings: fetchedData.latest_match_details.second_innings,
        matchStatus: fetchedData.latest_match_details.match_status,
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
