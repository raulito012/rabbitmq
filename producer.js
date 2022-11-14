const amqp = require("amqplib");

const rabbitSettings = [{
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']
},{
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5673,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']}]

connect();

async function connect(){

    const queue = "Tarea";
    const newQueue = "Materias";

    const msgs = [
        {   "name":"Jose R. Quezada", "Universidad":"UTESA"},
        {   "name":"Jose R. Quezada", "Profesor":"Ivan Mendoza"},
        {   "name":"Jose R. Quezada", "Edad":"22"},
        {   "name":"Jose R. Quezada", "Materia":"Algoritmo Paralelos"},
    ]

    for(i=0;i<rabbitSettings.length;i++){
        try{

            const conn = await amqp.connect(rabbitSettings[i]);
            console.log("Conexion creada...");
    
            const channel = await conn.createChannel();
            console.log("Conexion creada...");
    
            const res = await channel.assertQueue(queue);
            console.log("Cola creada...");
    
            for(let msg in msgs){
                await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
                console.log('Mensaje enviado a la cola ${queue}');
            }
    
    
            break;
        } catch(err){
            console.error(`Error -> ${err}`);
        }
    }


}
