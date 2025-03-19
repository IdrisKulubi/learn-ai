import { signIn, signOut } from "../../auth"
import { signInFormSchema } from "../validator"

export async function signInWithCredentials(
    prevState: unknown,
    formData: FormData
  ) {
    try {
      const user = signInFormSchema.parse({
        email: formData.get('email'),
        password: formData.get('password'),
      })
  
      await signIn('credentials', user)
      return { success: true, message: 'Sign in successfully' }
    } catch (error) {
      if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
        throw error
      }
      return { success: false, message: 'Invalid email or password' }
    }
  }

// The Google sign-in function is not meant to be called directly from a client component
// Instead, we'll use the client-side signIn function from 'next-auth/react'

// This server-side function is kept for reference but should not be used
export const SignInWithGoogle = async () => {
  throw new Error("This server action shouldn't be called directly from client components. Use the client-side signIn function from next-auth/react instead.")
}
  
export const SignOut = async () => {
  await signOut()
}
