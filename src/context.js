import { useContext,createContext } from "react";

import { useAddress,useContract,useMetamask,useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext=createContext()



// To use the context, we need a provider that is a function which
// allow us to use the context functionalities in other parts of our app
export const StateContextProvider=({children})=>{

    // contract address 

    const crowdFundedAddress='0xf918A372cA3eC2159a14edEE36D43628612E39F7';

    // Accessing the contract
    // Pass the contract address to useContract hook

    const {contract}=useContract('0xf918A372cA3eC2159a14edEE36D43628612E39F7')
   
    console.log(contract,)

    // In thirdweb, we can call the write functions as follow.
    // Write functions are those in which we pass some data to contract
    // Dummy variable names are also guiding you more

    const {mutateAsync:createProposal}=useContractWrite(contract,'createProposal')

    // Get address of Wallet

    const address=useAddress()

    const connect=useMetamask() 

    const publishProposal= async (title,desc,recipientAddress,amount,duration)=>{
        console.log(title,desc,'hi')

        try{

            const data= await createProposal(title,desc,recipientAddress,amount,duration)
        } catch(error){
            console.log(error)
        }


    }

    return(
        <StateContext.Provider value={{address,contract,publishProposal,connect}}>
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext=()=>useContext(StateContext)