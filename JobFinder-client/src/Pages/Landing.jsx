import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { TypeAnimation } from 'react-type-animation';
import { Link } from "react-router-dom";
const Landing = () => {

  return (
    <div>
      <head>
        <title>HomePage</title>
      </head>

      <main className="px-10">
        <div >

          {" "}
          <div className=" flex">
          <section className="min-h-screen my-11">
            

            <div className="text-left p-10">
              <h2 className="text-5xl py-2 text-teal-600 font- md:text-6xl">
                JobsHub
              </h2>
    

              <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        '',
        0, // wait 1s before replacing "Mice" with "Hamsters"
        'Browse the Job Market',
        3000,
        'Post Jobs for clients',
        3000,
        'Search for Jobs With Ease',
        3000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />                {" "}
                       

              <p className="text-md py-5 leading-8 text-gray-800 md:xl max-w-2xl">
                Ghana's Number One Job Site Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nostrum iusto nobis odio, nulla,
                ex mollitia eius, accusantium exercitationem qui facilis
                laboriosam sequi libero consectetur delectus reprehenderit.
                Saepe assumenda vero tempora?
              </p>

              <Link to="/login" class="bg-teal-800 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded w-600 border border-teal-800 " >
                Get started
              </Link>{" "}
            </div>

           
          </section>

          <div>
          </div>
          </div>
          <section>
            <div className="">
              <h3 className="text-4xl font-sans font-light  text-center py-5">
                {" "}
                What Do We Offer? 
              </h3>
              <hr className="w-300px" />
              <p className="text-md py-2 my-5 leading-8  text-gray-800 text-center ">
                Lorem ipsum dolor sit, amet Elevate your career journey with our
                cutting-edge job app! Seamlessly navigate through posting,
                applying, searching, and featuring jobs. Experience the power of
                effortless job browsing as a client, and unleash unparalleled
                talent attraction as an employer. Join us to redefine career
                success! <span className="text-teal-500"> daka liowt </span>
                consectetur adipisicing elit. Voluptatibus saepe odio ab omnis
                voluptatem corrupti amet tempora suscipit.
              </p>
            </div>

            <div className="lg:flex gap-10 py-90px my-45">
              <div className="text-center shadow-lg p-10 rounded w-7/12">
                {/* <Image src={design} width{} height/> */}
                <h3 className="text-3xl py-5"> Post Jobs </h3>
                <p className="text-md py-2 leading-8 text-gray-800">
                  Revolutionize your recruitment process with Job Hub! Empower
                  your company to effortlessly showcase enticing career
                  opportunities to a vast pool of top-tier talent. With
                  customizable features and cutting-edge applicant tracking
                  tools, finding the perfect fit for your team has never been
                  more seamless and exciting.
                </p>
              </div>

              <div className="text-center shadow-lg p-10 rounded w-7/12">
                {/* <Image src={design} width{} height/> */}
                <h3 className="text-3xl py-5"> Apply To Your Dream Job </h3>
                <p className="text-md py-2 leading-8 text-gray-800">
                  Discover your dream career effortlessly with Job Hub! Our
                  user-friendly platform opens doors to a world of diverse
                  opportunities across various industries and locations.
                  Effortlessly submit your application materials with just a few
                  clicks and stay ahead with personalized job recommendations
                  and alerts tailored to your unique skills and preferences.
                </p>
              </div>

              <div className="text-center shadow-lg p-10 rounded w-7/12">
                {/* <Image src={design} width{} height/> */}
                <h3 className="text-3xl py-5"> Beautiful Designs </h3>
                <p className="text-md py-2 leading-8 text-gray-800">
                  Lorem ipsum dolor sit, amet{" "}
                  <span className="text-teal-500"> daka liowt </span>consectetur
                  adipisicing elit. Voluptatibus saepe odio ab omnis voluptatem
                  corrupti amet tempora suscipit. Impedit aliquid corporis quo
                  quam laboriosam nam numquam quod quidem expedita nisi.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
              <div className="basis-1/3 flex-11">
                <img
                  className="rounded-lg object-cover"
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  src=""
                  alt=""
                />
              </div>
              <div className="basis-1/3 flex-11">
                <img
                  className="rounded-lg object-cover"
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  src=""
                  alt=""
                />
              </div>
              <div className="basis-1/3 flex-11">
                <img
                  className="rounded-lg object-cover"
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  src=""
                  alt=""
                />
              </div>
              <div className="basis-1/3 flex-11">
                <img
                  className="rounded-lg object-cover"
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  src=""
                  alt=""
                />
              </div>
              <div className="basis-1/3 flex-11">
                <img
                  className="rounded-lg object-cover"
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  src=""
                  alt=""
                />
              </div>
              <div className="basis-1/3 flex-11">
                <img
                  className="rounded-lg object-cover"
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  src=""
                  alt=""
                />
              </div>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};


export default Landing;
