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

    const queue = "AP";
    const Universidad = "UTESA"

    for(i=0;i<rabbitSettings.length;i++){
    try{
        
        const conn = await amqp.connect(rabbitSettings[i]);
        console.log("Conexion creada...");

        const channel = await conn.createChannel();
        console.log("Canal creado...");

        const res = await channel.assertQueue(queue);
        console.log("Queue creado...");

        console.log('Esperando por mensajes de ${Universidad}');
        channel.consume(queue, message => {
            let AP = JSON.parse(message.content.toString());
            console.log('AP recibido ${AP.name}');
            console.log(Algoritmo);

            if(AP.Universidad == Universidad){
                channel.ack(message);
                console.log("Mensaje borrado de la cola... \n");
                
            } else{
                console.log("Ese mensaje no es para mi, por lo tanto, no lo borrare.");
            }


        })

        break
    } catch(err){
        console.error('Error -> $(err)');
    }
}
}
