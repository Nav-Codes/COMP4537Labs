if (typeof (Storage) === undefined) {
    document.getElementById("notes").innerHTML = localStoreNA
} else {
    const notesManager = new NotesManager()
    notesManager.initialize()
    document.getElementById("timeText").innerHTML = readerTime

    //check if local storage size has changed if it did, update reader page
    window.addEventListener("storage", () => {
        notesManager.updateReader()
    })
}