import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { fetchAllTests } from "../axios/tests";
import PrescriptionModal from "./prescriptionModal";
import { CreateTestReport } from "../axios/testReport";
import { fetchPrescriptionById } from "../axios/prescription";

/* ================= TYPES ================= */

interface TestMaster {
  code: string;
  testname: string;
}

interface Vitals {
  bp: string;
  pulseRate: string;
  height: string;
  weight: string;
  temperature: string;
}

export interface MedicalRecordValues {
  code: string;
  patientId: string;
  doctorId: string;
  reason: string;
  testList: string[];
  vitals: Vitals;
  testReports: string[];
  prescriptionId?: string;
}

interface Props {
  show: boolean;
  mode: "create" | "edit" | "view";
  onClose: () => void;
  onSubmit: (data: MedicalRecordValues) => Promise<void>;
  initialData?: MedicalRecordValues;
  loading?: boolean;
  module?: string;
}

const MedicalRecordModal: React.FC<Props> = ({
  show,
  mode,
  onClose,
  onSubmit,
  initialData,
  loading,
  module,
}) => {

  const isView = mode === "view";

  const [prescriptionMode, setPrescriptionMode] = useState<
    "create" | "edit" | "view"
  >("create");

  const disableReports = isView || module !== "NURSE" || mode === "create";
  const disableVitals = isView || module !== "NURSE";
  const disableTests = isView || module !== "DOCTOR";
  const disablePrescription = isView || module !== "DOCTOR";

  const [testOptions, setTestOptions] = useState<TestMaster[]>([]);
  const [prescriptionData, setPrescriptionData] = useState<any>(null);
  const [showPrescription, setShowPrescription] = useState(false);

  /* ================= FETCH TEST MASTER ================= */

  useEffect(() => {
    const loadTests = async () => {
      try {
        const res = await fetchAllTests();
        setTestOptions(res?.data?.data || []);
      } catch (err) {
        console.error("Error fetching tests", err);
      }
    };
    loadTests();
  }, []);

  /* ================= INITIAL VALUES ================= */

  const initialValues: MedicalRecordValues = {
    code: initialData?.code ?? "",
    patientId: initialData?.patientId ?? "",
    doctorId: initialData?.doctorId ?? "",
    reason: initialData?.reason ?? "",
    testList: initialData?.testList ?? [],
    testReports: initialData?.testReports ?? [],
    prescriptionId: initialData?.prescriptionId ?? "",
    vitals: initialData?.vitals ?? {
      bp: "",
      pulseRate: "",
      height: "",
      weight: "",
      temperature: "",
    },
  };

  const validationSchema = Yup.object({
    reason: Yup.string().required("Reason is required"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, setFieldValue }) => (
        <>
          <Modal show={show} onHide={onClose} size="xl" centered backdrop="static">
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Medical Record - {values.code || "New"}
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>

                {/* ================= CHIEF COMPLAINT ================= */}
                <Card className="mb-4">
                  <Card.Header>Chief Complaint</Card.Header>
                  <Card.Body>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="reason"
                      value={values.reason}
                      onChange={handleChange}
                      disabled={isView}
                    />
                  </Card.Body>
                </Card>

                {/* ================= VITALS ================= */}
                <Card className="mb-4">
                  <Card.Header>Vitals</Card.Header>
                  <Card.Body>
                    <Row>
                      {["bp","pulseRate","temperature","weight","height"].map((field) => (
                        <Col md={3} key={field}>
                          <Form.Label>{field.toUpperCase()}</Form.Label>
                          <Form.Control
                            name={`vitals.${field}`}
                            value={values.vitals[field as keyof Vitals]}
                            onChange={handleChange}
                            disabled={disableVitals}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>

                {/* ================= LAB TESTS ================= */}
                <Card className="mb-4">
                  <Card.Header>Lab Tests</Card.Header>
                  <Card.Body>
                    <FieldArray name="testList">
                      {({ push, remove }) => (
                        <>
                          {!disableTests && (
                            <Button
                              size="sm"
                              className="mb-3"
                              type="button"
                              onClick={() => push("")}
                            >
                              + Add Test
                            </Button>
                          )}

                          {values.testList.map((testCode, index) => (
                            <Row key={index} className="mb-2">
                              <Col md={10}>
                                <Form.Select
                                  name={`testList.${index}`}
                                  value={testCode}
                                  onChange={handleChange}
                                  disabled={disableTests}
                                >
                                  <option value="">Select Test</option>
                                  {testOptions.map((t) => (
                                    <option key={t.code} value={t.code}>
                                      {t.testname}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Col>

                              {!disableTests && (
                                <Col md={2}>
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              )}
                            </Row>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </Card.Body>
                </Card>

                {/* ================= TEST REPORTS ================= */}
                <Card className="mb-4">
                  <Card.Header>Test Reports</Card.Header>
                  <Card.Body>

                    {values.testReports.length > 0 ? (
                      values.testReports.map((code, index) => (
                        <Row key={index} className="mb-2">
                          <Col md={12}>
                            <Form.Control value={code} disabled />
                          </Col>
                        </Row>
                      ))
                    ) : (
                      <p className="text-muted">No Test Reports Available</p>
                    )}

                    {!disableReports && values.testReports.length === 0 && (
                      <Button
                        size="sm"
                        type="button"
                        onClick={async () => {
                          const created = await CreateTestReport({
                            patientId: values.patientId,
                          });

                          const newId = created?.data?.data?._id;

                          if (newId) {
                            setFieldValue("testReports", [
                              ...values.testReports,
                              newId,
                            ]);
                          }
                        }}
                      >
                        + Add Test Report
                      </Button>
                    )}

                  </Card.Body>
                </Card>

                {/* ================= PRESCRIPTION ================= */}
                <Card className="mb-4">
                  <Card.Header>Prescription</Card.Header>
                  <Card.Body>

                    {values.prescriptionId ? (
                      <>
                        <p className="mb-3">
                          Prescription ID: <strong>{values.prescriptionId}</strong>
                        </p>

                        <Button
                          size="sm"
                          variant="info"
                          className="me-2"
                          type="button"
                          onClick={async () => {
                            const res = await fetchPrescriptionById(values.prescriptionId!);
                            setPrescriptionData(res?.data?.data);
                            setPrescriptionMode("view");
                            setShowPrescription(true);
                          }}
                        >
                          View
                        </Button>

                        {!disablePrescription && (
                          <Button
                            size="sm"
                            variant="primary"
                            type="button"
                            onClick={async () => {
                              const res = await fetchPrescriptionById(values.prescriptionId!);
                              setPrescriptionData(res?.data?.data);
                              setPrescriptionMode("edit");
                              setShowPrescription(true);
                            }}
                          >
                            Edit
                          </Button>
                        )}
                      </>
                    ) : (
                      !disablePrescription && (
                        <Button
                          size="sm"
                          type="button"
                          onClick={() => {
                            setPrescriptionData(null);
                            setPrescriptionMode("create");
                            setShowPrescription(true);
                          }}
                        >
                          + Add Prescription
                        </Button>
                      )
                    )}

                  </Card.Body>
                </Card>

              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>

                {!isView && (
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Record"}
                  </Button>
                )}
              </Modal.Footer>
            </Form>
          </Modal>

          <PrescriptionModal
            show={showPrescription}
            mode={prescriptionMode}
            initialData={prescriptionData}
            onClose={() => setShowPrescription(false)}
            medicalRecordId={values.code}
            onSubmit={(data: any) => {
              const prescriptionId = data?._id || data?.id;
              if (prescriptionId) {
                setFieldValue("prescriptionId", prescriptionId);
              }
              setShowPrescription(false);
            }}
          />
        </>
      )}
    </Formik>
  );
};

export default MedicalRecordModal;