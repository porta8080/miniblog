import '../imports/api/profiles.js';

import { Meteor } from 'meteor/meteor';
import { Profiles } from '../imports/api/profiles.js';
import { Profile } from '../imports/api/profiles.js';
import { Categories } from '../imports/api/categories.js';
import { Category } from '../imports/api/categories.js';
import { Stories } from '../imports/api/stories.js';
import { Story } from '../imports/api/stories.js';
import { Sequences } from '../imports/global.js';

Meteor.startup(() => {
  var stories_sequence = Sequences.findOne({name: 'story'});
  if(!stories_sequence){
    var sequence = Sequences.insert({
      name: 'story',
      last: 0,
      reference:[]
    });
  }
});

Meteor.methods({
  getTimelineStoriesOnTemplateCreated: function(criteria){
    return Stories.find(criteria,{limit:10, sort: {created_at: -1}}).fetch();
  }
});
