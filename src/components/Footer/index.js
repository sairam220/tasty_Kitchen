import {
  FaInstagram,
  FaPinterestSquare,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo-container">
      <img
        className="logo-image"
        alt="website-footer-logo"
        src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625978524/footer-icon_cs8bzb.png"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="contact-us">
      The only thing we are serious about is food.
      <br /> Contact us on
    </p>
    <div className="icon-container">
      <FaPinterestSquare className="logos" testid="pintrest-social-icon" />
      <FaInstagram className="logos" testid="instagram-social-icon" />
      <FaTwitterSquare className="logos" testid="twitter-social-icon" />
      <FaFacebookSquare className="logos" testid="facebook-social-icon" />
    </div>
  </div>
)

export default Footer
