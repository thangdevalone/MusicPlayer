const volumeFeature= document.querySelector(".volume-feature")
const clickEffect=new Audio('./assets/Effect/click.ogg');
var songsStock=document.querySelectorAll(".songsStock")
const heart=document.querySelectorAll(".heart")
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
// heart.forEach(x=>{
//     x.addEventListener("click",()=>{
//         x.classList.toggle("heart-active")
//         clickEffect.play()
//     })
// })

songsStock.forEach((x,i)=>{
    x.addEventListener("click",()=>{
        x.classList.toggle("love")
        heart[i].classList.toggle("heart-active")
        clickEffect.play()
    })
})