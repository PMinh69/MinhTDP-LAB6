import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Navbar, Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { getSubjectsById, updateSubject, deleteSubject } from "../api/api";

function SyllabusDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [semester, setSemester] = useState("");
  const [credits, setCredits] = useState("");
  const [preRequisites, setPreRequisites] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getSubjectsById(id)
      .then((data) => {
        setSubject(data);
        setCode(data.code || "");
        setName(data.name || "");
        setCurriculum(data.curriculum || "");
        setSemester(data.semester ?? "");
        setCredits(data.credits ?? "");
        setPreRequisites((data.preRequisites || []).join(", "));
        setDescription(data.description || "");
      })
      .catch(() => setError("Không tìm thấy môn học."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    const updated = {
      code,
      name,
      curriculum,
      semester: Number(semester),
      credits: Number(credits),
      preRequisites: preRequisites
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      description,
    };

    updateSubject(id, updated)
      .then((data) => {
        setSubject(data);
        setIsEditing(false);
      })
      .catch(() => setError("Không thể cập nhật môn học."));
  };

  const handleDelete = () => {
    if (!window.confirm("Bạn có chắc muốn xóa môn học này?")) return;

    deleteSubject(id)
      .then(() => navigate("/syllabus"))
      .catch(() => setError("Không thể xóa môn học."));
  };

  return (
    <Container className="py-4">
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        className="mb-4 px-3 rounded d-flex justify-content-between align-items-center"
      >
        <h4 style={{ color: "whitesmoke", margin: 0 }}>Syllabus Detail</h4>
        <Button variant="info" onClick={() => navigate("/syllabus")}>
          ← Back to syllabus
        </Button>
      </Navbar>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : !subject ? (
        <p>Không tìm thấy môn học.</p>
      ) : (
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title className="mb-4">Syllabus Information</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                      value={code}
                      disabled={!isEditing}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      value={name}
                      disabled={!isEditing}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Curriculum</Form.Label>
                    <Form.Control
                      value={curriculum}
                      disabled={!isEditing}
                      onChange={(e) => setCurriculum(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Semester</Form.Label>
                    <Form.Control
                      type="number"
                      value={semester}
                      disabled={!isEditing}
                      onChange={(e) => setSemester(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Credits</Form.Label>
                    <Form.Control
                      type="number"
                      value={credits}
                      disabled={!isEditing}
                      onChange={(e) => setCredits(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Pre-requisites</Form.Label>
                    <Form.Control
                      value={preRequisites}
                      disabled={!isEditing}
                      placeholder="e.g. PRF192, PRO191"
                      onChange={(e) => setPreRequisites(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={description}
                      disabled={!isEditing}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                </Form>

                <div className="d-flex justify-content-between">
                  <Button variant="primary" onClick={handleEditClick}>
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default SyllabusDetail;
