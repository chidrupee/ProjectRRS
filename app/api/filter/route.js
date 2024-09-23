import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

export async function POST(request) {
    try {
        const { tags } = await request.json();
        await client.connect();
        const database = client.db('bookdb');
        const collection = database.collection('books');

        // Query to find books with categories in tags
        const query = { mycategories: { $in: tags } };
        const books_returned = await collection.find(query).toArray(); // Convert cursor to array

        // Check if books were found
        if (books_returned.length > 0) {
            return NextResponse.json({ success: true, searchRes: books_returned });
        } else {
            return NextResponse.json({ success: false, message: 'No books found' });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error fetching books' });
    } finally {
        await client.close(); // Ensure client is closed
    }
}
