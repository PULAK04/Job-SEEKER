import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 transition-all duration-300">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-10'>
                <h1 className='text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-orange-700'>
                    Search Results ({allJobs.length})
                </h1>
                {allJobs.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-400 text-lg">No jobs found matching your search criteria</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse;