import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Fooddisplay from '../../components/Fooddisplay/Fooddisplay'

const Home = () => {

  const [category,setCategory] = useState("All");


  return (

    <div>
      <Header></Header>
      <ExploreMenu category={category} setCategory={setCategory}></ExploreMenu>
      <Fooddisplay category={category}/>
    </div>
  )
}

export default Home