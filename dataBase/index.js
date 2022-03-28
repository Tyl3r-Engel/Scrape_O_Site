const mongoose = require('mongoose');
const dbIP = `mongodb://localhost:27017/Scraper`
mongoose.connect(dbIP,
  () => {console.log(`Connected to: ${dbIP}`)},
);