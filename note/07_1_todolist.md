## JS 문법

기존 배열에 새로운 요소를 추가하는 방법
[전개구문](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

```js
const array = [1, 2, 3, 4];
const newElement = 5;
const newArray = [...array, newElement];
```

Array에 있는 요소를 react element로 출력하기 => map 사용

```js
{
  toDos.map((item, index) => <li key={index}>{item}</li>);
}
```

```js
import { useEffect, useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => {
    setToDo(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    // 아래와 같이 state를 직접적으로 수정하지 않는다
    // toDos.push()
    // state는 함수를 사용하여 값을 수정
    setToDos((currentArray) => [toDo, ...currentArray]);
    setToDo("");
  };
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="write what you have to..."
        ></input>
        <button>Add to Do</button>
      </form>
      <hr />
      {toDos.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </div>
  );
}

export default App;
```
