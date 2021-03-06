import React from 'react'
import { v4 as uuid } from 'uuid'
import { Card } from 'semantic-ui-react'
import Album from './Album'

export default class List extends React.PureComponent {
  render () {
    const { albums, itemsPerRow } = this.props

    const albumData = album => {
      const { artistName, isLoading } = this.props

      const albumsProps = { key: uuid(), album, artistName, isLoading }

      return <Album {...albumsProps} />
    }

    const albumsData = albums.map(albumData)

    return <Card.Group {...{ itemsPerRow }}>{albumsData}</Card.Group>
  }
}
