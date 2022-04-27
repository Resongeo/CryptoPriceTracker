var request = new XMLHttpRequest()
var data

var list = document.querySelector("[data-list]")
var containers = []

var defaultRowNumber = 10

addEventListener("load", function(){

    createRows(defaultRowNumber)

    RefreshData()
})

function Update(){
    setInterval(RefreshData, 2000)
}

function RefreshData() {
    request = new XMLHttpRequest()
    request.open("GET", "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd", false)
    request.send(null)
    data = JSON.parse(request.responseText)

    containers.forEach((item, index) => {
        item.children[0].src = data[index].image
        item.children[1].innerHTML = data[index].name
        item.children[2].innerHTML = data[index].symbol.toUpperCase()
        item.children[3].innerHTML = "$" + data[index].current_price.toFixed(4)
        item.children[4].innerHTML = "Ft " + (data[index].current_price * 350).toFixed(4)
    })
}

function createRows(value){
    containers.forEach((item) => {
        item.remove()
    })
    
    containers = []
        
    for(var i = 0; i < value; i++){
        var row = document.createElement("div")
        var image = document.createElement("img")
        var name = document.createElement("span")
        var symbol = document.createElement("span")
        var usd = document.createElement("span")
        var huf = document.createElement("span")

        row.appendChild(image)
        row.appendChild(name)
        row.appendChild(symbol)
        row.appendChild(usd)
        row.appendChild(huf)

        row.classList.add("row")
        row.style.backgroundColor = i % 2 == 0 ? "rgb(30, 30, 32)" : "rgb(36, 36, 38)"

        list.appendChild(row)
        containers.push(row)
    }

    RefreshData()
}

Update()