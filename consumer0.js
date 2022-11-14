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

    const queue = "Algoritmo";
    const Universidad = "UTESA"

     
    try{
        
        const conn = await amqp.connect(rabbitSettings);
        console.log("Conexion creada...");

        const channel = await conn.createChannel();
        console.log("Canal creado...");

        const res = await channel.assertQueue(queue);
        console.log("Queue creado...");

        console.log('Esperando por mensajes from ${Universidad}');
        channel.consume(queue, message => {
            let Algoritmo = JSON.parse(message.content.toString());
            console.log('Algoritmo recibido ${Algoritmo.name}');
            console.log(Algoritmo);

            if(Algoritmo.Universidad == Universidad){
                channel.ack(message);
                console.log("Mensaje borrado de la cola... \n");
                
            }  else{
                console.log("This message is not for me , I wont delete it");
            }

        })


    } catch(err){
        console.error('Error -> $(err)');
    }
}
