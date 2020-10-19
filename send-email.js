import { createTransport } from 'nodemailer';



var transporter = createTransport({
    service: 'gmail',
    auth: {
        user: 'events.dscrecbijnor@gmail.com',
        pass: 'ncbcgcghggh@r4_67984'
    }
});

$("#send-mail").click(function() {


    $("#res-text").removeClass("is-invalid");
    $("#email").removeClass("is-invalid");
    $("#subject").removeClass("is-invalid");
    $("#questions").removeClass("is-invalid");


    var name = $("#res-text").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var questions = $("#questions").val();

    if (!name) {
        $("#res-text").addClass("is-invalid");
        return;
    }
    if (!email) {
        $("#email").addClass("is-invalid");
        return;
    }
    if (!subject) {
        $("#subject").addClass("is-invalid");
        return;
    }
    if (!questions) {
        $("#questions").addClass("is-invalid");
        return;
    }


    var mailOptions = {
        from: 'events.dscrecbijnor@gmail.com',
        to: email,
        subject: 'Thank You for donation , Interview Questions by Developer Student Club, Bijnor',
        text: questions
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
            console.log(info)
        } else {
            window.alert("Questions Sent:" + info);
            console.log(info + error)
        }
    });
})