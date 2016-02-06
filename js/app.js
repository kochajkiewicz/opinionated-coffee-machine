// document variables
var counter = 0;
var myInterval, scaleBy, scaleByNeg;
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

// can be max 3 - means all three liquids are shown
var showLiquid = 1;

var drinks = {
    espresso: true,
    doubleEspresso: false,
    tripleEspresso: false,
    cortado: false,
    flatWhite: false,
    dryCapuccino: false,
    latte: false,
    doubleLatte: false,
    capuccino: false
}

// functions
function currentDrink(name) {
    for (var key in drinks) {
        if (drinks.hasOwnProperty(key)) {
            if (key === name) {
                drinks[key] = true;
            } else {
                drinks[key] = false;
            }
        }
    }
    // console.log(drinks);
}

$(document).ready(function(){

    // hammerjs variables
    var coffee = document.getElementById('coffee');
    var coffeePour = propagating(new Hammer(coffee));

    var steamedMilk = document.getElementById('steamed-milk');
    var steamedMilkPour = propagating(new Hammer(steamedMilk));

    var foamedMilk = document.getElementById('foamed-milk');
    var foamedMilkPour = propagating(new Hammer(foamedMilk));

    var glass = document.getElementById('container');
    var glassFill = propagating(new Hammer(glass));

    var drink = $('#drink');

    coffeePour.on('press', function(e) {
        liquidHeight.coffee = $(coffee).height();
        if (showLiquid === 1 ) {
            // new pours check
            if (drinks.espresso) {

                origLiquidHeight.coffee = liquidHeight.coffee;

            } else {
                origLiquidHeight.coffee = liquidHeight.coffee / 2;

                drink.html('').hide().addClass('flip-in-x').html('espresso').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);
                currentDrink('espresso');
            }

            myInterval = setInterval(function () {
                ++counter;
                if (counter >= origLiquidHeight.coffee && !drinks.doubleEspresso) { // double espresso
                    drink.html('').hide().addClass('flip-in-x').html('double espresso').show();
                    setTimeout(function () {
                        drink.removeClass('flip-in-x');
                    }, 500);
                    console.log('class set');
                    currentDrink('doubleEspresso');
                } else if (counter >= (origLiquidHeight.coffee * 2)) { // triple espresso
                    drink.html('').hide().addClass('flip-in-x').html('triple espresso').show();
                    setTimeout(function () {
                        drink.removeClass('flip-in-x');
                    }, 500);
                    clearInterval(myInterval);
                    currentDrink('tripleEspresso');
                }

                scaleBy = origLiquidHeight.coffee + counter;

                if (!drinks.tripleEspresso) {
                    $(coffee).height(scaleBy);
                }

            }, 2);

    // --------------------------------------- coffee showLiquid === 1 ends ---------------------------------------

        } else  if (showLiquid === 2) {
            // cortado
            // dry capuccino
            // flat white

            $(coffee).addClass('no-drinks');

    // --------------------------------------- coffee showLiquid === 2 ends ---------------------------------------

        } else if (showLiquid === 3) {

            origLiquidHeight.coffee = liquidHeight.coffee;

            if (drinks.latte) {
                myInterval = setInterval(function () {
                    ++counter;
                    console.log(counter);

                    if (counter >= origLiquidHeight.coffee) {

                        drink.html('').hide().addClass('flip-in-x').html('double latte').show();
                        setTimeout(function () {
                            drink.removeClass('flip-in-x');
                        }, 500);
                        console.log('class set');

                        clearInterval(myInterval);
                        currentDrink('doubleLatte');
                    }

                    scaleBy = origLiquidHeight.coffee + counter;

                    if (!drinks.doubleLatte) {
                        $(coffee).height(scaleBy);
                    }

                }, 2);
            }

            if (drinks.doubleLatte) {
                counter = 0;
                $(coffee).addClass('no-drinks');

            }

            if (drinks.capuccino) {
                counter = 0;
                $(coffee).addClass('no-drinks');
            }
    // --------------------------------------- showLiquid === 3 ends ---------------------------------------
        }
    });

    coffeePour.on('pressup', function(e) {
        // Clear counter, interval
        counter = 0;
        clearInterval(myInterval);

        if (showLiquid === 1) {

            if (drinks.espresso) {
                // Set height to drink height
                $(coffee).height(origLiquidHeight.coffee);
            }
            if (drinks.doubleEspresso) {
                // Set height to drink height
                $(coffee).height(origLiquidHeight.coffee * 2);
            }
            else if (drinks.tripleEspresso) {
                // Set height to drink height
                $(coffee).height(origLiquidHeight.coffee * 3);
            }

            // --------------------------------------- coffee showLiquid === 1 ends ---------------------------------------

        } else if (showLiquid === 2) {

            $(coffee).removeClass('no-drinks');

            // --------------------------------------- coffee showLiquid === 2 ends ---------------------------------------

        } else if (showLiquid === 3) {

            // latte
            // double latte
            // capuccino
            if (drinks.latte) {
                $(coffee).height(origLiquidHeight.coffee);
            }
            if (drinks.doubleLatte || drinks.capuccino) {
                $(coffee).removeClass('no-drinks');
            }

            // --------------------------------------- coffee showLiquid === 3 ends ---------------------------------------

        }

    });

    foamedMilkPour.on('press', function(e) {
        liquidHeight.foamedMilk = $(foamedMilk).height();
        liquidHeight.coffee = $(coffee).height();
        if (showLiquid === 2) {
            if (drinks.cortado) {
                origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;
                //console.log(origLiquidHeight.foamedMilk, liquidHeight.foamedMilk);
                //$(foamedMilk).removeClass('half').css({'height': origLiquidHeight.foamedMilk + 'px'});
                myInterval = setInterval(function () {
                    ++counter;
                    if (counter >= (origLiquidHeight.foamedMilk *3)) {
                        drink.html('').hide().addClass('flip-in-x').html('dry capuccino').show();
                        setTimeout(function () {
                            drink.removeClass('flip-in-x');
                        }, 500);
                        clearInterval(myInterval);
                        currentDrink('dryCapuccino');
                    }
                    scaleBy = origLiquidHeight.foamedMilk + counter;
                    if (!drinks.dryCapuccino) {
                        $(foamedMilk).height(scaleBy);
                    }

                }, 2);
            }
            if (drinks.dryCapuccino) {
                $(foamedMilk).addClass('no-drinks-try-tap');
            }

        } else if (showLiquid === 3) {
            // latte
            // double latte
            // capuccino

            if (drinks.latte) {
                origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;
                console.log(origLiquidHeight.foamedMilk, liquidHeight.foamedMilk);
                //$(foamedMilk).removeClass('drop').css({'height': origLiquidHeight.foamedMilk + 'px'});
                myInterval = setInterval(function (){
                    ++counter;
                    if (counter >= (origLiquidHeight.foamedMilk * 4)) {
                        clearInterval(myInterval);
                        drink.html('').hide().addClass('flip-in-x').html('capuccino').show();
                        setTimeout(function () {
                            drink.removeClass('flip-in-x');
                        }, 500);
                        currentDrink('capuccino');
                    }
                    scaleBy = origLiquidHeight.foamedMilk + counter;
                    if (!drinks.capuccino) {
                        $(foamedMilk).height(scaleBy);
                    }
                }, 2);
            }
            if (drinks.doubleLatte) {
                origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;
                origLiquidHeight.coffee = liquidHeight.coffee;
                myInterval = setInterval(function (){
                    ++counter;
                    if (counter >= (origLiquidHeight.foamedMilk * 4)) {
                        clearInterval(myInterval);
                        drink.html('').hide().addClass('flip-in-x').html('capuccino').show();
                        setTimeout(function () {
                            drink.removeClass('flip-in-x');
                        }, 500);
                        currentDrink('capuccino');
                    }
                    scaleBy = origLiquidHeight.foamedMilk + counter;
                    scaleByNeg = origLiquidHeight.coffee - counter;
                    console.log('coffee height: ' + scaleByNeg);
                    console.log('actual coffee height: ' + $(coffee).height());
                    if (!drinks.capuccino) {
                        $(coffee).height(scaleByNeg);
                        $(foamedMilk).height(scaleBy);
                    }
                }, 2);
            }
            if (drinks.capuccino) {
                $(foamedMilk).addClass('no-drinks');
            }
        }
    });

    foamedMilkPour.on('pressup', function(e){
        counter = 0;
        clearInterval(myInterval);

        if (showLiquid === 2) {

            // cortado
            if (drinks.cortado) {
                //TODO: stop pouring
                $(foamedMilk).height(origLiquidHeight.foamedMilk);
            }
            if  (drinks.dryCapuccino) {
                $(foamedMilk).removeClass('no-drinks-try-tap');
            }
            if (drinks.flatWhite) {}

        } else if (showLiquid === 3) {

            if (drinks.latte) {
                $(foamedMilk).height(origLiquidHeight.foamedMilk);
            }
            if (drinks.doubleLatte) {
                $(foamedMilk).height(origLiquidHeight.foamedMilk)
            }
            if (drinks.capuccino) {
                $(foamedMilk).removeClass('no-drinks');
            }

        }
    })
    foamedMilkPour.on('tap', function(e){

        counter = 0;
        clearInterval(myInterval);

        if (showLiquid === 2) {
            // cortado
            // flat white
            // dry capuccino

            if (drinks.cortado || drinks.dryCapuccino) {

                $(foamedMilk).removeClass('half').css({'height':''}).addClass('not-poured');
                $(steamedMilk).removeClass('not-poured').addClass('double');
                drink.html('').hide().addClass('flip-in-x').html('flat white').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);
                currentDrink('flatWhite');
                e.stopPropagation();
            }
        } else if  (showLiquid === 3) {
            // latte
            // double latte
            // capuccino
        }
    });

    steamedMilkPour.on('press', function(e){
        if (showLiquid === 2) {

            // flat white
            if (drinks.flatWhite) {
                $(steamedMilk).addClass('no-drinks-try-tap');
            }

        } else if (showLiquid === 3) {
            $(steamedMilk).addClass('no-drinks');

            // latte
            // double latte
            // capuccino

        }
    });

    steamedMilkPour.on('pressup', function(e){
        if (showLiquid === 2) {

            // flat white
            if (drinks.flatWhite) {
                $(steamedMilk).removeClass('no-drinks-try-tap');
            }

        } else if (showLiquid === 3) {
            $(steamedMilk).removeClass('no-drinks');
        }
    });

    steamedMilkPour.on('tap', function(e){

        counter = 0;
        clearInterval(myInterval);

        if (showLiquid === 2) {

            // cortado
            // dry capuccino
            // flat white

            if (drinks.flatWhite) {
                $(steamedMilk).removeClass('double').addClass('not-poured');
                $(foamedMilk).removeClass('not-poured').addClass('half');
                drink.html('').hide().addClass('flip-in-x').html('cortado').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);
                currentDrink('cortado');
                e.stopPropagation();
            }

        } else if (showLiquid === 3) {
            if (drinks.latte || drinks.doubleLatte || drinks.capuccino) {
                // TODO: there's nothing on tap
                // TODO: there's nothing on press
            }
        }
    });

    glassFill.on('tap', function(e) {

        showLiquid++;
        $(coffee).css({'height':''});
        $(foamedMilk).css({'height':''});
        $(steamedMilk).css({'height': ''});
        scaleBy = 0;

        if (showLiquid === 2) { // cortado

            // TODO: all heights and counters back to zero

            $(foamedMilk).removeClass('not-poured').addClass('half');

            drink.html('').hide().addClass('flip-in-x').html('cortado').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);

            currentDrink('cortado');

        } else if (showLiquid === 3) { // latte

            // TODO: all heights and counters back to zero

            $(steamedMilk).removeClass('not-poured').removeClass('double');
            $(foamedMilk).removeClass('half').css({'height': ''}).addClass('drop');

            drink.html('').hide().addClass('flip-in-x').html('latte').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);

            currentDrink('latte');

        } else {

            // TODO: all heights and counters back to zero

            $(foamedMilk).addClass('not-poured').removeClass('drop');
            $(steamedMilk).addClass('not-poured');
            showLiquid = 1;
            drink.html('').hide().addClass('flip-in-x').html('espresso').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);

            currentDrink('espresso');
        }

    });

    // glassFill.on('doubletap', function(e){
    //     console.log('double tap');
    // });

});
