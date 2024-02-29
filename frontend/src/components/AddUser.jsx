import { useState } from "react";


const AddUser = () => {
  const [showForm, setShowForm] = useState(false);
  // State variables
  const [userInput, setuserInput] = useState({
    username: '',
    email: '',
    status: 'active',
    role: 'data_manager',
  });

  // Validation: Check if required fields are not empty
  const checkValidation = () => {
    if (
      !userInput.username ||
      !userInput.email ||
      !userInput.status ||
      !userInput.role
    ) {
      alert("Please fill in all required fields");
      return false; // Stop form submission if validation fails
    }
    return true
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormPopup = () => {
    setShowForm(!showForm);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkValidation()) {
      return
    }
    // Access the form data here
    console.log('Form Data:', userInput);
    // You can perform further actions, such as sending data to a server
  };
  return (
    <div>
      <div>
        <button className="btn btn-primary" onClick={handleFormPopup}>
          Add User      </button>
        {showForm && (
          <div className="university-form mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <form
                    className="form-out border rounded p-4"
                    onSubmit={handleSubmit}>
                    <div>
                      <div className="form-group mb-3">
                        <label htmlFor="usernameId">Username:</label>
                        <input
                          className="form-control"
                          type="text"
                          id="username"
                          name="username"
                          value={userInput.username}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="form-group mb-3">
                        <label htmlFor="email">Email:</label>
                        <input
                          className="form-control"
                          type="email"
                          id="email"
                          name="email"
                          value={userInput.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <div className="form-group mb-3">
                          <label htmlFor="status">Status:</label>
                          <label>
                            <input
                              className="form-check-input me-1"
                              type="radio"
                              name="status"
                              value="active"
                              checked={userInput.status === 'active'}
                              onChange={handleChange}
                            />
                            Active
                          </label>

                          <label>
                            <input
                              className="form-check-input me-1"
                              type="radio"
                              name="status"
                              value="inactive"
                              checked={userInput.status === 'inactive'}
                              onChange={handleChange}
                            />
                            Inactive
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="input-group mb-3">
                        <label htmlFor="role" className="input-group-text">Role:</label>
                        <select
                          className="form-select"
                          id="role"
                          name="role"
                          value={userInput.role}
                          onChange={handleChange}
                        >
                          <option value="data_manager">Data Manager</option>
                          <option value="certifier">Certifier</option>
                        </select>
                      </div>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">Create User</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default AddUser;
