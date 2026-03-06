import Example from "./carasouel";
import Login from "../components/login";
import HealthHub360Logo from "./healthub360";
const Loginpage = () => {
    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* LEFT SIDE */}
            <div style={{ flex: 1 }}>
                <Example />
            </div>

            {/* RIGHT SIDE */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    // justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <HealthHub360Logo />

                <Login />
                <div style={{ marginTop: "auto", width: "100%" }}>
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "19px",
                            paddingBottom: "25px",
                            color: "#6B7280",
                        }}
                    >
                        © 2021–2025 HealthHub360. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Loginpage;

