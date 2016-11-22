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
  // Create Sequence collection if it doesn't exist
  var stories_sequence = Sequences.findOne({name: 'story'});
  if(!stories_sequence){
    var sequence = Sequences.insert({
      name: 'story',
      last: 0,
      reference:[]
    });
  }

  // var profile = Session.get('profile');
  // if(profile){
  //   var ids = getIdsFromCategories(profile.watching);
  //   var criteria = {status: Story.status['active']};
  //   if(ids.length) criteria.categories = {$in: ids};
  //
  //   var timeline = searchTimelineFromCriteria(criteria);
  //   Template.instance().timeline.set(timeline);
  // }
});
