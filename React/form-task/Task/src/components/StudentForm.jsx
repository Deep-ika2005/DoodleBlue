import { useState } from "react";
import StudentDetails from "./StudentDetails";

function StudentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [attendance, setAttendance] = useState("In person");
  const [event, setEvent] = useState("");
  const [accessibility, setAccessibility] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    alert("Registration successful!");

    console.log({
      name,
      email,
      department,
      year,
      password,
      attendance,
      event,
      accessibility,
      message,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="tagline">SAVE YOUR SEAT</p>
      <h1>Student Event Registration</h1>
      <p>Complete the required fields to register for a campus event.</p>

      <StudentDetails
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        department={department}
        setDepartment={setDepartment}
        year={year}
        setYear={setYear}
        password={password}
        setPassword={setPassword}
        attendance={attendance}
        setAttendance={setAttendance}
        event={event}
        setEvent={setEvent}
        accessibility={accessibility}
        setAccessibility={setAccessibility}
        message={message}
        setMessage={setMessage}
      />

      <button type="submit">Register Now</button>
    </form>
  );
}

export default StudentForm;