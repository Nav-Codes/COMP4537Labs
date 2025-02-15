class DBQueryer {
    // Class constants for the GET and POST uri's
    static get #GET_FOR_SELECT() { return "https://king-prawn-app-7exk8.ondigitalocean.app/COMP4537/labs/5/api/v1/sql?query="; }
    static get #POST_FOR_INSERT() { return "https://king-prawn-app-7exk8.ondigitalocean.app/COMP4537/labs/5/api/v1/sql"; }

    static get #SAMPLE_INSERT_QUERIES() { return [
        "INSERT INTO patient(name, dateOfBirth) VALUES('Sara Brown', '1901-01-01'), ('John Smith', '1941-01-01'), ('Jack Ma', '1961-01-30'), ('Elon Musk', '1999-01-01');"
    ]; }

    static #dbResObj = {};

    static checkQuery() {
        DBQueryer.#dbResObj = {};
        document.getElementById("queryButton").disabled = true;
        let query = document.getElementById("query").value;

        // Checks if the queries contain SELECT and INSERT to prevent chained queries of different types and cleans query strings
        if (query.toLowerCase().includes("select") && !query.toLowerCase().includes("insert")) {
            query = query.replaceAll(`\"`, `'`);
            DBQueryer.#selectQuery(query);
        } else if (!query.toLowerCase().includes("select") && query.toLowerCase().includes("insert")) {
            let queryArr = [];
            queryArr.push(query);
            DBQueryer.#insertQuery(queryArr);
        } else {
            document.getElementById("response").innerHTML = invalidQueryMsg;
        }
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

    /** @param {Array} query should always be an array of strings */
    static async #insertQuery(query) {
        //removes extra characters that may invalidate the query went sent to server
        let stringifiedJSON = JSON.stringify({ sampleQueries: query });
        stringifiedJSON = stringifiedJSON.replaceAll(`\\"`, `'`);
        await fetch(DBQueryer.#POST_FOR_INSERT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: stringifiedJSON
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
        DBQueryer.#insertQuery(DBQueryer.#SAMPLE_INSERT_QUERIES);
    }
}

class Renderer {
    static renderGet(dbResObj) {
        if (dbResObj.statusCode !== 200) {
            document.getElementById("response").innerHTML = `${dbResObj.data.error}. ${invalidQueryMsg}`;
            return;
        }
        let dbResArray = dbResObj.data;

        let responseDiv = document.getElementById("response");
        responseDiv.innerHTML = `${dbResMsg}<br><br>`;

        // foreach loop generated by chatgpt and modified
        dbResArray.forEach((queryRow) => {
            //create a p element and iterate through the keys of the row object to display all requested parameters
            let p = document.createElement("p");
            Object.keys(queryRow).forEach(key => {
                p.insertAdjacentHTML("beforeend", `${key}: ${queryRow[key]}<br>`);
            })
            responseDiv.insertAdjacentElement("beforeend", p)
        });
    }

    //this is for the INSERT queries
    static renderPost(dbResObj) {
        if (dbResObj.statusCode !== 200) {
            document.getElementById("response").innerHTML = `${dbResObj.data.error}. ${invalidQueryMsg}`;
            return;
        }
        document.getElementById("response").innerHTML = dbResObj.data.message;
    }
}