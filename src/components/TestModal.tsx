import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

/* ================= TYPES ================= */

export interface TestValues {
  code?: string;
  testname: string;
  price: string; // ✅ price is string
}

interface Props {
  show: boolean;
  mode: "create" | "edit" | "view";
  onClose: () => void;
  onSubmit: (data: TestValues) => Promise<void>;
  initialData?: TestValues;
  loading?: boolean;
}

/* ================= COMPONENT ================= */

const TestModal: React.FC<Props> = ({
  show,
  mode,
  onClose,
  onSubmit,
  initialData,
  loading,
}) => {
  const isView = mode === "view";

  const initialValues: TestValues = {
    code: initialData?.code ?? "",
    testname: initialData?.testname ?? "",
    price: initialData?.price ?? "",
  };

  /* ================= VALIDATION ================= */

  const validationSchema = Yup.object({
    testname: Yup.string().required("Test Name is required"),

    price: Yup.string()
      .required("Price is required")
      .matches(/^\d+(\.\d{1,2})?$/, "Enter valid price (max 2 decimals)")
      .test("not-negative", "Price cannot be negative", (value) => {
        if (!value) return false;
        return Number(value) >= 0;
      }),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Modal show={show} onHide={onClose} centered backdrop="static">
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                {mode === "create"
                  ? "Create Test"
                  : mode === "edit"
                  ? "Edit Test"
                  : "View Test"}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>

              {/* Test Name */}
              <Form.Group className="mb-3">
                <Form.Label>Test Name</Form.Label>
                <Form.Control
                  name="testname"
                  value={values.testname}
                  onChange={handleChange}
                  disabled={isView}
                  isInvalid={!!errors.testname && touched.testname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.testname}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Test Price */}
              <Form.Group className="mb-3">
                <Form.Label>Test Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  disabled={isView}
                  isInvalid={!!errors.price && touched.price}
                  placeholder="Enter price"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>

            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>

              {!isView && (
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              )}
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default TestModal;