import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "../styles/global.css"

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}