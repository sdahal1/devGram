import {
  useQuery, // used for fetching the data
  useMutation, // used for updating the data
  useQueryClient, // used for invalidating the cache
  useInfiniteQuery, // used for fetching paginated data
} from '@tanstack/react-query';
import { createUserAccount, signInAccount } from '../appwrite/api';
import { INewUser } from '@/types';


export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user)
  })
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: {
      email:string, password:string
    }) => signInAccount(user),
  })
}