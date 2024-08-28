import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"
import { getUserById } from "@/lib/actions/user.actions"
import Link from "next/link"
import UserImages from "@/components/UserImages"

const Profile = async () => {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const user = await getUserById(userId)

  if (!user || !userId) return <LoaderSpinner />

  return (
    <>
      <section className="mt-9 flex flex-col">
        <h1 className="text-20 font-bold text-white-1 max-md:text-center">
          Profile
        </h1>
        <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
          <Image
            src={user?.photo}
            width={250}
            height={250}
            alt="profile"
            className="aspect-square rounded-lg mt-6"
          />
          <div className="flex flex-col justify-center max-md:items-center mt-6">
            <div className="flex flex-col gap-2.5">
              <figure className="flex gap-2 max-md:justify-center">
                <Image
                  src="/icons/verified.svg"
                  width={15}
                  height={15}
                  alt="verified"
                />
                <h2 className="text-14 font-medium text-white-2">
                  Verified Creator
                </h2>
              </figure>
              <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
                {user?.firstName}
              </h1>
              <h1 className="text-white-1 text-20">
                Credits: {user.creditBalance}
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Your Posts</h1>
        <UserImages />
      </section>
    </>
  )
}

export default Profile
