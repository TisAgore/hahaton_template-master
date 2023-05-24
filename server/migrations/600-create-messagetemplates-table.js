/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('messagetemplates', {
        messageTemplateId:           {
            type:       'bigserial',
            primaryKey: true,
        },
        messageText:{
            type:'varchar(500)',
            comment:'Текст сообщения'
        },
        messageTitle:{
          type:'varchar(500)',
          comment:'Тема сообщения'
        },
        sensorId:{
            type:'bigint',
            comment:'Номер датчика'
        },
        userId:{
            type:'bigint',
            comment:'Номер человека, которому нужно отправить'
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
        comment:'Шаблоны сообщений, из конструктора'
    });
};

exports.down = pgm => {
};
