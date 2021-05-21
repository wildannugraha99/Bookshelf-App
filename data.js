const STORAGE_KEY = 'BOOKSHELF_APPS';

let bookShelf = [];

function ApaPenyimpananTersedia(){
    if(typeof(Storage)===undefined){
        alert('Browser Kamu Tidak Mendukung Penyimpanan Local Storage');
        return false;
    }
    return true;
}

function simpanData(){
    const parsed = JSON.stringify(bookShelf);
    localStorage.setItem(STORAGE_KEY,parsed);
    document.dispatchEvent(new Event('ondatasaved'));
}

function bacaData(){
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if(data !== null)
        bookShelf = data;

    document.dispatchEvent(new Event ('ondataloaded'));
}

function updateDataToStorage() {
    if(ApaPenyimpananTersedia())
    simpanData();
  }

  function composeBookShelfObject(datatitle, dataauthor, datayear, isCompleted) { 
      return{
          id: +new Date(),
          datatitle,
          dataauthor,
          datayear,
          isCompleted
         
      };
   }

   function findBookShelf(bookShelfId){
       for(bookshelf of bookShelf){
           if(bookshelf.id === bookShelfId)
           return bookshelf;
       }
       return null;
   }

   function findBookShelfIndex(bookShelfId){
        let index = 0
        for(bookshelf of bookShelf){
            if(bookShelf.id === bookShelfId)
            return index;
            index++;
        }

        return-1;
   }

   function refreshDataFromBookShelf(){
       const listBelumSelesai= document.getElementById(BELUM_SELESAI_BACA);
       let listSelesai= document.getElementById(SUDAH_SELESAI_BACA) ;

       for(bookshelf of bookShelf){
           const newBookShelf = makeBookShelf(bookshelf.datatitle, bookshelf.dataauthor, bookshelf.datayear, bookshelf.isCompleted);
            newBookShelf[BOOKSHELF_ITEMID] = bookshelf.id;

            if(bookshelf.isCompleted){
                listSelesai.append(newBookShelf);
            }else{
                listBelumSelesai.append(newBookShelf);
        }
        }
    }