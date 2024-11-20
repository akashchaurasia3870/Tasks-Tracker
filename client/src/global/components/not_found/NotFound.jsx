import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import not_found_logo from '../../../asset/images/not_found.png'
import Loading from '../loading/Loading';

const NotFound = () => {

    let [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 2000)

    return (

        <>
            {
                isLoading === true && <div className='loader'>
                    <Loading />
                </div>
            }
            <div className='text-center mx-auto flex justify-center items-center flex-col h-[95vh]'>

                <div className="not_found_logo">
                    <img
                        src={not_found_logo}
                        alt="Not Found"
                        style={{ width: '150px', marginBottom: '20px' }}
                    />
                </div>
                <h1>Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <Link to="/">
                    <button className='bg-green-500 p-2 rounded-md m-2 px-5'>Go to Home</button>
                </Link>
            </div>
        </>
        
    );
};

export default NotFound;
