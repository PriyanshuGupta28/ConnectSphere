import type React from "react"
import type { User } from "@/lib/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

interface UserDialogProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const UserDialog: React.FC<UserDialogProps> = ({ user, open, onOpenChange }) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              <Avatar className="w-24 h-24">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="text-center">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Website:</strong> {user.website}
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold">Address</h3>
                <p>
                  {user.address.street}, {user.address.suite}
                </p>
                <p>
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold">Company</h3>
                <p>{user.company.name}</p>
                <p>
                  <em>"{user.company.catchPhrase}"</em>
                </p>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

