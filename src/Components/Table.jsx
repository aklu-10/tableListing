import React from 'react'
import SubTable from './SubTable'
import Edit from './Edit'
import Delete from './Delete'
import { useState, useEffect } from 'react'

const Table = ({api}) => {

    const [data, setData] = useState([]);

    useEffect(()=>
    {
        fetch(api)
        .then(res=>res.json())
        .then(res=> Array.isArray(res) ? setData(res) : setData(res[Object.keys(res)[0]]))
    })

    function generateRows(obj)
    {
        return Object.keys(obj).map(element=>
        {
            if(typeof obj[element] === 'object')
            {
                return <td>{generateRows(obj[element])}</td>
            }   
            else
            {
                return <td>{obj[element]+''}</td>
            }
        })
    }

  return (
    <table border={1}>
        <thead>
            {
                data.length &&

                Object.keys(data[0]).map(element=>
                {
                    if(typeof data[0][element] === 'object')
                    {
                        return <SubTable data={data[0][element]} keyName={element}/>
                    }  
                    else
                    {
                        return <th>{element}</th>
                    }
                })
            }
            <th colSpan={2}>Action</th>
        </thead>
        <tbody>
            {
                data.length!=0 ? data.map(element=>
                {
                    return <tr>
                    {
                        generateRows(element)
                    }

                    <td><Edit elementId={element.id}/></td> 
                    <td><Delete/></td> 
                    </tr>
                }) : null
            }
        </tbody>
    </table>
  )
}

export default Table