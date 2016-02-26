// Document variables
var pouring, pouringNeg, scaleBy;
var liquidHeight = {
    coffee: '',
    steamedMilk: '',
    foamedMilk: ''
};

var origLiquidHeight = {
    coffee: '',
    steamedMilk: '',
    foamedMilk: ''
};

var showLiquid = 1;

// Hammer.js variables
var coffee = $('#coffee');
var coffeePour = propagating(new Hammer($('#coffee')[0]));
var steamedMilk = $('#steamed-milk');
var steamedMilkPour = propagating(new Hammer($('#steamed-milk')[0]));
var foamedMilk = $('#foamed-milk');
var foamedMilkPour = propagating(new Hammer($('#foamed-milk')[0]));
var glass = $('#container');
var glassFill = propagating(new Hammer($('#container')[0]));
var drink = $('#drink');
var suggestion = $('#suggestion');
var circle = $('#circle');


var drinks = {
    espresso: {
        poured: false,
        name: 'espresso',
        coffeq: 1,
        smilkq: 0,
        fmilkq: 0
    },
    doubleEspresso: {
        poured: false,
        name: 'double espresso',
        coffeq: 2,
        smilkq: 0,
        fmilkq: 0
    },
    tripleEspresso: {
        poured: false,
        name: 'triple espresso',
        coffeq: 3,
        smilkq: 0,
        fmilkq: 0
    },
    cortado:{
        poured: false,
        name: 'cortado',
        coffeq: 1,
        smilkq: 0,
        fmilkq: 0.5
    },
    flatWhite: {
        poured: false,
        name: 'flat white',
        coffeq: 1,
        smilkq: 2,
        fmilkq: 0
    },
    dryCapuccino: {
        poured: false,
        name: 'dry capuccino',
        coffeq: 1,
        smilkq: 0,
        fmilkq: 2
    },
    latte: {
        poured: false,
        name: 'latte',
        coffeq: 1,
        smilkq: 2,
        fmilkq: 0.25
    },
    doubleLatte: {
        poured: false,
        name: 'double latte',
        coffeq: 2,
        smilkq: 2,
        fmilkq: 0.25
    },
    capuccino: {
        poured: false,
        name: 'capuccino',
        coffeq: 1,
        smilkq: 1,
        fmilkq: 1
    }
};
// Functions
function currentDrink(name) {
    for (var key in drinks) {
        if (drinks.hasOwnProperty(key)) {
            if (key === name) {
                drinks[key]['poured'] = true;
                // TODO: change name on screen
                drink.hide().html('').addClass('flip-in-x').removeClass('clicked').html(drinks[key]['name']).show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);

            } else {
                drinks[key]['poured'] = false;
            }
        }
    }
}

function displaySuggestion(liquid, message) {
    if (!liquid) {
        console.log('nothing!')
    } else {
        liquid.addClass('no-drinks');
    }
    suggestion.addClass('flip-in-x').html(message).show();
        setTimeout(function () {
            suggestion.addClass('flip-out-x').removeClass('flip-in-x');
            setTimeout(function(){
                suggestion.hide().removeClass('flip-out-x').html('');
            }, 400);
        }, 1750);
}

function pourCoffee(newDrink, h) {

    scaleBy = coffee.height();
    coffee.height(scaleBy + 30);

    if (newDrink === 'tripleEspresso') {
        if (coffee.height() < h/2) {

            currentDrink('doubleEspresso');

            pouring = requestAnimationFrame(function() {
                pourCoffee(newDrink, h);  
            });
        } else if (coffee.height() > h/2 && coffee.height() < h) {
            pouring = requestAnimationFrame(function() {
                pourCoffee(newDrink, h);
            });
        } else {
            currentDrink(newDrink);
        }
    }
    else if (newDrink === 'doubleLatte') {
        if (scaleBy < h) {
            pouring = requestAnimationFrame(function() {
                pourCoffee(newDrink, h);
            });
        } else {
            currentDrink(newDrink);
        }
    }
}

function pourFoamedMilk(newDrink, h){
    scaleBy = foamedMilk.height();
    foamedMilk.height(scaleBy + 30);
        if (scaleBy < h) {
            pouring = requestAnimationFrame(function() {
                pourFoamedMilk(newDrink, h);
            });
        } else {
            currentDrink(newDrink);
        }
}

function brewCoffee(h) {
    scaleBy = coffee.height();
    coffee.height(scaleBy - 30);
    if (scaleBy > h) {
        pouringNeg = requestAnimationFrame(function(){
            brewCoffee(h);
        });
    } else {
        cancelAnimationFrame(pouringNeg);
    }

}
function brewSteamedMilk(h) {
    scaleBy = steamedMilk.height();
    steamedMilk.height(scaleBy - 30);
    if (scaleBy > h) {
        pouringNeg = requestAnimationFrame(function(){
            brewSteamedMilk(h);
        });
    } else {
        cancelAnimationFrame(pouringNeg);
    }
}
function brewFoamedMilk(h) {
    scaleBy = foamedMilk.height();
    foamedMilk.height(scaleBy - 30);
    if (scaleBy > h) {
        pouringNeg = requestAnimationFrame(function(){
            brewFoamedMilk(h);
        });
    } else {
        cancelAnimationFrame(pouringNeg);
    }
}

$(document).ready(function(){

    setTimeout(function(){
        coffee.removeClass('first-pour not-poured');
    }, 300);
    setTimeout(function(){
        currentDrink('espresso');
        displaySuggestion(false, 'Press to pour more, tap to add milk or brew')
    }, 750);

    coffeePour.on('press', function(e) {
        liquidHeight.coffee = Math.floor(coffee.height());
        origLiquidHeight.coffee = liquidHeight.coffee;
        if (showLiquid === 1 ) {
            if (drinks.tripleEspresso.poured) {
                displaySuggestion(coffee, 'Tap here to pour or below to change drinks');
            } else if (drinks.doubleEspresso.poured) {
                pouring = pourCoffee('tripleEspresso', origLiquidHeight.coffee/2 * drinks.tripleEspresso.coffeq);
            } else {
                pouring = pourCoffee('tripleEspresso', origLiquidHeight.coffee * drinks.tripleEspresso.coffeq);
            }
        } else if (showLiquid === 2) {
            displaySuggestion(coffee, 'Tap here to pour or below to change drinks');
        } else if (showLiquid === 3) {
            if (drinks.latte.poured) {
                pouring = pourCoffee('doubleLatte', origLiquidHeight.coffee * drinks.doubleLatte.coffeq);
            }
            if (drinks.doubleLatte.poured) {
                displaySuggestion(coffee, 'Tap here to pour or below to change drinks');
            }
            if (drinks.capuccino.poured) {
                displaySuggestion(coffee, 'Tap here to pour or below to change drinks');
            }
        }
    });

    coffeePour.on('pressup', function(e) {
        if (showLiquid === 1) {
            if (drinks.espresso.poured) {
                cancelAnimationFrame(pouring);
                coffee.height(origLiquidHeight.coffee);
            }
            if (drinks.doubleEspresso.poured) {
                cancelAnimationFrame(pouring);
                coffee.height(origLiquidHeight.coffee * 2);
            }
            else if (drinks.tripleEspresso.poured) {
                coffee.removeClass('no-drinks');
            }
        } else if (showLiquid === 2) {
            coffee.removeClass('no-drinks');
        } else if (showLiquid === 3) {
            if (drinks.latte.poured) {
                cancelAnimationFrame(pouring);
                coffee.height(origLiquidHeight.coffee);
            }
            if (drinks.doubleLatte.poured || drinks.capuccino.poured) {
                coffee.removeClass('no-drinks');
            }
        }
    });

    foamedMilkPour.on('press', function(e) {
        liquidHeight.foamedMilk = Math.floor(foamedMilk.height());
        liquidHeight.coffee = Math.floor(coffee.height());
        if (showLiquid === 2) {
            if (drinks.cortado.poured) {
                origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;
                origLiquidHeight.coffee = liquidHeight.coffee;
                pouring = pourFoamedMilk('dryCapuccino', origLiquidHeight.coffee * drinks.dryCapuccino.fmilkq);
            }
            if (drinks.dryCapuccino.poured) {
                displaySuggestion(foamedMilk, 'Tap here to pour or below to change drinks');
            }
        } else if (showLiquid === 3) {
            if (drinks.latte.poured) {
                origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;
                origLiquidHeight.coffee = liquidHeight.coffee;
                pouring = pourFoamedMilk('capuccino', origLiquidHeight.coffee * drinks.capuccino.fmilkq);
            }
            if (drinks.doubleLatte.poured) {
                origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;
                origLiquidHeight.coffee = liquidHeight.coffee;
                pouring = pourFoamedMilk('capuccino', origLiquidHeight.coffee /2 * drinks.capuccino.fmilkq);
                pouringNeg = brewCoffee(origLiquidHeight.coffee / 2);
            }
            if (drinks.capuccino.poured) {
                displaySuggestion(foamedMilk, 'Tap here to pour or below to change drinks');
            }
        }
    });

    foamedMilkPour.on('pressup', function(e){
        if (showLiquid === 2) {
            if (drinks.cortado.poured) {
                cancelAnimationFrame(pouring);
                foamedMilk.height(origLiquidHeight.foamedMilk);
            }
            if  (drinks.dryCapuccino.poured) {
                foamedMilk.removeClass('no-drinks');
            }
        } else if (showLiquid === 3) {
            if (drinks.latte.poured) {
                cancelAnimationFrame(pouring);
                foamedMilk.height(origLiquidHeight.foamedMilk);
            }
            if (drinks.doubleLatte.poured) {
                cancelAnimationFrame(pouring);
                cancelAnimationFrame(pouringNeg);
                foamedMilk.height(origLiquidHeight.foamedMilk);
                coffee.height(origLiquidHeight.coffee);
            }
            if (drinks.capuccino.poured) {
                foamedMilk.removeClass('no-drinks');
            }
        }
    });

    foamedMilkPour.on('tap', function(e){
        if (showLiquid === 2) {
            if (drinks.cortado.poured || drinks.dryCapuccino.poured) {
                foamedMilk.removeClass('half').css({'height':''}).addClass('not-poured');
                steamedMilk.removeClass('not-poured').addClass('double reverse');
                currentDrink('flatWhite');
                e.stopPropagation();
            }
        }
    });

    steamedMilkPour.on('press', function(e){
        if (showLiquid === 2) {
            if (drinks.flatWhite.poured) {
                displaySuggestion(steamedMilk, 'Tap here to pour or below to change drinks');
            }
        } else if (showLiquid === 3) {
            displaySuggestion(steamedMilk, 'Tap here to pour or below to change drinks');
        }
    });

    steamedMilkPour.on('pressup', function(e){
        if (showLiquid === 2) {

            if (drinks.flatWhite.poured) {
                steamedMilk.removeClass('no-drinks');
            }

        } else if (showLiquid === 3) {
            steamedMilk.removeClass('no-drinks');
        }
    });

    steamedMilkPour.on('tap', function(e){
        if (showLiquid === 2) {
            if (drinks.flatWhite.poured) {
                steamedMilk.removeClass('double reverse').addClass('not-poured');
                foamedMilk.removeClass('not-poured').addClass('half');
                currentDrink('cortado');
                e.stopPropagation();
            }
        }
    });

    glassFill.on('tap', function(e) {

        showLiquid++;
        coffee.css({'height':''});
        foamedMilk.css({'height':''});
        steamedMilk.css({'height': ''});
        scaleBy = 0;
        suggestion.html('').hide().removeClass('flip-in-x');

        if (showLiquid === 2) {
            foamedMilk.removeClass('not-poured').addClass('half');
            currentDrink('cortado');

        } else if (showLiquid === 3) {
            steamedMilk.removeClass('not-poured').removeClass('double');
            foamedMilk.removeClass('half').css({'height': ''}).addClass('drop');
            currentDrink('latte');

        } else {
            foamedMilk.addClass('not-poured').removeClass('drop');
            steamedMilk.addClass('not-poured');
            showLiquid = 1;
            currentDrink('espresso');
        }
    });
    drink.on('click', function(e){
        if (!$(this).hasClass('clicked')) {
            circle.css({
                'left': e.pageX - 15,
                'top': e.pageY - 15
            }).addClass('ripple');

            $(this).addClass('clicked');

            brewCoffee(0);

            if (!steamedMilk.hasClass('not-poured')) {
                brewSteamedMilk(0);
            }
            if (!foamedMilk.hasClass('not-poured')) {
                brewFoamedMilk(0);
            }

            setTimeout(function(){
                circle.removeClass('ripple');
                showLiquid = 1;
                scaleBy = 0;
                liquidHeight.coffee = 0;
                liquidHeight.steamedMilk = 0;
                liquidHeight.foamedMilk = 0;
                setTimeout(function(){
                    // cleaning up
                    coffee.css({'height':''}).removeClass('not-poured');
                    steamedMilk.css({'height':''}).removeClass('drop half double reverse').addClass('not-poured');
                    foamedMilk.css({'height':''}).removeClass('drop half double reverse').addClass('not-poured');
                    drink.removeClass('clicked');
                    currentDrink('espresso');
                },500);
            }, 500);
        }
        e.stopPropagation();
    });
});

// function handleOrientation(event) {
//     var x = Math.floor(360 - event.alpha);  // In degree in the range [-180,180]
//
//     // Because we don't want to have the device upside down
//     // We constrain the x value to the range [-90,90]
//     // if (x >  90) { x =  90};
//     // if (x < -90) { x = -90};
//
//     // To make computation easier we shift the range of
//     // x and y to [0,180]
//     // x += 90;
//
//     // 10 is half the size of the ball
//     // It center the positioning point to the center of the ball
//     $('#suggestion').html(x);
//     $('#container').css({
//         'transform': 'rotate(' + (-x) + 'deg)'
//     });
//     console.log(x);
//
// }
// // Device orientation
// if (window.DeviceOrientationEvent) {
//     console.log('supported!');
//     window.addEventListener('deviceorientation', handleOrientation);
// } else {
//     console.log('not supported');
// }
