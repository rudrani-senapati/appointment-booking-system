import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'

// Doctor Images
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
const doc16 = doc1
const doc17 = doc2


// Speciality Icons
import General_physician from './General_Physician.png'
import Gynecologist from './Gynecologist.png'
import Dermatologist from './Dermatologist.png'
import Pediatricians from './Pediatricians.png'
import Neurologist from './Neurologist.png'
import Gastroenterologist from './Gastroenterologist.png'
import Cardiologist from './Cardiologist.png'
import Orthopedic from './Orthopedic.png'
import Ophthalmologist from './Ophthalmologist.png'
import ENT_Specialist from './ENT_Specialist.png'
import Dentist from './Dentist.png'
import Pulmonologist from './Pulmonologist.png'

export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
    {
        speciality: 'Cardiologist',
        image: Cardiologist
    },
    {
        speciality: 'Orthopedic',
        image: Orthopedic
    },
    {
        speciality: 'Ophthalmologist',
        image: Ophthalmologist

    },
    {
        speciality: 'ENT Specialist',
        image: ENT_Specialist
    },
    {
        speciality: 'Dentist',
        image: Dentist
    },
    {
        speciality: 'Pulmonologist',
        image: Pulmonologist
    }
]


export const doctors = [

    // =====================================================
    // GENERAL PHYSICIANS
    // =====================================================

    {
        _id: 'doc1',
        name: 'Dr. Ananya Sharma',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Ananya Sharma provides comprehensive primary healthcare with a focus on preventive medicine, early diagnosis, and personalized treatment.',
        fees: 500,
        address: {
            line1: 'Saheed Nagar',
            line2: 'Bhubaneswar, Odisha'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Rohan Patel',
        image: doc2,
        speciality: 'General physician',
        degree: 'MBBS, MD',
        experience: '7 Years',
        about: 'Dr. Rohan Patel specializes in routine health checkups, chronic disease management, preventive healthcare, and lifestyle counseling.',
        fees: 500,
        address: {
            line1: 'Satellite Road',
            line2: 'Ahmedabad, Gujarat'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Arjun Mehta',
        image: doc3,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Arjun Mehta provides patient-centered primary care for common illnesses, infections, lifestyle conditions, and preventive health.',
        fees: 400,
        address: {
            line1: 'Andheri West',
            line2: 'Mumbai, Maharashtra'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Priya Nair',
        image: doc4,
        speciality: 'General physician',
        degree: 'MBBS, MD',
        experience: '10 Years',
        about: 'Dr. Priya Nair provides comprehensive medical consultations with expertise in diabetes, hypertension, infections, and preventive care.',
        fees: 600,
        address: {
            line1: 'Indiranagar',
            line2: 'Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Vivek Kumar',
        image: doc5,
        speciality: 'General physician',
        degree: 'MBBS, MD',
        experience: '6 Years',
        about: 'Dr. Vivek Kumar focuses on accurate diagnosis, preventive medicine, lifestyle management, and comprehensive primary care.',
        fees: 450,
        address: {
            line1: 'Sector 62',
            line2: 'Noida, Uttar Pradesh'
        }
    },

    // =====================================================
    // GYNECOLOGISTS
    // =====================================================

    {
        _id: 'doc6',
        name: 'Dr. Sneha Reddy',
        image: doc6,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD',
        experience: '9 Years',
        about: 'Dr. Sneha Reddy provides comprehensive women’s healthcare including reproductive health, menstrual disorders, and pregnancy care.',
        fees: 700,
        address: {
            line1: 'Banjara Hills',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Neha Gupta',
        image: doc7,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS',
        experience: '7 Years',
        about: 'Dr. Neha Gupta specializes in women’s health, hormonal disorders, pregnancy counseling, and preventive gynecology.',
        fees: 600,
        address: {
            line1: 'Rajouri Garden',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Kavya Menon',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Kavya Menon provides empathetic care for women with a focus on reproductive health and preventive medicine.',
        fees: 650,
        address: {
            line1: 'Vyttila',
            line2: 'Kochi, Kerala'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Pooja Mishra',
        image: doc9,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS',
        experience: '6 Years',
        about: 'Dr. Pooja Mishra focuses on menstrual health, pregnancy care, reproductive disorders, and comprehensive women’s wellness.',
        fees: 600,
        address: {
            line1: 'Gomti Nagar',
            line2: 'Lucknow, Uttar Pradesh'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Meera Iyer',
        image: doc10,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD',
        experience: '11 Years',
        about: 'Dr. Meera Iyer specializes in maternal healthcare, reproductive medicine, hormonal conditions, and preventive gynecology.',
        fees: 750,
        address: {
            line1: 'Adyar',
            line2: 'Chennai, Tamil Nadu'
        }
    },

    // =====================================================
    // DERMATOLOGISTS
    // =====================================================

    {
        _id: 'doc11',
        name: 'Dr. Rahul Verma',
        image: doc11,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Rahul Verma specializes in acne, pigmentation, allergies, hair disorders, and comprehensive skin care.',
        fees: 600,
        address: {
            line1: 'Vasant Kunj',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Ishita Das',
        image: doc12,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD',
        experience: '6 Years',
        about: 'Dr. Ishita Das provides advanced dermatological care for acne, eczema, pigmentation, allergies, and hair problems.',
        fees: 550,
        address: {
            line1: 'Salt Lake',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Aditya Joshi',
        image: doc13,
        speciality: 'Dermatologist',
        degree: 'MBBS, DDVL',
        experience: '7 Years',
        about: 'Dr. Aditya Joshi focuses on clinical dermatology, cosmetic skin care, acne treatment, and hair disorders.',
        fees: 500,
        address: {
            line1: 'Kothrud',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Riya Kapoor',
        image: doc14,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD',
        experience: '9 Years',
        about: 'Dr. Riya Kapoor specializes in chronic skin conditions, cosmetic dermatology, pigmentation, and preventive skin care.',
        fees: 650,
        address: {
            line1: 'DLF Phase 4',
            line2: 'Gurugram, Haryana'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Nikhil Sinha',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD',
        experience: '10 Years',
        about: 'Dr. Nikhil Sinha provides comprehensive dermatological treatment for skin, hair, and nail disorders.',
        fees: 700,
        address: {
            line1: 'Patliputra Colony',
            line2: 'Patna, Bihar'
        }
    },

    // =====================================================
    // PEDIATRICIANS
    // =====================================================

    {
        _id: 'doc16',
        name: 'Dr. Saurav Das',
        image: doc16,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD',
        experience: '9 Years',
        about: 'Dr. Saurav Das specializes in child health, growth monitoring, nutrition, vaccination, and childhood illnesses.',
        fees: 600,
        address: {
            line1: 'Saheed Nagar',
            line2: 'Bhubaneswar, Odisha'
        }
    },
    {
        _id: 'doc17',
        name: 'Dr. Aditi Singh',
        image: doc17,
        speciality: 'Pediatrician',
        degree: 'MBBS, DCH',
        experience: '6 Years',
        about: 'Dr. Aditi Singh provides compassionate pediatric care with a focus on childhood development, nutrition, and preventive healthcare.',
        fees: 500,
        address: {
            line1: 'Kankarbagh',
            line2: 'Patna, Bihar'
        }
    },
    {
        _id: 'doc18',
        name: 'Dr. Rohit Sharma',
        image: doc1,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD',
        experience: '11 Years',
        about: 'Dr. Rohit Sharma specializes in pediatric infections, childhood nutrition, immunization, and developmental assessment.',
        fees: 650,
        address: {
            line1: 'Dwarka',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc19',
        name: 'Dr. Tanya Roy',
        image: doc2,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD',
        experience: '7 Years',
        about: 'Dr. Tanya Roy provides child-focused medical care including growth monitoring, nutrition, and preventive health services.',
        fees: 550,
        address: {
            line1: 'New Town',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc20',
        name: 'Dr. Karan Malhotra',
        image: doc3,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD',
        experience: '12 Years',
        about: 'Dr. Karan Malhotra provides comprehensive pediatric care for childhood diseases, allergies, nutrition, and development.',
        fees: 700,
        address: {
            line1: 'Sector 17',
            line2: 'Chandigarh'
        }
    },

    // =====================================================
    // NEUROLOGISTS
    // =====================================================

    {
        _id: 'doc21',
        name: 'Dr. Amit Agarwal',
        image: doc4,
        speciality: 'Neurologist',
        degree: 'MBBS, MD, DM',
        experience: '13 Years',
        about: 'Dr. Amit Agarwal specializes in neurological disorders, stroke management, migraine, epilepsy, and nerve conditions.',
        fees: 900,
        address: {
            line1: 'Civil Lines',
            line2: 'Jaipur, Rajasthan'
        }
    },
    {
        _id: 'doc22',
        name: 'Dr. Shreya Banerjee',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS, MD, DM',
        experience: '10 Years',
        about: 'Dr. Shreya Banerjee provides comprehensive neurological care for headaches, seizures, stroke, and movement disorders.',
        fees: 850,
        address: {
            line1: 'Park Street',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc23',
        name: 'Dr. Manish Kulkarni',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS, MD, DM',
        experience: '15 Years',
        about: 'Dr. Manish Kulkarni specializes in complex neurological conditions, cognitive disorders, epilepsy, and stroke care.',
        fees: 1000,
        address: {
            line1: 'Baner',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc24',
        name: 'Dr. Swati Rao',
        image: doc7,
        speciality: 'Neurologist',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Swati Rao focuses on migraine management, neurological diagnosis, and comprehensive nervous system care.',
        fees: 800,
        address: {
            line1: 'Jubilee Hills',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc25',
        name: 'Dr. Deepak Bhatia',
        image: doc8,
        speciality: 'Neurologist',
        degree: 'MBBS, MD, DM',
        experience: '14 Years',
        about: 'Dr. Deepak Bhatia provides advanced neurological consultation for stroke, epilepsy, headaches, and nerve disorders.',
        fees: 950,
        address: {
            line1: 'Vasant Vihar',
            line2: 'New Delhi, Delhi'
        }
    },

    // =====================================================
    // GASTROENTEROLOGISTS
    // =====================================================

    {
        _id: 'doc26',
        name: 'Dr. Rajiv Menon',
        image: doc9,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD, DM',
        experience: '14 Years',
        about: 'Dr. Rajiv Menon specializes in digestive disorders, liver diseases, endoscopy, and gastrointestinal health.',
        fees: 900,
        address: {
            line1: 'Koramangala',
            line2: 'Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc27',
        name: 'Dr. Pankaj Gupta',
        image: doc10,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD',
        experience: '11 Years',
        about: 'Dr. Pankaj Gupta provides specialized care for digestive disorders, acid reflux, liver problems, and intestinal conditions.',
        fees: 800,
        address: {
            line1: 'South Extension',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc28',
        name: 'Dr. Nitin Shah',
        image: doc11,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD, DM',
        experience: '12 Years',
        about: 'Dr. Nitin Shah specializes in gastrointestinal diseases, liver health, endoscopy, and digestive disorders.',
        fees: 850,
        address: {
            line1: 'Vastrapur',
            line2: 'Ahmedabad, Gujarat'
        }
    },
    {
        _id: 'doc29',
        name: 'Dr. Swati Mishra',
        image: doc12,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Swati Mishra provides patient-focused treatment for digestive health, gastric disorders, and liver conditions.',
        fees: 750,
        address: {
            line1: 'Kalyani Nagar',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc30',
        name: 'Dr. Harish Reddy',
        image: doc13,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD, DM',
        experience: '16 Years',
        about: 'Dr. Harish Reddy provides advanced gastroenterology consultation and treatment for complex digestive conditions.',
        fees: 950,
        address: {
            line1: 'Madhapur',
            line2: 'Hyderabad, Telangana'
        }
    },

    // =====================================================
    // CARDIOLOGISTS
    // =====================================================

    {
        _id: 'doc31',
        name: 'Dr. Sandeep Kumar',
        image: doc14,
        speciality: 'Cardiologist',
        degree: 'MBBS, MD, DM',
        experience: '15 Years',
        about: 'Dr. Sandeep Kumar specializes in cardiac diagnostics, hypertension, coronary conditions, and preventive heart care.',
        fees: 1000,
        address: {
            line1: 'Saket',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc32',
        name: 'Dr. Kavita Deshmukh',
        image: doc15,
        speciality: 'Cardiologist',
        degree: 'MBBS, MD, DM',
        experience: '12 Years',
        about: 'Dr. Kavita Deshmukh provides expert cardiac care with a focus on hypertension, heart disease, and preventive cardiology.',
        fees: 900,
        address: {
            line1: 'Shivaji Nagar',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc33',
        name: 'Dr. Arvind Menon',
        image: doc16,
        speciality: 'Cardiologist',
        degree: 'MBBS, MD',
        experience: '10 Years',
        about: 'Dr. Arvind Menon specializes in cardiovascular risk management, hypertension, heart rhythm disorders, and cardiac screening.',
        fees: 850,
        address: {
            line1: 'Alwarpet',
            line2: 'Chennai, Tamil Nadu'
        }
    },
    {
        _id: 'doc34',
        name: 'Dr. Neeraj Kapoor',
        image: doc17,
        speciality: 'Cardiologist',
        degree: 'MBBS, MD, DM',
        experience: '17 Years',
        about: 'Dr. Neeraj Kapoor provides advanced cardiac consultations and comprehensive cardiovascular treatment.',
        fees: 1100,
        address: {
            line1: 'DLF Phase 2',
            line2: 'Gurugram, Haryana'
        }
    },
    {
        _id: 'doc35',
        name: 'Dr. Rakesh Mohanty',
        image: doc1,
        speciality: 'Cardiologist',
        degree: 'MBBS, MD, DM',
        experience: '13 Years',
        about: 'Dr. Rakesh Mohanty specializes in preventive cardiology, hypertension management, cardiac evaluation, and heart health.',
        fees: 900,
        address: {
            line1: 'Sahid Nagar',
            line2: 'Bhubaneswar, Odisha'
        }
    },

    // =====================================================
    // ORTHOPEDICS
    // =====================================================

    {
        _id: 'doc36',
        name: 'Dr. Rohit Verma',
        image: doc2,
        speciality: 'Orthopedic',
        degree: 'MBBS, MS',
        experience: '11 Years',
        about: 'Dr. Rohit Verma specializes in joint disorders, fractures, sports injuries, and orthopedic rehabilitation.',
        fees: 750,
        address: {
            line1: 'Gomti Nagar',
            line2: 'Lucknow, Uttar Pradesh'
        }
    },
    {
        _id: 'doc37',
        name: 'Dr. Abhishek Das',
        image: doc3,
        speciality: 'Orthopedic',
        degree: 'MBBS, MS',
        experience: '9 Years',
        about: 'Dr. Abhishek Das focuses on fracture management, joint pain, sports injuries, and musculoskeletal disorders.',
        fees: 700,
        address: {
            line1: 'Patia',
            line2: 'Bhubaneswar, Odisha'
        }
    },
    {
        _id: 'doc38',
        name: 'Dr. Sameer Joshi',
        image: doc4,
        speciality: 'Orthopedic',
        degree: 'MBBS, MS, DNB',
        experience: '14 Years',
        about: 'Dr. Sameer Joshi provides advanced orthopedic care for joint problems, fractures, sports injuries, and rehabilitation.',
        fees: 850,
        address: {
            line1: 'Wakad',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc39',
        name: 'Dr. Manas Patnaik',
        image: doc5,
        speciality: 'Orthopedic',
        degree: 'MBBS, MS',
        experience: '8 Years',
        about: 'Dr. Manas Patnaik specializes in orthopedic trauma, joint pain, sports injuries, and rehabilitation.',
        fees: 650,
        address: {
            line1: 'CDA Sector 9',
            line2: 'Cuttack, Odisha'
        }
    },
    {
        _id: 'doc40',
        name: 'Dr. Akash Mehra',
        image: doc6,
        speciality: 'Orthopedic',
        degree: 'MBBS, MS',
        experience: '12 Years',
        about: 'Dr. Akash Mehra provides comprehensive orthopedic treatment for joint disorders, fractures, and sports-related injuries.',
        fees: 800,
        address: {
            line1: 'Sector 44',
            line2: 'Chandigarh'
        }
    },

    // =====================================================
    // OPHTHALMOLOGISTS
    // =====================================================

    {
        _id: 'doc41',
        name: 'Dr. Shalini Rao',
        image: doc7,
        speciality: 'Ophthalmologist',
        degree: 'MBBS, MS',
        experience: '10 Years',
        about: 'Dr. Shalini Rao specializes in vision assessment, cataract care, refractive errors, and preventive eye care.',
        fees: 600,
        address: {
            line1: 'Madhapur',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc42',
        name: 'Dr. Anil Kumar',
        image: doc8,
        speciality: 'Ophthalmologist',
        degree: 'MBBS, MS',
        experience: '12 Years',
        about: 'Dr. Anil Kumar provides comprehensive eye examinations, cataract evaluation, glaucoma screening, and vision care.',
        fees: 650,
        address: {
            line1: 'Rohini',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc43',
        name: 'Dr. Ritu Agarwal',
        image: doc9,
        speciality: 'Ophthalmologist',
        degree: 'MBBS, MS',
        experience: '8 Years',
        about: 'Dr. Ritu Agarwal specializes in refractive disorders, dry eye treatment, cataract care, and comprehensive ophthalmology.',
        fees: 550,
        address: {
            line1: 'Ballygunge',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc44',
        name: 'Dr. Kunal Shah',
        image: doc10,
        speciality: 'Ophthalmologist',
        degree: 'MBBS, MS',
        experience: '7 Years',
        about: 'Dr. Kunal Shah provides patient-focused eye care for vision problems, cataracts, and common ophthalmic conditions.',
        fees: 500,
        address: {
            line1: 'Navrangpura',
            line2: 'Ahmedabad, Gujarat'
        }
    },
    {
        _id: 'doc45',
        name: 'Dr. Deepa Nair',
        image: doc11,
        speciality: 'Ophthalmologist',
        degree: 'MBBS, MS',
        experience: '13 Years',
        about: 'Dr. Deepa Nair specializes in cataract care, glaucoma screening, vision correction, and preventive eye health.',
        fees: 700,
        address: {
            line1: 'Kakkanad',
            line2: 'Kochi, Kerala'
        }
    },

    // =====================================================
    // ENT SPECIALISTS
    // =====================================================

    {
        _id: 'doc46',
        name: 'Dr. Rajesh Singh',
        image: doc12,
        speciality: 'ENT Specialist',
        degree: 'MBBS, MS',
        experience: '10 Years',
        about: 'Dr. Rajesh Singh specializes in sinus problems, ear infections, hearing disorders, and throat conditions.',
        fees: 600,
        address: {
            line1: 'Indirapuram',
            line2: 'Ghaziabad, Uttar Pradesh'
        }
    },
    {
        _id: 'doc47',
        name: 'Dr. Aparna Mohanty',
        image: doc13,
        speciality: 'ENT Specialist',
        degree: 'MBBS, MS',
        experience: '8 Years',
        about: 'Dr. Aparna Mohanty provides comprehensive ENT care including sinus treatment, hearing evaluation, and throat disorders.',
        fees: 550,
        address: {
            line1: 'Jaydev Vihar',
            line2: 'Bhubaneswar, Odisha'
        }
    },
    {
        _id: 'doc48',
        name: 'Dr. Vikas Gupta',
        image: doc14,
        speciality: 'ENT Specialist',
        degree: 'MBBS, MS',
        experience: '11 Years',
        about: 'Dr. Vikas Gupta specializes in sinus conditions, allergies, hearing problems, and throat infections.',
        fees: 650,
        address: {
            line1: 'Vaishali',
            line2: 'Ghaziabad, Uttar Pradesh'
        }
    },
    {
        _id: 'doc49',
        name: 'Dr. Nandini Iyer',
        image: doc15,
        speciality: 'ENT Specialist',
        degree: 'MBBS, MS',
        experience: '9 Years',
        about: 'Dr. Nandini Iyer focuses on ear, nose, and throat disorders with special attention to sinus and hearing health.',
        fees: 600,
        address: {
            line1: 'T Nagar',
            line2: 'Chennai, Tamil Nadu'
        }
    },
    {
        _id: 'doc50',
        name: 'Dr. Sanjay Mishra',
        image: doc16,
        speciality: 'ENT Specialist',
        degree: 'MBBS, MS',
        experience: '14 Years',
        about: 'Dr. Sanjay Mishra provides advanced ENT consultation and treatment for sinus, ear, hearing, and throat conditions.',
        fees: 700,
        address: {
            line1: 'Boring Road',
            line2: 'Patna, Bihar'
        }
    },

    // =====================================================
    // DENTISTS
    // =====================================================

    {
        _id: 'doc51',
        name: 'Dr. Neha Jain',
        image: doc17,
        speciality: 'Dentist',
        degree: 'BDS, MDS',
        experience: '8 Years',
        about: 'Dr. Neha Jain specializes in preventive dentistry, cosmetic dental treatments, restorative procedures, and oral hygiene.',
        fees: 500,
        address: {
            line1: 'Koramangala',
            line2: 'Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc52',
        name: 'Dr. Amit Bansal',
        image: doc1,
        speciality: 'Dentist',
        degree: 'BDS',
        experience: '6 Years',
        about: 'Dr. Amit Bansal provides preventive dental care, fillings, cleaning, restorative treatment, and oral health counseling.',
        fees: 400,
        address: {
            line1: 'Pitampura',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc53',
        name: 'Dr. Snehal Kulkarni',
        image: doc2,
        speciality: 'Dentist',
        degree: 'BDS, MDS',
        experience: '10 Years',
        about: 'Dr. Snehal Kulkarni specializes in cosmetic dentistry, restorative procedures, and comprehensive oral healthcare.',
        fees: 600,
        address: {
            line1: 'Aundh',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc54',
        name: 'Dr. Rahul Chatterjee',
        image: doc3,
        speciality: 'Dentist',
        degree: 'BDS, MDS',
        experience: '7 Years',
        about: 'Dr. Rahul Chatterjee provides modern dental treatment with a focus on oral hygiene, restorative dentistry, and cosmetic care.',
        fees: 500,
        address: {
            line1: 'Behala',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc55',
        name: 'Dr. Priyanka Sahu',
        image: doc4,
        speciality: 'Dentist',
        degree: 'BDS',
        experience: '5 Years',
        about: 'Dr. Priyanka Sahu provides gentle dental care, preventive treatment, oral hygiene guidance, and cosmetic dental procedures.',
        fees: 400,
        address: {
            line1: 'Rourkela Main Road',
            line2: 'Rourkela, Odisha'
        }
    },

    // =====================================================
    // PULMONOLOGISTS
    // =====================================================

    {
        _id: 'doc56',
        name: 'Dr. Ashok Verma',
        image: doc5,
        speciality: 'Pulmonologist',
        degree: 'MBBS, MD',
        experience: '13 Years',
        about: 'Dr. Ashok Verma specializes in asthma, respiratory infections, chronic lung diseases, and pulmonary health.',
        fees: 750,
        address: {
            line1: 'Malviya Nagar',
            line2: 'Jaipur, Rajasthan'
        }
    },
    {
        _id: 'doc57',
        name: 'Dr. Sweta Reddy',
        image: doc6,
        speciality: 'Pulmonologist',
        degree: 'MBBS, MD',
        experience: '9 Years',
        about: 'Dr. Sweta Reddy provides expert respiratory care for asthma, allergies, breathing disorders, and chronic lung conditions.',
        fees: 700,
        address: {
            line1: 'Kondapur',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc58',
        name: 'Dr. Manoj Pillai',
        image: doc7,
        speciality: 'Pulmonologist',
        degree: 'MBBS, MD',
        experience: '11 Years',
        about: 'Dr. Manoj Pillai specializes in pulmonary disorders, asthma management, respiratory infections, and lung wellness.',
        fees: 750,
        address: {
            line1: 'Vyttila',
            line2: 'Kochi, Kerala'
        }
    },
    {
        _id: 'doc59',
        name: 'Dr. Rajat Kapoor',
        image: doc8,
        speciality: 'Pulmonologist',
        degree: 'MBBS, MD',
        experience: '15 Years',
        about: 'Dr. Rajat Kapoor provides advanced treatment for complex respiratory disorders and chronic lung conditions.',
        fees: 850,
        address: {
            line1: 'Greater Kailash',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc60',
        name: 'Dr. Pritam Das',
        image: doc9,
        speciality: 'Pulmonologist',
        degree: 'MBBS, MD',
        experience: '7 Years',
        about: 'Dr. Pritam Das provides patient-centered respiratory care for asthma, allergies, lung infections, and breathing disorders.',
        fees: 650,
        address: {
            line1: 'Kharavela Nagar',
            line2: 'Bhubaneswar, Odisha'
        }
    },

    // =====================================================
    // PSYCHIATRISTS
    // =====================================================

    {
        _id: 'doc61',
        name: 'Dr. Shweta Sharma',
        image: doc10,
        speciality: 'Psychiatrist',
        degree: 'MBBS, MD',
        experience: '9 Years',
        about: 'Dr. Shweta Sharma provides professional mental healthcare focusing on emotional wellness, stress management, and behavioral health.',
        fees: 700,
        address: {
            line1: 'Vasant Vihar',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc62',
        name: 'Dr. Arjun Kapoor',
        image: doc11,
        speciality: 'Psychiatrist',
        degree: 'MBBS, MD',
        experience: '11 Years',
        about: 'Dr. Arjun Kapoor provides comprehensive psychiatric care for stress, anxiety, mood disorders, and emotional wellness.',
        fees: 750,
        address: {
            line1: 'Bandra West',
            line2: 'Mumbai, Maharashtra'
        }
    },
    {
        _id: 'doc63',
        name: 'Dr. Radhika Menon',
        image: doc12,
        speciality: 'Psychiatrist',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Radhika Menon specializes in behavioral health, emotional wellness, stress management, and personalized psychiatric care.',
        fees: 650,
        address: {
            line1: 'HSR Layout',
            line2: 'Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc64',
        name: 'Dr. Vivek Anand',
        image: doc13,
        speciality: 'Psychiatrist',
        degree: 'MBBS, MD',
        experience: '12 Years',
        about: 'Dr. Vivek Anand provides comprehensive mental health assessments and individualized psychiatric treatment plans.',
        fees: 800,
        address: {
            line1: 'Kankarbagh',
            line2: 'Patna, Bihar'
        }
    },
    {
        _id: 'doc65',
        name: 'Dr. Nisha Rao',
        image: doc14,
        speciality: 'Psychiatrist',
        degree: 'MBBS, MD',
        experience: '6 Years',
        about: 'Dr. Nisha Rao focuses on emotional wellbeing, stress-related concerns, behavioral health, and supportive psychiatric care.',
        fees: 600,
        address: {
            line1: 'Indiranagar',
            line2: 'Bengaluru, Karnataka'
        }
    },

    // =====================================================
    // UROLOGISTS
    // =====================================================

    {
        _id: 'doc66',
        name: 'Dr. Vikram Singh',
        image: doc15,
        speciality: 'Urologist',
        degree: 'MBBS, MS, MCh',
        experience: '15 Years',
        about: 'Dr. Vikram Singh specializes in urinary tract disorders, kidney stones, prostate health, and comprehensive urological care.',
        fees: 900,
        address: {
            line1: 'Gurugram Sector 15',
            line2: 'Gurugram, Haryana'
        }
    },
    {
        _id: 'doc67',
        name: 'Dr. Rajiv Kumar',
        image: doc16,
        speciality: 'Urologist',
        degree: 'MBBS, MS',
        experience: '10 Years',
        about: 'Dr. Rajiv Kumar provides specialized care for kidney stones, urinary disorders, prostate conditions, and men’s health.',
        fees: 800,
        address: {
            line1: 'Kankarbagh',
            line2: 'Patna, Bihar'
        }
    },
    {
        _id: 'doc68',
        name: 'Dr. Suresh Nair',
        image: doc17,
        speciality: 'Urologist',
        degree: 'MBBS, MS, MCh',
        experience: '17 Years',
        about: 'Dr. Suresh Nair provides advanced treatment for complex urinary, kidney, and prostate-related conditions.',
        fees: 1000,
        address: {
            line1: 'Kowdiar',
            line2: 'Thiruvananthapuram, Kerala'
        }
    },
    {
        _id: 'doc69',
        name: 'Dr. Abhinav Gupta',
        image: doc1,
        speciality: 'Urologist',
        degree: 'MBBS, MS',
        experience: '8 Years',
        about: 'Dr. Abhinav Gupta specializes in kidney stone treatment, urinary infections, prostate health, and preventive urology.',
        fees: 750,
        address: {
            line1: 'Noida Sector 18',
            line2: 'Noida, Uttar Pradesh'
        }
    },
    {
        _id: 'doc70',
        name: 'Dr. Mahesh Rao',
        image: doc2,
        speciality: 'Urologist',
        degree: 'MBBS, MS, MCh',
        experience: '13 Years',
        about: 'Dr. Mahesh Rao provides comprehensive urological consultation for urinary, kidney, and prostate conditions.',
        fees: 850,
        address: {
            line1: 'Jayanagar',
            line2: 'Bengaluru, Karnataka'
        }
    },

    // =====================================================
    // ENDOCRINOLOGISTS
    // =====================================================

    {
        _id: 'doc71',
        name: 'Dr. Aparna Gupta',
        image: doc3,
        speciality: 'Endocrinologist',
        degree: 'MBBS, MD, DM',
        experience: '13 Years',
        about: 'Dr. Aparna Gupta specializes in diabetes, thyroid disorders, hormonal conditions, and metabolic health.',
        fees: 850,
        address: {
            line1: 'Salt Lake',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc72',
        name: 'Dr. Sanjay Reddy',
        image: doc4,
        speciality: 'Endocrinologist',
        degree: 'MBBS, MD',
        experience: '10 Years',
        about: 'Dr. Sanjay Reddy provides specialized care for diabetes, thyroid disorders, obesity, and metabolic conditions.',
        fees: 750,
        address: {
            line1: 'Banjara Hills',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc73',
        name: 'Dr. Monica Sharma',
        image: doc5,
        speciality: 'Endocrinologist',
        degree: 'MBBS, MD, DM',
        experience: '15 Years',
        about: 'Dr. Monica Sharma provides advanced endocrine care focusing on diabetes, thyroid health, and hormonal disorders.',
        fees: 900,
        address: {
            line1: 'Civil Lines',
            line2: 'Jaipur, Rajasthan'
        }
    },
    {
        _id: 'doc74',
        name: 'Dr. Karthik Iyer',
        image: doc6,
        speciality: 'Endocrinologist',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Karthik Iyer focuses on diabetes management, thyroid conditions, metabolic health, and lifestyle-based treatment.',
        fees: 700,
        address: {
            line1: 'Anna Nagar',
            line2: 'Chennai, Tamil Nadu'
        }
    },
    {
        _id: 'doc75',
        name: 'Dr. Reena Mohanty',
        image: doc7,
        speciality: 'Endocrinologist',
        degree: 'MBBS, MD',
        experience: '11 Years',
        about: 'Dr. Reena Mohanty specializes in diabetes, thyroid disorders, hormonal health, and preventive metabolic medicine.',
        fees: 750,
        address: {
            line1: 'Chandrasekharpur',
            line2: 'Bhubaneswar, Odisha'
        }
    },

    // =====================================================
    // NEPHROLOGISTS
    // =====================================================

    {
        _id: 'doc76',
        name: 'Dr. Rajendra Prasad',
        image: doc8,
        speciality: 'Nephrologist',
        degree: 'MBBS, MD, DM',
        experience: '14 Years',
        about: 'Dr. Rajendra Prasad specializes in kidney disease, hypertension-related kidney problems, and renal care.',
        fees: 900,
        address: {
            line1: 'Boring Road',
            line2: 'Patna, Bihar'
        }
    },
    {
        _id: 'doc77',
        name: 'Dr. Sunita Menon',
        image: doc9,
        speciality: 'Nephrologist',
        degree: 'MBBS, MD',
        experience: '10 Years',
        about: 'Dr. Sunita Menon provides specialized kidney care including chronic kidney disease management and renal health assessment.',
        fees: 800,
        address: {
            line1: 'Ernakulam',
            line2: 'Kochi, Kerala'
        }
    },
    {
        _id: 'doc78',
        name: 'Dr. Ashish Agarwal',
        image: doc10,
        speciality: 'Nephrologist',
        degree: 'MBBS, MD, DM',
        experience: '16 Years',
        about: 'Dr. Ashish Agarwal focuses on complex kidney disorders, renal health, hypertension, and chronic kidney disease management.',
        fees: 950,
        address: {
            line1: 'Saket',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc79',
        name: 'Dr. Pooja Rao',
        image: doc11,
        speciality: 'Nephrologist',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Pooja Rao provides patient-focused nephrology care for kidney disorders and hypertension-related complications.',
        fees: 750,
        address: {
            line1: 'Madhapur',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc80',
        name: 'Dr. Vinay Kumar',
        image: doc12,
        speciality: 'Nephrologist',
        degree: 'MBBS, MD, DM',
        experience: '12 Years',
        about: 'Dr. Vinay Kumar provides comprehensive renal care and specializes in chronic kidney disease and kidney health.',
        fees: 850,
        address: {
            line1: 'Sector 21',
            line2: 'Chandigarh'
        }
    },

    // =====================================================
    // ONCOLOGISTS
    // =====================================================

    {
        _id: 'doc81',
        name: 'Dr. Meenakshi Sharma',
        image: doc13,
        speciality: 'Oncologist',
        degree: 'MBBS, MD, DM',
        experience: '16 Years',
        about: 'Dr. Meenakshi Sharma specializes in cancer diagnosis, treatment planning, and supportive oncology care.',
        fees: 1200,
        address: {
            line1: 'Vasant Kunj',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc82',
        name: 'Dr. Abhishek Mehta',
        image: doc14,
        speciality: 'Oncologist',
        degree: 'MBBS, MD',
        experience: '13 Years',
        about: 'Dr. Abhishek Mehta provides comprehensive oncology consultation and individualized cancer treatment planning.',
        fees: 1100,
        address: {
            line1: 'Andheri East',
            line2: 'Mumbai, Maharashtra'
        }
    },
    {
        _id: 'doc83',
        name: 'Dr. Swati Kapoor',
        image: doc15,
        speciality: 'Oncologist',
        degree: 'MBBS, MD, DM',
        experience: '12 Years',
        about: 'Dr. Swati Kapoor focuses on evidence-based cancer care, treatment coordination, and patient-centered oncology support.',
        fees: 1100,
        address: {
            line1: 'Gomti Nagar',
            line2: 'Lucknow, Uttar Pradesh'
        }
    },
    {
        _id: 'doc84',
        name: 'Dr. Manish Tiwari',
        image: doc16,
        speciality: 'Oncologist',
        degree: 'MBBS, MD',
        experience: '15 Years',
        about: 'Dr. Manish Tiwari provides specialized oncology consultation and comprehensive treatment planning.',
        fees: 1150,
        address: {
            line1: 'Banjara Hills',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc85',
        name: 'Dr. Radhika Nair',
        image: doc17,
        speciality: 'Oncologist',
        degree: 'MBBS, MD',
        experience: '10 Years',
        about: 'Dr. Radhika Nair provides compassionate cancer care with an emphasis on personalized treatment and supportive care.',
        fees: 1000,
        address: {
            line1: 'Adyar',
            line2: 'Chennai, Tamil Nadu'
        }
    },

    // =====================================================
    // RADIOLOGISTS
    // =====================================================

    {
        _id: 'doc86',
        name: 'Dr. Ashwin Kumar',
        image: doc1,
        speciality: 'Radiologist',
        degree: 'MBBS, MD',
        experience: '12 Years',
        about: 'Dr. Ashwin Kumar specializes in diagnostic imaging including X-rays, CT scans, MRI, and ultrasound.',
        fees: 700,
        address: {
            line1: 'Kharadi',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc87',
        name: 'Dr. Neelam Singh',
        image: doc2,
        speciality: 'Radiologist',
        degree: 'MBBS, MD',
        experience: '9 Years',
        about: 'Dr. Neelam Singh provides expert diagnostic imaging interpretation with a focus on accurate radiological reporting.',
        fees: 650,
        address: {
            line1: 'Noida Sector 50',
            line2: 'Noida, Uttar Pradesh'
        }
    },
    {
        _id: 'doc88',
        name: 'Dr. Sumanth Rao',
        image: doc3,
        speciality: 'Radiologist',
        degree: 'MBBS, MD',
        experience: '14 Years',
        about: 'Dr. Sumanth Rao specializes in advanced diagnostic imaging and comprehensive radiological evaluation.',
        fees: 800,
        address: {
            line1: 'Whitefield',
            line2: 'Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc89',
        name: 'Dr. Shilpa Das',
        image: doc4,
        speciality: 'Radiologist',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Shilpa Das provides diagnostic imaging services with expertise in MRI, CT, ultrasound, and general radiology.',
        fees: 650,
        address: {
            line1: 'New Town',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc90',
        name: 'Dr. Rajat Mishra',
        image: doc5,
        speciality: 'Radiologist',
        degree: 'MBBS, MD',
        experience: '11 Years',
        about: 'Dr. Rajat Mishra specializes in diagnostic radiology and detailed interpretation of medical imaging studies.',
        fees: 700,
        address: {
            line1: 'Patia',
            line2: 'Bhubaneswar, Odisha'
        }
    },

    // =====================================================
    // PHYSIOTHERAPISTS
    // =====================================================

    {
        _id: 'doc91',
        name: 'Dr. Priti Sharma',
        image: doc6,
        speciality: 'Physiotherapist',
        degree: 'BPT, MPT',
        experience: '7 Years',
        about: 'Dr. Priti Sharma specializes in physical rehabilitation, mobility improvement, sports injuries, and pain management.',
        fees: 500,
        address: {
            line1: 'Rajouri Garden',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc92',
        name: 'Dr. Rahul Nair',
        image: doc7,
        speciality: 'Physiotherapist',
        degree: 'BPT',
        experience: '5 Years',
        about: 'Dr. Rahul Nair provides rehabilitation programs for joint pain, muscle injuries, posture problems, and mobility concerns.',
        fees: 450,
        address: {
            line1: 'Kakkanad',
            line2: 'Kochi, Kerala'
        }
    },
    {
        _id: 'doc93',
        name: 'Dr. Sneha Kulkarni',
        image: doc8,
        speciality: 'Physiotherapist',
        degree: 'BPT, MPT',
        experience: '9 Years',
        about: 'Dr. Sneha Kulkarni focuses on orthopedic rehabilitation, post-surgical recovery, sports injuries, and mobility improvement.',
        fees: 550,
        address: {
            line1: 'Aundh',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc94',
        name: 'Dr. Manoj Sahu',
        image: doc9,
        speciality: 'Physiotherapist',
        degree: 'BPT',
        experience: '6 Years',
        about: 'Dr. Manoj Sahu provides personalized physical therapy programs for pain relief, mobility, and injury recovery.',
        fees: 400,
        address: {
            line1: 'Civil Township',
            line2: 'Rourkela, Odisha'
        }
    },
    {
        _id: 'doc95',
        name: 'Dr. Kavita Joshi',
        image: doc10,
        speciality: 'Physiotherapist',
        degree: 'BPT, MPT',
        experience: '11 Years',
        about: 'Dr. Kavita Joshi specializes in rehabilitation, chronic pain management, sports therapy, and functional movement improvement.',
        fees: 600,
        address: {
            line1: 'Baner',
            line2: 'Pune, Maharashtra'
        }
    },

    // =====================================================
    // ANESTHESIOLOGISTS
    // =====================================================

    {
        _id: 'doc96',
        name: 'Dr. Sunil Sharma',
        image: doc11,
        speciality: 'Anesthesiologist',
        degree: 'MBBS, MD',
        experience: '14 Years',
        about: 'Dr. Sunil Sharma specializes in anesthesia management, perioperative care, pain management, and surgical patient safety.',
        fees: 800,
        address: {
            line1: 'Dwarka',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc97',
        name: 'Dr. Anjali Menon',
        image: doc12,
        speciality: 'Anesthesiologist',
        degree: 'MBBS, MD',
        experience: '10 Years',
        about: 'Dr. Anjali Menon provides comprehensive anesthesia care with a strong focus on perioperative monitoring and patient safety.',
        fees: 750,
        address: {
            line1: 'Kochi City',
            line2: 'Kochi, Kerala'
        }
    },
    {
        _id: 'doc98',
        name: 'Dr. Rajesh Kumar',
        image: doc13,
        speciality: 'Anesthesiologist',
        degree: 'MBBS, MD',
        experience: '16 Years',
        about: 'Dr. Rajesh Kumar provides advanced anesthesia services with extensive experience in surgical and perioperative care.',
        fees: 900,
        address: {
            line1: 'Gurugram Sector 29',
            line2: 'Gurugram, Haryana'
        }
    },
    {
        _id: 'doc99',
        name: 'Dr. Nivedita Rao',
        image: doc14,
        speciality: 'Anesthesiologist',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Nivedita Rao focuses on safe anesthesia administration, pain management, and perioperative patient care.',
        fees: 700,
        address: {
            line1: 'Kharadi',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc100',
        name: 'Dr. Debashis Mohanty',
        image: doc15,
        speciality: 'Anesthesiologist',
        degree: 'MBBS, MD',
        experience: '13 Years',
        about: 'Dr. Debashis Mohanty provides comprehensive anesthesia and perioperative services with a strong focus on patient safety.',
        fees: 850,
        address: {
            line1: 'Sahid Nagar',
            line2: 'Bhubaneswar, Odisha'
        }
    }

]

