function StudentDetails(props) {
  return (
    <div className="grid">
      <div>
        <label>Student name *</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
          required
        />
        <small>Please enter your name.</small>
      </div>

      <div>
        <label>Email address *</label>
        <input
          type="email"
          placeholder="student@example.com"
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
          required
        />
        <small>Please enter your email address.</small>
      </div>

      <div>
        <label>Department *</label>
        <select
          value={props.department}
          onChange={(e) => props.setDepartment(e.target.value)}
          required
        >
          <option value="">Select your department</option>
          <option value="CSE">Computer Science</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="IT">Information Technology</option>
          <option value="ECE">Electronics and Communication</option>
          <option value="EEE">Electrical and Electronics</option>
        </select>
        <small>Please select your department.</small>
      </div>

      <div>
        <label>Year of study *</label>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Example: 2"
          value={props.year}
          onChange={(e) => props.setYear(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Create a demo password (optional)</label>
        <input
          type="password"
          placeholder="Password input example"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
        />
        <small>Front-end demonstration only.</small>
      </div>

      <div>
        <label>How will you attend?</label>
        <label className="option">
          <input
            type="radio"
            value="In person"
            checked={props.attendance === "In person"}
            onChange={(e) => props.setAttendance(e.target.value)}
          />
          In person
        </label>

        <label className="option">
          <input
            type="radio"
            value="Online"
            checked={props.attendance === "Online"}
            onChange={(e) => props.setAttendance(e.target.value)}
          />
          Online
        </label>
      </div>

      <div className="full">
        <label>Choose an event *</label>
        <select
          value={props.event}
          onChange={(e) => props.setEvent(e.target.value)}
          required
        >
          <option value="">Select a campus event</option>
          <option value="Technical Workshop">Technical Workshop</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Cyber Security Seminar">
            Cyber Security Seminar
          </option>
          <option value="Cultural Fest">Cultural Fest</option>
        </select>
        <small>Please select an event.</small>
      </div>

      <div className="full">
        <label className="option">
          <input
            type="checkbox"
            checked={props.accessibility}
            onChange={(e) => props.setAccessibility(e.target.checked)}
          />
          I would like the team to contact me about accessibility support.
        </label>
      </div>

      <div className="full">
        <label>Message (optional)</label>
        <textarea
          rows="5"
          placeholder="Any questions or notes for the event team?"
          value={props.message}
          onChange={(e) => props.setMessage(e.target.value)}
        />
      </div>
    </div>
  );
}

export default StudentDetails;