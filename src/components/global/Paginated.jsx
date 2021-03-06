import React from 'react'
import ErrorMessage from 'global/ErrorMessage'
import paginateCollection from './paginated/functions/utils/paginateCollection'
import mergeCollections from './paginated/functions/utils/mergeCollections'
import nextResponsePage from './paginated/functions/utils/nextResponsePage'
import paginationData from './paginated/functions/paginationData'
import collectionData from './paginated/functions/collectionData'

export default class Paginated extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { clientPage: 1, isForward: true }

    this.paginateCollection = paginateCollection.bind(this)
    this.mergeCollections = mergeCollections.bind(this)
    this.nextResponsePage = nextResponsePage.bind(this)
    this.paginationData = paginationData.bind(this)
    this.collectionData = collectionData.bind(this)
  }

  componentDidMount () {
    this.setData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleDataChange(prevProps)
    this.handleClientPageCollectionChange(prevState)
    this.handleClientPageChange(prevState)
    this.handleError()
  }

  setData () {
    const { clientPage } = this.state

    const collection = this.mergeCollections()
    const clientPageCollection = collection[clientPage] || []

    this.setState({ collection, clientPageCollection })
  }

  handleDataChange (prevProps) {
    const { data } = this.props

    const isDataChanged = data !== prevProps.data

    isDataChanged && this.setData()
  }

  handleClientPageCollectionChange (prevState) {
    const { clientPageCollection } = this.state

    if (clientPageCollection) {
      const isClientPageCollectionChanged =
        clientPageCollection !== prevState.clientPageCollection

      isClientPageCollectionChanged && this.checkCollection()
    }
  }

  checkCollection () {
    const { getData } = this.props

    const nextPage = this.nextResponsePage()

    !this.isCollectionFull() && getData(nextPage)
  }

  isCollectionFull () {
    const { clientPageLimit } = this.props
    const { clientPage, clientPageCollection } = this.state

    const clientOffset = clientPageLimit * (clientPage - 1)
    const remainingItems = this.totalItems() - clientOffset
    const clientCurrentPageLimit = Math.min(remainingItems, clientPageLimit)

    return clientPageCollection.length >= clientCurrentPageLimit
  }

  totalItems () {
    const { responseTotalPages, responsePageLimit } = this.props

    return responseTotalPages * responsePageLimit
  }

  handleClientPageChange (prevState) {
    const { clientPage } = this.state

    const isClientPageChanged = clientPage !== prevState.clientPage

    if (isClientPageChanged) {
      const { collection } = this.state

      const clientPageCollection = collection[clientPage] || []

      this.setState({ clientPageCollection })
    }
  }

  handleError () {
    const { error } = this.props

    error && this.setState({ clientPageCollection: null })
  }

  contentData () {
    const { clientPageCollection } = this.state
    const { error } = this.props

    if (clientPageCollection) {
      return this.collectionData()
    } else {
      if (error) {
        return this.errorData()
      }
    }
  }

  errorData () {
    const { error, getData, responsePage } = this.props

    const handleRefresh = () => getData(responsePage)
    const errorDataProps = { error, handleRefresh }

    return <ErrorMessage {...errorDataProps} />
  }

  render () {
    const { responseTotalPages, data, clientPageLimit } = this.props

    const isResponsePagePageable = !!data && data.length > clientPageLimit
    const isResponsePageable = responseTotalPages > 1 || isResponsePagePageable
    const paginationData = isResponsePageable && this.paginationData()

    return (
      <React.Fragment>
        <div>{this.contentData()}</div>
        <div>{paginationData}</div>
      </React.Fragment>
    )
  }
}
