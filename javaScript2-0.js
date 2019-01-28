const container = document.createElement("div");
container.setAttribute("id", "container");
document.body.appendChild(container);
container.style.cssText = "width:720px; height:720px;border:solid 5px black;";
let firstGrid = 0;

function createGrid(blocks){
    gridBlocks = 0;
    let size = blocks;
    let length = 720/blocks;
    length +="px";
    for (let i = 0; i < size; i++){
        for (let j = 0; j < size; j++){
            let div = document.createElement("div");
            div.setAttribute("class", "blocks");
            div.style.cssText = `width:${length};height:${length};`;
            container.appendChild(div);
        }
    }
    if (firstGrid == 0){
        container.addEventListener(`${selMode}`, blackStyle);
        firstGrid = 1;
    }
}
function getRandomColor(){
    let letters = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6;i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getCustomColor(){
    let color = document.getElementById("customColor").value;
    return color;
}
function newGrid(){
    let gridSize = Number(prompt("How big grid do you want?"));
    if (gridSize == 0 ){
        while (container.firstChild){
            container.removeChild(container.firstChild);
        }
        createGrid(5);
    }else{
        while (container.firstChild){
            container.removeChild(container.firstChild);
        }
        createGrid(gridSize);
    }
}
function blackStyle(e){
    if (e.target.className == "blocks"){
        e.target.style.backgroundColor = "black";
        e.target.style.opacity = 1;
    }
}
function randomStyle(e){
    if (e.target.className == "blocks"){
        e.target.style.backgroundColor = getRandomColor();
        e.target.style.opacity = 1;
    }
}
function customStyle(e){
    if(e.target.className == "blocks"){
        e.target.style.backgroundColor = getCustomColor();
        e.target.style.opacity = 1;
    }
}
function darkenStyle(e){
    if (e.target.className == "blocks"){
        if (e.target.style.opacity == 1 && e.target.style.backgroundColor != "black"){
            e.target.style.opacity = 0.1;
            e.target.style.backgroundColor = "black";
        }else if (e.target.style.opacity < 1 && e.target.style.backgroundColor == "black"){
            e.target.style.opacity = (parseFloat(e.target.style.opacity) || 0) + 0.1;
        }else if (e.target.style.opacity < 1 && e.target.style.backgroundColor != "black"){
            e.target.style.backgroundColor = "black";
            e.target.style.opacity = (parseFloat(e.target.style.opacity) || 0) + 0.1;
        }
    }
}
const selection = document.getElementById("Mode");
let selMode = "mouseover";
let prevMode = "mouseover";
selection.onchange = function(event){
    prevMode = selMode;
    selMode = event.target.value;
    for (let i = 0; i < styles.length;i++){
        container.removeEventListener(`${prevMode}`, styles[i]);
    }
    container.addEventListener(`${selMode}`, currentStyle);
}
let currentStyle = blackStyle;
const styles = new Array(randomStyle, darkenStyle, blackStyle, customStyle);
const mode = document.querySelectorAll("div[class=mode]")[0].childNodes;
mode.forEach((button) =>{
    button.addEventListener("click", function(){
        if (button.id == "black"){
            currentStyle = blackStyle;
        }else if(button.id == "random"){
            currentStyle = randomStyle;
        }else if (button.id == "darken"){
            currentStyle = darkenStyle;
        }else if(button.id == "custom"){
            currentStyle = customStyle;
        }
        switch (button.id) {
            case "black":
                for (let i = 0; i < styles.legnth; i++){
                    container.removeEventListener(`${selMode}`,styles[i]);
                }
                container.addEventListener(`${selMode}`, blackStyle);
                break;
            case "random":
                for (let i = 0; i < styles.length; i++){
                    container.removeEventListener(`${selMode}`,styles[i]);
                }
                container.addEventListener(`${selMode}`, randomStyle);
                break;
            case "darken":
                for (let i = 0; i < styles.length; i++){
                    container.removeEventListener(`${selMode}`,styles[i]);
                }
                container.addEventListener(`${selMode}`, darkenStyle);
                break;
            case "custom":
                for (let i = 0; i < styles.length; i++){
                    container.removeEventListener(`${selMode}`, styles[i]);
                }
                container.addEventListener(`${selMode}`, customStyle);
                break;
            case "gridClear":
                const nodes = document.getElementById("container").childNodes;
                nodes.forEach(node =>{
                    node.style.backgroundColor = "transparent";
                    node.style.opacity = 1;
                })
                break;
            case "newGrid":
                newGrid();
                break;
        }
    })
})

createGrid(5);
