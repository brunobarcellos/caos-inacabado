const fs = require('fs');
const chalk = require('chalk');

const get = function () {
    return 'Your notes...';
};

const add = function (title, body) {
    const notes = load();
    const duplicated = notes.filter(function (note) {
        return note.title === title;
    });

    if (duplicated.length === 0) {

        notes.push({
            title: title,
            body: body
        });
    
        save(notes);

        console.log(chalk.green.inverse('New note added!'));

    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
};

const save = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const load = function () {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const remove = function (title) {
    const notes = load();

    const notesToKeep = notes.filter(function (note) {
        return note.title !== title;
    });

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!')); 
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }

    save(notesToKeep);
};

// Exportando múltiplas funções como um objeto JSON
module.exports = {
    get: get,
    add: add,
    remove: remove
};