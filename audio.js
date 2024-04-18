    document.onmousemove = function() {
        playAudio();
        document.onmousemove = null;
    };

    function playAudio() {
        var audio = document.getElementById('my_audio');
        audio.play();
    }