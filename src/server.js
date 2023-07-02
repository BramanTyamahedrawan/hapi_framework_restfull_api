const Hapi = require('@hapi/hapi'); // import module hapi
const routes = require('./routes'); // import file routes.js

const init = async () => { // inisialisasi server
    const server = Hapi.server({ // membuat server baru
        port: 5000,
        host: 'localhost',
        // same origin policy
        routes: {
            // CORS
            cors: {
                origin: ['*'],
            },
        },
        // end of same origin policy
    });

    server.route(routes); // registrasi routes

    await server.start(); // menjalankan server
    console.log(`Server berjalan pada ${server.info.uri}`); // menampilkan pesan server berjalan
};

init(); // eksekusi fungsi init