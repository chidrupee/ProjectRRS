import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

// This function can be marked `async` if using `await` inside
export async function POST(request) {
    const uri = "mongodb://localhost:27017/";

    const client = new MongoClient(uri);
    // if (request.nextUrl.pathname.startsWith('/login')){
    try {
        const { tags } = await request.json();
        await client.connect();
        const database = client.db('bookdb');
        const collection = database.collection('books');

        const bookPromises = tags.map(async (tag) => {
            const books = await collection.find({ 'mycategories': tag })
            // const books = await collection.find({
            //     $expr: {
            //         $eq : [{$arrayElemAt: ['$mycategories', 0]}, tag]
            //     }
            // })
            .sort({'Rating' : -1})
            .limit(20)
            .toArray();
            return { tag, books };
        });


        const results = await Promise.all(bookPromises);


        const recommendations = {};
        results.forEach(({ tag, books }) => {
            recommendations[tag] = books;
        });

        // console.log(credentials);



        return NextResponse.json({ success: true, result: recommendations });



    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' })
    }
    finally {
        await client.close();
    }
}
//   return NextResponse.redirect(new URL('/home', request.url))

// }

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/about/:path*',
// }