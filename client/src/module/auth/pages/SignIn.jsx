import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignIn = () => {
    // const [name, setName] = useState('');
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

        const data = { email, password };

        console.log(data);
        
        if (email == '') {
            setMessage("Email Required")
        } else if(password=='') {
            setMessage("Password Required")
        }
        setTimeout(() => {
            setMessage("")
        }, 2000)

        try {
            const response = await fetch('http://localhost:5000/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);
            
            if (response.ok) {
                setMessage('Sign-in successful!');
                console.log('Success:', result);
                navigate('/');
                // Handle successful sign-in (e.g., redirect)
            } else {
                setMessage(result.data || 'Sign-in failed.');
                console.error('Error:', result.data);
                setTimeout(() => {
                    setMessage("")
                }, 2000)
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
                {/* <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ marginBottom: '10px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
                /> */}
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
                <div className='mb-2 text-right text-sm'>
                        <Link to={'/reset_creds'} className='font-semibold text-blue-500'> Forgot Password ?</Link>
                </div>
                <button type="submit" style={{ padding: '10px', width: '100%', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Sign In
                </button>
                <div className='mt-2 text-center'>
                        <span className='block text-sm font-semibold'>Don't Have An Account ?<Link to={'/signup'} className='font-semibold text-blue-500'> SignUp</Link></span>
                </div>
                <div className='w-[100%] flex flex-row justify-between items-center'><hr className='h-[2px] bg-gray-400 w-full'/><span className='mx-2 my-2'>or</span> <hr className='h-[2px] bg-gray-400 w-full'/></div>

                <button type="submit" style={{ padding: '10px', width: '100%', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={
                  handlegoogleAuth
                }>
                    SignIn With Google
                </button>
            </form>
            {message && <p className='text-center font-semibold' style={{ marginTop: '10px', color: 'red' }}>{message}</p>}
        </div>

        
    </div>
    );
};

export default SignIn;
