## The Supply Network System

### Epic A: Supply network accreditation

1. As a buyer, I want to be able to send an accreditation request to a new network actor so that I can start the onboarding process in a traceable way.
2. As a network actor, I want to fill in the required data for accreditation in a clear interface so that I can quickly complete the onboarding.
3. As an administrator, I want to be able to approve or reject requests based on thresholds and received documents, so as to ensure compliance.
4. As an administrator, I want to be able to manually insert supply network actors so as not to force those already accredited to re-accredit themselves.

### Epic B: Questionnaire management

1. As a sustainability manager, I want to create personalized questionnaire templates with conditional questions so as to collect only the relevant information for each type of network actor.
2. As a network actor, I want to receive automatic notifications and fill out the questionnaire directly from the web so as to meet deadlines.

### Technical Description

The Supply Network Entity Management system is an advanced platform designed to digitize and centralize the entire supply network entity management cycle in structured companies, with particular attention to the fashion, luxury, and manufacturing sectors. The software allows for configuring complex accreditation processes, tracking qualitative and sustainable performance of supply network entities, and generating dynamic KPIs from structured questionnaires.

Companies can define personalized templates for information collection, assign them to supply network entities and sub-supply network entities based on dynamic rules, and automatically or manually evaluate received responses. The system supports multilingual, multi-site, and multi-entity management, ensuring complete auditability and traceability of every action. Key performance indicators are configurable with two-level taxonomies and can be fed by both declarative data (questionnaires) and system events (non-conformities, delays, inspections).

Integrable with document management, quality, and MES systems, the software becomes the heart of visibility and collaboration in the supply chain, with tangible benefits in terms of efficiency, compliance, and sustainability.

---

## Functional Modules

| Module                               | Purpose                                                               | Actors Involved                      | Main Outputs                                          |
|-------------------------------------|-----------------------------------------------------------------------|--------------------------------------|-------------------------------------------------------|
| Supply network entity accreditation | Collect, validate and approve preliminary information                 | Buyer, Network actors                | Approved actor profile                                |
| Questionnaire management            | Create, assign, compile and evaluate data collection templates       | Sustainability Manager, Network actors| Completed questionnaires, scores, comments           |
| Audit & Inspections                 | Plan and record control and on-site audit activities                 | Inspector, Quality, Network actors   | Reports, inspection results, documentary evidence     |
| KPI & Performance                   | Calculate qualitative, logistics, ESG, risk indicators, etc.         | Sustainability, Quality, Management  | Performance dashboards, threshold exceeded alerts    |
| Sub-supply network entity and site management| Map multi-level supply chain and related operational sites    | Network actors, Buyer               | Supply chain tree structure, multi-level visibility  |
| Document management (integrated)     | Associate and version documents to network actors and activities     | All                                 | Document repository with permissions                 |

---

## Epic & User Stories

### Epic A: Supply Network Entity accreditation

1. As a buyer, I want to be able to send an accreditation request to a new supply network entity so that I can start the onboarding process in a traceable way.
2. As a supply network entity, I want to fill in the required data for accreditation in a clear interface so that I can quickly complete the onboarding.
3. As an administrator, I want to be able to approve or reject requests based on thresholds and received documents, so as to ensure compliance.
4. As an administrator, I want to be able to manually insert my supply network entities so as not to force already accredited supply network entities to re-accredit themselves.
5. As a user, I want to be able to massively insert my supply entities through Excel to avoid having to re-enter them all manually. It's important to be able to download a template and have validation before insertion.
6. As a supply chain operator, I want to view, search and filter all network entities so that I can quickly access key information and navigate between supply network entities, sites, sub-supply network entities and contacts.

### Epic B: Questionnaire management

1. As a sustainability manager, I want to create personalized questionnaire templates with conditional questions so as to collect only the relevant information for each type of supply network entity.
2. As a supply network entity, I want to receive automatic notifications and fill out the questionnaire directly from the web so as to meet deadlines.
3. As an evaluator, I want to analyze responses and assign scores and comments for each section so as to have a clear and historicized evaluation.

### Epic C: KPI & Performance

1. As a quality manager, I want the system to automatically generate KPIs of supply network entities from collected data so as to have an always updated dashboard.
2. As a decision-maker, I want to compare supply network entities' KPIs with each other by product category so as to facilitate the selection of the best partners.

---

## Main Flows (textual)

### Flow 1: Accreditation

1. Buyer initiates request → selects template → sends to network actor
2. Network actor fills in data and uploads documents
3. System verifies completeness → alert if fields are missing
4. Buyer approves / rejects → notification to network actor
5. Accreditation status updated

### Flow 2: Questionnaire completion

1. System assigns questionnaire → based on tags and rules
2. Supply network entity receives notification → accesses and completes
3. System automatically evaluates (rules)
4. Final evaluator performs manual check (if required)
5. Status and score saved on supply network entity's profile

### Flow 3: KPI generation

1. Questionnaires → evaluated → generate score for KPI
2. Other data (audits, complaints, delivery) → enrich KPI
3. KPI taxonomy → aggregates by type, site, product category
4. Visual dashboard for management
5. Alert if thresholds exceeded

### Flow 4: Performance analysis

1. Management accesses dashboard
2. Filter selection (period, supply network entity type, category)
3. Graphical comparison between supply network entities
4. Export or share analysis
5. Integration with decision-making systems

---

## Glossary

| Term                          | Definition                                                                      |
|-------------------------------|---------------------------------------------------------------------------------|
| Supply Network Entity accreditation| Initial onboarding and validation process for a new supply network entity |
| Questionnaire                 | Tool for collecting qualitative, ESG, logistics data, etc.                     |
| KPI                           | Key Performance Indicator                                                       |
| Tag                           | Configurable labels to classify supply network entities/questionnaires         |
| Score                         | Evaluation assigned to supply network entity based on responses or performance |
| Taxonomy                      | Two-level structure to classify and aggregate KPIs                             |
| Sub-supply network entity     | Entity downstream from the main supply network entity                          |
| Audit                         | On-site or remote verification of compliance or quality                        |

---

## Customer-oriented marketing presentation

### Your supply chain under control, anywhere in the world

In the fashion and manufacturing sector, supply network entities are a strategic resource, but also a source of risk and complexity. Our software was created to bring order, visibility and control to every phase of the supply network entity cycle, from accreditation to ESG performance evaluation.

With a single platform:

- You automate the accreditation of new supply network entities, reducing time and risks.
- You collect and evaluate information through dynamic and multilingual questionnaires.
- You track environmental, qualitative and logistics KPIs with an always updated dashboard.
- You involve supply network entities and sub-supply network entities, even in distant countries, with digitized flows.
- You ensure compliance with international quality and sustainability standards.

A ready-to-use solution, but customizable according to your rules and priorities. Developed for structured companies that want to reduce hidden costs, prevent non-conformities and choose more reliable partners.

---

## Sections to be completed

- Definition of specific KPIs (e.g. % on-time delivery, CO₂/piece, etc.)
- Alert thresholds for KPIs
- Tag taxonomy (supply network entity categories, product areas, etc.)
- User role names (e.g. evaluator, contact person, validator, etc.)
- Questionnaire templates for different areas (ethics, quality, safety, etc.)

---

## Synthetic use case

An Italian luxury brand, with over 200 supply network entities in Southeast Asia, has digitized the accreditation process by centralizing document collection and ESG questionnaire completion. Using dynamic rules based on tags, the system assigned environmental questionnaires only to the most impactful supply network entities. The automatically generated KPIs made it possible to identify supply network entities at high environmental risk and initiate replacement or improvement plans.

# Diagrams for main flows