export const Posts = new Mongo.Collection('posts');

export var Post = function(){}
// Return a MD5 hashed password
Post.max_length = 500;
Post.checkLength = function(input){
  Post.toHtml(input);
};

Post.toHtml = function(input){
  var converter = new Showdown.converter();
  return converter.makeHtml( input );
};

Post.countLength = function(html){
  return $(input).text().length;
};

Post.isLengthAllowed = function(input){
  return (Post.max_length - Post.countLength(Post.toHtml(input))) > 0;
}
