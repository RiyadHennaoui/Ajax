function addTable(obj) {
    var titres = obj.titles;
    $("body").append('<table id="maTable"><thead><tr></tr></thead><tbody></tbody><tfoot><tr></tr></tfoot></table>');
    for (var i = 0; i < titres.length; i++) {
        $("#maTable thead tr").append("<th></th>");
        $("#maTable thead tr th").eq(i).html(titres[i].title).css(titres[i].css);
        $("#maTable tfoot tr").append("<td></td>");
    }

    for (var row = 0; row < obj.items.length; row++) {
        $("#maTable tbody").append("<tr></tr>");
        for (var col = 0; col < titres.length; col++) {
            var temp = Object.values(obj.items[row])[col];
            if (temp)
                $("#maTable tbody tr:last-of-type").append("<td>" + temp + "</td>");
            else
                $("#maTable tbody tr:last-of-type").append("<td></td>");

        }
    }







}


function myAjax() {

    $.ajax({
        url: 'premierAjax.php',
        type: 'POST',
        dataType: 'json',
        async: true,
        data: '',
        success: function (result) {
            ajaxSuccess(result);
        },
        error: function (result) {
            ajaxError(result);

        },
        complete: function (result) {
            // faire qq chose quand c'est fini 
            console.log('fini');
        }

    });
}

function ajaxSuccess(o) {
    console.log(o);
    obj = o;
}

function ajaxError(o) {
    alert('error');
    console.log(o);
}

function calculer() {

    var total = 0;
    $("#maTable tbody tr").each(function () {
        var prixU = parseFloat($(this).children("td:nth-of-type(2)").text());
        var qte = parseFloat($(this).children("td:nth-of-type(3)").text());
        var tauxTva = parseFloat($(this).children("td:nth-of-type(4)").text());
        var totalHt = prixU * qte;
        var tva = totalHt * tauxTva;
        var ttc = totalHt + tva;
        $(this).children("td:nth-of-type(5)").text(totalHt.toFixed(2));
        $(this).children("td:nth-of-type(6)").text(tva.toFixed(2));
        $(this).children("td:nth-of-type(7)").text(ttc.toFixed(2));
        console.log(totalHt);
        total += ttc;

    });
    $("tfoot tr td:last-of-type").text(total.toFixed(2));

}

function modifQte() {
    console.log("ici");
    var qte;
    $("#maTable tbody td:nth-of-type(3)").each(function () {

        var content = $(this).html();
        console.log($(this).html());
        content = '<button class="dec"> - </button><span>' + content + '</span><button class="inc"> + </button>';
        console.log($(this).html(content));

    });

    $("button.inc").click(function(){
        $(this).prev().prev().prop("disabled", false);
        qte = parseInt($(this).prev().text());
        qte += 1; 
        console.log("++++", qte);
        $(this).prev().text(qte);
        miseAJourPrix($(this), qte); 
    });
    
    $("button.dec").click(function () {
        
        qte = $(this).next().text();
        qte -= 1;
        $(this).next().text(qte);
        if (qte === 0) $(this).prop("disabled", true);
        miseAJourPrix($(this), qte); 
    });

    

}

function miseAJourPrix(element, qte){

    var prixU = parseFloat(element.parent().prev().text());
    var tauxTva = parseFloat(element.parent().next().text());
    var totalHt = prixU * qte;
    var tva = totalHt * tauxTva; 
    var ttc = totalHt + tva;
    var grandTotal = 0; 
    element.parent().next().next().html(totalHt.toFixed(2));
    element.parent().next().next().next().html(tva.toFixed(2));
    element.parent().next().next().next().next().html(ttc.toFixed(2));
    $("tbody td:last-of-type").each(function(){
        var derniereCellule = parseFloat($(this).text());
        if(!isNaN($(this).text())){
            console.log("nan", derniereCellule);
            grandTotal += derniereCellule;
            console.log("nanTot", grandTotal);

        }
    });
    $("tfoot tr td:last-of-type").html(grandTotal.toFixed(2));
    
    

}