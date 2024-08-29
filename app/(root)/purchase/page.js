"use server"
import { getUserById } from "@/lib/actions/user.actions"
import { auth } from "@clerk/nextjs/server"
import React from "react"
import { plans } from "@/constants"
import { SignedIn } from "@clerk/nextjs"
import Checkout from "@/components/Checkout"
import { Button } from "@/components/ui/button"

const Purchase = async () => {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const user = await getUserById(userId)

  return (
    <main className="flex flex-col items-center gap-8 lg:px-6 bg-black-3 text-white-1 mt-20">
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Buy Credits
      </h1>
      <section className="flex flex-wrap justify-center mt-20 gap-3 w-full">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border border-gray-1 rounded-md p-5 h-[300px] flex flex-col justify-between text-center w-full md:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] min-w-[250px]"
          >
            <div>
              <p className="font-semibold mt-2 text-purple-500">{plan.name}</p>
              <p className="h1-semibold text-dark-600">${plan.price}</p>
              <p className="p-16-regular">{plan.credits} Credits</p>
            </div>

            <SignedIn>
              <Checkout
                plan={plan.name}
                amount={plan.price}
                credits={plan.credits}
                buyerId={user._id}
              />
            </SignedIn>
          </div>
        ))}
      </section>
    </main>
  )
}

export default Purchase
