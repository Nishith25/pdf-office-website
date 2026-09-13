import {
  MongoClient,
} from "mongodb";

import {
  hashPassword,
} from "../lib/auth/password";

import {
  normalizeAdminEmail,
} from "../lib/repositories/admin";

const rawUri =
  process.env.MONGODB_URI;

const rawEmail =
  process.env.ADMIN_EMAIL;

const rawPassword =
  process.env.ADMIN_PASSWORD;

const databaseName =
  process.env.MONGODB_DB ||
  "pdf_office_website";

if (!rawUri) {
  throw new Error(
    "MONGODB_URI is missing",
  );
}

if (!rawEmail) {
  throw new Error(
    "ADMIN_EMAIL is missing",
  );
}

if (!rawPassword) {
  throw new Error(
    "ADMIN_PASSWORD is missing",
  );
}

if (
  rawPassword.length < 12
) {
  throw new Error(
    "ADMIN_PASSWORD must be at least 12 characters long",
  );
}

const uri: string =
  rawUri;

const adminPassword: string =
  rawPassword;

const email =
  normalizeAdminEmail(
    rawEmail,
  );

async function createAdmin() {
  const client =
    new MongoClient(uri);

  try {
    await client.connect();

    console.log(
      "Connected to MongoDB",
    );

    const database =
      client.db(
        databaseName,
      );

    const collection =
      database.collection(
        "admin",
      );

    await collection.createIndex(
      {
        key: 1,
      },
      {
        unique: true,
      },
    );

    const passwordHash =
  await hashPassword(
    adminPassword,
  );

    const now =
      new Date();

    const result =
      await collection.updateOne(
        {
          key: "primary",
        },
        {
          $set: {
            email,
            passwordHash,
            updatedAt: now,
          },

          $setOnInsert: {
            key: "primary",
            createdAt: now,
          },
        },
        {
          upsert: true,
        },
      );

    if (
      result.upsertedCount > 0
    ) {
      console.log(
        "Admin account created.",
      );
    } else {
      console.log(
        "Admin account updated.",
      );
    }

    console.log(
      `Admin email: ${email}`,
    );
  } finally {
    await client.close();

    console.log(
      "MongoDB connection closed.",
    );
  }
}

createAdmin().catch(
  (error) => {
    console.error(
      "Admin setup failed:",
      error,
    );

    process.exit(1);
  },
);