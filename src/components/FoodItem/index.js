import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {HiOutlineMinusSm} from 'react-icons/hi'
import Snackbar from '@mui/material/Snackbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import {BsPlus} from 'react-icons/bs'
import itemClass from './FoodItem.module.css'
import './index.css'

class FoodItem extends Component {
  state = {
    isFound: false,
    quantity: 0,
    open: false,
  }

  // get the local storage data
  componentDidMount() {
    this.findTheCartItemInList()
  }

  /* getTheLocalStorageData = () => {
    const cartList = JSON.parse(localStorage.getItem('cart_list')) || []
    // console.log(cartList)
    this.setState({cartList})
  } */

  /* Add to cart when click on add button. this will
  store in local storage */

  findTheCartItemInList = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItem} = this.props
    const cartItem = cartData.filter(each => each.id === foodItem.id)
    // console.log(cartItem)
    if (cartItem.length !== 0) {
      // console.log(cartItem)
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity, isFound: true})
      } else if (cartItem[0].quantity < 1) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity, isFound: false})
      }
    }
  }

  goToCart = () => {
    const {history} = this.props
    history.replace('/cart')
  }

  incrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        // console.log('found')
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  decrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        // console.log('found')
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  removeCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.filter(
      eachCartItem => eachCartItem.id !== foodItem.id,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({open: false})
  }

  addCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItem} = this.props
    // console.log(foodItem)
    const cartItem = {...foodItem, quantity: 1}
    // console.log(cartItem)
    cartData.push(cartItem)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.findTheCartItemInList()
    this.setState({isFound: true})
  }

  render() {
    const action = (
      <>
        <Button color="secondary" size="small" onClick={this.goToCart}>
          VIEW CART
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={this.handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </>
    )
    const {foodItem} = this.props
    const {isFound, quantity, open} = this.state
    const vertical = 'bottom'
    const horizontal = 'right'
    console.log(quantity)
    return (
      <li className={itemClass.ListItem} testid="foodItem">
        <img
          src={foodItem.imageUrl}
          alt="food-item"
          className={itemClass.RestaurantImage}
        />
        <div className={itemClass.ItemDetails}>
          <h1 className={itemClass.ItemName}>{foodItem.name}</h1>
          <div className={itemClass.ItemRateContainer}>
            <BiRupee className={itemClass.ItemRupee} />
            <p className={itemClass.ItemCost}>{foodItem.cost}</p>
          </div>
          <div className={itemClass.ItemRatingContainer}>
            <AiFillStar className={itemClass.ItemStar} />
            <p className={itemClass.ItemRatingText}>{foodItem.rating}</p>
          </div>
          {isFound ? (
            <div className="each-item-counter-container" id={foodItem.id}>
              <button
                type="button"
                className="minus-icon-container"
                testid="decrement-count"
                onClick={this.decrementCartItemQuantity}
              >
                <HiOutlineMinusSm className="minus-icon" />
              </button>
              <button
                type="button"
                className="count-value"
                testid="active-count"
              >
                {quantity}
              </button>
              <button
                type="button"
                className="plus-icon-container"
                data-testid="increment-count"
                onClick={this.incrementCartItemQuantity}
              >
                <BsPlus className="plus-icon" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={itemClass.AddButton}
              onClick={this.addCartItem}
            >
              Add
            </button>
          )}
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            message="Item Added to Cart"
            action={action}
            anchorOrigin={{vertical, horizontal}}
            key={vertical + horizontal}
            severity="success"
          />
        </div>
      </li>
    )
  }
}

export default FoodItem