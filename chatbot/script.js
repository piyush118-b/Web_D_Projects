const messageinput=document.querySelector(".messageinput");
const chatbotbody=document.querySelector(".chatbotbody");
const sendmessagebutton=document.querySelector("#sendmessage");
const fileinput=document.querySelector("#fileinput");
const fileuploadwrapper=document.querySelector(".fileuploadwrapper");
const filecanclebutton=document.querySelector("#filecancle");
const APIkey="AIzaSyAweGOGC2ewXIyRuQ-mGDNoPPyQkyMoOf0";
const apiURL=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${APIkey}`;
const userdata={
    message:null,
    file:
    {
        data:null,
        mime_type:null
    }
}
const generateresponse= async(incomingdiv)=>{
    const messageElement= incomingdiv.querySelector(".messagetext");
    const requestOptions={
        method:"POST",
        headers:{ 
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "contents": [{
                parts:[{text: userdata.message},...(userdata.file.data ? [{ "inline_data": userdata.file}]:[])]
                }]
        })
    }
    try{

        const response=await fetch(apiURL,requestOptions);
        const data=await response.json();
        if(!response.ok) throw new Error(data.error.message);
        const apiresonse=data.candidates[0].content.parts[0].text.trim();
        messageElement.innerText=apiresonse;
    }
    catch(error){
        messageElement.innerText=error.message;
        messageElement.style.color="#ff0000";
        console.log(error);
    }finally{
        // to reset the data
        userdata.file={};
        chatbotbody.scrollTop = chatbotbody.scrollHeight;
        incomingdiv.classList.remove("think");
    }
}
const createmessageelement=(con,classes)=>{
    const div=document.createElement("div");
    div.classList.add("message",classes);
    div.innerHTML=con;
    return div;
}
const handleOutgoingMessage=(e)=>{
    e.preventDefault();
    userdata.message=messageinput.value.trim();
    
    messageinput.value="";
    
    fileuploadwrapper.classList.remove("fileupload");
    const content=`<div class="messagetext"></div> ${userdata.file.data?`<img src="data:${userdata.file.mime_type};base64,${userdata.file.data}" class="attachment"    />`:""}`;
    const outgoingdiv=createmessageelement(content,"usermessage");
    outgoingdiv.querySelector(".messagetext").textContent=userdata.message;
    chatbotbody.appendChild(outgoingdiv);
    chatbotbody.scrollTop = chatbotbody.scrollHeight;

    setTimeout(()=>{
    const content=`<svg class="avt" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                </svg>
                <div class="messagetext">
                    <div class="thinkingindicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`;
    const incomingdiv=createmessageelement(content,"botmessage");
    chatbotbody.appendChild(incomingdiv);
    chatbotbody.scrollTop = chatbotbody.scrollHeight;
    generateresponse(incomingdiv);
    },600);
}
messageinput.addEventListener("keydown",(e)=>{
    const usermessage=e.target.value.trim();
    if(e.key==="Enter"&& usermessage){
        handleOutgoingMessage(e);
    }
});
sendmessagebutton.addEventListener("click",(e)=>{
    handleOutgoingMessage(e);
})
fileinput.addEventListener("change",()=>{
    const file=fileinput.files[0];
    if(!file) return;
    const reader=new FileReader();
    reader.onload=(e)=>{
        fileuploadwrapper.querySelector("img").src=e.target.result;
        fileuploadwrapper.classList.add("fileupload");
        const base64String=e.target.result.split(",")[1];
        userdata.file ={
            data:base64String,
            mime_type:file.type
        }
        fileinput.value="";

    }
    reader.readAsDataURL(file);
})
filecanclebutton.addEventListener("click",()=>{
    userdata.file={};
    fileuploadwrapper.classList.remove("fileupload");

})
const picker = new EmojiMart.Picker({
    categories:"frequent people nature foods activity places objects symbols flags",
    // [frequent, ],
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (e)=>{
        const { selectionStart: start, selectionEnd: end }= messageinput;
        messageinput.setRangeText(e.native, start, end ,"end");
        messageinput.focus();
    },
    onClickOutside: (e)=>{
        if(e.target.id==="emojipicker"){
            document.body.classList.toggle("showemojipicker");
        }else{
            document.body.classList.remove("showemojipicker");
        }
    },
});
document.querySelector(".chatform").appendChild(picker); 

document.querySelector("#fileupload").addEventListener("click",()=> fileinput.click()
)