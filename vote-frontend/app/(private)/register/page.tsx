import React from "react";

export default function Register() {
  return (
    <div>
      <form>
        <label>User Name</label>
        <input name="username" />
        <label>Password</label>
        <input name="password" />
        <button>Register</button>
      </form>
    </div>
  );
}
