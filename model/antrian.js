const mongoose = require('mongoose');
const schema = mongoose.Schema;

const antrian = new schema({
    nik: String,
    tanggal: {
        type: Date,
        default: Date.now
    },
    poli: String,
    nama_dokter: String,
    nomer_antrian: Number,
    status: {
        type: Boolean,
        default: false
    },
    diagnosa: {
        type: Array,
        default: ""
    },
    obat: {
        type: Array,
        default: ""
    }
})

module.exports = mongoose.model('antrian', antrian);