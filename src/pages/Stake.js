import React, {useState, useEffect} from "react";
import { Web3Button, useAddress, useContract, useTokenBalance, useContractRead, useMetadata } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import {STAKE_TOKEN_ADDRESS} from './../constants/addresses';
import {STAKE_CONTRACT_ADDRESS ,STAKE_TOKEN_SWISTA} from './../constants/addresses';
import loader from './../resourses/loader.svg';

const Stake = () => {
    const address = useAddress();

    const [stakeContractABI, setStakeContractABI] = useState([]);

  async function getABIContract () {
    let url = 'https://api.polygonscan.com/api?module=contract&action=getabi&address=0x2506d8A259eDe5071dfF129c13700B01eEa17671&apikey=TPWCQH39DEATMVMBXQ666897DX4M1PM51A';
          let response = await fetch(url).then(res => res.json());
          let stakeContractABI = JSON.parse(response.result);
          return setStakeContractABI(stakeContractABI);
   }

   useEffect(() => {
    // getABIContract();
   }, []);
   const {
    contract: stakeContract
  } = useContract(STAKE_CONTRACT_ADDRESS, 'custom');
    const {
        contract: stakeTokenContract
    } = useContract(STAKE_TOKEN_ADDRESS, 'token');

    const {
        contract: stakeTokenContractSwista
    } = useContract(STAKE_TOKEN_SWISTA, 'token');
   

    const {
        data: stakeTokenBalance,
        isLoading: loadStakeTokenBalance
    } = useTokenBalance(
        stakeTokenContract,
        address
    )

    const {
        data: totalStaked,
        isLoading: loadStakedTotal
      } = useTokenBalance(
          stakeTokenContract,
          STAKE_CONTRACT_ADDRESS
      )

    const {
        data: stakeTokenSwistaBalance,
        isLoading: loadStakeTokenBalanceSwista
    } = useTokenBalance(
        stakeTokenContractSwista,
        address
    )


    // console.log(stakeTokenSwistaBalance.symbol);
    
    const [stakeAmount, setStakeAmount] = useState("0");
    const [unStakeAmount, setUnStakeAmount] = useState("0");

    function resetValue() {
        setStakeAmount("0");
        setUnStakeAmount("0");
    }

    return (
        <section className="stake container">
            <div className="stake__description">
            <div className="stake__background"></div>
                <h1 className="stake__title">STAKE WISTA TO GET 
                    REWARDS AND ENHANCE YOUR 
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
                <div className="stake__info">
                    <h2 className="stake__subtitle">stake wista</h2>
                    <div className="stake__balance">
                        <p className="stake__wista">BALANCE WI$TA 
                        {
                            !loadStakeTokenBalance ? (
                                <span> {stakeTokenBalance?.displayValue}</span>
                            ) : (
                                <span>  <svg viewBox="0 0 50 50" className="loader"><circle cx="25" cy="25" r="20" fill="none" stroke="hsl(246, 6.0%, 9.0%)" stroke-width="4" className="css-axmsrp"></circle></svg></span>
                            )
                        }
                        
                        
                        </p>
                        <p className="stake__swista">BALANCE $WISTA
                        {
                            !loadStakeTokenBalanceSwista ? (
                                <span> {stakeTokenSwistaBalance?.displayValue}</span>
                            ) : (
                                <span> <svg viewBox="0 0 50 50" className="loader"><circle cx="25" cy="25" r="20" fill="none" stroke="hsl(246, 6.0%, 9.0%)" stroke-width="4" className="css-axmsrp"></circle></svg></span>
                            )
                        }
                        
                        </p>
                    </div>
                </div>
               
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
                    <input className="stake__input"  max={stakeTokenSwistaBalance?.displayValue} type="number" value={unStakeAmount}
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
                    <h2 className="stake__subtitle stake__subtitle--mob">total wista staked</h2>
                    <div className="stake__staked">{
                        (stakeTokenContract && totalStaked) ? (
                            <div>{Math.round(+totalStaked?.displayValue)} WISTA</div>
                        ) : (
                            <div className="stake__loader"><svg viewBox="0 0 50 50" className="loader  loader--big"><circle cx="25" cy="25" r="20" fill="none" stroke="hsl(246, 6.0%, 9.0%)" stroke-width="4" className="css-axmsrp "></circle></svg> WISTA</div>
                        )
                    }</div>
                    
                </div>
            </div>
        </section>
    )
}

export default Stake