// // "use client"
// import { Kafka } from 'kafkajs';

// const kafka = new Kafka({
//   clientId: 'nextjs-producer',
//   brokers: ['localhost:9092']
// });

// const producer = kafka.producer();

// // Connect the producer only once during startup
// producer.connect()
//   .then(() => console.log("Kafka Producer connected"))
//   .catch(err => console.error('Kafka connection failed', err));



// export async function POST(req, res) {
//   console.log("Reached here!");
//   if (req.method === 'POST') {
//     const { logDetails } = req.body;
//     console.log("api file found!!");
//     // console.log()

//     try {
      
//       await producer.send({
//         topic: 'my-topic',
//         messages: [
//           { value: JSON.stringify(logDetails) },
//         ],
//       });
//       // await producer.disconnect();
//       console.log(logDetails);


//       res.status(200).json({ message: 'Log sent to Kafka' });
//     } catch (err) {
//       console.error('Error sending log to Kafka', err);
//       res.status(500).json({ error: 'Failed to send log' });
//     }
//   } 
//   else{
//     res.setHeader("Allow", ["POST"]);
//   }
// }


// pages/api/kafka-producer.js

import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'nextjs-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

// export async function POST(req) {
//   if (req.method === 'POST') {
//     const { message } = req.body;

//     try {
//       // Connect to the producer
//       await producer.connect();

//       // Send a message to the 'test' topic
//       await producer.send({
//         topic: 'test',
//         messages: [
//           { value: JSON.stringify(message) },
//         ],
//       });

//       // Disconnect the producer
//       await producer.disconnect();

//       res.status(200).json({ success: true, message: 'Message sent successfully!' });
//     } catch (error) {
//       console.error('Error sending message to Kafka:', error);
//       res.status(500).json({ success: false, error: 'Failed to send message to Kafka' });
//     }
//   } else {
//     // res.setHeader('Allow', ['POST']);
//     // res.status(405).end( `Method ${req.method} Not Allowed`);
//   }
// }


// const RABBITMQ_URL = 'amqp://localhost';
// const EXCHANGE_NAME = 'exchange1';
// const EXCHANGE_TYPE = 'topic';

export async function POST(req) {
  // Handle preflight request
  const { method } = req;

  if (method === 'OPTIONS') {
    return new Response(null, { status: 200 });
  }

  if (method === 'POST') {
    // const { properties, payload, routingKey } = await req.json();
    const { payload, topic } = await req.json();
    // console.log(payload, properties, routingKey);

    try {
      // const connection = await amqp.connect(RABBITMQ_URL);
      // const channel = await connection.createChannel();

      // await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true });
      // channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(payload)), {
      //   persistent: true,
      // });
      

      await producer.connect();
      await producer.send({topic:topic, "messages":[{value:JSON.stringify(payload)}]});


      console.log('Message sent to exchange:', payload, 'with routing key:', topic);

      // await channel.close();
      // await connection.close();

      await producer.disconnect();

      // return new Response(JSON.stringify({ message: 'Message sent to RabbitMQ topic exchange' }), {
      //   status: 200,
      //   headers: { 'Content-Type': 'application/json' },
      // });

      return new Response(JSON.stringify({success:true, message:"Message sent successfully to kafka"}));
    } catch (error) {
      console.error('Error sending message to Kafka:', error);
      return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
}