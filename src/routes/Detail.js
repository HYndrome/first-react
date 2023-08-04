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
