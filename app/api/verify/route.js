import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

// This function can be marked `async` if using `await` inside
export async function POST(request) {
    const uri = "mongodb://localhost:27017/";

    const client = new MongoClient(uri);
    // if (request.nextUrl.pathname.startsWith('/login')){
    try {
        const { username, password } = await request.json();
        await client.connect();
        const database = client.db('credentials');
        const collection = database.collection('users');

        const query = { username: username }
        const credentials = await collection.findOne(query);

        // console.log(credentials);
        if (credentials && credentials.password === password) {
    

            return NextResponse.json({ success: true });

        }
        else {

            return NextResponse.json({ success: false, message: 'Invalid credentials' });
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