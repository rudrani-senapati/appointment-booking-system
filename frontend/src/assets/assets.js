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
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 500,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD',
        experience: '3 Years',
        about: 'Dr. Larson is dedicated to women’s health, providing empathetic and comprehensive care across all stages of life.',
        fees: 600,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Patel focuses on advanced dermatological treatments, cosmetic dermatology, and preventive skin care solutions.',
        fees: 300,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS, MD',
        experience: '2 Years',
        about: 'Dr. Lee specializes in pediatric health, developmental tracking, and gentle, child-focused healthcare strategies.',
        fees: 400,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS, DM',
        experience: '4 Years',
        about: 'Dr. Garcia is committed to diagnosing and managing complex neurological disorders with patient-first treatment plans.',
        fees: 500,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS, DM',
        experience: '4 Years',
        about: 'Dr. Williams has extensive expertise in neurological assessments, cognitive therapies, and comprehensive nervous system care.',
        fees: 500,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis provides comprehensive medical care, focusing on preventive lifestyle medicine and routine primary care.',
        fees: 500,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS',
        experience: '3 Years',
        about: 'Dr. White provides patient-centered obstetric and gynecological care with a focus on holistic wellness.',
        fees: 600,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Mitchell delivers expert solutions for chronic dermatological conditions, allergies, and everyday skin health.',
        fees: 300,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. King is passionate about childhood nutrition, early childhood wellness, and immunization programs.',
        fees: 400,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD',
        experience: '4 Years',
        about: 'Dr. Kelly specializes in digestive health, endoscopy diagnostics, and gut microbiome optimization.',
        fees: 500,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Cardiologist',
        degree: 'MBBS, MD',
        experience: '4 Years',
        about: 'Dr. Harris provides state-of-the-art cardiac diagnostics, hypertension management, and preventive heart health plans.',
        fees: 700,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'Orthopedic',
        degree: 'MBBS, MS',
        experience: '4 Years',
        about: 'Dr. Evans focuses on joint mobility, fracture repair, and sports injury rehabilitation.',
        fees: 650,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Ophthalmologist',
        degree: 'MBBS, MS',
        experience: '3 Years',
        about: 'Dr. Martinez specializes in comprehensive vision assessments, refractive errors, and eye care therapies.',
        fees: 450,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'ENT Specialist',
        degree: 'MBBS, MS',
        experience: '1 Year',
        about: 'Dr. Hill focuses on ear, nose, and throat disorders, sinus therapies, and hearing wellness.',
        fees: 400,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc16',
        name: 'Dr. Lucas Brown',
        image: doc1,
        speciality: 'Dentist',
        degree: 'BDS, MDS',
        experience: '5 Years',
        about: 'Dr. Brown is committed to modern oral health, cosmetic dental corrections, and preventive dentistry.',
        fees: 350,
        address: {
            line1: '67th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc17',
        name: 'Dr. Sophia Taylor',
        image: doc2,
        speciality: 'Pulmonologist',
        degree: 'MBBS, MD',
        experience: '6 Years',
        about: 'Dr. Taylor provides expert care for respiratory issues, asthma management, and lung wellness.',
        fees: 600,
        address: {
            line1: '77th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    }
]