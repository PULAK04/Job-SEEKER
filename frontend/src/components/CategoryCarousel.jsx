import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [animate, setAnimate] = useState(false);

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`relative w-full max-w-4xl mx-auto my-20 transition-opacity duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transform`}>
            <div className="category-scroll flex overflow-x-auto space-x-4 px-4 py-4">
                {category.map((cat, index) => (
                    <button
                        key={index}
                        onClick={() => searchJobHandler(cat)}
                        className="flex-shrink-0 px-6 py-3 rounded-full 
                                   bg-gradient-to-r from-gray-800 to-gray-700 
                                   border border-gray-700 
                                   text-gray-300 
                                   hover:from-blue-600 hover:to-orange-500 hover:text-white 
                                   hover:border-transparent 
                                   shadow-md hover:shadow-orange-500/20 
                                   transition-all duration-300 ease-out transform hover:scale-105"
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <style jsx>{`
                .category-scroll::-webkit-scrollbar {
                    height: 8px;
                }
                .category-scroll::-webkit-scrollbar-track {
                    background: #1f2937; /* dark gray */
                }
                .category-scroll::-webkit-scrollbar-thumb {
                    background-color: #4b5563; /* slightly lighter gray */
                    border-radius: 10px;
                }
                .category-scroll::-webkit-scrollbar-thumb:hover {
                    background-color: #6b7280;
                }

                /* Firefox */
                .category-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: #4b5563 #1f2937;
                }
            `}</style>
        </div>
    );
};

export default CategoryCarousel;
