// const numberOne = document.getElementById("numberOne").value;
// const numberTwo = document.getElementById("numberTwo").value;

// document.getElementById("algo").addEventListener("click", function(){
//     document.getElementById("resultado").innerText = ""
//     const suma = parseInt(numberOne) + parseInt(numberTwo);
//     document.getElementById("resultado").innerText = suma;
// })

document.getElementById("principal").addEventListener("click", ()=>{
    document.getElementById("principal").classList.add("hidden")
    document.getElementById("secundario").classList.remove("hidden")
    document.getElementById("container").innerHTML = ` 
    <div class="container bg-red-100 hover:bg-red-400 w-full h-64 rounded-xl hover:cursor-pointer">
    </div>`
})

document.getElementById("secundario").addEventListener("click", ()=>{
         document.getElementById("secundario").classList.add("hidden")
    document.getElementById("principal").classList.remove("hidden")
    document.getElementById("container").innerHTML = ``
})
