import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { fetchAllMedicines } from "../axios/medicines";
import {
  CreatePrescription,
 
} from "../axios/receptionist";

/* ================= TYPES ================= */

interface Frequency {
  morning: boolean;
  afternoon: boolean;
  night: boolean;
}

interface MedicineItem {
  medicineId: string;
  dosagePerFrequency: string;
  frequency: Frequency;
  noOfDays: string;
  instructions: string;
}

export interface PrescriptionValues {
  _id?: string;
  diagnosis: string;
  medicines: MedicineItem[];
}

interface Props {
  show: boolean;
  mode: "create" | "edit" | "view";
  onClose: () => void;
  onSubmit: (data: any) => Promise<void> | void;
  initialData?: PrescriptionValues;
  loading?: boolean;
  medicalRecordId: string;
}

const PrescriptionModal: React.FC<Props> = ({
  show,
  mode,
  onClose,
  onSubmit,
  initialData,
  loading,
  medicalRecordId,
}) => {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isCreate = mode === "create";

  const [medicineOptions, setMedicineOptions] = useState<any[]>([]);

  /* ================= FETCH MEDICINES ================= */

  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const res = await fetchAllMedicines();
        setMedicineOptions(res?.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch medicines:", err);
      }
    };
    loadMedicines();
  }, []);

  const initialValues: PrescriptionValues = {
    diagnosis: initialData?.diagnosis ?? "",
    medicines:
      initialData?.medicines ?? [
        {
          medicineId: "",
          dosagePerFrequency: "",
          frequency: {
            morning: false,
            afternoon: false,
            night: false,
          },
          noOfDays: "",
          instructions: "",
        },
      ],
  };

  const validationSchema = Yup.object({
    diagnosis: Yup.string().required("Diagnosis is required"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let response;

          if (isEdit && initialData?._id) {
            // response = await UpdatePrescription(
            //   initialData._id,
            //   values
            // );
          } else if (isCreate) {
            response = await CreatePrescription(
              medicalRecordId,
              values
            );
          }

          const savedData = response?.data?.data;

          if (savedData) {
            await onSubmit(savedData);
          }

          onClose();
        } catch (err) {
          console.error("Error saving prescription:", err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, handleChange, values, setFieldValue }) => (
        <Modal show={show} onHide={onClose} size="lg" centered backdrop="static">
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                {isView
                  ? "View Prescription"
                  : isEdit
                  ? "Edit Prescription"
                  : "Create Prescription"}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>

              {/* ================= DIAGNOSIS ================= */}
              <Card className="mb-4">
                <Card.Header>Diagnosis</Card.Header>
                <Card.Body>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="diagnosis"
                    value={values.diagnosis}
                    onChange={handleChange}
                    disabled={isView}
                  />
                </Card.Body>
              </Card>

              {/* ================= MEDICINES ================= */}
              <Card>
                <Card.Header>Medicines</Card.Header>
                <Card.Body>
                  <FieldArray name="medicines">
                    {({ push, remove }) => (
                      <>
                        {!isView && (
                          <Button
                            size="sm"
                            className="mb-3"
                            type="button"
                            onClick={() =>
                              push({
                                medicineId: "",
                                dosagePerFrequency: "",
                                frequency: {
                                  morning: false,
                                  afternoon: false,
                                  night: false,
                                },
                                noOfDays: "",
                                instructions: "",
                              })
                            }
                          >
                            + Add Medicine
                          </Button>
                        )}

                        {values.medicines.map((med, index) => (
                          <Card key={index} className="mb-3 p-3 border">
                            <Row className="mb-2">
                              <Col md={6}>
                                <Form.Label>Medicine</Form.Label>
                                <Form.Select
                                  name={`medicines.${index}.medicineId`}
                                  value={med.medicineId}
                                  onChange={handleChange}
                                  disabled={isView}
                                >
                                  <option value="">Select Medicine</option>
                                  {medicineOptions.map((m) => (
                                    <option key={m.code} value={m.code}>
                                      {m.name}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Col>

                              <Col md={6}>
                                <Form.Label>Dosage Per Time</Form.Label>
                                <Form.Control
                                  name={`medicines.${index}.dosagePerFrequency`}
                                  value={med.dosagePerFrequency}
                                  onChange={handleChange}
                                  disabled={isView}
                                />
                              </Col>
                            </Row>

                            <Row className="mb-2">
                              {["morning","afternoon","night"].map((time) => (
                                <Col md={3} key={time}>
                                  <Form.Check
                                    type="checkbox"
                                    label={time.toUpperCase()}
                                    checked={med.frequency[time as keyof Frequency]}
                                    disabled={isView}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `medicines.${index}.frequency.${time}`,
                                        e.target.checked
                                      )
                                    }
                                  />
                                </Col>
                              ))}
                            </Row>

                            <Row className="mb-2">
                              <Col md={6}>
                                <Form.Label>No. of Days</Form.Label>
                                <Form.Control
                                  name={`medicines.${index}.noOfDays`}
                                  value={med.noOfDays}
                                  onChange={handleChange}
                                  disabled={isView}
                                />
                              </Col>

                              <Col md={6}>
                                <Form.Label>Instructions</Form.Label>
                                <Form.Control
                                  name={`medicines.${index}.instructions`}
                                  value={med.instructions}
                                  onChange={handleChange}
                                  disabled={isView}
                                />
                              </Col>
                            </Row>

                            {!isView && (
                              <div className="text-end">
                                <Button
                                  size="sm"
                                  variant="danger"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            )}
                          </Card>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </Card.Body>
              </Card>

            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>

              {!isView && (
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Prescription"}
                </Button>
              )}
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default PrescriptionModal;