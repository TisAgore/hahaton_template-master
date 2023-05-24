/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('requests', {
        requestId:           {
            type:       'bigserial',
            primaryKey: true,
        },
        workshopId:{
            type:'bigint',
            comment:'Номер цеха, с которого пришло уведомление'
        },
        lineId:{
            type:'bigint',
            comment:'Номер линии, с которой пришло уведомление'
        },
        sensorId:{
            type:'bigint',
            comment:'Номер сенсора, с котороого пришло уведомление'
        },
        value:{
            type:'integer',
            comment:'Значение датчика'
        },
        done:{
		    type:'boolean',
		    comment:'Прочитана ли заявка',
            default: false
        }
    }, {
        ifNotExists: true,
        comment:'Сотрудники'
    });
};

exports.down = pgm => {
};
