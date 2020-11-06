var firebaseConfig = {
    apiKey: "AIzaSyDy2YQ5WmYU8aXQA9Q8v75rLrjoA22SFxc",
    authDomain: "dsc-rec-bijnor.firebaseapp.com",
    databaseURL: "https://dsc-rec-bijnor.firebaseio.com",
    projectId: "dsc-rec-bijnor",
    storageBucket: "dsc-rec-bijnor.appspot.com",
    messagingSenderId: "925536166088",
    appId: "1:925536166088:web:31595f8648ae4f76c445fd",
    measurementId: "G-VG0TCQ0KV9"
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