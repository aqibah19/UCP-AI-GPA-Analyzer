# UCP GPA Insight

UCP AI GPA Analyzer Website

Build a completely new, modern, professional website called UCP AI GPA Analyzer.

Design

Professional university-style design inspired by UCP.

White background with Navy Blue and UCP Red theme.

Clean, modern and responsive UI.

Realistic design (not AI/glassmorphism style).

Mobile and desktop optimized.

Smooth animations.

Professional dashboard.

Pages

Home

Analyze Marks

GPA Calculator

CGPA Calculator

Grade Scale

About

Contact

Main Feature

The Analyze page must have two upload sections:

1. Marks Screenshot

Students upload their LMS marks screenshot.

2. Evaluation Screenshot

Students upload the course evaluation screenshot.

The AI should:

Read the marks screenshot.

Read the evaluation screenshot.

Match both.

Calculate GPA according to that course's evaluation.

Support Theory and Lab courses.

Support Top 2, Top 3, Top 4 and Average rules automatically if mentioned in the evaluation screenshot.

Workflow

Upload Marks Screenshot

↓

Upload Evaluation Screenshot

↓

AI Extracts Data

↓

Student Reviews Extracted Data

↓

Calculate GPA

↓

Show Result

Result Page

Display:

Student Name

Course Name

Course Type

Percentage

Grade

Grade Point

GPA

Marks Breakdown

Evaluation Used

Scenario Analysis

Extra Features

History

Dark Mode

PDF Report Download

Print Result

Responsive Layout

Fast Loading

Error Handling

Loading Animation

Branding

Footer:

Designed & Developed by Aqib Ahmed

Email: aqibah50@gmail.com

Add a disclaimer:

"This is an independent academic utility for UCP students and is not an official University of Central Punjab website."

Technical Stack

React + TypeScript

Tailwind CSS

Supabase

Google Gemini Vision API

Netlify Ready

Clean folder structure

Secure API handling

Important

Do not use any fake or hardcoded student data.

Every uploaded screenshot must be analyzed separately.

Never reuse previous analysis.

This project is an independent academic utility built for UCP students.

## Development

Prefer working locally? You need Node.js and npm:

```sh
npm i
npm run dev
```
