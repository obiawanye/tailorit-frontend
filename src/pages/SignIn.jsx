import { useSignIn } from '@clerk/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

import authImage from '../assets/AuthImage.png'
import logo from '../assets/TailorIt_Logo.png'

function SignIn() {
  const { signIn, errors } = useSignIn()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsLoading(true)

    try {
      const { error } = await signIn.password({
        emailAddress: email,
        password,
      })

      if (error) {
        console.error(JSON.stringify(error, null, 2))
        return
      }

      if (signIn.status === 'complete') {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log('Session task:', session.currentTask)
              return
            }

            const url = decorateUrl('/catalog')

            if (url.startsWith('http')) {
              window.location.href = url
            } else {
              navigate('/catalog')
            }
          },
        })
      } else {
        console.log('Sign-in not complete:', signIn.status)
      }
    } catch (error) {
      console.error('Sign-in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)

    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/catalog',
      })
    } catch (error) {
      console.error(error)
      setGoogleLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-white">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">

        {/* Left Column */}
        <div className="flex min-h-screen flex-col">

          {/* Navbar */}
          <nav className="flex h-[90px] items-center px-8 sm:px-10 lg:px-14">
            <Link to="/">
              <img
                src={logo}
                alt="Tailorit Logo"
                className="w-[100px] object-contain"
              />
            </Link>
          </nav>

          {/* Sign In Content */}
          <div className="flex flex-1 items-start px-8 pb-10 pt-1 sm:px-10 lg:px-14">
            <div className="w-full max-w-[550px]">

              {/* Heading */}
              <h1 className="text-4xl font-bold leading-tight text-black sm:text-5xl">
                Welcome back
                <br />
                <span className="text-[#ff5a00]">
                  Make it yours.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 text-base text-gray-500">
                Sign in to continue your Tailorit journey
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
                    Password
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
                      autoComplete="current-password"
                      className="w-full rounded-md border border-gray-300 px-3.5 py-3 pr-11 text-sm outline-none transition focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((current) => !current)
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

                {/* Remember Me + Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-500">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                      className="h-5 w-5 cursor-pointer rounded border-gray-300 accent-[#ff5a00]"
                    />

                    Remember me
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#ff5a00] transition hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-md bg-[#ff5a00] py-3 text-sm font-medium text-white transition hover:bg-[#e94f00] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-300" />

                <span className="text-sm text-gray-600">
                  Or
                </span>

                <div className="h-px flex-1 bg-gray-300" />
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 py-3 text-sm font-medium text-black transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FcGoogle size={20} />

                {googleLoading
                  ? 'Connecting to Google...'
                  : 'Continue with Google'}
              </button>

              {/* Sign Up */}
              <p className="mt-7 text-center text-sm text-gray-600">
                Don't have an account?{' '}

                <Link
                  to="/sign-up"
                  className="text-[#ff5a00] transition hover:underline"
                >
                  Create one
                </Link>
              </p>

            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="hidden min-h-screen p-4 lg:block">
          <div className="h-full overflow-hidden rounded-2xl">
            <img
              src={authImage}
              alt="Tailorit workspace"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignIn