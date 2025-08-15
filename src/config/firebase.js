// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgZxaXuDjhWxJbTMwyeK6MNQM8Xu8WqPk",
    authDomain: "register-login-d40ab.firebaseapp.com",
    projectId: "register-login-d40ab",
    storageBucket: "register-login-d40ab.firebasestorage.app",
    messagingSenderId: "316010067502",
    appId: "1:316010067502:web:414a71fdbc36fcfa4b51bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inicia sesión con Google
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const google = async () => {
    try {
        const userCredential = await
            signInWithPopup(auth, provider);
        return userCredential;
    } catch (error) {
        if (error.code === 'auth/popup-closed-by-user') {
            console.warn("El usuario cerró el popup sin completar el login.");
        } else if (error.code === 'auth/account-exists-with-different-credential') {
            const email = error.customData?.email || "este correo";
            console.warn(`Ya existe una cuenta con el correo ${email}. Usa el método con el que te registraste originalmente.`);
            alert(`Ya existe una cuenta con el correo ${email}. Inicia sesión con correo y contraseña.`);
        } else {
            console.error("Error al iniciar sesión con Google:", error);
        }
        return null;
    }
}


// Registrar usuario con email y password
export const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(`Usuario registrado: ${user.email}`);
        return userCredential;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;
    }
}

// Iniciar sesión
export const login = async (email, password) => {
    try {
        console.log(email, password)
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
            console.log(`Usuario autenticado: ${user.email}`);
        }
        return userCredential;
    } catch (error) {
       console.error("Error al iniciar sesión:", error);
        throw error;
    }
}