import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useCurrentUser } from '@/lib/auth'

export default function Navbar() {
  const router = useRouter()
  const { user: currentUser, setUser } = useCurrentUser();

  async function logout() {
    Cookies.remove("currentUser", {sameSite: 'None', secure: true})
    setUser(null)
    router.push("/")
  }

  return (
    <nav className='navbar navbar-expand-md navbar-light bg-white shadow-sm'>
      <div className='container'>
        <Link className='navbar-brand' href='/'>
          NextJS Demo
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto'></ul>

          <ul className='navbar-nav ms-auto'>
            {currentUser ? (
              <li className='nav-item dropdown'>
                <a
                  id='navbarDropdown'
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                  v-pre='true'
                >
                  {currentUser.name}
                </a>

                <div
                  className='dropdown-menu dropdown-menu-end'
                  aria-labelledby='navbarDropdown'
                >
                  <button className='dropdown-item' onClick={logout}>Logout</button>
                </div>
              </li>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' href='/auth/login'>
                    Login
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link className='nav-link' href='/auth/register'>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
