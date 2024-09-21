import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

// This function can be marked `async` if using `await` inside
export async function POST(request) {
    const uri = "mongodb://localhost:27017/";

    const client = new MongoClient(uri);
    // if (request.nextUrl.pathname.startsWith('/login')){
    try {
        const userJSON = await request.json();

        // const username = userJSON.username;
        // const password = userJSON.password;
        // const email = userJSON.email;
        // const preferences = userJSON.Preferences;

        const { username, password, email, "First Name": fname, "Last Name": lname, Gender :  gender, Age: age, Domain: domain,  Preferences: preferences } = userJSON;

        await client.connect();
        const database = client.db('credentials');
        const collection = database.collection('users');

        const query = { username: username }
        const credentials = await collection.findOne(query);

        const insertQuery = { username: username, password: password, email: email, interests : preferences, firstName: fname, lastname: lname, gender : gender, age: age, domain:domain  }

        const insertResponse = await collection.insertOne(insertQuery);


        if(insertResponse){
            return NextResponse.json({success : true});
        }

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