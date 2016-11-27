$(document).ready(function () {

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

    // display barCode
    if ($('#barcode').length) {
        JsBarcode("#barcode", token, {
            height: 70,
            displayValue: false
        });
    }

    // Refresh data by making regular API Calls for VO. V1 will be using socket.io
    function refresh() {
        var initialAmount = $("#amount").html();
        $.get("http://146.185.143.127/api/customers/" + token, function (results) {
            $("#full-name").html(results.first_name + ' ' + results.last_name);
            $("#amount").html(results.amount);
            $('#list-link').attr('href', '/list.html?token=' + results.token);

            // display flash message
            if (initialAmount !== '0' && initialAmount != results.amount) {
                $("#notification").slideDown("slow", function () {
                    $(function () {
                        setTimeout(function () {
                            $("#notification").slideUp("slow", function () {
                            });
                        }, 2000);
                    });
                });
            }
        });
    }

    refresh();
    setInterval(function () {
        refresh();
    }, 3000);

    // accordion
    $('#myCollapsible').collapse({
        toggle: true
    });


    $('#back-link').click(function () {
        console.log('lhljs');
        window.location.href = '/?token=' + token;
    });
});


// toutes les 5 secondes, faire requete GET
// si succès, vérifier amount
// si amount récupéré != amount affiché (récup dans le DOM)
// on fait apparaitre un élément dans le DOM