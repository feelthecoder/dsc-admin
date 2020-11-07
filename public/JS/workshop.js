var pr = document.getElementById("spin");
$("#work-upload").click(function() {

    var validFormat = ["image/jpeg", "image/png", "image/jpg"];

    $("#work-name").removeClass("is-invalid");
    $("#work-info").removeClass("is-invalid");
    $("#work-des").removeClass("is-invalid");
    $("#work-file").removeClass("is-invalid");
    $("#work-date").removeClass("is-invalid");


    var title = $("#work-name").val();
    var file = $("#work-file").prop("files")[0];
    var info = $("#work-info").val();
    var date = $("#work-date").val();
    var des = $("#work-des").val();

    if (!title) {
        $("#work-name").addClass("is-invalid");
        return;
    }
    if (!info) {
        $("#work-info").addClass("is-invalid");
        return;
    }
    if (file == null) {
        $("#work-file").addClass("is-invalid");
        return;
    }
    if ($.inArray(file["type"], validFormat) < 0) {
        $("#work-file").addClass("is-invalid");
        return;
    }
    if (!des) {
        $("#work-des").addClass("is-invalid");
        return;
    }
    if (!date) {
        $("#work-date").addClass("is-invalid");
        return;
    }

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
    pr.style.display = "block";
    $("#spinner").addClass("spinner-grow");




    var database = firebase.database().ref("Workshops/");

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);

    var posterName = new Date().getTime();

    var storage = firebase.storage().ref("Workshops" + "/" + posterName + extension);
    var uploadTask = storage.put(file);

    uploadTask.on("state_changed",
        function progress(snapshot) {

            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#work-progress").html(percentage + "%");
            $("#work-progress").attr("style", "width:" + percentage + "%");


        },
        function error(err) {

        },

        function complete() {

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                var workData = {
                    "date": varaDate,
                    "description": des,
                    "shortdes": info,
                    "pic": downloadURL,
                    "title": title
                };

                database.push().set(workData, function(err) {
                    if (err) {
                        $("#result-work").attr("class", "alert alert-danger");
                        $("#result-work").html(err.message);

                    } else {
                        $("#result-work").attr("class", "alert alert-success");
                        $("#result-work").html("Workshop Posted Successfully");


                    }
                    $("#spinner").removeClass("spinner-grow");
                    pr.style.display = "none";

                    $("#work")[0].reset();
                    $("#work-progress").html("Completed");
                })

            });
        });
})
var li = firebase.database().ref("Forms/Workshop/");

li.on("value", function(eva) {
    if (eva.exists()) {
        var resOption = "";

        eva.forEach(function(get) {
            var workKey = get.key;
            resOption += "<option>";
            resOption += workKey;
            resOption += "</option>"
        })
        $("#res-text").html(resOption);
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";

    }
})

$("#res-text").addClass("is-invalid");
var value = document.getElementById("res-text");
var work = "";

value.addEventListener("input", function() {
    work = this.value;

    pr.style.display = "block";
    $("#spinner").addClass("spinner-grow");
    $("#work-res").html("");
    $("#res-text").removeClass("is-invalid");
    var dres = firebase.database().ref("Forms/Workshop/" + work + "/");

    if (!work) {
        $("#res-text").addClass("is-invalid");
        $("#work-res").html("");
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
                    $("#work-res").html(resHtml);
                    $("#spinner").removeClass("spinner-grow");
                    pr.style.display = "none";

                })
            } else {
                $("#work-res").html("");
                $("#spinner").removeClass("spinner-grow");
                pr.style.display = "none";

            }
        })

    }

})

work = $("#res-text").val();

var dres = firebase.database().ref("Forms/Workshop/" + work + "/");
console.log(work);
dres.on("value", function(gets) {
    if (gets.exists()) {
        $("#res-text").removeClass("is-invalid");
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
            $("#work-res").html(resHtml);
            $("#spinner").removeClass("spinner-grow");
            pr.style.display = "none";

        })
    } else {
        $("#work-res").html("");
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";

    }
})
$("#train-export").click(function() {
    $("#export-train").table2excel({
        filename: work + ".xls"
    });
})