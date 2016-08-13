/*global $, jQuery, alert*/
/*jslint node: true */
"use strict";

var aantal = 0;



function hanoi(schf) {
    var data = {
        sch: [],
        torens: []
    },
        aantal = schf,
        maxSchijf = 10,
        minSchijf = 3,
        i = 0,
        x = 0,
        kleuren = ["#00CC99", "#FF9933", "#CC0066", "#006699", "#993300", "#FFFF66", "#FF3300", "#0F3DFF"],
        palen = 'div[data-post]',
        gekozen = null,
        schijfData,
        targetData,
        paalnr,
        aantalschijven,
        zetten = 0,
        minimumzetten = 0,
        verschil = 0,
        overblijvend = 0;
    
    


    $("#terug").click(function () {
        window.location = "index.html";
    });

    
    function vraagSchijf() {
        var getal = window.prompt("gelieve een aantal schijven te kiezen tussen " + minSchijf + " en " + maxSchijf + " schijven.", minSchijf);
        if (getal > maxSchijf || getal < minSchijf || ((getal % 1) != 0)) {
            alert("gekozen getal is niet correct!");
            vraagSchijf();

        } else {
            aantal = getal;
            minimumzetten = Math.pow(2, aantal) - 1;
            
        }


    }
    
    
    function zet() {
        console.log(zetten);
        $("#aantal").text(zetten);
        overblijvend = minimumzetten - zetten;
        if (overblijvend >= 0) {
            $("#min").text("Blijft over:");
            $("#verschil").text(overblijvend);
            
        }
            else { 
                $("#min").text("Minimum overschreden").css("color", "red");
                $("#verschil").text("");
            
    
        }
        
        return zetten;
        
    }

    function checkWin(aan) {
        if (aan == aantal) {
            verschil = zetten - minimumzetten;
            if (verschil == 0) {
                alert("proficiat, u heeft deze puzzel op de meest optimale manier opgelost in " + zetten + " aantal zetten.");
            } else {
                alert("goed zo, u heeft deze puzzel kunnen oplossen! Maar u had " + verschil + " zetten meer nodig dan het minimum van " + minimumzetten + ".");
            }
            window.location = "index.html";

        }
    }


    function maakSchijven() {

        for (x; x < aantal; x++) {
            var breedte = 100 - x * (100 / aantal),
                hoogte = (40 / aantal) + 'vh';
            $("#block").height(hoogte);
            data.sch.
                push(
                    $('<div class="sc" id=' + x + ' data-schijf=' + breedte + '></div>').width(breedte + '%').height(hoogte).css('background', kleuren[x % kleuren.length]).appendTo("#s")
                );

        }

    }
    $(palen).click(function () {


        if (gekozen === null) {

            if ($(this).children().length > 0) {
                gekozen = $(this).children('div[data-schijf]').last().
                    detach().
                    appendTo($("#block"));
                zetten++;
                zet();
            } else {
                alert("kies een andere toren");
            }



        } else {
            schijfData = $(gekozen).data('schijf');

            targetData = $(this).children().last().data('schijf');

            if (schijfData < targetData || targetData === undefined) {
                $(this).append(gekozen);

                paalnr = $(this).data('post');

                aantalschijven = $(this).children().length;


                gekozen = null;
                if (paalnr == 3) {
                    setTimeout(function () {
                        checkWin(aantalschijven);
                    }, 200);


                }



            } else {
                alert("geen grotere schijf op een kleinere schijf plaatsen");
            }


        }
    });

    vraagSchijf();
    maakSchijven();

    $(palen).hover(
        function () {
            $(this).addClass('hoverPost');
        },
        function () {
            $(this).removeClass('hoverPost');
        }
    );
    $(document).on("navigate", function(event, data) {
    var direction = data.state.direction;
    if(direction == 'back') {
        alert("back");
    }
    else {
        alert("werkt niet");
    }
});
    


}
$(document).ready(function () {
    $("#go").delay(1000).animate({ opacity: 1 }, 700);
    

});

$(document).bind('beforeunload',function(){
   alert("werkt")
});

$('#start').on("click", function () {
    hanoi(aantal);


});


