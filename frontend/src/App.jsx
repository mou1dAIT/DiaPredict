import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Router } from 'react-router-dom';
import Navbar from './Navbar/nav';
import HomeSection from './Home/partie1';
import Partie2 from './Home/partie2';
import Partie3 from './Home/partie3';
import Formulaire from './Formulaire/formuler';
import Footer from './Home/footer';



function App() {
 
  return (
    <>
    <BrowserRouter>
        <HomePage/>
    </BrowserRouter>
    </>
  )
}

function HomePage(){
    return(
        <div>
        <Navbar/>
        <Routes>
        <Route path='/'element={
                <>
               <HomeSection/>
                <Partie2/>
                <Partie3/>
                </>
                } />    
                
                    <Route path='/test' element={<Formulaire/>} />
                </Routes>
                
    
        <Footer/>
           
            
           
        </div>
    )
}

export default App
