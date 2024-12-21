

export default function Register() {
  return (
    <div class="card bg-base-100 w-96 shadow-xl">
      <div className="card-body ">
        <h2 className="card-title">Register</h2>
        <form className="flex  flex-col space-y-4" method="post">
          <input
            type="text"
            placeholder="Name"
            name="name" 
            className="input input-bordered w-full max-w-xs"
          />
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
          <input
            type="text"
            placeholder="Address"
            name="address" 
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Coordinates"
            name="coordinates" 
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-primary" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
