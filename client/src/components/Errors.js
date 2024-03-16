const Errors = ({ errors }) => {


  let errorDisplay = null;

  if (errors.length) {
    errorDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
    return errorDisplay;
};





export default Errors;
