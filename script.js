let video = document.querySelector(".video")
let playbtn = document.querySelector("#play-btn");
let prograssBar = document.querySelector(".progress-bar");
let prograssRange = document.querySelector(".progress-range")

let speedControl = document.querySelector(".player-speed")
let playTime = document.querySelector(".time-elapsed")
let totalDuration = document.querySelector(".time-duration")
let fullScreenBtn = document.querySelector(".fullscreen")
let volumeController = document.querySelector(".volume-range")
let volumeBar = document.querySelector(".volume-bar")
let volumeIcon = document.querySelector("#volume-icon")

fullScreenBtn.addEventListener("click", toggleFullscreen)

function toggleFullscreen() {
  
    if (!document.fullscreenElement) {
      video.requestFullscreen()
    } else {
      video.exitFullscreen();
    }
  }

// video speed controll



video.defaultPlaybackRate = 1
speedControl.options.selected = speedControl.options.selectedIndex = 2;
var currentTime;
var duration;

let isVideoPlaying = false
let isVIdeoFullScreen

function videoPrograssControl(event){
    let calcWidth = prograssRange.getBoundingClientRect().width

    video.currentTime = (event.offsetX/calcWidth)* video.duration

}

function currentTimeUpdate(event){
    currentTime = event.target.currentTime;
    duration = event.target.duration
   
    prograssBar.style.cssText = `width: ${(currentTime/duration)*100}%`


    // display current play time and total duration

    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime - currentMinutes * 60);
    let durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration - durationMin * 60)

    playTime.innerHTML = `${currentMinutes}:${currentSeconds} / `
    totalDuration.innerHTML = `${durationMin}:${durationSec}`



    
}
var tottalVolume = volumeController.getBoundingClientRect().width;
var currentVolume = 50;


// adding volum control
volumeController.addEventListener("click", test)
function test(event){
  currentVolume = event.offsetX


  volumeBarReplace()
  video.volume = currentVolume/100
  console.log(video.volume)
  

}
function volumeBarReplace(){
     if(isVideoMuted){
         volumeBar.style.cssText = `width:0%`
     }else{
        volumeBar.style.cssText = `width: ${(currentVolume/tottalVolume)*100}%`
     }
}
volumeBarReplace()



// adding mute btn
var isVideoMuted =false
volumeIcon.addEventListener("click",()=>{
if(!isVideoMuted){
    video.muted = true
    isVideoMuted =  true
    volumeIcon.classList.replace("fa-volume-up","fa-volume-mute")
    volumeBarReplace()
  
   
}else{
    video.muted = false
    isVideoMuted = false
    volumeIcon.classList.replace("fa-volume-mute","fa-volume-up")
    volumeBarReplace()

}
console.log(video.muted)
})








// adding click event to btn
playbtn.addEventListener("click", videPlayOrPause)
video.addEventListener("click", videPlayOrPause)
// adding prograss bar
video.addEventListener("timeupdate", currentTimeUpdate)
// adding video progress controll
prograssRange.addEventListener("click", videoPrograssControl)

// adding play  back speed controll 
speedControl.addEventListener("click", ()=>{

    selectecSpeed = speedControl.options.selectedIndex


switch(selectecSpeed){
    case 0:
        video.playbackRate =0.5;
        break;
    case 1:
        video.playbackRate = 0.75
        break;
    case 2:
        video.playbackRate =1;
        break;
    case 3:
        video.playbackRate = 1.5
        break;
    case 4:
        video.playbackRate = 2
        break;

}

})




// adding play or pause action to spacebar on keybord
document.body.onkeyup = function(e){
    if(e.keyCode === 32){
        videPlayOrPause()
    }
}

function videPlayOrPause(){
    
    if(!isVideoPlaying){
        video.play()
        isVideoPlaying =true
        playbtn.classList.replace("fa-play","fa-pause")
    
    }else{
        video.pause()
        isVideoPlaying =false
        playbtn.classList.replace("fa-pause","fa-play")
    }
}



