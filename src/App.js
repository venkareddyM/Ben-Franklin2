import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({
    EmployeeCode: '',
    EmployeeName: '',
    Email: '',
    Salary: ''
  });

  const [employeeList, setEmployeeList] = useState([]); // List to hold registered employees

  const [editIndex, setEditIndex] = useState(-1); // Index of the row being edited (-1 when no row is being edited)

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const MyEvent = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleConsole = (e) => {
    e.preventDefault();

    // Check if any field in the data object is empty
    if (Object.values(data).some(value => value === '')) {
      alert("Please fill out all fields before saving.");
      return;
    }

    if (editIndex === -1) {
      // Check if the email already exists in the list
      const emailExists = employeeList.some(employee => employee.Email === data.Email);
      if (emailExists) {
        alert("Email already exists. Please use a different email address.");
        return;
      }

      // Add current form data to the list when not in edit mode
      setEmployeeList([...employeeList, data]);
    } else {
      // Update the data at the specific editIndex when in edit mode
      const updatedList = [...employeeList];
      updatedList[editIndex] = data;
      setEmployeeList(updatedList);
      setEditIndex(-1); // Reset edit mode
    }

    console.log(data);
    setData({
      EmployeeCode: '',
      EmployeeName: '',
      Email: '',
      Salary: ''
    }); // Clear the form after saving the data
  };

  const handleDelete = (index) => {
    const updatedList = [...employeeList];
    updatedList.splice(index, 1);
    setEmployeeList(updatedList);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000); // Display success message for 2 seconds
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setData(employeeList[index]);
  };

  return (
    <div>
      <div className="container">
        <h1>REGISTER FORM</h1>
        <form>
          <div className='form-group'>
            <label>Employee Code</label>
            <input type='text' name='EmployeeCode' placeholder='Enter your employee code' value={data.EmployeeCode} onChange={MyEvent} />
          </div>

          <div className='form-group'>
            <label>Employee Name</label>
            <input type='text' name='EmployeeName' placeholder='Enter your name' value={data.EmployeeName} onChange={MyEvent} />
          </div>

          <div className='form-group'>
            <label>Email</label>
            <input type='text' name='Email' placeholder='Enter your email' value={data.Email} onChange={MyEvent} />
          </div>

          <div className='form-group'>
            <label>Salary</label>
            <input type='text' name='Salary' placeholder='Enter your salary' value={data.Salary} onChange={MyEvent} />
          </div>
          <button className='button' onClick={handleConsole}>
            {editIndex === -1 ? "Save" : "Update"}
          </button>
        </form>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Actions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{employee.EmployeeName}</td>
              <td>{employee.Email}</td>
              <td>{employee.Salary}</td>
              <td><button className='buttonss' onClick={() => handleDelete(index)}>Delete</button></td>
              <td><button className='buttons' onClick={() => handleEdit(index)}>Update</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {showSuccessMessage && (
      <p className="success-message">Successfully deleted!</p>
    )}
    </div>
  );
}

export default App;
