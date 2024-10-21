import type { NextApiRequest, NextApiResponse } from "next";

const hardcodedUser = {
  email: "usuario@ejemplo.com",
  password: "123456",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Comprobamos si los datos coinciden con el usuario hardcodeado
    if (email === hardcodedUser.email && password === hardcodedUser.password) {
      return res
        .status(200)
        .json({ message: "Login exitoso", user: { email } });
    } else {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } else {
    return res.status(405).json({ message: "Método no permitido" });
  }
}
