const modelPendaftaran = require('../model/pendaftaran');
const modelHistory = require('../model/antrian');

module.exports = { 
    addPasien: async (req, res) => {
        const payload = req.body;                
        const checkNik = await modelPendaftaran.findOne({nik: payload.nik})
        if (checkNik) {
            res.send(JSON.stringify('Anda Sudah Terdaftar'));
        } else {
            const pasien = new modelPendaftaran(payload);           
            const data = pasien.save();
            if (data.err) {
                res.send(JSON.stringify('Data Gagal di Simpan'));
            }
            res.send(JSON.stringify('Data Berhasil di Simpan'));
        }       
               
    },
    getPasien: async (req, res) => {        
        const data = await modelPendaftaran.find();
        if (data.err) {
            res.send(JSON.stringify('Data Tidak Ada'))
        }
        res.send(JSON.stringify({status:'Data di Tampilkan',result:data}))
    },
    getPasienByNik: async (req, res) => {   
        const {nik} = req.params              
        const data = await modelPendaftaran.findOne({nik:nik})
        if (!data) {
            res.send(JSON.stringify({
                status:'Data tidak di temukan',result:data
            }))
            return;
        }
        res.send(JSON.stringify({
            status:'Data di Tampilkan',result:data
        })); 
    },
    updatePasien: async (req, res) => {
        const {nik} = req.params
        const data = await modelPendaftaran.updateOne({nik},req.body)
        console.log(data)
        if (!data) {
            res.send(JSON.stringify({
                status:'Data tidak di temukan',result:data
            }))
            return;
        }
        res.send(JSON.stringify({
            status:'Data Berhasil di Update',result:data
        })); 
    },
    riwayatPasien: async (req, res) => {
        const {id} = req.params;
                
        const data = await modelHistory.updateOne({_id:id}, req.body);        
        if (!data) {
            res.send(JSON.stringify({
                status:'Data tidak di temukan',result:data
            }))
            return;
        }
        res.send(JSON.stringify({
            status:'Data Berhasil di Update',result:data
        }));
    }
}