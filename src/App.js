import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Stake from "./pages/Stake";
import Main from "./pages/Main";
import { useStorageUpload } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { MediaRenderer } from "@thirdweb-dev/react";

export default function App() {
  const address = useAddress();
  const { mutateAsync: upload } = useStorageUpload();

  const uploadData = async () => {
    // Get any data that you want to upload
    const dataToUpload = ['https://13a385f968380eef3358556f47ef07a7.ipfscdn.io/ipfs/bafybeifgvvbnnv4t26iwzqplyp5w6234swur6djjgfamd46j6fd4ll6d44/metamask.svg'];

    // And upload the data with the upload function
    const uris = await upload({ data: dataToUpload });
  }
  if(!address) {
    return (
      <>
      <BrowserRouter>
      {/* <MediaRenderer src="https://13a385f968380eef3358556f47ef07a7.ipfscdn.io/ipfs/bafybeifgvvbnnv4t26iwzqplyp5w6234swur6djjgfamd46j6fd4ll6d44/metamask.svg" /> */}
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
      {/* <MediaRenderer src="ipfs://QmamvVM5kvsYjQJYs7x8LXKYGFkwtGvuRvqZsuzvpHmQq9/0" /> */}
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