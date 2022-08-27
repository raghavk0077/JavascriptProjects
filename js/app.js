console.log("This is app.js");
showNotes();

//if user adds a note, add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addNote);
function addNote(){
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    let notesObj;
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let myNotesObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myNotesObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
}

// function for displaying the notes
function showNotes(){
    let notes = localStorage.getItem("notes");
    let notesObj;
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary dlBtn">Delete Note</button>
        </div>
      </div>`;
    });

    let notesElem = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElem.innerHTML = html;
    }
    else{
        notesElem.innerHTML = `Nothing to show! Use "Add Note" section to add a note`;
    }
}

// function for deleting a note
function deleteNote(index){
    // console.log("I am deleting ", index);

    let notes = localStorage.getItem("notes");
    let notesObj;
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


// for searching the required notes
let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", search);

function search(){
    let inputVal = searchTxt.value.toLowerCase();
    // console.log("Input val is fired", inputVal);
    let noteCards = document.getElementsByClassName("noteCard");

    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
}

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 