var firebaseConfig = {
    apiKey: "AIzaSyCYWS7451XV0dZzU1sUBXMGY47wgXoi_fM",
    authDomain: "developer-student-club-22121.firebaseapp.com",
    databaseURL: "https://developer-student-club-22121.firebaseio.com",
    projectId: "developer-student-club-22121",
    storageBucket: "developer-student-club-22121.appspot.com",
    messagingSenderId: "868245345830",
    appId: "1:868245345830:web:a48d917876b5116289f8e7",
    measurementId: "G-XSBRCGNTVF"
};

firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL;



$("#btn-log").click(function() {

    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != "") {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);

        result.catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
        });
    } else {

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