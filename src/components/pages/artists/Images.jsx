import React from 'react'
import { Segment } from 'semantic-ui-react'
import List from './images/List'
import setNavSections from './functions/setNavSections'
import getData from './functions/getData'
import checkArtistChange from './functions/checkArtistChange'
import pageData from './functions/pageData'
import paginatedData from 'global/paginated/functions/paginatedData'

export default class Images extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPageable: true
    }

    this.setNavSections = setNavSections.bind(this)
    this.getData = getData.bind(this)
    this.checkArtistChange = checkArtistChange.bind(this)
    this.pageData = pageData.bind(this)
    this.paginatedData = paginatedData.bind(this)
  }

  componentDidMount () {
    this.getData()
    this.setNavSections()
  }

  componentDidUpdate (prevProps, prevState) {
    this.checkArtistChange(prevProps)
    this.setNavSections()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'images'
  navSectionData = 'Images'
  itemsPerRow = 4
  clientPageLimit = 20
  responsePageLimit = 40
  dataList = (<List />)

  contentData () {
    const { isLoading } = this.state

    return (
      <Segment
        className="pageSegment paginatedWrap"
        loading={isLoading}
        content={this.paginatedData()}
      />
    )
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
