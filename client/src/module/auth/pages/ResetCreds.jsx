import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ResetCreds = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { email, password };

        console.log(data);
        
        if (email == '') {
            setMessage("Email Required")
            
            setTimeout(() => {
                setMessage("")
            }, 2000)
        }

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
                setMessage('Password Reset Link Send Successfully!');
                console.log('Success:', result);
                navigate('/signin');
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


    return (
        <div className='flex justify-center items-center h-[100vh] w-[100%]'>
        
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', background: '#fff' }}>
            <h2 className='text-center text-lg mb-2 font-semibold'>Tasks Tracker</h2>
            <h3 className='text-center text-lg mb-2 font-semibold'>Enter Email ID To Receive Password Reset Link</h3>
            <form onSubmit={handleSubmit}>
               
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ marginBottom: '10px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                
                <button type="submit" style={{ padding: '10px', width: '100%', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Submit
                </button>
                
            </form>
            {message && <p className='text-center font-semibold' style={{ marginTop: '10px', color: 'red' }}>{message}</p>}
        </div>

    </div>
    );
};

export default ResetCreds;
