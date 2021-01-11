import Link from 'next/link'

export const Header = () => {
  return (
    <>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href="/about">
            <a>About</a>
          </Link>{' '}
          |{' '}
          <Link href="/users">
            <a>Users List</a>
          </Link>{' '}
          | <a href="/api/users">Users API</a>
        </nav>
      </header>
      <style jsx>{`
        header {
          padding: 15px;
          background: red;
        }
      `}</style>
    </>
  )
}