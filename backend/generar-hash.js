const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync("cliente123", 10);
console.log("Hash generado:", hash);
