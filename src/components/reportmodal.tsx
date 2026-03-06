import { Modal, Button } from "react-bootstrap";
import { fetchReportByID} from "../axios/report";

interface Props {
  show: boolean;
  patientData: any;
  onClose: () => void;
}

const ReportModal = ({ show, patientData, onClose }: Props) => {

const handleGenerate = async () => {
  try {
    const response = await fetchReportByID(patientData.code);

    const files: string[] = response?.data?.files ?? [];

    if (!files.length) {
      alert("No reports found");
      return;
    }

    files.forEach((fileName) => {
      const fileUrl = `http://localhost:8080/${fileName}`;
      window.open(fileUrl, "_blank");
    });

  } catch (error) {
    console.error(error);
    alert("Failed to generate report");
  }
};

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Generate Report</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong>Patient ID:</strong> {patientData?.code}</p>
        <p><strong>Name:</strong> {patientData?.name}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleGenerate}>
          Generate Report
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportModal;