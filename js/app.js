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

function changeName(name) {

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

        liquidHeight.coffee = $(coffee).height();
        origLiquidHeight.coffee = liquidHeight.coffee;

        if (showLiquid === 1 ) {
            myInterval = setInterval(function () {
            ++counter;
            if (counter >= origLiquidHeight.coffee && !drinks.doubleEspresso) { // double espresso

                // TODO: if already set, don't set
                drink.html('').hide().addClass('flip-in-x').html('double espresso').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);

                drinks.doubleEspresso = true;

                //test
                console.log('Double espresso - original height: ' + origLiquidHeight.coffee + ' current height: ' + (origLiquidHeight.coffee + counter));

            } else if (counter >= (origLiquidHeight.coffee * 2) && !drinks.tripleEspresso) { // triple espresso

                drink.html('').hide().addClass('flip-in-x').html('triple espresso').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);

                drinks.tripleEspresso = true;

                //test
                console.log('Triple espresso - original height: ' + origLiquidHeight.coffee + ' current height: ' + (origLiquidHeight.coffee + counter));

                // TODO: stop counting
            }

            scaleBy = origLiquidHeight.coffee + counter;

            if (!drinks.tripleEspresso) {
                $(coffee).css({'height': scaleBy + 'px'});
            }

        }, 2);  // showLiquid === 1 ends

    } else  if (showLiquid === 2) {

        $(coffee).addClass('unavailable');

    } else if (showLiquid === 3) {
        alert('Nothing assigned!');

        // TODO: create rules for coffee behaviour
        // TODO: create rules for milk behaviour
    }

    });

    coffeePour.on('pressup', function(e) {
        if (showLiquid === 1) {

            // TODO: remove after all rules are in place

            counter = 0;
            $(coffee).css({'height': origLiquidHeight.coffee + 'px'});
            clearInterval(myInterval);
            drink.html('').hide().addClass('flip-in-x').html('espresso').show();
            setTimeout(function () {
                drink.removeClass('flip-in-x');
            }, 500);

            // set object values back to starting
            drinks.doubleEspresso = false;
            drinks.tripleEspresso = false;

        } else if (showLiquid === 2) {

            $(coffee).removeClass('unavailable');

        }

    });

    foamedMilkPour.on('press', function(e) {

        liquidHeight.foamedMilk = $(foamedMilk).height();
        origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;

        if (showLiquid === 2) {

            myInterval = setInterval(function () {
            ++counter;

            if (counter >= origLiquidHeight.foamedMilk*3 && !drinks.dryCapuccino) { // dry capuccino

                drink.html('').hide().addClass('flip-in-x').html('dry capuccino').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);

                drinks.dryCapuccino = true;

                //test
                //console.log('Double espresso - original height: ' + origLiquidHeight.coffee + ' current height: ' + (origLiquidHeight.coffee + counter));

            }

            scaleBy = origLiquidHeight.foamedMilk + counter;

            if (!drinks.dryCapuccino) {
                $(foamedMilk).css({'height': scaleBy + 'px'});
            }

        }, 2);  // showLiquid === 2 ends

        } else if (showLiquid === 3) {

        }
    });
    foamedMilkPour.on('pressup', function(e){
        if (showLiquid === 2) {
            // TODO: dry capuccino poured
        }
    })
    foamedMilkPour.on('tap', function(e){

        //liquidHeight.foamedMilk = $(foamedMilk).height();
        //origLiquidHeight.foamedMilk = liquidHeight.foamedMilk;

        if (showLiquid === 2 && !drinks.flatWhite) {

            counter = 0;
            $(foamedMilk).css({'height': ''});
            clearInterval(myInterval);

            $(foamedMilk).addClass('not-poured').removeClass('half');
            $(steamedMilk).removeClass('not-poured').addClass('double');

            drink.html('').hide().addClass('flip-in-x').html('flat white').show();
            setTimeout(function () {
                drink.removeClass('flip-in-x');
            }, 500);

            drinks.flatWhite = true;
            drinks.cortado = false;
            drinks.dryCapuccino = false;

            e.stopPropagation();
        }

        //scaleBy = origLiquidHeight.foamedMilk + counter;
        //$(foamedMilk).css({'height': scaleBy + 'px'});

    });

    steamedMilkPour.on('press', function(e){
        if (showLiquid === 2) {

        } else if (showLiquid === 3) {

        }
    });

    steamedMilkPour.on('pressup', function(e){
        if (showLiquid === 2) {

        } else if (showLiquid === 3) {

        }
    });

    steamedMilkPour.on('tap', function(e){

        if (showLiquid === 2 && drinks.flatWhite) {

            $(steamedMilk).addClass('not-poured').removeClass('double');
            $(foamedMilk).removeClass('not-poured').addClass('half');

            drink.html('').hide().addClass('flip-in-x').html('cortado').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);

            drinks.cortado = true;
            drinks.flatWhite = false;
            // drinks.dryCapuccino = false;

            e.stopPropagation();

        } else if (showLiquid === 3) {// TODO: else removeClass('double') and carry on

        }
    });

    glassFill.on('tap', function(e) {
        showLiquid++;
        // console.log('single tap');

        // TODO: check showLiquid and show liquids depending on the number

        if (showLiquid === 2) { // cortado

            // TODO: all heights and counters back to zero


            $(foamedMilk).removeClass('not-poured').addClass('half');

            drink.html('').hide().addClass('flip-in-x').html('cortado').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);

            drinks.espresso, drinks.doubleEspresso, drinks.tripleEspresso = false;
            drinks.cortado = true;

        } else if (showLiquid === 3) { // latte

            console.log(showLiquid);
            console.log(drinks);

            // TODO: all heights and counters back to zero

            $(steamedMilk).removeClass('not-poured').removeClass('double');
            $(foamedMilk).removeClass('half').css({'height': ''}).addClass('drop');

            drink.html('').hide().addClass('flip-in-x').html('latte').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);

            drinks.espresso, drinks.doubleEspresso, drinks.tripleEspresso = false;
            drinks.cortado, drinks.flatWhite, drinks.dryCapuccino = false;
            drinks.latte = true;

        } else {

            // TODO: all heights and counters back to zero

            $(foamedMilk).addClass('not-poured').removeClass('drop');
            $(steamedMilk).addClass('not-poured');
            showLiquid = 1;
            drink.html('').hide().addClass('flip-in-x').html('espresso').show();
                setTimeout(function () {
                    drink.removeClass('flip-in-x');
                }, 500);

            drinks.latte, drinks.doubleLatte, drinks.capuccino = false;
            drinks.espresso = true;
        }

    });

    // glassFill.on('doubletap', function(e){
    //     console.log('double tap');
    // });

});
