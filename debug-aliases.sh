# SupplierPortal Debug Aliases
# 
# Aggiungi queste righe al tuo ~/.zshrc per avere comandi rapidi:
#
# source /percorso/al/progetto/debug-aliases.sh
#

# Alias per avviare debug
alias sp-debug='cd /Users/marcocastellani/prj/SupplierPortal && ./debug-start.sh'

# Alias per fermare eventuali processi rimasti
alias sp-stop='pkill -f "dotnet.*SupplierPortal.API"; pkill -f "vite.*dev"; echo "🛑 Processi SupplierPortal terminati"'

# Alias per vedere i processi attivi
alias sp-status='echo "🔍 Processi SupplierPortal attivi:"; ps aux | grep -E "(dotnet.*SupplierPortal|vite.*dev)" | grep -v grep'

# Alias per pulire i log
alias sp-clean='cd /Users/marcocastellani/prj/SupplierPortal && rm -f api.log frontend.log && echo "🧹 Log puliti"'

echo "✅ Alias SupplierPortal caricati:"
echo "  sp-debug  - Avvia debug completo"
echo "  sp-stop   - Ferma tutti i processi"
echo "  sp-status - Mostra processi attivi"
echo "  sp-clean  - Pulisce i file di log"
