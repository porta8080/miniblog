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

export const Sequences = new Mongo.Collection('sequences');
var stories_sequence = Sequences.findone({'stories.last': 0});
if(!stories_sequence){
  Sequences.insert({
      name: 'story',
      last: 0,
      reference:[]
    });
}

var GLOBAL = {};

window.MIN_STORY_ID = null;
window.MAX_STORY_ID = null;

window.categorySearch = function(input){
  var categories = [];

  if(input != ''){
    var slug = input.slugify();
    categories = Categories.find({name: new RegExp(slug)},{limit:12, sort: {name: 1}}).fetch();
  }

  return categories;
};

window.findCategoryBySlug = function(input){
  var category = null;

  if(input != ''){
    var slug = input.slugify();
    category = Categories.findOne({slug: slug});
  }

  return category;
};

window.choseOption = function(element){
  var option_element = $(element);
  var id = option_element.attr('data-id');
  return Categories.findOne({_id: id});
};

window.removeOption = function(element,list){
  var category_element = $(element).parents('.category');
  var id = category_element.attr('data-id');
  var new_list = [];

  for(category of list){
    if(category._id != id) new_list.push(category);
  }

  return new_list;
};

window.findOrCreateCategory = function(category_name){
  var category = findCategoryBySlug(category_name);
  if(!category){

    category = {
      name: category_name,
      profile: Session.get('profile'),
      slug: category_name.slugify(),
      created_at: Date.now()
    };

    category['_id'] = Categories.insert(category);
  }

  return category;
};

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

  this.new_story_preview_html = new ReactiveVar('');
  this.watch_options = new ReactiveVar([]);
  this.categories_to_watch = new ReactiveVar(profile.watching);

  this.new_story_subject_options = new ReactiveVar([]);
  this.new_story_subjects = new ReactiveVar([]);

  this.timeline = new ReactiveVar([]);
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

// Template.new_story_modal.helpers({
//   new_story_preview_html_() {
//     return Template.instance().new_story_preview_html.get();
//   }
// });

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
  timeline(){
    return Template.instance().timeline.get();
  },
  new_story_modal_data(){
    var content = Template.instance().new_story_preview_html.get();
    var html = Story.toHtml(content);
    var length = Story.remainingCharsLength(html);
    var class_name = length >= 0 ? '' : 'not-allowed';

    return [
      {
        new_story_preview_html: content,
        new_story_remaining_data: {class: class_name, length: length},
        new_story_subject_options: Template.instance().new_story_subject_options.get(),
        new_story_subjects: Template.instance().new_story_subjects.get()
      }
    ];
  },
  new_story_preview_html() {
    return Template.instance().new_story_preview_html.get();
  },
  watch_options(){
    return Template.instance().watch_options.get();
  },
  categories_to_watch(){
    return Template.instance().categories_to_watch.get();
  },
  new_story_subject_options(){
    return Template.instance().new_story_subject_options.get();
  },
  new_story_subjects(){
    return Template.instance().new_story_subjects.get();
  }
});

Template.panel.events({
  'click #watch .stop_watching'(event,instance){
    var category_element = $(event.target).parents('.category');
    var id = category_element.attr('data-id');
    var profile = Session.get('profile');
    var profile_id = profile._id;

    var watching = profile.watching;
    var new_watching = [];
    for(category of watching){
      if(category._id != id) new_watching.push(category);
    }

    Profiles.update(profile._id, {$set: {watching: new_watching}});
    profile.watching = new_watching;
    Session.setPersistent('profile',profile);
    instance.categories_to_watch.set(new_watching);
  },
  'click #watch .option'(event,instance){
    var category = choseOption(event.target);

    var profile = Session.get('profile');
    var watching = profile.watching ? profile.watching : [];

    watching.push(category);
    Profiles.update({_id: profile._id}, {$set: {watching: watching}});
    Session.setPersistent('profile',profile);

    $('.watch_category').val('');
    instance.watch_options.set([]);
    instance.categories_to_watch.set(watching);
  },
  'input .watch_category'(event, instance){
    instance.watch_options.set(categorySearch(event.target.value));
  },
  'submit #new_story_form'(event, instance){
    event.preventDefault();

    var content = instance.new_story_preview_html.get();

    if(Story.isLengthAllowed(content)){
      var profile = Session.get('profile');

      var categories = instance.new_story_subjects.get(), category;
      for(var k in categories){
        category = categories[k];
        if(category.is_new){
          delete category['is_new'];
          delete category['_id'];

          category.profile = profile;
          category.slug = category.name.slugify();
          category['_id'] = Categories.insert(category);

          categories[k] = category;
        }
      }

      var category_field = $(event.target.category_name);
      if(category_field.val() != ''){
        category_name = category_field.val();
        categories.push(findOrCreateCategory(category_name));
      }

      var story = Stories.insert({
        profile: profile,
        content: content,
        categories: categories,
        created_at: Date.now(),
        status: Story.status['active']
      });

      var sequence = Sequences.findAndModify({
        query: {name: 'story'},
        update: {$inc: {last:1}}
      });


      Sequences.update({name: 'story'},{$push: {reference: {_id: story, auto_increment: sequence.last}}});

      instance.new_story_subjects.set([]);
      instance.new_story_preview_html.set('');
      $('#new_story_content').html('');
      $('#new_story_modal').modal('hide');
    }
  },
  'keyup #new_story_content'(event, instance){
    var new_story_content = $(event.target);
    var new_story_content_value = new_story_content.html();

    instance.new_story_preview_html.set(new_story_content_value);
  },
  'input .new_story_subject'(event, instance){
    var subject_name = event.target.value;

    if(subject_name.indexOf(',') != -1){
      subject_name = subject_name.split(',')[0];
      var category = findCategoryBySlug(subject_name);

      var categories = instance.new_story_subjects.get();

      if(!category) category = {_id: Date.now(), name: subject_name, is_new: true};

      categories.push(category);
      instance.new_story_subjects.set(categories);

      $('.new_story_subject').val('');
    }else{
      instance.new_story_subject_options.set(categorySearch(subject_name));
    }
  },
  'click #subjects .option'(event,instance){
    var category = choseOption(event.target);
    var categories = instance.new_story_subjects.get();
    categories.push(category);
    instance.new_story_subjects.set(categories);
    instance.new_story_subject_options.set([]);
    $('.new_story_subject').val('');
  },
  'click #subjects .stop_watching'(event,instance){
    var new_subjects = removeOption(event.target,instance.new_story_subjects.get());
    instance.new_story_subjects.set(new_subjects);
  }
});
