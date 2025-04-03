var nbc = document.getElementById("nbCa");
var nbF = document.getElementById("nbFa");
var garden = document.getElementById("garden-map");

function makeGarden(){
    var ValueNbc = nbc.value;
    var ValueNbF = nbF.value;
    garden.innerHTML="";

    for(i=0;i<ValueNbc;i++){
        let plot = document.createElement("div");
        plot.classList.add("plot");

        for(j=0;j<ValueNbF;j++){
            let span = document.createElement("span");
            span.innerText= "🍅";
            plot.appendChild(span);
        }
        garden.appendChild(plot);
    }
    alert("🍅 Le jardin est là! 🍅");
}