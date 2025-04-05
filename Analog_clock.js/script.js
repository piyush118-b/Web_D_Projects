const body=document.querySelector("body");
const hourhand=document.querySelector(".hour");
const minutehand=document.querySelector(".minute");
const secondhand=document.querySelector(".second");
const modeswitch=document.querySelector(".mode_switch");
if(localStorage.getItem("mode")==="Dark Mode"){
    body.classList.add("dark");
    modeswitch.textContent="Light Mode";
}
modeswitch=document.addEventListener("click",()=>{
    body.classList.toggle("dark");
    const isdarkmode=body.classList.contains("dark");
    modeswitch.textContent=isdarkmode?"Light Mode":"Dark Mode";
    localStorage.setItem("mode",isdarkmode?"Dark Mode": "Light Mode");
})
const updatetime=()=>{
    let date=new Date();
    secToDeg=(date.getSeconds()/60)*360;
    minToDeg=(date.getMinutes()/60)*360;
    hrToDeg=(date.getHours()/12)*360;
    secondhand.style.transform=`rotate(${secToDeg}deg)`;
    minutehand.style.transform=`rotate(${minToDeg}deg)`;
    hourhand.style.transform=`rotate(${ hrToDeg}deg)`;
}
setInterval(updatetime,1000);
updatetime();