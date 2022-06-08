import "./Card.css";
import { Link } from "react-router-dom";
export function Card({ video }) {
  return (
    <Link to={`/watch/${video.id}`} className="video-card">
      <img className="card-image" src={video.thumbnail} alt="video-thumbmail" />
      <p className="video-name">{video.videoName}</p>
      <div className="creator-details-outer">
        <img
          className="card-badge"
          src={video.creatorThumbnail}
          alt="creator-thumbnail"
        />
        <p className="creator-name">{video.creatorName}</p>
      </div>
    </Link>
  );
}
