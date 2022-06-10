// Import useState hook from react
import { useState } from "react";

// Input Password Component
const Password = () => {
  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <div>
      <button onClick={togglePassword}>Show</button>
    </div>
  );
}

export default Password;