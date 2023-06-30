require("dotenv").config();
const { fakerKO: faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Book = require("./entity/book");
async function seedData() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Generate fake books data
    const books = [];
    for (let i = 0; i < 100; i++) {
      const numImages = faker.helpers.rangeToNumber({ min: 1, max: 4 });
      const images = [];

      for (let i = 0; i < numImages; i++) {
        const imageUrl = faker.image.url();
        images.push(imageUrl);
      }
      const book = new Book({
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        discountRate: faker.helpers.rangeToNumber({ min: 1, max: 99 }),
        coverImage: faker.image.url(),
        images,
        price: faker.commerce.price(),
      });
      books.push(book);
    }

    // Insert the generated books data into the database
    await Book.insertMany(books);

    console.log("Data seeding completed.");
  } catch (error) {
    console.error("Data seeding failed:", error);
  } finally {
    // Disconnect from the MongoDB database
    mongoose.disconnect();
  }
}

seedData();
