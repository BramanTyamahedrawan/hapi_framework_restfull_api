// Berisi fungsi-fungsi yang akan dipanggil di route.js
// Fungsi-fungsi ini akan digunakan untuk mengelola catatan

const { // import nanoid dari package nanoid
    nanoid
} = require("nanoid");
const notes = require("./notes"); // import array notes dari file notes.js


// simpan data catatan
const addNoteHandler = (request, h) => { // fungsi addNoteHandler untuk menangani permintaan untuk membuat catatan baru
    const { // mengambil nilai-nilai yang dikirimkan melalui body request
        title,
        tags,
        body
    } = request.payload;

    const id = nanoid(16); // membuat id unik dengan menggunakan nanoid
    const createdAt = new Date().toISOString(); // membuat createdAt dengan menggunakan new Date().toISOString()
    const updatedAt = createdAt; // updatedAt memiliki nilai yang sama dengan createdAt

    const newNote = { // membuat objek baru dengan nama newNote
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt
    };

    notes.push(newNote); // memasukkan objek newNote ke dalam array notes

    const isSuccess = notes.filter((note) => note.id === id).length > 0; // memastikan catatan baru berhasil dimasukkan dengan cara memeriksa apakah id dari catatan baru tersebut sudah masuk ke dalam array notes

    if (isSuccess) { // jika isSuccess bernilai true, maka catatan baru berhasil dimasukkan
        const response = h.response({ // membuat response dengan menggunakan h.response()
            status: "success", // memberikan status success
            message: "Catatan berhasil ditambahkan", // memberikan pesan "Catatan berhasil ditambahkan"
            data: { // memberikan data berupa id dari catatan baru
                noteId: id,
            },
        });
        response.code(201); // memberikan nilai code 201 yang artinya "Created"
        return response; // mengembalikan nilai response
    }

    const response = h.response({ // membuat response dengan menggunakan h.response()
        status: "fail", // memberikan status fail
        message: "Catatan gagal ditambahkan", // memberikan pesan "Catatan gagal ditambahkan"
    });
    response.code(500); // memberikan nilai code 500 yang artinya "Internal Server Error"
    return response; // mengembalikan nilai response
};


// lihat atau tampil data catatan
const getAllNotesHandler = () => ({ // fungsi getAllNotesHandler untuk menangani permintaan untuk melihat seluruh catatan
    status: "success", // memberikan status success
    data: { // memberikan data berupa array notes
        notes,
    },
});


// lihat atau tampil data catatan berdasarkan id
const getNoteByIdHandler = (request, h) => { // fungsi getNoteByIdHandler untuk menangani permintaan untuk melihat catatan berdasarkan id
    const { // mengambil nilai id yang dikirimkan melalui path params
        id
    } = request.params;

    const note = notes.filter((n) => n.id === id)[0]; // mencari catatan berdasarkan id

    if (note !== undefined) { // jika note tidak bernilai undefined, maka catatan ditemukan
        return { // mengembalikan nilai response
            status: "success", // memberikan status success
            data: { // memberikan data berupa objek note
                note,
            },
        };
    }

    const response = h.response({ // membuat response dengan menggunakan h.response()
        status: "fail", // memberikan status fail
        message: "Catatan tidak ditemukan", // memberikan pesan "Catatan tidak ditemukan"
    });
    response.code(404); // memberikan nilai code 404 yang artinya "Not Found"
    return response; // mengembalikan nilai response
};


// edit atau ubah data catatan berdasarkan id
const editNoteByIdHandler = (request, h) => { // fungsi editNoteByIdHandler untuk menangani permintaan untuk mengubah catatan berdasarkan id
    const { // mengambil nilai id yang dikirimkan melalui path params
        id
    } = request.params; // mengambil nilai id yang dikirimkan melalui path params;

    const { // mengambil nilai-nilai yang dikirimkan melalui body request
        title,
        tags,
        body
    } = request.payload;
    const updatedAt = new Date().toISOString(); // membuat updatedAt dengan menggunakan new Date().toISOString()

    const index = notes.findIndex((note) => note.id === id); // mencari catatan berdasarkan id

    if (index !== -1) { // jika index tidak bernilai -1, maka catatan ditemukan
        notes[index] = { // mengubah nilai properti title, tags, body, dan updatedAt dari objek catatan yang memiliki id yang sama dengan nilai dari variabel id
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({ // membuat response dengan menggunakan h.response()
            status: "success", // memberikan status success
            message: "Catatan berhasil diperbarui", // memberikan pesan "Catatan berhasil diperbarui"
        });
        response.code(200); // memberikan nilai code 200 yang artinya "OK"
        return response; // mengembalikan nilai response
    }

    const response = h.response({ // membuat response dengan menggunakan h.response()
        status: "fail", // memberikan status fail
        message: "Gagal memperbarui catatan. Id tidak ditemukan", // memberikan pesan "Gagal memperbarui catatan. Id tidak ditemukan"
    });
}

// hapus atau delete data catatan berdasarkan id
const deleteNoteByIdHandler = (request, h) => { // fungsi deleteNoteByIdHandler untuk menangani permintaan untuk menghapus catatan berdasarkan id
    const { // mengambil nilai id yang dikirimkan melalui path params
        id
    } = request.params;

    const index = notes.findIndex((note) => note.id === id); // mencari catatan berdasarkan id

    if (index !== -1) { // jika index tidak bernilai -1, maka catatan ditemukan
        notes.splice(index, 1); // menghapus catatan dari array berdasarkan index
        const response = h.response({ // membuat response dengan menggunakan h.response()
            status: "success", // memberikan status success
            message: "Catatan berhasil dihapus", // memberikan pesan "Catatan berhasil dihapus"
        });
        response.code(200); // memberikan nilai code 200 yang artinya "OK"
        return response; // mengembalikan nilai response
    }

    const response = h.response({ // membuat response dengan menggunakan h.response()
        status: "fail", // memberikan status fail
        message: "Catatan gagal dihapus. Id tidak ditemukan", // memberikan pesan "Catatan gagal dihapus. Id tidak ditemukan"
    });
}


// export semua fungsi yang dibutuhkan
module.exports = {
    addNoteHandler, // export addNoteHandler agar dapat digunakan di file lain
    getAllNotesHandler, // export getAllNotesHandler agar dapat digunakan di file lain
    getNoteByIdHandler, // export getNoteByIdHandler agar dapat digunakan di file lain
    editNoteByIdHandler, // export editNoteByIdHandler agar dapat digunakan di file lain
    deleteNoteByIdHandler, // export deleteNoteByIdHandler agar dapat digunakan di file lain
};