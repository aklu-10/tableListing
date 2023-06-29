import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import Form from './Form'

const Edit = ({elementId}) => {

    const [elementData, setElementData] = useState({});
    function handleEdit() 
    {
        axios.get('http://localhost:8000/users/'+elementId)
        .then(({data})=>setElementData({...data}));
    }

    function isEdited()
    {
      setElementData({});
    }

  return (
    <>
        {
            Object.keys(elementData).length ?  <Form data={elementData} isEdited={isEdited}/> : null
        }
        <button onClick={handleEdit}>Edit</button>
    </>
  )
}

export default Edit