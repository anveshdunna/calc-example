let buffer = '0';
let prevOperator = null;
let runningTotal = 0;
const screen = document.querySelector('.screen');

document.querySelector('.calc-buttons').addEventListener('click', function(event){
    buttonClick(event.target.innerText);

})

function buttonClick(value){
    if(value.length === 1) {
        if (isNaN(parseInt(value))) {
            handleSymbol(value);
        } else {
            handleNumber(value);
        }
        rerender();
    }    
}

function handleNumber(value){
    if (buffer === '0'){
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value){
    switch(value) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            prevOperator = null;
            break;
        case '←':
            if (buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '=':
            if (prevOperator === null){
                return;
            }
            afterMath(parseInt(buffer));
            prevOperator = null;
            buffer = '' + runningTotal;
            runningTotal = 0;
            break;
        default:
            handleMath(value);
            break;
    }   
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        afterMath(intBuffer);
    }

    prevOperator = value;
    buffer = '0';

}


function afterMath(intBuffer) {
    if (prevOperator === "+" ){
        runningTotal += intBuffer;
    } else if (prevOperator === '−'){
        runningTotal -= intBuffer;
    } else if (prevOperator === '×'){
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}
function rerender(){
    screen.innerText = buffer;

}