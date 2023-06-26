import {Component} from 'react'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

import './index.css'

const totalPages = 4
const Page = 1

class Counter extends Component {
  state = {currentPage: Page}

  onIncrement = () => {
    const {pageChangeFunction} = this.props
    const {currentPage} = this.state

    if (currentPage < totalPages) {
      this.setState(
        prevState => ({currentPage: prevState.currentPage + 1}),
        pageChangeFunction(currentPage + 1),
      )
    }
  }

  onDecrement = () => {
    const {pageChangeFunction} = this.props
    const {currentPage} = this.state

    if (currentPage > 1) {
      this.setState(
        prevState => ({currentPage: prevState.currentPage - 1}),
        pageChangeFunction(currentPage - 1),
      )
    }
  }

  render() {
    const {currentPage} = this.state
    return (
      <div className="counter-class">
        <button
          type="button"
          onClick={this.onDecrement}
          className="btn"
          data-testid="pagination-left-button"
        >
          <IoIosArrowBack className="icon-class" />
        </button>
        <div className="page-class">
          <span data-testid="active-page-number" className="rating">
            {currentPage}
          </span>{' '}
          of {totalPages}
        </div>
        <button
          type="button"
          onClick={this.onIncrement}
          className="btn"
          data-testid="pagination-right-button"
        >
          <IoIosArrowForward className="icon-class" />
        </button>
      </div>
    )
  }
}

export default Counter
