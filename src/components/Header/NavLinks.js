import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Badge from '@mui/material/Badge'
import './index.css'

const NavLinks = props => {
  const {isMobile, closeMobileMenu} = props
  const itemsList = JSON.parse(localStorage.getItem('cartData'))
  const cartItemsCount = itemsList === null ? 0 : itemsList.length
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="mobile-container">
      <Link to="/" className="link-heading-mobile">
        <li
          className="link-heading-mobile"
          onClick={() => isMobile && closeMobileMenu()}
        >
          Home
        </li>
      </Link>
      <Link to="/cart" className="link-heading-mobile">
        <Badge badgeContent={cartItemsCount} color="success" showZero>
          <li
            className="link-heading-mobile"
            onClick={() => isMobile && closeMobileMenu()}
          >
            Cart
          </li>
        </Badge>
      </Link>
      <li onClick={() => isMobile && closeMobileMenu()}>
        <button type="button" className="LoginButton1" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(NavLinks)
