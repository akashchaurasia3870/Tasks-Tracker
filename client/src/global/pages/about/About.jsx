import React, { useState } from 'react';
import contact_logo from '../../../asset/images/about.svg'
import { Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';


const About = () => {

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

            <div className="px-4 md:px-10 min-h-[88vh] bg5 flex flex-col justify-center items-center text-gray-200">
                <div className='contact_logo rounded-xl w-full lg:w-[45%] flex flex-col justify-center items-center h-[40vh] sm:h-[100%]'>
                    <img src={contact_logo} className=' w-full -mt-20' />
                    <div className='flex flex-col justify-center items-center h-auto -mt-12 text-center'>
                        <span className='-mt-10 text-xl md:text-2xl lg:text-3xl font-extrabold '>We’re a passionate group of people working from around the world to build the future of ecommerce.</span>

                        <Link to='/contact' className=' my-6'>
                            <span className='text-xl md:text-3xl lg:text-4xl font-extrabold bg-11 px-4 py-2 rounded-lg text-white'>Contact US</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>

    );
};

export default About;
