import React from 'react'
import { v4 as uuid } from 'uuid'
import { Card } from 'semantic-ui-react'
import Artist from './Artist'

export default class List extends React.PureComponent {
  render () {
    const { artists, itemsPerRow } = this.props

    const artistData = artist => {
      const artistProps = { key: uuid(), artist }

      return <Artist {...artistProps} />
    }

    const artistsData = artists.map(artistData)

    return <Card.Group {...{ itemsPerRow }}>{artistsData}</Card.Group>
  }
}
