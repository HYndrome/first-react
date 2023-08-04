# gh-pages

github pages에 업로드할 수 있게 해주는 패키지

```
npm i gh-pages
```

package.js에 있는 "build": "react-scripts build" 스크립트를 실행할 경우, production ready 코드를 실행하게 됨
최적화 코드를 만들어줌

package.json의 마지막에 값 추가해줌

```json
// package.json
...
  },
  "homepage": "http://hyndrome.github.io/first-react"
}
```

scirpts 추가

- gh-pages를 실행해주는 "deploy" script 추가
- "deploy" script 실행할 경우, 자동으로 해당 커맨드 전 build를 실행시켜주는 "predeploy" script 추가

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "deploy": "gh-pages -d build",
    "predeploy": "npm run build"
  },
```
