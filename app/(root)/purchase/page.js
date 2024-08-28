"use server"
import { getUserById } from "@/lib/actions/user.actions"
import { auth } from "@clerk/nextjs/server"
import React from "react"
import { plans } from "@/constants"
import { SignedIn } from "@clerk/nextjs"
import Checkout from "@/components/Checkout"

const Purchase = async () => {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const user = await getUserById(userId)

  return (
    <section className="flex min-h-screen flex-col items-center gap-8 p-5 lg:px-60 bg-black-3 text-white-1">
      <h2 className="text-3xl flex justify-center my-16">Buy Credits</h2>
      <section className="flex justify-center">
        <ul className="flex flex-row gap-5 text-center">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className="border border-gray-200 rounded-xl h-[400px] flex flex-col justify-between p-20"
            >
              <div>
                <p className="p-20-semibold mt-2 text-purple-500">
                  {plan.name}
                </p>
                <p className="h1-semibold text-dark-600">${plan.price}</p>
                <p className="p-16-regular">{plan.credits} Credits</p>
              </div>

              {plan.name === "Free" ? (
                <button
                  variant="outline"
                  className="border border-gray-200 p-2 rounded-md hover:bg-gray-100"
                >
                  Free Consumable
                </button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}

export default Purchase
