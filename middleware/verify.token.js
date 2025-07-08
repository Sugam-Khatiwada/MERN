import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT, (err, decoded) => {
        if(err){
            return res.status(401).json({ message: 'Invalid access' });
        }

        req.user = decoded;
        console.log('decoded', decoded);
        next();
    })
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === "Employee" || req.user.role === "Admin") {
            next();
        }   
        else {
            return res.status(401).json({ message: 'Access denied' });
        }
    })
};

export const verifyHR = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === "HR" || req.user.role === "Admin") {
            next();
        }   
        else {
            return res.status(401).json({ message: 'Access denied' });
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === "Admin") {
            next();
        }   
        else {
            return res.status(401).json({ message: 'Access denied' });
        }
    })
};