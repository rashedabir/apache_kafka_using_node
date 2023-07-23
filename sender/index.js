const { Kafka } = require("kafkajs");

const kafkaBrokers = ["localhost:9092"]; // Update with your Kafka broker(s) information
const topic = "test-topic"; // Update with the desired topic name

const producer = async () => {
  try {
    const kafka = new Kafka({
      clientId: "node-kafka-example",
      brokers: kafkaBrokers,
    });

    const producer = kafka.producer();
    await producer.connect();

    const messageValue = "Hello, Kafka!"; // Replace with your desired message

    const payload = {
      topic,
      messages: [
        {
          value: messageValue,
        },
      ],
    };

    const result = await producer.send(payload);
    console.log(
      `Message sent successfully! Offset: ${result?.[0]?.baseOffset}`
    );
  } catch (error) {
    console.error("Error producing message:", error);
  }
};

producer();
