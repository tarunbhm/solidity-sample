const logsEle = document.querySelector('#logs');
const currentValueEle = document.querySelector('#currentValue');
const valueEle = document.querySelector('#value');
const updateValueEle = document.querySelector('#updateValue');

let web3, contract;

async function ethEnable() {
    trace('Request connection from metamask');
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        return true;
    }
    return false;
}

async function createContract() {
    trace('Creating contract to talk to');
    const abi = await $.getJSON('SimpleStorage.json');
    const ropstenContractAddress = '0x856d87a1232e0ae722b4adc995a33117eb189c8b';
    const ganacheContractAddress = '0x372d41729064923f6c4e786AE5FfC5DdD8A2D49E';
    contract = new web3.eth.Contract(abi, ropstenContractAddress);
}

function trace(text) {
    let log = text;
    if (window.performance) {
        const now = (window.performance.now() / 1000).toFixed(3);
        log = (now + ': ' + text);
    }
    const node = document.createElement('p');
    node.innerHTML = log;
    logsEle.appendChild(node);
}

async function updateValue() {
    const value = valueEle.value;
    trace('Updating value to: ' + value);
    trace('Please wait while transaction is confirmed and new values is loaded. It may take upto 1 minute');
    const updated = await contract.methods.set(value).send({from: web3.givenProvider.selectedAddress});
    await loadCurrentValue();
}

async function loadCurrentValue() {
    trace('Getting current value from Ethereum contract');
    const value = await contract.methods.get().call();
    console.log("got value ", value);
    currentValueEle.innerHTML = value;
}

async function init() {
    trace('Initialize');
    const enabled = await ethEnable();
    if (!enabled) {
        trace('Please install metamask to use this app');
    }

    await createContract();

    await loadCurrentValue();

    updateValueEle.addEventListener('click', updateValue);
}

init();