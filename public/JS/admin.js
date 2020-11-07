$("#user-close").click(function() {
    document.getElementById("chat-box").style.display = "none";
})

var pr = document.getElementById("spin");
pr.style.display = "block";

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
        $("#spinner").removeClass("spinner-grow")
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
    $("#spinner").addClass("spinner-grow")


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
                $("#spinner").removeClass("spinner-grow")
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
                    $("#spinner").removeClass("spinner-grow")
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
    $("#spinner").addClass("spinner-grow")

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
                    $("#spinner").removeClass("spinner-grow")
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

        $("#spinner").addClass("spinner-grow");
        pr.style.display = "block";

        complains.forEach(function(complain) {
            complainHtml += "<tr>";
            complainHtml += "<td>";
            complainHtml += complain.val().comment;
            complainHtml += "</td>";
            complainHtml += "</tr>";


        });
        $("#complain").html(complainHtml);


        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";

    }


})

var feed = firebase.database().ref("MainData/Feedback");
feed.on("value", function(feedbacks) {

    if (feedbacks.exists()) {
        var feedbackHtml = "";
        pr.style.display = "block";
        $("#spinner").addClass("spinner-grow");

        feedbacks.forEach(function(feedback) {
            feedbackHtml += "<tr>";
            feedbackHtml += "<td>";
            feedbackHtml += feedback.val().comment;
            feedbackHtml += "</td>";
            feedbackHtml += "</tr>";


        });

        $("#feedback").html(feedbackHtml);
    }
    $("#spinner").removeClass("spinner-grow");
    pr.style.display = "none";

})

var userN = firebase.database().ref("Users/");
userN.on("value", function(r) {

    if (r.exists()) {
        pr.style.display = "block";
        $("#spinner").addClass("spinner-grow");

        var resHtml = "";
        r.forEach(function(re) {

            var profile = "&#39" + re.val().profileImageUrl + "&#39";
            var name = "&#39" + re.val().displayName + "&#39";
            var user = "&#39" + re.key + "&#39";

            resHtml += "<div onclick='openChat(" + profile + "," + name + "," + user + ")'>"
            resHtml += "<img src='"

            resHtml += re.val().profileImageUrl;

            resHtml += "' id='image'  width=50px height=50px  style='border-radius:50%;margin-top:10px'/>"

            resHtml += "<span style='margin-top:8px;margin-left:30px;color:white'>"
            resHtml += re.val().displayName;
            resHtml += "</span>"
            resHtml += "</div>"

        })
        $("#users").html(resHtml);
        $("#spinner").removeClass("spinner-grow");
        pr.style.display = "none";
    }
})

function openChat(profile, name, user) {



    var admin = "dye067yWTucIkGJbVRRc6zmOIY93";

    document.getElementById("chat-box").style.display = "block";
    var userName = "<h6 class='m-0'>" + name + "</h6>";
    $("#user-name").html(userName);

    var chatDB = firebase.database().ref("Chats/");
    chatDB.on("value", function(gets) {
        if (gets.exists()) {
            var chatHtml = "";
            chatHtml += "<ul class='p-0'>"
            gets.forEach(function(get) {
                var sender = get.val().sender;
                var receiver = get.val().receiver;
                var message = get.val().message;


                if (sender == admin && receiver == user) {

                    chatHtml += "<li class = 'pl-2 pr-2 bg-primary rounded text-white text-center send-msg mb-1'>";
                    chatHtml += message;
                    chatHtml += "</li>"

                } else
                if (sender == user && receiver == admin) {
                    chatHtml += "<li class='p-1 rounded mb-1'> <div class ='receive-msg'><img src='";
                    chatHtml += profile;
                    chatHtml += "'/><div class ='receive-msg-desc text-center mt-1 ml-1 pl-2 pr-2'><p class ='pl-2 pr-2 rounded'>";
                    chatHtml += message;
                    chatHtml += "</p></div></div></li>";
                }

            })
            chatHtml += "</ul>";
            $("#user-chat").html(chatHtml);

            var objDiv = document.getElementById("user-chat");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    })


    userinput.addEventListener('keydown', function(e) {
        if (e.keyCode == 13) {
            var text = $("#userinput").val();
            var data = {
                "message": text,
                "sender": admin,
                "receiver": user
            }




            chatDB.push().set(data, function(err) {
                if (err) {
                    window.alert("Unable to send message due to " + err.message);
                } else {
                    $("#userinput").val('');

                }

            })
        }
    })

    $("#send-btn").off('click').on('click', function(e) {
        var text = $("#userinput").val();
        var data = {
            "message": text,
            "sender": admin,
            "receiver": user
        }




        chatDB.push().set(data, function(err) {
            if (err) {
                window.alert("Unable to send message due to " + err.message);
            } else {
                $("#userinput").val('');

            }

        })
    })

}