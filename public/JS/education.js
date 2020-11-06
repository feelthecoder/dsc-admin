$("#res-text").addClass("is-invalid");
var value = document.getElementById("res-text");
var tech = "";
value.addEventListener("input", function() {
    tech = this.value;
    if (!tech) {
        $("#res-text").addClass("is-invalid");
        return;
    } else {
        $("#res-text").removeClass("is-invalid");
        var technology = tech.toLowerCase().replace(" ", "").replace("#", "sharp").replace("++", "plusplus");


        $("#pdf-upload").click(function() {
            var validType = ["application/pdf"];

            $("#pdf-text").removeClass("is-invalid");
            $("#pdf-file").removeClass("is-invalid");

            var title = $("#pdf-text").val();
            var file = $("#pdf-file").prop("files")[0];

            if (!title) {
                $("#pdf-text").addClass("is-invalid");
                return;
            }

            if (file == null) {
                $("#pdf-file").addClass("is-invalid");
                return;
            }

            if ($.inArray(file["type"], validType) < 0) {
                $("#pdf-file").addClass("is-invalid");
                return;
            }

            $("#spinner").addClass("spinner-grow")


            var database = firebase.database().ref("Education/" + technology + "/pdf/");

            var name = file["name"];
            var extension = name.substring(name.lastIndexOf("."), name.length);

            var pdfName = new Date().getTime();

            var storage = firebase.storage().ref("Education Resources/" + technology + "/PDF Books/" + pdfName + extension);
            var uploadTask = storage.put(file);

            uploadTask.on("state_changed",
                function progress(snapshot) {

                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    $("#pdf-progress").html(percentage + "%");
                    $("#pdf-progress").attr("style", "width:" + percentage + "%");


                },
                function error(err) {

                },

                function complete() {

                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        var pdfData = {
                            "name": title,
                            "link": downloadURL
                        }

                        database.push().set(pdfData, function(err) {
                            if (err) {
                                $("#result-pdf").attr("class", "alert alert-danger");
                                $("#result-pdf").html(err.message);

                            } else {
                                $("#result-pdf").attr("class", "alert alert-success");
                                $("#result-pdf").html("Resource Uploaded Successfully");


                            }
                            $("#spinner").removeClass("spinner-grow")
                            $("#form-pdf")[0].reset();
                            $("#pdf-progress").html("Completed");
                        });
                    })
                })






        })

        $("#blog-upload").click(function() {
            $("#blog-text").removeClass("is-invalid");
            $("#blog-link").removeClass("is-invalid");

            var title = $("#blog-text").val();
            var link = $("#blog-link").val()


            if (!title) {
                $("#blog-text").addClass("is-invalid");
                return;
            }
            if (!link) {
                $("#blog-link").addClass("is-invalid");
                return;
            }

            var data = firebase.database().ref("Education/" + technology + "/blogs/");

            var dataS = {
                "name": title,
                "link": link
            };
            $("#spinner").addClass("spinner-grow")
            data.push().set(dataS, function(err) {
                if (err) {
                    $("#result-blog").attr("class", "alert alert-danger");
                    $("#result-blog").html(err.message);

                } else {
                    $("#result-blog").attr("class", "alert alert-success");
                    $("#result-blog").html("Blog Updated Successfully");


                }
                $("#spinner").removeClass("spinner-grow")
                $("#form-blog")[0].reset();

            })




        })

        $("#udemy-upload").click(function() {
            $("#udemy-text").removeClass("is-invalid");
            $("#udemy-link").removeClass("is-invalid");

            var title = $("#udemy-text").val();
            var link = $("#udemy-link").val()


            if (!title) {
                $("#udemy-text").addClass("is-invalid");
                return;
            }
            if (!link) {
                $("#udemy-link").addClass("is-invalid");
                return;
            }
            $("#spinner").addClass("spinner-grow")


            var data = firebase.database().ref("Education/" + technology + "/udemy/");

            var dataS = {
                "name": title,
                "link": link
            };
            data.push().set(dataS, function(err) {
                if (err) {
                    $("#result-udemy").attr("class", "alert alert-danger");
                    $("#result-udemy").html(err.message);

                } else {
                    $("#result-udemy").attr("class", "alert alert-success");
                    $("#result-udemy").html("Course Updated Successfully");


                }
                $("#spinner").removeClass("spinner-grow")

                $("#form-udemy")[0].reset();

            })



        })

        $("#youtube-upload").click(function() {
            $("#youtube-text").removeClass("is-invalid");
            $("#youtube-link").removeClass("is-invalid");

            var title = $("#youtube-text").val();
            var link = $("#youtube-link").val()


            if (!title) {
                $("#youtube-text").addClass("is-invalid");
                return;
            }
            if (!link) {
                $("#youtube-link").addClass("is-invalid");
                return;
            }

            $("#spinner").addClass("spinner-grow")
            var data = firebase.database().ref("Education/" + technology + "/youtube/");

            var dataS = {
                "name": title,
                "link": link
            };
            data.push().set(dataS, function(err) {
                if (err) {
                    $("#result-youtube").attr("class", "alert alert-danger");
                    $("#result-youtube").html(err.message);

                } else {
                    $("#result-youtube").attr("class", "alert alert-success");
                    $("#result-youtube").html("Course Updated Successfully");


                }
                $("#spinner").removeClass("spinner-grow")
                $("#form-youtube")[0].reset();

            })



        })

        $("#dsc-upload").click(function() {
            $("#dsc-text").removeClass("is-invalid");
            $("#dsc-link").removeClass("is-invalid");

            var title = $("#dsc-text").val();
            var link = $("#dsc-link").val()


            if (!title) {
                $("#dsc-text").addClass("is-invalid");
                return;
            }
            if (!link) {
                $("#dsc-link").addClass("is-invalid");
                return;
            }


            $("#spinner").addClass("spinner-grow")
            var data = firebase.database().ref("Education/" + technology + "/dsc/");

            var dataS = {
                "name": title,
                "link": link
            };
            data.push().set(dataS, function(err) {
                if (err) {
                    $("#result-dsc").attr("class", "alert alert-danger");
                    $("#result-dsc").html(err.message);

                } else {
                    $("#result-dsc").attr("class", "alert alert-success");
                    $("#result-dsc").html("Course Updated Successfully");


                }
                $("#spinner").removeClass("spinner-grow")
                $("#form-dsc")[0].reset();

            })


        })

        $("#nptel-upload").click(function() {
            $("#nptel-text").removeClass("is-invalid");
            $("#nptel-link").removeClass("is-invalid");

            var title = $("#nptel-text").val();
            var link = $("#nptel-link").val()


            if (!title) {
                $("#nptel-text").addClass("is-invalid");
                return;
            }
            if (!link) {
                $("#nptel-link").addClass("is-invalid");
                return;
            }
            $("#spinner").addClass("spinner-grow")

            var data = firebase.database().ref("Education/" + technology + "/nptel/");

            var dataS = {
                "name": title,
                "link": link
            };
            data.push().set(dataS, function(err) {
                if (err) {
                    $("#result-nptel").attr("class", "alert alert-danger");
                    $("#result-nptel").html(err.message);

                } else {
                    $("#result-nptel").attr("class", "alert alert-success");
                    $("#result-nptel").html("Course Updated Successfully");


                }
                $("#spinner").removeClass("spinner-grow")
                $("#form-nptel")[0].reset();

            })



        })

        $("#book-upload").click(function() {
            var validType = ["application/pdf"];

            $("#book-text").removeClass("is-invalid");
            $("#book-file").removeClass("is-invalid");

            var title = $("#book-text").val();
            var file = $("#book-file").prop("files")[0];

            if (!title) {
                $("#book-text").addClass("is-invalid");
                return;
            }

            if (file == null) {
                $("#book-file").addClass("is-invalid");
                return;
            }

            if ($.inArray(file["type"], validType) < 0) {
                $("#book-file").addClass("is-invalid");
                return;
            }

            $("#spinner").addClass("spinner-grow")



            var database = firebase.database().ref("Education/" + technology + "/books/");

            var name = file["name"];
            var extension = name.substring(name.lastIndexOf("."), name.length);

            var bookName = new Date().getTime();

            var storage = firebase.storage().ref("Education Resources/" + technology + "/Standard Books/" + bookName + extension);
            var uploadTask = storage.put(file);

            uploadTask.on("state_changed",
                function progress(snapshot) {

                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    $("#book-progress").html(percentage + "%");
                    $("#book-progress").attr("style", "width:" + percentage + "%");


                },
                function error(err) {

                },

                function complete() {

                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        var bookData = {
                            "name": title,
                            "link": downloadURL
                        }

                        database.push().set(bookData, function(err) {
                            if (err) {
                                $("#result-book").attr("class", "alert alert-danger");
                                $("#result-book").html(err.message);

                            } else {
                                $("#result-book").attr("class", "alert alert-success");
                                $("#result-book").html("Resource Uploaded Successfully");


                            }
                            $("#spinner").removeClass("spinner-grow")
                            $("#form-book")[0].reset();
                            $("#book-progress").html("Completed");
                        });
                    })
                })




        })
    }

});
var res = firebase.database().ref("SubmittedResources/");
res.on("value", function(r) {

    if (r.exists()) {
        var resHtml = "";

        r.forEach(function(re) {

            var user = re.key;

            var userData = firebase.database().ref("SubmittedResources/" + user);

            userData.on("value", function(userR) {
                if (userR.exists()) {

                    var result;
                    var url;


                    userR.forEach(function(resource) {
                        var Name = "";
                        var id = resource.key;
                        var userName = firebase.database().ref("Users/" + user);

                        userName.on("value", function(getUser) {
                            if (getUser.exists()) {
                                Name = getUser.val().displayName;

                                var userID = "&#39;" + user + "&#39;";
                                var ide = "&#39;" + id + "&#39";
                                url = "&#39;" + resource.val().url + "&#39;";


                                resHtml += "<tr>";
                                resHtml += "<td>";
                                resHtml += Name;
                                resHtml += "</td>";
                                resHtml += "<td>";
                                resHtml += resource.val().name;
                                resHtml += "</td>";
                                resHtml += "<td>";
                                result = resource.val().status;
                                if (result == "0")
                                    resHtml += "Pending";
                                else if (result == "1")
                                    resHtml += "Rejected";
                                else
                                    resHtml += "Accepted"
                                resHtml += "</td>";
                                resHtml += "<td>";
                                resHtml += "<button id='accept' type='button' placeholder='Accept' class='btn btn-primary' onclick='funAccept(" + userID + "," + ide + ")'>Accept</button>";
                                resHtml += "</td>";
                                resHtml += "<td>";
                                resHtml += "<button id='reject' type='button' placeholder='Reject' class='btn btn-primary' onclick='funReject(" + userID + "," + ide + ")'>Reject</button>";
                                resHtml += "</td>";
                                resHtml += "<td>";
                                resHtml += "<button id='download' type='button' placeholder='Download' class='btn btn-primary' onclick='funDownload(" + userID + "," + url + ")'>View</button>";
                                resHtml += "</td>";
                                resHtml += "</tr>";

                            }

                        })
                    })
                    $("#edu-resource").html(resHtml);
                    $("#spinner").removeClass("spinner-grow");
                }
            })

        })
    }
});

function funAccept(user, id) {
    var db = firebase.database().ref("SubmittedResources/" + user);
    db.child(id).child("status").set("2", function(err) {
        if (err) {
            alert(err.message);
        } else {
            alert("Resource Accepted !");
        }

    })

}

function funDownload(user, url) {
    window.open(url);
}

function funReject(user, id) {
    var db = firebase.database().ref("SubmittedResources/" + user);
    db.child(id).child("status").set("1", function(err) {
        if (err) {
            alert(err.message);
        } else {
            alert("Resource Rejected !");
        }

    });

}