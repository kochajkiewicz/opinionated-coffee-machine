// document variables
var counter = 0;
var myInterval, scaleBy;
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

        // TODO: this is relative if pressed again after stopping!
        // TODO: apply only to new pours

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
                    $(coffee).css({'height': scaleBy + 'px'});
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
            // latte
            // double latte
            // capuccino

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
                        $(coffee).css({'height': scaleBy + 'px'});
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
                $(coffee).css({'height': origLiquidHeight.coffee});
            }
            if (drinks.doubleEspresso) {
                // Set height to drink height
                $(coffee).css({'height': origLiquidHeight.coffee * 2});
            }
            else if (drinks.tripleEspresso) {
                // Set height to drink height
                $(coffee).css({'height': origLiquidHeight.coffee * 3});
            }
            else {}

            // --------------------------------------- coffee showLiquid === 1 ends ---------------------------------------

        } else if (showLiquid === 2) {

            $(coffee).removeClass('no-drinks');

            // --------------------------------------- coffee showLiquid === 2 ends ---------------------------------------

        } else if (showLiquid === 3) {

            // latte
            // double latte
            // capuccino

            if (drinks.doubleLatte) {
                $(coffee).removeClass('no-drinks');
            }

            // --------------------------------------- coffee showLiquid === 3 ends ---------------------------------------

        }

    });

    foamedMilkPour.on('press', function(e) {

        liquidHeight.foamedMilk = $(foamedMilk).height();

        if (showLiquid === 2) {


            if (drinks.cortado) {

                origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;

                //console.log(e);
                myInterval = setInterval(function () {
                    ++counter;
                    if (counter >= origLiquidHeight.foamedMilk *3) {
                        drink.html('').hide().addClass('flip-in-x').html('dry capuccino').show();
                        setTimeout(function () {
                            drink.removeClass('flip-in-x');
                        }, 500);
                        clearInterval(myInterval);
                        currentDrink('dryCapuccino');
                    }
                    scaleBy = origLiquidHeight.foamedMilk + counter;

                    if (!drinks.dryCapuccino) {
                        $(foamedMilk).css({'height': scaleBy + 'px'});
                        //console.log('delay?');
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

            origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;

            if (drinks.latte) {
                // TODO: pour more foamed milk

                console.log(origLiquidHeight.foamedMilk, liquidHeight.foamedMilk);
                //$(foamedMilk).removeClass('drop').css({'height': origLiquidHeight.foamedMilk + 'px'});

                myInterval = setInterval(function (){
                    ++counter;
                    if (counter >= (origLiquidHeight.foamedMilk * 6.66666667)) {
                        drink.html('').hide().addClass('flip-in-x').html('capuccino').show();
                        setTimeout(function () {
                            drink.removeClass('flip-in-x');
                        }, 500);
                        clearInterval(myInterval);
                        currentDrink('capuccino');
                        //$(foamedMilk).removeClass('drop');
                    }
                    scaleBy = origLiquidHeight.foamedMilk + counter;

                    if (!drinks.capuccino) {
                        $(foamedMilk).css({'height': scaleBy + 'px'});
                        console.log(scaleBy);
                    }

                }, 20);
            }
        }
    });

    foamedMilkPour.on('pressup', function(e){
        if (showLiquid === 2) {

            // cortado
            if (drinks.cortado) {
                //TODO: stop pouring
                $(foamedMilk).css({'height': origLiquidHeight.foamedMilk});
            }
            if  (drinks.dryCapuccino) {
                $(foamedMilk).removeClass('no-drinks-try-tap');
            }
            if (drinks.flatWhite) {}

        } else if (showLiquid === 3) {

            if (drinks.latte) {}
            if (drinks.doubleLatte) {}
            if (drinks.capuccino) {}

        }
    })
    foamedMilkPour.on('tap', function(e){

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
                console.log('flat white set')
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

            // cortado
            // dry capuccino
            // flat white

            if (drinks.flatWhite) {
                // TODO: there's nothing on press
                // TODO: show there's something on tap
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

            // cortado
            // dry capuccino
            // flat white

            if (drinks.flatWhite) {
                // TODO: there's nothing on press
                // TODO: show there's something on tap
            }

        } else if (showLiquid === 3) {

            $(steamedMilk).removeClass('no-drinks');

            // latte
            // double latte
            // capuccino

        }
    });

    steamedMilkPour.on('tap', function(e){
        if (showLiquid === 2) {

            // cortado
            // dry capuccino
            // flat white

            if (drinks.flatWhite) {
                console.log(e);
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

            // latte
            // double latte
            // capuccino

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
