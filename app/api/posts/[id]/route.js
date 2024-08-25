// app/api/posts/[id]/route.js

import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(req, { params }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const post = await Post.findById(id);
    if (!post) return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch post" }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const body = await req.json();

  try {
    const post = await Post.findByIdAndUpdate(id, body, { new: true });
    if (!post) return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update post" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    return new Response(JSON.stringify({ message: "Post deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete post" }), { status: 500 });
  }
}
