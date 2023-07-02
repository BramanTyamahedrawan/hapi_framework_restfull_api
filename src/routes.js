const { // import handler yang dibutuhkan
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
} = require("./handler");

// export routes
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
    },
    {
        // method untuk menghapus catatan berdasarkan id
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    }
];

module.exports = routes; // export routes agar dapat digunakan di file lain