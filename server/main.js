import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp'

import '../imports/startup/simple-schema-config.js'
import '../imports/api/users'
import '../imports/api/links'
import { Link } from '../imports/api/links'

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1)
    const link = Link.findOne({ _id })

    if (link) {
      // Set HHTP status code
      res.statusCode = 302
      // Set HTTP headers
      res.setHeader('Location', link.url)
      // End HTTP request
      res.end()
      Meteor.call('links.trackVisit', _id)
    } else {
      next()
    }
  })
});
