var li = firebase.database().ref('Achievment');
var pr = document.getElementById("spin");

li.orderByChild("dp").once("value", function(gets) {
    if (gets.exists()) {
        var resHtml = "";

        gets.forEach(function(get) {

            resHtml += "<tr>"
            resHtml += "<td>"
            resHtml += get.val().name;
            resHtml += "</td>"
            resHtml += "<td>"
            resHtml += "<img src='"
            resHtml += get.val().image;
            resHtml += "' id='image'  width='50px' height='50px' style='border-radius:50%;margin-top:10px'/>"
            resHtml += "</td>"
            resHtml += "<td>"
            resHtml += get.val().dp;
            resHtml += "</td>"
            resHtml += "</tr>"

        })

        $("#train-res").html(resHtml);
    } else {
        $("spinner").removeClass("spinner-grow");
        pr.style.display = "none";
    }
});


var list = firebase.database().ref("LeaderboardWinners/");
list.on("value", function(gets) {
    if (gets.exists()) {
        var resHtml = "";

        gets.forEach(function(get) {
            var x = get.key;

            var db = firebase.database().ref("Users/" + x + "/");



            resHtml += "<tr>"
            resHtml += "<td>"
            resHtml += get.val().name;
            resHtml += "</td>"
            db.on("value", function(getu) {
                resHtml += "<td>"
                resHtml += getu.val().email;
                resHtml += "</td>"
            })
            resHtml += "<td>"
            resHtml += get.val().address;
            resHtml += "</td>"
            resHtml += "<td>"
            resHtml += get.val().pinroom;
            resHtml += "</td>"
            resHtml += "</tr>"

        })
        $("#winner-res").html(resHtml);
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";
    } else {
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";
    }
})

$("#train-export").click(function() {
    $("#export-train").table2excel({
        filename: "Leaderboard.xls"
    });
})

$("#winner-export").click(function() {
    $("#export-winner").table2excel({
        filename: "Winner.xls"
    });
})