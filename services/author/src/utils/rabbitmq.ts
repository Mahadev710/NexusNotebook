import amqp from 'amqplib';
let channel :amqp.Channel;

export const connectRabbitMQ = async ()=>{
    try{
        const connection = await amqp.connect({
        protocol: process.env.RABBITMQ_PROTOCOL,
        hostname: process.env.RABBITMQ_HOST,
        port: Number(process.env.RABBITMQ_PORT),
        username: process.env.RABBITMQ_USERNAME,
        password: process.env.RABBITMQ_PASSWORD,
        });

        channel=await connection.createChannel();
        console.log("✅ Connected to Rabbitmq");
    }
    catch(error:any){
       console.log("❌ Failed to connect to rabbitmq");
       console.error("RabbitMQ Connection Error:", error.message);
    }
};
export const publishToQueue=async(queueName: string,message:any)=>{
    
    if(!channel){
        console.error("Rabbitmq channel is not initialized");
        return;
    }
    try{
    await channel.assertQueue(queueName,{durable:true});
    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)),{
        persistent:true,

    });
    console.log(` ✉️ Message sent to queue "{queueName}"`)
   }
    catch(error){
    console.error(`❌ Failed to publish message to queue "${queueName}" :`,error);
    }
}
export const invalidateCacheJob=async(cacheKeys:string[])=>{
    try{
        const message={
            action:"invalidateCache",
            keys:cacheKeys,
        };
        await publishToQueue("cache-invalidation",message)
        console.log("✅ Cache invalidation job published to Rabbitmq");

    }
    catch(error){
    console.error("❌ Failed to publish cache on rabbitmq",error);
    }
};