

const RegisterForm = ({
    handleSubmit,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword
}) => {

    return (
        <form onSubmit={handleSubmit} >
            <div className="form-group mb-3">
                <label className="form-label">Name</label>
                <input onChange={(e) => setName(e.target.value)}
                    className="form-control mb-3 w-100"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    required
                />
            </div>
            <div className="form-group mb-3">
                <label className="form-label">email</label>
                <input onChange={(e) => setEmail(e.target.value)}
                    className="form-control mb-3 w-100"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                     required
                />
            </div>
            <div className="form-group mb-3">
                <label className="form-label">password</label>
                <input onChange={(e) => setPassword(e.target.value)}
                    className="form-control mb-3 w-100"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                     required
                />
            </div>
            <button disabled={!email && !password} className="btn btn-primary mt-1">Submit</button>
        </form>
    )
}

export default RegisterForm;