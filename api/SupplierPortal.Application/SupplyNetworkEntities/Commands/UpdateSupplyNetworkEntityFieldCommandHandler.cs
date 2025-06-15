using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;
using System.Reflection;
using System.Text.Json;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Commands;

/// <summary>
/// Handler for updating a single field of a supply network entity [SF, CA]
/// </summary>
public class UpdateSupplyNetworkEntityFieldCommandHandler : IRequestHandler<UpdateSupplyNetworkEntityFieldCommand, SupplyNetworkEntityDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public UpdateSupplyNetworkEntityFieldCommandHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<SupplyNetworkEntityDto> Handle(UpdateSupplyNetworkEntityFieldCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Suppliers
            .FirstOrDefaultAsync(x => x.Id == request.EntityId, cancellationToken);

        if (entity == null)
        {
            throw new InvalidOperationException($"Entity with ID {request.EntityId} not found");
        }

        // Use reflection to update the field [SF] - Case insensitive property lookup
        var propertyInfo = entity.GetType().GetProperty(request.FieldName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
        if (propertyInfo == null || !propertyInfo.CanWrite)
        {
            throw new InvalidOperationException($"Field '{request.FieldName}' is not valid or not writable");
        }

        // Convert field value to proper type
        var convertedValue = ConvertFieldValue(request.FieldValue, propertyInfo.PropertyType);
        propertyInfo.SetValue(entity, convertedValue);

        // Update timestamp
        entity.LastModified = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<SupplyNetworkEntityDto>(entity);
    }

    /// <summary>
    /// Convert field value to the appropriate type [SF] - Handles JsonElement and other types
    /// </summary>
    private static object? ConvertFieldValue(object? value, Type targetType)
    {
        if (value == null)
            return null;

        // Handle nullable types
        if (targetType.IsGenericType && targetType.GetGenericTypeDefinition() == typeof(Nullable<>))
        {
            targetType = Nullable.GetUnderlyingType(targetType)!;
        }

        // Handle JsonElement from System.Text.Json
        if (value is JsonElement jsonElement)
        {
            return ConvertJsonElement(jsonElement, targetType);
        }

        // Handle string type directly
        if (targetType == typeof(string))
            return value.ToString();

        // Handle specific types
        if (targetType == typeof(bool))
            return Convert.ToBoolean(value);
        
        if (targetType == typeof(int))
            return Convert.ToInt32(value);
            
        if (targetType == typeof(decimal))
            return Convert.ToDecimal(value);
            
        if (targetType == typeof(DateTime))
            return Convert.ToDateTime(value);

        if (targetType.IsEnum)
            return Enum.Parse(targetType, value.ToString()!);

        // Fallback to string conversion for IConvertible types
        try
        {
            return Convert.ChangeType(value, targetType);
        }
        catch (InvalidCastException)
        {
            // If direct conversion fails, try via string
            return Convert.ChangeType(value.ToString(), targetType);
        }
    }

    /// <summary>
    /// Convert JsonElement to the target type [SF]
    /// </summary>
    private static object? ConvertJsonElement(JsonElement jsonElement, Type targetType)
    {
        if (targetType == typeof(string))
            return jsonElement.GetString();

        if (targetType == typeof(bool))
            return jsonElement.GetBoolean();

        if (targetType == typeof(int))
            return jsonElement.GetInt32();

        if (targetType == typeof(decimal))
            return jsonElement.GetDecimal();

        if (targetType == typeof(DateTime))
            return jsonElement.GetDateTime();

        if (targetType.IsEnum)
            return Enum.Parse(targetType, jsonElement.GetString()!);

        // For other types, convert to string first
        return Convert.ChangeType(jsonElement.GetString(), targetType);
    }
}
