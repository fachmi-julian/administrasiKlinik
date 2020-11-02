const modelDokter = require('../model/dokter');

module.exports = {
    addDokter: async (req, res) => {
        const payload = {
            nama_dokter : req.body.nama_dokter,
            poli : req.body.poli,
            jam_praktek : req.body.jam_praktek
        }
        console.log(payload)
        const model = new modelDokter(payload);
        const data = await model.save();
        if (data.err) {
            res.send(JSON.stringify({status:'Data Gagal di Simpan', result:data, statusCode:500}));
        }
        res.send(JSON.stringify({status:'Data Berhasil di Simpan', result:data, statusCode:200}));
    },
    getDokter : async (req, res) => {
        const data = await modelDokter.find();
        if (!data) {
            res.send(JSON.stringify({status:'Data Not Found', result:data, statusCode:500}));
        }       
        res.send(JSON.stringify({status:'Success', result:data, statusCode:200}));
    },
    updateDokter : async (req, res) => {
        const {id} = req.params;        
        const data = await modelDokter.updateOne({_id:id}, req.body);
        console.log(data)
        if (!data) {
            res.send(JSON.stringify({status:'Update Gagal',result: null, statusCode:500}))
        }
        res.send(JSON.stringify({status:'Update Success',result: data, statusCode:200}))
    }
}