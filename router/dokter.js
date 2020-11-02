const dokterController = require('../controller/dokter');

module.exports = app => {
    app.post('/api/dokter/', dokterController.addDokter);
    app.get('/api/dokter/', dokterController.getDokter);
    app.put('/api/dokter/:id', dokterController.updateDokter);
}