import axios from '@/utils/api/axios'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

export interface User {
  id: number
  last_login: Date
  firstName: string
  lastName: string
  phoneNumber: string
}

const UserContext = createContext(null)

const userKey = 'user'

export function UserProvider({ children }: { children: ReactNode }) {
  const state = useState<User | null>(null)

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>
}

export default function useUser() {
  const [user, setUser] =
    useContext<[User, Dispatch<SetStateAction<User | null>>]>(UserContext)

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem(userKey))

    if (userData) setUser(userData)
    else setUser(null)
  }, [setUser])

  return user
}

export async function login(body: { phoneNumber: string; password: string }) {
  return axios
    .post<User>('api/login/login/', body)
    .then((res) => res.data)
    .then((data) => ({
      ...data,
      last_login: data.last_login ? new Date(data.last_login) : null,
    }))
    .then((user) => window.localStorage.setItem(userKey, JSON.stringify(user)))
}

export function logout() {
  window.localStorage.removeItem(userKey)
}
