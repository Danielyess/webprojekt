let display = document.getElementById("display");


var receivedData = 0;
receivedData = decodeURIComponent(window.location.search.split('=')[1]);


var id = 0;
var start = 0;
var lepesek = 0;
var eredmeny = 0;   
var finish = 0;

let level = 1;

    if(receivedData != "undefined")
    {
        level = receivedData
    }

var appendBs="";
var numFuncBs="";
var otherBs="";


function mentes(){
    window.location.href = "login.html?data=" + encodeURIComponent(level)
}

let button1 = document.getElementById("button1");
let button5 = document.getElementById("button5");
let button9 = document.getElementById("button9");
let button13 = document.getElementById("button13");
/*appendButtons*/

let button2 = document.getElementById("button2");
let button6 = document.getElementById("button6");
let button10 = document.getElementById("button10");
let button14 = document.getElementById("button14");
/*numericalButtons*/

let reverse = document.getElementById("button3");
let posNeg = document.getElementById("button7");
let sum = document.getElementById("button11");
let backspace = document.getElementById("button15");
/*functionButtons*/

let moves = document.getElementById("button4")
let goal = document.getElementById("button8") /*CSAK HOZZÁIRNI A SZÖVEGHEZ MAX*/
let levelNum = document.getElementById("button12")


function CLR(){
    loadLevel(level);
}

/*--------------------------------------------------------------------------------------*/

function initReverse(){
    reverse.disabled = false;
    reverse.textContent = "megfordit";
    reverse.classList.add("button_other");
}


reverse.onclick = function() {
    if(display.value[0] != "-") display.value = reverseString(display.value);
    else{
         const text = display.value.substring(1);
         display.value = "-"+reverseString(text);
    }
    lepesek--;
    updateLepesek();
}

/*--------------------------------------------------------------------------------------*/

function initposNeg(){
    posNeg.disabled = false;
    posNeg.textContent = "+/-";
    posNeg.classList.add("button_other");
}

posNeg.onclick = function() {
    if(display.value[0] != "-"){
        if(display.value != 0)display.value = "-" + display.value;
    }
    else display.value = display.value.substring(1); 
    lepesek--;
    updateLepesek();
}

/*--------------------------------------------------------------------------------------*/

function initSum(){
    sum.disabled = false;
    sum.textContent = "SUM";
    sum.classList.add("button_other");
}

sum.onclick = function() {
    if(display.value[0] != "-"){
        display.value = SUM(display.value)
    }
    else display.value = "-"+SUM(display.value.substring(1));
    lepesek--;
    updateLepesek();
}

/*--------------------------------------------------------------------------------------*/

function initBspc(){
    backspace.disabled = false;
    backspace.textContent = "<<";
    backspace.classList.add("button_other");
}

backspace.onclick = function(){
    if(display.value.length > 1)display.value = display.value.substring(0, display.value.length-1)
    lepesek--;
    updateLepesek();
}

/*--------------------------------------------------------------------------------------     */


function initAppBut(but, num){
    but.disabled = false;
    but.textContent = num;
    but.classList.add("button_append");
}

function initNumFuncButton(but, func){
    but.disabled = false;
    but.textContent = func;
    but.classList.add("button_NumFunc");
}



function initialize(){
    for(i=1; i<16;i++){
        if(i % 4 != 0)document.getElementById("button"+i).disabled = true;
    }
    if(level == 1) document.getElementById("perviouslevel").disabled = true;
    else document.getElementById("perviouslevel").disabled = false;
    document.getElementById("nextlevel").disabled = true;
    display.value = start;
    updateLepesek();
    goal.textContent = "Cél: "+ eredmeny;
    levelNum.textContent = id + ". szint";
    appends = appendBs.split(',');
    numFuncs = numFuncBs.split(',');
    others = otherBs.split(',');
    for(i = 0; i<4;i++){
        if(appends[i] != "null") initAppBut(document.getElementById("button"+(i*4+1)), appends[i]);
        if(numFuncs[i] != "null") initNumFuncButton(document.getElementById("button"+(i*4+2)), numFuncs[i]);
    }
    if(others[0] == 1) initReverse();
    if(others[1] == 1) initposNeg();
    if(others[2] == 1) initSum();
    if(others[3] == 1) initBspc();
}




function loadLevel(level){
    fetch("../php/level.php")
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                
                const levelData = data[level-1]; 
                
                id = levelData.id;
                lepesek = levelData.steps;
                eredmeny = levelData.goal;
                appendBs = levelData.append_buttons;
                numFuncBs = levelData.numFunc_buttons;
                otherBs = levelData.other_buttons;
                start = levelData.start;

                initialize();
            } else {
                console.error("No data or invalid data received.");
            }
        })
        .catch(error => {console.error("Error: " + error); level--; loadLevel(level); 
        document.getElementById("nextlevel").disabled = true;});
}





function numFunc(func){
    display.value = Math.floor(math.evaluate(display.value+func));
    lepesek--;
    updateLepesek();
}

function appendNum(num){
    display.value = display.value + num
    lepesek--;
    updateLepesek();
}

function reverseString(str) {
    var newString = "";
    var noGood = 0;
    for (var i = str.length - 1; i >= 0; i--) {
        if(str[i] != '0' || noGood != 0){
            newString += str[i];
            noGood++;
        }
    }
    return newString;
}

function SUM(str){
    var a = 0;
    for(i = 0;i<str.length;i++)
        a += parseInt(str[i]) 

    return a;
}

function updateLepesek(){
    moves.textContent = "Lépések: " + lepesek;
    if(display.value == eredmeny) {finish = 1, win()}
    if(lepesek == 0 && finish == 0){ alert("Ez igy nem jó, próbáld újra (CRL)"); gameOver();}
}

function gameOver(){
    for(i=1; i<16;i++){
            if(i % 4 != 0)document.getElementById("button"+i).disabled = true;
    }
}

function win(){
    display.value = display.value+("  ---   nyertél !!!!44!!");
    document.getElementById("nextlevel").disabled = false;
}

function nextLevel(){
    level++;
    for(i=1; i<16;i++){
        if(i % 4 != 0){
            document.getElementById("button"+i).disabled = true;
            document.getElementById("button"+i).classList.remove("button_other");
            document.getElementById("button"+i).classList.remove("button_append");
            document.getElementById("button"+i).classList.remove("button_NumFunc");
        }
    }
    loadLevel(level);
}

function perviousLevel(){
    level--;
    for(i=1; i<16;i++){
        if(i % 4 != 0){
            document.getElementById("button"+i).disabled = true;
            document.getElementById("button"+i).classList.remove("button_other");
            document.getElementById("button"+i).classList.remove("button_append");
            document.getElementById("button"+i).classList.remove("button_NumFunc");
        }
    }
    loadLevel(level);
}
