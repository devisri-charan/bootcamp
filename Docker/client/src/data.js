import { car, home, family, health, travel } from './assets';

export const policies = [
    {
        title: "Life Insurance",
        subtitle: "Secure your family's future",
        description: "Provides financial security to your family in the event of your untimely demise.",
        img: family,
        tenure: "10-40 years",
        coverage: "Up to ₹1 Crore",
        premium: "From ₹500 per month",
        benefits: [
            "Death benefit",
            "Tax benefits under Section 80C",
            "Maturity benefits",
            "Riders for additional protection"
        ],
        termsAndConditions: "Subject to policy terms. Premium varies by age and health."
    },
    {
        title: "Home Insurance",
        subtitle: "Protect your home and belongings",
        description: "Covers damage to your home due to natural disasters, theft, and other risks.",
        img: home,
        tenure: "1-30 years",
        coverage: "Up to the rebuilding cost of the home",
        premium: "From ₹300 per month",
        benefits: [
            "Coverage for structure and contents",
            "Temporary living expenses",
            "Personal liability protection"
        ],
        termsAndConditions: "Exclusions apply for wear and tear, and undamaged items."
    },
    {
        title: "Motor Insurance",
        subtitle: "Comprehensive cover for your vehicle",
        description: "Provides cover for damages to your car or bike due to accidents, theft, and natural calamities.",
        img: car,
        tenure: "Annual renewal",
        coverage: "Up to the Insured Declared Value (IDV) of the vehicle",
        premium: "Varies by vehicle model and usage",
        benefits: [
            "Third-party liability",
            "Own damage",
            "No claim bonus",
            "Roadside assistance"
        ],
        termsAndConditions: "Policy does not cover depreciation and mechanical failures."
    },
    {
        title: "Health Insurance",
        subtitle: "Coverage for your medical expenses",
        description: "Helps cover medical costs for illnesses, surgeries, and emergency treatments.",
        img: health,
        tenure: "Annual renewal",
        coverage: "Up to ₹50 lakhs",
        premium: "From ₹1000 per month",
        benefits: [
            "Cashless treatment at network hospitals",
            "Pre and post hospitalization expenses",
            "Ambulance charges",
            "Cover for critical illnesses"
        ],
        termsAndConditions: "Pre-existing diseases covered after a waiting period."
    },
    {
        title: "Travel Insurance",
        subtitle: "Safe travels wherever you go",
        description: "Covers medical expenses, trip cancellations, and lost luggage during travel.",
        img: travel,
        tenure: "Per trip or annual plans",
        coverage: "Varies by plan",
        premium: "From ₹250 per trip",
        benefits: [
            "Overseas medical expenses",
            "Flight delay and cancellation",
            "Lost passport assistance",
            "Evacuation and repatriation"
        ],
        termsAndConditions: "Exclusions include pre-existing conditions and war-related events."
    }
]
