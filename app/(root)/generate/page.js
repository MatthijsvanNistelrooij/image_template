import { auth } from "@clerk/nextjs/server"
import Generate from "../../../components/Generate"
import { getUserById } from "@/lib/actions/user.actions"
import { creditFee } from "@/constants"

const GenerateImage = async ({}) => {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const user = await getUserById(userId)

  const { creditBalance } = user

  return (
    <Generate
      userId={userId}
      creditFee={creditFee}
      creditBalance={creditBalance}
    />
  )
}

export default GenerateImage
