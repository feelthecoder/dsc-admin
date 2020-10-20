$("#train-upload").click(function() {

    var validFormat = ["image/jpeg", "image/png", "image/jpg"];

    $("#train-name").removeClass("is-invalid");
    $("#train-info").removeClass("is-invalid");
    $("#train-des").removeClass("is-invalid");
    $("#train-file").removeClass("is-invalid");
    $("#train-date").removeClass("is-invalid");


    var title = $("#train-name").val();
    var file = $("#train-file").prop("files")[0];
    var info = $("#train-info").val();
    var date = $("#train-date").val();
    var des = $("#train-des").val();

    if (!title) {
        $("#train-name").addClass("is-invalid");
        return;
    }
    if (!info) {
        $("#train-info").addClass("is-invalid");
        return;
    }
    if (file == null) {
        $("#train-file").addClass("is-invalid");
        return;
    }
    if ($.inArray(file["type"], validFormat) < 0) {
        $("#train-file").addClass("is-invalid");
        return;
    }
    if (!des) {
        $("#train-des").addClass("is-invalid");
        return;
    }
    if (!date) {
        $("#train-date").addClass("is-invalid");
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

    $("#spinner").addClass("spinner-grow");


    var database = firebase.database().ref("Training/");

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);

    var posterName = new Date().getTime();

    var storage = firebase.storage().ref("Training" + "/" + posterName + extension);
    var uploadTask = storage.put(file);

    uploadTask.on("state_changed",
        function progress(snapshot) {

            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#train-progress").html(percentage + "%");
            $("#train-progress").attr("style", "width:" + percentage + "%");


        },
        function error(err) {

        },

        function complete() {

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                var trainData = {
                    "date": varaDate,
                    "description": des,
                    "shortdes": info,
                    "pic": downloadURL,
                    "title": title
                };

                database.push().set(trainData, function(err) {
                    if (err) {
                        $("#result-train").attr("class", "alert alert-danger");
                        $("#result-train").html(err.message);

                    } else {
                        $("#result-train").attr("class", "alert alert-success");
                        $("#result-train").html("Training Posted Successfully");


                    }
                    $("#spinner").removeClass("spinner-grow");

                    $("#training")[0].reset();
                    $("#train-progress ").html("Completed ");
                })

            });
        });
})
var li = firebase.database().ref("Forms/Training/");

li.on("value", function(tra) {
    if (tra.exists()) {
        var resOption = "";

        tra.forEach(function(get) {
            var trainKey = get.key;
            resOption += "<option>";
            resOption += trainKey;
            resOption += "</option>"
        })
        $("#res-text").html(resOption);
        $("#spinner").removeClass("spinner-grow");

    }
})

$("#res-text").addClass("is-invalid");
var value = document.getElementById("res-text");
var training = "";

value.addEventListener("input", function() {
    training = this.value;
    $("#spinner").addClass("spinner-grow");
    $("#train-res").html("");
    $("#res-text").removeClass("is-invalid");
    var dres = firebase.database().ref("Forms/Training/" + training + "/");

    if (!training) {
        $("#res-text").addClass("is-invalid");
        $("#train-res").html("");
        $("#spinner").removeClass("spinner-grow");
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
                    $("#train-res").html(resHtml);
                    $("#spinner").removeClass("spinner-grow");

                })

            } else {
                $("#train-res").html("");
                $("#spinner").removeClass("spinner-grow");
            }
        })

    }

})
training = $("#res-text").val();
var dres = firebase.database().ref("Forms/Training/" + training + "/");
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
            $("#train-res").html(resHtml);
            $("#spinner").removeClass("spinner-grow");

        })

    } else {
        $("#train-res").html("");
        $("#spinner").removeClass("spinner-grow");
    }
})
$("#train-export").click(function() {
    $("#export-train").table2excel({
        filename: training + ".xls"
    });
})