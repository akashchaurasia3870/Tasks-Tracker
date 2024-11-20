import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSuccessSignup = async (data)=>{
        
        localStorage.setItem("_name", data.username)
        localStorage.setItem("_id", data.user_id)
        localStorage.setItem("_token", data.token)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { name, email, password };

        if (password != '' && password.length <= 6) {
            setMessage("Password Must Be Greater then 6 digits")
            setTimeout(() => {
                setMessage("")
            }, 2000)
            return;
        }

        if (name == '') {
            setMessage("Username Required")
        } else if (email == '') {
            setMessage("Email Required")
        } else {
            setMessage("Password Required")
        }
        setTimeout(() => {
            setMessage("")
        }, 2000)

        try {
            const response = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Sign-Up successful!');
                console.log('Success:', result);
                // Handle successful sign-in (e.g., redirect)
            } else {
                setMessage(result.message || 'Sign-in failed.');
                console.error('Error:', result);
                // await handleSuccessSignup(result);
                navigate('/')

            }
        } catch (error) {
            setMessage('Error: ' + error.message);
            console.error('Error:', error);
        }
    };

    const handlegoogleAuth = async () => {
        window.open(`http://localhost:5000/auth/google`,
            '_self'
        )
    };

    return (
        <div className='flex justify-center items-center h-[100vh] w-[100%]'>
        
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', background: '#fff' }}>
            <h2 className='text-center text-lg mb-2 font-semibold'>Tasks Tracker</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ marginBottom: '10px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ marginBottom: '10px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ marginBottom: '10px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px', width: '100%', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Sign Up
                </button>
                <div className='mt-2 text-center'>
                        <span className='block text-sm font-semibold'>Already Have An Account ?<Link to={'/signin'} className='font-semibold text-blue-500'> SignIn</Link></span>
                </div>
                <div className='w-[100%] flex flex-row justify-between items-center'><hr className='h-[2px] bg-gray-400 w-full'/><span className='mx-2 mb-2'>or</span> <hr className='h-[2px] bg-gray-400 w-full'/></div>

                <button type="submit" style={{ padding: '10px', width: '100%', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={
                  handlegoogleAuth
                }>
                    SignUp With Google
                </button>
            </form>
            {message && <p className='text-center font-semibold' style={{ marginTop: '10px', color: 'red' }}>{message}</p>}
        </div>
        </div>
    );
};

export default SignUp;
