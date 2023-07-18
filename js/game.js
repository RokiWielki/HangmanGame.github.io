var hash="Bez pracy nie ma kołaczy";
hash=hash.toUpperCase();
var misses=0;

var winner=new Audio("https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg");
var looser=new Audio("https://actions.google.com/sounds/v1/cartoon/slide_whistle_to_drum.ogg");
var ok=new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");
var not=new Audio("https://actions.google.com/sounds/v1/tools/drill_gear.ogg");
var hide_hash="";

for(i=0;i<hash.length;i++)
{
    if(hash.charAt(i)==" ") hide_hash=hide_hash+" ";
    else hide_hash=hide_hash+"-";
}

var litery=new Array(35);
litery=["A","Ą","B","C","Ć","D","E","Ę","F","G","H",
        "I","J","K","L","Ł","M","N","Ń","O","Ó","P",
        "Q","R","S","Ś","T","U","V","W","X","Y","Z",
        "Ż","Ź"];




function start()
{
    var text_div = "";

    for(i=0;i<litery.length;i++)
    {
        var w="w"+i;
        text_div+='<div class="litera" onclick="search('+i+')" id="'+w+'">'+litery[i]+'</div>';
        if((i+1)%7==0) text_div+='<div style="clear:both"></div>';

    }

    document.getElementById('kbrd').innerHTML=text_div;

    write_hash();

}

function search(nr)
{
    var good=false;

    for(i=0;i<hash.length;i++)
    {
        if(hash.charAt(i)==litery[nr])
        {
            hide_hash=hide_hash.declareChar(i,litery[nr]);
            good=true;
        }
    }
    if(good==true)
    {
        ok.play();
        var w="w"+nr;
        document.getElementById(w).style.background="#033300";
        document.getElementById(w).style.color="#00C000";
        document.getElementById(w).style.border="3px solid #00C000";
        document.getElementById(w).style.cursor="default";
        write_hash();
    }
    else
    {
        not.play();
        var w="w"+nr;
        document.getElementById(w).style.background="#330000";
        document.getElementById(w).style.color="#C00000";
        document.getElementById(w).style.border="3px solid #C00000";
        document.getElementById(w).style.cursor="default";
        document.getElementById(w).setAttribute("onclick",";");
        misses++;
        var img="img/hgman"+(misses+1)+".jpg";
        console.log('<img src="'+img+'" alt=""/>');
        document.getElementById('hang').innerHTML=
            '<img src="'+img+'" alt=""/>';
    }
    //wygrana
    if(hash==hide_hash)
    {
        winner.play();
        document.getElementById('kbrd').innerHTML='WYGRAŁEŚ !!<br/>Hasło: '+
        hash+'<br/><span class="reset" onclick="location.reload()">RESTART</span>';
    }
    //przegrana
    if(misses==11)
    {
        looser.play();
        document.getElementById('kbrd').innerHTML='PRZEGRAŁEŚ !!<br/>Hasło: '+
        hash+'<br/><span class="reset" onclick="location.reload()">RESTART</span>';
    }
    
}

function write_hash(){
    document.getElementById("hash").innerHTML = hide_hash;
}

String.prototype.declareChar=function(place, char)
{
    if(place>this.length-1) return this.toString();
    else return this.substr(0,place)+char+this.substr(place+1);
}

window.onload = start;