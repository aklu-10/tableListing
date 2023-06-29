import React,{ useState } from 'react';

const Form = ({data, isEdited}) => {

  const [formData, setFormData] = useState({...data});
  
  function handleSubmit(e)
  {
    e.preventDefault();

    fetch('http://localhost:8000/users/'+data.id,
    {
      method:'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(console.log)
    .then(console.log);

    isEdited();
  }

  function handleInputs(data,keyName)
  {
      return Object.keys(data).map(item=>
        {
            if(typeof data[item] === 'object')
            {
              return Object.keys(data[item]).map(elem=>
              {
                  if(typeof data[item][elem] === 'object')
                  {
                    return Object.keys(data[item][elem]).map(vals=>
                    {
                        return <><h5>{elem}</h5><label>{vals}</label><input type='text' value={formData[keyName][item][elem][vals]} onChange={(e)=>setFormData({...formData, [keyName]:{...data, [item]:{...data[item],[elem]:{...data[item][elem],[vals]:e.target.value}}}})}/></>
                    })
                  }
                  else
                  {
                    return <><label>{elem}</label><input type='text' value={formData[keyName][item][elem]} name={item} onChange={(e)=>setFormData({...formData,[keyName]:{...data,[item]:{...data[item],[elem]:e.target.value}}})}/></>
                  }
              })
            }
            else
            {
              return <><label>{item}</label><input type='text' value={formData[keyName][item]} name={item} onChange={(e)=>setFormData({...formData, [keyName]:{...data,[item]:e.target.value}})}/></>
            }
        })    
  }

  return (
    <form onSubmit={handleSubmit}>
    {
        Object.keys(formData).map(element=>
        {
          if(typeof formData[element] === 'object')
            return <><h5>{element}</h5>{handleInputs(formData[element], element)}</>
          else
            return <><label>{element}</label><input type="text" value={formData[element]} onChange={(e)=>setFormData({...formData,[element]:e.target.value})} /></>
        })
    }
    <button type='submit'>Save Changes</button>
    </form>
  )
}

export default Form