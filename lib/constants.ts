export const APP_NAME = "Learn AI"
export const APP_DESCRIPTION = "Learn AI is a platform for learning AI"
export const APP_URL = "https://learn-ai.com"

export const APP_AUTHOR_URL = "https://learn-ai.com"


export const signInDefaultValues = {
    email: '',
    password: '',
  }
  
  export const signUpDefaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }


  export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(', ')
  : ['admin', 'user']