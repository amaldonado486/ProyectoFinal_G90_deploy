import jwt from "jsonwebtoken";


export function requireAuth(req, res, next) {
    try {
        const header = req.headers.authorization;

        if (!header?.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Sin token" });
        }

        // Extraer el token
        const token = header.replace("Bearer ", "");
        
        // Verificar el token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (e) {
        console.error("Error requireAuth:", e.message);
        return res.status(401).json({ error: "Token inválido" });
    }
}