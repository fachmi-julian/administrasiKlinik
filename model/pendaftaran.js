const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendaftaran = new Schema({
    idPasien: String,
    nik: String,
    nama: String,
    alamat: String,
    email: String,
    no_telepon: String
})

module.exports = mongoose.model('pendaftaran', pendaftaran);