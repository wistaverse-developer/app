import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";
import "./styles/style.scss";
import { Polygon } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "polygon";
console.log(Polygon)
const container = document.getElementById("root");
const root = createRoot(container);
const sdk = new ThirdwebSDK("polygon", {
    clientId: "70bb71037bf21ede4667bd5bfa49156d"
  });
root.render(
    <ThirdwebProvider activeChain={Polygon} clientId="70bb71037bf21ede4667bd5bfa49156d">
        <App />
    </ThirdwebProvider>
);


