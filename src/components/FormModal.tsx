import { useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { type RootState } from "../store/storeFile";

interface FormValues {
  roleCode: string;
  name: string;
  email: string;
  phoneNo: string;
  dob: string;
  address: string;
  department?: string;
}

const Department = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "General Medicine",
];

interface Props {
  show: boolean;
  module: string;
  mode: "create" | "edit" | "view";
  onClose: () => void;
  onSubmit: (data: Partial<FormValues>) => void;
  initialData?: FormValues;
  loading?: boolean;
}

const ModuleFormModal: React.FC<Props> = ({
  show,
  module,
  mode,
  onClose,
  onSubmit,
  initialData,
  loading,
}) => {
  const isViewMode = mode === "view";

  const roles = useSelector((state: RootState) => state.role.roles);

 
  const roleCodeFromModule = useMemo(() => {
    console.log("ROles are: ",roles)
    return (
      roles.find(
        (r) => r.roleName.toLowerCase() === module.toLowerCase()
      )?.roleCode || ""
    );
  }, [roles, module]);

  const initialValues: FormValues = useMemo(
    () => ({
      roleCode: initialData?.roleCode || roleCodeFromModule,
      name: initialData?.name || "",
      email: initialData?.email || "",
      phoneNo: initialData?.phoneNo || "",
      dob: initialData?.dob || "",
      address: initialData?.address || "",
      department: initialData?.department || "",
    }),
    [initialData, roleCodeFromModule]
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    phoneNo: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
    dob: Yup.string().required("Date of birth is required"),
    address:
      module !== "doctor"
        ? Yup.string().required("Address is required")
        : Yup.string(),
    department:
      module === "doctor"
        ? Yup.string().required("Specialization is required")
        : Yup.string(),
  });

  const getTitle = () => {
    const action =
      mode === "create"
        ? "CREATE"
        : mode === "edit"
        ? "EDIT"
        : "VIEW";

    return `${action} ${module.toUpperCase()}`;
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{getTitle()}</Modal.Title>
      </Modal.Header>

      <Formik<FormValues>
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (mode === "edit") {
            const changed: Partial<FormValues> = {};

            (Object.keys(values) as (keyof FormValues)[]).forEach(
              (key) => {
                if (initialData?.[key] !== values[key]) {
                  changed[key] = values[key];
                }
              }
            );

            if (Object.keys(changed).length === 0) return;

            onSubmit(changed);
          } else {
            onSubmit(values);
          }

          onClose();
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>

              {/* Role Code */}
              <Form.Group className="mb-3">
                <Form.Label>Role Code</Form.Label>
                <Form.Control
                  name="roleCode"
                  value={values.roleCode}
                  disabled
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      disabled={isViewMode}
                      isInvalid={!!errors.name && touched.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      disabled={isViewMode}
                      isInvalid={!!errors.email && touched.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      name="phoneNo"
                      value={values.phoneNo}
                      onChange={handleChange}
                      disabled={isViewMode}
                      isInvalid={!!errors.phoneNo && touched.phoneNo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phoneNo}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={values.dob}
                      onChange={handleChange}
                      disabled={isViewMode}
                      isInvalid={!!errors.dob && touched.dob}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dob}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {module === "doctor" ? (
                <Form.Group className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Select
                    name="department"
                    value={values.department}
                    onChange={handleChange}
                    disabled={isViewMode}
                    isInvalid={!!errors.department && touched.department}
                  >
                    <option value="">Select Specialization</option>
                    {Department.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.department}
                  </Form.Control.Feedback>
                </Form.Group>
              ) : (
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    disabled={isViewMode}
                    isInvalid={!!errors.address && touched.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
              )}
            </Modal.Body>

            {!isViewMode && (
              <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>

                <Button type="submit" disabled={loading}>
                  {loading
                    ? "Please wait..."
                    : mode === "edit"
                    ? "Update"
                    : "Create"}
                </Button>
              </Modal.Footer>
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModuleFormModal;