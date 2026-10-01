const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const dbName = process.env.DBNAME;

// console.log("database name", dbName)

// console.log("database uri ", uri);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// connection check
const connectDB = async () => {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};

connectDB();

//

export const dbConnect = (cname) => {
  return client.db(dbName).collection(cname);
};
