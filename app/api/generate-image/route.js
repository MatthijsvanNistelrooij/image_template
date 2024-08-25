import fs from "node:fs"
import axios from "axios"
import FormData from "form-data"
import { connectToDatabase } from "@/lib/mongodb"
import Image from "@/models/Image"

export async function POST(req) {
  try {
    const { prompt } = await req.json()
    console.log("Received prompt:", prompt)

    const payload = {
      prompt,
      output_format: "jpeg",
    }

    const response = await axios.postForm(
      `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
      axios.toFormData(payload, new FormData()),
      {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${vercel.env.STABILITY_API_KEY}`, 
          Accept: "image/*",
        },
      }
    )

    console.log("Response from Stability AI:", response.status)

    if (response.status === 200) {
      await connectToDatabase()
      const imageBuffer = Buffer.from(response.data)

      const newImage = new Image({
        prompt,
        image: imageBuffer,
        createdAt: new Date(),
      })

      await newImage.save()
      console.log("Image saved to MongoDB")

      return new Response(
        JSON.stringify({ message: "Image generated and saved!" }),
        { status: 200 }
      )
    } else {
      throw new Error(`${response.status}: ${response.data.toString()}`)
    }
  } catch (error) {
    console.error("Error occurred in generate-image API route:", error)
    return new Response(JSON.stringify({ error: "Failed to generate image" }), {
      status: 500,
    })
  }
}
