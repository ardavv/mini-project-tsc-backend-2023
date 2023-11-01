// app.js
const express = require('express');
const bodyParser = require('body-parser');
const libraryData = require('./data'); // Impor data dari data.js
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


 // Endpoint test
app.get('/hello', (req, res) => {
    res.json('Hello World');
 })

 //endpoint menambahkan buku
app.post('/addBook', (req, res) => {
    const bukuBaru = req.body;

    //pengecekan judul dan penulis yang ingin ditambahkan ada
    if(!bukuBaru.title || !bukuBaru.author){
        const errorMessage = 'Tambahkan judul dan nama penulis';
        res.status(400).json({ error: errorMessage });
    }
    else{
        libraryData.push(bukuBaru);
        const successMessage = `Buku '${bukuBaru.title}' oleh ${bukuBaru.author} berhasil ditambahkan`;
        const tampil = {
            message : successMessage,
            baru: libraryData[libraryData.length-1],
            hasil: libraryData

        };
        res.json(tampil);
    }
 })

 //endpoint mendapatkan daftar buku
 app.get('/getBooks', (req,res) => {
    res.json(libraryData);
 })

 //endpoint untuk mengedit buku berdasarkan index
 app.put('/editBook/:index', (req,res) => {
    const index = req.params.index
    const bukuEdit = req.body;

    //pengecekan index
    if (index >= 0 && index < libraryData.length) {
        libraryData.splice(index, 1, bukuEdit);
        const successMessage = `Buku '${bukuEdit.title}' oleh ${bukuEdit.author} berhasil diubah pada indeks ${index}`;
        const tampil = {
            message: successMessage,
            edit: bukuEdit,
            hasil: libraryData
        };
        res.json(tampil);
    }
    else{
        const errorMessage = 'Indeks tidak valid';
        res.status(400).json({ error: errorMessage });
    }


 })

 //endpoint untuk menghapus buku berdasarkan index
 app.delete('/deleteBook/:index', (req,res) => {
    const index = req.params.index;

    // pengecekan index
    if (index >= 0 && index < libraryData.length) {
        const bukuHapus = libraryData.splice(index, 1)[0];
        const successMessage = `Buku '${bukuHapus.title}' oleh ${bukuHapus.author} berhasil dihapus pada indeks ${index}`;
        const hasil = {
            message: successMessage,
            delete: bukuHapus,
            hasil: libraryData
        }
        res.json(hasil);
    } 
    else{
        const errorMessage = 'Indeks tidak valid';
        res.status(400).json({ error: errorMessage });
    }
 })

//port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
