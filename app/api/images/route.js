import { connectToDatabase } from "@/lib/mongodb";
import Image from "@/models/Image";

export async function GET() {
  await connectToDatabase();
  const images = await Image.find().limit(100); 

  return new Response(JSON.stringify(images), { status: 200 });
}
