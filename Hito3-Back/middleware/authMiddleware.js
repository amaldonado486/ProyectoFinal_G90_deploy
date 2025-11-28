import jwt from "jsonwebtoken";


export function requireAuth(req, res, next) {
    try {
        console.log("requireAuth ejecutado");
        console.log("token:", req.headers.authorization);

    const header = req.headers.authorization;
    if (!header) {
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

export function adminMiddleware(req, res, next) {
  console.log("adminMiddleware ejecutado");
  console.log("user recibido:", req.user);

  if (req.user?.rol !== "admin") {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  next();
}
