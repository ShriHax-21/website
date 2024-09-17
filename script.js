
var icon = document.getElementById ("icon");
icon.onclick = function(){
    document.body.classList.toggle ("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.src= "image/moon.png";
    }
    else{
        icon.src= "image/sun.png";
    }
}

$(document).ready(function () {
    if (!$.browser.webkit) {
        $('.wrapper').html('<p>Sorry! Non webkit users. :(</p>');
    }
});