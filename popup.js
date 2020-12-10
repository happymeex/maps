var data={
    progroom1:{
        map: "1stfloor",
        title: "Program Room #1",
        desc: "Individuals in this program room have more profound disabilities. They receive therapies and work on building skills.",
        imgurl: "images/chestnut_progroom1.jpg",
        top: 62,
        left: 23
    },
    progroom2:{
        map: "1stfloor",
        title: "Program Room #2",
        desc: "Individuals in this room have moderate disabilities and work on developing physical and social skills.",
        imgurl: "images/chestnut_progroom2.jpg",
        top: 28,
        left: 72.5
    },
    mainEntrance:{
        map: "1stfloor",
        title: "Main Entrance",
        desc: "Front entrance is accessed from driveway in front of building. Metered parking is available in adjacent city lot.",
        imgurl: "images/chestnut_main_entr.jpg",
        top: 86,
        left: 49.7
    },
    exroom:{
        map: "1stfloor",
        title: "Exercise Room",
        desc: "Residents are provided the equipment and space to exercise.",
        imgurl: "images/chestnut_exercise.jpg",
        top: 25,
        left: 27
    },
    accessibleEntrance:{
        map: "1stfloor",
        title: "Accessible Entrance",
        desc: "Accessible entrance with handicapped button leads to the building's lower level.",
        imgurl: "images/chestnut_accessible.jpg",
        top: 88.8,
        left: 7.3
    },
    ramp:{
        map: "1stfloor",
        title: "Ramp and Elevator",
        desc: "Accessible entrances on the side of the building.",
        imgurl: "images/ramp_and_elevator.jpg",
        top: 40,
        left: 91
    },
    wellness:{
        map: "1stfloor",
        title: "Wellness/Sensory Room",
        desc: "This room is used for individuals who are not feeling well or need a quiet space.",
        imgurl: "images/chestnut_wellness_room.jpg",
        top: 32,
        left: 50,
    },
    kitchen:{
        map: "lowerlevel",
        title: "Kitchen",
        desc: "Residents may cook for themselves.",
        imgurl: "images/chestnut_kitchen.jpg",
        top: 66,
        left: 80.2
    },
    progroom3:{
        map: "lowerlevel",
        title: "Program Room #3",
        desc: "Individuals in this program room are high functioning and can participate in many activities.",
        imgurl: "images/chestnut_progroom3.jpg",
        top: 18,
        left: 17
    },
    entr:{
        map:"woodland",
        title: "Main Entrance",
        desc: "Main entrance is accessed from building parking lot via a ramp with slight incline.",
        imgurl: "images/woodland_main_entr.jpg",
        top: 90,
        left: 12
    },
    game:{
        map: "woodland",
        title: "Extended Program Area/Game Room",
        desc: "Adjacent to the main program room, this space is used for games and relaxing activities.",
        imgurl: "images/woodland_game.jpg",
        top: 74,
        left: 76
    },
    mainprog:{
        map: "woodland",
        title: "Main Program Room",
        desc: "Community Based Day Supports (CBDS) programming takes place in this large space.",
        imgurl: "images/woodland_mainprog.jpg",
        top: 47,
        left: 28
    }
}

//open map screen on click
$(".map-btn").click(function(){
    parent=$(this).attr("data-title")
    
    if(parent=="woodland"){
        for (x of document.getElementsByClassName("map-container")){
            if(x.dataset.parent == parent) x.style.display = "block"
            else x.style.display="none"
        }
    }
    else{
        for (x of document.getElementsByClassName("map-container")){
            x.style.display="none"
        }
        $("#1stfloor-container").css("display", "block")
        $("#popup-screen").append("<div id='map-toggler-right' style='display: block'><div>")
        $("#popup-screen").append("<div id='map-toggler-left'><div>");
        $("#map-toggler-right").click(function() {
            $("#1stfloor-container").css("display", "none")
            $("#lowerlevel-container").css("display", "block")
            $(this).css("display", "none")
            $("#map-toggler-left").css("display", "block")
        })
        $("#map-toggler-left").click(function() {
            $("#lowerlevel-container").css("display", "none")
            $("#1stfloor-container").css("display", "block")
            $(this).css("display", "none")
            $("#map-toggler-right").css("display", "block")
        })
    }
    $("#popup-screen").css("display", "flex")
})

//exit map screen when you click away
window.onclick = function(e){
    if(e.target == document.getElementById("popup-screen")){
        $("#popup-screen").css("display", "none")
        $("#map-toggler-right").remove()
        $("#map-toggler-left").remove()
    }
}

//function displaying info-box corresponding to datapoint d
function display(){
    d=$(this).attr("id")
    $("#info-box-header").text(data[d].title)
    $("#info-box-img").attr("src", data[d].imgurl)
    $("#info-box-text").text(data[d].desc)

    //position the info-box based on button location
    rect= $("#"+d)[0].getBoundingClientRect()
    button=[0.5*(rect.left+rect.right), 0.5*(rect.top+rect.bottom)]
    if(button[0]<0.5*$(window).width()) $("#info-box").css({"right": "auto", "left": button[0]+18})
    else $("#info-box").css({"left": "auto", "right": $(window).width()-button[0]+30})

    //need to wait for image to load to calculate height position
    $("#info-box-img").on('load',function() {
        boxH = $("#info-box").outerHeight()
        if(button[1]+0.5*boxH > $(window).height()) $("#info-box").css({"top": "auto", "bottom": 0})
        else if(0.5*boxH > button[1]) $("#info-box").css({"bottom": "auto", "top": 0})
        else $("#info-box").css({"bottom": "auto", "top": button[1]-0.5*boxH})
    })
}

//initialize room buttons and hover functionality
for (let d in data){
    $("#" + data[d].map+"-container").append('<div class="room-btn" id = "'+d+'" style="left: '+data[d].left+'%; top: '+data[d].top+'%;"></div>')
    $("#"+d).hover(display, function(){
        $("#info-box").css({"top" : -1000, "left": -1000, "right": "auto", "bottom": "auto"})
    })
}