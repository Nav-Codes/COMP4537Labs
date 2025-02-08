//to get definition of a word: https://king-prawn-app-7exk8.ondigitalocean.app/COMP4537/labs/4/api/definitions?word=apple
//to write meaning for new word: https://king-prawn-app-7exk8.ondigitalocean.app/COMP4537/labs/4/api/definitions

//will just get text saying that everything is ok after sending
function writeNewMeaning() {
    event.preventDefault()
    document.getElementById("submitBtn").disabled = true

    let word = document.getElementById("word").value
    let meaning = document.getElementById("meaning").value

    let obj = {
        word : word,
        meaning : meaning
    }

    let jsonObj = JSON.stringify(obj)

    let dictionaryObj = {}
    //ChatGPT helped with generating the fetch request
    fetch("https://king-prawn-app-7exk8.ondigitalocean.app/COMP4537/labs/4/api/definitions", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body : jsonObj
    })
    .then(response => {
        // console.log(response)
        dictionaryObj.statusCode = response.status
        return response.json()
    })
    .then(data => {
        dictionaryObj.data = data
    })

    console.log(dictionaryObj)

    document.getElementById("submitBtn").disabled = false
    
    
    //send as urlencoded
    // let response = sendRequest("POST", "https://king-prawn-app-7exk8.ondigitalocean.app/COMP4537/labs/4/api/definitions", jsonObj)
}

//will get res object 
async function getMeaning() {
    event.preventDefault()
    document.getElementById("submitBtn").disabled = true

    let word = document.getElementById("word").value

    let dictionaryObj = {}

    await fetch(`https://king-prawn-app-7exk8.ondigitalocean.app/COMP4537/labs/4/api/definitions?word=${word}`, {
        method: "GET"
    })
    .then(response => {
        dictionaryObj.statusCode = response.status
        return response.json()
    })
    .then(data => {
        dictionaryObj.data = data
    })
    .catch(error => {})
    console.log(dictionaryObj)
    renderMeaning(dictionaryObj)

    

    //after processing is done
    document.getElementById("submitBtn").disabled = false
}

function renderMeaning(dictionaryObj) {

    switch(dictionaryObj.statusCode) {
        case 200 : {
            let userMsg = getMeaningMsg
            
            userMsg = userMsg.replace("{reqNum}", dictionaryObj.data.num)
            userMsg = userMsg.replace("{word}", dictionaryObj.data.word)
            userMsg = userMsg.replace("{meaning}", dictionaryObj.data.meaning)
    
            document.getElementById("result").innerHTML = userMsg
            break
        }
        case 400 : {
            document.getElementById("result").innerHTML = improperFormatMsg
            break
        }
        case 404 : { 
            document.getElementById("result").innerHTML = wordNotFound
            break
        }
        default : {
            
        }

    }

}

