import React, { useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: null
    })

    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileChangeHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setOpen(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Update failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <motion.div 
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md mx-4"
                        style={{ height: 'auto' }} // Maintain original height
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-200">Update Profile</h2>
                                <button 
                                    onClick={() => setOpen(false)}
                                    className="text-gray-400 hover:text-gray-200 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={submitHandler}>
                                <div className="space-y-4">
                                    {/* Full Name */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-300 mb-1">
                                            Name
                                        </label>
                                        <input
                                            id="fullname"
                                            name="fullname"
                                            type="text"
                                            value={input.fullname}
                                            onChange={changeEventHandler}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
                                            required
                                        />
                                    </motion.div>

                                    {/* Email */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.15 }}
                                    >
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={input.email}
                                            onChange={changeEventHandler}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
                                            required
                                        />
                                    </motion.div>

                                    {/* Phone Number */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            value={input.phoneNumber}
                                            onChange={changeEventHandler}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
                                        />
                                    </motion.div>

                                    {/* Bio */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.25 }}
                                    >
                                        <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                                            Bio
                                        </label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            value={input.bio}
                                            onChange={changeEventHandler}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
                                            rows="3"
                                        />
                                    </motion.div>

                                    {/* Skills */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-1">
                                            Skills (comma separated)
                                        </label>
                                        <input
                                            id="skills"
                                            name="skills"
                                            value={input.skills}
                                            onChange={changeEventHandler}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
                                        />
                                    </motion.div>

                                    {/* Resume Upload */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.35 }}
                                    >
                                        <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-1">
                                            Resume (PDF only)
                                        </label>
                                        <input
                                            id="file"
                                            name="file"
                                            type="file"
                                            accept="application/pdf"
                                            onChange={fileChangeHandler}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
                                        />
                                    </motion.div>
                                </div>

                                <div className="mt-6">
                                    {loading ? (
                                        <button
                                            type="button"
                                            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
                                            disabled
                                        >
                                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                            Updating...
                                        </button>
                                    ) : (
                                        <motion.button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            Update Profile
                                        </motion.button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default UpdateProfileDialog