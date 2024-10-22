"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message);
        router.push("/upload-image");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch {
      setError("Error al conectarse con el servidor");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl text-white font-semibold mb-4">Login</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="mb-2 text-white font-semibold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 text-lg text-black border rounded-md border-gray-700"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-white font-semibold">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 text-lg text-black border rounded-md border-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-700 text-white font-semibold p-3 rounded-md hover:bg-indigo-500 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
