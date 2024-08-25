import { connectToDatabase } from "@/lib/mongodb";
import Image from "@/models/Image";

export async function GET(req, { params }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const image = await Image.findById(id);
    if (!image) return new Response(JSON.stringify({ error: "Image not found" }), { status: 404 });

    // Convert Buffer to Base64 string
    const imageBase64 = image.image.toString('base64');
    
    return new Response(JSON.stringify({ image: imageBase64, prompt: image.prompt }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch image" }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const body = await req.json();

  try {
    const image = await Image.findByIdAndUpdate(id, body, { new: true });
    if (!image) return new Response(JSON.stringify({ error: "Image not found" }), { status: 404 });
    
    // Convert Buffer to Base64 string
    const imageBase64 = image.image.toString('base64');
    
    return new Response(JSON.stringify({ image: imageBase64, prompt: image.prompt }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update image" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const image = await Image.findByIdAndDelete(id);
    if (!image) return new Response(JSON.stringify({ error: "Image not found" }), { status: 404 });
    return new Response(JSON.stringify({ message: "Image deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete image" }), { status: 500 });
  }
}
