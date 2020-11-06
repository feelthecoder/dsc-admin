var pr = document.getElementById("spin");
pr.style.display = "block";
$("#project-upload").click(function() {

    var validFormat = ["application/pdf"];

    $("#project-name").removeClass("is-invalid");
    $("#project-file").removeClass("is-invalid");

    var title = $("#project-name").val();
    var file = $("#project-file").prop("files")[0];


    if (!title) {
        $("#project-name").addClass("is-invalid");
        return;
    }
    if (file == null) {
        $("project-file").addClass("is-invalid");
        return;
    }
    if ($.inArray(file["type"], validFormat) < 0) {
        $("#project-file").addClass("is-invalid");
        return;
    }

    pr.style.display = "block";
    $("#spinner").addClass("spinner-grow");
    var time = new Date().getTime();

    var database = firebase.database().ref("Projects/sample");

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);


    var storage = firebase.storage().ref("Projects" + "/" + "sample" + extension);
    var uploadTask = storage.put(file);

    uploadTask.on("state_changed",
        function progress(snapshot) {

            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#project-progress").html(percentage + "%");
            $("#project-progress").attr("style", "width:" + percentage + "%");


        },
        function error(err) {

        },

        function complete() {

            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                database.set(downloadURL, function(err) {
                    if (err) {
                        $("#result-project").attr("class", "alert alert-danger");
                        $("#result-project").html(err.message);

                    } else {
                        $("#result-project").attr("class", "alert alert-success");
                        $("#result-project").html("Sample Posted Successfully");


                    }
                    $("#spinner").removeClass("spinner-grow");
                    pr.style.display = "none";
                    $("#project")[0].reset();
                    $("#project-progress").html("Completed");
                })

            });
        });
})

var res = firebase.database().ref("Projects/");
res.on("value", function(r) {

    if (r.exists()) {
        var resHtml = "";

        r.forEach(function(re) {

            var user = re.key;

            var userData = firebase.database().ref("Projects/" + user);

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
                                    resHtml += "Active";
                                else if (result == "2")
                                    resHtml += "Accepted";
                                else if (result == "3")
                                    resHtml += "Rejected";
                                else if (result == "4")
                                    resHtml += "Processing";
                                else
                                    resHtml += "Completed";

                                resHtml += "</td>";
                                resHtml += "<td>";
                                resHtml += "<button id='accept' type='button' placeholder='Accept' class='btn btn-primary' onclick='funAccept(" + userID + "," + ide + ")'>Accept</button>";
                                resHtml += "</td>";
                                resHtml += "<td>";
                                resHtml += "<button id='pending' type='button' placeholder='Accept' class='btn btn-primary' onclick='funPending(" + userID + "," + ide + ")'>Pending</button>";
                                resHtml += "</td>";
                                resHtml += "<td>";
                                resHtml += "<button id='active' type='button' placeholder='Accept' class='btn btn-primary' onclick='funActive(" + userID + "," + ide + ")'>Active</button>";
                                resHtml += "</td>";
                                resHtml += "<td>";
                                resHtml += "<button id='process' type='button' placeholder='Accept' class='btn btn-primary' onclick='funProcessing(" + userID + "," + ide + ")'>Processing</button>";
                                resHtml += "</td>";
                                resHtml += "<td>";
                                resHtml += "<button id='complete' type='button' placeholder='Accept' class='btn btn-primary' onclick='funComplete(" + userID + "," + ide + ")'>Complete</button>";
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
                        $("#project-list").html(resHtml);

                    })
                    $("#spinner").removeClass("spinner-grow");
                    pr.style.display = "none";
                }
            })

        })
    }
});





function funAccept(user, id) {
    var db = firebase.database().ref("Projects/" + user);
    db.child(id).child("status").set("2", function(err) {
        if (err) {
            alert(err.message);
        } else {
            alert("Project Accepted !");
        }
    })
}

function funReject(user, id) {

    var db = firebase.database().ref("Projects/" + user);
    db.child(id).child("status").set("3", function(err) {
        if (err) {
            alert(err.message);
        } else {
            alert("Project Rejected !");
        }
    })

}

function funProcessing(user, id) {

    var db = firebase.database().ref("Projects/" + user);
    db.child(id).child("status").set("4", function(err) {
        if (err) {
            alert(err.message);
        } else {
            alert("Project is under development !");
        }

    })

}

function funPending(user, id) {
    var db = firebase.database().ref("Projects/" + user);
    db.child(id).child("status").set("0", function(err) {
        if (err) {
            alert(err.message);
        } else {
            alert("Project status set to Pending !");
        }
    })
}

function funActive(user, id) {
    var db = firebase.database().ref("Projects/" + user);
    db.child(id).child("status").set("1", function(err) {
        if (err) {
            alert(err.message);
        } else {
            alert("Project is made active !");
        }

    })


}

function funDownload(user, url) {

    window.open(url);

}

function funComplete(user, id) {
    var db = firebase.database().ref("Projects/" + user);
    db.child(id).child("status").set("5", function(err) {
        if (err) {
            alert(err.message);
        } else {
            alert("Project is Completed !");
        }
    })
}