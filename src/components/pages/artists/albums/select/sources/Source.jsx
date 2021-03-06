import React from 'react'
import axios from 'axios'
import { Dropdown, Button } from 'semantic-ui-react'
import getData from './functions/getData'
import getSourceData from './source/functions/getData'

export default class Source extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getData = getData.bind(this)
    this.getSourceData = getSourceData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  contentData () {
    const { isLoading } = this.state
    const { source } = this.props

    const classNames = ['dropdownItemIcon', this.isNoData() && 'faded']
    const className = classNames.filter(Boolean).join(' ')

    const iconData = () => {
      const iconClassName = [source.id, `${source.id}Color`].join(' ')
      const className = isLoading ? '' : iconClassName

      return { className }
    }

    const iconButtonData = (
      <Button loading={isLoading} icon={iconData()} {...{ className }} />
    )

    return (
      <div className="albumSourceSelectSource">
        {iconButtonData}
        <div className="albumSourceSelectSourceContent">
          <div>{source.name}</div>
          <div className="albumSourceSelectSourceMaxBitrate">
            {source.maxBitrate}
          </div>
        </div>
      </div>
    )
  }

  isNoData () {
    const { data } = this.state

    const isNoTypeData = typeData => {
      return !typeData || typeData.length === 0
    }

    return !data || Object.values(data).every(isNoTypeData)
  }

  render () {
    const { data } = this.state
    const {
      isSelected,
      setSelectedSource,
      source,
      setSelectedSourceData
    } = this.props

    const handleClick = () => {
      setSelectedSource(source)
      setSelectedSourceData(data)
    }

    return (
      <Dropdown.Item
        disabled={this.isNoData()}
        active={isSelected}
        selected={isSelected}
        onClick={handleClick}
        content={this.contentData()}
      />
    )
  }
}
