const express = require("express");
const router = express.Router();
const {
  getPositions,
  getPositionsOfDepartment,
  createPosition,
  updatePosition,
  deletePosition,
  getDepartments,
  getDepartmentsOfFaculty,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getFaculties,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} = require("../Controllers/jobDetailsController");

//Get All positions
router.get("/positions/", getPositions);
//Get positions of department
router.get("/positions-department/:departmentId", getPositionsOfDepartment);
//create position
router.post("/positions/create-position/", createPosition);
//update position
router.put("/positions/update-position/:position_id", updatePosition);
//delete postion
router.put("/positions/delete-position/:position_id", deletePosition);

//Get All departments
router.get("/departments/", getDepartments);
//Get departs of faculty
router.get("/departments-faculty/:facultyId", getDepartmentsOfFaculty);
//create department
router.post("/departments/create-department/", createDepartment);
//update department
router.put("/departments/update-department/:department_id", updateDepartment);
//delete faculty
router.put("/departments/delete-department/:department_id", deleteDepartment);

//Get All faculties
router.get("/faculties/", getFaculties);
//create faculty
router.post("/faculties/create-faculty/", createFaculty);
//update faculty
router.put("/faculties/update-faculty/:faculty_id", updateFaculty);
//delete faculty
router.put("/faculties/delete-faculty/:faculty_id", deleteFaculty);

module.exports = router;
