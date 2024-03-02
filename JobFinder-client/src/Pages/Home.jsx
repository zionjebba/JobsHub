import React, { useEffect } from 'react'
import Banner from '../components/Banner'
import { useState } from 'react';
import Card from '../components/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const [selectedCategory,setSelectedCategory]= useState(null);
  const[jobs,setJobs]=useState([]);
  const[isLoading,setIsLoading]= useState(true);
  const[currentPage,setCurrentPage]= useState(1);
  const itemsPerPage= 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/all-jobs")
    .then((res) => res.json())
    .then((data) => {
      setJobs(data);
      setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);
  
  const [query,setQuery] =useState("");
  const handleInputChange=(event)=>{
      setQuery(event.target.value)
  }
  const handleSearch = (value) => {
    setQuery(value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the handleSearch function with the current query value
    handleSearch(query);
    console.log('searc')
  }
  
  
  // filter jobs by title
  const filteredItems = jobs.filter((job)=>job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !==-1)
  //console.log(filteredItems);


  //------RADIO FILTERING-----
  const handleChange= (event)=>{
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
    // Add automatic scrolling on mobile devices
  if (window.innerWidth <= 768) {
    window.scrollTo({
      top: document.getElementById('job-card').offsetTop,
      behavior: 'smooth',
    });
  }
  }

  //-----buttton based filtering ---
  const handleClick =(event)=>{
    setSelectedCategory(event.target.value)
  }

        //calculate the index range
        const calculatePageRange=()=>{
          const startIndex =(currentPage-1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          return {startIndex,endIndex};
        }

        //function for the next page
        const nextPage= ()=>{
          if(currentPage< Math.ceil(filteredItems.length / itemsPerPage)){
            setCurrentPage(currentPage+1);
          }
        }

        //function for the previous page
        const prevPage =()=>{
          if(currentPage > 1){
            setCurrentPage(currentPage-1)
          }
        }

    //main function
    const filteredData =(jobs,selected,query)=>{
      let filteredJobs =jobs;

      //filtering Input Items
      if(query){
        filteredJobs= filteredItems;
      }
             
      //category filtering
      if (selected) {
        const selectedTimestamp = new Date(selected).setHours(0, 0, 0, 0);
      
        filteredJobs = filteredJobs.filter(({ postingDate, jobLocation,salaryType,experienceLevel,employmentType }) => {
          const jobTimestamp = new Date(postingDate).setHours(0, 0, 0, 0);
          return jobTimestamp >= selectedTimestamp || jobLocation.toLowerCase() === selected.toLowerCase()||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase()||  employmentType.toLowerCase()===selected.toLowerCase()
        });
      
        console.log('Filtered Jobs:', filteredJobs);
        console.log('Selected:', selected);
      }
      
      
      
      
      
      //Slice the data based on current page
      const {startIndex,endIndex}=calculatePageRange();
      filteredJobs= filteredJobs.slice(startIndex,endIndex);





      return filteredJobs.map((data,i)=><Card key={i} data={data}/>)
    }
    const result= filteredData(jobs,selectedCategory,query);
  return (
    <div  >
     <Banner query={query} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleSearch={handleSearch}/>

     {/*----main content*/}
         <div className=' md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12 '>

          {/*---left side----*/}
          <div className='bg-white p-4 rounded h-[1200px] '>
            <Sidebar handleChange={handleChange} handleClick={handleClick}/>
          </div>

                

              {/* JOB CARDS*/}
          <div className='col-span-3 bg-white p-4 rounded-sm w-full ' id='job-card'>
            
            {isLoading ? (<p className='font-medium'>Loading....</p>):result.length > 0 ?(<Jobs result={result}/>):<>
            <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
            <p>No data found</p>
            <button onClick={prevPage} disabled={currentPage=== 1} className='hover:underline appearance-none bg-transparent border-none cursor-pointer '>Back to Previous Page</button>
            </>}
            {/*pagination here */}
            {
              result.length > 0 ? (<div className='flex justify-center mt-4 space-x-8'>
                <button onClick={prevPage} disabled={currentPage=== 1} className='hover:underline'>Previous</button>
                <span>Page {currentPage} of {Math.ceil(filteredItems.length/itemsPerPage)}</span>
                <button onClick={nextPage} disabled={currentPage ===Math.ceil(filteredItems.length/itemsPerPage)} className='hover:underline'>Next</button>


              </div>): ""
            }
            </div>

              
          
         </div>
    </div>
  )
}

export default Home