import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();

export const addBooks = async(req, res) => {
    try {
        const { name, author, publisher, publicationYear, subject} = req.body;

        const data = {
            name,
            author,
            publisher,
            publicationYear,
            subject
        }
     const book = await Prisma.books.create({ data: data });
     return res.status(201).json(book);

    } catch (error){
      console.log("Error occured when creating a book", error);
      return res.status(409).json({ error: error.message });
    }
}
export const getBooks = async(req, res) => {
    try {
        const books = await Prisma.books.findMany();
        return res.status(200).json(books);
    } catch (error){
      console.log("Error occured when getting books", error);
      return res.status(409).json({ error: error.message });
    }
}