const {
    addNoteHandler
} = require("./handler");

const routes = [{
    method: 'POST',
    path: '/notes',
    handles: addNoteHandler,
}, ];

module.exports = routes;