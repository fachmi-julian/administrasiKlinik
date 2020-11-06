const modelAntrian = require('../model/antrian');
const pdfMake = require('pdfmake/build/pdfmake');
const vfsFonts = require('pdfmake/build/vfs_fonts');
const moment = require('moment');
const PdfPrinter = require('../node_modules/pdfmake/src/printer');
const fs = require('fs');
pdfMake.vfs = vfsFonts.pdfMake.vfs;


module.exports = {
    addAntrian: async (req, res) => {
        const filter = {           
            nama_dokter : req.body.dokter,
            poli : req.body.poli,
            tanggal : req.body.tanggal
        }
        const sort = { nomer_antrian : -1}

        const validasi = {
            nik : req.body.nik,
            poli : req.body.poli,
            tanggal : req.body.tanggal
        }
        
        const cek = await modelAntrian.findOne(validasi)
        if (cek) {
            res.send(JSON.stringify({status:'Data Already Exist', result:null, statusCode:500}));
        } else {
            const query = await modelAntrian.find(filter).sort(sort);
            let no = await query[0]        
                
            if (no == null) {
                no = 0;
            } else {
                no = no.nomer_antrian;
            }

            const payload = {
                        nik: req.body.nik,            
                        poli: req.body.poli,
                        nama_dokter: req.body.dokter,
                        nomer_antrian: no+1,
                        tanggal: req.body.tanggal
                    };
            if (payload.nomer_antrian >= 150) {
                res.send(JSON.stringify('PENUH'))
            } else {                
                const pasien = new modelAntrian(payload);        
                const data = await pasien.save();
                    if (data.err) {
                    res.send(JSON.stringify({status:'Data Gagal di Simpan', result:data, statusCode:500}));
                }
                res.send(JSON.stringify({status:'Data Berhasil di Simpan', result:data, statusCode:200}));
            }
        }  
    },
    callAntrian: async (req, res) => {
        const id = req.params.id;
        console.log(id);        
        const data = await modelAntrian.updateOne({_id:id}, req.body);
        console.log(data);
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
    getAntrian: async (req, res) => {
        const param = {           
            nama_dokter : req.query.dokter,
            poli : req.query.poli,
            tanggal : req.query.tanggal
        }        
                
        const data = await modelAntrian.find(param)
        if (!data) {
            res.send(JSON.stringify({status:'Data Not Found', result:data, statusCode:500}));
        }       
        res.send(JSON.stringify(data));
    },
    detailAntrianPasien: async (req, res) => {       
        const param =  req.query.nik
        const today = moment().format('MM-DD-YYYY')                
        const data = await modelAntrian.findOne({tanggal:today,nik:param});
        if (!data) {
            res.send(JSON.stringify({status:'Data Not Found', result:data, statusCode:500}));
        }       
        res.send(JSON.stringify(data));
        
    },
    downloadAntrean: async (req, res) => {
        const param = req.params;        
        const data = await modelAntrian.findOne(param);
        console.log(data);
        const tanggal_antrian = moment(data.tanggal).format('DD-MM-YYYY');

        const fonts = {
            Roboto: {
                normal: './fonts/Roboto/Roboto-Regular.ttf',
                bold: './fonts/Roboto/Roboto-Medium.ttf',
                italics: './fonts/Roboto-Italic.ttf',
                bolditalics: './fonts/Roboto-MediumItalic.ttf'
            }
        };
        const printer = new PdfPrinter(fonts);
        var docDefinition = {
            content: [
                {text: "Klinik Setia Mekar", fontSize: 25, alignment: 'center'},
                {text: "Jl. Nusantara Raya Perumnas 3 Bekasi Timur", fontSize: 15, alignment: 'center'},
                {text: ""},
                {width: 'auto',text: data.nomer_antrian, fontSize: 250, alignment: 'center'},
                {width: 'auto',text: data.nik, fontSize: 20, alignment: 'center'},
                {width: 'auto',text: `Poli : ${data.poli}`, fontSize: 20, alignment: 'center'},
                {width: 'auto',text: `Dokter : ${data.nama_dokter}`, fontSize: 20, alignment: 'center'},
                {width: 'auto',text: `Tanggal : ${tanggal_antrian}`, fontSize: 20, alignment: 'center'},                
              ]
        }
        const link = './uploads/antrian/antrian.pdf'        
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(fs.createWriteStream(link));
        pdfDoc.end();

        res.send(JSON.stringify({status: "download success",link: link, code: 200}));
    }
}
