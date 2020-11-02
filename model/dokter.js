const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dokter = new mongoose.Schema({
    nama_dokter : String,
    poli : String,
    jam_praktek : Array,
    status : {
        type : Boolean,
        default: true
    }
})

module.exports = mongoose.model('dokter', dokter);