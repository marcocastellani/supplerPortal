# Role-Based Access Control (RBAC) Implementation

## Overview

The SupplierPortal implements a comprehensive Role-Based Access Control system using **OpenFGA** for fine-grained authorization. This system protects menus, pages, and API endpoints based on user roles and permissions.

## Architecture

### Components

1. **OpenFGA** - Authorization engine for fine-grained permissions
2. **Keycloak** - Authentication provider (existing)
3. **Frontend Authorization** - React hooks and components for UI protection
4. **API Authorization** - Custom attributes and middleware for endpoint protection

### User Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| **Administrator** | Full system access | All features and data |
| **Supply Chain Operator** | Manages supply network entities | Entity management, questionnaire assignments |
| **Sustainability Manager** | Manages questionnaires and templates | Template creation, questionnaire management |
| **Network Actor** | External suppliers | Only their assigned questionnaires |

### Menu Access Matrix

| Menu Item | Administrator | Supply Chain Operator | Sustainability Manager | Network Actor |
|-----------|--------------|----------------------|----------------------|---------------|
| Dashboard | ✓ | ✓ | ✓ | ✗ |
| Supply Network | ✓ | ✓ | ✓ | ✗ |
| New Entity | ✓ | ✓ | ✗ | ✗ |
| Questionnaire Templates | ✓ | ✗ | ✓ | ✗ |
| Template Creation | ✓ | ✗ | ✓ | ✗ |
| Questionnaire Assignments | ✓ | ✓ | ✓ | ✗ |
| Settings | ✓ | ✗ | ✗ | ✗ |

## Setup Instructions

### 1. Start OpenFGA Services

```bash
# From the api/SupplierPortal.API directory
docker-compose up -d

# Wait for services to be ready
docker-compose ps
```

### 2. Initialize OpenFGA

```bash
# Make the script executable
chmod +x Scripts/init-openfga.sh

# Run initialization
cd Scripts
./init-openfga.sh

# Save the output Store ID and Model ID to your .env file
```

### 3. Configure Application

Update `appsettings.Development.json`:

```json
{
  "OpenFga": {
    "ApiUrl": "http://localhost:8080",
    "StoreId": "<YOUR_STORE_ID>",
    "ModelId": "<YOUR_MODEL_ID>",
    "OrganizationId": "remira"
  }
}
```

## Frontend Implementation

### Using Authorization Hook

```typescript
import { useAuthorization } from '@/hooks/useAuthorization';

function MyComponent() {
  const { canViewMenuItem, hasRole, isAdministrator } = useAuthorization();

  if (!canViewMenuItem('/questionnaires/templates')) {
    return <AccessDenied />;
  }

  return <TemplateList />;
}
```

### Protected Routes

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

<Route 
  path="/settings" 
  element={
    <ProtectedRoute requiredRole="administrator">
      <Settings />
    </ProtectedRoute>
  } 
/>
```

### Conditional Rendering

```typescript
const { hasRole } = useAuthorization();

return (
  <div>
    {hasRole('administrator') && (
      <Button onClick={handleDelete}>Delete</Button>
    )}
  </div>
);
```

## API Implementation

### Using Role-Based Authorization

```csharp
[ApiController]
[Authorize]
[Route("api/[controller]")]
public class TemplatesController : ControllerBase
{
    [HttpPost]
    [RequireRole("administrator", "sustainability_manager")]
    public async Task<IActionResult> CreateTemplate([FromBody] CreateTemplateCommand command)
    {
        // Only administrators and sustainability managers can access
    }
}
```

### Using Permission-Based Authorization

```csharp
[HttpPut("{id}")]
[RequirePermission("can_edit", "questionnaire_template")]
public async Task<IActionResult> UpdateTemplate(Guid id, [FromBody] UpdateTemplateCommand command)
{
    // Checks if user can edit this specific template
}
```

### Data-Level Security

```csharp
public class SupplyNetworkEntitiesController : ControllerBase
{
    private readonly IAuthorizationService _authorizationService;

    [HttpGet]
    public async Task<IActionResult> GetEntities()
    {
        var userId = GetCurrentUserId();
        var regions = await _authorizationService.GetAccessibleRegionsAsync(userId);
        
        // Filter entities by accessible regions
        var entities = await _repository.GetEntitiesByRegions(regions);
        return Ok(entities);
    }
}
```

## OpenFGA Model Structure

### Types

1. **user** - Individual users
2. **role** - System roles (not used directly, integrated into organization)
3. **organization** - Main organizational unit with role relations
4. **menu_item** - UI menu items with view permissions
5. **supply_network_entity** - Entities with owner and region relations
6. **questionnaire_template** - Templates with view/edit permissions
7. **questionnaire** - Individual questionnaires with assignment relations
8. **region** - Geographic regions for data filtering

### Key Relations

- `organization#administrator` - User is an administrator
- `menu_item#can_view` - User can view menu item
- `supply_network_entity#owner` - User owns the entity
- `questionnaire#assigned_to` - Questionnaire assigned to user

## Testing Authorization

### 1. Test Menu Access

```bash
# Get accessible menu items for current user
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:5000/api/authorization/menu-items
```

### 2. Test Role Check

```bash
# Check user roles
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:5000/api/authorization/roles
```

### 3. OpenFGA Playground

Access the OpenFGA playground at `http://localhost:8082` to:
- View and test the authorization model
- Check relationships
- Debug permission issues

## Troubleshooting

### Common Issues

1. **Menu items not showing**
   - Check OpenFGA relationships are created
   - Verify user email matches OpenFGA user ID
   - Check browser console for authorization errors

2. **API returns 403 Forbidden**
   - Verify role assignments in OpenFGA
   - Check JWT token contains correct email claim
   - Review API authorization attributes

3. **OpenFGA connection errors**
   - Ensure Docker services are running
   - Check OpenFGA configuration in appsettings
   - Verify network connectivity

### Debug Commands

```bash
# Check OpenFGA health
curl http://localhost:8080/healthz

# View Docker logs
docker-compose logs openfga

# Test authorization check
curl -X POST http://localhost:8080/stores/<STORE_ID>/check \
  -H "Content-Type: application/json" \
  -d '{
    "tuple_key": {
      "user": "user:admin@example.com",
      "relation": "administrator",
      "object": "organization:remira"
    }
  }'
```

## Security Best Practices

1. **Principle of Least Privilege** - Users get minimal required permissions
2. **Defense in Depth** - Authorization at multiple layers (UI, API, Data)
3. **Audit Trail** - All permission checks are logged
4. **Regular Reviews** - Periodically review role assignments
5. **Fail Secure** - Default to deny when authorization fails

## Future Enhancements

1. **Dynamic Permission Management** - UI for managing permissions
2. **Delegation** - Allow users to delegate permissions
3. **Time-based Access** - Temporary permission grants
4. **Attribute-based Access Control (ABAC)** - More complex permission rules
5. **Integration with External Identity Providers** - Support for AD/LDAP groups