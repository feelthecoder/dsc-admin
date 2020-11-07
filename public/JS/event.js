var pr = document.getElementById("spin");

$("#event-upload").click(function() {

    var validFormat = ["image/jpeg", "image/png", "image/jpg"];

    $("#event-name").removeClass("is-invalid");
    $("#event-info").removeClass("is-invalid");
    $("#event-des").removeClass("is-invalid");
    $("#event-file").removeClass("is-invalid");
    $("#event-date").removeClass("is-invalid");


    var title = $("#event-name").val();
    var file = $("#event-file").prop("files")[0];
    var info = $("#event-info").val();
    var date = $("#event-date").val();
    var des = $("#event-des").val();

    if (!title) {
        $("#event-name").addClass("is-invalid");
        return;
    }
    if (!info) {
        $("#event-info").addClass("is-invalid");
        return;
    }
    if (file == null) {
        $("#event-file").addClass("is-invalid");
        return;
    }
    if ($.inArray(file["type"], validFormat) < 0) {
        $("#event-file").addClass("is-invalid");
        return;
    }
    if (!des) {
        $("#event-des").addClass("is-invalid");
        return;
    }
    if (!date) {
        $("#event-date").addClass("is-invalid");
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




    var database = firebase.database().ref("Events/");

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);

    var posterName = new Date().getTime();

    var storage = firebase.storage().ref("Events" + "/" + posterName + extension);
    var uploadTask = storage.put(file);

    uploadTask.on("state_changed",
        function progress(snapshot) {

            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#event-progress").html(percentage + "%");
            $("#event-progress").attr("style", "width:" + percentage + "%");


        },
        function error(err) {

        },

        function complete() {

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                var eventData = {
                    "date": varaDate,
                    "description": des,
                    "shortdes": info,
                    "pic": downloadURL,
                    "title": title
                };

                database.push().set(eventData, function(err) {
                    if (err) {
                        $("#result-event").attr("class", "alert alert-danger");
                        $("#result-event").html(err.message);

                    } else {
                        $("#result-event").attr("class", "alert alert-success");
                        $("#result-event").html("Event Posted Successfully");


                    }

                    $("#spinner").removeClass("spinner-grow");
                    pr.style.display = "none";

                    $("#event")[0].reset();
                    $("#event-progress").html("Completed ");
                })

            });
        });
})
var li = firebase.database().ref("Forms/Event/");

li.on("value", function(eva) {
    if (eva.exists()) {
        var resOption = "";

        eva.forEach(function(get) {
            var eventKey = get.key;
            resOption += "<option>";
            resOption += eventKey;
            resOption += "</option>"
        })
        $("#res-text").html(resOption);
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";

    }
})

$("#res-text").addClass("is-invalid");
var value = document.getElementById("res-text");
var event = "";

value.addEventListener("input", function() {
    event = this.value;
    pr.style.display = "block";
    $("#spinner").addClass("spinner-grow");
    $("#event-res").html("");
    $("#res-text").removeClass("is-invalid");
    var dres = firebase.database().ref("Forms/Event/" + event + "/");

    if (!event) {
        $("#res-text").addClass("is-invalid");
        $("#event-res").html("");
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
                    $("#event-res").html(resHtml);
                    $("#spinner").removeClass("spinner-grow");
                    pr.style.display = "none";

                })
            } else {
                $("#event-res").html("");
                $("#spinner").removeClass("spinner-grow");
                pr.style.display = "none";
            }
        })

    }

})
event = $("#res-text").val();
var dres = firebase.database().ref("Forms/Event/" + event + "/");


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
            $("#event-res").html(resHtml);
            $("#spinner").removeClass("spinner-grow");
            pr.style.display = "none";

        })
    } else {
        $("#event-res").html("");
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";
    }
})

$("#train-export").click(function() {
    $("#export-train").table2excel({
        filename: event + ".xls"
    });
})