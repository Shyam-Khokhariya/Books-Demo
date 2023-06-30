const bookService = require("../service/bookService");

class BookController {
  async getBooks(req, res) {
    try {
      const { offset, limit } = req.query;
      const books = await bookService.getBooks(Number(offset), Number(limit));
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch books." });
    }
  }
}

module.exports = new BookController();
