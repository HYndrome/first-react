영화 정보 api
[yts api](https://yts.mx/api)
https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year

```js
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovie = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year"
    );
    const json = await response.json();
    // 아래 같이 한줄로 작성해도 됨
    // const json = await (
    //   await fetch(
    //     "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year"
    //   )
    // ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.title}</h2>
              <img src={movie.medium_cover_image}></img>
              <p>{movie.summary}</p>
              <ul>
                {/* hasOwnProperty를 사용하여 movie 내에 genres 프로퍼티가 있는지 없는지 확인할 수 있음 */}
                {movie.hasOwnProperty("genres")
                  ? movie.genres.map((genre) => <li key={genre}>{genre}</li>)
                  : null}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
```

## 컴포넌트 분리하기

Movie.js 파일 따로 생성

```js
// Movie.js
function Movie({ title, coverImg, summary, genres }) {
  return (
    <div>
      <h2>{title}</h2>
      <img src={coverImg} alt={title}></img>
      <p>{summary}</p>
      <ul>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}

export default Movie;
```

App.js에서 Movie 컴포넌트 사용

```js
// App.js
import { useEffect, useState } from "react";
import Movie from "./Movie";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovie = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year"
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              title={movie.title}
              coverImg={movie.medium_cover_image}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
```

## PropTypes 적용

```js
// Movie.js
import PropTypes from "prop-types";

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  summary: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
};
```

# React Router

강의에서 `5.3.0` 버전을 사용함

```js
npm i react-router-dom@5.3.0
```

이제 스크린(Router) 단위로 생각해야함!
이제 App.js는 route를 받아서 스크린을 불러옴
스크린(routes) 단위로 파일 생성

src 경로 안의 파일을 정리해주자

- 파일 경로 새로 생성
  - components/Movie.js (경로를 옮겼기 때문에 import의 경로 수정)
  - routes/Home.js
  - routes/Detail.js

기존 App.js에 있던 내용을 Home.js로 옮겨줌

```js
// Home.js
import { useEffect, useState } from "react";
import Movie from "./components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovie = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year"
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              title={movie.title}
              coverImg={movie.medium_cover_image}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
```

app에서 router 적용

```js
// App.js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Movie from "./routes/Detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie">
          <Movie />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
```

- "/movie" router가 "/" router 아래에 있으면 "/movie" 주소를 입력해도 "/" router가 먼저 렌더링
- Switch 태그는 route를 한 번에 하나만 rendering할 때 사용

## 영화 제목을 눌렀을 떄 detail 페이지 이동하기

1. <a> 태그 사용하기
   사용 가능, 다만 해당 페이지로 이동했을 경우 전체 페이지가 다시 rendering

```js
<h2>
  <a href="/movie">{title}</a>
</h2>
```

2. <Link> 사용하기
   Link는 브라우저 새로고침 없이 다른 페이지로 이동시켜주는 컴포넌트

```js
// Movie.js
import { Link } from "react-router-dom";

<h2>
  <Link to="/movie">{title}</Link>
</h2>;
```

## dynamic url

변화하는 주소를 받을 수 있음
변화하는 부분에 ":"를 사용

```js
// App.js
<Route path="/movie/:id">
  <Movie />
</Route>
```

id 값을 사용하기 위해서 props에 id 전달

```js
// Home.js
{
  movies.map((movie) => (
    <Movie
      key={movie.id}
      id={movie.id}
      title={movie.title}
      coverImg={movie.medium_cover_image}
      summary={movie.summary}
      genres={movie.genres}
    />
  ));
}
```

전달 받은 prop 값 Link에 적용

```js
// Movie.js
function Movie({ title, id, coverImg, summary, genres }) {
  return (
    <div>
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <img src={coverImg} alt={title}></img>
      <p>{summary}</p>
      <ul>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}
```

## useParams

url에 있는 값을 반환해주는 함수

```js
// Detail.js
import { useParams } from "react-router-dom";

function Detail() {
  const x = useParams();
  console.log(x);
  // {id: '53703'}
  // id: "53703"
  // [[Prototype]]: Object
  return <h1>Detail</h1>;
}

export default Detail;
```

api까지 받아오기

```js
// Detail.js
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Detail() {
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    // console.log(json);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return <h1>Detail</h1>;
}

export default Detail;
```

# 최종

```js
// App.js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Movie from "./routes/Detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie/:id">
          <Movie />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
```

```js
// Detail.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetail from "../components/MovieDetail";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState("");
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    // console.log(json);
    setLoading(false);
    setMovie(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <h1>Detail</h1>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <MovieDetail
          date_uploaded={movie.date_uploaded}
          download_count={movie.download_count}
          genres={movie.genres}
          language={movie.language}
          like_count={movie.like_count}
          large_cover_image={movie.large_cover_image}
          rating={movie.rating}
          runtime={movie.runtime}
          title={movie.title}
          torrents={movie.torrents}
          year={movie.year}
          description={movie.description_full}
        />
      )}
    </div>
  );
}

export default Detail;
```

```js
// MovieDetail.js
import PropTypes from "prop-types";

function MovieDetail({
  date_uploaded,
  download_count,
  genres,
  language,
  like_count,
  large_cover_image,
  rating,
  runtime,
  title,
  year,
  description,
  torrents,
}) {
  return (
    <div>
      <h2>{title}</h2>
      <img src={large_cover_image} alt={title}></img>
      <p>Release: {year}</p>
      <p>Language: {language}</p>
      <p>Runtime: {runtime}</p>
      <p>Rating: {rating}</p>
      <p>Like Count: {like_count}</p>
      <p>Genre</p>
      <ul>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
      <p>{description}</p>
      <hr />
      <h3>Download info</h3>
      <p>File Uploaded: {date_uploaded}</p>
      <p>Download Count: {download_count}</p>
      <ul>
        {torrents.map((torrent, i) => (
          <li key={torrent.hash}>
            <a href={torrent.url}>다운로드 링크 {i + 1}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetail;
```
