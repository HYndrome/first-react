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
