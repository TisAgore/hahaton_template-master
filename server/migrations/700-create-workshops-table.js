exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('workshops', {
        workshopId:         {
            type: 'serial',
            comment:'Номер цеха',
            primaryKey: true,
        }
    }, {
        ifNotExists: true,
        comment:'Цеха'
    });
};

exports.down = pgm => {
};
