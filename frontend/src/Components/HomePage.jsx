import { motion } from "framer-motion";
import { SlideRight } from "../utils/animations";
import homeImg  from "../assets/bact.png";
import { FaArrowDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


export default function HomePage(){
    const navigate = useNavigate();

    return(
        <section  >
            <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[600px] px-12 mx-7">
                 <div className="flex flex-col justify-center py-14 md:py-0">
                    <div className="text-center md:text-left space-y-6">
                        <motion.h1 
                            className="text-4xl lg:text-6xl home-h1 font-[OpenSans] font-bold leading-relaxed"
                            variants={SlideRight(0.6)}
                            initial="hidden"
                            animate="visible"
                        >
                            Early <span>Detection of Pnuemonia</span> saves lives
                        </motion.h1>
                        <motion.p
                            variants={SlideRight(1.2)}
                            initial="hidden"
                            animate="visible"
                            className="text-lg xl:max-w-[500px] font-OpenSans home-para"
                        >
                            PneumoScan is designed to support patients and healthcare providers by detecting signs of pneumonia from chest X-rays with speed and accuracy. PneumoScan offers timely, AI-powered insights that help ensure no patient is left undiagnosed or untreated
                        </motion.p>
                        <motion.div 
                            variants={SlideRight(1.6)}
                            initial="hidden"
                            animate="visible"
                            className="flex justify-center items-center gap-8 md:justify-start !mt-7 font-inter"
                        >
                            <button onClick={()=>navigate("/prediction")} className="home-btn hover:!scale-110 flex items-center gap-2 py-3 font-semibold px-5">
                                Make Prediction <FaArrowDown size={30} className="animate-arrow" />
                            </button>
                           
                        </motion.div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <motion.img
                        initial={{opacity: 0, scale: 0}}
                        whileInView={{ opacity: 1, scale: 1}}
                        transition={{ duration: 1.5, ease: "easeOut" }}  
                        src={homeImg} loop={true} className="h-[450px] w-[450px]"
                    />
                </div>
            </div>
        </section>
    )
}

