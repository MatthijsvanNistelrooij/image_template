import { connectToDatabase } from "@/lib/mongodb"
import Image from "@/models/Image"

export async function GET(req, { params }) {
  await connectToDatabase()
  const { id } = params

  try {
    if (!id) {
      throw new Error("No id provided")
    }

    const image = await Image.findById(id)
    if (!image) {
      console.error("Image not found for id:", id)
      return new Response(JSON.stringify({ error: "Image not found" }), {
        status: 404,
      })
    }

    // Handle case where image is a Buffer or Base64 string
    let imageBase64
    if (Buffer.isBuffer(image.image)) {
      imageBase64 = image.image.toString("base64")
    } else if (typeof image.image === "string") {
      // If the image is already a Base64 string
      imageBase64 = image.image
    } else {
      console.error("Image field is not a Buffer or string:", image.image)
      return new Response(
        JSON.stringify({ error: "Image data is not valid" }),
        { status: 500 }
      )
    }

    return new Response(
      JSON.stringify({
        image: imageBase64,
        prompt: image.prompt,
        clerkId: image.clerkId,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Error in GET request:", error)
    return new Response(
      JSON.stringify({ error: "Failed to fetch image GET" }),
      {
        status: 500,
      }
    )
  }
}

// PUT request to update image details
export async function PUT(req, { params }) {
  await connectToDatabase()
  const { id } = params
  const body = await req.json()

  console.log("Received PUT request with id:", id, "and body:", body) // Debugging statement

  try {
    if (!id) {
      throw new Error("No id provided")
    }

    const image = await Image.findByIdAndUpdate(id, body, { new: true })
    if (!image) {
      console.error("Image not found for id:", id) // Debugging statement
      return new Response(JSON.stringify({ error: "Image not found" }), {
        status: 404,
      })
    }

    // Convert Buffer to Base64 string
    const imageBase64 = image?.image?.toString("base64")

    return new Response(
      JSON.stringify({ image: imageBase64, prompt: image.prompt }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Error in PUT request:", error) // Debugging statement
    return new Response(JSON.stringify({ error: "Failed to update image" }), {
      status: 500,
    })
  }
}

// DELETE request to delete an image
export async function DELETE(req, { params }) {
  await connectToDatabase()
  const { id } = params

  console.log("Received DELETE request with id:", id) // Debugging statement

  try {
    if (!id) {
      throw new Error("No id provided")
    }

    const image = await Image.findByIdAndDelete(id)
    if (!image) {
      console.error("Image not found for id:", id) // Debugging statement
      return new Response(JSON.stringify({ error: "Image not found" }), {
        status: 404,
      })
    }
    return new Response(
      JSON.stringify({ message: "Image deleted successfully" }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Error in DELETE request:", error) // Debugging statement
    return new Response(JSON.stringify({ error: "Failed to delete image" }), {
      status: 500,
    })
  }
}
