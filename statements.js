Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:99
});

    camera = document.getElementById("camera");

    Webcam.attach("camera");

function startClassification()
{
    Webcam.snap(function(data_url)
    {
        document.getElementById("result").innerHTML = "<img id = 'captured_image' src = '" + data_url + "'>";
    })
}

console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1ksYTNDoI/model.json", modelLoaded);

function modelLoaded() 
{
    console.log("Model Loaded");
}

function speak()
{
    synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is " + prediction_1;
    speak_data_2 = "The Second Prediction is " + prediction_2;
    speakThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(speakThis);  
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

okay_emoji = "&#128077;";
decline_emoji = "&#128078;";
amazing_emoji = "&#128076;";
victory_emoji = "&#9996;";

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_gesture1").innerHTML = results[0].label;
        document.getElementById("result_gesture2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if((results[0].label) == "Okay")
        {
            document.getElementById("result_gesture1").innerHTML = "Okay (" + okay_emoji + ")";
        }
        if((results[0].label) == "Victory")
        {
            document.getElementById("result_gesture1").innerHTML = "Victory (" + victory_emoji + ")";
        }
        if((results[0].label) == "Decline")
        {
            document.getElementById("result_gesture1").innerHTML = "Decline (" + decline_emoji + ")";
        }
        if((results[0].label) == "Amazing")
        {
            document.getElementById("result_gesture1").innerHTML = "Amazing (" + amazing_emoji + ")";
        }

        if((results[1].label) == "Okay")
        {
            document.getElementById("result_gesture2").innerHTML = "Okay (" + okay_emoji + ")";
        }
        if((results[1].label) == "Victory")
        {
            document.getElementById("result_gesture2").innerHTML = "Victory (" + victory_emoji + ")";
        }
        if((results[1].label) == "Decline")
        {
            document.getElementById("result_gesture2").innerHTML = "Decline (" + decline_emoji + ")";
        }
        if((results[1].label) == "Amazing")
        {
            document.getElementById("result_gesture2").innerHTML = "Amazing (" + amazing_emoji + ")";
        }
    }
}