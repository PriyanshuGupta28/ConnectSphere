import { useState, useMemo } from "react"
import type { User } from "@/lib/api"

type SortOption = "name" | "company"

export const useSearchAndSort = (users: User[]) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("name")

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => {
        if (sortOption === "name") {
          return a.name.localeCompare(b.name)
        } else {
          return a.company.name.localeCompare(b.company.name)
        }
      })
  }, [users, searchTerm, sortOption])

  return {
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    filteredAndSortedUsers,
  }
}

