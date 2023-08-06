import React, { useContext, useState } from "react";

const Appcontext = React.createContext();

const AppProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [formInfo, setFormInfo] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Appcontext.Provider
      value={{
        showModal,
        setShowModal,
        formInfo,
        setFormInfo,
        showEmail,
        setShowEmail,
        showPassword,
        setShowPassword,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Appcontext);
};
export { Appcontext, AppProvider };
