// scripts/hash-password.js
// Usage: node scripts/hash-password.js "yourPasswordHere"

const bcrypt = require("bcryptjs");

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-password.js \"Postman@2026Secure");
  process.exit(1);
}

bcrypt.hash(password, 10).then((hash) => {
  console.log("\nPaste this into ADMIN_PASSWORD_HASH:\n");
  console.log(hash);
  console.log("");
});