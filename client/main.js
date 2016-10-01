import './main.html';
import '../imports/ui/login.html';
import '../imports/global.js';
import '../imports/api/profiles.js';
import '../imports/api/postings.js';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Profiles } from '../imports/api/profiles.js';
import { Profile } from '../imports/api/profiles.js';
import { Postings } from '../imports/api/postings.js';
import { Posting } from '../imports/api/postings.js';
import { Categories } from '../imports/api/categories.js';
import { Category } from '../imports/api/categories.js';
import { Diatrics } from '../imports/global.js';

var GLOBAL = {};

Meteor.startup(function(){
  var data = {profiles: Profiles.find().fetch()};
});

// export const Blogs = new Mongo.Collection('blogs');
// export const Postings = new Mongo.Collection('posts');

Template.login.onCreated(function loginOnCreated() {
  this.app_error = new ReactiveVar(null);
});

Template.panel.onCreated(function loginOnCreated() {
  this.html = new ReactiveVar('');
  this.remaining_chars_class = new ReactiveVar('');
  this.remaining_chars = new ReactiveVar(Posting.max_length);
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
  startSession: function(profile){
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
      Meteor.call('startSession',profile);
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

    Meteor.call('startSession',profile);
  },
});

Template.panel.helpers({
  latest_postings(){
    return Postings.find({status: Posting.status['active']},{limit:12,sort: {created_at: -1}}).fetch();
  },
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
  },
  teste(){
    return ['2das','adasd'];
  }
});

Template.panel.events({
  'submit .new-posting'(event, instance){
    event.preventDefault();
    const target = event.target;

    var content = target.content;
    var categories = target.categories;

    if(Posting.isLengthAllowed(content.value)){
      var category, regex, posting_categories = [];
      categories = categories.value.split(',');
      for(var k in categories){
        category_name = categories[k];
        slug = category_name.slugify();
        category = Categories.findOne({slug: slug});
        if(!category){
          category = Categories.insert({
            name: category_name,
            slug: slug,
            profile: Session.get('profile')
          });
        }

        posting_categories.push(category);
      }

      var posting = Postings.insert({
        profile: Session.get('profile'),
        content: content.value,
        created_at: Date.now(),
        categories: posting_categories,
        status: Posting.status['active']
      });

    }else alert('Não pode');

    content.value = '';
    categories.value = '';
  },
  'keyup .new-posting textarea'(event, instance){
    clearInterval(GLOBAL['new_posting_timer']);
    GLOBAL['new_posting_timer'] = null;
    GLOBAL['new_posting_timer'] = setTimeout(function(){
      var html = Posting.toHtml(event.target.value);
      instance.html.set(event.target.value);
      var remaining_chars = Posting.max_length - $(html).text().length;
      var remaining_chars_class = remaining_chars >= 0 ? '' : 'not-allowed';
      instance.remaining_chars.set(remaining_chars);
      instance.remaining_chars_class.set(remaining_chars_class);
    }, 1000);
  }
});
