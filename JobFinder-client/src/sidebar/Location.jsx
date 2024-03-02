import React from 'react'
import InputField from '../components/InputField'
import { useState } from 'react'

const Location = ({handleChange}) => {
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Location</h4>
        <div>
            <label className='sidebar-label-container'>

                <input type='radio' name='test' id='test' value='' onChange={handleChange}></input>

                <span className='checkmark'></span>All
            </label>
            <InputField handleChange={handleChange} value="accra" title="Accra" name="test"/>
            <InputField handleChange={handleChange} value="capecoast" title="CapeCoast" name="test"/>
            <InputField handleChange={handleChange} value="kumasi" title="Kumasi" name="test"/>
            <InputField handleChange={handleChange} value="koforidua" title="Koforidua" name="test"/>
        </div>
    </div>
  )
}

export default Location