import React, { useState } from 'react';
import './Forms.css';

const Forms = () => {
  const items = ['Pens', 'Diary', 'Letter Head', 'File', 'A4 Sheets', 'Stapler', 'Stapler Pins', 'Duster', 'Highlighter'];
  const [formData, setFormData] = useState(
    items.reduce((acc, item) => {
      acc[item] = 0;
      return acc;
    }, {})
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage or context
    const userName = localStorage.getItem('userName'); // Retrieve user name from localStorage or context

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ 
        items_and_quantities: formData,
        userName: userName  
      })
    };

    try {
      const response = await fetch('http://localhost:5000/submit_stationery_order', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Response:', data);

      alert('Order submitted successfully! Redirecting to dashboard...');

      // Update the button state to show submission
      setIsSubmitted(true);

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        // Redirect logic
        window.location.href = '/dashboard';
      }, 3000);

    } catch (error) {
      console.error('Error:', error);
      // Handle error if needed
    }
  };

  const handleChange = (e, item) => {
    setFormData({
      ...formData,
      [item]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item}>
                <td>{item}</td>
                <td>
                  <select
                    value={formData[item]}
                    onChange={(e) => handleChange(e, item)}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button 
          type="submit" 
          className={isSubmitted ? 'submitted' : ''}
        >
          {isSubmitted ? 'Submitted' : 'Submit'}
        </button>
      </div>
      <div className="notice">
        <p className="note">Note: If you require more than 9 items, please fill the form again.</p>
      </div>
    </form>
  );
};

export default Forms;
