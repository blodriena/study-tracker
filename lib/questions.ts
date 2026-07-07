import { Question } from './types'

// IELTS READING QUESTIONS
const ieltsReadingQuestions: Question[] = [
  {
    id: 'ielts-reading-1',
    testType: 'IELTS',
    section: 'Reading',
    number: 1,
    passage: `The term "biodiversity" refers to the variety of life forms found in a particular ecosystem or the entire planet. It includes the diversity of species, genetic diversity within species, and ecosystem diversity. Biodiversity is crucial for maintaining the health and stability of ecosystems. When biodiversity decreases, ecosystems become more vulnerable to disturbances and may lose their ability to provide essential services such as clean air, water, and food production.

Tropical rainforests are among the most biodiverse ecosystems on Earth, containing approximately 50% of all species despite covering only 6% of the planet's surface. However, these forests are being destroyed at an alarming rate due to deforestation, primarily for agricultural expansion and logging. The loss of rainforests not only eliminates countless species but also contributes to climate change by reducing the planet's capacity to absorb carbon dioxide.

Conservation efforts are essential to protect biodiversity. Protected areas such as national parks and nature reserves play a vital role in preserving ecosystems and species. Additionally, sustainable practices in agriculture, forestry, and fishing can help reduce the impact on natural ecosystems. International agreements and cooperation are also necessary to ensure the protection of biodiversity on a global scale.`,
    question: 'According to the passage, what percentage of all species are found in tropical rainforests?',
    type: 'multiple-choice',
    options: ['25%', '50%', '75%', '90%'],
    correctAnswer: '50%',
    difficulty: 'easy',
  },
  {
    id: 'ielts-reading-2',
    testType: 'IELTS',
    section: 'Reading',
    number: 2,
    passage: `The term "biodiversity" refers to the variety of life forms found in a particular ecosystem or the entire planet...`,
    question: 'What is the main reason for rainforest destruction mentioned in the passage?',
    type: 'multiple-choice',
    options: ['Climate change', 'Agricultural expansion and logging', 'Natural disasters', 'Animal extinction'],
    correctAnswer: 'Agricultural expansion and logging',
    difficulty: 'easy',
  },
  {
    id: 'ielts-reading-3',
    testType: 'IELTS',
    section: 'Reading',
    number: 3,
    passage: `Ancient civilizations often developed near rivers, which provided essential resources for survival and growth. The Nile River in Egypt, the Tigris and Euphrates in Mesopotamia, the Indus in Pakistan, and the Yellow River in China all supported major civilizations. These river valleys provided fertile soil for agriculture, water for irrigation and drinking, and transportation routes for trade and communication. The abundance of resources in river valleys allowed populations to grow and societies to develop complex structures and technologies.

The development of agriculture in river valleys led to the establishment of permanent settlements and the growth of cities. As populations increased, governments and laws became necessary to manage resources and maintain order. The need for irrigation systems further stimulated technological advancement and organizational complexity. Thus, rivers played a fundamental role in the emergence and development of human civilization.`,
    question: 'Which of the following is NOT mentioned as a benefit of living near rivers?',
    type: 'multiple-choice',
    options: ['Fertile soil', 'Transportation routes', 'Weather protection', 'Water for irrigation'],
    correctAnswer: 'Weather protection',
    difficulty: 'medium',
  },
  {
    id: 'ielts-reading-4',
    testType: 'IELTS',
    section: 'Reading',
    number: 4,
    passage: `The photosynthesis process is fundamental to life on Earth. Plants absorb carbon dioxide from the atmosphere and water from the soil. Using light energy from the sun, they convert these substances into glucose and oxygen. The glucose serves as an energy source and building material for plant growth, while the oxygen is released into the atmosphere.

The equation for photosynthesis is: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2. This process occurs primarily in the leaves of plants, specifically in structures called chloroplasts that contain the pigment chlorophyll. Chlorophyll absorbs light energy and initiates the chemical reactions necessary for photosynthesis.

Photosynthesis is vital for maintaining atmospheric oxygen levels and removing carbon dioxide, a greenhouse gas. It also forms the base of most food chains on Earth, as plants are primary producers that convert solar energy into chemical energy available to other organisms.`,
    question: 'What is the primary function of chlorophyll in photosynthesis?',
    type: 'multiple-choice',
    options: [
      'To absorb water from the soil',
      'To absorb light energy and initiate chemical reactions',
      'To produce glucose for the plant',
      'To release oxygen into the atmosphere',
    ],
    correctAnswer: 'To absorb light energy and initiate chemical reactions',
    difficulty: 'medium',
  },
  {
    id: 'ielts-reading-5',
    testType: 'IELTS',
    section: 'Reading',
    number: 5,
    passage: `Artificial intelligence (AI) is rapidly transforming various industries and aspects of human life. Machine learning, a subset of AI, enables computers to learn from data and improve their performance without being explicitly programmed for each task. Deep learning, which uses neural networks inspired by the human brain, has achieved remarkable success in image recognition, natural language processing, and game playing.

However, the rapid advancement of AI raises important concerns. Issues such as job displacement, bias in AI systems, privacy violations, and the concentration of power among tech companies need to be addressed. Additionally, the development of artificial general intelligence (AGI) or superintelligence could pose existential risks if not properly controlled and aligned with human values.

Responsible AI development requires collaboration between researchers, policymakers, industry leaders, and society at large. Ethical guidelines, regulatory frameworks, and international agreements are necessary to ensure that AI is developed and deployed in ways that benefit humanity while minimizing risks.`,
    question: 'According to the passage, which of the following is NOT mentioned as a concern related to AI development?',
    type: 'multiple-choice',
    options: [
      'Job displacement',
      'Decreased internet speed',
      'Bias in AI systems',
      'Concentration of power among tech companies',
    ],
    correctAnswer: 'Decreased internet speed',
    difficulty: 'hard',
  },
]

// IELTS LISTENING QUESTIONS
const ieltsListeningQuestions: Question[] = [
  {
    id: 'ielts-listening-1',
    testType: 'IELTS',
    section: 'Listening',
    number: 1,
    passage: 'Audio: A student is asking about library opening hours. The librarian responds: "Our main library is open Monday through Friday from 8 AM to 8 PM, and on weekends from 10 AM to 6 PM. During holidays, we close at 5 PM."',
    question: 'What time does the library close on weekdays?',
    type: 'multiple-choice',
    options: ['5 PM', '6 PM', '8 PM', '10 PM'],
    correctAnswer: '8 PM',
    difficulty: 'easy',
  },
  {
    id: 'ielts-listening-2',
    testType: 'IELTS',
    section: 'Listening',
    number: 2,
    passage: 'Audio: A weather report states: "Tomorrow will bring partly cloudy conditions with temperatures reaching 22 degrees Celsius in the afternoon. There is a 30% chance of rainfall."',
    question: 'What is the expected temperature tomorrow afternoon?',
    type: 'multiple-choice',
    options: ['20°C', '22°C', '25°C', '28°C'],
    correctAnswer: '22°C',
    difficulty: 'easy',
  },
  {
    id: 'ielts-listening-3',
    testType: 'IELTS',
    section: 'Listening',
    number: 3,
    passage: 'Audio: A customer service representative says: "For standard shipping, orders usually arrive within 5-7 business days. For expedited shipping, we guarantee delivery within 2-3 business days. International orders may take 10-21 days."',
    question: 'How long does expedited shipping typically take?',
    type: 'multiple-choice',
    options: ['2-3 days', '5-7 days', '10-21 days', '30 days'],
    correctAnswer: '2-3 days',
    difficulty: 'easy',
  },
  {
    id: 'ielts-listening-4',
    testType: 'IELTS',
    section: 'Listening',
    number: 4,
    passage: 'Audio: A hotel receptionist explains: "We offer three types of rooms: economy rooms at $80 per night, standard rooms at $120, and deluxe rooms at $180. All rooms include complimentary breakfast and WiFi."',
    question: 'What amenities are included in all room types?',
    type: 'multiple-choice',
    options: [
      'Air conditioning and parking',
      'Breakfast and WiFi',
      'Breakfast and gym access',
      'WiFi and parking',
    ],
    correctAnswer: 'Breakfast and WiFi',
    difficulty: 'medium',
  },
  {
    id: 'ielts-listening-5',
    testType: 'IELTS',
    section: 'Listening',
    number: 5,
    passage: 'Audio: A museum guide mentions: "Our special exhibition on ancient Rome runs from March through September. We recommend allocating at least 3 hours for a thorough visit. Guided tours are available every 90 minutes starting at 10 AM."',
    question: 'How frequently are guided tours offered?',
    type: 'multiple-choice',
    options: ['Every 60 minutes', 'Every 90 minutes', 'Every 120 minutes', 'Every 2.5 hours'],
    correctAnswer: 'Every 90 minutes',
    difficulty: 'medium',
  },
]

// SAT MATH QUESTIONS
const satMathQuestions: Question[] = [
  {
    id: 'sat-math-1',
    testType: 'SAT',
    section: 'Math',
    number: 1,
    passage: 'If 3x + 5 = 20, what is the value of x?',
    question: 'Solve for x: 3x + 5 = 20',
    type: 'multiple-choice',
    options: ['3', '5', '7', '9'],
    correctAnswer: '5',
    difficulty: 'easy',
  },
  {
    id: 'sat-math-2',
    testType: 'SAT',
    section: 'Math',
    number: 2,
    passage: 'A rectangle has a length of 10 cm and a width of 6 cm.',
    question: 'What is the area of the rectangle?',
    type: 'multiple-choice',
    options: ['16 cm²', '30 cm²', '60 cm²', '120 cm²'],
    correctAnswer: '60 cm²',
    difficulty: 'easy',
  },
  {
    id: 'sat-math-3',
    testType: 'SAT',
    section: 'Math',
    number: 3,
    passage: 'In a class of 40 students, 60% scored above 80 on an exam.',
    question: 'How many students scored above 80?',
    type: 'multiple-choice',
    options: ['16', '20', '24', '32'],
    correctAnswer: '24',
    difficulty: 'easy',
  },
  {
    id: 'sat-math-4',
    testType: 'SAT',
    section: 'Math',
    number: 4,
    passage: 'If a = 2 and b = 3, what is the value of 2a² + 3b?',
    question: 'Calculate 2a² + 3b where a = 2 and b = 3',
    type: 'multiple-choice',
    options: ['17', '19', '21', '23'],
    correctAnswer: '17',
    difficulty: 'medium',
  },
  {
    id: 'sat-math-5',
    testType: 'SAT',
    section: 'Math',
    number: 5,
    passage: 'A triangle has angles measuring 45°, 60°, and x°.',
    question: 'What is the measure of angle x?',
    type: 'multiple-choice',
    options: ['65°', '70°', '75°', '80°'],
    correctAnswer: '75°',
    difficulty: 'medium',
  },
]

// SAT WRITING QUESTIONS
const satWritingQuestions: Question[] = [
  {
    id: 'sat-writing-1',
    testType: 'SAT',
    section: 'Writing',
    number: 1,
    passage: 'The author argue that technology has transformed society.',
    question: 'Which correction should be made?',
    type: 'multiple-choice',
    options: [
      'Change "argue" to "argues"',
      'Change "has" to "have"',
      'Change "transformed" to "transform"',
      'No correction needed',
    ],
    correctAnswer: 'Change "argue" to "argues"',
    difficulty: 'easy',
  },
  {
    id: 'sat-writing-2',
    testType: 'SAT',
    section: 'Writing',
    number: 2,
    passage: 'She dont like the new restaurant downtown.',
    question: 'What is the error in this sentence?',
    type: 'multiple-choice',
    options: [
      'Incorrect verb form ("dont" should be "doesn\'t")',
      'Incorrect word order',
      'Missing punctuation',
      'No error',
    ],
    correctAnswer: 'Incorrect verb form ("dont" should be "doesn\'t")',
    difficulty: 'easy',
  },
  {
    id: 'sat-writing-3',
    testType: 'SAT',
    section: 'Writing',
    number: 3,
    passage: 'The students completed they homework on time.',
    question: 'Which correction is needed?',
    type: 'multiple-choice',
    options: [
      'Change "The" to "A"',
      'Change "they" to "their"',
      'Change "completed" to "complete"',
      'No correction needed',
    ],
    correctAnswer: 'Change "they" to "their"',
    difficulty: 'easy',
  },
  {
    id: 'sat-writing-4',
    testType: 'SAT',
    section: 'Writing',
    number: 4,
    passage: 'Running through the park, the sunset was beautiful.',
    question: 'What grammatical error appears in this sentence?',
    type: 'multiple-choice',
    options: [
      'Dangling modifier',
      'Subject-verb disagreement',
      'Incorrect tense',
      'Misplaced comma',
    ],
    correctAnswer: 'Dangling modifier',
    difficulty: 'medium',
  },
  {
    id: 'sat-writing-5',
    testType: 'SAT',
    section: 'Writing',
    number: 5,
    passage: 'The team have made a decision to postpone the meeting until next week.',
    question: 'Which correction is appropriate?',
    type: 'multiple-choice',
    options: [
      'Change "have" to "has"',
      'Change "made" to "make"',
      'Change "to postpone" to "postponing"',
      'No correction needed',
    ],
    correctAnswer: 'Change "have" to "has"',
    difficulty: 'medium',
  },
]

export const allQuestions = [
  ...ieltsReadingQuestions,
  ...ieltsListeningQuestions,
  ...satMathQuestions,
  ...satWritingQuestions,
]

export function getQuestionsByTestType(testType: 'IELTS' | 'SAT') {
  return allQuestions.filter((q) => q.testType === testType)
}

export function getQuestionsBySection(testType: 'IELTS' | 'SAT', section: string) {
  return allQuestions.filter((q) => q.testType === testType && q.section === section)
}

export function getRandomQuestions(testType: 'IELTS' | 'SAT', section: string, count: number) {
  const filtered = getQuestionsBySection(testType, section)
  const shuffled = [...filtered].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, filtered.length))
}
