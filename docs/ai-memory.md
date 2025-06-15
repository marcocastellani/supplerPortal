# 🧠 AI Memory - SupplierPortal

## 🎯 **CRITICAL PATTERNS**

### API (.NET Core)
- **Versioning**: Always use `api-version=2025-06-01`
- **MediatR**: Required for all Command/Query
- **DbSet**: Use correct names (`Suppliers` not `SupplyNetworkEntities`)
- **GetById**: Always dedicated Query/Handler, never filter paginated lists
- **AutoMapper**: Always parameterless constructor in Profile classes

### Frontend (React)
- **Services**: Use axios with API versioning
- **Components**: Composition over inheritance, <200 lines per file
- **Hooks**: Custom hooks for data logic separation
- **UI**: CSS Grid 30%/70% for professional layouts
- **Error Handling**: Categorize network/validation/server errors

### Architecture
- **CQRS**: Separate Command/Query handlers
- **Clean Architecture**: Domain → Application → Infrastructure → API
- **Modular**: Each file single responsibility, max ~200 lines
- **Testing**: Unit (sync logic) + Integration (async/DB)

## 📁 **CURRENT ARCHITECTURE**

### Backend (api/)
```
SupplierPortal.API/Controllers/
├── SupplyNetworkEntitiesController.cs - Main CRUD + /children endpoint
├── DashboardController.cs - Dashboard queries

SupplierPortal.Application/SupplyNetworkEntities/
├── Commands/CreateSupplyNetworkEntityCommand* - MediatR create
├── Queries/GetSupplyNetworkEntity* - GetById, GetChildren, Search
├── DTOs/SupplyNetworkEntityDto.cs - Main DTO

SupplierPortal.Domain/
├── Entities/SupplyNetworkEntities.cs - Main entity
├── Enums/EntityType.cs, RoleInSupplyChain.cs, AccreditationStatus.cs
```

### Frontend (front/src/)
```
pages/
├── EntityDetailPage.tsx - ⭐ REFACTORED 180 lines (was 696)
├── SupplyNetwork.tsx - Main listing page

components/EntityDetail/
├── EntityDetailCard.tsx - Reusable card component
├── EntityHeroSection.tsx - Hero with entity info
├── EntityTabNavigation.tsx - Tab navigation
├── SubEntitiesList.tsx - Children entities grid
├── tabs/ - Individual tab components (5 files)

hooks/
├── useEntityDetail.ts - Data fetching hook
├── useEntityUpdate.ts - Field update hook

services/
├── supplyNetworkEntitiesService.ts - API calls
```

## 🚀 **ENDPOINTS**

### API (All with api-version=2025-06-01)
- `GET /api/supplynetworkentities` - Paginated list
- `GET /api/supplynetworkentities/{id}` - Single entity
- `GET /api/supplynetworkentities/{parentId}/children` - Sub-entities
- `GET /api/supplynetworkentities/search` - Typeahead search
- `POST /api/supplynetworkentities` - Create entity

## 🎯 **COMPLETED FEATURES**

### ✅ Entity Detail Page Refactor
- **FROM**: 696-line monolithic component
- **TO**: 13+ modular components following all global rules
- **Structure**: Hero + Tab Navigation + Individual Tab Components + Custom Hooks
- **Compliance**: SF, CA, RP, DRY, CSD, AC, TDT ✅

### ✅ Backend Children Endpoint  
- **Endpoint**: `GET /api/supplynetworkentities/{parentId}/children`
- **MediatR**: GetSupplyNetworkEntityChildrenQuery + Handler
- **Tested**: ✅ Curl tested, JSON output correct

### ✅ Service Layer Extension
- **Method**: `getEntityChildren(parentId: string)`
- **Method**: `updateEntityField(id, field, value)`
- **Integration**: Used in SubEntitiesList component

## 🔧 **CURRENT STATUS**
- **Backend**: ✅ All endpoints working
- **Frontend**: ✅ Fully modular, <200 lines per file
- **Build**: ✅ No errors, all tests pass
- **Documentation**: ✅ Updated with best practices

---
📌 **Quick Reference for AI**: Focus on modular, testable code. Always follow global rules (SF, CA, RP, DRY). Use MediatR for backend, custom hooks for frontend. Max 200 lines per file.
