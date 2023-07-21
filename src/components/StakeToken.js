import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { STAKE_TOKEN_ADDRESS } from "../constants/addresses";

export default function StakeToken() {
    const address = useAddress();
    const { contract: stakeTokenContract} = useContract(STAKE_TOKEN_ADDRESS, "token");

    const { data: tokenBalance} = useTokenBalance(stakeTokenContract, address);
    return (
        <>
            <h2>StakeToken</h2>
            <div>
                <p>${tokenBalance?.symbol}</p>
            </div>
            <div>
                <p>{tokenBalance?.displayValue}</p>
            </div>
        </>
    )
}