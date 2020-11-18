function myFunction(symbolAmount,bigAmount,digitAmount,specialAmount)
{
    var string='';
    var result='';
    var all= 'abcdefghijklmnopqrstuvwxyz';
    var bigLetters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var digits ='0123456789';
    var special='!@#$%^&*()-=_+[{]{;:",<.>/?`~';

    if(bigAmount==0)
        {
            all+=bigLetters;
        }
    if(digitAmount==0)
        {
            all+=digits;
        }
    if(specialAmount==0)
        {
            all+=special;
        }
for ( var i = 0; i < symbolAmount-bigAmount-digitAmount-specialAmount; i++ )
{
 string += all.charAt(Math.floor(Math.random() *all.length));
}
for ( var i = 0; i < bigAmount; i++ )
{
string += bigLetters.charAt(Math.floor(Math.random() * bigLetters.length));

}
for ( var i = 0; i < digitAmount; i++ )
{
 string += digits.charAt(Math.floor(Math.random() * digits.length));
}
for ( var i = 0; i < specialAmount; i++ )
{
 string += special.charAt(Math.floor(Math.random() * special.length));
    
}

var result = string.split('').sort(function(){return 0.5-Math.random()}).join('');

return result;

}

