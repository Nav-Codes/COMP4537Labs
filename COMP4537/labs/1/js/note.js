//class idea generated by chatGPT 
class Note {
    //will create a text box that gets the note stored in local 
    //storage and populates the text box with that note
    
    // #key
    #textBox
    #removeBtn
    #noteDiv

    /** 
     * notesObj: object structoreed as {note : "abc123"}
     */
    constructor() {
        // this.#key = key
        
        this.#textBox = document.createElement("input")
        this.#textBox.classList.add("noteBox")

        this.#removeBtn = document.createElement("button")
        this.#removeBtn.innerHTML = "remove"
        this.#removeBtn.classList.add("removeBtn")

        this.#noteDiv = document.createElement("div")
        this.#noteDiv.classList.add("noteDiv")

        this.#noteDiv.insertAdjacentElement("beforeend", this.#textBox)
        this.#noteDiv.insertAdjacentElement("beforeend", this.#removeBtn)
        this.#noteDiv.insertAdjacentElement("beforeend", document.createElement("br"))

    }

    removeNoteDiv() {
        this.#noteDiv.remove()
    }

    getNoteDiv() {
        return this.#noteDiv
    }

    // getKey() {
    //     return this.#key
    // }

}
