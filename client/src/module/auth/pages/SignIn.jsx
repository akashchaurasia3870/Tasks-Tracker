import React, { useState } from 'react';

const SignIn = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { name, email, password };

        try {
            const response = await fetch('https://your-api-endpoint.com/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Sign-in successful!');
                console.log('Success:', result);
                // Handle successful sign-in (e.g., redirect)
            } else {
                setMessage(result.message || 'Sign-in failed.');
                console.error('Error:', result);
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', background: '#fff' }}>
            <h2>Sign In</h2>
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
                    Sign In
                </button>
            </form>
            {message && <p style={{ marginTop: '10px', color: 'red' }}>{message}</p>}
        </div>
    );
};

export default SignIn;
