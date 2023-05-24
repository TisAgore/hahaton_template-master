require( 'dotenv' ).config();
const { pool } = require( './postgresql' )
const fastify = require( 'fastify' )( {
    logger:true,
} );

fastify.register(require('@fastify/cors'), (instance) => {
    return (req, callback) => {
        const corsOptions = {
            // This is NOT recommended for production as it enables reflection exploits
            origin: true
        };

        // do not include CORS headers for requests from localhost
        if (/^localhost$/m.test(req.headers.origin)) {
            corsOptions.origin = false
        }

        // callback expects two parameters: error and options
        callback(null, corsOptions)
    }
})

// Создание маршрута для get запроса
fastify.get( '/', async function (request, reply) {
    let data = {
        message:   'error',
        statusCode:400
    }
    const client = await pool.connect()
    try {
        const result = await client.query( `select *
                                            from "таблица"
                                            where "условие" = $1`, [ 'параметр, по которому фильтруем' ] )
    }
    catch ( e ) {
        console.log( e )
        data.message = 'Ошибка при выполнении запроса' + e.message
    }
    finally {
        client.release()
    }
    reply.send( data )
} )

// Создание маршрута для post запроса
fastify.post('/messages/insert', async function (request, reply) {
    let data = {
        message:   'error',
        statusCode:400
    }
    const client = await pool.connect()
    try {
        let body = request.body
        const result = await client.query( `insert into requests ("workshopId", "lineId", "sensorId", "value") values ($1,$2,$3,$4) returning "requestId"`, 
                                        [ body.workshopId, body.lineId, body.sensorId, body.value ] )
        // console.log(body)
        const workshops = await client.query('select "workshopId" from workshops')
        const lines = await client.query('select "lineId" from lines')
        const sensors = await client.query('select "sensorId" from sensors')
        console.log(sensors)
        // let workshopRow = { workshopId: body.workshopId }
        // let lineRow = { lineId: body.lineId }
        // let sensorRow = { sensorId: body.sensorId }
        let minV = 0
        let maxV = 0
        // console.log(workshops.rows.some((workshop) => {
        //     console.log(workshop, workshopRow)
        //     console.log(workshop == workshopRow)
        // }))
        // console.log()
        if (workshops.rows.some((workshop) => workshop.workshopId == body.workshopId) == false) {
            const workshop = await client.query('insert into workshops ("workshopId") values ($1) returning "workshopId"', [body.workshopId])
        }
        if (lines.rows.some((line) => line.lineId == body.lineId) == false) {
            const line = await client.query('insert into lines ("lineId", "workshopId") values ($1, $2) returning "lineId"',
                                            [body.lineId, body.workshopId])
        }
        if (sensors.rows.some((sensor) => sensor.sensorId == body.sensorId) == false) {
            if (body.sensorId%3 == 1) {
                minV = 0
                maxV = 180
            } else if (body.sensorId%3 == 2) {
                minV = 500
                maxV = 3000
            } else {
                minV = 1
                maxV = 8
            }
            const sensor = await client.query('insert into sensors("sensorId", "lineId", "sensorMinValue", "sensorMaxValue") values ($1, $2, $3, $4) returning "sensorId"',
                                                [body.sensorId, body.lineId, minV, maxV])
            console.log(sensor)
        }
        if(result.rowCount > 0){
            console.log(`Успешно добавили запись`)
            data.message = {
                id:result.rows[0].id
            }
        }
        else{
            console.log(`Ошибка при добавлении записи`)
        }
    }
    catch ( e ) {
        console.log( e )
        data.message = 'Ошибка при выполнении запроса' + e.message
    }
    finally {
        client.release()
    }
    reply.send( data )
})

fastify.post('/statistics/update',async function (request, reply) {
    let data = {
        message:   'error',
        statusCode:400
    }
    const client = await pool.connect()
    try {
        const result = await client.query( `update "таблица" set isChecked = $1`, [true] )

        if(result.rowCount > 0){
            console.log(`Успешно обновили запись`)
            data.message = {
                id:result.rows[0].id
            }
        }
        else{
            console.log(`Ошибка при обновлении записи`)
        }
    }
    catch ( e ) {
        console.log( e )
        data.message = 'Ошибка при выполнении запроса' + e.message
    }
    finally {
        client.release()
    }
    reply.send( data )
})

// Создание запроса с использование path параметров
fastify.get('/:id',function (request, reply) {
    console.log(`Path параметры, переданные в запросе: `,JSON.stringify(request.params))
    reply.send(request.params)
})

// Создание запроса с использованием query параметров
fastify.get('/query',function (request, reply) {
    console.log(`Query параметры, переданные в запросе`, JSON.stringify(request.query))
    reply.send(request.query)
})

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})