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

    var database = firebase.database().ref("About/aboutpdf");

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);



    var storage = firebase.storage().ref("About/" + "aboutpdf" + extension);
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
                        $("#result-about ").html("About DSC Updated Successfully");


                    }
                    $("#spinner").removeClass("spinner-grow")
                    $("#about")[0].reset();
                    $("#about-progress").html("Completed");
                });
            })
        })

})

var value = document.getElementById("team-team");
var mem = "";
value.addEventListener("input", function() {
    var data = this.value;
    if (!data) {
        $("#team-team").addClass("is-invalid");
        return;
    } else {
        $("#team-team").removeClass("is-invalid");
        mem = data.replace("anagement ", "").replace("echnical ", "").replace("esigner ", "");

        $("#team-upload").click(function() {

            var validType = ["image/png", "image/jpg", "image/jpeg"];

            $("#team-name").removeClass("is-invalid");
            $("#team-profile").removeClass("is-invalid");
            $("#team-bio").removeClass("is-invalid");
            $("#team-position").removeClass("is-invalid");
            $("#team-skill").removeClass("is-invalid");
            $("#team-special").removeClass("is-invalid");
            $("#team-git").removeClass("is-invalid");
            $("#team-hack").removeClass("is-invalid");
            $("#team-instagram").removeClass("is-invalid");
            $("#team-facebook").removeClass("is-invalid");
            $("#team-link").removeClass("is-invalid");
            $("#team-project").removeClass("is-invalid");


            var title = $("#team-name").val();
            var profile = $("#team-profile").prop("files")[0];
            var bio = $("#team-bio").val();
            var position = $("#team-position").val()
            var skills = $("#team-skill").val()
            var special = $("#team-special").val();
            var github = $("#team-git").val();
            var hack = $("#team-hack").val();
            var instagram = $("#team-instagram").val();
            var facebook = $("#team-facebook").val();
            var linkedin = $("#team-link").val();
            var project = $("#team-project").val();

            if (!title) {
                $("#team-name").addClass("is-invalid");
                return;
            }
            if (profile == null) {
                $("#team-profile").addClass("is-invalid");
                return;
            }
            if (!bio) {
                $("#team-bio").addClass("is-invalid");
                return;
            }
            if (!position) {
                $("#team-position").addClass("is-invalid");
                return;
            }
            if (!skills) {
                $("#team-skill").addClass("is-invalid");
                return;
            }
            if (!project) {
                $("#team-project").addClass("is-invalid");
                return;
            }

            if (!special) {
                $("#team-special").addClass("is-invalid");
                return;
            }
            if (!facebook) {
                $("#team-facebook").addClass("is-invalid");
                return;
            }
            if (!linkedin) {
                $("#team-link").addClass("is-invalid");
                return;
            }
            if (!instagram) {
                $("#team-instagram").addClass("is-invalid");
                return;
            }
            if (!hack) {
                $("#team-hack").addClass("is-invalid");
                return;
            }


            if (!github) {
                $("#team-git").addClass("is-invalid");
                return;
            }




            if ($.inArray(profile["type"], validType) < 0) {
                $("#team-profile").addClass("is-invalid");
                return;
            }

            $("#spinner").addClass("spinner-grow")

            var database = firebase.database().ref("About/" + mem + "/");

            var name = profile["name"];
            var extension = name.substring(name.lastIndexOf("."), name.length);

            var proName = new Date().getTime();

            var storage = firebase.storage().ref("About/" + mem + "/" + proName + extension);
            var uploadTask = storage.put(profile);

            uploadTask.on("state_changed",
                function progress(snapshot) {

                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    $("#team-progress").html(percentage + "%");
                    $("#team-progress").attr("style", "width:" + percentage + "%");


                },
                function error(err) {

                },

                function complete() {

                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        var teamData = {
                            "bio": bio,
                            "dp": downloadURL,
                            "fb": facebook,
                            "git": github,
                            "hackerrank": hack,
                            "insta": instagram,
                            "linkdin": linkedin,
                            "name": title,
                            "post": position,
                            "projects": project,
                            "skills": skills,
                            "specia": special

                        };

                        database.push().set(teamData, function(err) {
                            if (err) {
                                $("#result-team").attr("class", "alert alert-danger");
                                $("#result-team").html(err.message);

                            } else {
                                $("#result-team").attr("class", "alert alert-success");
                                $("#result-team").html("Person Added Successfully");


                            }
                            $("#spinner").removeClass("spinner-grow")
                            $("#team")[0].reset();
                            $("#team-progress").html("Completed");
                        });
                    })
                })

        })

    }
})