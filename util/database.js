const Sequelize = require("sequelize").Sequelize

//new connection pool
const sequelize = new Sequelize('node-complete', 'root', 'admin', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;