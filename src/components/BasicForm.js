import useInput from "./hooks/use-input";

const BasicForm = (props) => {
  const {
    value: enteredFN,
    isValid: enteredFNIsValid,
    hasError: fNInputHasError,
    valueChangeHandler: fNChangedHandler,
    valueBlurHandler: fNBlurHandler,
    reset: resetFNInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLN,
    isValid: enteredLNIsValid,
    hasError: lNInputHasError,
    valueChangeHandler: lNChangedHandler,
    valueBlurHandler: lNBlurHandler,
    reset: resetLNInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim().includes("@"));

  let isFormValid = false;
  if (enteredFNIsValid && enteredLNIsValid && enteredEmailIsValid) {
    isFormValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    console.log("first name", enteredFN);
    console.log("last name", enteredLN);
    console.log("email", enteredEmail);

    resetFNInput();
    resetLNInput();
    resetEmailInput();
  };

  const fNInputClasses = fNInputHasError
    ? "form-control invalid"
    : "form-control";

  const lNInputClasses = lNInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={fNInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="first_name"
            onChange={fNChangedHandler}
            onBlur={fNBlurHandler}
            value={enteredFN}
          />
          {fNInputHasError && <p className="error-text">First name must not be empty.</p>}
        </div>
        <div className={lNInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="last_name"
            onChange={lNChangedHandler}
            onBlur={lNBlurHandler}
            value={enteredLN}
          />
          {lNInputHasError && <p className="error-text">Last name must not be empty.</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="error-text">Enter a valid email.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
