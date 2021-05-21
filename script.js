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
    console.log('Data Berhasil disimpan')
});

document.addEventListener('ondataloaded',() =>{
    refreshDataFromBookShelf();
});

