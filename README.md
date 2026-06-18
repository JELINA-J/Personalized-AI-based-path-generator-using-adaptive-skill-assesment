# Personalized AI-Based Learning Path Generator Using Adaptive Skill Assessment

## 📌 Overview

The Personalized AI-Based Learning Path Generator is an AI-powered learning platform that creates customized learning roadmaps based on a learner's skill level, selected domain, and learning duration.

The system combines Adaptive Skill Assessment, Retrieval-Augmented Generation (RAG), Large Language Models (LLMs), and a Recommendation Engine to provide personalized learning experiences. It helps learners identify their current knowledge level, receive structured learning paths, access relevant resources, and gain project and career recommendations.

---

## 🚀 Features

### 🎯 Personalized Learning Path Generation
- Generates customized week-wise learning roadmaps.
- Adapts learning content based on:
  - Selected Course
  - Skill Level
  - Learning Duration

### 📝 Adaptive Skill Assessment
- Multiple Choice Questions (MCQs)
- Open-ended conceptual questions
- Dynamic skill evaluation

### 🤖 AI Chatbot Support
- Real-time learning assistance
- Concept clarification
- Personalized guidance and recommendations

### 📚 Intelligent Resource Recommendations
- Official Documentation
- Tutorials and Articles
- Educational YouTube Videos

### 🔍 Retrieval-Augmented Generation (RAG)
- Retrieves domain-specific knowledge from ChromaDB
- Enhances response accuracy and relevance

### 💼 Project & Career Recommendations
- Personalized project suggestions
- Job role recommendations
- Skill-based career guidance

### 🏆 Certificate Generation
- Automatic certificate generation upon successful completion

### 🔒 Secure Assessment Environment
- Tab-switch detection
- Copy-paste restriction
- Basic proctoring support

---

## 🏗️ System Architecture

```text
User
  │
  ▼
Frontend (React + TypeScript)
  │
  ▼
FastAPI Backend
  │
  ├── Adaptive Assessment Module
  ├── RAG Module (ChromaDB)
  ├── LLM Module (LLaMA 3.1 8B)
  ├── Chatbot Module
  ├── Recommendation Engine
  └── Certificate Generator
  │
  ▼
Personalized Learning Roadmap
```

---

## ⚙️ Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS

### Backend
- FastAPI
- Python

### AI & Machine Learning
- LLaMA 3.1 8B
- Hugging Face Transformers
- Retrieval-Augmented Generation (RAG)

### Database
- ChromaDB

### APIs
- REST APIs
- YouTube Data API v3

### Development Tools
- Git
- GitHub
- Postman
- VS Code

---

## 📂 Project Workflow

### Step 1: Course Selection
The learner selects:
- Course/Domain
- Skill Level
- Learning Duration

### Step 2: Adaptive Skill Assessment
The system evaluates the learner's current knowledge using:
- MCQs
- Conceptual Questions

### Step 3: Knowledge Retrieval
Relevant content is retrieved from ChromaDB using RAG.

### Step 4: AI Roadmap Generation
LLaMA generates a personalized learning roadmap based on:
- Assessment results
- User preferences
- Retrieved knowledge

### Step 5: Resource Recommendation
For each learning topic, the system recommends:
- Documentation
- Tutorials
- YouTube Resources

### Step 6: Learning Assistance
The AI chatbot provides support throughout the learning journey.

### Step 7: Final Assessment
Learners complete an assessment to validate acquired skills.

### Step 8: Certification & Recommendations
The platform generates:
- Completion Certificate
- Project Recommendations
- Job Recommendations

---


## 👩‍💻 Author

**Jelina J**

Demo: https://drive.google.com/file/d/1xwiHJ5X6yv7wc8Cc-MFnNj0Z5viJQL-J/view?usp=sharing

GitHub: https://github.com/JELINA-J


---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub.
