'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

function initDB(cb) {
    sequelize
        .sync({force: true})
        .then(function (err) {
            // for backward compatibility after making method async
            if (cb) {
                cb();
            }
            console.log('Database reset!');
        }, function (err) {
            console.log('An error occurred while creating the table:', err);
        });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.initDB = initDB;

module.exports = db;