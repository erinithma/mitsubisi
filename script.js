var answers = [false, true, true, false, false, true, false];
var count = 0;
var inGame = false;

function checkDevice() {
    $(".car").css("transform", "scale(" + ($(window).width() / 2200) + ")")
    if($(window).height() > $(window).width() && inGame) {
        $(".small-overlay").css("display", "flex");
    }
    else {
        $(".small-overlay").css("display", "none");
    }
}

$(window).on("resize orientationchange", function() {
    checkDevice();
});

$(window).on('wheel', function(e) {
    if(e.originalEvent.wheelDelta / 120 > 0) {
        $([document.documentElement, document.body]).animate({
            scrollTop: "0px"
        }, 500);
    }
});

$(".slides__clouds").animate({
    left: "-=700vw"
}, 150000)

function check(number, answer) {
    if(answers[number] === answer) {
        count++;
    }
}

function scrollTo(selector) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(selector).offset().top
    }, 500);
}

function goTo(index, number, answer) {
    if(number !== undefined) {
        check(number, answer)
    }

    $(".slides__wrap").animate({
        left: "-=100vw"
    }, 1000)
    $(".slides__bg").animate({
        left: "-=30vw"
    }, 1000)
    $(".car").addClass("animated");
    setTimeout(function(){
        $(".car").removeClass("animated");
    }, 1000)
}

function start() {
    inGame = true;
    checkDevice();
    $(".slides__wrap").css({
        left: "0vw"
    }, 1000);
    $(".slides__bg").css({
        left: "0vw"
    }, 1000);
    $(".slides__bg").css({
        left: "0vw"
    }, 1000);
    $(".section--main").show();
    scrollTo(".section--main");
    setTimeout(function(){
        $(".section--begin").hide();
        $(".section--final").hide();
    }, 1000)
}

function finish() {
    $(".section--final").show();
    inGame = false;
    var html;
    if(count === 0) {
        html = "Твои результаты поразили нас,<br>как гвоздь покрышку. Надо чаще кататься!";
    }
    else if(count <= 3) {
        html = "Тебя легко ввести в заблуждение.<br>Тебе нужен мысленный навигатор, но его еще не изобрели, жаль."
    }
    else if(count <= 6) {
        html = "У тебя отличная интуиция.<br>Побольше бы таких на дороге!"
    }
    else {
        html = "Великолепно. Ты отличаешь любую правду от любой лжи.<br>Ты точно достоен вступить в ряды Аутлендероводов."
        $(".final-banner__bottom-text").html('Тебе осталось посетить <a href="https://www.mitsubishi-motors.ru/auto/outlander/">www.mitsubishi-motors.ru/auto/outlander/</a>.')
    }
    count = 0;
    $(".final-banner__main-text").html(html);
    setTimeout(function(){
        $(".section--final").addClass("animated");
    }, 500)
    scrollTo(".section--final");
    setTimeout(function(){
        $(".section--main").hide();
    }, 1000)
}

var img = [
    "bg.jpg", "bg2.jpg", 
    "banner2.png",
    "begin-item.png", "car.png", 
    "clouds.png", "dragon.png", "final-item.png",
    "grass.png", "item1.png", "item2.png", "item2.png", "item4.png", "item5.png",
    "logo.jpg", "logo.png",
    "man.png", 
    "vetka.png", "vetka2.png",
    "water.png", 
    "wheel1.png"
];
var pr = img.map( (img) => new Promise( (res) => {
    i = new Image();
    i.src = "./img/" + img;
    i.onload = res;
} ))

Promise.all(pr).then( () => {
$("#loading").remove();
    $(".section--begin").addClass("animated");
})