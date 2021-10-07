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
import { User } from '../types'

const UserContext = createContext<
  [User | null, Dispatch<SetStateAction<User | null>>]
>([null, () => null])

const userKey = 'user'

export function UserProvider({ children }: { children: ReactNode }) {
  const state = useState<User | null>(null)

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>
}

export default function useUser() {
  const [user, setUser] =
    useContext<[User | null, Dispatch<SetStateAction<User | null>>]>(
      UserContext
    )

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem(userKey) as string)

    if (userData) setUser(userData)
    else setUser(null)
  }, [setUser])

  return user
}

export async function login(body: { phoneNumber: string; password: string }) {
  return axios
    .post<User>('api/login/', body)
    .then((res) => res.data)
    .then((data) => ({
      ...data,
      last_login: data.last_login ? new Date(data.last_login) : null,
    }))
    .then((user) => window.localStorage.setItem(userKey, JSON.stringify(user)))
}

export async function signup(body: {
  firstName: string
  lastName: string
  phoneNumber: string
  password: string
}) {
  return axios
    .post<User>('api/signup/', body)
    .then((res) => res.data)
    .then((data) => ({
      ...data,
      last_login: data.last_login ? new Date(data.last_login) : null,
    }))
    .then((user) => window.localStorage.setItem(userKey, JSON.stringify(user)))
}

export function logout() {
  window.localStorage.removeItem(userKey)
  window.location.reload()
}
