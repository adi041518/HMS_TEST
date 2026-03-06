import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import health2 from "../assets/health2.png";
import health3 from "../assets/health3.png";
import health4 from "../assets/health4.png";
import healthbackground from "../assets/healthbackground.png";

const Example = () => {
  return (
    <Carousel style={{ height: "100vh" }} controls={false} indicators={false} wrap={true}>
      
      {/* Slide 1 */}
      <Carousel.Item interval={3000}>
        <div
          style={{
            backgroundImage: `url(${healthbackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={health2}
            alt="Slide 1"
            style={{
              width: "70%",
              maxWidth: "900px",
            }}
          />
        </div>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item interval={3000}>
        <div
          style={{
            backgroundImage: `url(${healthbackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={health3}
            alt="Slide 2"
            style={{
              width: "70%",
              maxWidth: "900px",
            }}
          />
        </div>
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item interval={3000}>
        <div
          style={{
            backgroundImage: `url(${healthbackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={health4}
            alt="Slide 3"
            style={{
              width: "70%",
              maxWidth: "900px",
            }}
          />
        </div>
      </Carousel.Item>

    </Carousel>
  );
};

export default Example;
