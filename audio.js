/*     document.onmousemove = function() {
        playAudio();
        document.onmousemove = null;
    };

    function playAudio() {
        var audio = document.getElementById('my_audio');
        audio.play();
    } */
/* 
    var audioPlayed = false;

document.onmousemove = function() {
    if (!audioPlayed) {
        playAudio();
        audioPlayed = true;
    }
};

function playAudio() {
    var audio = document.getElementById('my_audio');
    audio.play();
}
 */

/* var audioPlayed = false;
var context = null;

document.onmousemove = function() {
    if (!audioPlayed && isAutoplayAllowed()) {
        playAudio();
        audioPlayed = true;
    }
};

function isAutoplayAllowed() {
    // Verificar si el navegador permite la reproducción automática
    if (context === null) {
        context = new AudioContext();
    }
    return context.state === 'running';
}

function playAudio() {
    let audio = document.getElementById('my_audio');
    audio.play();
} */
