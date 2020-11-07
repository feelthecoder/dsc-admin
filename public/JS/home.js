var pr = document.getElementById("spin");

$("#news-upload").click(function() {
    $("#news-text").removeClass("is-invalid");



    var news = $("#news-text").val();
    if (!news) {
        $("#news-text").addClass("is-invalid");
        return;
    }

    pr.style.display = "block";
    $("#spinner").addClass("spinner-grow");


    var data = firebase.database().ref("MainData/mText");
    data.set(news, function(err) {
        if (err) {
            $("#result-news").attr("class", "alert alert-danger");
            $("#result-news").html(err.message);

        } else {
            $("#result-news").attr("class", "alert alert-success");
            $("#result-news").html("News Updated Successfully");


        }
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";
        $("#form-news")[0].reset();

    })




})


$("#banner-upload").click(function() {
    var validFile = ["image/jpeg ", "image/jpg", "image/png"];


    $("#banner-title").removeClass("is-invalid");
    $("#banner-file").removeClass("is-invalid");

    var banner_no = $("#banner-title").val();
    var file = $("#banner-file").prop("files")[0];

    if (!banner_no || banner_no > 7) {
        $("#banner-title").addClass("is-invalid");
        return;
    }

    if (file == null) {
        $("#banner-file").addClass("is-invalid");
        return;
    }

    if ($.inArray(file["type"], validFile) < 0) {
        $("#banner-file").addClass("is-invalid");
        return;
    }

    pr.style.display = "block";
    $("#spinner").addClass("spinner-grow");
    var database = firebase.database().ref("Switcher/");

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);

    var storage = firebase.storage().ref("ImageSwitcherPhotos" + "/" + banner_no + extension);
    var uploadTask = storage.put(file);

    uploadTask.on("state_changed",
        function progress(snapshot) {

            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#banner-progress").html(percentage + "%");
            $("#banner-progress").attr("style", "width:" + percentage + "%");


        },
        function error(err) {

        },

        function complete() {


            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                var resultData = {
                    "imageUrl": downloadURL
                };

                if (banner_no == 1) {
                    database.child("switchdsc1").set(resultData, function(err) {
                        if (err) {
                            $("#result-banner").attr("class", "alert alert-danger");
                            $("#result-banner").html(err.message);

                        } else {
                            $("#result-banner").attr("class", "alert alert-success");
                            $("#result-banner").html("Banner Uploaded Successfully");


                        }
                    });
                }
                if (banner_no == 2) {
                    database.child("switchdsc2").set(resultData, function(err) {
                        if (err) {
                            $("#result-banner").attr("class", "alert alert-danger");
                            $("#result-banner").html(err.message);

                        } else {
                            $("#result-banner").attr("class", "alert alert-success");
                            $("#result-banner").html("Banner Uploaded Successfully");


                        }
                    });
                }
                if (banner_no == 3) {
                    database.child("switchdsc3").set(resultData, function(err) {
                        if (err) {
                            $("#result-banner").attr("class", "alert alert-danger");
                            $("#result-banner").html(err.message);

                        } else {
                            $("#result-banner").attr("class", "alert alert-success");
                            $("#result-banner").html("Banner Uploaded Successfully");


                        }
                    });
                }

                if (banner_no == 4) {
                    database.child("switchdsc4").set(resultData, function(err) {
                        if (err) {
                            $("#result-banner").attr("class", "alert alert-danger");
                            $("#result-banner").html(err.message);

                        } else {
                            $("#result-banner").attr("class", "alert alert-success");
                            $("#result-banner").html("Banner Uploaded Successfully");


                        }
                    });
                }
                if (banner_no == 5) {
                    database.child("switchdsc5").set(resultData, function(err) {
                        if (err) {
                            $("#result-banner").attr("class", "alert alert-danger");
                            $("#result-banner").html(err.message);

                        } else {
                            $("#result-banner").attr("class", "alert alert-success");
                            $("#result-banner").html("Banner Uploaded Successfully");


                        }
                    });
                }
                if (banner_no == 6) {
                    database.child("switchdsc6").set(resultData, function(err) {
                        if (err) {
                            $("#result-banner").attr("class", "alert alert-danger");
                            $("#result-banner").html(err.message);

                        } else {
                            $("#result-banner").attr("class", "alert alert-success");
                            $("#result-banner").html("Banner Uploaded Successfully");


                        }
                    });
                }
                if (banner_no == 7) {
                    database.child("switchdsc7").set(resultData, function(err) {
                        if (err) {
                            $("#result-banner").attr("class", "alert alert-danger");
                            $("#result-banner").html(err.message);

                        } else {
                            $("#result-banner").attr("class", "alert alert-success");
                            $("#result-banner").html("Banner Uploaded Successfully");


                        }
                    });
                }
                $("#spinner").removeClass("spinner-grow");
                pr.style.display = "none";
                $("#form-banner")[0].reset();
                $("#banner-progress").html("Completed");


            });
        })
})
$("#result-upload").click(function() {

    var validType = ["application/pdf"];

    $("#result-title").removeClass("is-invalid");
    $("#result-file").removeClass("is-invalid");

    var title = $("#result-title").val();
    var file = $("#result-file").prop("files")[0];

    if (!title) {
        $("#result-title").addClass("is-invalid");
        return;
    }

    if (file == null) {
        $("#result-file").addClass("is-invalid");
        return;
    }

    if ($.inArray(file["type"], validType) < 0) {
        $("#result-file").addClass("is-invalid");
        return;
    }


    pr.style.display = "block";
    $("#spinner").addClass("spinner-grow");
    var time = new Date().getTime();

    var database = firebase.database().ref("Results/" + time.toString());

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);

    var picName = new Date().getTime();

    var storage = firebase.storage().ref("Results" + "/" + picName + extension);
    var uploadTask = storage.put(file);

    uploadTask.on("state_changed",
        function progress(snapshot) {

            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#result-progress").html(percentage + "%");
            $("#result-progress").attr("style", "width:" + percentage + "%");


        },
        function error(err) {

        },

        function complete() {

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                var resultData = {
                    "name": title,
                    "link": downloadURL
                }

                database.set(resultData, function(err) {
                    if (err) {
                        $("#result-result").attr("class", "alert alert-danger");
                        $("#result-result").html(err.message);

                    } else {
                        $("#result-result").attr("class", "alert alert-success");
                        $("#result-result").html("Result Uploaded Successfully");


                    }
                    $("#spinner").removeClass("spinner-grow");
                    pr.style.display = "none";
                    $("#form-result")[0].reset();
                    $("#result-progress").html("Completed");
                });
            })
        })


})



$("#post-upload").click(function() {

    var validFormat = ["image/jpeg", "image/png", "image/jpg"];

    $("#post-title").removeClass("is-invalid");
    $("#post-desc").removeClass("is-invalid");
    $("#post-pic").removeClass("is-invalid");
    var title = $("#post-title").val();
    var file = $("#post-pic").prop("files")[0];
    var desc = $("#post-desc").val();

    if (!title) {
        $("#post-title").addClass("is-invalid");
        return;
    }
    if (!desc) {
        $("#post-desc").addClass("is-invalid");
        return;
    }
    if (file == null) {
        $("#post-pic").addClass("is-invalid");
        return;
    }
    if ($.inArray(file["type"], validFormat) < 0) {
        $("#post-pic").addClass("is-invalid");
        return;
    }


    pr.style.display = "block";
    $("#spinner").addClass("spinner-grow");

    var time = new Date().getTime();

    var database = firebase.database().ref("MainData/TechPosts/");

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);

    var picName = new Date().getTime();

    var storage = firebase.storage().ref("TechPost" + "/" + picName + extension);
    var uploadTask = storage.put(file);

    uploadTask.on("state_changed",
        function progress(snapshot) {

            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#post-progress").html(percentage + "%");
            $("#post-progress").attr("style", "width:" + percentage + "%");


        },
        function error(err) {

        },

        function complete() {

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                var postData = {
                    "tCaption": title,
                    "tComment": "0",
                    "tDescription": desc,
                    "tImg": downloadURL,
                    "tLike": "0",
                    "tShare": "0"
                };

                database.push().set(postData, function(err) {
                    if (err) {
                        $("#result-post").attr("class", "alert alert-danger");
                        $("#result-post").html(err.message);

                    } else {
                        $("#result-post").attr("class", "alert alert-success");
                        $("#result-post").html("Post Done Successfully");


                    }
                    $("#spinner").removeClass("spinner-grow");
                    pr.style.display = "none";
                    $("#form-post")[0].reset();
                    $("#post-progress").html("Completed");
                })

            });
        });
})

var dComp = firebase.database().ref("MainData/ComplainSuggestions");
dComp.on("value", function(complains) {

    if (complains.exists()) {
        var complainHtml = "";

        complains.forEach(function(complain) {
            complainHtml += "<tr>";
            complainHtml += "<td>";
            complainHtml += complain.val().comment;
            complainHtml += "</td>";
            complainHtml += "</tr>";


        });
        $("#complain").html(complainHtml);
    }
})

var feed = firebase.database().ref("MainData/Feedback");
feed.on("value", function(feedbacks) {

    if (feedbacks.exists()) {
        var feedbackHtml = "";

        feedbacks.forEach(function(feedback) {
            feedbackHtml += "<tr>";
            feedbackHtml += "<td>";
            feedbackHtml += feedback.val().comment;
            feedbackHtml += "</td>";
            feedbackHtml += "</tr>";


        });
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";
        $("#feedback").html(feedbackHtml);
    }


})