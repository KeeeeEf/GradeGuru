import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CourseList from './CourseList';
import AddCourseModal from './AddCourseModal';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export default function SemesterTab({ semesters, selectedSemester, onSelectSemester, coursesData }) {
  // Define the custom order for semesters
  const semesterOrder = ['first', 'second', 'summer'];

  // Sort the semesters based on the custom order
  const sortedSemesters = semesters.sort((a, b) =>
    semesterOrder.indexOf(a.semester) - semesterOrder.indexOf(b.semester)
  );

  const [value, setValue] = React.useState(0);
  const [isAddCourseModalOpen, setAddCourseModalOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const openAddCourseModal = () => {
    setAddCourseModalOpen(true);
  };

  const closeAddCourseModal = () => {
    setAddCourseModalOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="semester tabs">
        {sortedSemesters.map((semester, index) => (
          <Tab
            key={index}
            label={
              semester.semester === 'summer'
                ? 'Summer'
                : `${semester.semester.charAt(0).toUpperCase()}${semester.semester.slice(1)} Sem`
            }
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {sortedSemesters.map((semester, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          <CourseList semesterId={semester.sem_id} />
          <button onClick={openAddCourseModal}>Add Course</button>
        </CustomTabPanel>
      ))}
      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={closeAddCourseModal}
        semesterId={sortedSemesters[value].sem_id} // Pass the selected semester ID
      />
    </Box>
  );
}
