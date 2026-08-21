import { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAccount } from "../api/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    getAccount()
      .then((accounts) => {
        const account = accounts.find(
          (a) => a.email === email && a.password === password
        );

        if (!account) {
          setError("Email hoặc mật khẩu không đúng.");
          return;
        }

        if (account.status === "Inactive") {
          setError("Tài khoản đã bị khóa");
          return;
        }

        window.localStorage.setItem("session", JSON.stringify(account));
        navigate("/syllabus");
      })
      .catch(() => setError("Không thể kết nối đến máy chủ."));
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "500px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Sign in</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" variant="primary">
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
