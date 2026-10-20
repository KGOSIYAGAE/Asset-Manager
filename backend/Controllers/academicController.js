const { query } = require("../util/pg_dbConnection");

//get Courses
const getCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "coursesDetails" `;

    const getDetailsQuery = `SELECT * FROM "coursesDetails" LIMIT $1 OFFSET $2 `;

    //Get device count
    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching courses", error: true });
    }

    const totalCourses = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalCourses / limit);

    const { rows } = await query(getDetailsQuery, [limit, offset]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching courses", error: true });
    }

    return res.status(200).json({ totalPages: totalPages, courses: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//get Courses of faculty
const getCoursesOfFaculty = async (req, res) => {
  const { facultyId } = req.params;

  if (!facultyId) {
    return res.status(400).json({ message: "Faculty Id must be provided", error: true });
  }
  try {
    const getDetailsQuery = `SELECT * FROM courses WHERE faculty_id = $1`;

    const { rows } = await query(getDetailsQuery, [facultyId]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching courses", error: true });
    }

    return res.status(200).json({ courses: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//create Course
const createCourse = async (req, res) => {
  try {
    const { course_name, course_code, faculty_id } = req.body;

    if (!course_name) {
      return res.status(400).json({ message: "Course name is required", error: true });
    }

    if (!course_code) {
      return res.status(400).json({ message: "Course code is required", error: true });
    }

    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty Id is required", error: true });
    }

    const checkIfExist = "SELECT * FROM courses WHERE course_name = $1";
    const exist = await query(checkIfExist, [course_name]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Course already exist", error: true });
    }

    const create_faculty_query = "INSERT INTO courses(course_name,course_code, faculty_id,created_at, updated_at, is_deleted) VALUES ($1,$2,$3, NOW(), NOW(),'FALSE')";

    const { rowCount } = await query(create_faculty_query, [course_name, course_code, faculty_id]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured creating course.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Course successfully created", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//update department
const updateCourse = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { course_name, course_code, faculty_id } = req.body;

    if (!course_id) {
      return res.status(400).json({ message: "Course Id is required", error: true });
    }

    if (!course_name) {
      return res.status(400).json({ message: "Course name is required", error: true });
    }

    if (!course_code) {
      return res.status(400).json({ message: "Course code is required", error: true });
    }

    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty Id is required", error: true });
    }

    const checkIfExist = "SELECT * FROM courses WHERE course_name = $1";
    const exist = await query(checkIfExist, [course_name]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Course already exist", error: true });
    }

    const update_query = "UPDATE courses SET course_name=$1, course_code=$2, faculty_id=$3, updated_at=NOW() WHERE course_id = $4";

    const { rowCount } = await query(update_query, [course_name, course_code, faculty_id, course_id]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured updating course.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Course successfully updated", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//delete Faculties
const deleteCourse = async (req, res) => {
  try {
    const { course_id } = req.params;

    if (!course_id) {
      return res.status(400).json({ message: "Course Id is required", error: true });
    }

    const update_query = "UPDATE course SET is_deleted=true, updated_at=NOW() WHERE course_id = $1";

    const { rowCount } = await query(update_query, [course_id]);

    if (rowCount <= 0) {
      console.log("error deleting");
      return res.status(400).json({ message: "An error occured deleting course.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Course successfully deleted", error: false });
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
  getCourses,
  getCoursesOfFaculty,
  createCourse,
  updateCourse,
  getFaculties,
  deleteCourse,
  createFaculty,
  updateFaculty,
  deleteFaculty,
};
