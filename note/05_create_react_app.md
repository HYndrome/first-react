# create react app

[creater react app](https://create-react-app.dev/)
실행하기 위해서 nodeJS가 필요함

```
npx create-react-app my-app
```

그럴 경우, my-app으로 파일 생성되고 안에 패키지가 설치됨
package에 기본적인 명령어가 설정되어 있음
개발용 server를 열게됨

```
npm start
```

src에 App.js와 index.js말고 다 정리해줬음
prop-types 설치

```
npm i prop-types
```

살펴보기

- index.js에서 App을 렌더링하고 있음
- css를 import 할 수 있음

```js
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

App.js에서 컴포넌트를 불러옴

```js
// App.js
import Button from "./Button";

function App() {
  return (
    <div>
      <h1>Wecome back!</h1>
      <Button text={"continue"} />
    </div>
  );
}

export default App;
```

컴포넌트를 사용할 시 export 해줘야함

```js
// Button.js
import PropTypes from "prop-types";

function Button({ text }) {
  return <button>{text}</button>;
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
```

## css 적용하기

1. 위의 방법처럼 한 style.css에 모든 내용 저장
2. 각각의 컴포넌트마다 style 지정

```js
// Button.js
import PropTypes from "prop-types";

function Button({ text }) {
  return (
    <button
      style={{
        color: "white",
        backgroundColor: "tomato",
      }}
    >
      {text}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
```

3. Divide and Conquor

- Button.module.css 파일 생성

```css
/* Button.module.css */
.btn {
  color: white;
  background-color: tomato;
}
```

- Button.js에서 생성한 class import

```js
// Button.js
import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ text }) {
  return <button className={styles.btn}>{text}</button>;
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
```

이렇게 할 경우, 실제 브라우저에서 해당 페이지가 랜더링될 때 class 이름은 무작위로 들어감

- 니코가 생각하기에 가장 최고의 부분이라고 생각함
- 같은 클래스 이름을 사용하더라도 문제가 안생김
