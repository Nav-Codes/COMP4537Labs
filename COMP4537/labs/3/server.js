const http = require('http');
const url = require('url')
const utils = require("./modules/utils")

class ServerManager {
    static #server
    static #portNum

    /** Creates the server and lists all the different endpoints of this server */
    constructor(portNum) {
        ServerManager.#portNum = portNum

        ServerManager.#server = http.createServer((req, res) => {
            if (req.method === "GET") {
                
                //generated by ChatGPT and modified. 
                //when true, the switch/case handler will check each case to see if it is true
                switch (true) {
                    case req.url.includes("/getDate?name=") : {
                        ServerManager.#getDateAndName(req, res)
                        break
                    }
                    case req.url.includes("/readFile?fileName=") : {
                        ServerManager.#readFromFile(req, res)
                        break
                    }
                    case req.url.includes("/writeFile?text=") : {
                        ServerManager.#writeToFile(req, res)
                        break
                    }
                    default : {
                        ServerManager.#wrongEndpoint(req, res)
                    }
                }
            }
        })
        
        ServerManager.#launchServer()
    }

    static #launchServer() {
        ServerManager.#server.listen(ServerManager.#portNum, () => {
            console.log(`Server listening on port ${ServerManager.#portNum}`)
        })
    }

    static #getDateAndName(req, res) {
        const parsedUrl = url.parse(req.url, true); // `true` makes it parse query params into an object
        const queryParams = parsedUrl.query; // extract the query params and stores them into an object 

        const nameAndDate = utils.NameAndDatetime.getNameAndDate(queryParams.name)

        res.writeHead(200, {"content-type" : "text/html"})
        res.end(`<p style='color:blue;'>${nameAndDate}</p>`)
    }

    static #readFromFile(req, res) {
        //gets the file name stored in the url param named "fileName"
        const fileName = url.parse(req.url, true).query.fileName
        
        //stores file contents
        const fileContents = utils.FileManager.getFileContents(fileName)

        if (!fileContents) {
            res.writeHead(404, {"content-type" : "text/html"})
            res.end(`The file <strong>${fileName}</strong> could not be found`)
        } else {
            res.writeHead(200, {"content-type" : "text"})
            res.end(fileContents)
        }
    }

    static #writeToFile(req, res) {
        const contentsToWrite = url.parse(req.url, true).query.text

        utils.FileManager.writeToFile(contentsToWrite)
        res.writeHead(200, {"content-type" : "text/html"})
        res.end()
    }

    static #wrongEndpoint(req, res) {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Invalid URL. Check your URL and make sure it is formatted properly.');
    }

}

let myServer = new ServerManager(8000);