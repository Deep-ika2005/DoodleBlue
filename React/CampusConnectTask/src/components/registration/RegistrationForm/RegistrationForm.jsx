
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./RegistrationForm.css";
import { Button, Input, Select, Textarea } from "../../common";
import { createRegistration, getEvents } from "../../../services/events";

function RegistrationForm() {
  const location = useLocation();
  const studentNameRef = useRef(null);
  const [highlightStudentName, setHighlightStudentName] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsLoadError, setEventsLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let active = true;
    getEvents()
      .then((eventData) => {
        if (active) setEvents(eventData);
      })
      .catch(() => {
        if (active) setEventsLoadError("Could not load events. Make sure the events API is running.");
      })
      .finally(() => {
        if (active) setEventsLoading(false);
      });

    return () => { active = false; };
  }, []);

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

  async function handleSubmit(e) {
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
      newErrors.year = "Please enter a valid year of study (1â€“6).";
    }

    if (!formData.event || !events.some((event) => String(event.id) === formData.event)) {
      newErrors.event = "Please select an event.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    const selectedEvent = events.find((event) => String(event.id) === formData.event);
    setSubmitting(true);
    setSubmitError("");
    try {
      await createRegistration({
        studentName: formData.name.trim(),
        email: formData.email.trim(),
        department: formData.department,
        year: Number(formData.year),
        attendance: formData.attendance,
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        accessibility: formData.accessibility,
        message: formData.message.trim(),
        submittedAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(false);
      setSubmitError("Could not submit your registration. Please try again.");
    } finally {
      setSubmitting(false);
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
    setSubmitError("");
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
          <p className="required-note"><span aria-hidden="true">*</span> Required fields</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">

            {/* Student Name */}
            <div className="form-group">
              <label htmlFor="name">
                Student name <span className="required-marker" aria-hidden="true">*</span>
              </label>

              <Input
                id="name"
                ref={studentNameRef}
                className={highlightStudentName ? "name-input-highlight" : ""}
                name="name"
                type="text"
                required
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
                Email address <span className="required-marker" aria-hidden="true">*</span>
              </label>

              <Input
                id="email"
                name="email"
                type="email"
                required
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
                Department <span className="required-marker" aria-hidden="true">*</span>
              </label>

              <Select
                id="department"
                name="department"
                required
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
              </Select>

              {errors.department && (
                <p className="field-error">{errors.department}</p>
              )}
            </div>

            {/* Year of Study */}
            <div className="form-group">
              <label htmlFor="year">
                Year of study <span className="required-marker" aria-hidden="true">*</span>
              </label>

              <Input
                id="year"
                name="year"
                type="number"
                required
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

              <Input
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
                <Input
                  type="radio"
                  name="attendance"
                  value="In person"
                  checked={formData.attendance === "In person"}
                  onChange={handleChange}
                />
                <span>In person</span>
              </label>

              <label className="radio-option">
                <Input
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
                Choose an event <span className="required-marker" aria-hidden="true">*</span>
              </label>

              <Select
                id="event"
                name="event"
                required
                value={formData.event}
                onChange={handleChange}
                aria-invalid={!!errors.event}
                disabled={eventsLoading || events.length === 0}
              >
                <option value="">
                  {eventsLoading ? "Loading campus events..." : "Select a campus event"}
                </option>
                {events.map((event) => (
                  <option key={event.id} value={String(event.id)}>
                    {event.title}
                  </option>
                ))}
              </Select>

              {eventsLoadError && <p className="field-error" role="alert">{eventsLoadError}</p>}
              {!eventsLoading && !eventsLoadError && events.length === 0 && (
                <p className="field-error">No events are currently available.</p>
              )}

              {errors.event && (
                <p className="field-error">{errors.event}</p>
              )}
            </div>

          </div>

          {/* Accessibility Checkbox */}
          <div className="accessibility-option">
            <label>
              <Input
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

            <Textarea
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
            <Button type="submit" className="submit-button" disabled={submitting || eventsLoading || events.length === 0}>
              {submitting ? "Submitting..." : "Register for Event"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="reset-button"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
          {submitError && <p className="field-error" role="alert">{submitError}</p>}
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
            <p><strong>Event:</strong> {events.find((event) => String(event.id) === formData.event)?.title}</p>

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

