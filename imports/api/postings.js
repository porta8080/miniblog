export const Postings = new Mongo.Collection('postings');

export var Posting = function(){}
// Return a MD5 hashed password
Posting.max_length = 500;
Posting.status= {
  active: 1,
  deleted: 2
};

Posting.checkLength = function(input){
  Posting.toHtml(input);
};

Posting.toHtml = function(input){
  var converter = new Showdown.converter();
  return converter.makeHtml( input );
};

Posting.countLength = function(html){
  return $(html).text().length;
};

Posting.isLengthAllowed = function(input){
  return (Posting.max_length - Posting.countLength(Posting.toHtml(input))) > 0;
}
