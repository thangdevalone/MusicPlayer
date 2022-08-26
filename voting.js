var point=Number(localStorage.getItem('voting')) || 0
const DOMpoint=document.querySelector(".point")
DOMpoint.innerHTML=point  
document.querySelector(".btn-voting").addEventListener("click", ()=>{
    point++;
    DOMpoint.innerHTML=point  
    localStorage.setItem("voting", JSON.stringify(point))
})