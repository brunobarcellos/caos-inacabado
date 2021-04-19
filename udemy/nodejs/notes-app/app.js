const validator = require('validator');
const notes = require('./notes');
const yargs = require('yargs');

// A aplicação passa a retorna esta versão, ao invés da especificada no package.json
yargs.version('99.99.99');

// Adiciona comando com descrição acessível no comando --help
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        // Mapeia um parametro de entrada para o comando.
        title: {
            describe: 'Note title',
            // Torna um parametro obrigatório. Default false.
            demandOption: true,
            //Define tipo esperado. Default boolean.
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.add(argv.title, argv.body);
        console.log('Title: ' + argv.title);
        console.log('Body: ' + argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.remove(argv.title);
    },
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('Reading a note.')
    },   
});

yargs.command({
    command: 'list',
    describe: 'List the notes',
    handler: function () {
        console.log('Listing the notes.')
    },  
});

// Duas formas de rodar o yargs configurado.
//console.log(yargs.argv);
yargs.parse();