// menuDefinition.ts
export const appMenu = [
  {
    label: "Dashboard",
    icon: "LayoutDashboard",
    path: "/dashboard",
  },
  {
    label: "Fornitori e Rete",
    icon: "Network",
    children: [
      {
        label: "Entità Supply Network",
        path: "/supply-network",
        icon: "Sitemap",
        description: "Fornitori, subfornitori, sedi e referenti"
      },
      {
        label: "Nuova entità",
        path: "/supply-network/new",
        icon: "PlusCircle",
        description: "Inserisci un nuovo fornitore o subfornitore"
      }
    ]
  },
  {
    label: "Questionari",
    icon: "ClipboardList",
    children: [
      {
        label: "Gestione Template",
        path: "/questionnaires/templates",
        icon: "FileText"
      },
      {
        label: "Nuovo Template",
        path: "/questionnaires/templates/new",
        icon: "FilePlus"
      },
      {
        label: "Compilazioni",
        path: "/questionnaires/assignments",
        icon: "Edit3"
      }
    ]
  },
  {
    label: "KPI & Performance",
    icon: "BarChart3",
    children: [
      {
        label: "Cruscotto KPI",
        path: "/kpi/dashboard",
        icon: "Activity"
      },
      {
        label: "Gestione soglie",
        path: "/kpi/thresholds",
        icon: "SlidersHorizontal"
      }
    ]
  },
  {
    label: "Audit & Ispezioni",
    icon: "SearchCheck",
    path: "/audits"
  },
  {
    label: "Documenti",
    icon: "FileStack",
    path: "/documents"
  },
  {
    label: "Impostazioni",
    icon: "Settings",
    children: [
      {
        label: "Tag & Tassonomie",
        path: "/settings/taxonomies",
        icon: "Tags"
      },
      {
        label: "Ruoli & Permessi",
        path: "/settings/roles",
        icon: "ShieldCheck"
      }
    ]
  }
]