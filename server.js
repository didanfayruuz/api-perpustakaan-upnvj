const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server API Perpustakaan berjalan di http://localhost:${PORT}`);
});