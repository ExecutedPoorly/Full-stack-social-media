import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        //frontend sets auth token in header, we'll grab in backend.

        if (!token) {
            return res.status(403).send("Access Denied");
        }
        
        if (token.startsWith("Bearer ")) { //Prefixes "Bearer "" to token string.
            token = token.slice(7, token.length).trimLeft(); //removes Bearer from toke string.
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); //proceeds to next step of function, placed in routes before function at end.
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}