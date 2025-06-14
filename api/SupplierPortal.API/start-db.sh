#!/bin/bash

# Script per avviare Azure SQL Edge in Docker per SupplierPortal

echo "🚀 Avvio Azure SQL Edge per SupplierPortal..."
echo "📋 Configurazione:"
echo "   - Container: supplierportal-sqlserver"
echo "   - Porta: 1433"
echo "   - Database: SupplierPortalDb"
echo "   - User: sa"
echo "   - Password: SupplierPortal123!"
echo ""

# Avvia i container
docker-compose up -d

# Attendi che SQL Server sia pronto
echo "⏳ Attendo che SQL Server sia pronto..."
sleep 10

# Verifica la connessione
echo "🔍 Verifica connessione..."
docker exec supplierportal-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "SupplierPortal123!" -Q "SELECT 'SQL Server is ready!' as Status"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Azure SQL Edge è pronto!"
    echo "📝 Connection String:"
    echo "   Server=localhost,1433;Database=SupplierPortalDb;User Id=sa;Password=SupplierPortal123!;TrustServerCertificate=true;MultipleActiveResultSets=true"
    echo ""
    echo "🎯 Ora puoi eseguire le migration con:"
    echo "   dotnet ef database update"
else
    echo ""
    echo "❌ Errore nell'avvio di SQL Server"
    echo "🔍 Controlla i log con: docker-compose logs"
fi
