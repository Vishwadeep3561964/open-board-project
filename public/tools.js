let toolsCont = document.querySelector(".tools-cont");
let optionscont = document.querySelector(".options-cont");  
let penciltoolcont = document.querySelector(".pencil-tool-cont");
let erasertoolcont = document.querySelector(".eraser-tool-cont");
let optionsFlag = true;

let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");

let pencilFlag = false;
let eraserFlag = false;

let sticky=document.querySelector(".sticky")
let upload=document.querySelector(".upload");


//here we will show if true
optionscont.addEventListener("click", (e) => {

    optionsFlag = !optionsFlag;

    if (optionsFlag) openTools();
    else closeTools();
})

function openTools() {
    let iconel = optionscont.children[0];
    iconel.classList.remove("fa-circle-xmark");
    iconel.classList.add("fa-bars");
    toolsCont.style.display = "flex";
}

function closeTools() {
    let iconel = optionscont.children[0];
    iconel.classList.add("fa-circle-xmark");
    iconel.classList.remove("fa-bars");
    toolsCont.style.display = "none";
    penciltoolcont.style.display = "none";
    erasertoolcont.style.display = "none";
}

pencil.addEventListener("click",(e) => {
    pencilFlag = !pencilFlag;

    if(pencilFlag) penciltoolcont.style.display = "block";
    else penciltoolcont.style.display = "none";
})

eraser.addEventListener("click",(e) => {
    eraserFlag = !eraserFlag;

    if(eraserFlag) erasertoolcont.style.display = "flex";
    else erasertoolcont.style.display = "none";
})

upload.addEventListener("click", (e) => {

    let input =document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change" , (e) => {

        let file = input.files[0];
        let url = URL.createObjectURL(file);
    
    let stickycont=document.createElement("div");
    stickycont.setAttribute("class","sticky-cont");
    stickycont.innerHTML = `  <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
    </div>
    <div class="note-cont">
   <img src="${url}"/>
   </div>
    `;
 document.body.appendChild(stickycont);

 let minimize = stickycont.querySelector(".minimize");
 let remove = stickycont.querySelector(".remove");
noteActions(minimize,remove,stickycont);


 stickycont.onmousedown = function(event) {
        draganddrop(stickycont,event);
 };

 element.ondragstart = function() {
    return false;
  }; 
}) 
})

// function createsticky(stickyTemplateHTML){
     
// }

sticky.addEventListener("click",(e) => {
    let stickycont=document.createElement("div");
    stickycont.setAttribute("class","sticky-cont");
    stickycont.innerHTML = `  <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
</div>
<div class="note-cont">
    <textarea>spellcheck="false" </textarea>
    `;
 document.body.appendChild(stickycont);

 let minimize = stickycont.querySelector(".minimize");
 let remove = stickycont.querySelector(".remove");
noteActions(minimize,remove,stickycont);


 stickycont.onmousedown = function(event) {
        draganddrop(stickycont,event);
 };

 element.ondragstart = function() {
    return false;
  };
}) 

function noteActions(minimize,remove,stickycont)
{
   remove.addEventListener("click", (e) => {
       stickycont.remove();
   })

   minimize.addEventListener("click", (e) => {
    let notecont = stickycont.querySelector(".note-cont");   
    let display = getComputedStyle(notecont).getPropertyValue("display");
    if(display === "none") notecont.style.display = "block";
    else notecont.style.display = "none";
   })
}

  function draganddrop(element,event)
  {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;

  
    moveAt(event.pageX, event.pageY);
  
    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the ball, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
  
  };
  
  

