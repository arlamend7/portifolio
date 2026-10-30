# TechInnov — Account Management Platform

## Overview

This platform is the portal side of an online learning service. It is where learners, tutors, coordinators and administrators sign in, manage their accounts, book sessions, follow progress and receive reports. Each role sees a different set of screens and permissions, and every experience has to work in English, French and Traditional Chinese.

Two portals coexist. The **existing portal** carries well-established workflows built on .NET Framework and MVC. The **accessible portal** is the modern experience the platform is moving toward. The central challenge is to keep the established workflows dependable while progressively bringing experiences into the accessible portal, without disrupting the people who use the platform every day.

![Conceptual overview of user roles, two portals, shared services, data and reporting.](images/platform-overview.en.svg)

## My contribution

As a **Developer and QA Coordinator**, I connect implementation with the work needed to deliver it reliably. I develop across Angular, C#/.NET and SQL Server, coordinate manual and automated testing, and turn business needs into proposals the client can evaluate.

This includes clarifying scope, estimating larger changes and documenting decisions so developers, testers and business stakeholders share the same understanding.

## Moving experiences into an accessible portal

Bringing tutor-facing experiences into the accessible portal is a multi-step effort. I contributed to estimating that transition and to shaping its scope: which screens move first, which dependencies block others, and how to keep both portals coherent along the way.

One recurring decision was whether to link users back to legacy pages or to build the experience directly in the accessible portal. I recommended building directly in the accessible portal where possible. Redirecting into legacy screens is faster in the short term, but it creates a mixed experience for users and means maintaining the same journey in two places.

Accessibility is treated as part of the definition of each feature rather than a finishing step. Calendar views, for example, are scoped separately for learners and tutors, with accessibility requirements written into the work from the start.

## Scheduling rules that hold across roles and time zones

Scheduling looks simple from the outside, but the rules interact. Rescheduling and cancellation depend on how close a session is, end-of-month boundaries affect how sessions are counted, and learners and tutors may be in different time zones.

Before changing these flows, I investigated how the legacy implementation actually behaved, so that refactoring would preserve the rules users already relied on.

## Improving data retrieval

On a screen backed by millions of records, I reduced query execution time by approximately **99% in that particular case**. Instead of preparing all the details before narrowing the results, I changed the query to filter first and enrich only the rows needed.

That result belongs to a specific query, not the entire platform. The approach and its trade-offs are explained in [Performance-focused engineering](/capabilities/performance-engineering).

## Making quality part of delivery

A feature is not finished when the code is written. The team also needs to know what was checked, what remains uncertain and who needs to validate the result. I documented the delivery process and created reusable QA templates to make those expectations clear.

With Playwright, I help organize regression tests that check whether changes break existing behavior, alongside smaller smoke tests that check essential journeys. Scenarios consider user roles, screen sizes, languages and keyboard navigation. Automated checks support this work; they do not replace manual accessibility review.

![Delivery moves from a shared understanding of the need through development, review, testing and validation. Test evidence and documentation support the whole process.](images/delivery-quality-flow.en.svg)

I also review test reports and compare the implementation with its documentation to identify gaps. The aim is to make quality visible through evidence, rather than assume that a passing run means everything has been covered.

## Technologies and practices

Angular · TypeScript · C# · .NET / .NET Framework · ASP.NET MVC · Entity Framework · SQL Server · Playwright · WCAG · SCORM · iTextSharp.

## What this project demonstrates

My contribution brings together development, performance analysis, accessibility and QA coordination. The central challenge is to improve an established platform while preserving the behavior people already depend on—and give the team enough shared context to keep improving it.
