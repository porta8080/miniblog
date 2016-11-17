import './main.html';
import '../imports/ui/login.html';
import '../imports/global.js';
import '../imports/api/profiles.js';
import '../imports/api/stories.js';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Profiles } from '../imports/api/profiles.js';
import { Profile } from '../imports/api/profiles.js';
import { Stories } from '../imports/api/stories.js';
import { Story } from '../imports/api/stories.js';
import { Categories } from '../imports/api/categories.js';
import { Category } from '../imports/api/categories.js';
import { Diatrics } from '../imports/global.js';

var GLOBAL = {};

// Meteor.startup(function(){
//   var data = {profiles: Profiles.find().fetch()};
// });

// export const Blogs = new Mongo.Collection('blogs');
// export const Stories = new Mongo.Collection('posts');

Template.login.onCreated(function loginOnCreated() {
  this.app_error = new ReactiveVar(null);
});

Template.panel.onCreated(function loginOnCreated() {
  // this.html = new ReactiveVar('');
  // this.remaining_chars_class = new ReactiveVar('');
  // this.remaining_chars = new ReactiveVar(Story.max_length);

  var profile = Session.get('profile');

  this.watch_options = new ReactiveVar([]);
  console.log(profile.query)
  this.categories_to_watch = new ReactiveVar(profile.watching);
});
//
// Template.registerHelper('equals', function (a, b) {
//   return a === b;
// });

// if(Meteor.isServer){
// }
//


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

// Router.route('/edit', function () {
//   // edit profile
//   this.render('panel');
// });
/*
if(Meteor.isClient) {
var POST_IDS;
var LOADING_POSTS = false;

$window = $(window);
$window.load(function(){
// console.log($('[data-post-id]').length)
});

$window.scroll(function(event){
if(!POST_IDS){
POST_IDS = [];
var ids = $('[data-post-id]').each(function(){
// console.log($(this).attr('data-post-id'))
POST_IDS.push($(this).attr('data-post-id'));
});
}

if($window.scrollTop() + $window.height() > $(document).height() - 20) { // to detect scroll event
// if(!LOADING_POSTS){
//   LOADING_POSTS = true;



// var scrollTop = $(this).scrollTop();
//
// if(scrollTop > lastScrollTop){ // detect scroll down
//   Session.set("itemsLimit", Session.get("itemsLimit") + 9); // when it reaches the end, add another 9 elements
// }
//
// lastScrollTop = scrollTop;


// var stories = Stories.find({status: Story.status['active'], _id: {$nin: POST_IDS}},{limit:3}).fetch();
// if(stories.length > 0){
//   for(var k in stories){
//     story = stories[k]
//     POST_IDS.push(story._id);
//     Blaze.renderWithData(Template.story, story, $('#stories')[0]);
//   }
// }

// fazer para timeline

// LOADING_POSTS = false;
// }
}
});
}
*/
// timeline é query

// Router.route('/my-posts', function () {
//   // my posts
//   this.render('panel');
// });


//
// Router.map(function () {
//   Router.route('/posts',{where: 'server'}).get(function(){
//     console.log('oi')
//   });
// });

// Router.route('/posts',{where: 'server'}).get(function(){
//   // do something
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
  },
  getMoreStories: function(ids){
    return Stories.find({status: Story.status['active'], _id: {$nin: ids}},{limit:3}).fetch();
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
  // latest_stories(){
  //   return Stories.find({status: Story.status['active']},{limit:3, sort: {created_at: -1}}).fetch();
  // },
  // html() {
  //   return Template.instance().html.get();
  // },
  // remaining_chars(){
  //   return Template.instance().remaining_chars.get();
  // },
  // remaining_chars_class(){
  //   var class_name = Template.instance().remaining_chars.get() < 0 ? 'not-allowed' : '';
  //   return class_name;
  // },
  // isDisabled(){
  //   return Template.instance().remaining_chars.get() < 0;
  // },
  // timeline_posts(){
  //   // var profile = Session.get('profile');
  //   // var query = profile.query;
  //   // if(query){
  //   //   // refatorar
  //   //   var category_ids = [];
  //   //   query.forEach(function(v){
  //   //     category = Categories.findOne({slug: v});
  //   //     if(category) category_ids.push(category._id);
  //   //   });
  //   //
  //   //   if(category_ids.length > 0) return Stories.find({status: Story.status['active'], categories: {$in: category_ids}},{limit:10, sort: {created_at: -1}}).fetch();
  //   // }
  //   //
  //   // return Stories.find({status: Story.status['active']},{limit:10, sort: {created_at: -1}}).fetch();
  // },
  // query(){
  //   // var profile = Session.get('profile');
  //   // var query = profile.query.join(', ');
  //   //
  //   // return query;
  // },
  watch_options(){
    return Template.instance().watch_options.get();
  },
  categories_to_watch(){
    return Template.instance().categories_to_watch.get();
  }
});

Template.panel.events({
  'click .stop_watching'(event){
    var category_element = $(event.target).parents('.category');
    var id = category_element.attr('data-id');
    var profile = Session.get('profile');
    var profile_id = profile._id;

    var watching = profile.watching;
    var new_watching = [];
    for(category of watching){
      if(watching._id != id) new_watching.push(category);
    }

    Profiles.update(profile._id, {$set: {watching: new_watching}});
    profile.watching = new_watching;
    Session.setPersistent(profile);
  },
  'click .option'(event,instance){
    var option_element = $(event.target);
    var id = option_element.attr('data-id');
    var category = Categories.find(id);

    var profile = Session.get('profile');
    var watching = profile.watching ? profile.watching : [];

    watching.push(category);
    Profiles.update(profile._id, {$set: {watching: watching}});
    Session.setPersistent(profile);

    option_element.val('');
    instance.watch_options.set([]);
  },
  'input .watch_category'(event, instance){
    var watch_category = event.target, categories = [];

    if(watch_category.value != ''){
      var slug = watch_category.value.slugify();
      categories = Categories.find({name: new RegExp(slug)},{limit:12, sort: {name: 1}}).fetch();
    }

    instance.watch_options.set(categories);
  },
  'submit .new-story'(event, instance){
    event.preventDefault();
    const target = event.target;

    var content = target.content;
    var categories = target.categories;
    if(Story.isLengthAllowed(content.value)){
      var category, regex, story_categories = [];
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

        story_categories.push(category._id);
      }

      var story = Stories.insert({
        profile: Session.get('profile'),
        content: content.value,
        created_at: Date.now(),
        categories: story_categories,
        status: Story.status['active']
      });

    }else alert('Não pode');

    content.value = '';
    categories.value = '';
  },
  'keyup .new-story textarea'(event, instance){
    clearInterval(GLOBAL['new_story_timer']);
    GLOBAL['new_story_timer'] = null;
    GLOBAL['new_story_timer'] = setTimeout(function(){
      var html = Story.toHtml(event.target.value);
      instance.html.set(event.target.value);
      var remaining_chars = Story.max_length - $(html).text().length;
      var remaining_chars_class = remaining_chars >= 0 ? '' : 'not-allowed';
      instance.remaining_chars.set(remaining_chars);
      instance.remaining_chars_class.set(remaining_chars_class);
    }, 1000);
  }
});
