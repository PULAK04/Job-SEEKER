import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);


const dropdownRef = useRef();

useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };

    const navItemVariants = {
        hover: {
            scale: 1.05,
            textShadow: "0 0 8px rgba(192, 132, 252, 0.6)",
            transition: { duration: 0.3 }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 0 15px rgba(192, 132, 252, 0.4)",
            transition: { duration: 0.3 }
        },
        tap: { scale: 0.95 }
    };

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
        exit: { opacity: 0, y: -10 }
    };

    return (
        <motion.div 
            className='bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700 z-50 relative'
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 10 }}
        >
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <motion.div whileHover={{ scale: 1.05 }}>
                    <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-orange-600'>
                        Job<span className='bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500'>search</span>
                    </h1>
                </motion.div>

                {/* Mobile Hamburger Menu */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setMenuOpen(prev => !prev)} className="text-gray-300">
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Navigation Links */}
                <div className='hidden md:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <motion.li whileHover="hover" variants={navItemVariants}>
                                    <Link to="/admin/companies" className='text-gray-300 hover:text-orange-400 transition-all duration-300'>
                                        Companies
                                    </Link>
                                </motion.li>
                                <motion.li whileHover="hover" variants={navItemVariants}>
                                    <Link to="/admin/jobs" className='text-gray-300 hover:text-orange-400 transition-all duration-300'>
                                        Jobs
                                    </Link>
                                </motion.li>
                            </>
                        ) : (
                            <>
                                <motion.li whileHover="hover" variants={navItemVariants}>
                                    <Link to="/" className='text-gray-300 hover:text-orange-400 transition-all duration-300'>
                                        Home
                                    </Link>
                                </motion.li>
                                <motion.li whileHover="hover" variants={navItemVariants}>
                                    <Link to="/jobs" className='text-gray-300 hover:text-orange-400 transition-all duration-300'>
                                        Jobs
                                    </Link>
                                </motion.li>
                                <motion.li whileHover="hover" variants={navItemVariants}>
                                    <Link to="/browse" className='text-gray-300 hover:text-orange-400 transition-all duration-300'>
                                        Browse
                                    </Link>
                                </motion.li>
                            </>
                        )}
                    </ul>

                    {/* Auth Buttons or Profile */}
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login">
                                <motion.button
                                    className='px-4 py-2 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-md'
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    Login
                                </motion.button>
                            </Link>
                            <Link to="/signup">
                                <motion.button
                                    className='px-4 py-2 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-md'
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    Signup
                                </motion.button>
                            </Link>
                        </div>
                    ) : (
                        <div className='relative group'>
                            <motion.div
                            onClick={() => setDropdownOpen(prev => !prev)}
                                className='w-8 h-8 rounded-full overflow-hidden cursor-pointer border-2 border-transparent hover:border-purple-400 transition-all duration-300'
                                whileHover={{ rotate: 5 }}
                                animate={{ rotate: [0, 5, -5, 0], transition: { duration: 2, repeat: Infinity, repeatDelay: 3 } }}
                            >
                                <img
                                    src={user?.profile?.profilePhoto}
                                    alt="Profile"
                                    className='w-full h-full object-cover'
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
                                />
                            </motion.div>

                            <AnimatePresence>{dropdownOpen && (
                                <motion.div ref={dropdownRef}
                                    className='absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-xl z-10  border border-gray-700 backdrop-blur-sm bg-opacity-90'
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className='p-4'>
                                        <div className='flex gap-4 items-start'>
                                            <motion.div
                                                className='w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500'
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <img
                                                    src={user?.profile?.profilePhoto}
                                                    alt="Profile"
                                                    className='w-full h-full object-cover'
                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
                                                />
                                            </motion.div>
                                            <div>
                                                <h4 className='font-medium text-white'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-400'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='mt-4 space-y-3'>
                                            {user?.role === 'student' && (
                                                <motion.div whileHover={{ x: 5 }}>
                                                    <Link to="/profile" className='flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-all duration-300 hover:bg-gray-700 p-2 rounded-md'>
                                                        <User2 className='w-4 h-4' />
                                                        <span>View Profile</span>
                                                    </Link>
                                                </motion.div>
                                            )}
                                            <motion.div whileHover={{ x: 5 }}>
                                                <button
                                                    onClick={logoutHandler}
                                                    className='flex items-center gap-2 text-gray-300 hover:text-red-400 transition-all duration-300 hover:bg-gray-700 p-2 rounded-md w-full'
                                                >
                                                    <LogOut className='w-4 h-4' />
                                                    <span>Logout</span>
                                                </button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="md:hidden bg-gray-900 px-4 pb-4 pt-2 space-y-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <ul className="flex flex-col gap-3">
                            {(user?.role === 'recruiter' ? [
                                { to: "/admin/companies", label: "Companies" },
                                { to: "/admin/jobs", label: "Jobs" }
                            ] : [
                                { to: "/", label: "Home" },
                                { to: "/jobs", label: "Jobs" },
                                { to: "/browse", label: "Browse" }
                            ]).map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={item.to}
                                        className="block text-gray-300 hover:text-orange-400"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {!user ? (
                            <div className="flex flex-col gap-2">
                                <Link to="/login" onClick={() => setMenuOpen(false)}>
                                    <button className='w-full py-2 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-md'>Login</button>
                                </Link>
                                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                                    <button className='w-full py-2 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-md'>Signup</button>
                                </Link>
                            </div>
                        ) : (
                            <div className="pt-2">
                                {user?.role === 'student' && (
                                    <Link to="/profile" className="block text-gray-300 hover:text-purple-400" onClick={() => setMenuOpen(false)}>
                                        View Profile
                                    </Link>
                                )}
                                <button onClick={() => { setMenuOpen(false); logoutHandler(); }} className="block text-left text-red-400 mt-2">
                                    Logout
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Navbar;
