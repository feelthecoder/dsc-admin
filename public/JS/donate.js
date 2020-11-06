var li = firebase.database().ref("Donation/");
var pr = document.getElementById("spin");
pr.style.display = "block";
li.on("value", function(tra) {
    if (tra.exists()) {

        var resOption = "";

        var perOption = "";

        tra.forEach(function(get) {
            var user = get.key;



            var use = firebase.database().ref("Users/" + user + "/");
            use.on("value", function(gets) {
                var name = gets.val().displayName;
                var email = gets.val().email;
                var trainKey = use.key;
                resOption += "<option value='";
                resOption += trainKey;
                resOption += "'>";
                resOption += name;
                perOption += "</option>";
                perOption += "<option value='";
                perOption += email;
                perOption += "'>";
                perOption += name;
                perOption += "</option>";
                $("#email").val(email);

            })
        })
        $("#re-text").html(resOption);
        $("#res-text").html(perOption);
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";

    }
})

$("#re-text").addClass("is-invalid");
var value = document.getElementById("re-text");
var uid = "";

value.addEventListener("input", function() {
    uid = this.value;
    $("#train-res").html("");
    pr.style.display = "block";
    $("#spinner").addClass("spinner-grow");
    $("#re-text").removeClass("is-invalid");
    var dres = firebase.database().ref("Donation" + uid + "/");

    if (!uid) {
        $("#train-res").html("");
        $("#re-text").addClass("is-invalid");
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";
        return;
    } else {
        dres.on("value", function(gets) {
            if (gets.exists()) {
                var resHtml = "";
                gets.forEach(function(data) {
                    data.forEach(function(re) {
                        var check = re.val().mail_sent;

                        var str = "";
                        if (check == 0)
                            str += "Pending";
                        else
                            str += "Delivered";
                        resHtml += "<tr>";
                        resHtml += "<td>";
                        resHtml += re.val().payment;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().date;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().approval;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().rID;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().tID;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += str;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().status;
                        resHtml += "</td>";
                        resHtml += "</tr>";
                    })
                    $("#train-res").html(resHtml);
                    $("#spinner").removeClass("spinner-grow");
                    pr.style.display = "none";

                })

            } else {
                $("#train-res").html("");
                $("#spinner").removeClass("spinner-grow");
                pr.style.display = "none";
            }
        })

    }

})



var sel = document.getElementById('re-text');
uid = sel.value;
var dres = firebase.database().ref("Donation/" + uid + "/");
dres.on("value", function(gets) {
    if (gets.exists()) {
        var resHtml = "";
        $("#re-text").removeClass("is-invalid");
        gets.forEach(function(re) {
            var check = re.val().mail_sent;
            console.log(check);
            var str = "";
            if (check == 0)
                str += "Pending";
            else
                str += "Delivered";
            resHtml += "<tr>";
            resHtml += "<td> ₹ ";
            resHtml += re.val().payment;
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += re.val().date;
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += re.val().approval;
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += re.val().rID;
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += re.val().tID;
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += str;
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += re.val().status;
            resHtml += "</td>";
            resHtml += "</tr>";
        })
        $("#train-res").html(resHtml);
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";

    } else {
        $("#train-res").html("");
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";
    }
})

var sele = document.getElementById('res-text');
var email = "";


sele.addEventListener("input", function() {
    email = this.value;

    $("#email").val(email);

});






$("#train-export").click(function() {
    $("#export-train").table2excel({
        filename: uid + " (PersonID) .xls"
    });
})