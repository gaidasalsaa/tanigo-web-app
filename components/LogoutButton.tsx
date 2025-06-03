"use client"

import { LogOut } from "lucide-react"
import { signOutAction } from "@/actions/auth"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition()
  const router= useRouter()

  const handleLogout = () => {
    startTransition(async () => {
      await signOutAction()
    })
    router.push("/login")
  }

  return (
    <button 
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center w-full text-left cursor-pointer disabled:opacity-50"
    >
      <LogOut className="h-4 w-4 mr-2" />
      {isPending ? "Keluar..." : "Keluar"}
    </button>
  )
}

export default LogoutButton