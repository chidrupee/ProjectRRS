import { Kafka } from 'kafkajs';
import { MongoClient } from 'mongodb';

const kafka = new Kafka({
  clientId: 'nextjs-producer',
  brokers: ['localhost:9092'], // Adjust as necessary
});
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);
const consumer = kafka.consumer({ groupId: 'my-group' });

const run = async () => {
  try{
  // Connecting the consumer

  const database = client.db('analytics');
  const collection = database.collection('users');


  await consumer.connect();
  console.log('Consumer connected');

  // Subscribe to the topic
  await consumer.subscribe({ topic: 'broker'});

  // Start consuming messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString(); // Convert buffer to string
      const result = await collection.insertOne(JSON.parse(value));

      if(result){
        console.log("Document inserted", result);
      }
      else{
        console.log("Error");
      }
      console.log( `Received message: ${value}`); // Print the received message
    },
  });

}
catch(error){
  console.log(error);
}

};

run().catch(console.error);