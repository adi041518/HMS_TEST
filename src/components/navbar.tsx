import { Navbar, Container, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import HealthHubLogo from "./healthhub360logo";
import { AiFillHome } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";

const NavbarComponent = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roleName");
        localStorage.removeItem("roleCode")
        navigate("/login");
    };


    const renderHomeTooltip = (props: any, title: string) => (
        <Tooltip id={`${title}-tooltip`} {...props}>
            {title}
        </Tooltip>
    );

    return (
        <Navbar bg="light" expand="lg" fixed="top" sticky="top"className="shadow-sm">
            <Container fluid className="d-flex justify-content-between align-items-center">


                <div className="d-flex align-items-center">

                    <Navbar.Brand as={Link} to="/dashboard" className="me-3">
                        <HealthHubLogo size={50} />
                    </Navbar.Brand>


                    <div
                        style={{
                            height: "40px",
                            width: "1px",
                            backgroundColor: "#ccc",
                            marginRight: "20px",
                        }}
                    />

                    {/* Home Icon */}
                    <Nav>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 100, hide: 100 }}
                            overlay={(props) => { return renderHomeTooltip(props, "Home") }}
                        >
                            <Nav.Link as={Link} to="/dashboard" style={{ fontSize: "26px" }}>
                                <AiFillHome />
                            </Nav.Link>
                        </OverlayTrigger>
                    </Nav>
                </div>


                <Nav>
                    <OverlayTrigger
                        placement="left"
                        delay={{ show: 200, hide: 200 }}
                        overlay={(props) => { return renderHomeTooltip(props, "Logout") }}
                    >
                        <Nav.Link onClick={handleLogout} style={{ fontSize: "26px", color: "#dc3545" }}>
                            <IoIosLogOut />
                        </Nav.Link>
                    </OverlayTrigger>
                </Nav>

            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
