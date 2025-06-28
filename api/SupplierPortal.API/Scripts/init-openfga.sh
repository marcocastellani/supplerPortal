#!/bin/bash

echo "Waiting for OpenFGA to be ready..."
until curl -f http://localhost:8080/healthz > /dev/null 2>&1; do
  sleep 2
done

echo "Creating OpenFGA store..."
STORE_RESPONSE=$(curl -X POST http://localhost:8080/stores \
  -H "Content-Type: application/json" \
  -d '{
    "name": "supplier-portal"
  }')

STORE_ID=$(echo $STORE_RESPONSE | jq -r '.id')
echo "Created store with ID: $STORE_ID"

echo "Creating authorization model..."
MODEL_RESPONSE=$(curl -X POST "http://localhost:8080/stores/$STORE_ID/authorization-models" \
  -H "Content-Type: application/json" \
  -d @../openfga-model.json)

MODEL_ID=$(echo $MODEL_RESPONSE | jq -r '.authorization_model_id')
echo "Created model with ID: $MODEL_ID"

echo "Seeding initial relationships..."

# Create organization
curl -X POST "http://localhost:8080/stores/$STORE_ID/write" \
  -H "Content-Type: application/json" \
  -d '{
    "writes": {
      "tuple_keys": [
        {
          "user": "user:admin@example.com",
          "relation": "administrator",
          "object": "organization:remira"
        },
        {
          "user": "user:operator@example.com",
          "relation": "supply_chain_operator",
          "object": "organization:remira"
        },
        {
          "user": "user:sustainability@example.com",
          "relation": "sustainability_manager",
          "object": "organization:remira"
        },
        {
          "user": "user:supplier1@example.com",
          "relation": "network_actor",
          "object": "organization:remira"
        }
      ]
    },
    "authorization_model_id": "'$MODEL_ID'"
  }'

# Create menu permissions
echo "Setting up menu permissions..."
curl -X POST "http://localhost:8080/stores/$STORE_ID/write" \
  -H "Content-Type: application/json" \
  -d '{
    "writes": {
      "tuple_keys": [
        {
          "user": "organization:remira#administrator",
          "relation": "can_view",
          "object": "menu_item:dashboard"
        },
        {
          "user": "organization:remira#supply_chain_operator",
          "relation": "can_view",
          "object": "menu_item:dashboard"
        },
        {
          "user": "organization:remira#sustainability_manager",
          "relation": "can_view",
          "object": "menu_item:dashboard"
        },
        {
          "user": "organization:remira#administrator",
          "relation": "can_view",
          "object": "menu_item:supply-network"
        },
        {
          "user": "organization:remira#supply_chain_operator",
          "relation": "can_view",
          "object": "menu_item:supply-network"
        },
        {
          "user": "organization:remira#sustainability_manager",
          "relation": "can_view",
          "object": "menu_item:supply-network"
        },
        {
          "user": "organization:remira#administrator",
          "relation": "can_view",
          "object": "menu_item:new-entity"
        },
        {
          "user": "organization:remira#supply_chain_operator",
          "relation": "can_view",
          "object": "menu_item:new-entity"
        },
        {
          "user": "organization:remira#administrator",
          "relation": "can_view",
          "object": "menu_item:questionnaire-templates"
        },
        {
          "user": "organization:remira#sustainability_manager",
          "relation": "can_view",
          "object": "menu_item:questionnaire-templates"
        },
        {
          "user": "organization:remira#administrator",
          "relation": "can_view",
          "object": "menu_item:template-creation"
        },
        {
          "user": "organization:remira#sustainability_manager",
          "relation": "can_view",
          "object": "menu_item:template-creation"
        },
        {
          "user": "organization:remira#administrator",
          "relation": "can_view",
          "object": "menu_item:questionnaire-assignments"
        },
        {
          "user": "organization:remira#supply_chain_operator",
          "relation": "can_view",
          "object": "menu_item:questionnaire-assignments"
        },
        {
          "user": "organization:remira#sustainability_manager",
          "relation": "can_view",
          "object": "menu_item:questionnaire-assignments"
        },
        {
          "user": "organization:remira#administrator",
          "relation": "can_view",
          "object": "menu_item:settings"
        }
      ]
    },
    "authorization_model_id": "'$MODEL_ID'"
  }'

echo "OpenFGA initialization complete!"
echo "Store ID: $STORE_ID"
echo "Model ID: $MODEL_ID"
echo ""
echo "Save these values to your .env file:"
echo "OPENFGA_STORE_ID=$STORE_ID"
echo "OPENFGA_MODEL_ID=$MODEL_ID"