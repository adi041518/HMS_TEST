import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../axios/authapi';
import { fetchRoleByIdApi } from '../axios/rolesApi';
 
type LoginType = "email" | "phone" | "id";
type status = "idle" | "loading" | "success";
function Login() {
 
    const [status, setStatus] = useState<status>("idle");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
 
    const navigate = useNavigate();
    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
 
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
 
        e.preventDefault();
        setStatus("loading");
        let payload: any = { password };
 
        if (loginType === "email") payload.email = email;
        if (loginType === "phone") payload.phoneNo = phone;
        if (loginType === "id") payload.userId = userId;
 
        try {
 
            console.log("payload:",payload)
            const response = await loginApi(payload);
            console.log("response: ", response)
            if (response.status === 200) {
                await delay(1200);
                setStatus("success");
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("code",response.data.data.code);
                await delay(2000);
            if (response.data.data.reset == true) {
                    navigate("/reset-password");
                } else {
                    const roleCode=response.data.data.roleCode
                    console.log("roleCode: ",roleCode)
                    localStorage.setItem("roleCode",roleCode)
                    const fetchRoleResponse=await fetchRoleByIdApi(roleCode)
                    console.log("FetchRoleResponse: ",fetchRoleResponse)
                    localStorage.setItem("roleName",fetchRoleResponse.data.data.roleName)
                    navigate("/dashboard");
                }
 
 
            }
 
        } catch (error: any) {
            setStatus("idle");
            if (error.response?.status === 401) {
                alert("Invalid credentials");
            }
 
            else if (error.response?.status === 403) {
                navigate("/reset-password");
            }
 
            else {
                alert("Server error");
            }
        }
    };
 
    const [loginType, setLoginType] = useState<LoginType>("email");
 
    return (
 
        <div className="d-flex justify-content-center align-items-center w-100 px-3">
 
 
            <Form
                style={{
                    width: "100%",
 
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                    borderRadius: "16px",
                    padding: "30px",
                    background: "white",
                    maxWidth: "500px",
                    minWidth: "300px"
 
                }}
                onSubmit={handleLogin}
            >
 
                <h3 className="text-center mb-4" style={{ letterSpacing: "1.4px" }}>LOGIN</h3>
 
                <div className="d-flex justify-content-around mb-3">
 
                    <Form.Check
                        type="radio"
                        label="EMAIL"
                        id="email"
                        name="loginType"
                        checked={loginType === "email"}
                        onChange={() => setLoginType("email")}
                    />
 
                    <Form.Check
                        type="radio"
                        label="PHONE"
                        name="loginType"
                        id="phoneNo"
                        checked={loginType === "phone"}
                        onChange={() => setLoginType("phone")}
                    />
 
                    <Form.Check
                        type="radio"
                        label="USER ID"
                        name="loginType"
                        id="userId"
                        checked={loginType === "id"}
                        onChange={() => setLoginType("id")}
                    />
 
                </div>
 
 
                {loginType === "email" && (
                    <FloatingLabel
                        controlId="floatingEmail"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FloatingLabel>
                )}
 
                {loginType === "phone" && (
                    <FloatingLabel
                        controlId="floatingPhone"
                        label="Phone Number"
                        className="mb-3"
                    >
                        <Form.Control
                            type="tel"
                            placeholder="9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </FloatingLabel>
                )}
 
                {loginType === "id" && (
                    <FloatingLabel
                        controlId="floatingId"
                        label="User ID"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Enter user id"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </FloatingLabel>
                )}
 
                <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FloatingLabel>
 
                <div className="d-flex flex-column justify-content-between align-items-center mt-3">
 
                    <Button className="d-flex w-100 justify-content-center mb-3"variant="primary" type='submit'>
                        LOGIN
                    </Button>
 
                    <Link className="d-flex flex-end"to="/forgot-password">
                        Forgot Password ? Don't Worry !
                    </Link>
 
                </div>
 
            </Form>
            {status !== "idle" && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: status === "success" ? "#44b7ec" : "#0F172A",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        color: "white",
                        zIndex: 9999,
                        transition: "all 0.4s ease",
                    }}
                >
                    {status === "loading" && (
                        <>
                            <div
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    border: "6px solid white",
                                    borderTop: "6px solid transparent",
                                    borderRadius: "50%",
                                    animation: "spin 1s linear infinite",
                                }}
                            />
                            <p style={{ marginTop: "20px" }}>Logging in...</p>
                        </>
                    )}
 
                    {status === "success" && (
                        <div className="success-wrapper">
                            <div className="ripple"></div>
 
                            <div className="success-circle">
                                <svg viewBox="0 0 52 52" className="check-svg">
                                    <circle
                                        className="check-circle"
                                        cx="26"
                                        cy="26"
                                        r="25"
                                        fill="none"
                                    />
                                    <path
                                        className="check-path"
                                        fill="none"
                                        d="M14 27l7 7 17-17"
                                    />
                                </svg>
                            </div>
 
                            <div className="particles">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <span key={i}></span>
                                ))}
                            </div>
 
                            <p className="success-text">Login Successful</p>
                        </div>
                    )}
 
                </div>
            )}
 
 
        </div>
    );
}
 
export default Login;
 