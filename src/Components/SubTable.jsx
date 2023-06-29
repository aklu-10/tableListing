import React from 'react'


const SubTable = ({data, keyName}) => {

  return (
    <table border={1}>
        <thead>

            <th colSpan={Object.keys(data).length}>{keyName}</th>
        <tr>

        {
            Object.keys(data).map(element=>
            {
                if(typeof data[element] === 'object')
                {
                    return <SubTable data={data[element]}/>
                }
                else
                {
                    return <th>{element}</th>
                }
            })            
        }
        </tr>
        </thead>

    </table>
  )
}

export default SubTable