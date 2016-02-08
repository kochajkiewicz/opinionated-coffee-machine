function currentDrink(e){for(var i in drinks)drinks.hasOwnProperty(i)&&(i===e?(drinks[i].poured=!0,drink.html("").hide().addClass("flip-in-x").html(drinks[i].name).show(),setTimeout(function(){drink.removeClass("flip-in-x")},500)):drinks[i].poured=!1)}function displaySuggestion(e,i){e.addClass("no-drinks"),suggestion.addClass("flip-in-x").html(i).show(),setTimeout(function(){suggestion.addClass("flip-out-x").removeClass("flip-in-x"),setTimeout(function(){suggestion.hide().removeClass("flip-out-x").html("")},400)},1500)}function pour(e,o,r){for(i=liquidHeight[e];i<liquidHeight[e]*o;i++)console.log(i)}var counter=0,pouring,scaleBy,scaleByNeg,liquidHeight={coffee:"",steamedMilk:"",foamedMilk:""},origLiquidHeight={coffee:"",steamedMilk:"",foamedMilk:""},showLiquid=1,coffee=$("#coffee"),coffeePour=propagating(new Hammer($("#coffee")[0])),steamedMilk=$("#steamed-milk"),steamedMilkPour=propagating(new Hammer($("#steamed-milk")[0])),foamedMilk=$("#foamed-milk"),foamedMilkPour=propagating(new Hammer($("#foamed-milk")[0])),glass=$("#container"),glassFill=propagating(new Hammer($("#container")[0])),drink=$("#drink"),suggestion=$("#suggestion"),drinks={espresso:{poured:!0,name:"espresso"},doubleEspresso:{poured:!1,name:"double espresso"},tripleEspresso:{poured:!1,name:"triple espresso"},cortado:{poured:!1,name:"cortado"},flatWhite:{poured:!1,name:"flat white"},dryCapuccino:{poured:!1,name:"dry capuccino"},latte:{poured:!1,name:"latte"},doubleLatte:{poured:!1,name:"double latte"},capuccino:{poured:!1,name:"capuccino"}};$(document).ready(function(){coffeePour.on("press",function(e){liquidHeight.coffee=Math.floor(coffee.height()),1===showLiquid?drinks.espresso.poured?(origLiquidHeight.coffee=liquidHeight.coffee,pouring=setInterval(function(){++counter,counter>=origLiquidHeight.coffee&&!drinks.doubleEspresso.poured?currentDrink("doubleEspresso"):counter>=2*origLiquidHeight.coffee&&(clearInterval(pouring),currentDrink("tripleEspresso")),scaleBy=origLiquidHeight.coffee+counter,drinks.tripleEspresso.poured||coffee.height(scaleBy)},1)):drinks.doubleEspresso.poured?(origLiquidHeight.coffee=liquidHeight.coffee/2,currentDrink("espresso"),pouring=setInterval(function(){++counter,counter>=origLiquidHeight.coffee&&!drinks.doubleEspresso.poured?currentDrink("doubleEspresso"):counter>=2*origLiquidHeight.coffee&&(clearInterval(pouring),currentDrink("tripleEspresso")),scaleBy=origLiquidHeight.coffee+counter,drinks.tripleEspresso.poured||coffee.height(scaleBy)},1)):drinks.tripleEspresso.poured&&displaySuggestion(coffee,"Try tapping instead"):2===showLiquid?displaySuggestion(coffee,"Try tapping instead"):3===showLiquid&&(origLiquidHeight.coffee=liquidHeight.coffee,drinks.latte.poured&&(pouring=setInterval(function(){++counter,counter>=origLiquidHeight.coffee&&(clearInterval(pouring),currentDrink("doubleLatte")),scaleBy=origLiquidHeight.coffee+counter,drinks.doubleLatte.poured||coffee.height(scaleBy)},1)),drinks.doubleLatte.poured&&(counter=0,displaySuggestion(coffee,"Try tapping instead")),drinks.capuccino.poured&&(counter=0,displaySuggestion(coffee,"Try tapping instead")))}),coffeePour.on("pressup",function(e){counter=0,clearInterval(pouring),1===showLiquid?(drinks.espresso.poured&&coffee.height(origLiquidHeight.coffee),drinks.doubleEspresso.poured?coffee.height(2*origLiquidHeight.coffee):drinks.tripleEspresso.poured&&coffee.removeClass("no-drinks")):2===showLiquid?coffee.removeClass("no-drinks"):3===showLiquid&&(drinks.latte.poured&&coffee.height(origLiquidHeight.coffee),(drinks.doubleLatte.poured||drinks.capuccino.poured)&&coffee.removeClass("no-drinks"))}),foamedMilkPour.on("press",function(e){liquidHeight.foamedMilk=Math.floor(foamedMilk.height()),liquidHeight.coffee=Math.floor(coffee.height()),2===showLiquid?(drinks.cortado.poured&&(origLiquidHeight.foamedMilk=liquidHeight.foamedMilk,pouring=setInterval(function(){++counter,counter>=3*origLiquidHeight.foamedMilk&&(clearInterval(pouring),currentDrink("dryCapuccino")),scaleBy=origLiquidHeight.foamedMilk+counter,drinks.dryCapuccino.poured||foamedMilk.height(scaleBy)},1)),drinks.dryCapuccino.poured&&displaySuggestion(foamedMilk,"Try tapping instead")):3===showLiquid&&(drinks.latte.poured&&(origLiquidHeight.foamedMilk=liquidHeight.foamedMilk,console.log(origLiquidHeight.foamedMilk,liquidHeight.foamedMilk),pouring=setInterval(function(){++counter,counter>=3.3*origLiquidHeight.foamedMilk&&(clearInterval(pouring),currentDrink("capuccino")),scaleBy=origLiquidHeight.foamedMilk+counter,drinks.capuccino.poured||foamedMilk.height(scaleBy)},1)),drinks.doubleLatte.poured&&(origLiquidHeight.foamedMilk=liquidHeight.foamedMilk,origLiquidHeight.coffee=liquidHeight.coffee,pouring=setInterval(function(){++counter,counter>=3.3*origLiquidHeight.foamedMilk&&(clearInterval(pouring),currentDrink("capuccino")),scaleBy=origLiquidHeight.foamedMilk+counter,scaleByNeg=origLiquidHeight.coffee-counter,console.log("coffee height: "+scaleByNeg),console.log("actual coffee height: "+coffee.height()),drinks.capuccino.poured||(coffee.height(scaleByNeg),foamedMilk.height(scaleBy))},1)),drinks.capuccino.poured&&displaySuggestion(foamedMilk,"Try tapping instead"))}),foamedMilkPour.on("pressup",function(e){counter=0,clearInterval(pouring),2===showLiquid?(drinks.cortado.poured&&foamedMilk.height(origLiquidHeight.foamedMilk),drinks.dryCapuccino.poured&&foamedMilk.removeClass("no-drinks"),drinks.flatWhite.poured):3===showLiquid&&(drinks.latte.poured&&foamedMilk.height(origLiquidHeight.foamedMilk),drinks.doubleLatte.poured&&foamedMilk.height(origLiquidHeight.foamedMilk),drinks.capuccino.poured&&foamedMilk.removeClass("no-drinks"))}),foamedMilkPour.on("tap",function(e){counter=0,clearInterval(pouring),2===showLiquid&&(drinks.cortado.poured||drinks.dryCapuccino.poured)&&(foamedMilk.removeClass("half").css({height:""}).addClass("not-poured"),steamedMilk.removeClass("not-poured").addClass("double"),currentDrink("flatWhite"),e.stopPropagation())}),steamedMilkPour.on("press",function(e){2===showLiquid?drinks.flatWhite.poured&&displaySuggestion(steamedMilk,"Try tapping instead"):3===showLiquid&&displaySuggestion(steamedMilk,"Try tapping instead")}),steamedMilkPour.on("pressup",function(e){counter=0,clearInterval(pouring),2===showLiquid?drinks.flatWhite.poured&&steamedMilk.removeClass("no-drinks"):3===showLiquid&&steamedMilk.removeClass("no-drinks")}),steamedMilkPour.on("tap",function(e){counter=0,clearInterval(pouring),2===showLiquid&&drinks.flatWhite.poured&&(steamedMilk.removeClass("double").addClass("not-poured"),foamedMilk.removeClass("not-poured").addClass("half"),currentDrink("cortado"),e.stopPropagation())}),glassFill.on("tap",function(e){showLiquid++,coffee.css({height:""}),foamedMilk.css({height:""}),steamedMilk.css({height:""}),scaleBy=0,suggestion.html("").hide().removeClass("flip-in-x"),2===showLiquid?(foamedMilk.removeClass("not-poured").addClass("half"),currentDrink("cortado")):3===showLiquid?(steamedMilk.removeClass("not-poured").removeClass("double"),foamedMilk.removeClass("half").css({height:""}).addClass("drop"),currentDrink("latte")):(foamedMilk.addClass("not-poured").removeClass("drop"),steamedMilk.addClass("not-poured"),showLiquid=1,currentDrink("espresso"))})});