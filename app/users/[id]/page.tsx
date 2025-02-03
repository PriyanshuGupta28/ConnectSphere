"use client"

import { useQuery } from "@tanstack/react-query"
import { getUsers, getPosts, type User, type Post } from "@/lib/api"
import { PostCard } from "@/components/PostCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const userId = Number.parseInt(params.id)

  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  })

  const {
    data: posts,
    isLoading: isLoadingPosts,
    error: postsError,
  } = useQuery<Post[]>({
    queryKey: ["posts", userId],
    queryFn: () => getPosts(userId),
  })

  if (isLoadingUsers || isLoadingPosts) return <div>Loading...</div>
  if (usersError || postsError) return <div>Error loading data</div>

  const user = users?.find((u) => u.id === userId)

  if (!user) return <div>User not found</div>

  return (
    <div className="container mx-auto p-4">
      <Link href="/">
        <Button className="mb-4">Back to Dashboard</Button>
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Email: {user.email}</p>
            <p>
              Address: {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
            </p>
            <p>Company: {user.company.name}</p>
          </CardContent>
        </Card>
      </motion.div>
      <h2 className="text-2xl font-semibold mb-4">User Posts</h2>
      <div className="space-y-4">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

