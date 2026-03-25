import Popup from 'reactjs-popup'
import Signup from './Signup'
import { useState, React } from 'react'

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    return (
        <div>
            <Popup trigger={<button className="button">Login</button>} modal>
                {(close) => (
                    <div>
                        {isSignup ? (
                            <form>
                                <span onClick={close}>x</span><br />
                                <h5>Sign up for an account!</h5>

                                <label>Username</label><br />
                                <input type="text" name="username" /><br />

                                <label>Password</label><br />
                                <input type="password" name="password" /><br />

                                <label>Confirm Password</label><br />
                                <input type="password" name="confirmPassword" /><br />

                                <button type="submit">Sign Up</button><br />

                                <label>
                                    Already have an account?{" "}
                                    <span
                                        style={{ color: "blue", cursor: "pointer" }}
                                        onClick={() => setIsSignup(false)}
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