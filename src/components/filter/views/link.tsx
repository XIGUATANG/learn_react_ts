import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { setFilter, filterAction } from '../actions'
import { FilterTypes } from '../../constants'
import { State } from '../../../store/Store'
interface LinkProtype extends React.Props<{}> {
  active: boolean
  onClick: () => void
}

const Link: React.FC<LinkProtype> = ({ active, children, onClick }) => {
  if (active) {
    return <b className="filter selected">{children}</b>
  } else {
    return (
      <a
        href="#"
        className="filter not-selected"
        onClick={ev => {
          ev.preventDefault()
          onClick()
        }}
      >
        {children}
      </a>
    )
  }
}

const mapStateToProps = (state: State, ownProps: LinkProps) => {
  return {
    active: state.filter === ownProps.filter
  }
}

const mapDispatchToProps = (dispatch: Dispatch<filterAction>, ownProps: LinkProps) => ({
  onClick: () => {
    dispatch(setFilter(ownProps.filter))
  }
})

interface LinkProps extends React.Props<{}> {
  filter: FilterTypes
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
