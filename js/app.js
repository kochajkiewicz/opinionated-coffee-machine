// document variables
var counter = 0;
var i, pouring, scaleBy, scaleByNeg;
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

// hammerjs variables
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

function currentDrink(name) {
    for (var key in drinks) {
        if (drinks.hasOwnProperty(key)) {
            if (key === name) {
                drinks[key]['poured'] = true;
                // TODO: change name on screen
                drink.html('').hide().addClass('flip-in-x').html(drinks[key]['name']).show();
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
    liquid.addClass('no-drinks');
    suggestion.addClass('flip-in-x').html(message).show();
        setTimeout(function () {
            suggestion.addClass('flip-out-x').removeClass('flip-in-x');
            setTimeout(function(){
                suggestion.hide().removeClass('flip-out-x').html('');
            }, 400);
        }, 1500);
}

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
//     // $('#container').css({
//     //      'transform': 'rotate(' + (-x) + 'deg)'
//     // });
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

// ++counter;
// if (counter >= origLiquidHeight.coffee && !drinks.doubleEspresso.poured) { // double espresso
//     currentDrink('doubleEspresso');
// } else if (counter >= (origLiquidHeight.coffee * 2)) { // triple espresso
//     clearInterval(pouring);
//     currentDrink('tripleEspresso');
// }
// scaleBy = origLiquidHeight.coffee + counter;
// if (!drinks.tripleEspresso.poured) {
//     coffee.height(scaleBy);
// }

function pourCoffee(i, h) {

    // TODO: get current height
    // TODO: get multipliers from object

    //pourTo = coffee.height() * i;
    scaleBy = coffee.height();

    console.log('coffee height: ' + coffee.height());
    //console.log('pourTo:' + pourTo);
    coffee.height(scaleBy + 10);
    //console.log('i :' + i);

    // if (drinks.espresso.poured && coffee.height() === pourTo) {
    //     currentDrink('doubleEspresso');
    // } else if (drinks.doubleEspresso.poured && coffee.height() === pourTo * 1.5) {
    //     currentDrink('tripleEspresso');
    //     cancelAnimationFrame(pouring);
    // }
    pouring = requestAnimationFrame(function() {
        pourCoffee(i, h);
    });
}


function pourSteamedMilk(){
    if (steamedMilk.height() === xxx ) {}

}
function pourFoamedMilk(){

}
// --------------------------------------- requestAnimationFrame experiment -----------------------------------------------

// run loop from existing to desired height in PX.
// animate height as counter increases
//
// function () {
//     ++counter;
//     if (counter >= origLiquidHeight.coffee && !drinks.doubleEspresso.poured) { // double espresso
//         currentDrink('doubleEspresso');
//     } else if (counter >= (origLiquidHeight.coffee * 2)) { // triple espresso
//         clearInterval(pouring);
//         currentDrink('tripleEspresso');
//     }
//     scaleBy = origLiquidHeight.coffee + counter;
//     if (!drinks.tripleEspresso.poured) {
//         coffee.height(scaleBy);
//     }
// }

$(document).ready(function(){

    // TODO: onload animations - coffee & drink name
    coffee.removeClass('not-poured');
    setTimeout(function(){
        coffee.removeClass('first-pour');
    }, 300);
    setTimeout(function(){
        currentDrink('espresso');
    }, 750);

    coffeePour.on('press', function(e) {
        liquidHeight.coffee = Math.floor(coffee.height());
        origLiquidHeight.coffee = liquidHeight.coffee;

        if (showLiquid === 1 ) {
            requestAnimationFrame(pourCoffee(1));
            if (coffee.height() >= 200 && drinks.espresso.poured) {
                currentDrink('doubleEspresso');
            }
            if (drinks.doubleEspresso.poured) {
                // pour until triple
            }
            if (drinks.tripleEspresso.poured) {
                displaySuggestion(coffee, 'Try tapping instead');
            }
            // new pours check
            // if (drinks.espresso.poured) {
            //     pouring = requestAnimationFrame(pourCoffee(2));
            // }
            // else if (drinks.doubleEspresso.poured){
            //
            //     pouring = requestAnimationFrame(pourCoffee(3));
            // }
            //requestAnimationFrame(pourCoffee(2));
        } else if (showLiquid === 2) {
            displaySuggestion(coffee, 'Try tapping instead');
        } else if (showLiquid === 3) {
            origLiquidHeight.coffee = liquidHeight.coffee;
            if (drinks.latte.poured) {
                // pouring = setInterval(function () {
                //     ++counter;
                //     if (counter >= origLiquidHeight.coffee) {
                //         clearInterval(pouring);
                //         currentDrink('doubleLatte');
                //     }
                //
                //     scaleBy = origLiquidHeight.coffee + counter;
                //
                //     if (!drinks.doubleLatte.poured) {
                //         coffee.height(scaleBy);
                //     }
                // }, 1);
            }
            if (drinks.doubleLatte.poured) {
                counter = 0;
                displaySuggestion(coffee, 'Try tapping instead');
            }
            if (drinks.capuccino.poured) {
                counter = 0;
                displaySuggestion(coffee, 'Try tapping instead');
            }
        }
    });
    coffeePour.on('pressup', function(e) {
        counter = 0;
        //clearInterval(pouring);
        if (showLiquid === 1) {
            if (drinks.espresso.poured) {
                // coffee.height(origLiquidHeight.coffee);
                cancelAnimationFrame(pouring);
            }
            if (drinks.doubleEspresso.poured) {
                coffee.height(origLiquidHeight.coffee * 2);
                cancelAnimationFrame(pouring);
            }
            else if (drinks.tripleEspresso.poured) {
                coffee.removeClass('no-drinks');
            }
        } else if (showLiquid === 2) {
            coffee.removeClass('no-drinks');
        } else if (showLiquid === 3) {
            if (drinks.latte.poured) {
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
                pouring = setInterval(function () {
                    ++counter;
                    if (counter >= (origLiquidHeight.foamedMilk *3)) {
                        clearInterval(pouring);
                        currentDrink('dryCapuccino');
                    }
                    scaleBy = origLiquidHeight.foamedMilk + counter;
                    if (!drinks.dryCapuccino.poured) {
                        foamedMilk.height(scaleBy);
                    }
                }, 1);
            }
            if (drinks.dryCapuccino.poured) {
                displaySuggestion(foamedMilk, 'Try tapping instead');
            }
        } else if (showLiquid === 3) {
            if (drinks.latte.poured) {
                origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;
                console.log(origLiquidHeight.foamedMilk, liquidHeight.foamedMilk);
                pouring = setInterval(function (){
                    ++counter;
                    if (counter >= (origLiquidHeight.foamedMilk * 3.3)) {
                        clearInterval(pouring);
                        currentDrink('capuccino');
                    }
                    scaleBy = origLiquidHeight.foamedMilk + counter;
                    if (!drinks.capuccino.poured) {
                        foamedMilk.height(scaleBy);
                    }
                }, 1);
            }
            if (drinks.doubleLatte.poured) {
                origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;
                origLiquidHeight.coffee = liquidHeight.coffee;
                pouring = setInterval(function (){
                    ++counter;
                    if (counter >= (origLiquidHeight.foamedMilk * 3.3)) {
                        clearInterval(pouring);
                        currentDrink('capuccino');
                    }
                    scaleBy = origLiquidHeight.foamedMilk + counter;
                    scaleByNeg = origLiquidHeight.coffee - counter;
                    console.log('coffee height: ' + scaleByNeg);
                    console.log('actual coffee height: ' + coffee.height());
                    if (!drinks.capuccino.poured) {
                        coffee.height(scaleByNeg);
                        foamedMilk.height(scaleBy);
                    }
                }, 1);
            }
            if (drinks.capuccino.poured) {
                displaySuggestion(foamedMilk, 'Try tapping instead');
            }
        }
    });
    foamedMilkPour.on('pressup', function(e){
        counter = 0;
        clearInterval(pouring);

        if (showLiquid === 2) {

            // cortado
            if (drinks.cortado.poured) {
                foamedMilk.height(origLiquidHeight.foamedMilk);
            }
            if  (drinks.dryCapuccino.poured) {
                foamedMilk.removeClass('no-drinks');
                // TODO: add .suggestion content and behaviour
            }
            if (drinks.flatWhite.poured) {}

        } else if (showLiquid === 3) {

            if (drinks.latte.poured) {
                foamedMilk.height(origLiquidHeight.foamedMilk);
            }
            if (drinks.doubleLatte.poured) {
                foamedMilk.height(origLiquidHeight.foamedMilk);
            }
            if (drinks.capuccino.poured) {
                foamedMilk.removeClass('no-drinks');
            }

        }
    });
    foamedMilkPour.on('tap', function(e){
        counter = 0;
        clearInterval(pouring);
        if (showLiquid === 2) {

            if (drinks.cortado.poured || drinks.dryCapuccino.poured) {
                foamedMilk.removeClass('half').css({'height':''}).addClass('not-poured');
                steamedMilk.removeClass('not-poured').addClass('double');
                currentDrink('flatWhite');
                e.stopPropagation();
            }
        } else if  (showLiquid === 3) {

        }
    });

    steamedMilkPour.on('press', function(e){
        if (showLiquid === 2) {

            if (drinks.flatWhite.poured) {
                displaySuggestion(steamedMilk, 'Try tapping instead');
                // TODO: add .suggestion content and behaviour
            }

        } else if (showLiquid === 3) {
            displaySuggestion(steamedMilk, 'Try tapping instead');
        }
    });

    steamedMilkPour.on('pressup', function(e){
        counter = 0;
        clearInterval(pouring);
        if (showLiquid === 2) {

            if (drinks.flatWhite.poured) {
                steamedMilk.removeClass('no-drinks');
                // TODO: add .suggestion content and behaviour
            }

        } else if (showLiquid === 3) {
            steamedMilk.removeClass('no-drinks');
        }
    });

    steamedMilkPour.on('tap', function(e){

        counter = 0;
        clearInterval(pouring);

        if (showLiquid === 2) {
            if (drinks.flatWhite.poured) {
                steamedMilk.removeClass('double').addClass('not-poured');
                foamedMilk.removeClass('not-poured').addClass('half');
                currentDrink('cortado');
                e.stopPropagation();
            }

        } else if (showLiquid === 3) {

        }
    });

    glassFill.on('tap', function(e) {
        showLiquid++;
        coffee.css({'height':''});
        foamedMilk.css({'height':''});
        steamedMilk.css({'height': ''});
        scaleBy = 0;
        suggestion.html('').hide().removeClass('flip-in-x');

        if (showLiquid === 2) { // cortado
            foamedMilk.removeClass('not-poured').addClass('half');
            currentDrink('cortado');

        } else if (showLiquid === 3) { // latte
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
});
