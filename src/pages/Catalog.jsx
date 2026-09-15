import { useAuth } from '@clerk/react'

function Catalog() {
  const { signOut } = useAuth()

  return (
    <div>
      <h1>Catalog</h1>

      <button
        onClick={() => signOut({ redirectUrl: '/' })}
        className="mt-4 rounded-md bg-[#ff5a00] px-4 py-2 text-white"
      >
        Sign out
      </button>
    </div>
  )
}

export default Catalog