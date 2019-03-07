import React, { Component } from 'react'
import Modal from 'react-modal'
import { Meteor } from 'meteor/meteor'
import { Link } from '../api/links'


class AddLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url : '',
      isOpen: false,
      error: ''
    }
  }

  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    })
  }

  onSubmit(e) {
    const { url } = this.state

    e.preventDefault()

    Meteor.call('links.insert', url, (err, res) => {
      if(!err) {
        this.handleModalClose()
      } else {
        this.setState({ error: err.reason })
      }
    })
  }

  handleModalClose() {
    this.setState({
      url: '',
      isOpen: false,
      error: ''
    })
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ isOpen: true })} className="button">
          + Add Link
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLable="Add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal" >
          <h1>Add Link </h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined }
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input
              type="text"
              placeholder="URL"
              ref="url"
              value= {this.state.url}
              onChange={this.onChange.bind(this)} />
            <button className="button">Add Link</button>
            <button onClick={this.handleModalClose.bind(this)} type="button" className="button button--secondary">
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    )
  }
}

export default AddLink
