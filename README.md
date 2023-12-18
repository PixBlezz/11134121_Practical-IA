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

The POST /encounters/start endpoint empowers the front-desk executive to initiate patient encounters, capturing critical visitation details. This functionality allows the executive to record the date, time, and type of encounter, such as Emergency, OPD, or Specialist Care. By utilizing this endpoint, the system seamlessly integrates encounter initiation into the workflow, ensuring comprehensive documentation of patient interactions. This feature enhances the University of Ghana Medical Center's (UGMC) ability to track and manage patient visits systematically, providing a valuable tool for healthcare professionals to deliver timely and effective care within the electronic medical record system.

Endpoint: POST /nurse/vitals
Usage: Permits the nurse to submit patient vitals such as blood pressure, temperature, pulse, and spo2.
View List of Patients:

The POST /nurse/vitals endpoint facilitates the submission of crucial patient vitals by nursing staff. This feature empowers nurses to record and store essential health metrics, including blood pressure, temperature, pulse rate, and oxygen saturation (spo2). By utilizing this endpoint, healthcare professionals can efficiently input and manage real-time patient vital signs within the Electronic Medical Record System. This functionality enhances the nurse's ability to monitor and respond to patient health, ensuring accurate and up-to-date information for delivering optimal care at the University of Ghana Medical Center (UGMC). The endpoint serves as a pivotal tool in maintaining comprehensive electronic health records for effective healthcare management.

Endpoint: GET /doctor/patients
Usage: Allows the doctor to retrieve a list of all registered patients.
View Patient Details:
The GET /doctor/patients endpoint serves as a vital tool for doctors, offering seamless access to a comprehensive list of all registered patients. This functionality enables doctors to retrieve essential patient information efficiently, supporting informed decision-making and streamlined patient management. By accessing this endpoint, healthcare professionals at the University of Ghana Medical Center (UGMC) can gain a holistic view of the patient population, facilitating timely interventions and personalized care plans. 

Endpoint: GET /doctor/patients/:patientId
Usage: Enables the doctor to view detailed information about a specific patient using their ID.
