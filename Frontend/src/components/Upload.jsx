import { useState } from 'react';
import '../styles/Upload.css';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export default function Upload() {
  const [upload, setUpload] = useState({
    title: '',
    description: '',
    isFree: false,
    isPremium: false,
    amount: '',
    author: '',
    publishedDate: '',
  });

 

  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');


   if(JSON.parse(localStorage.getItem('isModifyData')) !== null && JSON.parse(localStorage.getItem('isModifyData')).length !== 0 ) {
    const getData  = JSON.parse(localStorage.getItem('isModifyData'))
    setUpload({
      title: getData.title,
      description: getData.desc,
      isFree: getData.price === 0? true : false,
      isPremium: getData.price === 0?false:true,
      amount: getData.price,
      author: getData.author,
      publishedDate: getData.publishedDate
    });
    setTypes(getData.contentType);
    localStorage.removeItem('isModifyData');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpload(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFreeClick = () => {
    setUpload(prev => ({
      ...prev,
      isFree: true,
      isPremium: false,
      amount: 0
    }));
  };

  const handlePremiumClick = () => {
    setUpload(prev => ({
      ...prev,
      isFree: false,
      isPremium: true,
      amount: ''
    }));
  };

  const handleAddType = () => {
    const trimmedType = newType.trim();
    if (trimmedType && !types.includes(trimmedType)) {
      setTypes(prev => [...prev, trimmedType]);
      setNewType('');
    }
  };

  const handleRemoveType = (typeToRemove) => {
    setTypes(prev => prev.filter(type => type !== typeToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Uploaded SuccessFully!', {
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
    let meData = JSON.parse(localStorage.getItem('book'));
    const data = {
      id: meData === null || meData.length===0? 0 : meData[meData.length - 1].id + 1,
      title: upload.title,
      author: upload.author,
      desc: upload.description,
      img: '',
      contentType: types,
      noofviews: 1,
      nooflikes: 0,
      noofdislikes: 0,
      noofdownloads: 0,
      price: upload.isFree ? 0 : upload.amount,
      publishedDate: upload.publishedDate,
      isUserUploaded: true
    }
    setTypes([]);

    if (meData ===null) meData = []
    let newData = [
      data,
      ...meData

    ]
    newData = newData.map((cur,index)=> {
      return {
        ...cur,
        id : index
      }
    })
    localStorage.setItem('book', JSON.stringify(newData));
    setUpload({
      title: '',
      description: '',
      isFree: false,
      isPremium: false,
      amount: '',
      author: '',
      publishedDate: '',
    })
    let con2 = JSON.parse(localStorage.getItem('bookContentType'));
    if (con2 === null) con2 = []
    const ty = [
      ...types,
      ...con2
    ]
    localStorage.setItem("bookContentType", JSON.stringify(ty));

  }

  return (
    <div className="upload-container">
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
      <form className="upload-form">
        <h2>Upload Book Details</h2>

        <div className="form-group">
          <label htmlFor="titleinput">Title of the Book:</label>
          <input type="text" id="titleinput" name="title" value={upload.title} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="descinput">Short Description:</label>
          <input type="text" id="descinput" name="description" value={upload.description} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="authorinput">Author:</label>
          <input type="text" id="authorinput" name="author" value={upload.author} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="dateinput">Published Date:</label>
          <input type="date" id="dateinput" name="publishedDate" value={upload.publishedDate} onChange={handleChange} />
        </div>

        <div className="form-group radio-group">
          <label>Choose Pricing:</label>
          <div>
            <button type="button" className={upload.isFree ? 'active' : ''} onClick={handleFreeClick}>Free</button>
            <button type="button" className={upload.isPremium ? 'active' : ''} onClick={handlePremiumClick}>Premium</button>
          </div>
        </div>

        {upload.isPremium && (
          <div className="form-group">
            <label htmlFor="amountinput">Enter Amount:</label>
            <input type="number" id="amountinput" name="amount" value={upload.amount} onChange={handleChange} />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="typeinput">Add Book Type:</label>
          <div className="type-input-group">
            <input
              type="text"
              id="typeinput"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              placeholder="e.g. Horror, Romance, Sci-fi"
            />
            <button type="button" onClick={handleAddType}>Add Type</button>
          </div>

          {types.length > 0 && (
            <ul className="type-list">
              {types.map((type, index) => (
                <li key={index}>
                  {type}
                  <button type="button" className="remove-btn" onClick={() => handleRemoveType(type)}>❌</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-group">
          <button className="submit" onClick={(e) => handleSubmit(e)}>Upload</button>
        </div>
      </form>
    </div>
  );
}
