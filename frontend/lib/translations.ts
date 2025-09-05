export type Language = "en" | "tl" | "es"

export interface Translations {
  // Common
  common: {
    loading: string
    save: string
    cancel: string
    delete: string
    edit: string
    view: string
    search: string
    filter: string
    refresh: string
    settings: string
    notifications: string
    dashboard: string
    signOut: string
    signIn: string
    email: string
    password: string
    selectRole: string
  }

  // Navigation
  nav: {
    coldChainManagement: string
    myOffers: string
    temperatureMonitor: string
    transactionHistory: string
    inventory: string
    temperatureControl: string
    deliveries: string
    transactionLogs: string
    marketplace: string
    myOrders: string
    deliverySchedule: string
    purchaseHistory: string
  }

  // Roles
  roles: {
    farmer: string
    storage: string
    buyer: string
    farmerDesc: string
    storageDesc: string
    buyerDesc: string
  }

  // Dashboard
  dashboard: {
    activeOffers: string
    totalRevenue: string
    avgTemperature: string
    temperatureAlerts: string
    storageCapacity: string
    activeUnits: string
    pendingDeliveries: string
    completedOrders: string
    totalSpent: string
    recentOffers: string
    recentOrders: string
    availableProducts: string
    upcomingDeliveries: string
    storageUnitsStatus: string
    pendingOffers: string
    todaysDeliveries: string
  }

  // Temperature
  temperature: {
    optimal: string
    warning: string
    critical: string
    currentTemp: string
    targetRange: string
    temperatureStatus: string
    lastUpdated: string
    trend: string
    aboveTarget: string
    belowTarget: string
    withinRange: string
    immediateActionRequired: string
    attentionNeeded: string
  }

  // Products
  products: {
    organicTomatoes: string
    freshLettuce: string
    bellPeppers: string
    babyCarrots: string
    organicCabbage: string
    sweetCorn: string
    greenBeans: string
    quantity: string
    pricePerUnit: string
    totalValue: string
    expiresIn: string
    quality: string
    excellent: string
    good: string
    fair: string
    poor: string
  }

  // Orders & Status
  orders: {
    active: string
    accepted: string
    pending: string
    expired: string
    delivered: string
    inTransit: string
    processing: string
    cancelled: string
    confirmed: string
    scheduled: string
    completed: string
  }

  // Notifications
  notifications: {
    temperatureAlert: string
    offerAccepted: string
    paymentReceived: string
    deliveryScheduled: string
    newProduct: string
    deliveryDelayed: string
    orderDelivered: string
    priceDropAlert: string
    paymentReminder: string
    markAsRead: string
    takeAction: string
    highPriority: string
    mediumPriority: string
    lowPriority: string
    actionRequired: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      loading: "Loading",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      search: "Search",
      filter: "Filter",
      refresh: "Refresh",
      settings: "Settings",
      notifications: "Notifications",
      dashboard: "Dashboard",
      signOut: "Sign Out",
      signIn: "Sign In",
      email: "Email",
      password: "Password",
      selectRole: "Select Your Role",
    },
    nav: {
      coldChainManagement: "Cold Chain Management",
      myOffers: "My Offers",
      temperatureMonitor: "Temperature Monitor",
      transactionHistory: "Transaction History",
      inventory: "Inventory",
      temperatureControl: "Temperature Control",
      deliveries: "Deliveries",
      transactionLogs: "Transaction Logs",
      marketplace: "Marketplace",
      myOrders: "My Orders",
      deliverySchedule: "Delivery Schedule",
      purchaseHistory: "Purchase History",
    },
    roles: {
      farmer: "Farmer",
      storage: "Storage House",
      buyer: "Buyer (MSME/Market)",
      farmerDesc: "Submit produce offers",
      storageDesc: "Manage inventory & temperature",
      buyerDesc: "Browse & purchase products",
    },
    dashboard: {
      activeOffers: "Active Offers",
      totalRevenue: "Total Revenue",
      avgTemperature: "Avg Temperature",
      temperatureAlerts: "Temperature Alerts",
      storageCapacity: "Storage Capacity",
      activeUnits: "Active Units",
      pendingDeliveries: "Pending Deliveries",
      completedOrders: "Completed Orders",
      totalSpent: "Total Spent",
      recentOffers: "Recent Offers",
      recentOrders: "Recent Orders",
      availableProducts: "Fresh Products Available",
      upcomingDeliveries: "Upcoming Deliveries",
      storageUnitsStatus: "Storage Units Status",
      pendingOffers: "Pending Offers",
      todaysDeliveries: "Today's Deliveries",
    },
    temperature: {
      optimal: "Optimal",
      warning: "Warning",
      critical: "Critical",
      currentTemp: "Current Temperature",
      targetRange: "Target Range",
      temperatureStatus: "Temperature Status",
      lastUpdated: "Last updated",
      trend: "Trend",
      aboveTarget: "Above target",
      belowTarget: "Below target",
      withinRange: "Within range",
      immediateActionRequired: "Immediate Action Required",
      attentionNeeded: "Attention Needed",
    },
    products: {
      organicTomatoes: "Organic Tomatoes",
      freshLettuce: "Fresh Lettuce",
      bellPeppers: "Bell Peppers",
      babyCarrots: "Baby Carrots",
      organicCabbage: "Organic Cabbage",
      sweetCorn: "Sweet Corn",
      greenBeans: "Green Beans",
      quantity: "Quantity",
      pricePerUnit: "Price per Unit",
      totalValue: "Total Value",
      expiresIn: "Expires In",
      quality: "Quality",
      excellent: "Excellent",
      good: "Good",
      fair: "Fair",
      poor: "Poor",
    },
    orders: {
      active: "Active",
      accepted: "Accepted",
      pending: "Pending",
      expired: "Expired",
      delivered: "Delivered",
      inTransit: "In Transit",
      processing: "Processing",
      cancelled: "Cancelled",
      confirmed: "Confirmed",
      scheduled: "Scheduled",
      completed: "Completed",
    },
    notifications: {
      temperatureAlert: "Temperature Alert",
      offerAccepted: "Offer Accepted",
      paymentReceived: "Payment Received",
      deliveryScheduled: "Delivery Scheduled",
      newProduct: "New Product Available",
      deliveryDelayed: "Delivery Delayed",
      orderDelivered: "Order Delivered",
      priceDropAlert: "Price Drop Alert",
      paymentReminder: "Payment Reminder",
      markAsRead: "Mark as Read",
      takeAction: "Take Action",
      highPriority: "High Priority",
      mediumPriority: "Medium Priority",
      lowPriority: "Low Priority",
      actionRequired: "Action Required",
    },
  },
  tl: {
    common: {
      loading: "Naglo-load",
      save: "I-save",
      cancel: "Kanselahin",
      delete: "Tanggalin",
      edit: "I-edit",
      view: "Tingnan",
      search: "Maghanap",
      filter: "I-filter",
      refresh: "I-refresh",
      settings: "Mga Setting",
      notifications: "Mga Notification",
      dashboard: "Dashboard",
      signOut: "Mag-sign Out",
      signIn: "Mag-sign In",
      email: "Email",
      password: "Password",
      selectRole: "Piliin ang Inyong Role",
    },
    nav: {
      coldChainManagement: "Cold Chain Management",
      myOffers: "Mga Alok Ko",
      temperatureMonitor: "Temperature Monitor",
      transactionHistory: "Kasaysayan ng Transaction",
      inventory: "Inventory",
      temperatureControl: "Temperature Control",
      deliveries: "Mga Delivery",
      transactionLogs: "Transaction Logs",
      marketplace: "Marketplace",
      myOrders: "Mga Order Ko",
      deliverySchedule: "Schedule ng Delivery",
      purchaseHistory: "Kasaysayan ng Pagbili",
    },
    roles: {
      farmer: "Magsasaka",
      storage: "Storage House",
      buyer: "Mamimili (MSME/Market)",
      farmerDesc: "Mag-submit ng mga alok na produkto",
      storageDesc: "Pamahalaan ang inventory at temperature",
      buyerDesc: "Mag-browse at bumili ng mga produkto",
    },
    dashboard: {
      activeOffers: "Mga Aktibong Alok",
      totalRevenue: "Kabuuang Kita",
      avgTemperature: "Average na Temperature",
      temperatureAlerts: "Mga Temperature Alert",
      storageCapacity: "Kapasidad ng Storage",
      activeUnits: "Mga Aktibong Unit",
      pendingDeliveries: "Mga Naghihintay na Delivery",
      completedOrders: "Mga Natapos na Order",
      totalSpent: "Kabuuang Gastos",
      recentOffers: "Mga Kamakailang Alok",
      recentOrders: "Mga Kamakailang Order",
      availableProducts: "Mga Available na Fresh Products",
      upcomingDeliveries: "Mga Paparating na Delivery",
      storageUnitsStatus: "Status ng mga Storage Unit",
      pendingOffers: "Mga Naghihintay na Alok",
      todaysDeliveries: "Mga Delivery Ngayong Araw",
    },
    temperature: {
      optimal: "Optimal",
      warning: "Babala",
      critical: "Kritikal",
      currentTemp: "Kasalukuyang Temperature",
      targetRange: "Target Range",
      temperatureStatus: "Status ng Temperature",
      lastUpdated: "Huling na-update",
      trend: "Trend",
      aboveTarget: "Lampas sa target",
      belowTarget: "Kulang sa target",
      withinRange: "Sa loob ng range",
      immediateActionRequired: "Kailangan ng Agarang Aksyon",
      attentionNeeded: "Kailangan ng Pansin",
    },
    products: {
      organicTomatoes: "Organic na Kamatis",
      freshLettuce: "Fresh na Lettuce",
      bellPeppers: "Bell Peppers",
      babyCarrots: "Baby Carrots",
      organicCabbage: "Organic na Repolyo",
      sweetCorn: "Sweet Corn",
      greenBeans: "Green Beans",
      quantity: "Dami",
      pricePerUnit: "Presyo bawat Unit",
      totalValue: "Kabuuang Halaga",
      expiresIn: "Mag-e-expire sa",
      quality: "Kalidad",
      excellent: "Napakahusay",
      good: "Mabuti",
      fair: "Katamtaman",
      poor: "Hindi Maganda",
    },
    orders: {
      active: "Aktibo",
      accepted: "Tinanggap",
      pending: "Naghihintay",
      expired: "Nag-expire",
      delivered: "Na-deliver",
      inTransit: "Nasa Daan",
      processing: "Pinoproseso",
      cancelled: "Nakansela",
      confirmed: "Nakumpirma",
      scheduled: "Naka-schedule",
      completed: "Tapos na",
    },
    notifications: {
      temperatureAlert: "Temperature Alert",
      offerAccepted: "Tinanggap ang Alok",
      paymentReceived: "Natanggap ang Bayad",
      deliveryScheduled: "Naka-schedule ang Delivery",
      newProduct: "May Bagong Produkto",
      deliveryDelayed: "Na-delay ang Delivery",
      orderDelivered: "Na-deliver ang Order",
      priceDropAlert: "Bumaba ang Presyo",
      paymentReminder: "Paalala sa Bayad",
      markAsRead: "Markahan bilang Nabasa",
      takeAction: "Kumuha ng Aksyon",
      highPriority: "Mataas na Priority",
      mediumPriority: "Katamtamang Priority",
      lowPriority: "Mababang Priority",
      actionRequired: "Kailangan ng Aksyon",
    },
  },
  es: {
    common: {
      loading: "Cargando",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      view: "Ver",
      search: "Buscar",
      filter: "Filtrar",
      refresh: "Actualizar",
      settings: "Configuración",
      notifications: "Notificaciones",
      dashboard: "Panel",
      signOut: "Cerrar Sesión",
      signIn: "Iniciar Sesión",
      email: "Correo",
      password: "Contraseña",
      selectRole: "Seleccione su Rol",
    },
    nav: {
      coldChainManagement: "Gestión de Cadena de Frío",
      myOffers: "Mis Ofertas",
      temperatureMonitor: "Monitor de Temperatura",
      transactionHistory: "Historial de Transacciones",
      inventory: "Inventario",
      temperatureControl: "Control de Temperatura",
      deliveries: "Entregas",
      transactionLogs: "Registros de Transacciones",
      marketplace: "Mercado",
      myOrders: "Mis Pedidos",
      deliverySchedule: "Horario de Entregas",
      purchaseHistory: "Historial de Compras",
    },
    roles: {
      farmer: "Agricultor",
      storage: "Almacén",
      buyer: "Comprador (PYME/Mercado)",
      farmerDesc: "Enviar ofertas de productos",
      storageDesc: "Gestionar inventario y temperatura",
      buyerDesc: "Navegar y comprar productos",
    },
    dashboard: {
      activeOffers: "Ofertas Activas",
      totalRevenue: "Ingresos Totales",
      avgTemperature: "Temperatura Promedio",
      temperatureAlerts: "Alertas de Temperatura",
      storageCapacity: "Capacidad de Almacenamiento",
      activeUnits: "Unidades Activas",
      pendingDeliveries: "Entregas Pendientes",
      completedOrders: "Pedidos Completados",
      totalSpent: "Total Gastado",
      recentOffers: "Ofertas Recientes",
      recentOrders: "Pedidos Recientes",
      availableProducts: "Productos Frescos Disponibles",
      upcomingDeliveries: "Próximas Entregas",
      storageUnitsStatus: "Estado de Unidades de Almacenamiento",
      pendingOffers: "Ofertas Pendientes",
      todaysDeliveries: "Entregas de Hoy",
    },
    temperature: {
      optimal: "Óptimo",
      warning: "Advertencia",
      critical: "Crítico",
      currentTemp: "Temperatura Actual",
      targetRange: "Rango Objetivo",
      temperatureStatus: "Estado de Temperatura",
      lastUpdated: "Última actualización",
      trend: "Tendencia",
      aboveTarget: "Por encima del objetivo",
      belowTarget: "Por debajo del objetivo",
      withinRange: "Dentro del rango",
      immediateActionRequired: "Acción Inmediata Requerida",
      attentionNeeded: "Atención Necesaria",
    },
    products: {
      organicTomatoes: "Tomates Orgánicos",
      freshLettuce: "Lechuga Fresca",
      bellPeppers: "Pimientos",
      babyCarrots: "Zanahorias Baby",
      organicCabbage: "Repollo Orgánico",
      sweetCorn: "Maíz Dulce",
      greenBeans: "Judías Verdes",
      quantity: "Cantidad",
      pricePerUnit: "Precio por Unidad",
      totalValue: "Valor Total",
      expiresIn: "Expira en",
      quality: "Calidad",
      excellent: "Excelente",
      good: "Bueno",
      fair: "Regular",
      poor: "Malo",
    },
    orders: {
      active: "Activo",
      accepted: "Aceptado",
      pending: "Pendiente",
      expired: "Expirado",
      delivered: "Entregado",
      inTransit: "En Tránsito",
      processing: "Procesando",
      cancelled: "Cancelado",
      confirmed: "Confirmado",
      scheduled: "Programado",
      completed: "Completado",
    },
    notifications: {
      temperatureAlert: "Alerta de Temperatura",
      offerAccepted: "Oferta Aceptada",
      paymentReceived: "Pago Recibido",
      deliveryScheduled: "Entrega Programada",
      newProduct: "Nuevo Producto Disponible",
      deliveryDelayed: "Entrega Retrasada",
      orderDelivered: "Pedido Entregado",
      priceDropAlert: "Alerta de Bajada de Precio",
      paymentReminder: "Recordatorio de Pago",
      markAsRead: "Marcar como Leído",
      takeAction: "Tomar Acción",
      highPriority: "Alta Prioridad",
      mediumPriority: "Prioridad Media",
      lowPriority: "Baja Prioridad",
      actionRequired: "Acción Requerida",
    },
  },
}

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.en
}
