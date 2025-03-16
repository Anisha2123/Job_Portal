
import "../App.css";
const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Job Portal. All rights reserved.</p>
      <p>Made with by <span className="name-highlight">Anisha Birla</span></p>
    </footer>
  )
}

export default Footer