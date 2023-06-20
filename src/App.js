import Navbar from "./components/Navbar";
import StakeToken from "./components/StakeToken";
import { BrowserRouter, Routes, Route} from "react-router-dom";
// import Stake from "./components/Stake";
import Stake from "./pages/Stake";
import Main from "./pages/Main";

import { useAddress } from "@thirdweb-dev/react";

export default function Home() {
  const address = useAddress();
  if(!address) {
    return (
      <>
      <BrowserRouter>
        <div className="container noise">
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
       <div className="container noise">
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
