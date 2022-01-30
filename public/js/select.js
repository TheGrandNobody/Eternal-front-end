var currencySelect = document.getElementByClassName("currency-select");
var selectText = document.getElementByClassName("select-text");
var options  = document.getElementsByClassName("token-list");

for(option of options) {
    option.onclick = function () {
        selectText.innerHTML = this.textContent;
    }
}