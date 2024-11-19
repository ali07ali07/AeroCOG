const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Mailgun = require("mailgun.js");
const formData = require("form-data");

admin.initializeApp();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: functions.config().mailgun.api_key,
});

exports.sendAppointmentConfirmation = functions.firestore
    .document("appointments/{appointmentId}")
    .onCreate(async (snap) => {
      const appointment = snap.data();
      console.log("Appointment data:", appointment);

      const {userName, userEmail, expertName, date, time} = appointment;
      const whatsappNumber = appointment.whatsappNumber || "N/A";
      const expertEmail = appointment.expertEmail || "N/A";
      if (!userName || !userEmail || !expertName || !date || !time) {
        console.error("Missing required fields", appointment);
        return null;
      }


      const message = {
        from: "appointments@aerocog.tech",
        to: userEmail,
        subject: `Appointment Confirmation with ${expertName} - AeroCOG`,
        html: `
        <p>Dear ${userName},</p>
        
        <p>Thank you for booking an appointment on AeroCOG.</p>
        
        <p>Your appointment has been confirmed with ${expertName}.</p>
        <br>
        <hr>
        
        <h3>Appointment Details:</h3>
        <ul>
          <li><strong>Expert:</strong> ${expertName}</li>
          <br>
          <li><strong>Date:</strong> ${date}, UTC</li>
          <br>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
        <br>
        <p>If Expert is not available at the time of appointment, 
        you will be notified. on the following 
        WhatsApp number:" ${whatsappNumber} ".
        </p>
        <p>Looking forward to seeing you soon!</p>
        <br>

        <p>Best regards,</p>
        <p>AeroCOG Team</p>

        <hr>
        <br>
        <br>
        <p style="color:red;">
          <strong>Disclaimer:</strong>
          This appointment is subject to the terms and conditions of AeroCOG. 
           For any inquiries or to reschedule, please visit 
           <a href="https://aerocog.tech">aerocog.tech</a>
        </p>

        <p>Thank you for choosing AeroCOG for your consultation needs.</p>
        <br>
        <p>
          For support, please contact us at 
          <a href="mailto:suppot@aerocog.tech">Support</a>
        </p>
        <p>© 2025 AeroCOG. All rights reserved.</p>
      `,
      };

      // Message for the expert

      const expertMessage = {
        from: "appointments@aerocog.tech",
        to: expertEmail,
        subject: `New Appointment Scheduled with ${userName} - AeroCOG`,
        html: `
          <p>Dear ${expertName},</p>
          
          <p>You have a new appointment scheduled through AeroCOG.</p>
          
          <h3>Appointment Details:</h3>
          <ul>
            <li><strong>User:</strong> ${userName}</li>
            <br>
            <li><strong>Date:</strong> ${date}, UTC</li>
            <br>
            <li><strong>Time:</strong> ${time}</li>
            <br>
            <li><strong>User Email:</strong> ${userEmail}</li>
            <br>
            <li><strong>WhatsApp Number:</strong> ${whatsappNumber}</li>
          </ul>
          <br>
  
          <p>Kindly prepare for this appointment and let the user know in case of any changes.</p>
          <p>For any issues, contact AeroCOG support.</p>
  
          <p>Best regards,</p>
          <p>AeroCOG Team</p>
  
          <hr>
          <br>
          <p style="color:red;">
            <strong>Disclaimer:</strong>
            This appointment is subject to the terms and conditions of AeroCOG.
          </p>
  
          <p>Thank you for being part of AeroCOG's expert network.</p>
          <br>
          <p>© 2025 AeroCOG. All rights reserved.</p>
        `,
      };

      try {
      // Send the email
        const response = await mg.messages.create("aerocog.tech", message);
        console.log("Email sent successfully:", response);

        // Send email to expert
        if (expertEmail !== "N/A") {
          const expertResponse = await mg.messages.create("aerocog.tech", expertMessage);
          console.log("Email sent successfully to expert:", expertResponse);
        } else {
          console.warn("Expert email not available, skipping email to expert.");
        }

        return null;
      } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
      }
    });
