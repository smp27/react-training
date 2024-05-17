
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <div className="column is-half-tablet is-half-desktop is-one-third-widescreen is-one-third-widescreen">
      <div className="listing-card card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={
                props.image ||
                "https://bulma.io/images/placeholders/1280x960.png"
              }
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <Link to={'/article/' + encodeURIComponent(props.title)} state={props}>
              <h6 className="title has-text-link">{props.title}</h6>
            </Link>
            <p>{props.text}</p>
            <br />
            <time>{props.publish_date.slice(0, -3)}</time>
          </div>
        </div>
      </div>
    </div>
  );
}
