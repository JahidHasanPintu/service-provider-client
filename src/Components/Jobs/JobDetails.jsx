import React from 'react';
import { useLocation } from 'react-router-dom';

const JobDetails = () => {
    const location = useLocation();
    const service = location?.state;
    console.log(service);
    return (
        <div>
            <h2>Job Details</h2>
        </div>
    );
};

export default JobDetails;