const {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler
} = require("./handler");

const routes = [{
        // method untuk membuat catatan baru
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        // method untuk melihat seluruh catatan
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        // method untuk melihat catatan berdasarkan id
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    }
];

module.exports = routes;