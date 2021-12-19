import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin'

const urlApi = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get(urlApi)
      .then((res) => {
        setCoins(res.data)
      })
      .catch((error) => console.log(error.message))
  }, [])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            onChange={handleChange}
            type='text'
            placeholder='Search'
            className='coin-input'
          />
        </form>
      </div>
      {
        filteredCoins.map(coin => (
          <Coin
            key={coin.id}
            image={coin.image}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        ))
      }
    </div>
  );
}

export default App;
