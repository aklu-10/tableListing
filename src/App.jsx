import React from 'react'
import Table from './Components/Table';

const App = () => {


  return (
    <>
        <Table api={'http://localhost:8000/users'}/>
    </>
  )
}

export default App

