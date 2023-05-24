/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('messages', {
        messageId:           {
            type:       'bigserial',
            primaryKey: true,
        },
        workshopId:{
            type:'bigint',
            comment:'Номер цеха'
        },
        lineId:{
            type:'bigint',
            comment:'Номер линии'
        },
        sensorId:{
            type:'bigint',
            comment:'Номер датчика'
        },
        messageText:{
            type:'varchar(700)',
            comment:'Текст отправленного сообщения'
        },
        messageTitle:{
            type:'varchar(500)',
            comment:'Тема сообщения'
        },
        isSms:{
            type: 'boolean',
            comment: 'Отправлено по sms'
        },
        isEmail:{
            type: 'boolean',
            comment: 'Отправлено на email'
        },


    }, {
        ifNotExists: true,
        comment:'Сотрудники'
    });
};

exports.down = pgm => {
};
