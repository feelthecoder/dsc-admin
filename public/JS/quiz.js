var addC = document.getElementById("myModal");
var value = document.getElementById("quiz-name");
var tech = "";
value.addEventListener("input", function() {
    tech = this.value;
    if (!tech) {
        $("#quiz-name").addClass("is-invalid");
        $("#result-quiz").removeClass("alert alert-success");
        $("#result-quiz").html("");
        return;
    } else {
        $("#quiz-name").removeClass("is-invalid");
        var technology = tech.toLowerCase().replace(" ", "").replace("#", "sharp").replace("++", "plusplus");

        $("#quiz-upload").click(function() {

            var techie = $("#quiz-name").val();
            if (!techie) {

                $("#quiz-name").addClass("is-invalid");
                window.alert("Please select technology");
                return;

            }
            $("#quiz-question").removeClass("is-invalid");
            $("#quiz-a").removeClass("is-invalid");
            $("#quiz-b").removeClass("is-invalid");
            $("quiz-c").removeClass("is-invalid");
            $("#quiz-d").removeClass("is-invalid");
            $("#quiz-correct").removeClass("is-invalid");




            var question = $("#quiz-question").val();
            var a = $("#quiz-a").val();
            var b = $("#quiz-b").val();
            var c = $("#quiz-c").val();
            var d = $("#quiz-d").val();
            var correct = $("#quiz-correct").val();

            if (!question) {
                $("quiz-question").addClass("is-invalid");
                return;
            }
            if (!a) {
                $("quiz-a").addClass("is-invalid");
                return;
            }
            if (!b) {
                $("quiz-b").addClass("is-invalid");
                return;
            }
            if (!c) {
                $("quiz-c").addClass("is-invalid");
                return;
            }
            if (!d) {
                $("quiz-d").addClass("is-invalid");
                return;
            }
            if (!correct) {
                $("quiz-correct").addClass("is-invalid");
                return;
            }


            $("#spinner").addClass("spinner-grow");

            var quizData = {
                "question": question,
                "option1": a,
                "option2": b,
                "option3": c,
                "option4": d,
                "correct_answer": correct


            };

            var data = firebase.database().ref("QuizData/QA/" + technology);
            data.push().set(quizData, function(err) {
                if (err) {
                    $("#result-quiz").attr("class", "alert alert-danger");
                    $("#result-quiz").html(err.message);

                } else {
                    $("#result-quiz").attr("class", "alert alert-success");
                    $("#result-quiz").html("Question Added Successfully");


                }

                $("#spinner").removeClass("spinner-grow")
                $("#quizy")[0].reset();
                $("#quiz-name").val("");
                $("#quiz-question").val("");
                $("#quiz-a").val("");
                $("#quiz-b").val("");
                $("#quiz-c").val("");
                $("#quiz-d").val("");
                $("#quiz-correct").val("");
                $("#res-q").html("");


            })
        })
    }
});

var li = firebase.database().ref("QuizData/Category/");

li.on("value", function(tra) {
    if (tra.exists()) {
        var resOption = "";

        tra.forEach(function(get) {

            resOption += "<option>";
            resOption += get.val().category;
            resOption += "</option>";
        })
        $("#re-text").html(resOption);
        $("#quiz-name").html(resOption);
        $("#category_id").html(resOption);
        $("#spinner").removeClass("spinner-grow");

    }
})


var val = document.getElementById("re-text");
var question = "";

val.addEventListener("input", function() {
    question = this.value;
    $("#res-q").html("");
    var technology = question.toLowerCase().replace(" ", "").replace("#", "sharp").replace("++", "plusplus");

    $("#spinner").addClass("spinner-grow");
    $("#re-text").removeClass("is-invalid");
    var dres = firebase.database().ref("QuizData/QA/" + technology + "/");

    if (!technology) {
        $("#re-text").addClass("is-invalid");
        $("#res-q").html("");
        $("#spinner").removeClass("spinner-grow");

        return;
    } else {
        dres.on("value", function(gets) {
            if (gets.exists()) {
                var resHtml = "";

                gets.forEach(function(re) {

                    var qid = "&#39;" + re.key + "&#39;";
                    var tech = "&#39;" + technology + "&#39;";
                    var teche = "&#39;" + question + "&#39;";


                    resHtml += "<tr>";
                    resHtml += "<td>";
                    resHtml += re.val().question;
                    resHtml += "</td>";
                    resHtml += "<td>";
                    resHtml += re.val().option1;
                    resHtml += "</td>";
                    resHtml += "<td>";
                    resHtml += re.val().option2;
                    resHtml += "</td>";
                    resHtml += "<td>";
                    resHtml += re.val().option3;
                    resHtml += "</td>";
                    resHtml += "<td>";
                    resHtml += re.val().option4;
                    resHtml += "</td>";
                    resHtml += "<td>";
                    resHtml += re.val().correct_answer;
                    resHtml += "</td>";
                    resHtml += "<td>";
                    resHtml += "<button id='remove' type='button' placeholder='Remove' class='btn btn-primary' onclick='funRemove(" + tech + "," + qid + ")'>Remove</button>";
                    resHtml += "</td>";
                    resHtml += "<td>";
                    resHtml += "<a href='#edit_section'><button id='edit' type='button' placeholder='Edit' class='btn btn-primary' onclick='funEdit(" + teche + "," + qid + ")'>Edit</button></a>";
                    resHtml += "</td>";
                    resHtml += "</tr>";
                })
                $("#res-q").html(resHtml);
                $("#spinner").removeClass("spinner-grow");
            } else {
                $("#res-q").html("");
                $("#spinner").removeClass("spinner-grow");
            }
        })

    }

})

question = $("re-text").val();
var technology = question.toLowerCase().replace(" ", "").replace("#", "sharp").replace("++", "plusplus");

var dres = firebase.database().ref("QuizData/QA/" + technology + "/");

dres.on("value", function(gets) {
    if (gets.exists()) {
        var resHtml = "";
        $("#re-text").removeClass("is-invalid");
        gets.forEach(function(re) {

            var qid = "&#39;" + re.key + "&#39;";
            var tech = "&#39;" + technology + "&#39;";
            var teche = "&#39;" + question + "&#39;";


            resHtml += "<tr>";
            resHtml += "<td>";
            resHtml += re.val().question;
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += re.val().option1;
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += re.val().option2;
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += re.val().option3;
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += re.val().option4;
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += re.val().correct_answer;
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += "<button id='remove' type='button' placeholder='Remove' class='btn btn-primary' onclick='funRemove(" + tech + "," + qid + ")'>Remove</button>";
            resHtml += "</td>";
            resHtml += "<td>";
            resHtml += "<a href='#edit_section'><button id='edit' type='button' placeholder='Edit' class='btn btn-primary' onclick='funEdit(" + teche + "," + qid + ")'>Edit</button></a>";
            resHtml += "</td>";
            resHtml += "</tr>";
        })
        $("#res-q").html(resHtml);
        $("#spinner").removeClass("spinner-grow");
    } else {
        $("#res-q").html("");
        $("#spinner").removeClass("spinner-grow");
    }
})

function funRemove(tech, qid) {

    document.getElementById('id01').style.display = 'block';
    $("#delete-btn").click(function() {
        var dres = firebase.database().ref("QuizData/QA/" + tech + "/" + qid);
        var question;
        dres.on("value", function(cats) {
            question = cats.val().question;
        });
        dres.remove();
        window.alert("Question is deleted from Question Bank and removed from app! You cannot recover that question. Deleted Question : " + question);
        document.getElementById('id01').style.display = 'none';
    })



    $("#cancel-btn").click(function() {
        document.getElementById("id01").style.display = 'none';
    })
}


window.onclick = function(event) {
    if (event.target == addC) {
        addC.style.display = "none";
        $("#category_id").val('');
        $("#quiz-questione").val('');
        $("#quiz-ae").val('');
        $("#quiz-be").val('');
        $("#quiz-ce").val('');
        $("#quiz-de").val('');
        $("#quiz-correcte").val('');
        $("#result-cate").val('');
        $("#cat-progresse").val('');
    }

}

function closeBox() {

    addC.style.display = "none";

    $("#category_id").val('');
    $("#quiz-questione").val('');
    $("#quiz-ae").val('');
    $("#quiz-be").val('');
    $("#quiz-ce").val('');
    $("#quiz-de").val('');
    $("#quiz-correcte").val('');
    $("#result-cate").val('');
    $("#cat-progresse").val('');
}

function funEdit(tech, qid) {

    addC.style.display = "block";
    $("#cat-progresse").html(" ");
    $("#cat-progresse").attr("style", "width:" + "0" + "%");
    $("#result-cate").html(" ");

    var technology = tech.toLowerCase().replace(" ", "").replace("#", "sharp").replace("++", "plusplus");
    var dres = firebase.database().ref("QuizData/QA/" + technology + "/" + qid);
    var question;
    var optionA;
    var optionB;
    var optionC;
    var optionD;
    var correctAnswer;


    dres.on("value", function(get) {
        question = get.val().question;
        optionA = get.val().option1;
        optionB = get.val().option2;
        optionC = get.val().option3;
        optionD = get.val().option4;
        correctAnswer = get.val().correct_answer;

    })

    $("#category_id").val(tech);
    $("#quiz-questione").val(question);
    $("#quiz-ae").val(optionA);
    $("#quiz-be").val(optionB);
    $("#quiz-ce").val(optionC);
    $("#quiz-de").val(optionD);
    $("#quiz-correcte").val(correctAnswer);

    $("#edit-question").one('click', function() {

        var techie = $("#category_id").val();
        if (!techie) {

            $("#category_id").addClass("is-invalid");
            window.alert("Please select technology");
            return;

        }
        $("#quiz-questione").removeClass("is-invalid");
        $("#quiz-ae").removeClass("is-invalid");
        $("#quiz-be").removeClass("is-invalid");
        $("quiz-ce").removeClass("is-invalid");
        $("#quiz-de").removeClass("is-invalid");
        $("#quiz-correcte").removeClass("is-invalid");




        var question = $("#quiz-questione").val();
        var a = $("#quiz-ae").val();
        var b = $("#quiz-be").val();
        var c = $("#quiz-ce").val();
        var d = $("#quiz-de").val();
        var correct = $("#quiz-correcte").val();

        if (!question) {
            $("quiz-questione").addClass("is-invalid");
            return;
        }
        if (!a) {
            $("quiz-ae").addClass("is-invalid");
            return;
        }
        if (!b) {
            $("quiz-be").addClass("is-invalid");
            return;
        }
        if (!c) {
            $("quiz-ce").addClass("is-invalid");
            return;
        }
        if (!d) {
            $("quiz-de").addClass("is-invalid");
            return;
        }
        if (!correct) {
            $("quiz-correcte").addClass("is-invalid");
            return;
        }

        var quizData = {
            "question": question,
            "option1": a,
            "option2": b,
            "option3": c,
            "option4": d,
            "correct_answer": correct

        };

        dres.set(quizData, function(err) {
            if (err) {
                $("#result-cate").attr("class", "alert alert-danger");
                $("#result-cate").html(err.message);

            } else {
                $("#result-cate").attr("class", "alert alert-success");
                $("#result-cate").html("Question Edited Successfully");


            }

            $("#category_id").val("");
            $("#quiz-questione").val("");
            $("#quiz-ae").val("");
            $("#quiz-be").val("");
            $("#quiz-ce").val("");
            $("#quiz-de").val("");
            $("#quiz-correcte").val("");
            $("#cat-progresse").html("Completed");
            $("#cat-progresse").attr("style", "width:" + "100" + "%");



        })
    })

}
$("#train-export").click(function() {
    $("#export-train").table2excel({
        filename: technology + "QuestionsBank.xls"
    });
})