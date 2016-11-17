export var Diatrics = function(){}
Diatrics.hash = {
  a:["Á","Ă","Ắ","Ặ","Ằ","Ẳ","Ẵ","Ǎ","Â","Ấ","Ậ","Ầ","Ẩ","Ẫ","Ä","Ạ","À","Ả","Ā","Ą","Å","Ǻ","Ã","á","ă","ắ","ặ","ằ","ẳ","ẵ","ǎ","â","ấ","ậ","ầ","ẩ","ẫ","ä","ạ","à","ả","ā","ą","å","ǻ","ã","æ","ǽ","ɑ","ɐ","ɒ"],
  ae:["Æ","Ǽ"],
  b:["Ḅ","Ɓ","ʚ","ɞ","ḅ","ɓ","ß"],
  c:["Ć","Č","Ç","Ĉ","Ċ","Ɔ","ʗ","ć","č","ç","ĉ","ɕ","ċ"],
  d:["Ď","Ḓ","Ḍ","Ɗ","Ḏ","Đ","Ð","ď","ḓ","ḍ","ɗ","ḏ","đ","ɖ","ð"],
  dz:["ǲ","ǅ","ǆ","ǳ","ʤ","ʣ","ʥ","Ǳ","Ǆ"],
  e:["É","Ĕ","Ě","Ê","Ế","Ệ","Ề","Ể","Ễ","Ë","Ė","Ẹ","È","Ẻ","Ē","Ę","Ẽ","Ɛ","Ə","é","ĕ","ě","ê","ế","ệ","ề","ể","ễ","ë","ė","ẹ","è","ẻ","ē","ę","ẽ","ʒ","ǯ","ʓ","ɘ","ɜ","ɝ","ə","ɚ","ʚ","ɞ"],
  f:["Ƒ","f","ƒ","ſ","ʩ","ﬁ","ﬂ","ʃ","ʆ","ʅ","ɟ","ʄ"],
  g:["Ǵ","Ğ","Ǧ","Ģ","Ĝ","Ġ","Ḡ","ʛ","ǵ","ğ","ǧ","ģ","ĝ","ġ","ɠ","ḡ","ɡ","ɣ"],
  h:["Ḫ","Ĥ","Ḥ","Ħ","ḫ","ĥ","ḥ","ɦ","ẖ","ħ","ɧ","ɥ","ʮ","ʯ","ų"],
  i:["Í","Ĭ","Ǐ","Î","Ï","İ","Ị","Ì","Ỉ","Ī","Į","Ĩ","í","ĭ","ǐ","î","ï","ị","ì","ỉ","ī","į","ɨ","ĩ","ɩ","ı","ɟ"],
  ij:["ĳ","Ĳ"],
  j:["Ĵ","ǰ","ĵ","ʝ","ȷ"],
  k:["Ķ","Ḳ","Ƙ","Ḵ","ķ","ḳ","ƙ","ḵ","ĸ","ʞ"],
  l:["L","Ĺ","Ƚ","Ľ","Ļ","Ḽ","Ḷ","Ḹ","Ḻ","Ŀ","Ł","ĺ","ƚ","ɬ","ľ","ļ","ḽ","ḷ","ḹ","ḻ","ŀ","ɫ","ɭ","ł","ƛ"],
  lj:["ǈ","Ǉ","ǉ"],
  lz:["ɮ","ʫ"],
  ls:["ʪ"],
  m:["Ḿ","Ṁ","Ṃ","ḿ","ṁ","ṃ","ɱ","ɯ","ɰ"],
  n:["Ń","Ň","Ņ","Ṋ","Ṅ","Ṇ","Ǹ","Ɲ","Ṉ","Ñ","ŉ","ń","ň","ņ","ṋ","ṅ","ṇ","ǹ","ɲ","ṉ","ɳ","ñ","ŋ","Ŋ"],
  nj:["ǋ","Ǌ","ǌ"],
  o:["Ó","Ŏ","Ǒ","Ô","Ố","Ộ","Ồ","Ổ","Ỗ","Ö","Ọ","Ő","Ò","Ỏ","Ơ","Ớ","Ợ","Ờ","Ở","Ỡ","Ō","Ɵ","Ǫ","Ø","Ǿ","Õ","Œ","ɶ","o","ó","ŏ","ǒ","ô","ố","ộ","ồ","ổ","ỗ","ö","ọ","ő","ò","ỏ","ơ","ớ","ợ","ờ","ở","ỡ","ō","ǫ","ø","ǿ","õ","ɛ","ɔ","ɵ","ʘ","œ"],
  p:["Þ","ɸ","þ"],
  q:["ʠ"],
  r:["Ŕ","Ř","Ŗ","Ṙ","Ṛ","Ṝ","Ṟ","ʁ","ŕ","ř","ŗ","ṙ","ṛ","ṝ","ɾ","ṟ","ɼ","ɽ","ɿ","ɹ","ɻ","ɺ"],
  s:["Ś","Š","Ş","Ŝ","Ș","Ṡ","Ṣ","ẞ","ś","š","ş","ŝ","ș","ṡ","ṣ","ʂ","ſ","ʃ","ʆ","ß","ʅ"],
  t:["Ť","Ţ","Ṱ","Ț","Ṭ","Ṯ","Ŧ","Þ","Ð","ť","ţ","ṱ","ț",'ẗ','ṭ','ṯ','ʈ','ŧ','ʨ','þ','ð','ʇ'],
  ts:['ʧ','ʦ'],
  u:['Ú','Ŭ','Ǔ','Û','Ü','Ǘ','Ǚ','Ǜ','Ǖ','Ụ','Ű','Ù','Ủ','Ư','Ứ','Ự','Ừ','Ử','Ữ','Ū','Ų','Ů','Ũ','ʉ','ú','ŭ','ǔ','û','ü','ǘ','ǚ','ǜ','ǖ','ụ','ű','ù','ủ','ư','ứ','ự','ừ','ử','ữ','ū','ų','ů','ũ','ʊ'],
  v:['ʋ','ʌ'],
  w:['Ẃ','Ŵ','Ẅ','Ẁ','ʬ','ẃ','ŵ','ẅ','ẁ','ʍ'],
  y:['Ý','Ŷ','Ÿ','Ẏ','Ỵ','Ỳ','Ƴ','Ỷ','Ȳ','Ỹ','ý','ŷ','ÿ','ẏ','ỵ','ỳ','ƴ','ỷ','ȳ','ỹ','ʎ'],
  z:['Ź','Ž','Ż','Ẓ','Ẕ','Ƶ','z','ź','ž','ʑ','ż','ẓ','ẕ','ʐ','ƶ']
};

Diatrics.characters = 'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ0123456789_-';

Diatrics.slugify = function(input,options){
  if(!options) options = {};
  if(!options.case) options.case = 'lower';
  if(!options.white_spaces) options.white_spaces = '-';
  if(!options.special_chars) options.special_chars = '';

  input = input.trim().split(' ').join(options.white_spaces);
  if(options.case == 'lower' || options.case == 'l' || options.case == 'lowercase') input = input.toLowerCase();
  else if(options.case == 'upper' || options.case == 'l' || options.case == 'uppercase') input = input.toLowerCase();

  var hash = Diatrics.hash;

  var output = '', mm = hash.length;
  for(let c=null,i=0,m=input.length;i<m;i++){
    c = input.charAt(i);
    if(Diatrics.characters.indexOf(c) == -1){
      for(let k in hash){
        if(hash[k].indexOf(c) != -1){
          output += k;
          break;
        }
      }
    }else output += c;
  }

  return output;
};

String.prototype.slugify = function(options){
  return Diatrics.slugify(this.toString(),options);
};
