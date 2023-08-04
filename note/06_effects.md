# effects

아래 코드에서 state가 변경될 때마다, console.log는 실행됨
첫 번째 render 할때만 실행하고 싶다면?

```js
import { useState } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const onClick = () => setValue((prev) => prev + 1);
  console.log("call an API");
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me!</button>
    </div>
  );
}

export default App;
```

## useEffect

- 컴포넌트 안에 딱 한번만 실행하고 싶은 코드가 있을 경우
- 컴포넌트 안에 특정 데이터가 변화할 때만 실행해야할 경우
- dependencies: react가 지켜봐야하는 것
  - dependecies가 [] 빈 리스트이면 지켜봐야할 것이 없다 = 한 번만 실행

```js
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const onClick = () => setValue((prev) => prev + 1);
  console.log("I run all the time");
  const iRunOnlyOnce = () => {
    console.log("I run only once");
  };
  useEffect(iRunOnlyOnce, []);
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me!</button>
    </div>
  );
}

export default App;
```

검색창을 만든다고 생각하자

```js
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => {
    setKeyword(event.target.value);
  };
  console.log("I run all the time");
  useEffect(() => {
    console.log("i run only once");
  }, []);
  console.log("SEARCH FOR", keyword);
  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here"
      ></input>
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me!</button>
    </div>
  );
}

export default App;
```

현재 문제

1. input에 있는 단어가 변경될 때마다 SEARCH FOR 실행
2. 검색과 관련 없는 button을 onClick 시에도 SEARCH FOR 실행
   해결 방법

- useEffect를 사용하고, 두 번째인자에 [keyword]를 넣어줌

```js
useEffect(() => {
  console.log("SEARCH FOR", keyword);
}, [keyword]);
```

```js
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => {
    setKeyword(event.target.value);
  };
  console.log("I run all the time");
  useEffect(() => {
    console.log("i run only once");
  }, []);
  useEffect(() => {
    console.log("SEARCH FOR", keyword);
  }, [keyword]);
  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here"
      ></input>
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me!</button>
    </div>
  );
}

export default App;
```

만약에 처음에 SEARCH FOR가 실행되는 것을 막으려면 if문으로 조건을 추가해주는 방법이 있음

```js
useEffect(() => {
  if (keyword.length > 0) {
    console.log("SEARCH FOR", keyword);
  }
}, [keyword]);
```

useEffect 작동 확인

```js
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => {
    setKeyword(event.target.value);
  };
  console.log("I run all the time");
  useEffect(() => {
    console.log("I run only once");
  }, []);
  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  }, [keyword]);
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);
  useEffect(() => {
    console.log("I run when 'keyword' and 'counter' changes.");
  }, [keyword, counter]);
  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here"
      ></input>
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me!</button>
    </div>
  );
}

export default App;
```

## cleanup function

react는 컴포넌트를 destroy할 때도 함수를 사용할 수 있음
아래 코드에서 Hello 컴포넌트가 사라질 때, useEffect 안의 함수 안의 return문이 실행됨

- 니코는 거의 사용하지 않는다고 함

```js
import { useEffect, useState } from "react";

function Hello() {
  useEffect(() => {
    console.log("created!");
    return () => console.log("detroyed!");
  }, []);
  return <h1>Hello</h1>;
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
```
