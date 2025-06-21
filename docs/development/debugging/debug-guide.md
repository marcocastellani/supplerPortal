# 🚀 Debug Launcher per SupplierPortal

Questo script avvia contemporaneamente l'API .NET Core e il frontend React in modalità debug, mostrando i log di entrambi in console con colori distinti.

## 🔧 Utilizzo

### Avvio rapido
```bash
./debug-start.sh
```

### Cosa fa lo script
1. **Controlla le dipendenze** del frontend (installa `node_modules` se necessario)
2. **Avvia l'API** .NET Core in modalità Debug dalla cartella `api/SupplierPortal.API/`
3. **Avvia il Frontend** React in modalità development dalla cartella `front/`
4. **Mostra i log** in tempo reale con prefissi colorati:
   - 🟣 `[API]` - Log dell'API .NET Core
   - 🔵 `[FRONTEND]` - Log del frontend React

### URLs disponibili
- **Frontend**: http://localhost:5173
- **API**: https://localhost:7020 (HTTPS) o http://localhost:5020 (HTTP)

## 🛑 Come fermare

Premi `Ctrl+C` per fermare tutti i servizi. Lo script esegue automaticamente il cleanup di:
- Processi API e Frontend
- File di log temporanei
- Eventuali processi rimasti attivi

## 📋 Prerequisiti

- **.NET 8.0** installato
- **Node.js** e **npm** installati
- Terminal con supporto per i colori ANSI (standard su macOS/Linux)

## 📁 File generati

Lo script crea temporaneamente due file di log nella root:
- `api.log` - Log dell'API
- `frontend.log` - Log del frontend

Questi file vengono puliti automaticamente alla chiusura dello script.

## 🐛 Troubleshooting

### Porta già in uso
Se ricevi errori di porta già in uso:
```bash
# Trova e termina processi sulle porte
lsof -ti:5173 | xargs kill  # Frontend
lsof -ti:7020 | xargs kill  # API HTTPS
lsof -ti:5020 | xargs kill  # API HTTP
```

### Dipendenze mancanti
Lo script installa automaticamente le dipendenze npm, ma per l'API assicurati di aver eseguito:
```bash
cd api/SupplierPortal.API
dotnet restore
```

### Permessi script
Se lo script non è eseguibile:
```bash
chmod +x debug-start.sh
```
