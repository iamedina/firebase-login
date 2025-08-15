import { google, register } from '../config/firebase';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleGoogle = async () => {
        try{
        const infoUser = await google();
        console.log(infoUser);
    
        const token = await infoUser.user.getIdToken(true);
        sessionStorage.setItem('token', JSON.stringify(token));
      } catch (error) {
        if(error.code === 'auth/popup-closed-by-user') {
            setMensaje("El usuario cerró el popup sin completar el login.");
        }else if (error.code === 'auth/cancelled-popup-request') {
            setMensaje("El usuario canceló la solicitud de inicio de sesión.");
        }else if (error.code === 'auth/account-exists-with-different-credential') {
            setMensaje("Ya existe una cuenta con este correo electrónico. Por favor, inicia sesión con otro proveedor.");
        }
    }
  };

  const registrar = async () => {
    try {
      if (!email || !password) {
        alert('Por favor, complete todos los campos.');
        return;
      }
      const User = await register(email, password);
      if (User) {
        setMensaje('Registered user');
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate('/login');
    }
    catch (error) {
      console.log(error)
      if (error.code === 'auth/email-already-in-use') {
        setMensaje('This email is already registered.');
      } else if (error.code === 'auth/invalid-email') {
        setMensaje('Invalid email.');
      } else if (error.code === 'auth/weak-password') {
        setMensaje('Password must be at least 6 characters long.');
      } else {
        setMensaje(`Error: ${error.message}`);
      }
    }
  };


  return (
    <div className='w-[350px] border border-gray-300 rounded-xl shadow-lg p-6 bg-black/85'>
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>

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

        <div className='mb-1'>
          <p className='block text-xs font-medium text-gray-700 text-start'>
            Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Sign in here</Link>
          </p>
        </div>
        <button
          onClick={registrar}
          className="w-full text-white bg-black py-2 rounded-lg transition duration-200"
        >
          Create account
        </button>

        <div className="flex items-center justify-center">
          <span className="text-gray-400">- or -</span>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full text-white bg-black pt-2 rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.5 33 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.6-5.6C33.7 6.3 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10 0 20-7.5 20-20 0-1.3-.1-2.5-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.3 15.6 18.8 12 24 12c3 0 5.7 1.1 7.8 2.9l5.6-5.6C33.7 6.3 29.1 4 24 4c-7.9 0-14.8 4.6-17.7 10.7z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.4-5.1l-6.2-5.1C29.5 35.3 26.9 36 24 36c-5.2 0-9.5-3.3-11.1-7.9l-6.6 5.1C9.1 39.2 16 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.2 3.2-3.8 5.9-7.3 7.3l6.2 5.1c3.6-3.3 6.1-8.1 6.1-13.9 0-1.3-.1-2.5-.4-3.5z" />
          </svg>
          Sign in with google
        </button>

        {mensaje && (
          <div className={`text-center text-sm py-2 rounded-lg ${mensaje === 'Registered user'
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

export default Registro;