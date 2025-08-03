import Header from "./Components/Header"
import HomePage from "./Components/HomePage"
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";
import { Outlet } from "react-router-dom";



function App() {

  return (

    
    <>
      <Header />
        <div className="mt-2">
      <Outlet />
        </div>
      

      <ScrollToTop
        smooth
        className="scrollToTop"
        style={{backgroundColor:"#00abf0"}}
        
        component={<FaArrowUp className="animate-arrow" style={{ fontSize: "20px", color: "white" }} />}
      />
    </>
  )
}

export default App
