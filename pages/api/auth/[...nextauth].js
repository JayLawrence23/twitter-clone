import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        version: '2.0'
    })
    // ...add more providers here
  ],
  secret: 'b4a679f8dadcc522c4cf300f92287e6f',

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    }
    }
}

export default NextAuth(authOptions)