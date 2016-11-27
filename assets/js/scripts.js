$( document ).ready(function() {

    // helper to get URL parameters
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var token = getUrlParameter('token');

    JsBarcode("#barcode", token, {
        // width:252,
        height:70,
        displayValue: false
    });

    // $.get( "http://146.185.143.127", function( data ) {
    //     $( ".result" ).html( data );
    //     alert( "Load was performed." );
    // });


});


// toutes les 5 secondes, faire requete GET
// si succès, vérifier amount
// si amount récupéré != amount affiché (récup dans le DOM)
// on fait apparaitre un élément dans le DOM