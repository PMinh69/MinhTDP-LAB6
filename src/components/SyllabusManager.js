import { useEffect, useMemo, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Alert,
  Table,
  Nav,
  Navbar,
} from "react-bootstrap";
import { getSubjects } from "../api/api";
import { useNavigate } from "react-router-dom";

function SyllabusManager() {

  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");
  const [account, setAccount] = useState(null);

  const [search, setSearch] = useState("");
  const [codeFilter, setCodeFilter] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem("session");
    if (!raw) {
      navigate("/login");
      return;
    }
    setAccount(JSON.parse(raw));
  }, [navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem("session");
    navigate("/login");
  };

  const loadSubjects = () => {
    getSubjects()
      .then((data) => setSubjects(data))
      .catch(() => setError("Không thể tải danh sách khóa học."));
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const codes = useMemo(
    () => [...new Set(subjects.map((s) => s.code))],
    [subjects],
  );

  const filteredSubjects = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return subjects.filter((s) => {
      const matchesKeyword =
        !keyword ||
        s.code?.toLowerCase().includes(keyword) ||
        s.name?.toLowerCase().includes(keyword);
      const matchesCode = !codeFilter || s.code === codeFilter;
      return matchesKeyword && matchesCode;
    });
  }, [subjects, search, codeFilter]);

  return (
    <Container className="py-4">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <h4 style={{ color: "whitesmoke" }}>
              FPT Education Learning Material Portal
            </h4>
          </Nav>
          <Nav className="align-items-center gap-3">
            {account && (
              <span style={{ color: "whitesmoke" }}>
                Hello {account.fullName} ({account.role})
              </span>
            )}
            <Button onClick={handleLogout} variant="primary">
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <h2 className="mb-3">My Courses</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-3 g-2 align-items-end">
        <Col>
          <strong>Search by:</strong>
        </Col>
        <Col md={4}>
          <Form.Select
            value={codeFilter}
            onChange={(e) => setCodeFilter(e.target.value)}
          >
            <option value="">Code</option>
            {codes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={5}>
          <Form.Control
            placeholder="Enter keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col>
          {" "}
          <Button
            variant="info"
            onClick={() => {
              setSearch("");
            }}
          >
            Refresh
          </Button>
        </Col>
      </Row>

      {filteredSubjects.length === 0 && (
        <div className="text-center text-muted py-4">
          Không có khóa học nào.
        </div>
      )}

      <Row>
          <Col className="mb-3">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Curriculum</th>
                  <th>Semester</th>
                  <th>Credits</th>
                  <th>Pre-requistites</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.map((subject) => (
                  <tr key={subject.id}>
                    <td onClick={() => navigate(`/subject/${subject.id}`)}>{subject.code}</td>
                    <td>{subject.name}</td>
                    <td>{subject.curriculum}</td>
                    <td>{subject.semester}</td>
                    <td>{subject.credits}</td>
                    <td>{subject.preRequisites?.join(", ")}</td>
                    <td>{subject.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
      </Row>
    </Container>
  );
}

export default SyllabusManager;
