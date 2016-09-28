export const Profiles = new Mongo.Collection('profiles');

export var Profile = function(){}
// Return a MD5 hashed password
Profile.hashPassword = function(input){
  return CryptoJS.MD5(input).toString();
}
