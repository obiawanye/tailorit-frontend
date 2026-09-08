import { useSignUp } from '@clerk/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    try {
      const { error } = await signUp.password({
        emailAddress: email,
        password,
      })

      if (error) {
        console.error(error)
        setErrorMessage(
          error.message || 'Unable to create your account.'
        )
        return
      }

      const { error: verificationError } =
        await signUp.verifications.sendEmailCode()

      if (verificationError) {
        console.error(verificationError)
        setErrorMessage(
          verificationError.message ||
            'Unable to send the verification code.'
        )
        return
      }

      navigate('/verify')
    } catch (error) {
      console.error(error)
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  const handleGoogleSignUp = async () => {
    setErrorMessage('')

    try {
      const { error } = await signUp.sso({
        strategy: 'oauth_google',
        redirectCallbackUrl: '/sso-callback',
        redirectUrl: '/catalog',
      })

      if (error) {
        console.error(error)
        setErrorMessage(
          error.message || 'Unable to continue with Google.'
        )
      }
    } catch (error) {
      console.error(error)
      setErrorMessage('Unable to continue with Google.')
    }
  }

  const isLoading = fetchStatus === 'fetching'

  return (
    <div className="min-h-screen bg-[#d9d9d9] px-5 py-8">

      {/* Page title */}
      <div className="mx-auto mb-4 max-w-[1100px]">
        <h2 className="text-2xl text-gray-600">
          Sign Up
        </h2>
      </div>

      {/* Main card */}
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 overflow-hidden bg-white p-5 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-6 py-8 md:px-10">

          {/* Temporary logo placeholder */}
          <div className="mb-8 flex h-10 w-24 items-center justify-center rounded-md border border-gray-300 text-sm font-medium text-gray-500">
            Tailorit
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold leading-tight text-black">
            Get started with
            <br />
            <span className="text-[#ff5a00]">
              Making it yours.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 text-sm text-gray-500">
            Create your account to start your journey now
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-black"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00]"
              />

              {errors?.fields?.emailAddress && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.fields.emailAddress.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-black"
              >
                Set Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  required
                  autoComplete="new-password"
                  className="w-full rounded-md border border-gray-300 px-3 py-3 pr-11 text-sm outline-none transition focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? '◉' : '◌'}
                </button>
              </div>

              {errors?.fields?.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.fields.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-black"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Re-enter password"
                  required
                  autoComplete="new-password"
                  className="w-full rounded-md border border-gray-300 px-3 py-3 pr-11 text-sm outline-none transition focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-label={
                    showConfirmPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showConfirmPassword ? '◉' : '◌'}
                </button>
              </div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <p className="text-sm text-red-500">
                {errorMessage}
              </p>
            )}

            {/* Sign Up */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-[#ff5a00] py-3 text-sm font-medium text-white transition hover:bg-[#e95000] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
            </button>

          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300" />

            <span className="text-xs text-gray-500">
              Or
            </span>

            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 py-3 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="font-bold text-blue-500">
              G
            </span>

            Continue with Google
          </button>

          {/* Login */}
          <p className="mt-9 text-center text-sm text-gray-700">
            Already have an account?{' '}
            <Link
              to="/sign-in"
              className="text-[#ff5a00] hover:underline"
            >
              Log in
            </Link>
          </p>

        </div>

        {/* RIGHT SIDE - TEMPORARY PLACEHOLDER */}
        <div className="hidden min-h-[650px] overflow-hidden rounded-2xl bg-gray-200 md:flex md:items-center md:justify-center">
          <div className="text-center text-gray-400">
            <div className="text-4xl">Image</div>
            <p className="mt-2 text-sm">
              Workspace image goes here
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUp