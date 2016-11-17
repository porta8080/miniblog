export const Stories = new Mongo.Collection('stories');

export var Story = function(){}
// Return a MD5 hashed password
Story.max_length = 500;
Story.status= {
  active: 1,
  deleted: 2
};

Story.checkLength = function(input){
  Story.toHtml(input);
};

Story.toHtml = function(input){
  var converter = new Showdown.converter();
  return converter.makeHtml( input );
};

Story.countLength = function(html){
  return $(html).text().length;
};

Story.isLengthAllowed = function(input){
  return (Story.max_length - Story.countLength(Story.toHtml(input))) > 0;
}
