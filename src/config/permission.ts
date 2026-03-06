export const hasAccess = (
  roleDoc: any,
  module: string,
  action: "create" | "view" | "update" | "delete"
): boolean => {
  if (!roleDoc?.privileges) return false;
 
  const moduleData = roleDoc.privileges.find(
    (item: any) => item.module === module
  );
 
  return moduleData?.access.includes(action) ?? false;
};