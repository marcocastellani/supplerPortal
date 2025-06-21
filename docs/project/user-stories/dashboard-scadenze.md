# 📋 User Stories - Dashboard Deadlines

## 🎯 Objective
Create an initial dashboard that shows users their deadlines. These deadlines are questionnaires that must be completed by the user or by an agent appointed by the user. There must be questionnaires expiring in the next 4 weeks and remediations resulting from each individual questionnaire.

## 👥 User Roles
- **Users**: can only see supply network entities assigned to them
- **Agents**: work on supply network entities assigned to users to certify questionnaires and plan inspection visits
- **Supply Network Entities**: can only see their questionnaires
- **Supervisors**: see everything
- **Administrators**: see everything and configure the application

## 🔧 Technical Constraints
- Responsive and mobile-friendly dashboard
- Use Storybook Remira: https://storybook.remira.com
- Libraries: `@remira/ucpaccelerator_unified_utils": "0.1.263"`, `@remira/unifiedui": "1.0.239"`
- Authentication with Keycloak (already implemented)
- Authorization with RBAC (already implemented)
- Application is a micro frontend
- Pagination for performance
- Customizable alert system

---

## 📖 User Stories

### #1 - Display expiring questionnaires (User) - DONE ✅
**As** a user  
**I want** to display questionnaires of my assigned supply network entities expiring in the next 4 weeks  
**So that** I don't miss important deadlines and can prompt supply network entities or block them

**Acceptance Criteria:**
- ✅ I see only questionnaires of supply network entities assigned to me
- ✅ Deadlines are filtered for the next 4 weeks from the current date
- ✅ For each questionnaire I see: network actor name, questionnaire type, expiration date, status
- ✅ Questionnaires are ordered by expiration date (most urgent first)
- ✅ The dashboard is responsive and mobile-friendly

**Edge Cases:** 
- User without assigned supply network entities
- Already expired questionnaires
- Connection problems

**Backend Implementation:**
- **API:** `GET /api/dashboard/questionnaires`
- **MediatR Handler:** `GetUpcomingQuestionnairesQuery` + `GetUpcomingQuestionnairesQueryHandler`
- **DTO:** `UpcomingQuestionnaireDto`, `GetUpcomingQuestionnairesRequest`

**Frontend Implementation:**
- **Component:** `DashboardQuestionnaires` using UnifiedUI components
- **Page:** Integration in main dashboard
- **Test:** Unit test component + integration test API

---

### #2 - Display active remediations (User)
**As** a user  
**I want** to display open remediations associated with questionnaires of my supply network entities  
**So that** I can monitor ongoing corrective actions and their deadlines

**Acceptance Criteria:**
- ✅ I see only remediations of supply network entities assigned to me
- ✅ For each remediation I see: network actor, description, expiration date, responsible person
- ✅ Remediations are ordered by deadline
- ✅ I can distinguish expired remediations from those still valid

**Edge Cases:**
- Remediations without deadline
- Already closed remediations but shown by error
- Remediations without assigned responsible person

**Backend Implementation:**
- **API:** `GET /api/dashboard/remediations`
- **MediatR Handler:** `GetActiveRemediationsQuery` + `GetActiveRemediationsQueryHandler`
- **DTO:** `ActiveRemediationDto`, `GetActiveRemediationsRequest`

**Frontend Implementation:**
- **Component:** `DashboardRemediations`
- **Test:** Unit test + integration test

---

### #3 - Agent dashboard for visit planning
**As** an agent  
**I want** to display questionnaires and remediations of supply network entities assigned to users I work for  
**So that** I can plan inspection visits based on priorities and deadlines

**Acceptance Criteria:**
- ✅ I see questionnaires of all supply network entities of users I'm appointed for
- ✅ I can filter by specific user
- ✅ I see remediations that require re-verification by me
- ✅ I can mark inspection visits as planned

**Edge Cases:**
- Agent without assigned users
- Visit planning conflicts
- Users with many supply network entities

**Backend Implementation:**
- **API:** `GET /api/dashboard/agent-overview`
- **MediatR Handler:** `GetAgentDashboardQuery` + `GetAgentDashboardQueryHandler`
- **DTO:** `AgentDashboardDto`, `GetAgentDashboardRequest`

**Frontend Implementation:**
- **Component:** `AgentDashboard`
- **Features:** Filters, visit planning
- **Test:** Unit test + integration test

---

### #4 - Supply network actor dashboard (self-service)
**As** a supply network actor  
**I want** to display my expiring questionnaires and remediations to manage  
**So that** I can complete questionnaires on time and resolve non-conformities

**Acceptance Criteria:**
- ✅ I see only my questionnaires and remediations
- ✅ I can directly access questionnaire compilation
- ✅ I see the status of my remediations (open/closed)
- ✅ I can upload documents for remediations

**Edge Cases:**
- Supply network actor without assigned questionnaires
- Draft vs published questionnaires
- Remediations without required documents

**Backend Implementation:**
- **API:** `GET /api/dashboard/supply-network-overview`
- **MediatR Handler:** `GetSupplyNetworkDashboardQuery` + `GetSupplyNetworkDashboardQueryHandler`
- **DTO:** `SupplyNetworkDashboardDto`

**Frontend Implementation:**
- **Component:** `SupplyNetworkDashboard`
- **Features:** Direct links to questionnaires, document upload
- **Test:** Unit test + integration test

---

### #5 - Supervisor/administrator view
**As** a supervisor/administrator  
**I want** to have a global view of all questionnaires and remediations  
**So that** I can monitor the general compliance status

**Acceptance Criteria:**
- ✅ I see all expiring questionnaires of all supply network entities
- ✅ I can filter by user, agent, supply network actor
- ✅ I see aggregate statistics (% completion, open remediations, etc.)
- ✅ I can export reports

**Edge Cases:**
- Large data volumes
- Complex multiple filters
- Performance with many users

**Backend Implementation:**
- **API:** `GET /api/dashboard/admin-overview`
- **MediatR Handler:** `GetAdminDashboardQuery` + `GetAdminDashboardQueryHandler`
- **DTO:** `AdminDashboardDto`, `DashboardStatsDto`

**Frontend Implementation:**
- **Component:** `AdminDashboard`
- **Features:** Advanced filters, statistics, export
- **Test:** Unit test + integration test

---

### #6 - Pagination and performance
**As** any user  
**I want** the dashboard to load quickly even with lots of data  
**So that** I have a smooth experience

**Acceptance Criteria:**
- ✅ Pagination for lists with more than 20 elements
- ✅ Progressive loading (lazy loading)
- ✅ Loading indicators
- ✅ Intelligent data caching

**Edge Cases:**
- Slow connection
- Large datasets
- Frequent refreshes

**Backend Implementation:**
- **Pagination:** Implement `PagedResult<T>` in all queries
- **Caching:** Response caching for low-volatility data
- **Performance:** Database indexes, optimized queries

**Frontend Implementation:**
- **Components:** Integration with UnifiedUI pagination components
- **Loading:** Skeleton loading, progressive enhancement
- **Caching:** React Query for client-side caching

---

### #7 - Customizable alert system
**As** a user/agent  
**I want** to set up customized alerts for imminent deadlines  
**So that** I receive proactive notifications

**Acceptance Criteria:**
- ✅ I can set up alerts for deadlines (e.g. 1 week before)
- ✅ I can configure notification type (email, in-app, push)
- ✅ Different alerts for questionnaires vs remediations
- ✅ I can disable/modify existing alerts

**Edge Cases:**
- Multiple alerts for same event
- User without configured email
- Different time zone

**Backend Implementation:**
- **API:** `POST/PUT /api/user-preferences/alerts`, `GET /api/user-preferences/alerts`
- **MediatR Handler:** `CreateUserAlertCommand`, `UpdateUserAlertCommand`, `GetUserAlertsQuery`
- **DTO:** `UserAlertDto`, `CreateUserAlertRequest`, `UpdateUserAlertRequest`
- **Background Service:** Job for sending notifications

**Frontend Implementation:**
- **Component:** `AlertSettings`, `AlertNotification`
- **Features:** CRUD alerts, notification preferences
- **Test:** Unit test + integration test

---

## 🎯 Implementation Summary

### Backend (.NET Core + MediatR)
- **New endpoints:** 7 main APIs
- **Handlers:** 10+ Command/Query handlers
- **DTO:** 15+ data transfer objects
- **Background Services:** 1 for alert management
- **Test:** Unit test for each handler + integration test

### Frontend (React + TypeScript)
- **Main components:** 7 dashboard components
- **Pages:** 1 main dashboard page with routing for roles
- **Utilities:** State management, caching, notifications
- **Test:** Unit test for each component + integration test

### Database
- **New tables:** UserAlerts, DashboardPreferences (if needed)
- **Indexes:** Query optimization for performance
- **Migrations:** Schema update scripts

### Implementation Priority
1. **#1** - User questionnaire display (base)
2. **#2** - User remediation display
3. **#6** - Pagination and performance
4. **#3** - Agent dashboard
5. **#4** - Supply network actor dashboard
6. **#5** - Supervisor/admin view
7. **#7** - Alert system

---

## 📝 Implementation Notes
- Always use MediatR for logical separation
- UnifiedUI components for visual consistency
- Test-Driven Development (TDD)
- Mobile-first responsive design
- RBAC authorization on every endpoint
- Logging and monitoring for troubleshooting
- API documentation with Swagger