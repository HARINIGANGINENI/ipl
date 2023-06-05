import {Link} from 'react-router-dom'

import {Component} from 'react'

class TeamCard extends Component {
  render() {
    const {teamData} = this.props
    const {name, id, imageUrl} = teamData

    return (
      <Link to={`/team-matches/${id}`}>
        <li className="team-card">
          <img src={imageUrl} alt={name} />
          <p>{name}</p>
        </li>
      </Link>
    )
  }
}
export default TeamCard
