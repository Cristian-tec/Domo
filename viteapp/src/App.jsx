import react from 'react'
import { Routes, Route } from "react-router-dom";
import ControlLigth from './Components/ControlLigth';
import Home from './Components/Home'
import InfoDevice from './Components/InfoDevice';
import LinesChart3 from './Components/LinesChart3';
import Navbar from './Components/Navbar/Navbar';
import Offline from './Components/Offline';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home />} />

        <Route
          exact
          path="/info"
          element={<InfoDevice />} />

        <Route
          exact
          path="/chart"
          element={<LinesChart3 />} />

        <Route
          exact
          path="/offline"
          element={<Offline />} />

        <Route
          exact
          path="/controlligth"
          element={<ControlLigth />} />

        {/*  <Route exact path="/recipedetail/:id" element={<RecipeDetail2/>}/> */}
      </Routes>
    </>

  )
}

export default App
