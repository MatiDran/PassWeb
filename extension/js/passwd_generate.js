function myFunction(a,b,c,d)
{
    var string='';
    var lettersB='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var lettersS='abcdefghijklmnopqrstuvwxyz';
    var digits ='0123456789';
    var special='!@#$%^&*()-=_+[{]{;:",<.>/?`~';
    var len=a+b+c+d;
    var result='';
for ( var i = 0; i < a; i++ )
{
 string += lettersS.charAt(Math.floor(Math.random() * 26));
}
for ( var i = 0; i < b; i++ )
{
string += lettersB.charAt(Math.floor(Math.random() * 26));

}
for ( var i = 0; i < c; i++ )
{
 string += digits.charAt(Math.floor(Math.random() * 10));
}
for ( var i = 0; i < d; i++ )
{
 string += special.charAt(Math.floor(Math.random() * 30));
    
}
console.log(string);
var result = string.split('').sort(function(){return 0.5-Math.random()}).join('');

return result;

}
//console.log(myFunction(0,0,5,1));

