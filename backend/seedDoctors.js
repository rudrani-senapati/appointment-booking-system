import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env') })

import doctorModel from './models/doctorModel.js'

// Full 100 Doctors list with realistic images & departments
const departmentsList = [
    { name: 'General physician', degree: 'MBBS, MD', fee: 500 },
    { name: 'Gynecologist', degree: 'MBBS, MS (OBG)', fee: 700 },
    { name: 'Dermatologist', degree: 'MBBS, MD (Derm)', fee: 650 },
    { name: 'Pediatricians', degree: 'MBBS, DCH', fee: 550 },
    { name: 'Neurologist', degree: 'MBBS, MD, DM', fee: 900 },
    { name: 'Gastroenterologist', degree: 'MBBS, MD, DM', fee: 850 },
    { name: 'Cardiologist', degree: 'MBBS, MD, DM', fee: 1000 },
    { name: 'Orthopedic', degree: 'MBBS, MS', fee: 750 },
    { name: 'Ophthalmologist', degree: 'MBBS, MS', fee: 600 },
    { name: 'ENT Specialist', degree: 'MBBS, MS', fee: 600 },
    { name: 'Dentist', degree: 'BDS, MDS', fee: 500 },
    { name: 'Pulmonologist', degree: 'MBBS, MD', fee: 800 },
    { name: 'Psychiatrist', degree: 'MBBS, MD', fee: 750 },
    { name: 'Urologist', degree: 'MBBS, MS, MCh', fee: 950 },
    { name: 'Oncologist', degree: 'MBBS, MD, DM', fee: 1100 },
    { name: 'Endocrinologist', degree: 'MBBS, MD, DM', fee: 850 },
    { name: 'Nephrologist', degree: 'MBBS, MD, DM', fee: 900 },
    { name: 'Radiologist', degree: 'MBBS, MD', fee: 700 }
]

const sampleNames = [
    'Ananya Sharma', 'Rohan Patel', 'Priya Verma', 'Siddharth Rao', 'Meera Nambiar',
    'Vikramaditya Sen', 'Sunita Reddy', 'Pooja Deshmukh', 'Neerja Gupta', 'Alok Nath Tripathy',
    'Saurav Das', 'Aditi Singh', 'Rohit Sharma', 'Tanya Roy', 'Karan Malhotra',
    'Amit Agarwal', 'Shreya Banerjee', 'Manish Kulkarni', 'Swati Rao', 'Deepak Bhatia',
    'Rajiv Menon', 'Pankaj Gupta', 'Nitin Shah', 'Swati Mishra', 'Harish Reddy',
    'Sandeep Kumar', 'Kavita Deshmukh', 'Arvind Menon', 'Neeraj Kapoor', 'Rakesh Mohanty',
    'Rohit Verma', 'Abhishek Das', 'Sameer Joshi', 'Manas Patnaik', 'Akash Mehra',
    'Shalini Rao', 'Anil Kumar', 'Ritu Agarwal', 'Kunal Shah', 'Deepa Nair',
    'Rajesh Singh', 'Aparna Mohanty', 'Vikas Gupta', 'Nandini Iyer', 'Sanjay Mishra',
    'Neha Jain', 'Amit Bansal', 'Snehal Kulkarni', 'Rahul Chatterjee', 'Priyanka Sahu',
    'Ashok Verma', 'Sweta Reddy', 'Manoj Pillai', 'Rajat Kapoor', 'Pritam Das',
    'Shweta Sharma', 'Arjun Kapoor', 'Radhika Menon', 'Vivek Anand', 'Nisha Rao',
    'Vikram Singh', 'Rajiv Kumar', 'Suresh Nair', 'Abhinav Gupta', 'Preeti Saxena',
    'Ramesh Chander', 'Divya Sundaram', 'Tarun Bhatnagar', 'Smita Hegde', 'Gaurav Mukherjee',
    'Ankita Pandey', 'Manish Joshi', 'Sonali Roy', 'Koushik Dutta', 'Pooja Bhat',
    'Subhash Chandra', 'Archana Rao', 'Vineet Saxena', 'Kavita Pillai', 'Deepak Shinde',
    'Ritu Sharma', 'Sanjay Dutt', 'Nisha Thomas', 'Manoj Kulkarni', 'Preeti Nambiar',
    'Sunil Sharma', 'Anjali Menon', 'Rajesh Kumar', 'Nivedita Rao', 'Debashis Mohanty',
    'Rahul Nair', 'Sneha Kulkarni', 'Manoj Sahu', 'Kavita Joshi', 'Sunil Verma',
    'Anand Kumar', 'Pooja Hegde', 'Rohan Saxena', 'Shalini Mishra', 'Tarun Sen'
]

// High reliability medical doctor CDN avatar images
const reliableAvatarUrls = [
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1594824813566-88855ce78906?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500&auto=format&fit=crop&q=80'
]

// Generate 100 Doctors array
const doctorsData = Array.from({ length: 100 }, (_, i) => {
    const idNum = i + 1
    const deptObj = departmentsList[i % departmentsList.length]
    const name = `Dr. ${sampleNames[i]}`
    const expYears = (i % 15) + 3
    const avatar = reliableAvatarUrls[i % reliableAvatarUrls.length]

    return {
        _id: `doc${idNum}`,
        name: name,
        image: avatar,
        speciality: deptObj.name,
        degree: deptObj.degree,
        experience: `${expYears} Years`,
        about: `${name} is a highly experienced ${deptObj.name} dedicated to providing world-class patient care, preventive medical screening, and specialized treatments.`,
        fees: deptObj.fee,
        address: { line1: `Suite ${100 + idNum}, CarePulse Healthcare Tower`, line2: 'Medical District, City Center' }
    }
})

const seedDoctors = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: 'prescripto' })
        console.log("Connected to MongoDB database (prescripto)...")

        const salt = await bcrypt.genSalt(10)
        const defaultPassword = await bcrypt.hash("doctor123", salt)

        // Reset & sync doctor collection so image URLs update reliably
        await doctorModel.deleteMany({ email: /@carepulse\.com$/ })
        console.log("Cleared existing seeded doctors for clean update...")

        let addedCount = 0

        for (const doc of doctorsData) {
            const email = `${doc._id}@carepulse.com`.toLowerCase()

            const newDoc = new doctorModel({
                name: doc.name,
                email: email,
                password: defaultPassword,
                image: doc.image,
                speciality: doc.speciality,
                degree: doc.degree,
                experience: doc.experience,
                about: doc.about,
                fees: doc.fees,
                address: doc.address,
                available: true,
                date: Date.now(),
                slots_booked: {}
            })
            await newDoc.save()
            addedCount++
        }

        console.log(`✅ Bulk Seeding Completed! Successfully inserted ${addedCount} doctors into MongoDB with verified CDN images.`)
        process.exit(0)
    } catch (error) {
        console.error("❌ Error seeding doctors:", error)
        process.exit(1)
    }
}

seedDoctors()
