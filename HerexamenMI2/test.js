/*global $, jQuery, alert*/
/*jslint node: true */
"use strict";

var aantal = 0;


//functie hanoi
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
        palen = 'div[data-post]', //alle elementen met data-attribuut selecteren en als paal gebruiken
        gekozen = null, //Bij het opstarten wordt er geen toren gekozen
        schijfData,
        targetData,
        paalnr,
        aantalschijven,
        //alle tellers op 0 zetten
        zetten = 0,
        minimumzetten = 0,
        verschil = 0,
        overblijvend = 0;
    
    

    //de gebruiker word terug naar de landing page gestuurd wanneer hij op de "back" knop drukt
    $("#terug").click(function () {
        window.location = "index.html";
    });

    
    function vraagSchijf() {
        //De gebruiker prompten voor de hoeveelheid schijven hij/zij wilt spelen
        var getal = window.prompt("gelieve een aantal schijven te kiezen tussen " + minSchijf + " en " + maxSchijf + " schijven.", minSchijf);
        if (getal > maxSchijf || getal < minSchijf || ((getal % 1) != 0)) {
            //kijken of input wel een rond getal is, en geen kommagetal of letter
            alert("gekozen getal is niet correct!");
            vraagSchijf();

        } else {
            //als het getal aanvaard wordt, deze opslaan
            aantal = getal;
            minimumzetten = Math.pow(2, aantal) - 1; //geeft het aantal "optimale" zetten weer, gelijk aan 2^n-1 met n het aantal schijven
            
        }


    }
    
    
    function zet() {
        //houdt het aantal zetten bij
        //een zet is wanneer een blok aangeklikt wordt, en verplaatst wordt naar zijn nieuwe toren
        $("#aantal").text(zetten);
        overblijvend = minimumzetten - zetten;
        if (overblijvend >= 0) {
            $("#min").text("Blijft over:");
            $("#verschil").text(overblijvend);
            
        }
            else {
                //als het optimale aantal zetten overschreden is, wordt deze vervangen door "minimum overschreden"
                $("#min").text("Minimum overschreden").css("color", "red");
                $("#verschil").text("");
            
    
        }
        
        return zetten;
        
    }

    function checkWin(aan) {
        //checkt of de puzzel opgelost is
        if (aan == aantal) {
            verschil = zetten - minimumzetten;
            //op een optimale manier opgelost
            if (verschil == 0) {
                alert("proficiat, u heeft deze puzzel op de meest optimale manier opgelost in " + zetten + " aantal zetten.");
            } else {
                //niet optimaal opgelost
                alert("goed zo, u heeft deze puzzel kunnen oplossen! Maar u had " + verschil + " zetten meer nodig dan het minimum van " + minimumzetten + ".");
            }
            //wanneer de puzzel opgelost is, wordt de gebruiker terug naar de hoofpagina gestuurd
            window.location = "index.html";

        }
    }


    function maakSchijven() {
        //maakt de schijven aan, en steekt deze op de eerste toren

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
        //functie om schijf te kiezen en te verplaatsen
        if (gekozen === null) {
            //de gebruiker nog geen toren/blok heeft aangeklikt
    
            if ($(this).children().length > 0) {
                //zien of de gebruiker geen lege toren heeft aangeklikt
                //door op een toren met schijven te klikken, zorgt de detach() dat het het hoogste element met 
                //data-attribuut "schijf' op de gekozen toren losmaakt, en deze verplaatst naar de div "block"
              
                //neemt de hoogste schijf op de gekozen toren
                gekozen = $(this).children('div[data-schijf]').last().
                    detach().
                    appendTo($("#block")); //div waar gekozen blok zichtbaar blijft
                zetten++;
                zet();
            } else {
                //alert als de gebruiker een lege toren aanklikt
                alert("kies een andere toren");
            }

        //elke schijf heeft een data-attribuut "schijf" meegekregen. Deze is enig aan de schijf
        //Een grote schijf zal een grotere data-attribuut "schijf" krijgen dan een kleinere schijf

        } else {
            //als er wel een (niet-lege) toren is aangeklikt, en blok is losgemaakt
            //blok wordt opgeslagen in "schijfData", meer bepaald het data-attribuut "schijf" van de gekozen schijf
            schijfData = $(gekozen).data('schijf');
            
            //slaat de waarde van het data-attribuut "schijf" op
            targetData = $(this).children().last().data('schijf');
            
            
            if (schijfData < targetData || targetData === undefined) {
                //nagaan of de gebruiker een grotere schijf op een kleinere wilt verplaatsen
                
                //de schijf verplaatsen naar de aangeklikte toren
                $(this).append(gekozen);
                
                paalnr = $(this).data('post'); //slaat het data-attribuut op van de aangeklikte toren

                aantalschijven = $(this).children().length; //test om te zien of de schijf verplaatst is


                gekozen = null; //variabele gekozen weer leeg maken, zodat de gebruiker een volgende schijf kan verplaatsen
                if (paalnr == 3) {
                    //elke keer toren 3 aangeklikt wordt om schijf naar te verplaatsen, checkwin()
                    setTimeout(function () {
                        //timeout nodig omdat alert "u heeft gewonnen" kwam voor dat de laatste schijf verplaatst was naar de laatste
                        //toren
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
    // $(document).on("navigate", function(event, data) {
    // var direction = data.state.direction;
    // if(direction == 'back') {
    //     alert("back");
    // }
    // else {
    //     alert("werkt niet");
    // }
// });
    


// }
$(document).ready(function () {
    //laat de tekst "spelen" op landing page verschijnen, zorgt voor duidelijkheid
    $("#go").delay(1000).animate({ opacity: 1 }, 700);
});

//hoofdfunctie
$('#start').on("click", function () {
    hanoi(aantal);


});


