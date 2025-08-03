import { useState } from "react";
import logo from "../assets/pneu.png";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { NavAnimation } from "../utils/animations";



const navList = [
    {name: "Home", route: "/", label: "home"},
    {name: "Prediction", route: "/prediction", label: "prediction"},
    {name: "Upload & Retrain", route: "/retrain", label: "retrain"},
];


export default function Header(){
    const [dropDownMenu, setDropDownMenu] = useState(false);

    return(
        <header>
            <nav>
                <div className="flex justify-between items-center font-[OpenSans]">
                    <motion.div 
                        variants={NavAnimation(0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        className="flex items-center gap-2 text-2xl font-bold"
                    >
                        <img className="obes-logo mr-2 scale-50" src={logo} alt="PneumoScan Logo" />
                        <p className="nav-icon">PneumoScan</p>
                    </motion.div>
                    <div className="hidden md:block">
                        <ul className="flex items-center gap-12  font-[inter]">
                            {
                                navList.map((navs, index) =>{
                                    const { name, route } = navs;
                                    return(
                                        <motion.li 
                                            variants={NavAnimation(0.2*index)}
                                            initial="hidden"
                                            whileInView={"show"}
                                            key={route}
                                        >
                                            <NavLink 
                                                className={({isActive})=> isActive ? "px-4 py-2 rounded-full text-white active" : ""} 
                                                to={route}
                                            >
                                                {name}
                                            </NavLink>
                                        </motion.li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    {/* SMALLER SCREENS - HAMBURGER */}
                    <div className="md:hidden">
                        <RxHamburgerMenu onClick={()=>setDropDownMenu(prevState => !prevState)} className="text-4xl nav-icon"/>
                        <AnimatePresence mode="wait">
                            {
                                dropDownMenu && 
                                <motion.div
                                  initial={{opacity: 0, y: -100}}
                                  animate={{opacity: 1, y: 0}}
                                  exit={{opacity: 0, y: -100}}
                                  className="absolute top-20 left-0 w-full h-screen z-10"
                                >
                                    <div className="font-semibold uppercase dropdown-div text-white py-10 m-6 rounded-3xl">
                                        <ul className="flex flex-col justify-center items-center gap-6 font-inter">
                                            {
                                                navList.map(navs =>{
                                                    const { name, route, label } = navs;
                                                    return(
                                                        <li key={route}>
                                                            <NavLink className={({isActive})=> isActive ? "px-4 py-2 rounded-full text-white active" : ""}  to={route}>
                                                                {name}
                                                            </NavLink>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>

                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </nav>
        </header>
    )
}