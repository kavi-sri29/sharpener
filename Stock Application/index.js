var productPrice = document.querySelector("#productPrice");
var productName = document.querySelector("#productName");
var totalPrice = document.querySelector("#totalPrice");
var totalList = document.querySelector("#listContainer");
var totalSum = 0;

function addProduct(){
    var pPrice = productPrice.value;
    var pName = productName.value;
    
    totalSum = totalSum + Number(productPrice.value);
    totalPrice.innerHTML = `Total Stock Price : &#8377; ${totalSum}`;
    var listItem = document.createElement("li");
    listItem.className = "listyle";
    var pricespan = document.createElement("span");
    pricespan.innerText = pPrice;
    pricespan.className = "priceSpan";
    var nameSpan = document.createElement("span");
    nameSpan.innerText = pName;
    nameSpan.className = "nameSpan";
    
    
    var delbtn = document.createElement("button");
    delbtn.innerText = "Delete Product";
    delbtn.className="delbtn";
    delbtn.addEventListener("click" , (event) => deleteProduct(event));
    
    
    listItem.appendChild(pricespan);
    listItem.appendChild(nameSpan);
    listItem.appendChild(delbtn);
    
    
    totalList.appendChild(listItem);
    productPrice.value = productName.value = "";
    
    //Axios Server side implementation
    const data = {
        pPrice,
        pName 
    }
    axios.post('https://crudcrud.com/api/4615c1577efd44a5b8157b3e5ff5746a/addStockDetails',data)
    .then( (res) => {
        if(res.status == 201){
            showandhideToast("Product added successfully ","alert-success")
        }
    })
    .catch( (err) => console.log(err))
}

document.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/4615c1577efd44a5b8157b3e5ff5746a/addStockDetails')
    .then( (res) => {
        
            renderProductList(res.data)
        
        
    })
    .catch( (err) => console.log(err))
})


function deleteProduct(event){
    totalList.removeChild(event.target.parentElement);
    totalSum = totalSum - Number(event.target.parentElement.firstElementChild.innerText);
    totalPrice.innerHTML = `Total Stock Price : &#8377; ${totalSum}`;
    axios.delete(`https://crudcrud.com/api/4615c1577efd44a5b8157b3e5ff5746a/addStockDetails/${event.target.parentElement.id}`)
    .then( (res) => {
        if(res.status == 200){
            showandhideToast("Product deleted successfully ","alert-danger")
        }
    })
    .catch( (err) => console.error(err))
}





function renderProductList(dataList){
    for(let i=0;i<dataList.length;i++){
        const data = dataList[i];
    
        totalSum = totalSum + Number(data.pPrice);
        var listItem = document.createElement("li");
        listItem.className = "listyle";
        listItem.id = data._id;
        var pricespan = document.createElement("span");
        pricespan.innerText = data.pPrice;
        pricespan.className = "priceSpan";
        var nameSpan = document.createElement("span");
        nameSpan.innerText = data.pName;
        nameSpan.className = "nameSpan";
        
        
        var delbtn = document.createElement("button");
        delbtn.innerText = "Delete Product";
        delbtn.className="delbtn";
        delbtn.addEventListener("click" , (event) => deleteProduct(event));
        
        
        listItem.appendChild(pricespan);
        listItem.appendChild(nameSpan);
        listItem.appendChild(delbtn);
        
        
        totalList.appendChild(listItem);
}
totalPrice.innerHTML = `Total Stock Price : &#8377; ${totalSum}`;
 
}


function showandhideToast(msg,className){
    var toastMsg = document.querySelector("#toast");
    toastMsg.textContent = msg;
    toastMsg.classList.add(className)
    toastMsg.style.visibility = "visible";
    setTimeout( () => {
        toastMsg.style.visibility = "hidden";
        toastMsg.classList.remove(className);
    },5000)
}