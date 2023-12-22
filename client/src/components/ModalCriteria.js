import Modal from 'react-modal'
import Skeleton from 'react-loading-skeleton'

const ModalCriteria = () =>{
 return(
    <Modal
          isOpen={isAddSemesterModalOpen}
          onRequestClose={closeAddSemesterModal}
          contentLabel="Add Semester Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Add Semester</h2>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-600">
              Semester
            </label>
            {isSubmitting ? (
  <Skeleton height={40} width={"100%"} baseColor='#bcbcbc' />
) : (
  <select
            value={semesterName}
            onChange={(e) => setSemesterName(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          >
            <option value="" disabled selected>
                Select Semester
              </option>
            <option value="first">First Semester</option>
            <option value="second">Second Semester</option>
            <option value="summer">Summer</option>
          </select>
)}
            
          <label htmlFor="year" className="block text-sm font-medium text-gray-600">
              Year
            </label>
            {isSubmitting ? (
            <Skeleton className="mb-4" height={40} width={"100%"} baseColor='#bcbcbc' />
) : (
  <input
              type="text"
              placeholder="Enter Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border rounded p-2 mb-4 w-full"
            />
)}
            
            <button
              onClick={handleAddSemester}
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={closeAddSemesterModal}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </Modal>
 )
}   

export default ModalCriteria