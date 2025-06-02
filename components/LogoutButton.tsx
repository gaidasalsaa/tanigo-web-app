"use client"

import { LogOut } from "lucide-react"
import { signOutAction } from "@/actions/auth"
import { useTransition } from "react"

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await signOutAction()
    })
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