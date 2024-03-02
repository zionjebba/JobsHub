import React from 'react';
import InputField from '../components/InputField';

const JobPostingData = ({ handleChange }) => {
  const now = new Date();
  //console.log(now);
  let twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  let sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  let thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  let lastYearAgo = new Date(now - 365 * 24 * 60 * 60 * 1000);

  // Convert dates to string
  twentyFourHoursAgo = twentyFourHoursAgo.toISOString().slice(0, 10);
  sevenDaysAgo = sevenDaysAgo.toISOString().slice(0, 10);
  thirtyDaysAgo = thirtyDaysAgo.toISOString().slice(0, 10);
  lastYearAgo = lastYearAgo.toISOString().slice(0, 10);

  //console.log(twentyFourHoursAgo);

  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Date of posting</h4>
      <div>
        <label className='sidebar-label-container'>
          <input
            type='radio'
            name='dateRange'
            id='allTime'
            value=''
            onChange={handleChange}
          />
          <span className='checkmark'></span>All time
        </label>
        <InputField
          handleChange={handleChange}
          value={twentyFourHoursAgo}
          title='Last 24 Hours'
          name='dateRange'
        />
        <InputField
          handleChange={handleChange}
          value={sevenDaysAgo}
          title='Last 7 days'
          name='dateRange'
        />
        <InputField
          handleChange={handleChange}
          value={thirtyDaysAgo}
          title='Last Month'
          name='dateRange'
        />
        <InputField
          handleChange={handleChange}
          value={lastYearAgo}
          title='Last Year'
          name='dateRange'
        />
      </div>
    </div>
  );
};

export default JobPostingData;
