const amqp = require("amqplib");

const rabbitSettings = [{
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']

},
{
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5673,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']

}]

connect();

async function connect(){

    const queue = "Algoritmos";

    const msgs = [
        {   "name":"Jose R Quezada Bueno", "Universidad":"UTESA"},
    ]

    try{
        
        const conn = await amqp.connect(rabbitSettings);
        console.log("Conexion creada...");

        const channel = await conn.createChannel();
        console.log("Canal creado...");

        const res = await channel.assertQueue(queue);
        console.log("Cola creada...");

        for(let msg in msgs){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
            console.log('Mensaje enviado a la cola ${queue}');
        }

    } catch(err){
        console.error('Error -> $(err)');
    }
}
