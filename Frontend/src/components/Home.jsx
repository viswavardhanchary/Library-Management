import { Bounce, ToastContainer, toast } from 'react-toastify';
import BookShowUp from "./BookShowUp";
import '../styles/Home.css';
import { useEffect, useState } from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';

export default function Home() {
    const [bookContentType, setBookContentType] = useState(JSON.parse(localStorage.getItem('bookContentType')) || []);

  const [book, setBook] = useState(JSON.parse(localStorage.getItem('book')) || []);
  useEffect(() => {
    const getUserData = async () => {
      if (JSON.parse(localStorage.getItem('book')) == null) {
        const res = await fetch("http://localhost:3000/data");
        const data = await res.json();
        setBook(data);
        localStorage.setItem('book', JSON.stringify(data));
      }
    }
    const getUserData2 = () => {
        if (JSON.parse(localStorage.getItem('bookContentType')) ===null) {
          const cust = ['Horror',
            'Fiction',
            'Sci-Fi',
            'Thriller',
            'Mystery',
            'Drama',
            'Fantasy',
            'Adventure',
            'Cyberpunk',
            'Romance',
            'Historical',
            'Dystopian',
            'Action',
            'Slice of Life',
            'Apocalyptic',
            'Supernatural',
            'Techno-thriller',
            'Suspense',
            'Survival',
            'Noir',
            'Political',
            'Cultural',
            'Folklore',
            'Legal',
            'Mythology',
            'Psychological',
            'Magical Realism',
            'Family']
          setBookContentType(cust);
          localStorage.setItem('bookContentType', JSON.stringify(cust));
        }
      }
    getUserData2();
    getUserData();
  }, [])

const [isModifyData , setIsModifyData] = useState(JSON.parse(localStorage.getItem('isModifyData')) || []);

  const [searchClicked, setSearchClicked] = useState(JSON.parse(localStorage.getItem('searchClicked')) || false);
  return (
    <div className='home'>
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {
        !searchClicked &&
        <div className="find-books">
          <div className='find-books-two' style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
            gap: "10px"
          }}>
            <button className="find-books-search" onClick={() => { setSearchClicked(true); localStorage.setItem('searchClicked', true) }}>Search/View Books</button>
            <Link to="/upload"className='find-books-search' >+ Upload</Link>
          </div>
          <div style={{
            display: "flex",
            gap: "10px",
            alignItems: "center"
          }}>
            <i className="fa-solid fa-book" style={{
              fontSize: "1.5rem"
            }}></i>
            <h1>Avaliable Books</h1>
          </div>

          <div className="book-details">

            {
              book && book.map((currentBook) => {
                return <BookShowUp key={currentBook.id} currentBook={currentBook} setBook={setBook} fromWhere={true}/>
              })
            }
          </div>
        </div>
      }
      {
        searchClicked && <Search book={book} setBook={setBook} setSearchClicked={setSearchClicked} bookContentType={bookContentType} setBookContentType={setBookContentType}/>
      }
    </div>
  )
}