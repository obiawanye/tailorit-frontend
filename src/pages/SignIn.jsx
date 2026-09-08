import { SignIn as ClerkSignIn } from '@clerk/react'

function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ClerkSignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/catalog"
      />
    </div>
  )
}

export default SignIn