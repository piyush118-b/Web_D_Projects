let input=document.getElementById('inputbox');
let button=document.querySelectorAll('button');
let result="";
let arr=Array.from(button);
arr.forEach(button=>{
    button.addEventListener('click',(e)=>{
        if(e.target.innerHTML=='='){
            result=eval(result);
            input.value=result;
        }
        else if(e.target.innerHTML=='AC'){
            result="";
            input.value=result;
        }
        else if(e.target.innerHTML=='DEL'){
            result=result.substring(0,result.length-1);
            input.value=result;
        }
        else{
            result+=e.target.innerHTML;
            input.value=result;
        }
    })
})