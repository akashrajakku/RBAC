import jwt from 'jsonwebtoken';
import{Admin, User} from "../models/schema.js"

export const authMiddleware = (accessControl) => {
    return async (req, res, next) =>{
        try {
            const token = req.cookies.token;
            
            if (!token) {
              return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
            }
        
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.userId = decoded.userId;

            const user = await User.findById(req.userId);
            const admin = await Admin.findById(req.userId);

            // console.log(user, "hihiihihi");
            // console.log(admin, "hihihihihihiihttttttttt");
            
            

            if(!user && !admin){
                return res.status(403).json({ 
                message: "No user found" 
                });
            }

            if(user){
                const roleId = user.roleId;
                const role = user.role;
                if(!accessControl.includes(roleId)){
                    return res.status(403).json({
                        success: false,
                        message: `Forbidden: access denied to ${role}`
                    })
                }
            }

            if(admin){
                const roleId = admin.roleId;
                const role = admin.role;
                // console.log(role, accessControl);
                
                if(!accessControl.includes(roleId)){
                    return res.status(403).json({
                        success: false,
                        message: `Forbidden: access denied to ${role}`
                    })
                }
            }
        
            next();
            
          } catch (error) {
            return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
          }
    }
}