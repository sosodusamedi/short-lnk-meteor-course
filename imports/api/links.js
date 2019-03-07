import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'

export const Link = new Mongo.Collection('links')

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Link.find({ userId: this.userId })
  })
}

Meteor.methods({
 'links.insert'(url) {
   if(!this.userId) {
     throw new Meteor.Error('not-authorized')
   }

   new SimpleSchema({
     url: {
       type: String,
       label: 'Your link',
       regEx: SimpleSchema.RegEx.Url
     }
   }).validate({ url })

   Link.insert({
     _id: shortid.generate(),
     url,
     userId: this.userId,
     visible: true,
     visitedCount: 0,
     lastVisitedAt: null
   })
 },

 'links.setVisibilty'(_id, visible) {
   if(!this.userId) {
     throw new Meteor.Error('not-authorized')
   }

   new SimpleSchema({
     _id: {
       type: String,
       min: 1
     },
     visible: {
       type: Boolean
     }
   }).validate({ _id, visible })

   Link.update({
     _id,
     userId: this.userId
   }, {
     $set: { visible }
   })
 },

 'links.trackVisit'(_id) {
   new SimpleSchema({
     _id: {
       type: String,
       min: 1
     }
   }).validate({ _id })

   Link.update({ _id }, {
     $set: {
       lastVisitedAt: new Date().getTime()
     },
     $inc: {
       visitedCount: 1
     }
   })
 }
})
