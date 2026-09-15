import { useSignUp } from '@clerk/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

import authImage from '../assets/AuthImage.png'
import logo from '../assets/TailorIt_Logo.png'

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
    <div className="h-screen overflow-hidden bg-white">

      <div className="grid h-full grid-cols-1 lg:grid-cols-2">

        {/* LEFT COLUMN */}
        <div className="flex min-h-screen flex-col">

          {/* NAVBAR */}
          <nav className="flex h-[90px] items-center px-8 sm:px-10 lg:px-14">
            <img
              src={logo}
              alt="Tailorit Logo"
              className="w-[100px] object-contain"
            />
          </nav>

          {/* SIGN UP CONTENT */}
          <div className="flex flex-1 items-start px-8 pb-10 pt-1 sm:px-10 lg:px-14">
            <div className="w-full max-w-[520px]">

              {/* Heading */}
              <h1 className="text-4xl font-bold leading-tight text-black sm:text-5xl">
                Get started with
                <br />
                <span className="text-[#ff5a00]">
                  Making it yours.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 text-base text-gray-500">
                Create your account to start your journey now
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                
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
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="w-full rounded-md border border-gray-300 px-3.5 py-3 text-sm outline-none transition focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00]"
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
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Enter your password"
                      required
                      autoComplete="new-password"
                      className="w-full rounded-md border border-gray-300 px-3.5 py-3 pr-11 text-sm outline-none transition focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                      aria-label={
                        showPassword
                          ? 'Hide password'
                          : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff />
                      ) : (
                        <FiEye />
                      )}
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
                      type={
                        showConfirmPassword
                          ? 'text'
                          : 'password'
                      }
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Re-enter password"
                      required
                      autoComplete="new-password"
                      className="w-full rounded-md border border-gray-300 px-3.5 py-3 pr-11 text-sm outline-none transition focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) => !current
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                      aria-label={
                        showConfirmPassword
                          ? 'Hide password'
                          : 'Show password'
                      }
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff />
                      ) : (
                        <FiEye />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
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
                  {isLoading
                    ? 'Creating account...'
                    : 'Sign up'}
                </button>

              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-300" />

                <span className="text-sm text-gray-500">
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
                <FcGoogle className="text-xl" />
                Continue with Google
              </button>

              {/* Login */}
              <p className="mt-7 text-center text-sm text-gray-700">
                Already have an account?{' '}
                <Link
                  to="/sign-in"
                  className="text-[#ff5a00] hover:underline"
                >
                  Log in
                </Link>
              </p>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="hidden min-h-screen p-4 lg:block">
          <div className="h-full overflow-hidden rounded-2xl">
            <img src={authImage} alt="Tailorit workspace" className="h-full w-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUp