import type React from "react"
import { useQuery } from "@tanstack/react-query"
import { getPosts, type Post } from "@/lib/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { PostCard } from "./PostCard"

interface PostsDialogProps {
  userId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PostsDialog: React.FC<PostsDialogProps> = ({ userId, open, onOpenChange }) => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts", userId],
    queryFn: () => getPosts(userId),
    enabled: open,
  })

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>User Posts</DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {isLoading && <p>Loading posts...</p>}
              {error && <p>Error loading posts</p>}
              {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

