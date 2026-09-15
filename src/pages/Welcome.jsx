import { Link } from 'react-router'

function Welcome() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold">
          Tailorit
        </h1>

        <div className="flex items-center gap-4">
          <Link
            to="/sign-in"
            className="rounded-md px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-100"
          >
            Sign in
          </Link>

          <Link
            to="/sign-up"
            className="rounded-md bg-[#ff5a00] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#e94f00]"
          >
            Sign up
          </Link>

          <Link
            to="/catalog"
            className="rounded-md px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-100"
          >
            Catalog
          </Link>
        </div>
      </nav>

      {/* Landing Page */}
      <main className="flex min-h-[calc(100vh-90px)] items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-black">
            Welcome to Tailorit
          </h2>

          <p className="mt-4 text-gray-500">
            Make it yours.
          </p>
        </div>
      </main>

    </div>
  )
}

export default Welcome