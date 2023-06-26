import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const notFoundUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625830262/NotFound_kpncbm.png'
const NotFound = () => (
  <>
    <Header />
    <div className="BackgroundContainer">
      <div className="NotFoundContainer">
        <img src={notFoundUrl} alt="not found" />
        <h1 className="Heading">Page Not Found</h1>
        <p className="Para">
          we are sorry, the page you requested could not be found. Please go
          back to the homepage
        </p>
        <Link to="/" style={{textDecoration: 'none'}}>
          <button type="button" className="Button">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default NotFound
