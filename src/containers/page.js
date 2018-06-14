import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPage } from '../actions/index'

import Announcements from './announcements'
import People from './people'
import Projects from './projects'
import Publications from './publications'

class Page extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  componentDidMount () {
    if (this.props.slug) {
      this.props.fetchPage(this.props.slug)
    } else {
      this.props.fetchPage('home')
    }
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <div className="header-content">
          <div className="has-text-centered">
            <h1 className="title is-spaced">
              {this.props.page.title}
            </h1>
          </div>
        </div>

        <div className="subheader-content has-text-centered">
          <h4 className="subtitle is-4"><i>{this.props.page.description}</i></h4>
          <hr/>
        </div>

        <div className="single-content" dangerouslySetInnerHTML={{__html: this.props.page.content}}></div>
        <Route exact path="/" render={() => (
          <div>
            <Announcements />
            <Publications />
            <People />
            <Projects />
          </div> )}/>
        <Route exact path="/announcements" component={Announcements}/>
        <Route exact path="/publications" component={Publications}/>
        <Route exact path="/research" component={Projects}/>
        <Route exact path="/people" component={People}/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    page: state.page
  }
}

export default connect(mapStateToProps, { fetchPage })(Page)