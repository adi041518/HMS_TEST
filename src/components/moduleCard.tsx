import type { Privilege } from "../types/role";

type Props = {
  privilege: Privilege;
  onEdit: () => void;
  onDelete: () => void;
};

const ModuleCard = ({ privilege, onEdit, onDelete }: Props) => {
  return (
    <div className="module-card">
      <div>
        <strong>{privilege.module}</strong>
        <div className="badge-wrapper">
          {privilege.access.map((action) => (
            <span key={action} className="badge">
              {action}
            </span>
          ))}
        </div>
      </div>

      <div>
        <button onClick={onEdit} className="edit-btn">
          Edit
        </button>
        <button onClick={onDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ModuleCard;
