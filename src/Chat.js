import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import './Chat.css';

const Chat = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate()

  const chatContainerRef = useRef(null)

  useEffect(() => {
    console.log({token: localStorage.getItem('access_token')})
    if (localStorage.getItem('access_token') == null || localStorage.getItem('access_token') == '') {
      navigate('/login')
    }
  })

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [messages])

  const sendMessage = async () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
  });
    if (!input.trim()) return;


    const userMessage = { message: input };
    setMessages([...messages, { user: "user", text: input }]);
    setInput("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/query_chatbot/v1/api/chat/messages", userMessage, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` }
      });
      let _response = await response.data
      setMessages([...messages, { user: "user", text: input }, { user: "bot", text: _response.botResponse.response.reply, engineers: _response.engineers }]);
    } catch (error) {
      console.error("Chat failed:", error);
    }
  }

  // let messages = [{ user: "user", text: 'hi' }, { user: "bot", text: 'hello, how can i assist you', engineers: [
  //       {
  //           "resumeId": "335a2826-60d8-478c-8431-718f74dc55a1",
  //           "userId": "36bcf8e4-1e31-43cb-a5df-b9fd224b32a5",
  //           "name": "Elizabeth Wilson",
  //           "email": "[\"patriciajohnson42@outlook.com\"]",
  //           "phone": "[\"+1-468-472-8338\"]",
  //           "fullTimeStatus": "no",
  //           "workAvailability": "immediately",
  //           "fullTimeSalaryCurrency": "USD",
  //           "fullTimeSalary": "1845",
  //           "partTimeSalaryCurrency": "USD",
  //           "partTimeSalary": "922.5",
  //           "fullTimeAvailability": null,
  //           "partTimeAvailability": 0,
  //           "preferredRole": "Backend Engineer",
  //           "WorkExperience": "Bistro.sk,RMS a.s., U.S. Steel,Tesco Stores SR, a.s.",
  //           "Education": "Bachelor's Degree,High School Diploma",
  //           "Skills": "C#,HTML/CSS,Python",
  //           "location": "{\"city\": \"Indianapolis\", \"country\": \"USA\"}"
  //       },
  //       {
  //           "resumeId": "5754a22c-f3dc-490c-b490-1e611b8c7663",
  //           "userId": "0d584b8e-6f0b-11ee-8bff-42010a400007",
  //           "name": "Jennifer Anderson",
  //           "email": "[\"josephthomas31@mail.com\"]",
  //           "phone": "[\"+1-326-660-6859\"]",
  //           "fullTimeStatus": "yes",
  //           "workAvailability": "immediately",
  //           "fullTimeSalaryCurrency": "USD",
  //           "fullTimeSalary": "7163",
  //           "partTimeSalaryCurrency": "USD",
  //           "partTimeSalary": "3581.5",
  //           "fullTimeAvailability": 0,
  //           "partTimeAvailability": null,
  //           "preferredRole": "Designer",
  //           "WorkExperience": "AVIG Techdraitions Pvt. Ltd,M-Tech Innovations Ltd.,Tecnipplex IT Solution Pvt. Ltd. Applex Group",
  //           "Education": "BE. Computer Engineering,Diploma in Computer Engineering,HSC [Science],SSC [Regular]",
  //           "Skills": "Adobe,Excel,Figma,HTML/CSS",
  //           "location": "{\"city\": \"El Paso\", \"country\": \"USA\"}"
  //       },
  //       {
  //           "resumeId": "ce113e26-97c8-406b-aea5-867f3acb43d1",
  //           "userId": "1cdbb4bf-6ea7-11ee-8bff-42010a400007",
  //           "name": "William Smith",
  //           "email": "[\"karenmiller60@yahoo.com\"]",
  //           "phone": "[\"+1-896-512-4604\"]",
  //           "fullTimeStatus": "yes",
  //           "workAvailability": "immediately",
  //           "fullTimeSalaryCurrency": "USD",
  //           "fullTimeSalary": "8967",
  //           "partTimeSalaryCurrency": "USD",
  //           "partTimeSalary": "4483.5",
  //           "fullTimeAvailability": 0,
  //           "partTimeAvailability": null,
  //           "preferredRole": "Frontend Engineer",
  //           "WorkExperience": "AccioJob",
  //           "Education": "10th,12th,Bachelor in Computer Science (BCA)",
  //           "Skills": "Bootstrap,HTML/CSS,JavaScript,Powerpoint",
  //           "location": "{\"city\": \"Dallas\", \"country\": \"USA\"}"
  //       },
  //       {
  //           "resumeId": "d5f32277-9387-407f-97c5-ed372f9f9584",
  //           "userId": "19cfea23-6f0a-11ee-8bff-42010a400007",
  //           "name": "David Moore",
  //           "email": "[\"barbaramoore17@outlook.com\"]",
  //           "phone": "[\"+1-942-356-4837\"]",
  //           "fullTimeStatus": "both",
  //           "workAvailability": "immediately",
  //           "fullTimeSalaryCurrency": "USD",
  //           "fullTimeSalary": "4925",
  //           "partTimeSalaryCurrency": "USD",
  //           "partTimeSalary": "2462.5",
  //           "fullTimeAvailability": null,
  //           "partTimeAvailability": null,
  //           "preferredRole": "Designer",
  //           "WorkExperience": "Contus Tech,KRDS,Toast Tab India,xtraCHEF by Toast,Zoho Corporation",
  //           "Education": "Bachelor of Engineering",
  //           "Skills": "Adobe,Bootstrap,Figma,HTML/CSS",
  //           "location": "{\"city\": \"Columbus\", \"country\": \"USA\"}"
  //       },
  //       {
  //           "resumeId": "f08ab679-819a-46d0-8acc-f1014ca6d230",
  //           "userId": "1a1590a7-4b57-43cd-a36d-8a2ff54aa323",
  //           "name": "Mary Rodriguez",
  //           "email": "[\"jenniferhernandez27@outlook.com\"]",
  //           "phone": "[\"+1-457-646-9673\"]",
  //           "fullTimeStatus": "yes",
  //           "workAvailability": "oneMonth",
  //           "fullTimeSalaryCurrency": "USD",
  //           "fullTimeSalary": "9855",
  //           "partTimeSalaryCurrency": "USD",
  //           "partTimeSalary": "4927.5",
  //           "fullTimeAvailability": null,
  //           "partTimeAvailability": null,
  //           "preferredRole": "",
  //           "WorkExperience": "AWS",
  //           "Education": "Bachelor of Technology,Secondary (X - ICSE BOARD),Senior Secondary (XII - ISC BOARD)",
  //           "Skills": "Bootstrap,Django,HTML/CSS,Python",
  //           "location": "{\"city\": \"San Diego\", \"country\": \"USA\"}"
  //       },
  //       {
  //           "resumeId": "fb0d6dce-b2bb-4237-abb5-4625c00ce6d6",
  //           "userId": "28831f1b-6ec7-11ee-8bff-42010a400007",
  //           "name": "Mary Martin",
  //           "email": "[\"barbaramoore55@mail.com\"]",
  //           "phone": "[\"+1-971-236-6687\"]",
  //           "fullTimeStatus": "yes",
  //           "workAvailability": "immediately",
  //           "fullTimeSalaryCurrency": "USD",
  //           "fullTimeSalary": "2334",
  //           "partTimeSalaryCurrency": "USD",
  //           "partTimeSalary": "1167",
  //           "fullTimeAvailability": null,
  //           "partTimeAvailability": null,
  //           "preferredRole": "Frontend Engineer",
  //           "WorkExperience": "Flipkart",
  //           "Education": "B. Tech. in Computer Science & Engineering,Higher Secondary,Secondary",
  //           "Skills": "Bootstrap,C,C++,JavaScript,React",
  //           "location": "{\"city\": \"San Antonio\", \"country\": \"USA\"}"
  //       }
  //   ] }]

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chatbot</div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user}`}>
            
            {msg.engineers && msg.engineers.length ?
              (
                <>
                <div className="chat-body-card">
                  <div className="text">{msg.text}</div>
                  { msg.engineers.map((e, i) => (
                  <div class="card-container">
                    <div class="card">
                      {/* <div class="card-header">
                        <img src="https://via.placeholder.com/150" alt="User Avatar" class="avatar" />
                      </div> */}
                      <div class="card-body">
                        <p class="card-text"><strong>Name:</strong> {e.name}</p>
                        <p class="card-text"><strong>Email:</strong> {JSON.parse(e.email)[0]}</p>
                        <p class="card-text"><strong>Full time status:</strong> {e.fullTimeStatus}</p>
                        <p class="card-text"><strong>Work Availability:</strong> {e.workAvailability}</p>
                        <p class="card-text"><strong>Full TIme Salary:</strong> {e.fullTimeSalary} {e.fullTimeSalaryCurrency}</p>
                        <p class="card-text"><strong>Part TIme Salary:</strong> {e.partTimeSalary} {e.partTimeSalaryCurrency}</p>
                        <p class="card-text"><strong>Preferred Role:</strong> {e.preferredRole}</p>
                        <p class="card-text"><strong>Work Excperience:</strong> {e.WorkExperience}</p>
                        <p class="card-text"><strong>Education:</strong> {e.Education}</p>
                        <p class="card-text"><strong>Skills:</strong> {e.Skills}</p>
                        <p class="card-text"><strong>City:</strong> {JSON.parse(e.location).city}</p>
                        <p class="card-text"><strong>Country:</strong> {JSON.parse(e.location).country}</p>
                      </div>
                    </div>
                  </div>

                  )) }
                  
                  </div>
                </>
              ) : (
                <>
                  <div className="text">{msg.text}</div>
                </>
              )}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chat-input"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default Chat;
