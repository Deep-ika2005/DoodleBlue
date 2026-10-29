
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./RegistrationForm.css";

function RegistrationForm() {
  const location = useLocation();
  const studentNameRef = useRef(null);
  const [highlightStudentName, setHighlightStudentName] = useState(false);

  useEffect(() => {
    if (!location.state?.focusStudentName) return;

    studentNameRef.current?.focus();
    setHighlightStudentName(true);

    const highlightTimer = window.setTimeout(() => {
      setHighlightStudentName(false);
    }, 1600);

    return () => window.clearTimeout(highlightTimer);
  }, [location.key, location.state]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    password: "",
    attendance: "In person",
    event: "",
    accessibility: false,
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    setErrors({
      ...errors,
      [name]: ""
    });

    setSubmitted(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.department) {
      newErrors.department = "Please select your department.";
    }

    if (
      !formData.year ||
      Number(formData.year) < 1 ||
      Number(formData.year) > 6
    ) {
      newErrors.year = "Please enter a valid year of study (1–6).";
    }

    if (!formData.event) {
      newErrors.event = "Please select an event.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  }

  function handleReset() {
    setFormData({
      name: "",
      email: "",
      department: "",
      year: "",
      password: "",
      attendance: "In person",
      event: "",
      accessibility: false,
      message: ""
    });

    setErrors({});
    setSubmitted(false);
  }

  return (
    <main className="registration-page" id="registration">
      <section className="registration-card">
        <header className="form-header">
          <p className="eyebrow">SAVE YOUR SEAT</p>

          <h1>Student Event Registration</h1>

          <p className="form-description">
            Complete the required fields to register for a campus event.
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">

            {/* Student Name */}
            <div className="form-group">
              <label htmlFor="name">
                Student name <span>*</span>
              </label>

              <input
                id="name"
                ref={studentNameRef}
                className={highlightStudentName ? "name-input-highlight" : ""}
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
              />

              {errors.name && (
                <p className="field-error">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email address <span>*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />

              {errors.email && (
                <p className="field-error">{errors.email}</p>
              )}
            </div>

            {/* Department */}
            <div className="form-group">
              <label htmlFor="department">
                Department <span>*</span>
              </label>

              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                aria-invalid={!!errors.department}
              >
                <option value="">Select your department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Electronics and Communication">
                  Electronics and Communication
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>

              {errors.department && (
                <p className="field-error">{errors.department}</p>
              )}
            </div>

            {/* Year of Study */}
            <div className="form-group">
              <label htmlFor="year">Year of study</label>

              <input
                id="year"
                name="year"
                type="number"
                min="1"
                max="6"
                placeholder="Example: 2"
                value={formData.year}
                onChange={handleChange}
                aria-invalid={!!errors.year}
              />

              {errors.year && (
                <p className="field-error">{errors.year}</p>
              )}
            </div>

            {/* Optional Password */}
            <div className="form-group">
              <label htmlFor="password">
                Create a demo password (optional)
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password input example"
                value={formData.password}
                onChange={handleChange}
              />

              <p className="field-hint">
                This is a finishing example only; no password is saved or sent.
              </p>
            </div>

            {/* Attendance */}
            <fieldset className="form-group attendance-group">
              <legend>How will you attend?</legend>

              <label className="radio-option">
                <input
                  type="radio"
                  name="attendance"
                  value="In person"
                  checked={formData.attendance === "In person"}
                  onChange={handleChange}
                />
                <span>In person</span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="attendance"
                  value="Online"
                  checked={formData.attendance === "Online"}
                  onChange={handleChange}
                />
                <span>Online</span>
              </label>
            </fieldset>

            {/* Event Selection */}
            <div className="form-group event-group">
              <label htmlFor="event">
                Choose an event <span>*</span>
              </label>

              <select
                id="event"
                name="event"
                value={formData.event}
                onChange={handleChange}
                aria-invalid={!!errors.event}
              >
                <option value="">Select a campus event</option>
                <option value="Technical Workshop">
                  Technical Workshop
                </option>
                <option value="Hackathon">Hackathon</option>
                <option value="Paper Presentation">
                  Paper Presentation
                </option>
                <option value="Technical Quiz">Technical Quiz</option>
                <option value="Cyber Security Seminar">
                  Cyber Security Seminar
                </option>
              </select>

              {errors.event && (
                <p className="field-error">{errors.event}</p>
              )}
            </div>

          </div>

          {/* Accessibility Checkbox */}
          <div className="accessibility-option">
            <label>
              <input
                type="checkbox"
                name="accessibility"
                checked={formData.accessibility}
                onChange={handleChange}
              />

              <span>
                I would like the team to contact me about accessibility support.
              </span>
            </label>
          </div>

          {/* Optional Message */}
          <div className="form-group message-group">
            <label htmlFor="message">Message (optional)</label>

            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Any questions or notes for the event team?"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Register for Event
            </button>

            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>

        {/* Success Summary */}
        {submitted && (
          <section className="success-summary" aria-live="polite">
            <h2>Registration Successful!</h2>

            <p><strong>Student name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Department:</strong> {formData.department}</p>
            <p><strong>Year of study:</strong> {formData.year}</p>
            <p><strong>Attendance:</strong> {formData.attendance}</p>
            <p><strong>Event:</strong> {formData.event}</p>

            {formData.accessibility && (
              <p>Accessibility support requested.</p>
            )}

            {formData.message.trim() && (
              <p><strong>Message:</strong> {formData.message}</p>
            )}
          </section>
        )}
      </section>
    </main>
  );
}

export default RegistrationForm;
