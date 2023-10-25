const isValidEmail = (email: any) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

export const InputField = ({
  name,
  label,
  errors,
  register,
  placeholder,
  errorMessage,
  isEmail = false,
  required = false,
}: any) => {
  const handleEmailValidation = (email: any) => {
    const isValid = isValidEmail(email);

    // const validityChanged =
    //   (errors.email && isValid) || (!errors.email && !isValid);
    // if (validityChanged) {
    //   console.log("Fire tracker with", isValid ? "Valid" : "Invalid");
    // }

    return isValid;
  };
  return (
    <div className="mt-3">
      <label>{label}</label>
      <input
        {...register(name, {
          required: required,
          validate: isEmail ? handleEmailValidation : null,
        })}
        className={`border-[1px] focus:outline-none focus:border-[2px] ${
          errors ? "border-red-500" : "border-gray-500"
        } rounded-md px-2 py-1 w-full`}
        placeholder={placeholder}
      />
      {errors && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};
