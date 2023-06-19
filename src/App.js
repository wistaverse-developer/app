import Navbar from "./components/Navbar";
import StakeToken from "./components/StakeToken";
// import Stake from "./components/Stake";
import Stake from "./pages/Stake";

import { useAddress } from "@thirdweb-dev/react";

export default function Home() {
  const address = useAddress();
  if(!address) {
    return (
      <>
        <Navbar/>
        <h1>Please, Connect wallet</h1>
      </>
      
    )
  }
  return (
    <div className="container noise">
      <main className="main">
       <Navbar/>
       <Stake/>
      </main>
    </div>
  );
}
