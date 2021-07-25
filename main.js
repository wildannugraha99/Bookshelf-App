
const BELUM_SELESAI_BACA = "incompleteBookshelfList";
const SUDAH_SELESAI_BACA = "completeBookshelfList";

const BOOKSHELF_ITEMID = 'itemId'; 

function makeBookShelf(datatitle, dataauthor, datayear,isCompleted ){
    const textTitle = document.createElement("p");
    textTitle.classList.add('data-title')
    textTitle.innerText = datatitle;

    const textAuthor = document.createElement("p");
    textAuthor.classList.add('data-author')
    textAuthor.innerHTML= `<h4>Author: </h4><p>${dataauthor}</p>`;
    
    const textYear = document.createElement("p");
    textYear.classList.add('data-year')
    textYear.innerHTML = `<b>Tahun: </b>`+`<p>${datayear}</p>`;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textAuthor, textYear);
    
    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if(isCompleted){
        container.append(blmSelesaiButton());
        container.append(hapusButton());
       
    } else {
        container.append(selesaiButton());
        container.append(hapusButton());
      
    }
   
   return container ;
   
}

const checkbox = document.getElementById("inputChecked");
let check = false;

const submitButton = document.getElementById('bookSubmit');
submitButton.addEventListener('click', function(){
    if(checkbox.checked){
        check = true
        const selesai = document.getElementById(SUDAH_SELESAI_BACA);
        const bookTitle = document.getElementById("inputBookTitle").value;
        const bookAuthor = document.getElementById("inputBookAuthor").value;
        const bookYear = document.getElementById("inputBookYear").value;
        const addbookshelf = makeBookShelf(bookTitle,bookAuthor,bookYear,false);
        
        const bookshelfObject = composeBookShelfObject(bookTitle,bookAuthor,bookYear,true);
        addbookshelf[BOOKSHELF_ITEMID] = bookshelfObject.id;
        bookShelf.push(bookshelfObject);
            
            selesai.append(addbookshelf);
           updateDataToStorage();
            
    }else {
       
        const belumSelesai = document.getElementById(BELUM_SELESAI_BACA);
        const bookTitle = document.getElementById("inputBookTitle").value;
        const bookAuthor = document.getElementById("inputBookAuthor").value;
        const bookYear = document.getElementById("inputBookYear").value;
        const addbookshelf = makeBookShelf(bookTitle,bookAuthor,bookYear,false);
        
        const bookshelfObject = composeBookShelfObject(bookTitle,bookAuthor,bookYear,false);
        addbookshelf[BOOKSHELF_ITEMID] = bookshelfObject.id;
        bookShelf.push(bookshelfObject);
        
            belumSelesai.append(addbookshelf);
            updateDataToStorage();
            
    }
})



function addTaskToSelesaiBaca(taskElement){
    const selesaiBacaList = document.getElementById(SUDAH_SELESAI_BACA);
    
    const taskTitle = taskElement.querySelector('.data-title').innerText;
    const taskAuthor = taskElement.querySelector('.data-author > p').innerText;
    const taskYear = taskElement.querySelector('.data-year > p').innerText;
    
    const  bookShelf= makeBookShelf(taskTitle, taskAuthor, taskYear,true) ;
    const bookshelf = findBookShelf(taskElement[BOOKSHELF_ITEMID]);
    bookshelf.isCompleted = true;
   
    bookShelf[BOOKSHELF_ITEMID]=bookshelf.id;
    
    selesaiBacaList.append(bookShelf);
    taskElement.remove();
    updateDataToStorage();
    
}

function selesaiBacaButton(buttonTypeClass, eventListener){
    const button = document.createElement('button');
    button.innerText='Selesai di Baca';
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function(event){
        eventListener(event);
    });

    return button;
}

function selesaiButton(){
    return selesaiBacaButton("selesai-dibaca", function(event){
        addTaskToSelesaiBaca(event.target.parentElement);
        
    });
}

function addTaskToBelumSelesaiBaca(taskElement){
    const belumBacaList = document.getElementById(BELUM_SELESAI_BACA);
    const taskTitle = taskElement.querySelector('.data-title').innerText;
    const taskAuthor = taskElement.querySelector('.data-author > p').innerText;
    const taskYear = taskElement.querySelector('.data-year > p').innerText;
    
    
    const bookShelf= makeBookShelf(taskTitle,taskAuthor,taskYear,false);
    const bookshelf = findBookShelf(taskElement[BOOKSHELF_ITEMID]);
    bookshelf.isCompleted = false;
    
    bookShelf[BOOKSHELF_ITEMID]= bookshelf.id;
    
    belumBacaList.append(bookShelf);
    taskElement.remove()
    updateDataToStorage();
}


function blmSelesaiBacaButton(buttonTypeClass, eventListener){
    const button = document.createElement('button');
    button.innerText=' Belum di Baca';
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function(event){
        eventListener(event);
    });

    return button;
}

function blmSelesaiButton(){
    return blmSelesaiBacaButton("blm-selesai-dibaca", function(event){
        addTaskToBelumSelesaiBaca(event.target.parentElement);
       
   });
}


function konfirmasiHapus(taskElement){
   
    Swal.fire({
        title: 'Apakah yakin dihapus?',
        text: "Anda tidak akan dapat mengembalikan ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batalkan'
      }).then((result) => {
        
        if(result.isConfirmed) {
            const bookShelfPosition = findBookShelfIndex(taskElement[BOOKSHELF_ITEMID]);
            bookShelf.splice(bookShelfPosition, 4);
            taskElement.remove()
            updateDataToStorage();
            Swal.fire(
                'Dihapus!',
                'File Anda telah dihapus.',
                'success'
            )
            console.log('Data Dihapus')
        }
         
        
      })
    
  
    return true;
}
  

function deleteButton(buttonTypeClass, eventListener){ 
    const button = document.createElement('button');
    button.innerText='Hapus Buku';
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function(event){
        eventListener(event);
        
    });

    return button;
}
function hapusButton() {
    return deleteButton("hapus-button", function(event){
        konfirmasiHapus(event.target.parentElement);
    });
}


  





