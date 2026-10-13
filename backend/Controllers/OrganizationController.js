const { query } = require("../util/pg_dbConnection");

//get Positions
const getPositions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "positionDetails"`;

    const getDetailsQuery = `SELECT * FROM "positionDetails" LIMIT $1 OFFSET $2 `;

    //Get device count
    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    const totalPositions = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalPositions / limit);

    const { rows } = await query(getDetailsQuery, [limit, offset]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching Positions", error: true });
    }

    return res.status(200).json({ totalPages: totalPages, positions: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//create Position
const createPosition = async (req, res) => {
  try {
    const { post_name, post_type, department_id } = req.body;

    if (!post_name) {
      return res.status(400).json({ message: "Position name is required", error: true });
    }

    if (!post_type) {
      return res.status(400).json({ message: "Postion type is required", error: true });
    }

    if (!department_id) {
      return res.status(400).json({ message: "department Id is required", error: true });
    }

    const checkIfExist = "SELECT * FROM positions WHERE post_name = $1";
    const exist = await query(checkIfExist, [post_name]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Position already exist", error: true });
    }

    const create_faculty_query = "INSERT INTO positions(post_name,post_type, department_id,created_at, updated_at, is_deleted) VALUES ($1,$2,$3, NOW(), NOW(),'FALSE')";

    const { rowCount } = await query(create_faculty_query, [post_name, post_type, department_id]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured creating position.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Position successfully created", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//update Position
const updatePosition = async (req, res) => {
  try {
    const { position_id } = req.params;
    const { post_name, post_type, department_id } = req.body;

    if (!position_id) {
      return res.status(400).json({ message: "Position Id is required", error: true });
    }

    if (!post_name) {
      return res.status(400).json({ message: "Position name is required", error: true });
    }

    if (!post_type) {
      return res.status(400).json({ message: "Postion type is required", error: true });
    }

    if (!department_id) {
      return res.status(400).json({ message: "department Id is required", error: true });
    }

    const checkIfExist = "SELECT * FROM positions WHERE post_name = $1";
    const exist = await query(checkIfExist, [post_name]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Position already exist", error: true });
    }

    const update_faculty_query = "UPDATE positions SET post_name=$1, post_type=$2, department_id=$3, updated_at=NOW() WHERE position_id = $4";

    const { rowCount } = await query(update_faculty_query, [post_name, post_type, department_id, position_id]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured updating position.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Position successfully updated", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//delete position
const deletePosition = async (req, res) => {
  try {
    const { position_id } = req.params;

    if (!position_id) {
      return res.status(400).json({ message: "Position Id is required", error: true });
    }

    const update_position_query = "UPDATE positions SET is_deleted=true, updated_at=NOW() WHERE position_id = $1";

    const { rowCount } = await query(update_position_query, [position_id]);

    if (rowCount <= 0) {
      console.log("error deleting");
      return res.status(400).json({ message: "An error occured deleting position.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Position successfully deleted", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//get Positions of Department
const getPositionsOfDepartment = async (req, res) => {
  const { departmentId } = req.params;

  if (!departmentId) {
    return res.status(400).json({ message: "DepartmentId Id must be provided", error: true });
  }
  try {
    const getDetailsQuery = `SELECT * FROM positions WHERE department_id = $1`;

    const { rows } = await query(getDetailsQuery, [departmentId]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching positions", error: true });
    }

    return res.status(200).json({ positions: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//get Departments
const getDepartments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "departmentDetails" `;

    const getDetailsQuery = `SELECT * FROM "departmentDetails" LIMIT $1 OFFSET $2 `;

    //Get device count
    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    const totalDepartments = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalDepartments / limit);

    const { rows } = await query(getDetailsQuery, [limit, offset]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching departments", error: true });
    }

    return res.status(200).json({ totalPages: totalPages, departments: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//get Departments of faculty
const getDepartmentsOfFaculty = async (req, res) => {
  const { facultyId } = req.params;

  if (!facultyId) {
    return res.status(400).json({ message: "Faculty Id must be provided", error: true });
  }
  try {
    const getDetailsQuery = `SELECT * FROM departments WHERE faculty_id = $1`;

    const { rows } = await query(getDetailsQuery, [facultyId]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching departments", error: true });
    }

    return res.status(200).json({ departments: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//create Department
const createDepartment = async (req, res) => {
  try {
    const { department_name, faculty_id } = req.body;

    if (!department_name) {
      return res.status(400).json({ message: "Department name is required", error: true });
    }

    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty Id is required", error: true });
    }

    const checkIfExist = "SELECT * FROM departments WHERE department_name = $1";
    const exist = await query(checkIfExist, [department_name]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Department already exist", error: true });
    }

    const create_faculty_query = "INSERT INTO departments(department_name, faculty_id,created_at, updated_at, is_deleted) VALUES ($1,$2, NOW(), NOW(),'FALSE')";

    const { rowCount } = await query(create_faculty_query, [department_name, faculty_id]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured creating department.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Department successfully created", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//update department
const updateDepartment = async (req, res) => {
  try {
    const { department_id } = req.params;
    const { department_name, faculty_id } = req.body;

    if (!department_id) {
      return res.status(400).json({ message: "Department ID is required", error: true });
    }

    if (!department_name) {
      return res.status(400).json({ message: "Department name is required", error: true });
    }

    if (!faculty_id) {
      return res.status(400).json({ message: "faculty ID is required", error: true });
    }

    const checkIfExist = "SELECT * FROM departments WHERE department_name = $1";
    const exist = await query(checkIfExist, [department_name]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Department already exist", error: true });
    }

    const update_department_query = "UPDATE departments SET department_name=$1, faculty_id=$2, updated_at=NOW() WHERE department_id = $3";

    const { rowCount } = await query(update_department_query, [department_name, faculty_id, department_id]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured updating department.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Faculty successfully updated", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//delete Faculties
const deleteDepartment = async (req, res) => {
  try {
    const { department_id } = req.params;

    if (!department_id) {
      return res.status(400).json({ message: "Department Id is required", error: true });
    }

    const update_department_query = "UPDATE departments SET is_deleted=true, updated_at=NOW() WHERE department_id = $1";

    const { rowCount } = await query(update_department_query, [department_id]);

    if (rowCount <= 0) {
      console.log("error deleting");
      return res.status(400).json({ message: "An error occured deleting department.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Department successfully deleted", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

////////////////////////////////

//get Faculties
const getFaculties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "facultiesDetails" `;

    const getDetailsQuery = `SELECT * FROM "facultiesDetails" LIMIT $1 OFFSET $2 `;

    //Get device count
    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    const totalFaulties = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalFaulties / limit);

    const { rows } = await query(getDetailsQuery, [limit, offset]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching faculties", error: true });
    }

    return res.status(200).json({ totalPages: totalPages, faculties: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//create Faculties
const createFaculty = async (req, res) => {
  try {
    const { faculty_name } = req.body;

    if (!faculty_name) {
      return res.status(400).json({ message: "Faculty name is required", error: true });
    }

    const checkIfExist = "SELECT * FROM faculties WHERE faculty_name = $1";
    const exist = await query(checkIfExist, [faculty_name]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Faculty already exist", error: true });
    }

    const create_faculty_query = "INSERT INTO faculties(faculty_name,created_at, updated_at, is_deleted) VALUES ($1, NOW(), NOW(),'FALSE')";

    const { rowCount } = await query(create_faculty_query, [faculty_name]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured creating faculty.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Faculty successfully created", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//update Faculties
const updateFaculty = async (req, res) => {
  try {
    const { faculty_id } = req.params;
    const { faculty_name } = req.body;

    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty ID is required", error: true });
    }

    if (!faculty_name) {
      return res.status(400).json({ message: "Faculty name is required", error: true });
    }

    const checkIfExist = "SELECT * FROM faculties WHERE faculty_name = $1";
    const exist = await query(checkIfExist, [faculty_name]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Faculty already exist", error: true });
    }

    const update_faculty_query = "UPDATE faculties SET faculty_name=$1, updated_at=NOW() WHERE faculty_id = $2";

    const { rowCount } = await query(update_faculty_query, [faculty_name, faculty_id]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured updating faculty.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Faculty successfully updated", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//delete Faculties
const deleteFaculty = async (req, res) => {
  try {
    const { faculty_id } = req.params;

    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty ID is required", error: true });
    }

    const update_faculty_query = "UPDATE faculties SET is_deleted=true, updated_at=NOW() WHERE faculty_id = $1";

    const { rowCount } = await query(update_faculty_query, [faculty_id]);

    if (rowCount <= 0) {
      console.log("error deleting");
      return res.status(400).json({ message: "An error occured deleting faculty.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Faculty successfully deleted", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = {
  getPositions,
  getPositionsOfDepartment,
  createPosition,
  updatePosition,
  deletePosition,
  getDepartments,
  getDepartmentsOfFaculty,
  createDepartment,
  updateDepartment,
  getFaculties,
  deleteDepartment,
  createFaculty,
  updateFaculty,
  deleteFaculty,
};
