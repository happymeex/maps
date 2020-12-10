var photos={
    frontcolor:{
        building: "chestnut",
        imgurl: "./chestnut_exterior/front_color.jpg"
    },
    closerfront:{
        building: "chestnut",
        imgurl: "./chestnut_exterior/front.jpg"
    },
    basic:{
        building: "woodland",
        imgurl: "./woodland_exterior/woodland.png"
    },
    front:{
        building: "woodland",
        imgurl: "./woodland_exterior/woodland_front.jpg"
    }
}

var numChestnut
var numWoodland

//load images and dots
function loadImages(){
    chestnutct=0
    woodlandct=0
    for(let p in photos){
        b=photos[p].building
        $("#" + b).append('<div class="slide fade '+b+'slide"><img src='+photos[p].imgurl+' class="slide-img"></div>')
        
        if(b=="chestnut"){
            $("#" + b+"-bar").append('<span class="dot '+b+'dot" onclick="slide('+chestnutct.toString()+')"></span>')
            chestnutct++
        }
        else{
            $("#" + b+"-bar").append('<span class="dot '+b+'dot" onclick="slide('+(100+woodlandct).toString()+')"></span>')
            woodlandct++
        }
    }
    numChestnut=document.getElementsByClassName("chestnutslide").length
    numWoodland=document.getElementsByClassName("woodlandslide").length
}

//track current slide
var chestnutCurr=0
var woodlandCurr=0

//change to nth slide
function slide(n){
    if(n>=100){
        slideshow=$("#woodland")
        n-=100
        woodlandCurr=n
    }
    else{
        slideshow=$("#chestnut")
        chestnutCurr=n
    }
    slides=document.getElementsByClassName(slideshow.attr("id")+"slide")
    dots=document.getElementsByClassName(slideshow.attr("id")+"dot")

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[n].style.display = "block";
    dots[n].className += " active";
}

function plusSlides(k, building){
    if(building=="chestnut"){
        temp=chestnutCurr+k;
        if(temp<0) temp=numChestnut-1
        else if(temp>=numChestnut) temp=0
        slide(temp)
    }
    else{
        temp=woodlandCurr+k;
        if(temp<0) temp=numWoodland-1
        else if(temp>=numWoodland) temp=0
        slide(temp+100)
    }
}

$(document).ready(function() {
    loadImages()
    slide(0)
    slide(100)
})