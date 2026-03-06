import { type FC } from "react";
import healthhublogo from '../assets/healthhublogo.svg'
const HealthHub360Logo: FC<{ size?: number }> = ({ size = 250 }) => {
  return (
    <img
      src={healthhublogo}
      alt="HealthHub360 Logo"
      style={{
        height: size,
        width: "auto",
        marginTop:"50px"
      }}
    />
  );
};

export default HealthHub360Logo;
