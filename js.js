let addInputBtn = document.querySelector('.add-input');
let mainContainer = document.querySelector('.container');

addInputBtn.addEventListener('click', function(){
    createElement();
})

function createElement(){
    mainContainer.insertAdjacentHTML("afterbegin", 
    `<div class="container-wrapper">
    <div class="container-input">
    <input type="text" class="input" placeholder="Writte in Data" name="name" data-msg="notEmpty">
        <span class="msg"></span>
        <button class="delite">Delite</button>
    </div>
    </div>`)
}
const input = document.querySelector('.container-wrapper');
let deliteBtn = document.querySelector('.delite');

mainContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('delite')){
        const target = e.target.closest('.container-wrapper');
        target.remove();
    }
})
let saveBtn = document.querySelector('.button');
saveBtn.addEventListener('click', function(e){
    validateInput(e.target)
})
const msgInput = {
    name: {
        msg: 'Fill the fild!!'
    }
}
const sendData = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });  
    if (!response.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    }  
    return await response.json();
}
function validateInput(link){
    const inputList = document.querySelectorAll('.container-input');
    const allData = []
    inputList.forEach(item=>{
        const dataObj = {}
        item.querySelectorAll('.input').forEach(elem=>{
            let fromMsg = msgInput[elem.name];
            let msg = elem.nextElementSibling;
            if(elem.value.trim() === ''){
                elem.classList.add('error-valid');
                msg.textContent = fromMsg.msg;
            }else{
                elem.classList.remove('error-valid');
                msg.textContent = '';
                dataObj[elem.name] = elem.value;
            }
            allData.push(dataObj);
        })
    })
    const forma = new FormData()
    forma.set('info' , JSON.stringify(allData))
    sendData('http://12312312312' , forma)
}




