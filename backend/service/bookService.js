const Book = require("../entity/book");

class BookService {
  async getBooks(offset, limit) {
    try {
      const totalCountResult = await Book.aggregate([{ $count: "totalCount" }]);
      const totalCount = totalCountResult.length > 0 ? totalCountResult[0].totalCount : 0;
      const booksPipeline = [{ $skip: offset }, { $limit: limit }];
      const books = await Book.aggregate(booksPipeline);

      return { books, totalCount };
    } catch (error) {
      throw new Error("Failed to fetch books.");
    }
  }
}

module.exports = new BookService();
