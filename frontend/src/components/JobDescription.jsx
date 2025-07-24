import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
            
            if (res.data.success) {
                setIsApplied(true)
                const updatedSingleJob = {
                    ...singleJob, 
                    applications: [...singleJob.applications, { applicant: user?._id }]
                }
                dispatch(setSingleJob(updatedSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Failed to apply')
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob() 
    }, [jobId, dispatch, user?._id])

    return (
        <div className='min-h-screen bg-gray-900 text-gray-100 py-10 px-4'>
            <div className='max-w-7xl mx-auto'>

                {/* Header Section */}
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-md'>
                    <div>
                        <h1 className='font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400'>
                            {singleJob?.title}
                        </h1>
                        <div className='flex flex-wrap items-center gap-2 mt-4'>
                            <span className='px-3 py-1 rounded-full text-xs font-semibold text-blue-300 bg-blue-800/50'>
                                {singleJob?.position} Positions
                            </span>
                            <span className='px-3 py-1 rounded-full text-xs font-semibold text-red-300 bg-red-800/50'>
                                {singleJob?.jobType}
                            </span>
                            <span className='px-3 py-1 rounded-full text-xs font-semibold text-purple-300 bg-purple-800/50'>
                                {singleJob?.salary} LPA
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                            isApplied 
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/30'
                        }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </button>
                </div>

                {/* Section Header */}
                <h2 className='border-b border-gray-700 font-semibold text-lg mt-10 mb-6 text-gray-300'>Job Description</h2>

                {/* Description Box */}
                <div className='bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4'>
                    <InfoRow label="Role" value={singleJob?.title} />
                    <InfoRow label="Location" value={singleJob?.location} />
                    <InfoRow label="Description" value={singleJob?.description} />
                    <InfoRow label="Experience" value={`${singleJob?.experience} yrs`} />
                    <InfoRow label="Salary" value={`${singleJob?.salary} LPA`} />
                    <InfoRow label="Total Applicants" value={singleJob?.applications?.length} />
                    <InfoRow label="Posted Date" value={singleJob?.createdAt?.split("T")[0]} />
                </div>
            </div>
        </div>
    )
}

const InfoRow = ({ label, value }) => (
    <div className='flex flex-col sm:flex-row'>
        <h3 className='min-w-[140px] font-semibold text-gray-400'>{label}:</h3>
        <span className='text-gray-200'>{value || '-'}</span>
    </div>
)

export default JobDescription
