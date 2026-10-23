const jwt = require("jsonwebtoken");

const createSession = (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Authorization token required", error: true });
    }

    const token = authorization.split(" ")[1];

    const { email } = jwt.verify(token, process.env.SECRET);

    const sessionId = Math.random().toString(36).substring(2, 9);

    //Token method
    const tempToken = jwt.sign({ email }, process.env.SECRET, { expiresIn: "10m" });

    return res.status(200).json({ sessionId, tempToken, signUrl: `http://192.168.8.4:5173/sign/${sessionId}`, message: "success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { createSession };
