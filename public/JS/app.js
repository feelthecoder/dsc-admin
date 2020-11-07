var firebaseConfig = {
    projectKeys: 'project data'
};
firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL;



$("#btn-log").click(function() {

    document.getElementById("progress-id").style.display = "block";


    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != "") {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);

        document.getElementById("progress-id").style.display = "none";
        result.catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorCode + " : " + errorMessage);
        });
    } else {
        document.getElementById("progress-id").style.display = "none";
        window.alert("Fill all fields.");
    }
});


function switchView(view) {
    $.get({
        url: view,
        cache: false,
    }).then(function(data) {
        $("#container").html(data);
    })
}