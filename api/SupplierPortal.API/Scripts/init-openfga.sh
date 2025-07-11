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
curl -X POST "http://localhost:8080/stores/01JYXM00Z98XN52AGFAGRQ9R6E/write" \
  -H "Content-Type: application/json" \
  -d '{
    "writes": {
      "tuple_keys": [
        {
          "user": "user:c327394f-8f87-49a7-8fd9-a1bc6917e2e7",
          "relation": "can_view",
          "object": "menu_item:dashboard"
        },
        {
          "user": "user:c327394f-8f87-49a7-8fd9-a1bc6917e2e7",
          "relation": "can_view",
          "object": "menu_item:supply-network"
        },
        {
          "user": "user:c327394f-8f87-49a7-8fd9-a1bc6917e2e7",
          "relation": "can_view",
          "object": "menu_item:new-entity"
        },
        {
          "user": "user:c327394f-8f87-49a7-8fd9-a1bc6917e2e7",
          "relation": "can_view",
          "object": "menu_item:questionnaire-templates"
        },
        {
          "user": "user:c327394f-8f87-49a7-8fd9-a1bc6917e2e7",
          "relation": "can_view",
          "object": "menu_item:template-creation"
        },
        {
          "user": "user:c327394f-8f87-49a7-8fd9-a1bc6917e2e7",
          "relation": "can_view",
          "object": "menu_item:questionnaire-assignments"
        },
         {
          "user": "user:c327394f-8f87-49a7-8fd9-a1bc6917e2e7",
          "relation": "can_view",
          "object": "menu_item:settings"
        }
      ]
    },
    "authorization_model_id": "'01JYXMR4NCM68C7MK49Y2C3MP7'"
  }'

echo "OpenFGA initialization complete!"
echo "Store ID: $STORE_ID"
echo "Model ID: $MODEL_ID"
echo ""
echo "Save these values to your .env file:"
echo "OPENFGA_STORE_ID=$STORE_ID"
echo "OPENFGA_MODEL_ID=$MODEL_ID"