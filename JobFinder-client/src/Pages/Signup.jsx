import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const SignUpComponent = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between mt-40">
      <div className="container-md mx-auto flex-grow">
        <div className="table mx-auto">
          <div className="table-cell align-middle text-center w-full p-4 relative md:-top-[60px]" style={{ display: 'table-cell' }}>
            <h1 className="mb-5 text-[28px] md:text-4xl pt-6 md:pt-0 font-medium md:mb-8">Create your Account</h1>
            <div className="w-full md:space-x-6 md:flex">
              <div className="relative flex flex-col md:px-5 py-[50px] p-5 mb-5 w-full rounded-lg border border-gray-300 md:w-[500px] hover:border-gray-400 bg-white text-black hover:bg-gray-100 transition duration-300">
                <span className="mb-4 text-3xl font-medium">Job Seeker</span>
                <span className="mb-4 text-base text-gray-500">Are you looking for your dream job?<br />Look no further! Create an account with us now</span>
                <Link to="/sign-seeker"
                  className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 mx-auto"
                  type="button"
                >
                  Register as Job Seeker
                </Link>
              </div>
              <div className="relative flex flex-col md:px-5 py-[50px]  p-5 mb-5 w-full rounded-lg border border-gray-300 md:w-[500px] hover:border-gray-400 bg-white text-black hover:bg-gray-100 transition duration-300">
                <span className="mb-4 text-3xl font-medium">Employer</span>
                <span className="mb-4 text-base text-gray-500">Are you looking for quality candidates?<br />Post away with JobsHub!</span>
                <Link to="/sign-employer"
                  className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 mx-auto"
                  type="button"
                >
                  Register as Employer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-40'>
        <Footer />
      </div>
    </div>
  );
};

export default SignUpComponent;
