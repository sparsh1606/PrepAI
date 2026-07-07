import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const data = {
    report,
    setReport,
    reports,
    setReports,
    loading,
    setLoading,
  };

  return (
    <InterviewContext.Provider value={data}>
      {children}
    </InterviewContext.Provider>
  );
};
