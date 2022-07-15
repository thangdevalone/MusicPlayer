const volumeFeature= document.querySelector(".volume-feature")


volumeFeature.addEventListener("click", (e)=>{
    if(volumeFeature.classList.contains("volume-animation-in") && e.target.tagName!=="INPUT"){
        volumeFeature.classList.remove("volume-animation-in")
        volumeFeature.classList.add("volume-animation-out")
    }
    else{
        volumeFeature.classList.remove("volume-animation-out")
        volumeFeature.classList.add("volume-animation-in")
    }
})