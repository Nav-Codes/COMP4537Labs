//class idea generated by chatGPT 
class NotesManager {
    //manages what notes there are by using local storage
    //will store array of note objects and update them

    static #localStorageMngr = new LocalStorageManager()

    /** stores Note objects as defined in note.js */
    static #notesArray = []

    constructor() {
        this.loadNotes()
        document.getElementById("add").addEventListener("click", () => {
            this.createNote()
        })
    }

    loadNotes() {
        // localStorage.removeItem("allNotes")
        let notes = NotesManager.#localStorageMngr.getFromLocalStorage()
        //notes is now an array of objects
        console.log(notes.length)
        for (let i = 0; i < notes.length; i++) {
            this.createNote(notes[i])
        }
        // this.addNotesToViewport()
    }

    createNote(noteObj = null) {
        NotesManager.#notesArray.push(new Note(noteObj, NotesManager.#notesArray.length))

        let index = NotesManager.#notesArray.length - 1
        let tempNote = NotesManager.#notesArray.at(index)

        //generated by chatGPT and modified
        tempNote.getNoteDiv().querySelector(".removeBtn").addEventListener("click", () => {
            this.deleteNote(tempNote)
        })

        // if (noteObj !== null) {

        // } else {

        // }
        // NotesManager.#localStorageMngr.addNote(noteObj !== null ? noteObj : {note : ""})

        document.getElementById("notes").insertAdjacentElement("afterbegin", tempNote.getNoteDiv())
        // this.loadEventListeners()
    }

    updateNotes(index) {
        // NotesManager.#notesArray.at(index)
        //get the text of the input field, create object and pass that obj to localStorageManager
        NotesManager.#localStorageMngr.updateLocalStorage(NotesManager.#notesArray)
    }

    deleteNote(noteObj) {
        noteObj.removeNoteDiv()

        let index = NotesManager.#notesArray.indexOf(noteObj)

        NotesManager.#notesArray.splice(index, 1)
        // NotesManager.#localStorageMngr.updateLocalStorage(NotesManager.#notesArray)
        NotesManager.#localStorageMngr.deleteNote(index)
    }
}



//structure of how it will be stored in local storage
//allNotes will be a string key
{
    allNotes: [
        { note: "" },
        { note: "" },
        { note: "" },
        { note: "" },
        { note: "" },
        { note: "" },
        { note: "" },
    ]
}