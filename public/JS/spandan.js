$("#spa-upload").click(function() {

    var validFormat = ["image/png", "image/jpg", "image/jpeg"];

    $("#spa-name").removeClass("is-invalid");
    $("#spa-info").removeClass("is-invalid");
    $("#spa-des").removeClass("is-invalid");
    $("#spa-file").removeClass("is-invalid");
    $("#spa-date").removeClass("is-invalid");


    var title = $("#spa-name").val();
    var file = $("#spa-file").prop("files")[0];
    var info = $("#spa-info").val();
    var date = $("#spa-date").val();
    var des = $("#spa-des").val();

    if (!title) {
        $("#spa-name").addClass("is-invalid");
        return;
    }
    if (!info) {
        $("#spa-info").addClass("is-invalid");
        return;
    }
    if (file == null) {
        $("#spa-file").addClass("is-invalid");
        return;
    }
    if ($.inArray(file["type"], validFormat) < 0) {
        $("#spa-file").addClass("is-invalid");
        return;
    }
    if (!des) {
        $("#spa-des").addClass("is-invalid");
        return;
    }
    if (!date) {
        $("#spa-date").addClass("is-invalid");
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


    var database = firebase.database().ref("SpandanEvents/");

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);

    var posterName = new Date().getTime();

    var storage = firebase.storage().ref("Tech Spandan" + "/" + posterName + extension);
    var uploadTask = storage.put(file);

    uploadTask.on("state_changed",
        function progress(snapshot) {

            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#spa-progress").html(percentage + "%");
            $("#spa-progress").attr("style", "width:" + percentage + "%");


        },
        function error(err) {

        },

        function complete() {

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                var spaData = {
                    "date": varaDate,
                    "description": des,
                    "shortdes": info,
                    "pic": downloadURL,
                    "title": title
                };

                database.push().set(spaData, function(err) {
                    if (err) {
                        $("#result-spa").attr("class", "alert alert-danger");
                        $("#result-spa").html(err.message);

                    } else {
                        $("#result-spa").attr("class", "alert alert-success");
                        $("#result-spa").html("Spandan Event Posted Successfully");


                    }
                    $("#spinner").removeClass("spinner-grow")
                    $("#spandan")[0].reset();
                    $("#spa-progress ").html("Completed ");
                })

            });
        });
})
$("#res-upload").click(function() {

    var validFormat = ["image/png", "image/jpg", "image/jpeg"];

    $("#res-name").removeClass("is-invalid");
    $("#res-file").removeClass("is-invalid");
    $("#res-year").removeClass("is-invalid");



    var title = $("#res-name").val();
    var file = $("#res-file").prop("files")[0];
    var year = $("#res-year").val();


    if (!title) {
        $("#res-name").addClass("is-invalid");
        return;
    }
    if (!year) {
        $("#res-year").addClass("is-invalid");
        return;
    }
    if (year > 2020) {
        $("#res-year").addClass("is-invalid");
        return;
    }
    if (file == null) {
        $("#res-file").addClass("is-invalid");
        return;
    }
    if ($.inArray(file["type"], validFormat) < 0) {
        $("#res-file").addClass("is-invalid");
        return;
    }


    $("#spinner").addClass("spinner-grow")

    var database = firebase.database().ref("SpandanResources/" + year);

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);

    var posterName = new Date().getTime();

    var storage = firebase.storage().ref("Tech Spandan" + "/" + posterName + extension);
    var uploadTask = storage.put(file);

    uploadTask.on("state_changed",
        function progress(snapshot) {

            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#res-progress").html(percentage + "%");
            $("#res-progress").attr("style", "width:" + percentage + "%");


        },
        function error(err) {

        },

        function complete() {

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                var resData = {
                    "pic": downloadURL,
                    "title": title
                };

                database.push().set(resData, function(err) {
                    if (err) {
                        $("#result-res").attr("class", "alert alert-danger");
                        $("#result-res").html(err.message);

                    } else {
                        $("#result-res").attr("class", "alert alert-success");
                        $("#result-res").html("Resource Added Successfully");


                    }

                    $("#spinner").removeClass("spinner-grow")

                    $("#resource")[0].reset();
                    $("#res-progress").html("Completed ");
                })

            });
        });
})
$("#about-upload").click(function() {
    $("#about-file").removeClass("is-invalid");

    var validType = ["application/pdf"];


    var file = $("#about-file").prop("files")[0];

    if (file == null) {
        $("#about-file").addClass("is-invalid");
        return;
    }

    if ($.inArray(file["type"], validType) < 0) {
        $("#about-file").addClass("is-invalid");
        return;
    }

    $("#spinner").addClass("spinner-grow")

    var database = firebase.database().ref("SpandanResources/aboutpdf");

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);



    var storage = firebase.storage().ref("Spandan Resources/" + "about" + extension);
    var uploadTask = storage.put(file);

    uploadTask.on("state_changed",
        function progress(snapshot) {

            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#about-progress").html(percentage + "%");
            $("#about-progress").attr("style", "width:" + percentage + "%");


        },
        function error(err) {

        },

        function complete() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                database.set(downloadURL, function(err) {
                    if (err) {
                        $("#result-about").attr("class", "alert alert-danger");
                        $("#result-about").html(err.message);

                    } else {
                        $("#result-about").attr("class", "alert alert-success");
                        $("#result-about").html("About Spandan Updated Successfully");


                    }
                    $("#spinner").removeClass("spinner-grow")
                    $("#about")[0].reset();
                    $("#about-progress").html("Completed");
                });
            })
        })

})
var li = firebase.database().ref("Forms/Spandan Tech Events/");

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

    }
})

$("#res-text").addClass("is-invalid");
var value = document.getElementById("res-text");
var compete = "";

value.addEventListener("input", function() {
    compete = this.value;
    $("#spinner").addClass("spinner-grow");
    $("#res-text").removeClass("is-invalid");
    $("#compete-res").html("");
    var dres = firebase.database().ref("Forms/Spandan Tech Events/" + compete + "/");

    if (!compete) {
        $("#res-text").addClass("is-invalid");
        $("#compete-res").html("");
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
                    $("#compete-res").html(resHtml);
                    $("#spinner").removeClass("spinner-grow");

                })
            } else {
                $("#compete-res").html("");
                $("#spinner").removeClass("spinner-grow");

            }
        })

    }

})

compete = $("#res-text").val();
var dres = firebase.database().ref("Forms/Spandan Tech Events/" + compete + "/");


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

        })
    } else {
        $("#compete-res").html("");
        $("#spinner").removeClass("spinner-grow");

    }
})

$("#train-export").click(function() {
    $("#export-train").table2excel({
        filename: compete + ".xls"
    });
})