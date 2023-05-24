/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('sensors', {
        sensorId:           {
            type:       'bigserial',
            primaryKey: true,
        },
        lineId:{
            type:'bigint',
            comment:'Номер линии, к которой привязан датчик'
        },
        sensorMinValue:         {
            type: 'integer',
            comment:'Эталонное минимальное значение датчика'
        },
        sensorMaxValue:         {
            type: 'integer',
            comment:'Эталонное максимальноре значение датчика'
        },
    }, {
        ifNotExists: true,
        comment:'Датчики'
    });
};

exports.down = pgm => {
};
