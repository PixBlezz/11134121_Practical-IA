# 11134121_Practical-IA
# functions of the system
Register Patients:

Endpoint: POST /patients/register
Usage: Allows the front-desk executive to register new patients by providing their details.
Start an Encounter:

The POST /patients/register endpoint facilitates the registration of new patients by the front-desk executive. This endpoint enables the submission of essential patient information, including surname, other names, gender, phone number, residential address, emergency contact details, and the relationship of the emergency contact with the patient. By posting this information to the endpoint, the system creates a comprehensive patient profile. This functionality streamlines the patient registration process, ensuring that crucial details are captured accurately, contributing to the efficient management of electronic medical records at the University of Ghana Medical Center (UGMC).

Endpoint: POST /encounters/start
Usage: Enables the front-desk executive to initiate a patient encounter (visitation) with details like date, time, and encounter type.
Submit Patient Vitals:

Endpoint: POST /nurse/vitals
Usage: Permits the nurse to submit patient vitals such as blood pressure, temperature, pulse, and spo2.
View List of Patients:

Endpoint: GET /doctor/patients
Usage: Allows the doctor to retrieve a list of all registered patients.
View Patient Details:

Endpoint: GET /doctor/patients/:patientId
Usage: Enables the doctor to view detailed information about a specific patient using their ID.
