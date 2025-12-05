const LoginForm = ({
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword
}) => {

    return (
        <form onSubmit={handleSubmit} >
            <div className="form-group mb-3">
                <label className="form-label">email</label>
                <input onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                     required
                />
            </div>
            <div className="form-group mb-3">
                <label className="form-label">password</label>
                <input onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                     required
                />
            </div>
            <button disabled={!email && !password}  className="btn btn-primary mt-1">Submit</button>
        </form>
    )
}

export default LoginForm;
