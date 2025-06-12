import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()

    // Delete user's tasks
    await db.collection("tasks").deleteMany({ userId: session.user.id })

    // Delete user's accounts (OAuth connections)
    await db.collection("accounts").deleteMany({ userId: new ObjectId(session.user.id) })

    // Delete user's sessions
    await db.collection("sessions").deleteMany({ userId: new ObjectId(session.user.id) })

    // Delete the user
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(session.user.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Account deleted successfully" })
  } catch (error) {
    console.error("Delete account error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
