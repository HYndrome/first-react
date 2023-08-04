[코인파프리카 api](https://api.coinpaprika.com/)
https://api.coinpaprika.com/v1/tickers

해당 주소를 fetch하여 api 요청하고,
then 응답으로 온 response를 json으로 변환하고,
then json으로 변환된 데이터를 console.log 해보기

```js
useEffect(() => {
  fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => console.log(json));
}, []);
```

현재 코인 시세를 리스트로 출력하는 코드

```js
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const today = new Date();
  return (
    <div>
      <h1>The Coins! - {today.toLocaleString()}</h1>
      {loading ? <strong>Loading...</strong> : null}
      <ul>
        {coins.map((item) => (
          <li key={item.id}>
            {item.name}({item.symbol}) : $ {item.quotes.USD.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

현재 가지고 있는 달러를 입력 받고 선택한 코인을 얼만큼 환전할 수 있도록 개선
select를 선택할 때마다 state 값을 변경하게 하여 구현
option에 있는 text를 가져올 수 있는 방법을 찾지 못해서 value에 시세, 심볼을 ","로 이어서 받은 뒤,
split(",")을 사용하여 분리하는 방법을 사용했음. 좋은 방법인지는 모르겠다.

```js
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cash, setCash] = useState(0);
  const [currentCoin, setCurrentCoin] = useState(false);
  const onChangeCash = (event) => {
    setCash(event.target.value);
  };
  const onChangeCoin = (event) => {
    setCurrentCoin(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const today = new Date();
  return (
    <div>
      <h1>The Coins! - {today.toLocaleString()} 기준</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <label htmlFor="cash">I have $</label>
          <input
            id="cash"
            value={cash}
            onChange={onChangeCash}
            type="number"
          ></input>
          <br />
          <label htmlFor="coin">Exchange to </label>
          <select id="coin" onChange={onChangeCoin}>
            {coins.map((item) => (
              <option
                key={item.id}
                value={[item.quotes.USD.price, item.symbol]}
              >
                {item.name}({item.symbol})
              </option>
            ))}
          </select>
          <br />
          {currentCoin ? (
            <strong>
              You can buy{" "}
              <span>{cash / Number(currentCoin.split(",")[0])}</span>{" "}
              <span>{currentCoin.split(",")[1]}</span>
            </strong>
          ) : (
            <strong>Please select coin</strong>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
```
