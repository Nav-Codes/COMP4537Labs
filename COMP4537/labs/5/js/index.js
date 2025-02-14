class DBQueryer {
    // Class constants for the GET and POST uri's
    static get #GET_FOR_SELECT() { return "https://king-prawn-app-7exk8.ondigitalocean.app/COMP4537/labs/5/api/v1/sql?query="; }
    static get #POST_FOR_INSERT() { return "https://king-prawn-app-7exk8.ondigitalocean.app/COMP4537/labs/5/api/v1/sql"; }

    static get #SAMPLE_INSERT_QUERIES() { return [
        "INSERT INTO patient(name, dateOfBirth) VALUES('Sara Brown', '1990-01-01');",
        "INSERT INTO patient(name, dateOfBirth) VALUES('John Smith', '1992-01-01');",
        "INSERT INTO patient(name, dateOfBirth) VALUES('Jack Ma', '1992-01-01');",
        "INSERT INTO patient(name, dateOfBirth) VALUES('Elon Musk', '1993-01-01');",
    ]; }

    static #dbResObj = {};

    static checkQuery() {
        DBQueryer.#dbResObj = {};
        document.getElementById("queryButton").disabled = true;
        let query = document.getElementById("query").value;

        // Checks if the queries contain SELECT and INSERT to prevent chained queries of different types
        if (query.toLowerCase().includes("select") && !query.toLowerCase().includes("insert")) {
            DBQueryer.#selectQuery(query);
        } else if (!query.toLowerCase().includes("select") && query.toLowerCase().includes("insert")) {
            DBQueryer.#insertQuery(query);
        } else {
            document.getElementById("response").innerHTML = invalidQueryMsg;
        }
        DBQueryer.#dbResObj = {};
        document.getElementById("queryButton").disabled = false;
    }

    static async #selectQuery(query) {
        await fetch(`${DBQueryer.#GET_FOR_SELECT}${query}`, {
            method: "GET"
        })
            .then(response => {
                DBQueryer.#dbResObj.statusCode = response.status;
                return response.json();
            })
            .then(data => {
                DBQueryer.#dbResObj.data = data;
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
        Renderer.renderGet(DBQueryer.#dbResObj);
    }

    static async #insertQuery(query) {
        await fetch(DBQueryer.#POST_FOR_INSERT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sampleQueries: [query] })
        })
            .then(response => {
                DBQueryer.#dbResObj.statusCode = response.status;
                return response.json();
            })
            .then(data => {
                DBQueryer.#dbResObj.data = data;
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
        Renderer.renderPost(DBQueryer.#dbResObj)
    }

    static async buttonClick() {
        DBQueryer.#dbResObj = {};
        let queryString = "";
        DBQueryer.#SAMPLE_INSERT_QUERIES.forEach(query => {
            queryString = queryString.concat(query);
        })
        DBQueryer.#insertQuery(queryString);
        // await fetch(DBQueryer.#POST_FOR_INSERT, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ sampleQueries: DBQueryer.#SAMPLE_INSERT_QUERIES })
        // })
        //     .then(response => {
        //         DBQueryer.#dbResObj.statusCode = response.status
        //         return response;
        //     })
        //     .then(data => {
        //         DBQueryer.#dbResObj.data = data
        //     })
        //     .catch((error) => {
        //         console.error('Error: ', error);
        //     });
        // Renderer.renderPost()
    }
}

class Renderer {
    static renderGet(dbResObj) {
        // console.log(dbResObj);
        if (dbResObj.statusCode !== 200) {
            document.getElementById("response").innerHTML = `${dbResObj.data.error}. ${invalidQueryMsg}`;
            return;
        }
        let dbResArray = dbResObj.data;

        let responseDiv = document.getElementById("response");
        responseDiv.innerHTML = `${dbResMsg}<br><br>`;

        // foreach loop generated by chatgpt and modified
        dbResArray.forEach((queryRow) => {
            //create a p element and iterate through the keys of the row object to display the id, name and/or bday
            let p = document.createElement("p");
            Object.keys(queryRow).forEach(key => {
                p.insertAdjacentHTML("beforeend", `${key}: ${queryRow[key]}<br>`);
            })
            responseDiv.insertAdjacentElement("beforeend", p)
        });
    }

    //this is for the INSERT queries
    static renderPost(dbResObj) {
        console.log(dbResObj);
        if (dbResObj.statusCode !== 200) {
            document.getElementById("response").innerHTML = `${dbResObj.data.error}. ${invalidQueryMsg}`;
            return;
        }
        document.getElementById("response").innerHTML = dbResObj.data.message;

        //for success, obj param is "message": "success"
        //error is "error":"errorMsg"
    }
}