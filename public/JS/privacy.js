var pr = document.getElementById("spin");

$("#policy-upload").click(function() {
    $("#policy-file").removeClass("is-invalid");

    var validType = ["application/pdf"];


    var file = $("#policy-file").prop("files")[0];

    if (file == null) {
        $("#policy-file").addClass("is-invalid");
        return;
    }

    if ($.inArray(file["type"], validType) < 0) {
        $("#policy-file").addClass("is-invalid");
        return;
    }

    pr.style.display = "block";
    $("#spinner").addClass("spinner-grow")


    var database = firebase.database().ref("About/policy");

    var name = file["name"];
    var extension = name.substring(name.lastIndexOf("."), name.length);



    var storage = firebase.storage().ref("About/" + "policy" + extension);
    var uploadTask = storage.put(file);

    uploadTask.on("state_changed",
        function progress(snapshot) {

            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#policy-progress").html(percentage + "%");
            $("#policy-progress").attr("style", "width:" + percentage + "%");


        },
        function error(err) {

        },

        function complete() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                database.set(downloadURL, function(err) {
                    if (err) {
                        $("#result-policy").attr("class", "alert alert-danger");
                        $("#result-policy").html(err.message);

                    } else {
                        $("#result-policy").attr("class", "alert alert-success");
                        $("#result-policy").html("Privacy Policy Uploaded Successfully");


                    }
                    $("#spinner").removeClass("spinner-grow");
                    pr.style.display = "none";
                    $("#policy")[0].reset();
                    $("#policy-progress").html("Completed");
                });
            })
        })

})
var db = firebase.database().ref("About/policy");
db.on("value", function(about) {

    if (about.exists()) {
        var link = about.val();
        $("#pdf-embed").attr("src", link);
        $("#spinner").removeClass("spinner-grow")
        pr.style.display = "none";
    }


})