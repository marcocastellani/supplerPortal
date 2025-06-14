#!/bin/zsh

# 🚀 SupplierPortal Debug Launcher
# Avvia contemporaneamente API (.NET Core) e Frontend (React) in modalità debug

set -e

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Funzione per stampare messaggi colorati
print_message() {
    echo -e "${2}[$(date '+%H:%M:%S')] $1${NC}"
}

# Funzione di cleanup
cleanup() {
    print_message "🛑 Arresto dei servizi..." $RED
    
    # Termina tutti i processi figli e i loro gruppi
    if [[ -n $API_PID ]] && kill -0 $API_PID 2>/dev/null; then
        kill -TERM $API_PID 2>/dev/null || true
        sleep 1
        kill -KILL $API_PID 2>/dev/null || true
        print_message "✅ API terminata" $YELLOW
    fi
    
    if [[ -n $FRONTEND_PID ]] && kill -0 $FRONTEND_PID 2>/dev/null; then
        kill -TERM $FRONTEND_PID 2>/dev/null || true
        sleep 1
        kill -KILL $FRONTEND_PID 2>/dev/null || true
        print_message "✅ Frontend terminato" $YELLOW
    fi
    
    # Termina i processi tail per i log
    pkill -P $$ 2>/dev/null || true
    
    # Termina eventuali processi rimasti con più precisione
    pkill -f "dotnet run.*SupplierPortal.API" 2>/dev/null || true
    pkill -f "npm run dev" 2>/dev/null || true
    pkill -f "vite.*--host" 2>/dev/null || true
    
    # Pulisci i file di log
    rm -f api.log frontend.log 2>/dev/null || true
    
    print_message "🏁 Cleanup completato" $GREEN
    exit 0
}

# Gestione segnali per cleanup
trap cleanup SIGINT SIGTERM

print_message "🚀 Avvio SupplierPortal in modalità debug..." $CYAN

# Verifica che le cartelle esistano
if [[ ! -d "api/SupplierPortal.API" ]]; then
    print_message "❌ Errore: cartella api/SupplierPortal.API non trovata!" $RED
    exit 1
fi

if [[ ! -d "front" ]]; then
    print_message "❌ Errore: cartella front non trovata!" $RED
    exit 1
fi

# Controlla dipendenze frontend
print_message "📦 Controllo dipendenze frontend..." $BLUE
cd front
if [[ ! -d "node_modules" ]]; then
    print_message "📥 Installazione dipendenze npm..." $YELLOW
    npm install
fi
cd ..

print_message "🔧 Avvio API .NET Core..." $PURPLE

# Avvia API in background
cd api/SupplierPortal.API
dotnet run --configuration Debug > ../../api.log 2>&1 &
API_PID=$!
cd ../..

print_message "⚡ API avviata (PID: $API_PID)" $PURPLE

# Aspetta che l'API si avvii
sleep 3

print_message "🎨 Avvio Frontend React..." $BLUE

# Avvia Frontend in background
cd front
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

print_message "⚡ Frontend avviato (PID: $FRONTEND_PID)" $BLUE

print_message "✨ Entrambi i servizi sono in esecuzione!" $GREEN
print_message "🌐 Frontend: http://localhost:5173" $CYAN
print_message "🔌 API: https://localhost:7020 (o http://localhost:5020)" $CYAN
print_message "📋 Premi Ctrl+C per fermare tutti i servizi" $YELLOW

# Funzione per mostrare i log con prefisso colorato
show_logs() {
    # Salva i PID dei processi tail per poterli terminare
    tail -f api.log 2>/dev/null | while read line; do
        echo -e "${PURPLE}[API]${NC} $line"
    done &
    TAIL_API_PID=$!
    
    tail -f frontend.log 2>/dev/null | while read line; do
        echo -e "${BLUE}[FRONTEND]${NC} $line"
    done &
    TAIL_FRONTEND_PID=$!
    
    # Aspetta che uno dei processi tail termini (normalmente non succede)
    wait $TAIL_API_PID $TAIL_FRONTEND_PID 2>/dev/null
}

# Mostra i log in tempo reale
print_message "📊 Visualizzazione log in tempo reale..." $GREEN
echo -e "${YELLOW}=================== LOGS ===================${NC}"

# Aspetta che entrambi i servizi siano completamente avviati
print_message "⏳ Attendo che i servizi si avviino completamente..." $YELLOW
sleep 5

# Controlla che i file di log esistano
if [[ ! -f api.log ]]; then
    touch api.log
fi
if [[ ! -f frontend.log ]]; then
    touch frontend.log
fi

show_logs

# Questo punto non dovrebbe mai essere raggiunto in condizioni normali
print_message "🔚 Script terminato inaspettatamente" $RED
