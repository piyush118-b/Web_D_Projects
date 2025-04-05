const slidertab=document.querySelectorAll(".tab");
const sliderindicator=document.querySelector(".sliderindicator");
const slidercontrol=document.querySelector(".slidercontrol");
const updatepagination=(tab,index)=>{
    sliderindicator.style.transform =`translateX(${tab.offsetLeft-20}px)`;
    sliderindicator.style.width= `${tab.getBoundingClientRect().width}px`;
    const scrollLeft=slidertab[index].offsetLeft - slidercontrol.offsetLeft / 2 +slidertab[index].offsetWidth / 2;
    slidercontrol.scrollTo( { left: scrollLeft,behavior: "smooth"});
}

const swiper=new Swiper(".slidercontainer",{
    effect: "fade",
    speed: 1300,
    autoplay: { delay:4000 },
    navigation:{
        prevEl: "#slideprev",
        nextEl: "#slidenext"
    },
    on: {
        slidechange: () => {
            const currtab = [...slidertab].indexOf(slidertab[swiper.activeIndex]);
            updatepagination(slidertab[swiper.activeIndex],currtab);
        }
    },
    reachEnd: ()=> swiper.autoplay.stop(),
    
})
slidertab.forEach((tab,index)=>{
    tab.addEventListener("click",()=>{
        swiper.slideTo(index);
        updatepagination(tab,index);
    });
});
updatepagination(slidertab[0],0);
window.addEventListener("resize",()=>updatepagination(slidertab[swiper.activeIndex],0)
);