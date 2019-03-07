import React, { Component } from 'react'
import { Session } from 'meteor/session'
import { Tacker } from 'meteor/tracker'

class LinksListFilters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showVisible: true
    }
  }

  componentDidMount() {
    this.checkBox = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      })
    })
  }

  componentWillUnmount() {
    this.checkBox.stop()
  }

  render() {
    return (
      <div>
        <label className="checkbox">
          <input
            type="checkbox"
            className="checkbox__box"
            checked={!this.state.showVisible}
            onChange={e => {
            Session.set('showVisible', !e.target.checked)
            }} />
          show hidden links
        </label>
      </div>
    )
  }
}

export default LinksListFilters
