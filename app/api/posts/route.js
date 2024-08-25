// app/api/posts/route.js

import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(req) {
  await connectToDatabase();
  try {
    const posts = await Post.find({});
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), { status: 500 });
  }
}

export async function POST(req) {
  await connectToDatabase();
  const body = await req.json();
  try {
    const post = new Post(body);
    await post.save();
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create post" }), { status: 500 });
  }
}
