import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    return (
        <div className='text-center bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 overflow-hidden'>
            {/* Floating animated elements in background */}
            <motion.div 
                className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-500/10 blur-xl"
                animate={{
                    x: [0, 30, 0],
                    y: [0, 40, 0],
                    transition: { duration: 15, repeat: Infinity, ease: "linear" }
                }}
            />
            <motion.div 
                className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-orange-500/10 blur-xl"
                animate={{
                    x: [0, -30, 0],
                    y: [0, -40, 0],
                    transition: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
            />

            <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className='flex flex-col gap-6 my-10 max-w-6xl mx-auto'
            >
                <motion.div variants={item}>
                    <motion.h1 
                        className='text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400'
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        Land Your Dream Job  <br />  Fast, Easy &  <motion.span 
                            className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-orange-600'
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%'],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "linear",
                            }}
                        >Hassle-Free</motion.span>
                    </motion.h1>
                </motion.div>

                <motion.p 
                    variants={item}
                    className='text-gray-400 max-w-2xl mx-auto px-4 text-lg'
                >
                    Find your perfect career match with our advanced job search technology and personalized recommendations.
                </motion.p>

                <motion.div 
                    variants={item}
                    className='flex w-full md:w-[50%] bg-gray-800 border border-gray-700 hover:border-purple-500/30 pl-3 rounded-full items-center gap-4 mx-auto transition-all duration-500 shadow-lg hover:shadow-purple-500/20'
                    whileHover={{ scale: 1.01 }}
                >
                    <input
                        type="text"
                        placeholder='Find your dream jobs...'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full py-4 px-4 rounded-l-full bg-transparent text-gray-200 placeholder-gray-300'
                        value={query}
                    />
                    <motion.button 
                        onClick={searchJobHandler}
                        className="rounded-r-full bg-gradient-to-r from-blue-700 to-orange-500 text-white p-4 hover:from-blue-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3
                            }}
                        >
                            <Search className='h-5 w-5' />
                        </motion.div>
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default HeroSection