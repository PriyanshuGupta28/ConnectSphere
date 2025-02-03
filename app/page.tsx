"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getUsers, type User } from "@/lib/api"
import { UserCard } from "@/components/UserCard"
import { SearchAndSort } from "@/components/SearchAndSort"
import { useSearchAndSort } from "@/hooks/useSearchAndSort"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  })

  const { searchTerm, setSearchTerm, sortOption, setSortOption, filteredAndSortedUsers } = useSearchAndSort(users || [])

  if (isLoadingUsers) return <div className="container mx-auto p-4">Loading users...</div>
  if (usersError) return <div className="container mx-auto p-4">Error loading users</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Directory</h1>
      <SearchAndSort
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <AnimatePresence>
          {filteredAndSortedUsers.map((user) => (
            <motion.div key={user.id} layout>
              <UserCard user={user} isSelected={user.id === selectedUserId} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

