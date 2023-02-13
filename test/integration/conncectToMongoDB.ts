import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  const mongoUrl = process.env.MONGO_TEST_URL ?? 'mongodb://localhost:27017/testDB';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectionOptions: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(mongoUrl, connectionOptions);

  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('MongoDB connected successfully');
  });
};

export default connectToMongoDB;
