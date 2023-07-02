const {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
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
    },
    {
        // method untuk mengubah catatan berdasarkan id
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    }
];

module.exports = routes;