var videoContainer = document.getElementById('videoContainer'),
    output = document.getElementById('output'),
    nextVideo,
    videoObjects =
    [
        document.createElement('video'),
        document.createElement('video')
    ],
    vidSources =
    [
        "SampleVideo_1280x720_1mb.mp4",
        "sample-20s.mp4",
        "file_example_MP4_1920_18MG.mp4"
    ],
   
    //random starting point
    nextActiveVideo = Math.floor((Math.random() * vidSources.length));

videoObjects[0].inx = 0; //set index
videoObjects[1].inx = 1;

initVideoElement(videoObjects[0]);
initVideoElement(videoObjects[1]);

videoObjects[0].autoplay = true;
videoObjects[0].src = vidSources[nextActiveVideo];
videoContainer.appendChild(videoObjects[0]);

videoObjects[1].style.display = 'none';
videoContainer.appendChild(videoObjects[1]);

function initVideoElement(video)
{
    video.playsinline = true;
    video.muted = false;
    video.preload = 'auto'; //but do not set autoplay, because it deletes preload

    //loadedmetadata is wrong because if we use it then we get endless loop
    video.onplaying = function(e)
    {
        output.innerHTML = 'Current video source index: ' + nextActiveVideo;

        //select next index. If is equal vidSources.length then it is 0
        nextActiveVideo = ++nextActiveVideo % vidSources.length;

        //replace the video elements against each other:
        if(this.inx == 0)
            nextVideo = videoObjects[1];
        else
            nextVideo = videoObjects[0];

        nextVideo.src = vidSources[nextActiveVideo];
        nextVideo.pause();
    };

    video.onended = function(e) {
        this.style.display = 'none';
        nextVideo.style.display = 'block';
        nextVideo.play();
    };

    function togglePlay() {
      if (video.paused || video.ended) {
        video.play();
        this.style.display="none"
      } else {
        //video.pause();
        this.style.display="none"
      }
    }

    document.querySelector('.plybtn').addEventListener("click", togglePlay);
}


