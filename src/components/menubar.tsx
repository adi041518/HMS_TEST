import type { MenuItem } from "../config/menubar";
interface MenubarProps<T> {
  menubar: MenuItem<T>[];
  onClick: (key: string, module: T) => void;
  selectedMenu: string;
}

function Menubar<T>({
  menubar,
  onClick,
  selectedMenu,
}: MenubarProps<T>) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        paddingLeft: "20px",
      }}
    >
      {menubar.map((item, index) => {
        const Icon = item.icon;
        const isActive = selectedMenu === item.title;
        const isLast = index === menubar.length - 1;

        return (
          <div key={item.title} style={{ display: "flex", alignItems: "center" }}>
            
            {/* Menu Item */}
            <div
              onClick={() => onClick(item.title, item.module)}
              style={{
                cursor: "pointer",
                padding: "8px 16px",
                backgroundColor: isActive ? "#FF6A00" : "#faba75",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "0.2s ease-in-out",
                marginTop:"15px"
              }}
            >
              {Icon && <Icon size={18} color="#FFFFFF" />}
              <span
                className="poppins-extrabold"
                style={{ color: "#FFFFFF" }}
              >
                {item.title.toUpperCase()}
              </span>
            </div>

            {/* Separator (only if not last) */}
            {!isLast && (
              <div
                style={{
                  height: "40px",
                  width: "1px",
                  backgroundColor: "#ddd",
                  marginLeft: "20px",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Menubar;
