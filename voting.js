const api="https://6308f3a0722029d9dddc15b7.mockapi.io/api/v1/voting"
const voting=document.querySelector(".voting")
const votingi= document.querySelector(".voting i")
const votingSpan=document.querySelector(".voting span")
var dataStar=0
var isVoted=Boolean(Number(localStorage.getItem("voting"))) || false;
getVoting()
if(isVoted){
    votingi.classList.toggle("activeStar")
    votingSpan.classList.toggle("activeStar")
}


//fetch
function getVoting(){
    fetch(api)
    .then((response) => response.json())
    .then((data) => loader(data));
}

function loader(data) {
    var numberOfPersons=document.querySelector(".num--people__rated")
    numberOfPersons.innerHTML =data[0].voting
    dataStar=data[0].voting
}
function updateVoting(){
    fetch(api+'/1', {
        method: 'PUT',
        body: JSON.stringify({
        voting: dataStar,
    }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
  .then((response) => response.json())
  .then((json) => getVoting());
}
const giftStarEffect=new Audio("./assets/Effect/GiftStar.ogg")

voting.addEventListener("click",()=>{
    votingi.classList.toggle("activeStar")
    votingSpan.classList.toggle("activeStar")

    if(isVoted){
        dataStar--;
        isVoted=false;
        updateVoting()
    } else
    {
        voting.classList.add("btn-pointer")
        setTimeout(()=>{
            voting.classList.remove("btn-pointer")

        },5000)
        giftStarEffect.play();
        isVoted=true;
    
        anime({
            targets: '.star',
            direction: 'alternate',
            translateY: {
              value: -100,
              duration: 800
            },
            translateX: {
                value: 50,
                duration: 800
            },
           
            rotate: {
              value: 360,
              duration: 1800,
              easing: 'easeInOutSine'
            },
            scale: {
              value: 2,
              duration: 1600,
              delay: 800,
              easing: 'easeInOutQuart'
            },
            delay: 200, // All properties except 'scale' inherit 250ms delay
          });
        dataStar++;
        updateVoting()
    }
    localStorage.setItem("voting",Number(isVoted));
    console.log(dataStar)
})
