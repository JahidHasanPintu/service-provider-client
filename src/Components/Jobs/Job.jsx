import React from 'react';
import './Job.css'
import { FaArrowRight, FaBeer } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
const Job = (props) => {
    const { TITLE, BUDGET, DURATION, DESCRIPTION, EXPERIENCE, TYPE, SKILLS, createdAt } = props.service;

    const timeAgo = (createdAt) => {
        const currentDate = new Date();
        const createdDate = new Date(createdAt);

        const timeDifferenceInSeconds = Math.floor((currentDate - createdDate) / 1000);

        if (timeDifferenceInSeconds < 60) {
            return `${timeDifferenceInSeconds} second${timeDifferenceInSeconds === 1 ? '' : 's'} ago`;
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else {
            const days = Math.floor(timeDifferenceInSeconds / 86400);
            return `${days} day${days === 1 ? '' : 's'} ago`;
        }
    };
    const navigate = useNavigate();
    const navigateToServiceDetails = (service) => {
        navigate(`/job-details/${service._id}`, { state: { service } });

    }

    return (

        <div className="text-start card w-96 bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">{TITLE.slice(0, 30)}</h2>
                <div className="flex justify-between">
                <p className='text-xs'>Posted {timeAgo(createdAt)}</p>
                <p className='text-xs'>Area: {props.service?.LOCATION}</p>
                </div>
                <div className="flex justify-between">
                    <p className="flex-1 text-blue-600">Time Require: {DURATION}</p>
                    <p className="flex-1 font-bold text-red-500">Budget: ৳ {BUDGET}</p>
                </div>
                <p>{DESCRIPTION.slice(0, 60)}</p>
                <p>Skills: {SKILLS}</p>
                <div className="card-actions justify-end">

                    <button onClick={() => navigateToServiceDetails(props.service)} className="btn btn-primary">Details <FaArrowRight /> </button>


                </div>
            </div>
        </div>

    );
};

export default Job;