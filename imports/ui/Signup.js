import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    Accounts.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error: err.reason})
      } else {
        this.setState({error: ''})
      }
    })
    // this.setState({
    //   error: 'Something went wrong'
    // })
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup to Short Lnk</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.handleSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Create account</button>
          </form>

          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    )
  }
}

export default Signup
