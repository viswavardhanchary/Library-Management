import '../styles/BookShowUp.css';
import { useNavigate } from 'react-router-dom';
import iMe from '../images/i19.png'
import { useRef } from 'react';
export default function BookShowUp({ currentBook, setBook, fromWhere }) {
  const navigate = useNavigate();
  const buttonWrong = useRef();
  const handleDeleteUser = () => {
    const oldData = JSON.parse(localStorage.getItem('book'));
    let newData = []
    newData = oldData.filter((cur) => {
      if (cur.id < currentBook.id) return cur;
    })
    newData = [
      ...newData,
      ...oldData.filter((cur, index) => {
        if (cur.id > currentBook.id) {
          return {
            ...cur,
            id: index
          }
        }
      })
    ]
    setBook(newData);
    localStorage.setItem('book', JSON.stringify(newData));
  }
  const handleModifyUser = () => {
    handleDeleteUser();
    localStorage.setItem('isModifyData', JSON.stringify(currentBook));
    navigate("/upload");
  }
  return (
    <>
    <div className='buy-click-outer' ref={buttonWrong} onClick={() => buttonWrong.current.style.display = "none"}>
      <div className="buy-click">
        <div className="inside-buy-click">
          <i className="fa-solid fa-xmark close-icon" ></i>
          <p className="message-text">
            We are updating this feature. Thanks for visiting my site!
          </p>
        </div>
      </div>
    </div>
      
      <div className="book-show-container">
        <div className='both-me-in'>
          <div className='book-show-date' title="Published On">
            {currentBook.publishedDate}
          </div>
          {
            currentBook.isUserUploaded && <div className='add-by'>Added by U</div>
          }
        </div>


        <div className='book-show-container-insider'>
          <div className="book-show-img">
            <img src={iMe} alt="Book Poster" className="book-show-poster" />
          </div>
          <div className="book-show-details">
            <div className="book-show-title">{currentBook.title}</div>
            <div className="book-show-author"><span>Author:</span> {currentBook.author}</div>
            <div className="book-show-desc">{currentBook.desc}</div>
            <div className='book-show-content-type'>
              {
                currentBook.contentType && currentBook.contentType.length !== 0 &&
                currentBook.contentType.map((currentContentType, index) => {
                  return <div className='content-type-inside-book' key={index}>{currentContentType}</div>
                })
              }
            </div>
            {
              currentBook.price === 0
                ?
                <div className="book-show-price">
                  <div className='book-show-price-insider'>
                    <div className="book-show-price-free">Free</div>
                    <div className="book-show-price-count">{currentBook.price}</div>
                  </div>

                  <div className="book-show-read" onClick={() => {
                    window.open('/pdfs/read.pdf', '_blank')
                  }}>Read</div>
                  <a href="/pdfs/read.pdf" download className="book-show-price-download" style={{
                    color: "white",
                    textDecoration: "none"
                  }}>Download</a>
                </div>
                :
                <div className="book-show-price">
                  <div className='book-show-price-insider'>
                    <div className="book-show-price-premium">Premium</div>
                    <div className="book-show-price-count">{currentBook.price}</div>
                  </div>
                  <div className="book-show-buy" onClick={() => buttonWrong.current.style.display = "flex"}>Buy</div>
                </div>
            }
            {
              fromWhere && currentBook.isUserUploaded && <div className='add-by-user-to-manu'>
                <div className='modify-class' onClick={handleModifyUser}>Modify</div>
                <div className='delete-class' onClick={handleDeleteUser}>Delete</div>
              </div>
            }
            <div className='book-show-info'>
              <div className='book-show-info-insider'>
                <div className="book-show-views">
                  <i className="fa-solid fa-eye"></i>
                  <div className="book-show-count">{currentBook.noofviews}</div>
                </div>
                <div className="book-show-likes">
                  <i className="fa-regular fa-thumbs-up"></i>
                  <div className="book-show-count">{currentBook.nooflikes}</div>
                </div>
                <div className="book-show-dislikes">
                  <i className="fa-regular fa-thumbs-down"></i>
                  <div className="book-show-count">{currentBook.noofdislikes}</div>
                </div>
                <div className="book-show-download">
                  <i className="fa-solid fa-download"></i>
                  <div className="book-show-count">{currentBook.noofdownloads}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}