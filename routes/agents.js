const db = require('./db');

function getAgents() {
    return new Promise((resolve, reject) => {
        db.run;
        db.all(
            'SELECT name FROM sqlite_master WHERE type="table"', (err, rows) => {
                resolve(rows);
            }
        );
        /*
        db.all('SELECT * FROM hotdeal_alarm', (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
         */
    });
}

function getAgentById(id) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM hotdeal_alarm where id=(?)',id, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function addAgent(firstName, lastName) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO hotdeal_alarm (firstName, lastName) VALUES (?, ?)', firstName, lastName, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

function editAgent(id, firstName, lastName) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE hotdeal_alarm SET firstName = (?), lastName = (?) where id = (?)', [firstName, lastName, id], (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

function deleteAgent(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM hotdeal_alarm WHERE id = (?)', id, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

module.exports = {
    getAgents,
    getAgentById,
    addAgent,
    editAgent,
    deleteAgent
};