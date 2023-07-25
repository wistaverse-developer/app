import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useContract, useTokenBalance, useContractRead } from "@thirdweb-dev/react";
import {STAKE_TOKEN_ADDRESS, STAKE_OWNER_ADDRESS, STAKE_CONTRACT_ADDRESS} from './../constants/addresses';


const Main = () => {

  

  const [marketCap, setMarketCap] = useState(0);
  const [wistaPrice, setWistaPrice] = useState(0);
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

  // console.log(stakeContractABI);
  

  async function getMarketCap () {
    let url = '/result.json';
          let response = await fetch(url).then(res => (res.json()));
          let market = (JSON.parse(response).data[24991].self_reported_market_cap / 1000).toFixed(0);
          setMarketCap(market)
   }
   getMarketCap();

   async function getWistaPrice () {
    let url = '/result.json';
          let response = await fetch(url).then(res => (res.json()));
          let price = JSON.parse(response).data[24991].quote.USD.price.toFixed(9);
          setWistaPrice(price)
   }
   getWistaPrice();
  const {
    contract: stakeTokenContract
  } = useContract(STAKE_TOKEN_ADDRESS, 'token');
  const {
    contract: stakeContract
  } = useContract(STAKE_CONTRACT_ADDRESS, 'custom');
  const {
    data: tresuareBalanse,
    isLoading: loadStakeBalance
  } = useTokenBalance(
      stakeTokenContract,
      STAKE_OWNER_ADDRESS
  )

  const {
    data: totalStaked,
    isLoading: loadStakedTotal
  } = useTokenBalance(
      stakeTokenContract,
      STAKE_CONTRACT_ADDRESS
  )
  // console.log(stakeContract)
  //  async function getTVL () {
  //   let url = './result.json';
  //         let response = await fetch(url).then(res => (res.json()));
  //         let market = JSON.parse(response).data[24991].tvl_ratio;
  
  //         if(market === null) {
  //           setTvl(0)
  //         } else {
  //           setTvl(market)
  //         }
          
  //  }
  //  getTVL();


  return (
    <section className="info">
      <div className="container">
      <div className="info__inner">

          <div className="info__col">
            <div className="info__item">
              <div className="info__num">${wistaPrice}</div>
              <div className="info__descr">wista price</div>
            </div>

            <div className="info__item">
              <div className="info__num">${marketCap}</div>
              <div className="info__descr">Marketcap</div>
            </div>

            {/* <div className="info__item">
              <div className="info__num">{tvl}</div>
              <div className="info__descr">Total locked</div>
            </div> */}
          </div>

          <Link to="/stake/" className="info__btn">Let's stake</Link>

          <div className="info__col">
            <div className="info__item">
            {
                  (stakeTokenContract && tresuareBalanse) ? (
                    <div className="info__num">{Math.round(+tresuareBalanse?.displayValue)} WISTA</div>
                  ) : (
                    <div className="info__num">0 WISTA</div>
                  )
                }
                
              <div className="info__descr">Treasury Balance</div>
            </div>

            <div className="info__item">
                {
                  (stakeTokenContract && totalStaked) ? (
                    <div className="info__num">{Math.round(+totalStaked?.displayValue)} WISTA</div>
                  ) : (
                    <div className="info__num">0 WISTA</div>
                  )
                }
              <div className="info__descr">Total Stake</div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Main;