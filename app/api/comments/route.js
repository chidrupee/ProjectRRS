// /app/api/comments/insert.js
import { MongoClient } from 'mongodb';

export async function POST(request) {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);

    try {
        const { userid, title, comment } = await request.json();
        await client.connect();
        const database = client.db('credentials');
        const commentCollection = database.collection('comments');

        const query = {
            userid: userid,
            title: title,
            comment: [comment]
        };

        const insertResponse = await commentCollection.insertOne(query);

        if (insertResponse) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false }), { status: 400 });
        }
    } catch (error) {
        console.error("Error inserting comment: ", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    } finally {
        await client.close();
    }
}
