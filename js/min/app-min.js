function currentDrink(e){for(var i in drinks)drinks.hasOwnProperty(i)&&(i===e?(drinks[i].poured=!0,drink.hide().html("").addClass("flip-in-x").removeClass("clicked").html(drinks[i].name).show(),setTimeout(function(){drink.removeClass("flip-in-x")},500)):drinks[i].poured=!1)}function displaySuggestion(e,i){e?e.addClass("no-drinks"):console.log("nothing!"),suggestion.addClass("flip-in-x").html(i).show(),setTimeout(function(){suggestion.addClass("flip-out-x").removeClass("flip-in-x"),setTimeout(function(){suggestion.hide().removeClass("flip-out-x").html("")},400)},1750)}function pourCoffee(e,i){scaleBy=coffee.height(),coffee.height(scaleBy+30),"tripleEspresso"===e?coffee.height()<i/2?(currentDrink("doubleEspresso"),pouring=requestAnimationFrame(function(){pourCoffee(e,i)})):coffee.height()>i/2&&coffee.height()<i?pouring=requestAnimationFrame(function(){pourCoffee(e,i)}):currentDrink(e):"doubleLatte"===e&&(i>scaleBy?pouring=requestAnimationFrame(function(){pourCoffee(e,i)}):currentDrink(e))}function pourFoamedMilk(e,i){scaleBy=foamedMilk.height(),foamedMilk.height(scaleBy+30),i>scaleBy?pouring=requestAnimationFrame(function(){pourFoamedMilk(e,i)}):currentDrink(e)}function brewCoffee(e){scaleBy=coffee.height(),coffee.height(scaleBy-30),scaleBy>e?pouringNeg=requestAnimationFrame(function(){brewCoffee(e)}):cancelAnimationFrame(pouringNeg)}function brewSteamedMilk(e){scaleBy=steamedMilk.height(),steamedMilk.height(scaleBy-30),scaleBy>e?pouringNeg=requestAnimationFrame(function(){brewSteamedMilk(e)}):cancelAnimationFrame(pouringNeg)}function brewFoamedMilk(e){scaleBy=foamedMilk.height(),foamedMilk.height(scaleBy-30),scaleBy>e?pouringNeg=requestAnimationFrame(function(){brewFoamedMilk(e)}):cancelAnimationFrame(pouringNeg)}var pouring,pouringNeg,scaleBy,liquidHeight={coffee:"",steamedMilk:"",foamedMilk:""},origLiquidHeight={coffee:"",steamedMilk:"",foamedMilk:""},showLiquid=1,coffee=$("#coffee"),coffeePour=propagating(new Hammer($("#coffee")[0])),steamedMilk=$("#steamed-milk"),steamedMilkPour=propagating(new Hammer($("#steamed-milk")[0])),foamedMilk=$("#foamed-milk"),foamedMilkPour=propagating(new Hammer($("#foamed-milk")[0])),glass=$("#container"),glassFill=propagating(new Hammer($("#container")[0])),drink=$("#drink"),suggestion=$("#suggestion"),circle=$("#circle"),drinks={espresso:{poured:!1,name:"espresso",coffeq:1,smilkq:0,fmilkq:0},doubleEspresso:{poured:!1,name:"double espresso",coffeq:2,smilkq:0,fmilkq:0},tripleEspresso:{poured:!1,name:"triple espresso",coffeq:3,smilkq:0,fmilkq:0},cortado:{poured:!1,name:"cortado",coffeq:1,smilkq:0,fmilkq:.5},flatWhite:{poured:!1,name:"flat white",coffeq:1,smilkq:2,fmilkq:0},dryCapuccino:{poured:!1,name:"dry capuccino",coffeq:1,smilkq:0,fmilkq:2},latte:{poured:!1,name:"latte",coffeq:1,smilkq:2,fmilkq:.25},doubleLatte:{poured:!1,name:"double latte",coffeq:2,smilkq:2,fmilkq:.25},capuccino:{poured:!1,name:"capuccino",coffeq:1,smilkq:1,fmilkq:1}};$(document).ready(function(){setTimeout(function(){coffee.removeClass("first-pour not-poured")},300),setTimeout(function(){currentDrink("espresso"),displaySuggestion(!1,"Press to pour more, tap to add milk or brew")},750),coffeePour.on("press",function(e){liquidHeight.coffee=Math.floor(coffee.height()),origLiquidHeight.coffee=liquidHeight.coffee,1===showLiquid?drinks.tripleEspresso.poured?displaySuggestion(coffee,"Tap here to pour or below to change drinks"):pouring=drinks.doubleEspresso.poured?pourCoffee("tripleEspresso",origLiquidHeight.coffee/2*drinks.tripleEspresso.coffeq):pourCoffee("tripleEspresso",origLiquidHeight.coffee*drinks.tripleEspresso.coffeq):2===showLiquid?displaySuggestion(coffee,"Tap here to pour or below to change drinks"):3===showLiquid&&(drinks.latte.poured&&(pouring=pourCoffee("doubleLatte",origLiquidHeight.coffee*drinks.doubleLatte.coffeq)),drinks.doubleLatte.poured&&displaySuggestion(coffee,"Tap here to pour or below to change drinks"),drinks.capuccino.poured&&displaySuggestion(coffee,"Tap here to pour or below to change drinks"))}),coffeePour.on("pressup",function(e){1===showLiquid?(drinks.espresso.poured&&(cancelAnimationFrame(pouring),coffee.height(origLiquidHeight.coffee)),drinks.doubleEspresso.poured?(cancelAnimationFrame(pouring),coffee.height(2*origLiquidHeight.coffee)):drinks.tripleEspresso.poured&&coffee.removeClass("no-drinks")):2===showLiquid?coffee.removeClass("no-drinks"):3===showLiquid&&(drinks.latte.poured&&(cancelAnimationFrame(pouring),coffee.height(origLiquidHeight.coffee)),(drinks.doubleLatte.poured||drinks.capuccino.poured)&&coffee.removeClass("no-drinks"))}),foamedMilkPour.on("press",function(e){liquidHeight.foamedMilk=Math.floor(foamedMilk.height()),liquidHeight.coffee=Math.floor(coffee.height()),2===showLiquid?(drinks.cortado.poured&&(origLiquidHeight.foamedMilk=liquidHeight.foamedMilk,origLiquidHeight.coffee=liquidHeight.coffee,pouring=pourFoamedMilk("dryCapuccino",origLiquidHeight.coffee*drinks.dryCapuccino.fmilkq)),drinks.dryCapuccino.poured&&displaySuggestion(foamedMilk,"Tap here to pour or below to change drinks")):3===showLiquid&&(drinks.latte.poured&&(origLiquidHeight.foamedMilk=liquidHeight.foamedMilk,origLiquidHeight.coffee=liquidHeight.coffee,pouring=pourFoamedMilk("capuccino",origLiquidHeight.coffee*drinks.capuccino.fmilkq)),drinks.doubleLatte.poured&&(origLiquidHeight.foamedMilk=liquidHeight.foamedMilk,origLiquidHeight.coffee=liquidHeight.coffee,pouring=pourFoamedMilk("capuccino",origLiquidHeight.coffee/2*drinks.capuccino.fmilkq),pouringNeg=brewCoffee(origLiquidHeight.coffee/2)),drinks.capuccino.poured&&displaySuggestion(foamedMilk,"Tap here to pour or below to change drinks"))}),foamedMilkPour.on("pressup",function(e){2===showLiquid?(drinks.cortado.poured&&(cancelAnimationFrame(pouring),foamedMilk.height(origLiquidHeight.foamedMilk)),drinks.dryCapuccino.poured&&foamedMilk.removeClass("no-drinks")):3===showLiquid&&(drinks.latte.poured&&(cancelAnimationFrame(pouring),foamedMilk.height(origLiquidHeight.foamedMilk)),drinks.doubleLatte.poured&&(cancelAnimationFrame(pouring),cancelAnimationFrame(pouringNeg),foamedMilk.height(origLiquidHeight.foamedMilk),coffee.height(origLiquidHeight.coffee)),drinks.capuccino.poured&&foamedMilk.removeClass("no-drinks"))}),foamedMilkPour.on("tap",function(e){2===showLiquid&&(drinks.cortado.poured||drinks.dryCapuccino.poured)&&(foamedMilk.removeClass("half").css({height:""}).addClass("not-poured"),steamedMilk.removeClass("not-poured").addClass("double reverse"),currentDrink("flatWhite"),e.stopPropagation())}),steamedMilkPour.on("press",function(e){2===showLiquid?drinks.flatWhite.poured&&displaySuggestion(steamedMilk,"Tap here to pour or below to change drinks"):3===showLiquid&&displaySuggestion(steamedMilk,"Tap here to pour or below to change drinks")}),steamedMilkPour.on("pressup",function(e){2===showLiquid?drinks.flatWhite.poured&&steamedMilk.removeClass("no-drinks"):3===showLiquid&&steamedMilk.removeClass("no-drinks")}),steamedMilkPour.on("tap",function(e){2===showLiquid&&drinks.flatWhite.poured&&(steamedMilk.removeClass("double reverse").addClass("not-poured"),foamedMilk.removeClass("not-poured").addClass("half"),currentDrink("cortado"),e.stopPropagation())}),glassFill.on("tap",function(e){showLiquid++,coffee.css({height:""}),foamedMilk.css({height:""}),steamedMilk.css({height:""}),scaleBy=0,suggestion.html("").hide().removeClass("flip-in-x"),2===showLiquid?(foamedMilk.removeClass("not-poured").addClass("half"),currentDrink("cortado")):3===showLiquid?(steamedMilk.removeClass("not-poured").removeClass("double"),foamedMilk.removeClass("half").css({height:""}).addClass("drop"),currentDrink("latte")):(foamedMilk.addClass("not-poured").removeClass("drop"),steamedMilk.addClass("not-poured"),showLiquid=1,currentDrink("espresso"))}),drink.on("click",function(e){$(this).hasClass("clicked")||(circle.css({left:e.pageX-15,top:e.pageY-15}).addClass("ripple"),$(this).addClass("clicked"),brewCoffee(0),steamedMilk.hasClass("not-poured")||brewSteamedMilk(0),foamedMilk.hasClass("not-poured")||brewFoamedMilk(0),setTimeout(function(){circle.removeClass("ripple"),showLiquid=1,setTimeout(function(){coffee.css({height:""}).removeClass("not-poured"),steamedMilk.css({height:""}).removeClass("drop half double reverse").addClass("not-poured"),foamedMilk.css({height:""}).removeClass("drop half double reverse").addClass("not-poured"),drink.removeClass("clicked"),currentDrink("espresso")},500)},500)),e.stopPropagation()})});