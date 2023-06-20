import React, {useState, useEffect} from "react";
import { Web3Button, useAddress, useContract, useTokenBalance, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import {STAKE_TOKEN_ADDRESS} from './../constants/addresses';
import {STAKE_CONTRACT_ADDRESS ,STAKE_TOKEN_SWISTA} from './../constants/addresses';
const Stake = () => {
    const address = useAddress();
    const {
        contract: stakeTokenContract
    } = useContract(STAKE_TOKEN_ADDRESS, 'token');
    const {
        contract: stakeTokenContractSwista
    } = useContract(STAKE_TOKEN_SWISTA, 'token');
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

    const {
        data: stakeTokenSwistaBalance,
        isLoading: loadStakeTokenBalanceSwista
    } = useTokenBalance(
        stakeTokenContractSwista,
        address
    )

    // const {
    //     data: stakeInfo,
    //     refetch: refetchStakeInfo,
    //     isLoading: loadStakeInfo
    // } = useContractRead(
    //     stakeContract,
    //     "getStakeInfo",
    //     [address]
    // );

    // useEffect(() => {
    //     setInterval(() => {
    //         refetchStakeInfo()
    //     }, 10000)
    // }, [])
    const [stakeAmount, setStakeAmount] = useState("0");
    const [unStakeAmount, setUnStakeAmount] = useState("0");

    function resetValue() {
        setStakeAmount("0");
        setUnStakeAmount("0");
    }
    return (
        <section className="stake">
            <div className="stake__description">
            <div className="stake__background"></div>
                <h1 className="stake__title">STAKE WISTA TO GET 
                    REWARDS AND ENHANCEYOUR 
                    COMMUNITY ROLE</h1>
                <h2 className="stake__subtitle">Rewards and incetivies:</h2>
                <div className="stake__wrapper">
                    <div className="stake__item">
                        By staking your wista you access a special role in the commynity, you also receive frequent rewards
                    </div>
                    <div className="stake__item">
                        Rewards are based on the amount of Wi$ta staked and the time youve ben staking
                    </div>
                    <div className="stake__item">
                        Rewards:
                        <p>— exclusive Avatars, NFTs and wearables airdrops</p>
                        <p>— frequent WI$TA airdrops</p>
                    </div>
                    <div className="stake__item">
                        stakers advantages:
                        <p>—  eIncreased voiting power</p>
                        <p>— Access to exclusive chanels</p>
                        <p>— Get paid to provide moderation to the platform    to protect it from bsd actors</p>
                    </div>
                </div>
            </div>
            <div className="stake__block">
                <h2 className="stake__subtitle">stake wista</h2>
                <label className="stake__label">
                    <input className="stake__input" type="number"
                    value={stakeAmount} max={stakeTokenBalance?.displayValue}
                     onChange={(e) => setStakeAmount(e.target.value)}/>
                </label>
               
                <Web3Button
                    className="stake__button"
                    contractAddress={STAKE_CONTRACT_ADDRESS}
                    action={
                        async (contract) => {
                           await stakeTokenContract?.setAllowance(
                            STAKE_CONTRACT_ADDRESS, 
                            stakeAmount
                           );

                           await contract.call(
                            "stake",
                            [ethers.utils.parseEther(stakeAmount)]
                           );
                           resetValue();
                        }
                    }
                    >STAKE!</Web3Button>

                <label className="stake__label stake__label--unstake">
                    <input className="stake__input" type="number" value={unStakeAmount}
                    onChange={(e) => setUnStakeAmount(e.target.value)}/>
                </label>
                <Web3Button
                    className="stake__button"
                    contractAddress={STAKE_CONTRACT_ADDRESS}
                    action={
                        async (contract) => {
                            await stakeTokenContractSwista?.setAllowance(
                                STAKE_CONTRACT_ADDRESS, 
                                unStakeAmount
                            );
                           await contract.call(
                            "unstake",
                            [ethers.utils.parseEther(unStakeAmount)]
                           );
                           resetValue();
                        }
                    }
                    >UNSTAKE!</Web3Button>
                <div className="stake__total">
                    <h2 className="stake__subtitle stake__subtitle--mob">total wista stacked</h2>
                    <div className="stake__staked">{
                        stakeTokenContractSwista ? (
                            <div>{stakeTokenSwistaBalance?.displayValue} SWISTA</div>
                        ) : (
                            <div>0</div>
                        )
                    }</div>
                </div>
            </div>
        </section>
    )
}

export default Stake