let level = 1;

function addButtons(str) {
    var container = document.getElementById('container');

        var button = document.createElement('button');
        button.innerHTML = str;
        button.onclick = function() {
            window.location.href = "../html/jatek.html?data=" + encodeURIComponent(str);
        };

        container.appendChild(button);
}



function loadLevels(){
    fetch("../php/level.php")
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                

                do{
                    const levelData = data[level-1]; 
                    if(levelData.id > -1)addButtons(level)
                    else break;
                    level++;
                }while(true)

            }
        })
        .catch(error => console.error("Error: " + error));
}

