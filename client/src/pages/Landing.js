import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <main>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              Job<span> Tracking </span>App
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              explicabo, odit neque inventore, ullam ea, possimus aliquam harum
              veritatis sed officiis laboriosam.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          {/* image  */}
          <img src={main} alt="MAIN" className="img main-img" />
        </div>
      </main>
    </Wrapper>
  );
};

export default Landing;
