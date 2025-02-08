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
            .catch(error => { })

        DictionaryRenderer.renderWriteNewMeaning(dictionaryObj, word)

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
            .catch(error => { })
        DictionaryRenderer.renderMeaning(dictionaryObj)

        //after processing is done
        document.getElementById("submitBtn").disabled = false
    }
}

class DictionaryRenderer {
    static renderWriteNewMeaning(dictionaryObj, word) {
        switch (dictionaryObj.statusCode) {
            case 200: {
                let success = successMsg

                success = success.replace("{reqNum}", dictionaryObj.data.requestNum)
                success = success.replace("{word}", word)
                success = success.replace("{dateTime}", dictionaryObj.data.date_string)
                success = success.replace("{numDict}", dictionaryObj.data.size_of_dict)

                document.getElementById("userMessage").innerHTML = success
            }
            case 400: {
                if (dictionaryObj.data === undefined) {
                    //poorly formatted
                    let badFormat = improperFormatMsg
                    badFormat = badFormat.replace("Request #{reqNum}<br>", "")
                    document.getElementById("userMessage").innerHTML = badFormat
                } else {
                    //word already exists
                    let alreadyExists = alreadyExistsMsg
                    alreadyExists = alreadyExists.replace("{reqNum}", dictionaryObj.data.requestNum)
                    alreadyExists = alreadyExists.replace("{word}", word)

                    document.getElementById("userMessage").innerHTML = alreadyExists
                }
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
                let improperFormat = improperFormatMsg
                improperFormat = improperFormat.replace("{reqNum}", dictionaryObj.data.num)
                document.getElementById("result").innerHTML = improperFormat
                break
            }
            case 404: {
                let notFoundMsg = wordNotFoundMsg
                notFoundMsg = userMsg.replace("{reqNum}", dictionaryObj.data.num)
                notFoundMsg = notFoundMsg.replace("{word}", dictionaryObj.data.word)
                document.getElementById("result").innerHTML = notFoundMsg
                break
            }
            default: {
                let error = errorMsg
                error = userMsg.replace("{reqNum}", dictionaryObj.data.num)
                error = error.replace("{errorCode}", dictionaryObj.statusCode)
            }
        }
    }
}