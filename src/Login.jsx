import Popup from 'reactjs-popup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sign } from 'node:crypto';

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();
    
    // Separate form state for each form
    const [loginForm, serLoginForm] = useState({ email: '', password: '' });
    const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: ''});
    const [error, setError] = useState('');

    // Generic change handler
    const handleLoginChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e, close) => {
        e.preventDefault();     // To stop page from refreshing on submit
        setError('');

        try {
            const res = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginForm)
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error);       // Show error inside popup
                return;
            }

            localStorage.setItem('token', data.token);                  // save JWT
            close();                // close the popup
            navigate('/todo');      // Redirect to to-do page 
        } catch (err) {
            console.log(err);
            setError('Something went wrong. Try again!');
        }
    };

    const handleSignup = async (e, close) => {
        e.preventDefault();
        setError('');

        // Frontend validation
        if (signupForm.password !== signupForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: signupForm.name,
                    email: signupForm.email,
                    password: signupForm.password
                })
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error);
                return;
            }

            localStorage.setItem('token', data.token);
            close();
            navigate('/todo');
        } catch (err) {
            setError('Something went wrong. Try again.');
        }
    };

    return (
        <div>
            <Popup 
                trigger={<button className="button">Login</button>} 
                modal
                onOpen={() => setError('')}         // clear errors when popup opens
            >
                {(close) => (
                    <div>
                        {error && <p style ={{ color: 'red' }}>{error}</p>}
                        {isSignup ? (
                            <form onSubmit={(e) => handleSignup(e, close)}>
                                <span onClick={close}>x</span><br />
                                <h5>Sign up for an account!</h5>

                                <label>Username</label><br />
                                <input type="text" name="name"
                                value={signupForm.name}
                                onChange={handleSignupChange}
                                required 
                                /><br />

                                <label>Emai</label> <br />
                                <input
                                    type="email"
                                    name="email"
                                    value={signupForm.email}
                                    onChange={handleSignupChange}
                                    required
                                /> <br />

                                <label>Password</label><br />
                                <input type="password" name="password" 
                                value={signupForm.password}
                                onChange={handleSignupChange}
                                required

                                /><br />

                                <label>Confirm Password</label><br />
                                <input type="password" name="confirmPassword" 
                                value={signupForm.confirmPassword}
                                onChange={handleSignupChange}
                                required
                                /><br />

                                <button type="submit">Sign Up</button><br />

                                <label>
                                    Already have an account?{" "}
                                    <span
                                        style={{ color: "blue", cursor: "pointer" }}
                                        onClick={() => {setIsSignup(false); setError("");}}
                                    >
                                        Login
                                    </span>
                                </label>
                            </form>
                        ) : (
                            <form>
                                <span onClick={close}>x</span><br />
                                <h5>Login to your account!</h5>

                                <label>Username</label><br />
                                <input type="text" name="username" /><br />

                                <label>Password</label><br />
                                <input type="password" name="password" /><br />

                                <button type="submit">Login</button><br />

                                <label>
                                    Don't have an account?{" "}
                                    <span
                                        style={{ color: "blue", cursor: "pointer" }}
                                        onClick={() => setIsSignup(true)}
                                    >
                                        Sign Up
                                    </span>
                                </label>
                            </form>
                        )}
                    </div>
                )}
            </Popup>
            {/* <BrowserRouter>
        <Routes>
            <Route path="/signup" element={< Signup />}></Route>
        </Routes>
    </BrowserRouter> */}
        </div>
    )
}

export default Login