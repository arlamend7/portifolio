# TechInnov — Language Learning Platform

## Overview

This project covers the learning modules of an online language-training service. Learners work through programs, units and activities in English or French as a second language. The modules are being redesigned for the platform’s accessible portal, with WCAG 2.1 AA as a design and testing target.

The challenge extends beyond presenting an exercise. When a learner finishes an activity, the platform needs to record that work and reflect it consistently in progress, completion notices and reports—even as older and redesigned content coexist.

![Conceptual view of programs, modules, units and activities, followed by tracking, progress and reporting.](images/module-structure-tracking.en.svg)

Accounts, user roles and scheduling are covered separately in [Account Management Platform](/projects/techinnov-account-management-platform).

## My contribution

The platform was already established when I began contributing to its evolution. As a **Developer and QA Coordinator**, I worked directly on development, supported the team in implementing features and helped create new learning activities. I also modified and refactored code and processes to improve stability and maintainability.

- **New activities and features.** Creating activities and collaborating on new functionality within the existing platform.
- **Refactoring and stability.** Reviewing and reorganizing code and processes, including how learning materials are assembled and the appropriate version and language selected for each learner.
- **Progress logic.** Developing C#/.NET logic for activity status, module progress and completion notices, with rules discussed with the product team.
- **Delivery quality.** Coordinating QA, test documentation and Playwright scenarios to validate new features and existing behavior after changes.

## Evolving an established platform

Creating a new activity and refactoring an existing one require different kinds of care. New activities need their interactions implemented and integrated with the platform. Refactoring needs to improve the structure while preserving behavior learners already depend on.

My work covered both. Alongside development and implementation support, I reviewed and modified processes to make them more stable. QA complemented that work by checking whether changes behaved as expected and preserved existing journeys.

## Organizing learning around reusable activity types

A program begins with a placement test and follows a sequence of modules. Modules contain units, and units contain activities: multiple-choice questions, fill-in-the-blank exercises, drag-and-drop interactions, dialogue scenes, quizzes and listening exercises in which learners record their own voice. Pronunciation Coach, described below, adds AI-assisted pronunciation assessment to this experience.

I approach these as reusable activity types rather than unrelated pages. For example, defining a shared interaction or validation rule for a type avoids maintaining a separate list of individual exercises whenever content changes. It also gives QA a consistent basis for testing existing and future activities.

## Pronunciation Coach: AI applied to speaking practice

**Pronunciation Coach** uses artificial intelligence to assess pronunciation and give learners feedback on their speech. The activity connects speaking practice with individual feedback, helping learners identify what they need to improve.

I contributed **technical support and review during the activity’s development**, collaborating with the team responsible for implementation. This work broadened my experience with AI in education through its integration into a learner-facing experience.

## Making completion mean the right thing

SCORM provides the communication between learning content and the platform that hosts it. Here, activity tracking feeds the learner’s progress views, module status and reports. A working exercise is not enough if its result is never recorded.

Completion is not identical across modules: some include a final assessment, while others support review or simulation. Consider a learner who has finished the exercises but has not yet completed the assessment. Should the module show as finished? That is a product decision that needs to be explicit before it becomes code.

I documented these situations with their expected status so the product team could confirm the rules before implementation and testing. The same care applies when content is redesigned: progress must remain consistent across versions, without disappearing or being counted twice.

## Accessibility as part of the interaction

An accessible activity needs more than a new visual layout. Drag-and-drop exercises need a way to operate them from the keyboard; focus must remain visible; and feedback should be available to assistive technologies, not only displayed visually.

Audio exercises add another layer. The test plan considers microphone permission, clear recording and playback states, browser differences and whether an attempt remains saved after reloading. These checks connect accessibility with the practical reliability of the learning experience.

## Testing the journey, not only the screen

I organize manual QA and Playwright scenarios by activity type, alongside module navigation and assessments. The checks cover the interaction itself and its integration with tracking: after completing an activity, does the learner see the expected progress?

Shared test documentation brings together functionality, accessibility, language, responsive layout and regression checks. Automated tests help repeat those checks consistently; they do not replace manual accessibility evaluation or establish complete coverage.

## Technologies and practices

Angular · TypeScript · C# · .NET · Entity Framework · SQL Server · SCORM · browser audio recording · Playwright · WCAG 2.1 AA criteria · English/French localization.

## What this project demonstrates

My contribution combines developing new activities and features, supporting implementation, and refactoring code and processes within an established platform. QA coordination complements that work: it helps validate changes and preserve the learning experience as the product evolves.
