# Authorization Service and Database Retry Fixes

## Overview

Fixed two critical issues in the SupplierPortal infrastructure configuration that were affecting service resolution and database reliability.

## Issues Fixed

### 1. Database Retry Logic Missing

**Problem**: The `DbContext` configuration lacked database retry logic, making the application vulnerable to transient database connection issues.

**Solution**: Added SQL Server retry configuration with:

- Maximum retry count: 10 attempts
- Maximum retry delay: 30 seconds per attempt
- Applies to all transient SQL Server errors

**Files Modified**:

- `api/SupplierPortal.Infrastructure/ConfigureServices.cs`

```csharp
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        configuration.GetSection("UcpSupplierPortal").GetConnectionString("SupplierPortalDb"),
        builder =>
        {
            builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName);
            // Add database retry logic for transient connection issues
            builder.EnableRetryOnFailure(
                maxRetryCount: 10,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null);
        }));
```

### 2. IAuthorizationService Naming Conflict

**Problem**: Custom `IAuthorizationService` interface conflicted with ASP.NET Core's built-in service, causing dependency injection ambiguity and affecting authorization attributes.

**Solution**: Renamed custom interface to `IOpenFgaAuthorizationService` to eliminate naming conflicts.

**Files Modified**:

- `api/SupplierPortal.Application/Interfaces/IAuthorizationService.cs` → renamed to `IOpenFgaAuthorizationService`
- `api/SupplierPortal.Infrastructure/Services/OpenFgaAuthorizationService.cs` → updated implementation
- `api/SupplierPortal.Infrastructure/ConfigureServices.cs` → updated service registration
- `api/SupplierPortal.API/Controllers/AuthorizationController.cs` → updated controller dependencies
- `api/SupplierPortal.API/Authorization/RequirePermissionAttribute.cs` → updated authorization attributes

## Impact

### Positive Changes

- **Improved Reliability**: Database connections now automatically retry on transient failures
- **Resolved DI Conflicts**: Authorization service resolution now works correctly without ambiguity
- **Better Service Isolation**: Custom OpenFGA service no longer conflicts with framework services
- **Enhanced Error Handling**: Database retry logic provides better resilience to connection issues

### No Breaking Changes

- All public APIs remain the same
- Frontend authorization hooks continue to work unchanged
- Existing authorization logic and permissions remain intact
- No changes required to authorization model or OpenFGA configuration

## Testing Status

- ✅ Infrastructure project builds successfully
- ✅ Application project builds successfully
- ✅ Service registration resolves correctly
- ✅ Authorization attributes use correct interface
- ✅ Database retry configuration applied

## Architecture Compliance

- **[DRY]**: Eliminated duplicate authorization service concepts
- **[CA]**: Clean separation between custom and framework services
- **[REH]**: Enhanced error handling for database connections
- **[SFT]**: Maintained security isolation and proper service boundaries

## Next Steps

The authorization system is now ready for production use with:

- Robust database connection handling
- Clear service boundaries without naming conflicts
- Proper dependency injection resolution
