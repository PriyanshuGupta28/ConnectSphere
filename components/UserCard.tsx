import React from "react"
import type { User } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { UserDialog } from "./UserDialog"
import { PostsDialog } from "./PostsDialog"
import { Info, MessageSquare } from "lucide-react"

interface UserCardProps {
  user: User
  isSelected: boolean
}

export const UserCard: React.FC<UserCardProps> = ({ user, isSelected }) => {
  const [isUserDialogOpen, setIsUserDialogOpen] = React.useState(false)
  const [isPostsDialogOpen, setIsPostsDialogOpen] = React.useState(false)

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} layout>
      <Card className={`transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}>
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setIsUserDialogOpen(true)}>
              <Info className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsPostsDialogOpen(true)}>
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <UserDialog user={user} open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen} />
      <PostsDialog userId={user.id} open={isPostsDialogOpen} onOpenChange={setIsPostsDialogOpen} />
    </motion.div>
  )
}

