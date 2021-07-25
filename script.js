document.addEventListener("DOMContentLoaded", function () {
 const submitForm = document.getElementById("inputBook");
 submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
    });

    if(ApaPenyimpananTersedia()){
        bacaData();
    }
});

document.addEventListener('ondatasaved', () =>{
    
});

document.addEventListener('ondataloaded',() =>{
    refreshDataFromBookShelf();
});

