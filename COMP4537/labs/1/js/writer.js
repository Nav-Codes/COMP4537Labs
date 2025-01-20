if (typeof(Storage) === undefined) {
    document.getElementById("notes").innerHTML = localStoreNA
} else {
    const notesManager = new NotesManager()
    notesManager.initialize()
    document.getElementById("timeText").innerHTML = writerTime
}