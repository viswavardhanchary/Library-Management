import { Bounce, toast, ToastContainer } from 'react-toastify';
import '../styles/Help.css';

export default function Help() {
  const email = 'viswavardhanchary@gmail.com';
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
     toast.success('Copied to Clipboard!', {
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
  };

  return (
    <>
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

      <div className="contact-section">
        <h2>Get in Touch/Queries</h2>
        <div className="email-row">
          <span className="email-text">{email}</span>
          <button onClick={handleCopy} className="copy-btn">Copy</button>
        </div>
        <a href={`mailto:${email}`} className="send-mail-btn">
          Send Me a Mail
        </a>
      </div>

    </>

  );
}
