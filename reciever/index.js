const { Kafka } = require("kafkajs");

const kafkaBrokers = ["localhost:9092"]; // Update with your Kafka broker(s) information
const topic = "test-topic"; // Update with the desired topic name

const consumer = async () => {
  try {
    const kafka = new Kafka({
      clientId: "node-kafka-example",
      brokers: kafkaBrokers,
    });

    const consumer = kafka.consumer({ groupId: "node-kafka-group" }); // Provide a unique group ID

    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const { value } = message;
        console.log(`Received message: ${value}`);
        // Add your custom processing logic here for the received message
      },
    });
  } catch (error) {
    console.error("Error consuming message:", error);
  }
};

consumer();
