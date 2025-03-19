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


  export const SignInWithGoogle = async () => {
    await signIn('google')
  }

  
export const SignOut = async () => {
    await signOut()
  }
