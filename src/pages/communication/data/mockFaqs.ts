export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export const mockFaqs: FAQ[] = [
  {
    id: '1',
    question: 'What are the community quiet hours?',
    answer: 'Quiet hours are from 10:00 PM to 7:00 AM on weekdays, and from 11:00 PM to 8:00 AM on weekends and holidays. During these hours, residents are expected to minimize noise that could disturb neighbors.',
    category: 'Community Rules'
  },
  {
    id: '2',
    question: 'How do I report a maintenance issue?',
    answer: 'You can report maintenance issues through the Maintenance section of the e-consigier app. Tap on "New Request", fill out the form with details about the issue, and attach photos if relevant. For emergency maintenance issues after hours, please call the emergency maintenance hotline at (555) 123-4567.',
    category: 'Maintenance'
  },
  {
    id: '3',
    question: 'What amenities are available in the community?',
    answer: 'Our community offers a variety of amenities including a swimming pool, fitness center, co-working space, meeting rooms, and a rooftop terrace. All amenities can be booked through the Amenities section of the e-consigier app.',
    category: 'Amenities'
  },
  {
    id: '4',
    question: 'How do I book community amenities?',
    answer: 'To book community amenities, navigate to the Amenities section in the e-consigier app. Select the amenity you wish to book, choose an available date and time slot, and confirm your booking. You will receive a confirmation notification once your booking is confirmed.',
    category: 'Amenities'
  },
  {
    id: '5',
    question: 'What are the pool hours?',
    answer: 'The pool is open from 7:00 AM to 10:00 PM daily. Please note that there is no lifeguard on duty, and children under 16 must be accompanied by an adult. The pool area may be closed periodically for maintenance, which will be announced in advance.',
    category: 'Amenities'
  },
  {
    id: '6',
    question: 'How do I pay my rent?',
    answer: 'Rent can be paid through the Payments section of the e-consigier app. You can set up automatic payments or make manual payments each month. Accepted payment methods include credit/debit cards and ACH transfers. Rent is due on the 1st of each month, with a grace period until the 5th.',
    category: 'Payments'
  },
  {
    id: '7',
    question: 'What is the guest policy?',
    answer: 'Residents are welcome to have guests visit the community. For guests staying longer than 7 consecutive days, please notify management. When using community amenities, residents may bring up to 2 guests at a time. Residents are responsible for their guests\' compliance with community rules.',
    category: 'Community Rules'
  },
  {
    id: '8',
    question: 'How do I submit a noise complaint?',
    answer: 'If you experience excessive noise from neighbors, first try to address the issue directly with your neighbor if you feel comfortable doing so. If the issue persists, you can submit a noise complaint through the Communication section of the e-consigier app. For immediate assistance with excessive noise, contact the community security desk.',
    category: 'Community Rules'
  },
  {
    id: '9',
    question: 'What is the package delivery policy?',
    answer: 'Packages are received and processed by our front desk staff. You will receive a notification through the e-consigier app when a package arrives for you. Packages can be picked up from the package room during office hours. Packages not claimed within 14 days may be returned to sender.',
    category: 'Services'
  },
  {
    id: '10',
    question: 'How do I order from the marketplace?',
    answer: 'To order items from the marketplace, navigate to the Marketplace section in the e-consigier app. Browse categories or search for specific items, add them to your cart, and proceed to checkout. You can pay using credit/debit cards saved in your profile. Orders are typically delivered within 30-60 minutes during operating hours.',
    category: 'Services'
  }
];