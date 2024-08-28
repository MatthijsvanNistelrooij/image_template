import { SignIn } from "@clerk/nextjs"
import React from "react"

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center p-32">
      <SignIn />
    </div>
  )
}

export default SignInPage
