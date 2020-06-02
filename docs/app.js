var logsEle = document.querySelector('#logs');
var currentValueEle = document.querySelector('#currentValue');
var valueEle = document.querySelector('#value');
var updateValueEle = document.querySelector('#updateValue');

function trace(text) {
    var log = text;
    if (window.performance) {
        var now = (window.performance.now() / 1000).toFixed(3);
        log = (now + ': ' + text);
    }
    var node = document.createElement('p');
    node.innerHTML = log;
    logsEle.appendChild(node);
}

async function updateValue() {
    var value = valueEle.value;
    trace('Updating value to: ' + value);
    loadCurrentValue();
}

async function loadCurrentValue() {
    trace('Getting current value from Ethereum contract');
    currentValueEle.innerHTML = valueEle.value;
}

function init() {
    trace('Initialize');

    updateValueEle.addEventListener('click', updateValue);
}

init();