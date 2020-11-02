const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 8000;




mongoose.connect('mongodb://localhost/klinikSetiaMekar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let corsOption = {
    origin: '*',
    method: ['*'],
    allowedHeaders: ['Content-Type']
  }

 app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))

require('./router/pendaftaran')(app);
require('./router/antrian')(app);
require('./router/dokter')(app);

app.listen(PORT, () => {
    console.log(`Server Running at Port ${PORT}`);
});

