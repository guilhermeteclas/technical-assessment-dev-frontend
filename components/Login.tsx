export default function Login() {
    return (
        <div class="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <form className="flex  flex-col space-y-4" method="post">
            <input
              type="text"
              placeholder="E-mail"
              name="email"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-success" type="submit">Login</button>
          </form>
        </div>
      </div>
    )};