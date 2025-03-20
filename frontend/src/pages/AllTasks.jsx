import React, { useState } from 'react'
import Cards from '../components/Cards'
import InputData from '../components/InputData'
import { useSearchParams } from 'react-router-dom';

function AllTasks() {

  const [inputDiv, setInputDiv] = useState("hidden");

  return (
    <>
      <Cards addTask={"true"} setInputDiv={setInputDiv} />
      <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />
    </>
  )
}

export default AllTasks