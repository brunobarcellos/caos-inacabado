const fs = require('fs');
const chalk = require('chalk');

const get = () => 'Your notes...';

const add = (title, body) => {
    const notes = load();

    const duplicated = notes.find((note) => note.title === title);

    if (!duplicated) {

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

const save = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const load = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const remove = (title) => {
    const notes = load();

    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!')); 
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }

    save(notesToKeep);
};

const list = () => {
    const notes = load();

    console.log(chalk.inverse('Your notes!'));

    notes.forEach((note) => console.log(note.title));
};

const read = (title) => {
    const notes = load();
    
    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
};

// Exportando múltiplas funções como um objeto JSON
module.exports = {
    get: get,
    add: add,
    remove: remove,
    list: list,
    read: read
};