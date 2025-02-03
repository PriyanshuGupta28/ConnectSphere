import axios from "axios"

const API_BASE_URL = "https://jsonplaceholder.typicode.com"

export interface User {
  id: number
  name: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
  company: {
    name: string
  }
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_BASE_URL}/users`)
  return response.data
}

export const getPosts = async (userId: number): Promise<Post[]> => {
  const response = await axios.get(`${API_BASE_URL}/posts?userId=${userId}`)
  return response.data
}

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_BASE_URL}/posts`)
  return response.data
}

