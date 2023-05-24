/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('lines', {
        lineId:           {
            type:       'bigserial',
            primaryKey: true,
        },
        workshopId:         {
            type: 'bigint',
            comment:'Номер цеха, в котором находится линия производства'
        }
    }, {
        ifNotExists: true,
        comment:'Линии производства'
    });
};

exports.down = pgm => {
};