// document variables
var counter = 0;
var myInterval, scaleBy;
var liquidHeight = {
    coffee: '',
    steamedMilk: '',
    foamedMilk: ''
}

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
    var coffeePour = new Hammer(coffee);

    var steamedMilk = document.getElementById('steamed-milk');
    var steamedMilkPour = propagating(new Hammer(steamedMilk));

    var foamedMilk = document.getElementById('foamed-milk');
    var foamedMilkPour = propagating(new Hammer(foamedMilk));

    var glass = document.getElementById('container');
    var glassFill = propagating(new Hammer(glass));

    // Double tap to be removed
    //glassFill.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
    //glassFill.get('doubletap').recognizeWith('tap');
    //glassFill.get('tap').requireFailure('doubletap');

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

    // --------------------------------------- showLiquid === 1 ends ---------------------------------------

    } else  if (showLiquid === 2) {
        // cortado
        // dry capuccino
        // flat white


        $(coffee).addClass('no-drinks');

    // --------------------------------------- showLiquid === 2 ends ---------------------------------------

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

        }
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

            // $(coffee).css({'height': origLiquidHeight.coffee + 'px'});
            // clearInterval(myInterval);
            // drink.html('').hide().addClass('flip-in-x').html('espresso').show();
            // setTimeout(function () {
            //     drink.removeClass('flip-in-x');
            // }, 500);

            // set object values back to starting
            // currentDrink('espresso')

        } else if (showLiquid === 2) {

            $(coffee).removeClass('no-drinks');

        } else if (showLiquid === 3) {

            currentDrink('doubleLatte');
            // latte
            // double latte
            // capuccino

            if (drinks.doubleLatte) {
                $(coffee).removeClass('no-drinks');
            }

        }

    });

    foamedMilkPour.on('press', function(e) {

        liquidHeight.foamedMilk = $(foamedMilk).height();


        if (showLiquid === 2) {

            origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;

            if (drinks.cortado) {
                console.log(e);
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
                $(foamedMilk).addClass('no-drinks');
            }
        // cortado
        // flat white
        // dry capuccino

        //     myInterval = setInterval(function () {
        //     ++counter;
        //
        //     if (counter >= origLiquidHeight.foamedMilk*3 && !drinks.dryCapuccino) { // dry capuccino
        //
        //         drink.html('').hide().addClass('flip-in-x').html('dry capuccino').show();
        //         setTimeout(function () {
        //             drink.removeClass('flip-in-x');
        //         }, 500);
        //
        //         drinks.dryCapuccino = true;
        //
        //         //test
        //         //console.log('Double espresso - original height: ' + origLiquidHeight.coffee + ' current height: ' + (origLiquidHeight.coffee + counter));
        //
        //     }
        //
        //     scaleBy = origLiquidHeight.foamedMilk + counter;
        //
        //     if (!drinks.dryCapuccino) {
        //         $(foamedMilk).css({'height': scaleBy + 'px'});
        //     }
        //
        // }, 2);  // showLiquid === 2 ends

        } else if (showLiquid === 3) {

            // latte
            // double latte
            // capuccino

        }
    });
    foamedMilkPour.on('pressup', function(e){
        if (showLiquid === 2) {

            // cortado
            if (drinks.cortado) {

            }
            if  (drinks.dryCapuccino) {
                $(foamedMilk).removeClass('no-drinks');
            }
            if (drinks.flatWhite) {}

            // dry capuccino
            // flat white

        } else if (showLiquid === 3) {

            // latte
            // double latte
            // capuccino

        }
    })
    foamedMilkPour.on('tap', function(e){

        //liquidHeight.foamedMilk = $(foamedMilk).height();
        //origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;

        if (showLiquid === 2) {

            // cortado
            // flat white
            // dry capuccino

            // counter = 0;
            // if (!flatWhite &&) {
            //     $(foamedMilk).css({'height': ''});
            //     clearInterval(myInterval);
            //
            //     $(foamedMilk).addClass('not-poured').removeClass('half');
            //     $(steamedMilk).removeClass('not-poured').addClass('double');
            //
            //     drink.html('').hide().addClass('flip-in-x').html('flat white').show();
            //     setTimeout(function () {
            //         drink.removeClass('flip-in-x');
            //     }, 500);
            //
            //     drinks.flatWhite = true;
            //     drinks.cortado = false;
            //     drinks.dryCapuccino = false;
            //
            //     e.stopPropagation();
            // }
        } else if  (showLiquid === 3) {

            // latte
            // double latte
            // capuccino

        }

        //scaleBy = origLiquidHeight.foamedMilk + counter;
        //$(foamedMilk).css({'height': scaleBy + 'px'});

    });

    steamedMilkPour.on('press', function(e){
        if (showLiquid === 2) {

            // cortado
            // dry capuccino
            // flat white

        } else if (showLiquid === 3) {

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

        } else if (showLiquid === 3) {

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

            // $(steamedMilk).addClass('not-poured').removeClass('double');
            // $(foamedMilk).removeClass('not-poured').addClass('half');
            //
            // drink.html('').hide().addClass('flip-in-x').html('cortado').show();
            //     setTimeout(function () {
            //         drink.removeClass('flip-in-x');
            //     }, 500);
            //
            // drinks.cortado = true;
            // drinks.flatWhite = false;
            // // drinks.dryCapuccino = false;
            //
            // e.stopPropagation();

        } else if (showLiquid === 3) {

            // latte
            // double latte
            // capuccino

        }
    });

    glassFill.on('tap', function(e) {

        showLiquid++;
        $(coffee).css({'height':''});

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
