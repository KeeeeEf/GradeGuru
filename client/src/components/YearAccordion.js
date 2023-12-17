import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SemesterTab from './SemesterTab';

const YearAccordion = ({ year, semesters, coursesData }) => {
  const [selectedSemester, setSelectedSemester] = useState(null);

  const handleSelectSemester = (semesterId) => {
    setSelectedSemester(semesterId);
  };

  return (
    <Accordion className="w-2/3 m-4">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Year {year}-{year + 1}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SemesterTab
          semesters={semesters}
          selectedSemester={selectedSemester}
          onSelectSemester={handleSelectSemester}
          coursesData={coursesData}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default YearAccordion;
