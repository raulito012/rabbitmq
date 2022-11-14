const amqp = require("amqplib");

const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672:5673,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']

}

connect();

async function connect(){

    const queue = "Algoritmos";
    const newQueue = "Carreras";

    const msgs = [
        {   "name":"Jose R Quezada Bueno", "Universidad":"UTESA"},
        {   "name":"Jose R Quezada Bueno", "Ciudad":"Santiago"},
        {   "name":"Jose R Quezada Bueno", "Edad":"22"},
        {   "name":"Jose R Quezada Bueno", "Carrera":"Sistemas"},
    ]

    try{
        
        const conn = await amqp.connect(rabbitSettings);
        console.log("Connection Created...");

        const channel = await conn.createChannel();
        console.log("Channel Created...");

        let res = await channel.assertQueue(queue);
        console.log("Queue Created...");

        for(let msg in msgs){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg[msgs])));
            console.log('Mensaje enviado a la cola ${queue}');
        }

        res = await channel.assertQueue(newQueue);
        console.log("Queue Created...");

        for(let msg in msgs){
            await channel.sendToQueue(newQueue, Buffer.from(JSON.stringify(msg[msgs])));
            console.log('Mensaje enviado a la cola ${newQueue}');
        }

        


    } catch(err){
        console.error('Error -> $(err)');
    }
}
