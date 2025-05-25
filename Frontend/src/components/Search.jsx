import { useEffect, useRef, useState } from "react";
import BookShowUp from './BookShowUp';
import '../styles/Search.css';
import { Bounce, toast } from "react-toastify";

export default function Search({ book, setBook, setSearchClicked,bookContentType,setBookContentType }) {
  const [findBooks, setFindBooks] = useState(book);
  
  const priceLowClick = useRef();
  const priceHighClick = useRef();
  const freeClick = useRef();
  const premiumClick = useRef();
  const oldestClick = useRef();
  const latestClick = useRef();
  const viewsClick = useRef();
  const likesClick = useRef();
  const downClick = useRef();
  const buttonFil = useRef();
  const buttonData = useRef();
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState([]);
  const [whatClicked, setWhatClicked] = useState({
    price: null,
    free: null,
    latest: null,
    popular: null,
    contentType: [],
  })
  useEffect(() => {
    setFindBooks(book)
  }, []);
  const [search, setSearch] = useState({
    searchByAuthor: "",
    searchByTitle: "",
    rangeLow: 0,
    rangeHigh: 0
  });

  const handleAuthorTitleClick = () => {
    if (search.searchByAuthor.trim() === "" && search.searchByTitle.trim() === "") {
      alert("Fill Atleast One Field");
      return;
    }
    setFindBooks(() => {
      return [
        ...book.filter((curBook) => {
          if (search.searchByAuthor.trim() !== "" && search.searchByTitle.trim() !== "") {
            if (search.searchByAuthor.trim().toLowerCase() === curBook.author.toLowerCase() && search.searchByTitle.trim().toLowerCase() === curBook.title.toLowerCase()) {
              return curBook;
            }
          } else if (search.searchByAuthor.trim() !== "") {
            if (search.searchByAuthor.trim().toLowerCase() === curBook.author.toLowerCase()) {
              return curBook;
            }
          } else {
            if (search.searchByTitle.trim().toLowerCase() === curBook.title.toLowerCase()) {
              return curBook;
            }
          }
        })
      ]
    })
  }

  const handleAuthorKey = () => {
    setFindBooks(() => {
      return [
        ...book.filter((curBook) => {
          if (search.searchByAuthor.trim().toLowerCase() === curBook.author.slice(0, search.searchByAuthor.trim().length).toLowerCase()) {
            return curBook;
          }
        })
      ]
    })
  }
  const handleTitleKey = () => {
    setFindBooks(() => {
      return [
        ...book.filter((curBook) => {
          if (search.searchByTitle.trim().toLowerCase() === curBook.title.slice(0, search.searchByTitle.trim().length).toLowerCase()) {
            return curBook;
          }
        })
      ]
    })
  }

  const handlePriceClick = (desc) => {
    if (!desc) {
      priceLowClick.current.style.backgroundColor = "rgba(0, 255, 47, 0.2)";
      priceHighClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    } else {
      priceLowClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      priceHighClick.current.style.backgroundColor = "rgba(0, 255, 47, 0.2)";
    }
    setWhatClicked((prev) => {
      return {
        ...prev,
        price: desc
      }
    })
  }


  const handleFreeOrNot = (price) => {
    if (price) {
      freeClick.current.style.backgroundColor = "rgba(0, 255, 47, 0.2)";
      premiumClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    } else {
      freeClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      premiumClick.current.style.backgroundColor = "rgba(0, 255, 47, 0.2)";
    }
    setWhatClicked((prev) => {
      return {
        ...prev,
        free: price
      }
    })
  }

  const handleRangeClick = () => {
    if (search.rangeLow > search.rangeHigh) {
      alert("Range should be low to high");
      return;
    }
    setFindBooks(() => {
      return [
        ...findBooks.filter((cur) => {
          if (cur.price >= search.rangeLow && cur.price <= search.rangeHigh) return cur;
        })
      ]
    })
  }

  const handleLatestOrOldest = (date) => {
    if (date) {
      oldestClick.current.style.backgroundColor = "rgba(0, 255, 47, 0.2)";
      latestClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    } else {
      oldestClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      latestClick.current.style.backgroundColor = "rgba(0, 255, 47, 0.2)";
    }
    setWhatClicked((prev) => {
      return {
        ...prev,
        latest: date
      }
    })
  }

  const handlePopular = (data) => {
    if (data === 'likes') {
      viewsClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      likesClick.current.style.backgroundColor = "rgba(0, 255, 47, 0.2)";
      downClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    } else if (data === 'views') {
      likesClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      viewsClick.current.style.backgroundColor = "rgba(0, 255, 47, 0.2)";
      downClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    } else {
      viewsClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      downClick.current.style.backgroundColor = "rgba(0, 255, 47, 0.2)";
      likesClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    }
    setWhatClicked((prev) => {
      return {
        ...prev,
        popular: data
      }
    })
  }


  const handleApplyClick = () => {
    let newData = book;
    if (whatClicked.price !== null) {
      if (!whatClicked.price) {
        newData = [
          ...book.sort((a, b) => a.price - b.price)
        ]
      } else {
        newData = [
          ...book.sort((a, b) => b.price - a.price)
        ]
      }
    }
    if (whatClicked.free !== null) {
      if (whatClicked.free) {
        newData = [
          ...newData.filter((cur) => {

            if (cur.price === 0) return cur;
          })
        ]
      } else {
        newData = [
          ...newData.filter((cur) => {

            if (cur.price !== 0) return cur;
          })
        ]
      }
    }
    if (whatClicked.latest !== null) {
      if (whatClicked.latest) {
        newData = [
          ...newData.sort((a, b) => new Date(a.publishedDate) - new Date(b.publishedDate))
        ]
      } else {
        newData = [
          ...newData.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
        ]
      }
    }
    if (whatClicked.popular !== null) {
      if (whatClicked.popular === 'likes') {
        newData = [
          ...newData.sort((a, b) => b.nooflikes - a.nooflikes)
        ]
      } else if (whatClicked.popular === 'views') {
        newData = [
          ...newData.sort((a, b) => b.noofviews - a.noofviews)
        ]
      } else {
        newData = [
          ...newData.sort((a, b) => b.noofdownloads - a.noofdownloads)
        ]
      }
    }
    if (whatClicked.contentType.length != 0) {
      newData = [
        ...newData.filter((a) => {
          let count = 0;
          a.contentType.filter((b) => {
            if (whatClicked.contentType.includes(b)) count++;
          })
          return count > 0 && a;
        })
      ]
    }
    if (newData.length === 0) {
      alert("No Data Found with Such Filters");
      setFindBooks(book)
    }
    toast.success('Results Found!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setFindBooks(newData);
    setWhatClicked({
      price: null,
      free: null,
      range: null,
      latest: null,
      popular: null,
      contentType: [],
    })
    if(isHamOpen) {
      buttonFil.current.style.display = 'none';
    buttonData.current.style.opacity = "1";
    setIsHamOpen(false);
    }
    priceLowClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    priceHighClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    freeClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    premiumClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    oldestClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    latestClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    viewsClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    likesClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    downClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
     setActiveIndex([]);
  }

  const handleClearClick = () => {
    priceLowClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    priceHighClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    freeClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    premiumClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    oldestClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    latestClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    viewsClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    likesClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    downClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    setActiveIndex([]);
    setFindBooks(book)
  }

  const handleSetMe = () => {
    if (!isHamOpen) {
      buttonFil.current.style.display = 'flex';
      buttonData.current.style.opacity = "0.4";
      setIsHamOpen(true);
    } else {
      buttonFil.current.style.display = 'none';
      buttonData.current.style.opacity = "1";
      setIsHamOpen(false);
      setWhatClicked({
        price: null,
        free: null,
        range: null,
        latest: null,
        popular: null,
        contentType: [],
      })
      priceLowClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      priceHighClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      freeClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      premiumClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      oldestClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      latestClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      viewsClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      likesClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      downClick.current.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      setActiveIndex([]);
    }
  }

  return (
    <div style={{ marginBottom: "20px" }}>

      <div className="back-me-pls" style={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "20px",
        gap: "15px"
      }}>
        <button className="find-filters-search" onClick={() => { setSearchClicked(false); localStorage.setItem('searchClicked', false) }}>Back to Home</button>
        <button className="book-filter-by-option-apply" onClick={handleClearClick} style={{
          padding: "10px 20px"
        }}>Clear Filters</button>
      </div>
      <div className="ham-in-books-filter" onClick={handleSetMe}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className="books-filter-container">
        <div className="come-into-pic">
          <div className="books-filters" ref={buttonFil}>
            <div className="books-filters-search-by">
              <h4><i className="fa-solid fa-star"></i> Search By Author/Title</h4>
              <input type="text" placeholder="search by author" name="searchByAuthor" onChange={(e) => {
                setSearch((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value
                  }
                })
              }} className="books-filters-search-by-author" onKeyUp={handleAuthorKey} />
              <input type="text" placeholder="search by title" name="searchByTitle" onChange={(e) => {
                setSearch((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value
                  }
                })
              }} className="books-filters-search-by-title" onKeyUp={handleTitleKey} />
              <button className="books-filters-search-by-find" onClick={handleAuthorTitleClick}>Find</button>
            </div>
            <div className="books-filter-by-options">
              <div className="books-filter-by-options-prices">
                <h4><i className="fa-solid fa-star"></i> Click To Choose One Option</h4>
                <div className="books-filter-by-options-lowtohigh" onClick={() => handlePriceClick(false)} ref={priceLowClick}>Low to High(price)</div>
                <div className="books-filter-by-options-lowtohigh" onClick={() => handlePriceClick(true)} ref={priceHighClick}>High to Low(price)</div>
              </div>
              <div className="books-filter-by-options-types">
                <h4><i className="fa-solid fa-star"></i> Click To Choose One Option</h4>
                <div className="books-filter-by-options-free" onClick={() => handleFreeOrNot(true)} ref={freeClick}>
                  Free
                </div>
                <div className="books-filter-by-options-premium" onClick={() => handleFreeOrNot(false)} ref={premiumClick}>
                  Premium
                </div>
              </div>
              <div className="books-filter-by-options-ranges">
                <h4><i className="fa-solid fa-star"></i> Select ranges from 0 to 5000</h4>
                <div className="books-filter-by-options-ranges-insider">
                  <input type="number" className="books-filter-by-options-ranges-low" name="rangeLow" min={0} max={5000} onChange={(e) => {
                    setSearch((prev) => {
                      return {
                        ...prev,
                        [e.target.name]: e.target.value
                      }
                    })
                  }} />
                  <p> - </p>
                  <input type="number" className="books-filter-by-options-ranges-high" name="rangeHigh" min={0} max={5000} onChange={(e) => {
                    setSearch((prev) => {
                      return {
                        ...prev,
                        [e.target.name]: e.target.value
                      }
                    })

                  }} />

                </div>
                <button className="books-filters-search-by-find" onClick={handleRangeClick}>Find</button>
              </div>
              <div className="books-filter-by-options-when">
                <h4><i className="fa-solid fa-star"></i> Click To Choose One Option</h4>
                <div className="books-filter-by-options-latest" onClick={() => handleLatestOrOldest(false)} ref={latestClick}>Latest</div>
                <div className="books-filter-by-options-oldest" onClick={() => handleLatestOrOldest(true)} ref={oldestClick}>Oldest</div>
              </div>
              <div className="books-filter-by-options-popular">
                <h4><i className="fa-solid fa-star"></i> Click To Choose One Option</h4>
                <div className="books-filter-by-options-morelikes" onClick={() => handlePopular("likes")} ref={likesClick}>More Likes</div>
                <div className="books-filter-by-options-moreviews" onClick={() => handlePopular("views")} ref={viewsClick}>More Views</div>
                <div className="books-filter-by-options-moredownloads" onClick={() => handlePopular("down")} ref={downClick}>More Downloads</div>
              </div>
              <div className="books-filter-by-options-contenttype">
                <h4><i className="fa-solid fa-star"></i> Click To Choose Options</h4>
                {
                  bookContentType && bookContentType.map((currentContentType, index) => {
                    return <div className='content-type-inside-search' key={index} onClick={() => {
                      if (whatClicked.contentType.includes(currentContentType)) {
                        setWhatClicked((prev) => {
                          return {
                            ...prev,
                            contentType: [...whatClicked.contentType.filter((cur) => {
                              return cur !== currentContentType && cur;
                            })]
                          }
                        })
                        setActiveIndex((prev) => {
                          return [...prev.map((cur) => {
                            return cur !== index && cur
                          })
                          ]
                        })
                      } else {
                        setWhatClicked((prev) => {
                          return {
                            ...prev,
                            contentType: [...whatClicked.contentType, currentContentType]
                          }
                        })
                        setActiveIndex((prev) => {
                          return [
                            ...prev,
                            index
                          ]
                        })
                      }
                    }} style={{
                      backgroundColor: activeIndex && activeIndex.includes(index) ? 'rgba(0, 255, 47, 0.2)' : 'rgba(255, 0, 0, 0.2)'
                    }}>{currentContentType}</div>
                  })
                }
              </div>
              <button className="book-filter-by-option-apply" onClick={handleApplyClick} style={{ marginBottom: "10px" }}>Apply</button>
            </div>
          </div>
        </div>


        <div className="book-details-search" ref={buttonData}>
          {
            findBooks && findBooks.map((currentBook) => {
              return <BookShowUp key={currentBook.id} currentBook={currentBook} setBook={setBook} fromWhere={false}/>
            })
          }
        </div>
      </div>
    </div>

  )
}