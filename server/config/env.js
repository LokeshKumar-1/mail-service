const dotenv = require("dotenv");

dotenv.config({
    path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

const { PORT, USER_EMAIL, USER_EMAIL_PASS } = process.env;

module.exports = { PORT, USER_EMAIL, USER_EMAIL_PASS };
