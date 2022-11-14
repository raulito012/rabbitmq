const amqp = require("amqplib");

const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']

}

connect();

async function connect(){

    const queue = "AP";
    const newQueue = "Roles";

    const msgs = [
        {   "name":"Jose Quezada", "Universidad":"UTESA"},
        {   "name":"Jose Quezada", "Ciudad":"Santiago"},
        {   "name":"Jose Quezada", "Edad":"22"},
        {   "name":"Jose Quezada", "Carrera":"Sistemas"},
    ]
    
     for(i=0;i<rabbitSettings.length;i++){
    try{

        const conn = await amqp.connect(rabbitSettings[i]);
        console.log("Se ha creado la conexion...");

        const channel = await conn.createChannel();
        console.log("El canal ha sido creado...");

        const res = await channel.assertQueue(queue);
        console.log("La cola ha sido creada...");

        for(let msg in msgs){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
            console.log('Los mensajes se han enviado a la cola: ${queue}');
        }



    } catch(err){
        console.error('Error -> $(err)');
    }
}
}
