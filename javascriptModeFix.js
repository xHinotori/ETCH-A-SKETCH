const mode = document.querySelectorAll("div[class=mode]")[0].childNodes;
const selection = document.getElementById("Mode");
const styles = new Array (randomStyle, darkenStyle, blackStyle);
let selMode = "mouseover";
let prevMode = "mouseover";
selection.onchange = function(event){
    prevMode = selMode;
    selMode = event.target.value;
    mode.forEach((button) =>{
        button.addEventListener("click", function(){
            switch (button.id) {
                case "black":
                    for (let i = 0; i < styles.legnth; i++){
                        container.removeEventListener(`${prevMode}`,styles[i]);
                    }
                    container.addEventListener(`${selMode}`, blackStyle);
                    break;
                case "random":
                    for (let i = 0; i < styles.length; i++){
                        container.removeEventListener(`${prevMode}`,styles[i]);
                    }
                    container.addEventListener(`${selMode}`, randomStyle);
                    break;
                case "darken":
                    for (let i = 0; i < styles.length; i++){
                        container.removeEventListener(`${prevMode}`,styles[i]);
                    }
                    container.addEventListener(`${selMode}`, darkenStyle);
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
}
