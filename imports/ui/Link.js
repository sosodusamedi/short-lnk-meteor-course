import React, { Component } from 'react'
import LinksList from './LinksList'
import AddLink from './AddLink'
import Header from './Header'
import LinksListFilters from './LinksListFilters'

export default () => {
  return (
    <div>
      <Header title="Your Links" />
      <div className="page-content">
        <LinksListFilters />
        <AddLink />
        <LinksList />
      </div>
    </div>
  )
}
