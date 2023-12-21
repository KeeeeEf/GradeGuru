import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CourseList from './CourseList';
import AddCourseModal from './AddCourseModal';
import DeleteSemesterModal from './DeleteSemesterModal';
import axios from 'axios';
import config from '../common/config';

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

const SemesterTab = ({ semesters, onSelectSemester }) => {
  const semesterOrder = ['first', 'second', 'summer'];
  const [sortedSemesters, setSortedSemesters] = React.useState(semesters);
  const [value, setValue] = React.useState(0);
  const [isAddCourseModalOpen, setAddCourseModalOpen] = React.useState(false);
  const [isDeleteSemesterModalOpen, setDeleteSemesterModalOpen] = React.useState(false);
  
  React.useEffect(() => {
    // Sort the semesters based on the custom order
    const sorted = semesters.sort((a, b) =>
      semesterOrder.indexOf(a.semester) - semesterOrder.indexOf(b.semester)
    );
    setSortedSemesters(sorted);
  }, [semesters, semesterOrder]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const openAddCourseModal = () => {
    setAddCourseModalOpen(true);
  };

  const closeAddCourseModal = () => {
    setAddCourseModalOpen(false);
  };

  const openDeleteSemesterModal = () => {
    setDeleteSemesterModalOpen(true);
  };

  const closeDeleteSemesterModal = () => {
    setDeleteSemesterModalOpen(false);
  };

  const handleDeleteSemesterConfirm = async () => {
    try {
      const selectedSemester = sortedSemesters[value];
      const response = await axios.delete(`${config.API}/semesters/deletesemester/${selectedSemester.sem_id}`);
  
      if (response.data.success) {
        const updatedSemesters = sortedSemesters.filter((semester) => semester.sem_id !== selectedSemester.sem_id);
        setSortedSemesters(updatedSemesters);
  
        const uniqueYears = Array.from(new Set(updatedSemesters.map((semester) => semester.year)));
        if (uniqueYears.length === 0) {
          onSelectSemester(null);
        }
      window.location.reload();
      } else {
        console.error('Error deleting semester:', response.data.message);
      }
  
      closeDeleteSemesterModal();
    } catch (err) {
      console.error('Error deleting semester:', err);
      closeDeleteSemesterModal();
    }
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
          <CourseList semesterId={semester.sem_id} onCourseAdded={() => {}} />
          <div className="flex">
            <button onClick={openAddCourseModal} className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mr-2">Add Course</button>
            <button onClick={openDeleteSemesterModal} className="bg-red-500 text-white py-2 px-4 rounded mt-4">Delete Semester</button>
          </div>
        </CustomTabPanel>
      ))}
      <DeleteSemesterModal
        isOpen={isDeleteSemesterModalOpen}
        onClose={closeDeleteSemesterModal}
        onDeleteConfirm={handleDeleteSemesterConfirm}
        semesterName={sortedSemesters[value]?.semester}
      />
      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={closeAddCourseModal}
        semesterId={sortedSemesters[value]?.sem_id}
        onCourseAdded={() => {
        }}
      />
    </Box>
  );
};

export default SemesterTab;
