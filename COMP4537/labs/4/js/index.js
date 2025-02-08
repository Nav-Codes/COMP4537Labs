//to get definition of a word: https://king-prawn-app-7exk8.ondigitalocean.app/COMP4537/labs/4/api/definitions?word=apple
//to write meaning for new word: https://king-prawn-app-7exk8.ondigitalocean.app/COMP4537/labs/4/api/definitions

class Dictionary {
    static async writeNewMeaning() {
        event.preventDefault()
        document.getElementById("submitBtn").disabled = true

        let word = document.getElementById("word").value
        let meaning = document.getElementById("meaning").value

        let obj = {
            word: word,
            meaning: meaning
        }

        let jsonObj = JSON.stringify(obj)

        let dictionaryObj = {}
        //ChatGPT helped with generating the fetch request
        await fetch("https://king-prawn-app-7exk8.ondigitalocean.app/COMP4537/labs/4/api/definitions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonObj
        })
            .then(response => {
                dictionaryObj.statusCode = response.status
                return response.json()
            })
            .then(data => {
                dictionaryObj.data = data
            })

        console.log(dictionaryObj)
        DictionaryRenderer.renderWriteNewMeaning(dictionaryObj)

        document.getElementById("submitBtn").disabled = false
    }

    static async getMeaning() {
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
            .catch(error => {
                document.getElementById("submitBtn").disabled = false
            })
        DictionaryRenderer.renderMeaning(dictionaryObj)



        //after processing is done
        document.getElementById("submitBtn").disabled = false
    }
}

class DictionaryRenderer {
    static renderWriteNewMeaning(dictionaryObj) {
        switch (dictionaryObj.statusCode) {
            case 200: {

            }
            case 400: {

            }
            case 404: {

            }
            default: {

            }
        }
    }

    static renderMeaning(dictionaryObj) {
        switch (dictionaryObj.statusCode) {
            case 200: {
                let userMsg = getMeaningMsg

                userMsg = userMsg.replace("{reqNum}", dictionaryObj.data.num)
                userMsg = userMsg.replace("{word}", dictionaryObj.data.word)
                userMsg = userMsg.replace("{meaning}", dictionaryObj.data.meaning)

                document.getElementById("result").innerHTML = userMsg
                break
            }
            case 400: {
                document.getElementById("result").innerHTML = improperFormatMsg
                break
            }
            case 404: {
                let notFoundMsg = wordNotFound
                notFoundMsg = notFoundMsg.replace("{word}", dictionaryObj.data.word)
                document.getElementById("result").innerHTML = notFoundMsg
                break
            }
            default: {

            }

        }

    }
}