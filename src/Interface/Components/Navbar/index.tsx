import { Link } from "react-router-dom"
import snakeLogo from "../../../Ui_Framework/assets/Images/snake.png"

export const Navbar = () => {
  return (
    <div className='navbar-main h-20 bg-purple-50  flex items-center justify-between px-10 font-mono cursor-pointer'>
        <div className="left text-2xl flex items-center justify-center gap-3">
           <Link  to="/">Memory Game</Link>
           <img className="rounded-full" width={50} src={snakeLogo}/>
        </div>
        <div className="right text-2xl">
            <Link to="/history"><h1>History</h1></Link>
        </div>
    </div>
  )
}
