import jwt from 'jsonwebtoken';
const validateToken = (req, res, next) => {
  console.log("Token2");
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });
  console.log("Token1");
  try {
    const validToken = jwt.verify(accessToken, "importantsecret");
    req.user = validToken; 
    
    if (validToken) {
      console.log("Token2");
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

export default validateToken;