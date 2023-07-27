import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Stake from "./pages/Stake";
import Main from "./pages/Main";
import { useAddress } from "@thirdweb-dev/react";
import { MediaRenderer } from "@thirdweb-dev/react";

export default function App() {
  const address = useAddress();
 
  if(!address) {
    return (
      <>
      <BrowserRouter>
     
        <div className="noise">
          <main className="main">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/stake/" element={<Stake/>}/>
          </Routes>
        
          </main>
        </div>
        
      </BrowserRouter>
        
      </>
      
    )
  }
  return (

    <BrowserRouter>
       <div className="noise">
          <main className="main">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/stake/" element={<Stake/>}/>
          </Routes>
          </main>
        </div>
   </BrowserRouter>
   
  );
}