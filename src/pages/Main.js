import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const Main = () => {

  const [marketCap, setMarketCap] = useState(0);
  const [wistaPrice, setWistaPrice] = useState(0);
  const [tvl, setTvl] = useState(null);

  async function getMarketCap () {
    let url = './result.json';
          let response = await fetch(url).then(res => (res.json()));
          let market = (JSON.parse(response).data[24991].self_reported_market_cap / 1000).toFixed(0);
          setMarketCap(market)
   }
   getMarketCap();

   async function getWistaPrice () {
    let url = './result.json';
          let response = await fetch(url).then(res => (res.json()));
          console.log(JSON.parse(response));
          let price = JSON.parse(response).data[24991].quote.USD.price.toFixed(9);
          setWistaPrice(price)
   }
   getWistaPrice();

   async function getTVL () {
    let url = './result.json';
          let response = await fetch(url).then(res => (res.json()));
          let market = JSON.parse(response).data[24991].tvl_ratio;
  
          if(market === null) {
            setTvl(0)
          } else {
            setTvl(market)
          }
          
   }
   getTVL();


  return (
    <section className="info">
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

            <div className="info__item">
              <div className="info__num">{tvl}</div>
              <div className="info__descr">Total locked</div>
            </div>
          </div>

          <Link to="/stake/" className="info__btn">Let`s stake</Link>

          <div className="info__col">
            <div className="info__item">
              <div className="info__num">0,91 ETH</div>
              <div className="info__descr">Treasyre Balance</div>
            </div>

            <div className="info__item">
              <div className="info__num">67,48 ETH</div>
              <div className="info__descr">Rewards</div>
            </div>

            <div className="info__item">
              <div className="info__num">26 896 761 732 691</div>
              <div className="info__descr">Wista burned</div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Main;
