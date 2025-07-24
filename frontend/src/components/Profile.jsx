import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Contact, Mail, Pen } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'

const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)
    const isResume = Boolean(user?.profile?.resume)

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    }

    const cardHover = {
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
        transition: { 
            type: "spring",
            stiffness: 300
        }
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen w-screen transition-colors duration-300 overflow-hidden">
            <Navbar />
            
            {/* Main Profile Section */}
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full h-full bg-gray-800 border border-gray-700 rounded-lg my-4 mx-auto p-6 md:p-8 max-w-6xl shadow-xl"
                whileHover={cardHover}
            >
                {/* Profile Header */}
                <motion.div 
                    variants={itemVariants}
                    className='flex flex-col md:flex-row justify-between gap-6 mb-8'
                >
                    <div className='flex items-center gap-4'>
                        <motion.div 
                            className="h-24 w-24 rounded-full overflow-hidden border-2 border-blue-500/50 hover:border-blue-500 transition-all duration-300"
                            whileHover={{ scale: 1.05, rotate: 2 }}
                        >
                            <img 
                                src={user?.profile?.avatar || user?.profile?.profilePhoto || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} 
                                alt="profile"
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                        <div>
                            <motion.h1 
                                className='font-medium text-2xl text-gray-200'
                                initial={{ x: -10 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {user?.fullname}
                            </motion.h1>
                            <motion.p 
                                className="text-gray-400 max-w-[400px]"
                                initial={{ x: -10 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                {user?.profile?.bio || "No bio available"}
                            </motion.p>
                        </div>
                    </div>
                    <motion.button 
                        onClick={() => setOpen(true)}
                        className="self-start md:self-center p-2 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-blue-400 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        variants={itemVariants}
                    >
                        <Pen className="h-5 w-5" />
                    </motion.button>
                </motion.div>

                {/* Contact Info */}
                <motion.div 
                    className='my-6 space-y-3'
                    variants={containerVariants}
                >
                    <motion.div 
                        className='flex items-center gap-3 text-gray-300'
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                    >
                        <Mail className="h-5 w-5 text-blue-400" />
                        <span>{user?.email}</span>
                    </motion.div>
                    <motion.div 
                        className='flex items-center gap-3 text-gray-300'
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                    >
                        <Contact className="h-5 w-5 text-blue-400" />
                        <span>{user?.phoneNumber || "Not provided"}</span>
                    </motion.div>
                </motion.div>

                {/* Skills Section */}
                <motion.div 
                    className='my-6'
                    variants={itemVariants}
                >
                    <motion.h1 
                        className="font-medium mb-2 text-gray-300 text-lg"
                        variants={itemVariants}
                    >
                        Skills
                    </motion.h1>
                    <motion.div 
                        className='flex flex-wrap gap-2'
                        variants={containerVariants}
                    >
                        {user?.profile?.skills?.length > 0 ? (
                            user.profile.skills.map((item, index) => (
                                <motion.span 
                                    key={index}
                                    variants={itemVariants}
                                    className="px-3 py-1 rounded-full text-sm bg-gray-700 text-blue-300 hover:bg-gray-600 transition-colors"
                                    whileHover={{ 
                                        scale: 1.1,
                                        backgroundColor: "rgba(59, 130, 246, 0.2)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item}
                                </motion.span>
                            ))
                        ) : (
                            <motion.span 
                                className="text-gray-500"
                                variants={itemVariants}
                            >
                                No skills added
                            </motion.span>
                        )}
                    </motion.div>
                </motion.div>

                {/* Resume Section */}
                <motion.div 
                    className='mb-6'
                    variants={itemVariants}
                >
                    <motion.h2 
                        className="text-md font-bold mb-2 text-gray-300"
                        variants={itemVariants}
                    >
                        Resume
                    </motion.h2>
                    {isResume ? (
                        <motion.a 
                            target='_blank' 
                            rel='noopener noreferrer'
                            href={user.profile.resume} 
                            className='text-blue-400 hover:text-purple-300 hover:underline cursor-pointer block truncate transition-colors'
                            variants={itemVariants}
                            whileHover={{ 
                                x: 5,
                                textShadow: "0 0 8px rgba(167, 139, 250, 0.6)"
                            }}
                        >
                            {user.profile.resumeOriginalName || "View Resume"}
                        </motion.a>
                    ) : (
                        <motion.span 
                            className="text-gray-500"
                            variants={itemVariants}
                        >
                            No resume uploaded
                        </motion.span>
                    )}
                </motion.div>
            </motion.div>

            {/* Applied Jobs Section */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                        type: "spring",
                        stiffness: 100,
                        delay: 0.3
                    }
                }}
                className='w-full h-full bg-gray-800 border border-gray-700 rounded-lg mx-auto p-6 md:p-8 mb-8 shadow-xl max-w-6xl'
                whileHover={cardHover}
            >
                <motion.h1 
                    className='font-bold text-2xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400'
                    initial={{ opacity: 0 }}
                    animate={{ 
                        opacity: 1,
                        transition: { delay: 0.5 }
                    }}
                >
                    Applied Jobs
                </motion.h1>
                <AppliedJobTable />
            </motion.div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile