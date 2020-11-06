var pr = document.getElementById("spin");
pr.style.display = "block";
$("#compete-upload").click(function() {

    var validFormat = ["image/jpeg", "image/png", "image/jpg"];

    $("#compete-name").removeClass("is-invalid");
    $("#compete-info").removeClass("is-invalid");
    $("#compete-des").removeClass("is-invalid");
    $("#compete-file").removeClass("is-invalid");
    $("#compete-date").removeClass("is-invalid");


    var title = $("#compete-name").val();
    var file = $("#compete-file").prop("files")[0];
    var info = $("#compete-info").val();
    var date = $("#compete-date").val();
    var des = $("#compete-des").val();

    if (!title) {
        $("#compete-name").addClass("is-invalid");
        return;
    }
    if (!info) {
        $("#compete-info").addClass("is-invalid");
        return;
    }
    if (file == null) {
        $("#compete-file").addClass("is-invalid");
        return;
    }
    if ($.inArray(file["type"], validFormat) < 0) {
        $("#compete-file").addClass("is-invalid");
        return;
    }
    if (!des) {
        $("#compete-des").addClass("is-invalid");
        return;
    }
    if (!date) {
        $("#compete-date").addClass("is-invalid");
        return;
    }
    pr.style.display = "block";
    $("#spinner").addClass("spinner-grow");

    var datee = new Date(date);
    var month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "November",
        "December"
    ];

    var mon = datee.getMonth();

    function dete() {
        var days = datee.getDate();
        return days < 10 ? '0' + days : '' + days;
    }

    var year = datee.getFullYear();
    varaDate = dete() + " " + month[mon] + " " + year;
    console.log(varaDate);




    var database = firebase.database().ref("Competitions/");

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);

    var posterName = new Date().getTime();

    var storage = firebase.storage().ref("Competitions" + "/" + posterName + extension);
    var uploadTask = storage.put(file);

    uploadTask.on("state_changed",
        function progress(snapshot) {

            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#compete-progress").html(percentage + "%");
            $("#compete-progress").attr("style", "width:" + percentage + "%");


        },
        function error(err) {

        },

        function complete() {

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                var competeData = {
                    "date": varaDate,
                    "description": des,
                    "shortdes": info,
                    "pic": downloadURL,
                    "title": title
                };

                database.push().set(competeData, function(err) {
                    if (err) {
                        $("#result-compete").attr("class", "alert alert-danger");
                        $("#result-compete").html(err.message);

                    } else {
                        $("#result-compete").attr("class", "alert alert-success");
                        $("#result-compete").html("Competition Posted Successfully");


                    }

                    $("#spinner").removeClass("spinner-grow");
                    pr.style.display = "none";

                    $("#compete")[0].reset();
                    $("#compete-progress").html("Completed ");
                })

            });
        });
})

var li = firebase.database().ref("Forms/Competition/");

li.on("value", function(eva) {
    if (eva.exists()) {
        var resOption = "";

        eva.forEach(function(get) {
            var competeKey = get.key;
            resOption += "<option>";
            resOption += competeKey;
            resOption += "</option>"
        })
        $("#res-text").html(resOption);
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";

    }
})

$("#res-text").addClass("is-invalid");
var value = document.getElementById("res-text");
var compete = "";

value.addEventListener("input", function() {
    compete = this.value;
    pr.style.display = "block";
    $("#spinner").addClass("spinner-grow");
    $("#compete-res").html("");
    $("#res-text").removeClass("is-invalid");
    var dres = firebase.database().ref("Forms/Competition/" + compete + "/");

    if (!compete) {
        $("#res-text").addClass("is-invalid");
        $("#compete-res").html("");
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";
        return;
    } else {
        dres.on("value", function(gets) {
            if (gets.exists()) {
                var resHtml = "";
                gets.forEach(function(data) {
                    data.forEach(function(re) {
                        resHtml += "<tr>";
                        resHtml += "<td>";
                        resHtml += re.val().name_;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().mobile_;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().email_;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().date_;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().college_;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().course_;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().year_;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().branch_;
                        resHtml += "</td>";
                        resHtml += "<td>";
                        resHtml += re.val().code_;
                        resHtml += "</td>";
                        resHtml += "</tr>";
                    })
                    $("#compete-res").html(resHtml);
                    $("#spinner").removeClass("spinner-grow");
                    pr.style.display = "none";

                })
            } else {
                $("#compete-res").html("");
                $("#spinner").removeClass("spinner-grow");
                pr.style.display = "none";
            }
        })

    }

})

compete = $("#res-text").val();

var dres = firebase.database().ref("Forms/Competition/" + compete + "/");
console.log(compete)

dres.on("value", function(gets) {
    if (gets.exists()) {
        var resHtml = "";
        $("#res-text").removeClass("is-invalid");
        gets.forEach(function(data) {
            data.forEach(function(re) {
                resHtml += "<tr>";
                resHtml += "<td>";
                resHtml += re.val().name_;
                resHtml += "</td>";
                resHtml += "<td>";
                resHtml += re.val().mobile_;
                resHtml += "</td>";
                resHtml += "<td>";
                resHtml += re.val().email_;
                resHtml += "</td>";
                resHtml += "<td>";
                resHtml += re.val().date_;
                resHtml += "</td>";
                resHtml += "<td>";
                resHtml += re.val().college_;
                resHtml += "</td>";
                resHtml += "<td>";
                resHtml += re.val().course_;
                resHtml += "</td>";
                resHtml += "<td>";
                resHtml += re.val().year_;
                resHtml += "</td>";
                resHtml += "<td>";
                resHtml += re.val().branch_;
                resHtml += "</td>";
                resHtml += "<td>";
                resHtml += re.val().code_;
                resHtml += "</td>";
                resHtml += "</tr>";
            })
            $("#compete-res").html(resHtml);
            $("#spinner").removeClass("spinner-grow");
            pr.style.display = "none";

        })
    } else {
        $("#compete-res").html("");
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";
    }
})
$("#train-export").click(function() {
    $("#export-train").table2excel({
        filename: compete + ".xls"
    });
})