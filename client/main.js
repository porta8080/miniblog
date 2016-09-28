import './main.html';
import '../imports/ui/login.html';
import '../imports/global.js';
import '../imports/api/profiles.js';
import '../imports/api/posts.js';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Profiles } from '../imports/api/profiles.js';
import { Profile } from '../imports/api/profiles.js';
import { Posts } from '../imports/api/posts.js';
import { Post } from '../imports/api/posts.js';

var GLOBAL = {};

Meteor.startup(function(){
  console.log('Started');
  var data = {profiles: Profiles.find().fetch()};
  console.log(data);
});

// export const Blogs = new Mongo.Collection('blogs');
// export const Posts = new Mongo.Collection('posts');

Template.login.onCreated(function loginOnCreated() {
  this.app_error = new ReactiveVar(null);
});

Template.panel.onCreated(function loginOnCreated() {
  this.html = new ReactiveVar('');
  this.remaining_chars_class = new ReactiveVar('');
  this.remaining_chars = new ReactiveVar(Post.max_length);
});

Template.registerHelper('equals', function (a, b) {
  return a === b;
});

// if(Meteor.isServer){
// }
//
// if(Meteor.isClient){
// }

// Routes
Router.configure({
  layoutTemplate: 'BaseLayout'
});

Router.route('/', function () {
  this.render('login');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/register', function () {
  this.render('register');
});

Router.route('/panel', function () {
  this.render('panel');
});

Router.route('/logout', function () {
  this.render('panel');
});

Router.route('/edit', function () {
  // edit profile
  this.render('panel');
});

Router.route('/my-posts', function () {
  // my posts
  this.render('panel');
});

// Template.profile_list.helpers({
//   profiles(){
//     return Profiles.find({});
//   }
// });

Template.login.helpers({
  app_error() {
    return Template.instance().app_error.get();
  },
});

Meteor.methods({
  setSession: function(profile){
    Session.setPersistent('profile',profile);
    Router.go('/panel');
  }
});

Template.panel.helpers({
  profile(){
    return Session.get('profile');
  }
});

Template.login.events({
  'submit .login-form'(event, instance) {
    event.preventDefault();
    const target = event.target;

    var email = target.email;
    var password = target.password;

    var profile = Profiles.findOne({
      email: target.email.value,
      password: Profile.hashPassword(target.password.value)
    });

    if(profile){
      Meteor.call('setSession',profile);
    }else{
      instance.app_error.set({message: 'Houve um erro'});
    }
  },
  'submit .register-form'(event, instance) {
    event.preventDefault();

    const target = event.target;

    var email = target.email;
    var password = target.password;

    Profiles.insert({
      email: target.email.value,
      password: Profile.hashPassword(target.password.value),
      created_at: Date.now()
    });

    target.email.value = '';
    target.password.value = '';

    Meteor.call('setSession',profile);
  },
});

Template.panel.helpers({
  html() {
    return Template.instance().html.get();
  },
  remaining_chars(){
    return Template.instance().remaining_chars.get();
  },
  remaining_chars_class(){
    var class_name = Template.instance().remaining_chars.get() < 0 ? 'not-allowed' : '';
    return class_name;
  },
  isDisabled(){
    return Template.instance().remaining_chars.get() < 0;
  }
});

Template.panel.events({
  'submit .new-post'(event, instance){
    event.preventDefault();
    const target = event.target;

    var content = target.content;

    Post.checkLength(content.value);
  },
  'keyup .new-post textarea'(event, instance){ console.log(Post.max_length)
    clearInterval(GLOBAL['new_post_timer']);
    GLOBAL['new_post_timer'] = null;
    GLOBAL['new_post_timer'] = setTimeout(function(){
      var html = Post.toHtml(event.target.value);
      instance.html.set(html);
      var remaining_chars = Post.max_length - $(html).text().length;
      var remaining_chars_class = remaining_chars >= 0 ? '' : 'not-allowed';
      instance.remaining_chars.set(remaining_chars);
      instance.remaining_chars_class.set(remaining_chars_class);
    }, 1000);
  }
});
