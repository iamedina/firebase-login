import { login } from "../config/firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                alert('Por favor, complete todos los campos.');
                return;
            }
            const user = await login(email, password);
            if (user) {
                setMensaje('Usuario autenticado');
            }
            await new Promise((resolve) => setTimeout(resolve, 2000));
            navigate('/fake');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setMensaje('No existe una cuenta con ese correo electrónico.');
            } else if (error.code === 'auth/wrong-password') {
                setMensaje('Contraseña incorrecta.');
            } else if (error.code === 'auth/invalid-email') {
                setMensaje('Correo inválido.');
            } else {
                setMensaje(`Error desconocido: ${error.message}`);
            }
        };
    }

    return (
        <div className='w-[350px] border border-gray-300 rounded-xl shadow-lg p-6 bg-black/85'>
            <div className="bg-white shadow-lg border rounded-xl p-8 w-full max-w-lg space-y-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-start">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@mail.com"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-nono focus:border-transparent "
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-start">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-nono focus:border-transparent "
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full text-white bg-black py-2 rounded-lg transition duration-200"
                >
                    Sign in
                </button>

                <div className='mb-3'>
                    <p className='block text-xs font-medium text-gray-700 text-center'>Don't have an account? <Link to="/" className='text-blue-500 hover:underline'>Sign up here</Link></p>
                </div>

                {mensaje && (
                    <div className={`text-center text-sm py-2 rounded-lg ${mensaje === 'Usuario autenticado'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {mensaje}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
