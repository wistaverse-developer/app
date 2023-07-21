import { Web3Button, useAddress, useContract, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import React, {useEffect, useState} from "react";
import { ethers } from "ethers";
import {STAKE_TOKEN_ADDRESS} from './../constants/addresses';
import {STAKE_CONTRACT_ADDRESS} from './../constants/addresses';

export default function Stake() {
    const address = useAddress();

    console.log(address)

    const {
        contract: stakeTokenContract
    } = useContract(STAKE_TOKEN_ADDRESS, 'token');
    const {
        contract: stakeContract
    } = useContract(STAKE_CONTRACT_ADDRESS, 'custom');

    const {
        data: stakeTokenBalance,
        isLoading: loadStakeTokenBalance
    } = useTokenBalance(
        stakeTokenContract,
        address
    )
    const [stakeAmount, setStakeAmount] = useState("0");
    const [unStakeAmount, setUnStakeAmount] = useState("0");

    function resetValue() {
        setStakeAmount("0");
        setUnStakeAmount("0");
    }
    // const {
    //     data: stakeInfo,
    //     refetch: refetchStakeInfo,
    //     isLoading: loadingStakeInfo
    // } = useContractRead(
    //     stakeContract,
    //     "getStakeInfo",
    //     [address]
    // )
    return (
        <>
            <input type="number" value={stakeAmount} max={stakeTokenBalance?.displayValue} onChange={(e) => setStakeAmount(e.target.value)}/>
            <Web3Button contractAddress={STAKE_CONTRACT_ADDRESS} action={async (contract) => {
                await stakeTokenContract?.setAllowance(STAKE_CONTRACT_ADDRESS, stakeAmount);
                await contract.call(
                    'tranfer',
                    [ethers.utils.parseEther(stakeAmount)]
                );
                resetValue();
            }}>
                Stake
            </Web3Button>
            <input type="number" value={unStakeAmount} max={stakeTokenBalance?.displayValue} onChange={(e) => setUnStakeAmount(e.target.value)}/>
            <Web3Button contractAddress={STAKE_CONTRACT_ADDRESS} action={async (contract) => {
                await stakeTokenContract?.setAllowance(STAKE_CONTRACT_ADDRESS, unStakeAmount);
                await contract.call(
                    'unstake',
                    [ethers.utils.parseEther(unStakeAmount)]
                );
                resetValue();
            }}>
                UnStake
            </Web3Button>
        </>
    )
}