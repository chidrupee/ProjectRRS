import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

// This function can be marked `async` if using `await` inside
export async function POST(request) {
    const uri = "mongodb://localhost:27017/";

    const client = new MongoClient(uri);
    // if (request.nextUrl.pathname.startsWith('/login')){
    try {
        const { infoQuery } = await request.json();
        await client.connect();
        const database = client.db('bookdb');
        const collection = database.collection('books');

        const query = { Title: infoQuery }
        // const credentials = await collection.findOne(query);
        const book_detail = await collection.findOne(query);

        // console.log(credentials);
        // if (credentials && credentials.password === password) {
        if (book_detail && book_detail.Title === infoQuery) {
    

            return NextResponse.json({ success: true, info : JSON.stringify(book_detail) });

        }
        else {

            return NextResponse.json({ success: false, message: 'No book found' });
        }
    }
    catch (error) {
        console.log(error);
    }
}
//   return NextResponse.redirect(new URL('/home', request.url))

// }

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/about/:path*',
// }