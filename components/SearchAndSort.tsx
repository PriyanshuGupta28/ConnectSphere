import type React from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchAndSortProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  sortOption: string
  setSortOption: (option: "name" | "company") => void
}

export const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <Input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow"
      />
      <Select value={sortOption} onValueChange={(value: "name" | "company") => setSortOption(value)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Sort by Name</SelectItem>
          <SelectItem value="company">Sort by Company</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

