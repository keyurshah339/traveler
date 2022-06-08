import { createContext, useState, useContext } from "react";

const ActionManagementContext = createContext();

export function ActionManagementProvider({ children }) {
  const [action, setAction] = useState({
    isLoading: false,
    showModal: false,
    modalText: "",
    component: "",
  });

  return (
    <ActionManagementContext.Provider value={{ action, setAction }}>
      {children}
    </ActionManagementContext.Provider>
  );
}

export function useActionManager() {
  return useContext(ActionManagementContext);
}
