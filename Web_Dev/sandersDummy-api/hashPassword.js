// hashPassword.js
const bcrypt = require('bcrypt');

const plainTextPassword = 'pAssword1'; // Replace with the password you want to hash
const saltRounds = 10;

bcrypt.hash(plainTextPassword, saltRounds, function(err, hash) {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
  }
});