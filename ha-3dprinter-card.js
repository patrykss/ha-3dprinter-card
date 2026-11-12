/* HA 3Dprinter Card — standalone Home Assistant Lovelace cards.
 * No external runtime dependencies. All printer data is mapped to Home Assistant entities/services.
 */
(() => {
  const VERSION = "1.0.0";
  const LANGUAGES = ["en", "pl", "de", "es", "fr", "pt", "ar", "hi", "zh", "ja"];
  const I18N = {
    en: { defaultPrinter:'3D Printer', openFramePrinter:'Ender 3 V3 / open-frame printer', enclosedPrinter:'Enclosed printer', newButton:'New button', newItem:'New item', online:"Online", offline:"Offline", unknown:"Unknown", model:"Printing", layer:"Layer", progress:"Print progress", cameras:"Cameras", controls:"Controls", temperatures:"Temperatures", ams:"Filament system", statistics:"Print statistics", energy:"Energy", spoolman:"Spoolman", sensors:"Environment", automations:"Automations", todo:"Print queue", add:"Add", item:"Add a model to the queue…", empty:"No items configured", noCamera:"Camera image unavailable", pause:"Pause", resume:"Resume", cancel:"Cancel", emergency:"Emergency stop", turnOn:"Turn on printer", turnOff:"Turn off printer", confirmOff:"Are you sure you want to turn off the printer?", confirm:"Turn off", back:"Cancel", layerOf:"of", power:"Power", energyCost:"Estimated energy cost", noTodo:"No print jobs yet", section:"Section", entity:"Entity", label:"Label", title:"Title", enabled:"Enabled", language:"Language", theme:"Card theme", position:"Power button position", left:"Left of name", right:"Right of name", hidden:"Hidden", preset:"Offline printer image", customSvg:"Custom SVG image", uploadSvg:"Upload SVG file", invalidSvg:"Invalid SVG file (maximum size: 512 KB)", printerName:"Printer name", onlineEntity:"Online/status entity", powerEntity:"Printer power switch", modelEntity:"Printed model entity", progressEntity:"Progress entity (%)", layerEntity:"Current layer entity", totalLayersEntity:"Total layers entity", cameraEntity:"Camera entity", showCamera:"Show camera", showModel:"Show model name", showLayer:"Show layer", showProgress:"Show progress", refresh:"Camera refresh (seconds)", sections:"Sections and layout", addSection:"Add section", addItem:"Add row / button", remove:"Remove", moveUp:"Move up", moveDown:"Move down", type:"Section type", selectTheme:"Use Home Assistant theme name", price:"Electricity price per kWh", currency:"Currency", attribute:"Attribute (optional)", unit:"Unit override", action:"Button action", toggle:"Toggle entity", service:"Call service", url:"Open URL", serviceName:"Service (domain.service)", serviceData:"Service data (JSON)", dangerous:"Dangerous action", todoEntity:"To-do list entity", spoolmanUrl:"Spoolman URL", custom:"Custom", nameRequired:"Set a printer name to identify this card.", notConfigured:"Not configured", invalidService:"The configured service could not be called.", sectionHint:"Add entities or buttons to populate this section.", confirmAction:"Are you sure you want to run this action?", sectionHelp:"Use the arrows to change the order. Add only the rows and actions exposed by your printer integration.", themeHelp:"Leave empty to use the active dashboard theme.", svgHelp:"SVG is sanitized before display. Use a self-contained SVG document.", onlineStates:"Online state values", onlineStatesHelp:"Comma-separated state values treated as online. Defaults also include common print states." , icon:"Icon", fullWidth:"Full width", printerCommand:"Printer command", confirmBefore:"Ask for confirmation before running", command:"Command", confirmActionButton:"Run", completeTodo:"Complete", activeTheme:"Active dashboard theme"},
    pl: { defaultPrinter:'Drukarka 3D', openFramePrinter:'Ender 3 V3 / drukarka otwarta', enclosedPrinter:'Drukarka komorowa', newButton:'Nowy przycisk', newItem:'Nowy element', online:"Online", offline:"Offline", unknown:"Nieznany", model:"Drukowany model", layer:"Warstwa", progress:"Postęp wydruku", cameras:"Kamery", controls:"Sterowanie", temperatures:"Temperatury", ams:"System filamentu", statistics:"Statystyki wydruku", energy:"Energia", spoolman:"Spoolman", sensors:"Otoczenie", automations:"Automatyzacje", todo:"Kolejka wydruków", add:"Dodaj", item:"Dodaj model do kolejki…", empty:"Brak skonfigurowanych elementów", noCamera:"Obraz z kamery niedostępny", pause:"Pauza", resume:"Wznów", cancel:"Anuluj", emergency:"Awaryjne zatrzymanie", turnOn:"Włącz drukarkę", turnOff:"Wyłącz drukarkę", confirmOff:"Czy na pewno wyłączyć drukarkę?", confirm:"Wyłącz", back:"Anuluj", layerOf:"z", power:"Zasilanie", energyCost:"Szacowany koszt energii", noTodo:"Brak zadań drukowania", section:"Sekcja", entity:"Encja", label:"Etykieta", title:"Tytuł", enabled:"Włączona", language:"Język", theme:"Motyw karty", position:"Położenie przycisku zasilania", left:"Po lewej od nazwy", right:"Po prawej od nazwy", hidden:"Ukryty", preset:"Obraz wyłączonej drukarki", customSvg:"Własny obraz SVG", uploadSvg:"Wgraj plik SVG", invalidSvg:"Nieprawidłowy plik SVG (maksymalny rozmiar: 512 KB)", printerName:"Nazwa drukarki", onlineEntity:"Encja statusu / dostępności", powerEntity:"Przełącznik zasilania drukarki", modelEntity:"Encja nazwy modelu", progressEntity:"Encja postępu (%)", layerEntity:"Encja bieżącej warstwy", totalLayersEntity:"Encja liczby warstw", cameraEntity:"Encja kamery", showCamera:"Pokaż kamerę", showModel:"Pokaż nazwę modelu", showLayer:"Pokaż warstwę", showProgress:"Pokaż postęp", refresh:"Odświeżanie kamery (sekundy)", sections:"Sekcje i układ", addSection:"Dodaj sekcję", addItem:"Dodaj wiersz / przycisk", remove:"Usuń", moveUp:"Przenieś wyżej", moveDown:"Przenieś niżej", type:"Typ sekcji", selectTheme:"Nazwa motywu Home Assistant", price:"Cena energii za kWh", currency:"Waluta", attribute:"Atrybut (opcjonalnie)", unit:"Jednostka", action:"Akcja przycisku", toggle:"Przełącz encję", service:"Wywołaj usługę", url:"Otwórz URL", serviceName:"Usługa (domena.usługa)", serviceData:"Dane usługi (JSON)", dangerous:"Akcja niebezpieczna", todoEntity:"Encja listy zadań", spoolmanUrl:"Adres Spoolman", custom:"Własna", nameRequired:"Ustaw nazwę drukarki, aby rozpoznać kartę.", notConfigured:"Nie skonfigurowano", invalidService:"Nie udało się wywołać skonfigurowanej usługi.", sectionHint:"Dodaj encje lub przyciski, aby wypełnić tę sekcję.", confirmAction:"Czy na pewno wykonać tę akcję?", sectionHelp:"Strzałkami zmień kolejność sekcji. Dodawaj tylko encje i akcje udostępniane przez integrację drukarki.", themeHelp:"Pozostaw puste, aby użyć aktywnego motywu pulpitu.", svgHelp:"SVG jest oczyszczany przed wyświetleniem. Użyj samodzielnego dokumentu SVG.", onlineStates:"Wartości statusu online", onlineStatesHelp:"Wartości oddzielone przecinkami, traktowane jako online. Domyślnie obejmują także typowe stany drukowania." , icon:"Ikona", fullWidth:"Pełna szerokość", printerCommand:"Komenda drukarki", confirmBefore:"Pytaj o potwierdzenie przed wykonaniem", command:"Komenda", confirmActionButton:"Wykonaj", completeTodo:"Oznacz jako wykonane", activeTheme:"Aktywny motyw pulpitu"},
    de: { defaultPrinter:'3D-Drucker', openFramePrinter:'Ender 3 V3 / offener Drucker', enclosedPrinter:'Geschlossener Drucker', newButton:'Neue Schaltfläche', newItem:'Neues Element', online:"Online", offline:"Offline", unknown:"Unbekannt", model:"Aktueller Druck", layer:"Schicht", progress:"Druckfortschritt", cameras:"Kameras", controls:"Steuerung", temperatures:"Temperaturen", ams:"Filamentsystem", statistics:"Druckstatistik", energy:"Energie", spoolman:"Spoolman", sensors:"Umgebung", automations:"Automationen", todo:"Druckwarteschlange", add:"Hinzufügen", item:"Modell zur Warteschlange hinzufügen…", empty:"Keine Elemente konfiguriert", noCamera:"Kamerabild nicht verfügbar", pause:"Pause", resume:"Fortsetzen", cancel:"Abbrechen", emergency:"Not-Aus", turnOn:"Drucker einschalten", turnOff:"Drucker ausschalten", confirmOff:"Möchten Sie den Drucker wirklich ausschalten?", confirm:"Ausschalten", back:"Abbrechen", layerOf:"von", power:"Stromversorgung", energyCost:"Geschätzte Energiekosten", noTodo:"Keine Druckaufträge", section:"Abschnitt", entity:"Entität", label:"Bezeichnung", title:"Titel", enabled:"Aktiviert", language:"Sprache", theme:"Kartenthema", position:"Position des Netzschalters", left:"Links vom Namen", right:"Rechts vom Namen", hidden:"Ausgeblendet", preset:"Offline-Druckerbild", customSvg:"Eigenes SVG-Bild", uploadSvg:"SVG-Datei hochladen", invalidSvg:"Ungültige SVG-Datei (maximale Größe: 512 KB)", printerName:"Druckername", onlineEntity:"Online-/Status-Entität", powerEntity:"Drucker-Netzschalter", modelEntity:"Entität des Modellnamens", progressEntity:"Fortschrittsentität (%)", layerEntity:"Aktuelle Schicht", totalLayersEntity:"Anzahl der Schichten", cameraEntity:"Kamera-Entität", showCamera:"Kamera anzeigen", showModel:"Modellnamen anzeigen", showLayer:"Schicht anzeigen", showProgress:"Fortschritt anzeigen", refresh:"Kameraaktualisierung (Sekunden)", sections:"Abschnitte und Layout", addSection:"Abschnitt hinzufügen", addItem:"Zeile / Schaltfläche hinzufügen", remove:"Entfernen", moveUp:"Nach oben", moveDown:"Nach unten", type:"Abschnittstyp", selectTheme:"Name des Home-Assistant-Themas", price:"Strompreis pro kWh", currency:"Währung", attribute:"Attribut (optional)", unit:"Einheit", action:"Schaltflächenaktion", toggle:"Entität umschalten", service:"Dienst aufrufen", url:"URL öffnen", serviceName:"Dienst (domain.service)", serviceData:"Dienstdaten (JSON)", dangerous:"Gefährliche Aktion", todoEntity:"To-do-Listen-Entität", spoolmanUrl:"Spoolman-URL", custom:"Benutzerdefiniert", nameRequired:"Legen Sie einen Druckernamen fest.", notConfigured:"Nicht konfiguriert", invalidService:"Der konfigurierte Dienst konnte nicht aufgerufen werden.", sectionHint:"Fügen Sie Entitäten oder Schaltflächen hinzu, um diesen Abschnitt zu füllen.", confirmAction:"Möchten Sie diese Aktion wirklich ausführen?", sectionHelp:"Ändern Sie die Reihenfolge mit den Pfeilen. Fügen Sie nur Entitäten und Aktionen hinzu, die Ihre Druckerintegration bereitstellt.", themeHelp:"Leer lassen, um das aktive Dashboard-Design zu verwenden.", svgHelp:"SVG wird vor der Anzeige bereinigt. Verwenden Sie ein eigenständiges SVG-Dokument.", onlineStates:"Online-Statuswerte", onlineStatesHelp:"Kommagetrennte Werte, die als online gelten (Standard: on, online, connected, ready, true, 1)." , icon:"Symbol", fullWidth:"Volle Breite", printerCommand:"Druckerbefehl (übersetzt)", confirmBefore:"Vor Ausführung bestätigen", command:"Befehl", confirmActionButton:"Ausführen", completeTodo:"Erledigen", activeTheme:"Aktives Dashboard-Design"},
    es: { defaultPrinter:'Impresora 3D', openFramePrinter:'Ender 3 V3 / impresora abierta', enclosedPrinter:'Impresora cerrada', newButton:'Nuevo botón', newItem:'Nuevo elemento', online:"En línea", offline:"Desconectada", unknown:"Desconocido", model:"Modelo en impresión", layer:"Capa", progress:"Progreso de impresión", cameras:"Cámaras", controls:"Controles", temperatures:"Temperaturas", ams:"Sistema de filamento", statistics:"Estadísticas de impresión", energy:"Energía", spoolman:"Spoolman", sensors:"Entorno", automations:"Automatizaciones", todo:"Cola de impresión", add:"Añadir", item:"Añadir un modelo a la cola…", empty:"No hay elementos configurados", noCamera:"Imagen de cámara no disponible", pause:"Pausar", resume:"Reanudar", cancel:"Cancelar", emergency:"Parada de emergencia", turnOn:"Encender impresora", turnOff:"Apagar impresora", confirmOff:"¿Seguro que quieres apagar la impresora?", confirm:"Apagar", back:"Cancelar", layerOf:"de", power:"Alimentación", energyCost:"Coste energético estimado", noTodo:"No hay trabajos pendientes", section:"Sección", entity:"Entidad", label:"Etiqueta", title:"Título", enabled:"Activada", language:"Idioma", theme:"Tema de la tarjeta", position:"Posición del botón de encendido", left:"A la izquierda del nombre", right:"A la derecha del nombre", hidden:"Oculto", preset:"Imagen de impresora apagada", customSvg:"Imagen SVG personalizada", uploadSvg:"Subir archivo SVG", invalidSvg:"Archivo SVG no válido (tamaño máximo: 512 KB)", printerName:"Nombre de la impresora", onlineEntity:"Entidad de estado / conexión", powerEntity:"Interruptor de alimentación", modelEntity:"Entidad del nombre del modelo", progressEntity:"Entidad de progreso (%)", layerEntity:"Entidad de capa actual", totalLayersEntity:"Entidad de capas totales", cameraEntity:"Entidad de cámara", showCamera:"Mostrar cámara", showModel:"Mostrar nombre del modelo", showLayer:"Mostrar capa", showProgress:"Mostrar progreso", refresh:"Actualización de cámara (segundos)", sections:"Secciones y diseño", addSection:"Añadir sección", addItem:"Añadir fila / botón", remove:"Eliminar", moveUp:"Mover arriba", moveDown:"Mover abajo", type:"Tipo de sección", selectTheme:"Nombre del tema de Home Assistant", price:"Precio de electricidad por kWh", currency:"Moneda", attribute:"Atributo (opcional)", unit:"Unidad", action:"Acción del botón", toggle:"Alternar entidad", service:"Ejecutar servicio", url:"Abrir URL", serviceName:"Servicio (dominio.servicio)", serviceData:"Datos del servicio (JSON)", dangerous:"Acción peligrosa", todoEntity:"Entidad de lista de tareas", spoolmanUrl:"URL de Spoolman", custom:"Personalizado", nameRequired:"Configura un nombre para la impresora.", notConfigured:"No configurado", invalidService:"No se pudo ejecutar el servicio configurado.", sectionHint:"Añade entidades o botones para completar esta sección.", confirmAction:"¿Seguro que quieres ejecutar esta acción?", sectionHelp:"Usa las flechas para cambiar el orden. Añade solo entidades y acciones disponibles en la integración de tu impresora.", themeHelp:"Déjalo vacío para usar el tema activo del panel.", svgHelp:"El SVG se sanea antes de mostrarse. Usa un documento SVG independiente.", onlineStates:"Valores del estado en línea", onlineStatesHelp:"Valores separados por comas que se consideran en línea (predeterminado: on, online, connected, ready, true, 1)." , icon:"Icono", fullWidth:"Ancho completo", printerCommand:"Comando de impresora (traducido)", confirmBefore:"Pedir confirmación antes de ejecutar", command:"Comando", confirmActionButton:"Ejecutar", completeTodo:"Completar", activeTheme:"Tema activo del panel"},
    fr: { defaultPrinter:'Imprimante 3D', openFramePrinter:'Ender 3 V3 / imprimante ouverte', enclosedPrinter:'Imprimante fermée', newButton:'Nouveau bouton', newItem:'Nouvel élément', online:"En ligne", offline:"Hors ligne", unknown:"Inconnu", model:"Modèle imprimé", layer:"Couche", progress:"Progression", cameras:"Caméras", controls:"Commandes", temperatures:"Températures", ams:"Système de filament", statistics:"Statistiques d’impression", energy:"Énergie", spoolman:"Spoolman", sensors:"Environnement", automations:"Automatisations", todo:"File d’impression", add:"Ajouter", item:"Ajouter un modèle à la file…", empty:"Aucun élément configuré", noCamera:"Image de caméra indisponible", pause:"Pause", resume:"Reprendre", cancel:"Annuler", emergency:"Arrêt d’urgence", turnOn:"Allumer l’imprimante", turnOff:"Éteindre l’imprimante", confirmOff:"Voulez-vous vraiment éteindre l’imprimante ?", confirm:"Éteindre", back:"Annuler", layerOf:"sur", power:"Alimentation", energyCost:"Coût énergétique estimé", noTodo:"Aucun travail en attente", section:"Section", entity:"Entité", label:"Libellé", title:"Titre", enabled:"Activée", language:"Langue", theme:"Thème de la carte", position:"Position du bouton d’alimentation", left:"À gauche du nom", right:"À droite du nom", hidden:"Masqué", preset:"Image de l’imprimante hors ligne", customSvg:"Image SVG personnalisée", uploadSvg:"Importer un fichier SVG", invalidSvg:"Fichier SVG invalide (taille maximale : 512 Ko)", printerName:"Nom de l’imprimante", onlineEntity:"Entité d’état / connexion", powerEntity:"Interrupteur de l’imprimante", modelEntity:"Entité du nom du modèle", progressEntity:"Entité de progression (%)", layerEntity:"Entité de couche actuelle", totalLayersEntity:"Entité du nombre de couches", cameraEntity:"Entité de caméra", showCamera:"Afficher la caméra", showModel:"Afficher le nom du modèle", showLayer:"Afficher la couche", showProgress:"Afficher la progression", refresh:"Actualisation de la caméra (secondes)", sections:"Sections et disposition", addSection:"Ajouter une section", addItem:"Ajouter une ligne / commande", remove:"Supprimer", moveUp:"Déplacer vers le haut", moveDown:"Déplacer vers le bas", type:"Type de section", selectTheme:"Nom du thème Home Assistant", price:"Prix de l’électricité par kWh", currency:"Devise", attribute:"Attribut (facultatif)", unit:"Unité", action:"Action du bouton", toggle:"Basculer l’entité", service:"Appeler un service", url:"Ouvrir l’URL", serviceName:"Service (domaine.service)", serviceData:"Données du service (JSON)", dangerous:"Action dangereuse", todoEntity:"Entité de liste de tâches", spoolmanUrl:"URL Spoolman", custom:"Personnalisé", nameRequired:"Définissez un nom pour l’imprimante.", notConfigured:"Non configuré", invalidService:"Impossible d’appeler le service configuré.", sectionHint:"Ajoutez des entités ou des commandes pour remplir cette section.", confirmAction:"Voulez-vous vraiment exécuter cette action ?", sectionHelp:"Utilisez les flèches pour modifier l’ordre. Ajoutez uniquement les entités et actions fournies par l’intégration de l’imprimante.", themeHelp:"Laissez vide pour utiliser le thème actif du tableau de bord.", svgHelp:"Le SVG est nettoyé avant affichage. Utilisez un document SVG autonome.", onlineStates:"Valeurs de l’état en ligne", onlineStatesHelp:"Valeurs séparées par des virgules considérées comme en ligne (par défaut : on, online, connected, ready, true, 1)." , icon:"Icône", fullWidth:"Pleine largeur", printerCommand:"Commande imprimante (traduite)", confirmBefore:"Demander confirmation avant exécution", command:"Commande", confirmActionButton:"Exécuter", completeTodo:"Terminer", activeTheme:"Thème actif du tableau de bord"},
    pt: { defaultPrinter:'Impressora 3D', openFramePrinter:'Ender 3 V3 / impressora aberta', enclosedPrinter:'Impressora fechada', newButton:'Novo botão', newItem:'Novo item', online:"Online", offline:"Offline", unknown:"Desconhecido", model:"Modelo em impressão", layer:"Camada", progress:"Progresso da impressão", cameras:"Câmaras", controls:"Controlos", temperatures:"Temperaturas", ams:"Sistema de filamento", statistics:"Estatísticas de impressão", energy:"Energia", spoolman:"Spoolman", sensors:"Ambiente", automations:"Automações", todo:"Fila de impressão", add:"Adicionar", item:"Adicionar modelo à fila…", empty:"Sem elementos configurados", noCamera:"Imagem da câmara indisponível", pause:"Pausar", resume:"Retomar", cancel:"Cancelar", emergency:"Paragem de emergência", turnOn:"Ligar impressora", turnOff:"Desligar impressora", confirmOff:"Tem a certeza de que pretende desligar a impressora?", confirm:"Desligar", back:"Cancelar", layerOf:"de", power:"Alimentação", energyCost:"Custo energético estimado", noTodo:"Sem trabalhos na fila", section:"Secção", entity:"Entidade", label:"Etiqueta", title:"Título", enabled:"Ativada", language:"Idioma", theme:"Tema do cartão", position:"Posição do botão de energia", left:"À esquerda do nome", right:"À direita do nome", hidden:"Oculto", preset:"Imagem da impressora desligada", customSvg:"Imagem SVG personalizada", uploadSvg:"Carregar ficheiro SVG", invalidSvg:"Ficheiro SVG inválido (tamanho máximo: 512 KB)", printerName:"Nome da impressora", onlineEntity:"Entidade de estado / ligação", powerEntity:"Interruptor da impressora", modelEntity:"Entidade do nome do modelo", progressEntity:"Entidade de progresso (%)", layerEntity:"Entidade da camada atual", totalLayersEntity:"Entidade do total de camadas", cameraEntity:"Entidade da câmara", showCamera:"Mostrar câmara", showModel:"Mostrar nome do modelo", showLayer:"Mostrar camada", showProgress:"Mostrar progresso", refresh:"Atualização da câmara (segundos)", sections:"Secções e disposição", addSection:"Adicionar secção", addItem:"Adicionar linha / botão", remove:"Remover", moveUp:"Mover para cima", moveDown:"Mover para baixo", type:"Tipo de secção", selectTheme:"Nome do tema Home Assistant", price:"Preço da eletricidade por kWh", currency:"Moeda", attribute:"Atributo (opcional)", unit:"Unidade", action:"Ação do botão", toggle:"Alternar entidade", service:"Executar serviço", url:"Abrir URL", serviceName:"Serviço (domínio.serviço)", serviceData:"Dados do serviço (JSON)", dangerous:"Ação perigosa", todoEntity:"Entidade da lista de tarefas", spoolmanUrl:"URL do Spoolman", custom:"Personalizado", nameRequired:"Defina um nome para a impressora.", notConfigured:"Não configurado", invalidService:"Não foi possível executar o serviço configurado.", sectionHint:"Adicione entidades ou botões para preencher esta secção.", confirmAction:"Tem a certeza de que pretende executar esta ação?", sectionHelp:"Use as setas para alterar a ordem. Adicione apenas entidades e ações disponibilizadas pela integração da impressora.", themeHelp:"Deixe vazio para usar o tema ativo do painel.", svgHelp:"O SVG é limpo antes de ser apresentado. Use um documento SVG autónomo.", onlineStates:"Valores do estado online", onlineStatesHelp:"Valores separados por vírgulas considerados online (predefinição: on, online, connected, ready, true, 1)." , icon:"Ícone", fullWidth:"Largura total", printerCommand:"Comando da impressora (traduzido)", confirmBefore:"Pedir confirmação antes de executar", command:"Comando", confirmActionButton:"Executar", completeTodo:"Concluir", activeTheme:"Tema ativo do painel"},
    ar: { defaultPrinter:'طابعة ثلاثية الأبعاد', openFramePrinter:'Ender 3 V3 / طابعة مفتوحة الهيكل', enclosedPrinter:'طابعة مغلقة الهيكل', newButton:'زر جديد', newItem:'عنصر جديد', online:"متصل", offline:"غير متصل", unknown:"غير معروف", model:"النموذج قيد الطباعة", layer:"الطبقة", progress:"تقدم الطباعة", cameras:"الكاميرات", controls:"التحكم", temperatures:"درجات الحرارة", ams:"نظام الخيوط", statistics:"إحصاءات الطباعة", energy:"الطاقة", spoolman:"Spoolman", sensors:"البيئة", automations:"الأتمتة", todo:"قائمة الطباعة", add:"إضافة", item:"أضف نموذجًا إلى القائمة…", empty:"لا توجد عناصر مُعدة", noCamera:"صورة الكاميرا غير متاحة", pause:"إيقاف مؤقت", resume:"استئناف", cancel:"إلغاء", emergency:"إيقاف طارئ", turnOn:"تشغيل الطابعة", turnOff:"إيقاف الطابعة", confirmOff:"هل تريد بالتأكيد إيقاف الطابعة؟", confirm:"إيقاف", back:"إلغاء", layerOf:"من", power:"الطاقة", energyCost:"تكلفة الطاقة التقديرية", noTodo:"لا توجد مهام طباعة", section:"قسم", entity:"الكيان", label:"التسمية", title:"العنوان", enabled:"مفعّل", language:"اللغة", theme:"سمة البطاقة", position:"موضع زر الطاقة", left:"يسار الاسم", right:"يمين الاسم", hidden:"مخفي", preset:"صورة الطابعة عند عدم الاتصال", customSvg:"صورة SVG مخصصة", uploadSvg:"تحميل ملف SVG", invalidSvg:"ملف SVG غير صالح (الحد الأقصى للحجم: 512 كيلوبايت)", printerName:"اسم الطابعة", onlineEntity:"كيان الحالة / الاتصال", powerEntity:"مفتاح تشغيل الطابعة", modelEntity:"كيان اسم النموذج", progressEntity:"كيان التقدم (%)", layerEntity:"كيان الطبقة الحالية", totalLayersEntity:"كيان إجمالي الطبقات", cameraEntity:"كيان الكاميرا", showCamera:"إظهار الكاميرا", showModel:"إظهار اسم النموذج", showLayer:"إظهار الطبقة", showProgress:"إظهار التقدم", refresh:"تحديث الكاميرا (ثوانٍ)", sections:"الأقسام والتخطيط", addSection:"إضافة قسم", addItem:"إضافة صف / زر", remove:"إزالة", moveUp:"تحريك للأعلى", moveDown:"تحريك للأسفل", type:"نوع القسم", selectTheme:"اسم سمة Home Assistant", price:"سعر الكهرباء لكل كيلوواط ساعة", currency:"العملة", attribute:"السمة (اختياري)", unit:"الوحدة", action:"إجراء الزر", toggle:"تبديل الكيان", service:"استدعاء خدمة", url:"فتح رابط", serviceName:"الخدمة (domain.service)", serviceData:"بيانات الخدمة (JSON)", dangerous:"إجراء خطير", todoEntity:"كيان قائمة المهام", spoolmanUrl:"رابط Spoolman", custom:"مخصص", nameRequired:"حدد اسمًا للطابعة.", notConfigured:"غير مُعد", invalidService:"تعذر استدعاء الخدمة المحددة.", sectionHint:"أضف كيانات أو أزرارًا لملء هذا القسم.", confirmAction:"هل تريد بالتأكيد تنفيذ هذا الإجراء؟", sectionHelp:"استخدم الأسهم لتغيير الترتيب. أضف الكيانات والإجراءات التي يوفرها تكامل الطابعة فقط.", themeHelp:"اتركه فارغًا لاستخدام سمة لوحة التحكم النشطة.", svgHelp:"تتم تنقية SVG قبل عرضه. استخدم مستند SVG مستقلًا.", onlineStates:"قيم حالة الاتصال", onlineStatesHelp:"قيم مفصولة بفواصل تُعامل على أنها متصل (الافتراضي: on, online, connected, ready, true, 1)." , icon:"أيقونة", fullWidth:"العرض الكامل", printerCommand:"أمر الطابعة (مترجم)", confirmBefore:"طلب التأكيد قبل التنفيذ", command:"الأمر", confirmActionButton:"تنفيذ", completeTodo:"إكمال", activeTheme:"سمة لوحة التحكم النشطة"},
    hi: { defaultPrinter:'3D प्रिंटर', openFramePrinter:'Ender 3 V3 / ओपन-फ्रेम प्रिंटर', enclosedPrinter:'बंद चैंबर वाला प्रिंटर', newButton:'नया बटन', newItem:'नया आइटम', online:"ऑनलाइन", offline:"ऑफलाइन", unknown:"अज्ञात", model:"प्रिंट हो रहा मॉडल", layer:"लेयर", progress:"प्रिंट प्रगति", cameras:"कैमरे", controls:"नियंत्रण", temperatures:"तापमान", ams:"फिलामेंट सिस्टम", statistics:"प्रिंट आँकड़े", energy:"ऊर्जा", spoolman:"Spoolman", sensors:"पर्यावरण", automations:"ऑटोमेशन", todo:"प्रिंट कतार", add:"जोड़ें", item:"कतार में मॉडल जोड़ें…", empty:"कोई आइटम कॉन्फ़िगर नहीं है", noCamera:"कैमरा छवि उपलब्ध नहीं", pause:"रोकें", resume:"फिर शुरू करें", cancel:"रद्द करें", emergency:"आपातकालीन रोक", turnOn:"प्रिंटर चालू करें", turnOff:"प्रिंटर बंद करें", confirmOff:"क्या आप वाकई प्रिंटर बंद करना चाहते हैं?", confirm:"बंद करें", back:"रद्द करें", layerOf:"में से", power:"पावर", energyCost:"अनुमानित ऊर्जा लागत", noTodo:"कोई प्रिंट कार्य नहीं", section:"अनुभाग", entity:"एंटिटी", label:"लेबल", title:"शीर्षक", enabled:"सक्षम", language:"भाषा", theme:"कार्ड थीम", position:"पावर बटन की स्थिति", left:"नाम के बाईं ओर", right:"नाम के दाईं ओर", hidden:"छिपा हुआ", preset:"ऑफलाइन प्रिंटर छवि", customSvg:"कस्टम SVG छवि", uploadSvg:"SVG फ़ाइल अपलोड करें", invalidSvg:"अमान्य SVG फ़ाइल (अधिकतम आकार: 512 KB)", printerName:"प्रिंटर का नाम", onlineEntity:"ऑनलाइन / स्थिति एंटिटी", powerEntity:"प्रिंटर पावर स्विच", modelEntity:"मॉडल नाम एंटिटी", progressEntity:"प्रगति एंटिटी (%)", layerEntity:"वर्तमान लेयर एंटिटी", totalLayersEntity:"कुल लेयर एंटिटी", cameraEntity:"कैमरा एंटिटी", showCamera:"कैमरा दिखाएँ", showModel:"मॉडल नाम दिखाएँ", showLayer:"लेयर दिखाएँ", showProgress:"प्रगति दिखाएँ", refresh:"कैमरा रिफ्रेश (सेकंड)", sections:"अनुभाग और लेआउट", addSection:"अनुभाग जोड़ें", addItem:"पंक्ति / बटन जोड़ें", remove:"हटाएँ", moveUp:"ऊपर ले जाएँ", moveDown:"नीचे ले जाएँ", type:"अनुभाग प्रकार", selectTheme:"Home Assistant थीम का नाम", price:"प्रति kWh बिजली की कीमत", currency:"मुद्रा", attribute:"विशेषता (वैकल्पिक)", unit:"इकाई", action:"बटन क्रिया", toggle:"एंटिटी टॉगल करें", service:"सेवा चलाएँ", url:"URL खोलें", serviceName:"सेवा (domain.service)", serviceData:"सेवा डेटा (JSON)", dangerous:"खतरनाक कार्रवाई", todoEntity:"टू-डू सूची एंटिटी", spoolmanUrl:"Spoolman URL", custom:"कस्टम", nameRequired:"प्रिंटर की पहचान के लिए नाम सेट करें।", notConfigured:"कॉन्फ़िगर नहीं", invalidService:"कॉन्फ़िगर की गई सेवा नहीं चलाई जा सकी।", sectionHint:"इस अनुभाग में एंटिटी या बटन जोड़ें।", confirmAction:"क्या आप वाकई यह कार्रवाई करना चाहते हैं?", sectionHelp:"क्रम बदलने के लिए तीरों का उपयोग करें। केवल प्रिंटर इंटीग्रेशन में उपलब्ध एंटिटी और कार्रवाइयाँ जोड़ें।", themeHelp:"सक्रिय डैशबोर्ड थीम के लिए खाली छोड़ें।", svgHelp:"दिखाने से पहले SVG को साफ़ किया जाता है। स्वतंत्र SVG दस्तावेज़ उपयोग करें।", onlineStates:"ऑनलाइन स्थिति मान", onlineStatesHelp:"कॉमा से अलग वे मान जिन्हें ऑनलाइन माना जाएगा (डिफ़ॉल्ट: on, online, connected, ready, true, 1)." , icon:"आइकन", fullWidth:"पूरी चौड़ाई", printerCommand:"प्रिंटर कमांड (अनुवादित)", confirmBefore:"चलाने से पहले पुष्टि माँगें", command:"कमांड", confirmActionButton:"चलाएँ", completeTodo:"पूरा करें", activeTheme:"सक्रिय डैशबोर्ड थीम"},
    zh: { defaultPrinter:'3D打印机', openFramePrinter:'Ender 3 V3 / 开放式打印机', enclosedPrinter:'封闭式打印机', newButton:'新按钮', newItem:'新项目', online:"在线", offline:"离线", unknown:"未知", model:"正在打印", layer:"层", progress:"打印进度", cameras:"摄像头", controls:"控制", temperatures:"温度", ams:"耗材系统", statistics:"打印统计", energy:"能源", spoolman:"Spoolman", sensors:"环境", automations:"自动化", todo:"打印队列", add:"添加", item:"将模型添加到队列…", empty:"未配置项目", noCamera:"摄像头图像不可用", pause:"暂停", resume:"继续", cancel:"取消", emergency:"紧急停止", turnOn:"开启打印机", turnOff:"关闭打印机", confirmOff:"确定要关闭打印机吗？", confirm:"关闭", back:"取消", layerOf:"共", power:"电源", energyCost:"预计电费", noTodo:"没有打印任务", section:"分区", entity:"实体", label:"标签", title:"标题", enabled:"启用", language:"语言", theme:"卡片主题", position:"电源按钮位置", left:"名称左侧", right:"名称右侧", hidden:"隐藏", preset:"离线打印机图片", customSvg:"自定义 SVG 图片", uploadSvg:"上传 SVG 文件", invalidSvg:"无效的 SVG 文件（最大 512 KB）", printerName:"打印机名称", onlineEntity:"在线/状态实体", powerEntity:"打印机电源开关", modelEntity:"模型名称实体", progressEntity:"进度实体 (%)", layerEntity:"当前层实体", totalLayersEntity:"总层数实体", cameraEntity:"摄像头实体", showCamera:"显示摄像头", showModel:"显示模型名称", showLayer:"显示层数", showProgress:"显示进度", refresh:"摄像头刷新间隔（秒）", sections:"分区与布局", addSection:"添加分区", addItem:"添加行/按钮", remove:"删除", moveUp:"上移", moveDown:"下移", type:"分区类型", selectTheme:"Home Assistant 主题名称", price:"每千瓦时电价", currency:"货币", attribute:"属性（可选）", unit:"单位", action:"按钮操作", toggle:"切换实体", service:"调用服务", url:"打开 URL", serviceName:"服务（domain.service）", serviceData:"服务数据（JSON）", dangerous:"危险操作", todoEntity:"待办列表实体", spoolmanUrl:"Spoolman URL", custom:"自定义", nameRequired:"请设置打印机名称。", notConfigured:"未配置", invalidService:"无法调用已配置的服务。", sectionHint:"添加实体或按钮以填充此分区。", confirmAction:"确定要执行此操作吗？", sectionHelp:"使用箭头调整顺序。仅添加打印机集成提供的实体和操作。", themeHelp:"留空以使用当前仪表板主题。", svgHelp:"显示前会清理 SVG。请使用独立的 SVG 文档。", onlineStates:"在线状态值", onlineStatesHelp:"以逗号分隔的在线状态值（默认：on, online, connected, ready, true, 1）。" , icon:"图标", fullWidth:"全宽", printerCommand:"打印机命令（已翻译）", confirmBefore:"执行前请求确认", command:"命令", confirmActionButton:"执行", completeTodo:"标记完成", activeTheme:"当前仪表板主题"},
    ja: { defaultPrinter:'3Dプリンター', openFramePrinter:'Ender 3 V3 / オープンフレーム型', enclosedPrinter:'密閉型プリンター', newButton:'新しいボタン', newItem:'新しい項目', online:"オンライン", offline:"オフライン", unknown:"不明", model:"印刷中のモデル", layer:"レイヤー", progress:"印刷の進行状況", cameras:"カメラ", controls:"操作", temperatures:"温度", ams:"フィラメントシステム", statistics:"印刷統計", energy:"電力", spoolman:"Spoolman", sensors:"環境", automations:"オートメーション", todo:"印刷キュー", add:"追加", item:"キューにモデルを追加…", empty:"設定された項目はありません", noCamera:"カメラ画像を利用できません", pause:"一時停止", resume:"再開", cancel:"キャンセル", emergency:"緊急停止", turnOn:"プリンターをオン", turnOff:"プリンターをオフ", confirmOff:"プリンターをオフにしますか？", confirm:"オフにする", back:"キャンセル", layerOf:"/", power:"電源", energyCost:"推定電気料金", noTodo:"印刷タスクはありません", section:"セクション", entity:"エンティティ", label:"ラベル", title:"タイトル", enabled:"有効", language:"言語", theme:"カードテーマ", position:"電源ボタンの位置", left:"名前の左", right:"名前の右", hidden:"非表示", preset:"オフライン時のプリンター画像", customSvg:"カスタム SVG 画像", uploadSvg:"SVGファイルをアップロード", invalidSvg:"無効なSVGファイルです（最大サイズ: 512 KB）", printerName:"プリンター名", onlineEntity:"オンライン / ステータスエンティティ", powerEntity:"プリンター電源スイッチ", modelEntity:"モデル名エンティティ", progressEntity:"進捗エンティティ (%)", layerEntity:"現在のレイヤーエンティティ", totalLayersEntity:"総レイヤー数エンティティ", cameraEntity:"カメラエンティティ", showCamera:"カメラを表示", showModel:"モデル名を表示", showLayer:"レイヤーを表示", showProgress:"進捗を表示", refresh:"カメラ更新間隔（秒）", sections:"セクションとレイアウト", addSection:"セクションを追加", addItem:"行 / ボタンを追加", remove:"削除", moveUp:"上へ", moveDown:"下へ", type:"セクションタイプ", selectTheme:"Home Assistant テーマ名", price:"kWh あたりの電気料金", currency:"通貨", attribute:"属性（任意）", unit:"単位", action:"ボタン操作", toggle:"エンティティを切り替え", service:"サービスを呼び出す", url:"URL を開く", serviceName:"サービス (domain.service)", serviceData:"サービスデータ (JSON)", dangerous:"危険な操作", todoEntity:"To-do リストエンティティ", spoolmanUrl:"Spoolman URL", custom:"カスタム", nameRequired:"プリンター名を設定してください。", notConfigured:"未設定", invalidService:"設定したサービスを呼び出せませんでした。", sectionHint:"エンティティまたはボタンを追加してください。", confirmAction:"この操作を実行しますか？", sectionHelp:"矢印で順序を変更します。プリンター統合が提供するエンティティと操作のみを追加してください。", themeHelp:"現在のダッシュボードテーマを使用する場合は空欄にします。", svgHelp:"表示前に SVG をサニタイズします。自己完結型 SVG ドキュメントを使用してください。", onlineStates:"オンライン状態の値", onlineStatesHelp:"オンラインとみなす状態値をカンマ区切りで指定します（既定値: on, online, connected, ready, true, 1）。" , icon:"アイコン", fullWidth:"全幅", printerCommand:"プリンターコマンド（翻訳済み）", confirmBefore:"実行前に確認する", command:"コマンド", confirmActionButton:"実行", completeTodo:"完了にする", activeTheme:"現在のダッシュボードテーマ"}
  };

  const SECTION_TYPES = ["cameras", "controls", "temperatures", "ams", "statistics", "energy", "spoolman", "sensors", "automations", "todo", "custom"];
  const DEFAULT_SECTIONS = [
    { id:"cameras", type:"cameras", title:"", enabled:true, items:[] },
    { id:"controls", type:"controls", title:"", enabled:true, items:[] },
    { id:"temperatures", type:"temperatures", title:"", enabled:true, items:[] },
    { id:"ams", type:"ams", title:"", enabled:false, items:[] },
    { id:"statistics", type:"statistics", title:"", enabled:true, items:[] },
    { id:"energy", type:"energy", title:"", enabled:false, items:[], price_per_kwh:"", currency:"EUR" },
    { id:"spoolman", type:"spoolman", title:"", enabled:false, items:[], url:"" },
    { id:"sensors", type:"sensors", title:"", enabled:false, items:[] },
    { id:"automations", type:"automations", title:"", enabled:false, items:[] },
    { id:"todo", type:"todo", title:"", enabled:false, entity:"", items:[] }
  ];

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const baseLang = (value) => {
    const key = String(value || "en").toLowerCase().split(/[-_]/)[0];
    return LANGUAGES.includes(key) ? key : "en";
  };
  const t = (lang, key) => (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  const slug = () => `section_${Math.random().toString(36).slice(2, 8)}`;

  const COMMON_CSS = `
    :host{display:block;color:var(--primary-text-color);font-family:var(--paper-font-body1_-_font-family,Roboto,Noto,sans-serif);--printer-radius:var(--ha-card-border-radius,12px)}
    ha-card{box-sizing:border-box;overflow:hidden;border-radius:var(--printer-radius);color:var(--primary-text-color);background:var(--ha-card-background,var(--card-background-color));border:var(--ha-card-border-width,1px) solid var(--ha-card-border-color,var(--divider-color));box-shadow:var(--ha-card-box-shadow,none);}
    .pad{padding:16px}.header{display:flex;align-items:center;gap:10px;min-width:0}.name{font-size:1.12rem;font-weight:600;line-height:1.35;min-width:0;overflow-wrap:anywhere;flex:1}.status{display:inline-flex;align-items:center;gap:7px;white-space:nowrap;font-size:.82rem;color:var(--secondary-text-color);font-weight:500}.dot{width:9px;height:9px;border-radius:50%;display:inline-block;background:var(--warning-color,#9e9e9e);box-shadow:0 0 0 2px color-mix(in srgb,var(--warning-color,#9e9e9e) 15%,transparent)}.dot.online{background:var(--success-color,#43a047);box-shadow:0 0 0 2px color-mix(in srgb,var(--success-color,#43a047) 15%,transparent)}.dot.offline{background:var(--error-color,#db4437);box-shadow:0 0 0 2px color-mix(in srgb,var(--error-color,#db4437) 15%,transparent)}
    .body{padding:0 16px 16px}.mini-main{display:grid;grid-template-columns:minmax(100px,34%) minmax(0,1fr);gap:16px;align-items:center;padding-top:14px}.camera,.offline-image{width:100%;aspect-ratio:4/3;object-fit:contain;border-radius:10px;background:var(--secondary-background-color,rgba(127,127,127,.08));display:block}.camera{object-fit:cover}.details{min-width:0;display:flex;flex-direction:column;gap:7px}.model{font-weight:600;font-size:.98rem;overflow-wrap:anywhere}.subline{display:flex;align-items:center;justify-content:space-between;gap:8px;color:var(--secondary-text-color);font-size:.83rem}.progress-track{height:8px;width:100%;background:var(--ha-progress-background, var(--divider-color));border-radius:999px;overflow:hidden}.progress-fill{height:100%;background:var(--primary-color);border-radius:999px;transition:width .25s ease}.offline-wrap{padding:12px 16px 16px}.offline-wrap .offline-image{max-height:250px;aspect-ratio:16/9}
    .power-btn,.action-btn,.icon-btn,.todo-add{border:0;border-radius:9px;background:var(--secondary-background-color);color:var(--primary-text-color);padding:8px 11px;font:inherit;cursor:pointer;display:inline-flex;gap:7px;align-items:center;justify-content:center;min-height:36px}.power-btn{font-size:.84rem;white-space:nowrap}.power-btn[aria-label*="Turn on"],.power-btn.start{color:var(--success-color,var(--primary-color))}.action-btn{font-size:.86rem}.action-btn.danger{color:var(--error-color)}button:hover{filter:brightness(.96)}button:focus-visible,a:focus-visible,input:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px}
    .large-body{padding:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr));gap:12px;align-items:start}.section{min-width:0;border:1px solid var(--divider-color);border-radius:11px;padding:12px;background:var(--ha-card-background,var(--card-background-color))}.section.wide{grid-column:1/-1}.section-title{font-size:.94rem;font-weight:600;margin:0 0 10px}.metric-list{display:grid;gap:8px}.metric{display:flex;justify-content:space-between;gap:12px;align-items:baseline;font-size:.89rem}.metric-label{color:var(--secondary-text-color);overflow-wrap:anywhere}.metric-value{font-weight:600;text-align:right;overflow-wrap:anywhere;font-variant-numeric:tabular-nums}.camera-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:10px}.camera-tile{min-width:0}.camera-tile img{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:8px;background:var(--secondary-background-color)}.camera-label{font-size:.83rem;color:var(--secondary-text-color);margin:5px 0 0}.button-grid{display:flex;gap:8px;flex-wrap:wrap}.automation-list{display:grid;gap:9px}.automation-row{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:.9rem}.entity-toggle{width:40px;height:23px;border:0;border-radius:99px;background:var(--disabled-color,var(--divider-color));position:relative;cursor:pointer;flex:none}.entity-toggle::after{content:"";position:absolute;width:17px;height:17px;top:3px;left:3px;border-radius:50%;background:white;transition:transform .15s}.entity-toggle.on{background:var(--success-color,var(--primary-color))}.entity-toggle.on::after{transform:translateX(17px)}
    .todo-form{display:flex;gap:7px;margin:2px 0 10px}.todo-form input{min-width:0;flex:1;border:1px solid var(--input-fill-color,var(--divider-color));background:var(--secondary-background-color);color:var(--primary-text-color);border-radius:8px;padding:8px 10px;font:inherit}.todo-list{display:grid;gap:7px}.todo-row{display:flex;align-items:center;gap:8px;font-size:.88rem}.todo-row.done span{text-decoration:line-through;color:var(--secondary-text-color)}.todo-row span{flex:1;overflow-wrap:anywhere}.todo-row button{border:0;background:transparent;color:var(--secondary-text-color);cursor:pointer}.empty{font-size:.84rem;color:var(--secondary-text-color)}.overlay{position:fixed;inset:0;background:rgba(0,0,0,.48);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px}.dialog{width:min(100%,420px);border-radius:14px;background:var(--card-background-color,var(--ha-card-background));box-shadow:0 10px 40px rgba(0,0,0,.28);padding:20px}.dialog p{margin:0 0 18px;line-height:1.5}.dialog-actions{display:flex;justify-content:flex-end;gap:8px}.dialog-actions .confirm{background:var(--error-color);color:white}
    @media(max-width:430px){.pad{padding:13px}.body{padding:0 13px 13px}.mini-main{grid-template-columns:minmax(90px,36%) minmax(0,1fr);gap:11px}.subline{font-size:.76rem;flex-wrap:wrap}.model{font-size:.9rem}.large-body{padding:10px;gap:9px}.section{padding:10px}}
  `;

  function presetSvg(preset) {
    const common = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9aa4b2"/><stop offset="1" stop-color="#5d6877"/></linearGradient></defs>`;
    if (preset === "a1mini") return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 280">${common}<rect x="72" y="40" width="280" height="198" rx="25" fill="#252d38"/><rect x="95" y="58" width="234" height="158" rx="14" fill="#d9e0e8"/><rect x="111" y="72" width="202" height="125" rx="8" fill="#f7f9fb"/><path d="M125 176h174M139 162l16-40h104l17 40" fill="none" stroke="#aab4c0" stroke-width="5"/><rect x="186" y="95" width="42" height="10" rx="4" fill="#657181"/><path d="M88 221h248" stroke="#485260" stroke-width="13" stroke-linecap="round"/><circle cx="335" cy="75" r="8" fill="#3aa66b"/></svg>`;
    if (preset === "enclosed") return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 280">${common}<rect x="91" y="25" width="258" height="226" rx="13" fill="#394451"/><rect x="111" y="45" width="218" height="184" rx="5" fill="#cbd4dd"/><rect x="125" y="60" width="190" height="153" rx="3" fill="#eef2f6"/><path d="M143 188h154M154 175l22-45h87l22 45" fill="none" stroke="#9ba6b2" stroke-width="5"/><path d="M91 238h258" stroke="#252d38" stroke-width="12" stroke-linecap="round"/><circle cx="315" cy="42" r="6" fill="#8c9bab"/></svg>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 280">${common}<path d="M110 40h220M125 40v190M315 40v190M110 230h220" fill="none" stroke="#525e6b" stroke-width="12" stroke-linecap="round"/><path d="M144 65h152v140H144z" fill="#d8e0e8" stroke="#8995a3" stroke-width="5"/><path d="M155 184h130M167 170l16-38h73l17 38" fill="none" stroke="#9aa5b2" stroke-width="5"/><rect x="202" y="90" width="35" height="10" rx="4" fill="#687483"/><path d="M98 242h244" stroke="#303a46" stroke-width="13" stroke-linecap="round"/><circle cx="327" cy="55" r="6" fill="#8c9bab"/></svg>`;
  }

  function sanitizeSvg(source) {
    const text = String(source || "").trim();
    if (!text || !/(?:<\?xml[^>]*>\s*)?<svg[\s>]/i.test(text)) return "";
    try {
      const doc = new DOMParser().parseFromString(text, "image/svg+xml");
      const root = doc.documentElement;
      if (!root || root.tagName.toLowerCase() !== "svg" || doc.querySelector("parsererror")) return "";
      root.querySelectorAll("script,foreignObject,iframe,object,embed,audio,video,style,animate,animateMotion,animateTransform,set,feImage").forEach((node) => node.remove());
      const nodes = [root, ...root.querySelectorAll("*")];
      nodes.forEach((node) => {
        [...node.attributes].forEach((attr) => {
          const name = attr.name.toLowerCase();
          const value = attr.value.trim();
          if (name.startsWith("on") || ((name === "href" || name.endsWith(":href")) && !value.startsWith("#")) || /(?:url\s*\(|@import|expression\s*\()/i.test(value)) node.removeAttribute(attr.name);
        });
      });
      return new XMLSerializer().serializeToString(root);
    } catch (_) { return ""; }
  }

  class PrinterCardBase extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._config = {};
      this._hass = null;
      this._lang = "en";
      this._refreshTimer = null;
      this._cameraTick = 0;
      this._confirmDialog = false;
      this._todoItems = [];
      this._todoEntityLoaded = "";
      this._todoMarker = "";
      this._todoLoading = false;
      this._todoError = false;
      this._boundClick = (event) => this._onClick(event);
      this.shadowRoot.addEventListener("click", this._boundClick);
    }
    set hass(value) {
      this._hass = value;
      this._lang = this._getLanguage();
      this._applyTheme();
      this._render();
      this._maybeLoadTodo();
      this._setupRefresh();
    }
    get hass() { return this._hass; }
    setConfig(config) {
      if (!config || typeof config !== "object") throw new Error("Invalid card configuration");
      this._config = clone(config);
      this._lang = this._getLanguage();
      this._applyTheme();
      this._render();
      this._maybeLoadTodo();
      this._setupRefresh();
    }
    connectedCallback() { this._setupRefresh(); }
    disconnectedCallback() {
      if (this._refreshTimer) clearInterval(this._refreshTimer);
      this._refreshTimer = null;
    }
    _getLanguage() {
      const selected = this._config.language || "auto";
      if (selected !== "auto") return baseLang(selected);
      return baseLang(this._hass?.locale?.language || this._hass?.language || navigator.language || "en");
    }
    _t(key) { return t(this._lang, key); }
    _state(entity) { return entity && this._hass?.states ? this._hass.states[entity] : undefined; }
    _value(entity, attribute) {
      const state = this._state(entity);
      if (!state) return "";
      const raw = attribute ? state.attributes?.[attribute] : state.state;
      if (raw === undefined || raw === null || raw === "unknown" || raw === "unavailable") return "";
      return raw;
    }
    _formatted(entity, attribute, unitOverride) {
      const state = this._state(entity);
      const raw = this._value(entity, attribute);
      if (raw === "") return "—";
      const unit = unitOverride || state?.attributes?.unit_of_measurement || "";
      return `${raw}${unit ? ` ${unit}` : ""}`;
    }
    _isOnline() {
      const entity = this._config.status_entity || this._config.online_entity;
      if (!entity) return false;
      const state = this._state(entity);
      if (!state || ["unavailable", "unknown", "offline", "disconnected", "0", "false"].includes(String(state.state).toLowerCase())) return false;
      const values = String(this._config.online_states || "on,online,connected,ready,true,1,printing,paused,idle,complete,standby,operational,heating,starting,finishing").split(",").map((v) => v.trim().toLowerCase()).filter(Boolean);
      return values.includes(String(state.state).toLowerCase());
    }
    _applyTheme() {
      if (!this.style) return;
      const name = this._config?.theme;
      const themes = this._hass?.themes?.themes || {};
      if (!name || name === "default" || !themes[name]) {
        this.style.removeProperty("--printer-theme-name");
        if (this._appliedThemeKeys) this._appliedThemeKeys.forEach((key) => this.style.removeProperty(key));
        this._appliedThemeKeys = [];
        return;
      }
      const theme = themes[name];
      const keys = [];
      Object.entries(theme).forEach(([key, value]) => {
        if (typeof value !== "string" && typeof value !== "number") return;
        const cssKey = key.startsWith("--") ? key : `--${key}`;
        this.style.setProperty(cssKey, String(value));
        keys.push(cssKey);
      });
      (this._appliedThemeKeys || []).filter((key) => !keys.includes(key)).forEach((key) => this.style.removeProperty(key));
      this._appliedThemeKeys = keys;
    }
    _setupRefresh() {
      const seconds = Math.max(5, Number(this._config.camera_refresh || 20));
      const hasCamera = (this._config.show_camera !== false && !!this._config.camera_entity) ||
        (this._config.sections || []).some((section) => section?.type === "cameras" && section.enabled !== false && (section.items || []).some((item) => item.entity));
      if (!hasCamera) {
        if (this._refreshTimer) clearInterval(this._refreshTimer);
        this._refreshTimer = null;
        this._refreshSeconds = seconds;
        return;
      }
      if (this._refreshTimer && this._refreshSeconds === seconds) return;
      if (this._refreshTimer) clearInterval(this._refreshTimer);
      this._refreshTimer = null;
      this._refreshSeconds = seconds;
      if (this.isConnected) this._refreshTimer = setInterval(() => { this._cameraTick += 1; this._render(); }, seconds * 1000);
    }
    _imageSrc(cameraEntity) {
      const state = this._state(cameraEntity);
      const path = state?.attributes?.entity_picture || state?.attributes?.picture;
      const base = path || `/api/camera_proxy/${encodeURIComponent(cameraEntity)}`;
      const join = base.includes("?") ? "&" : "?";
      return `${base}${join}printer_card_refresh=${this._cameraTick}`;
    }
    _offlineImage() {
      const preset = this._config.offline_image || "ender3v3";
      if (preset === "custom") {
        const svg = sanitizeSvg(this._config.offline_svg || this._config.custom_svg || "");
        if (svg) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      }
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(presetSvg(preset))}`;
    }
    _header() {
      const name = this._config.name || this._config.printer_name || this._t("defaultPrinter");
      const online = this._isOnline();
      const statusText = online ? this._t("online") : this._t("offline");
      const statusClass = online ? "online" : "offline";
      const pos = this._config.power_button_position || (this._config.show_power_button === false ? "none" : "left");
      const power = this._config.power_entity ? `<button class="power-btn ${this._isPowerOn() ? "" : "start"}" data-action="power" title="${esc(this._isPowerOn() ? this._t("turnOff") : this._t("turnOn"))}" aria-label="${esc(this._isPowerOn() ? this._t("turnOff") : this._t("turnOn"))}">${this._isPowerOn() ? "◉" : "⏻"} ${esc(this._isPowerOn() ? this._t("power") : this._t("turnOn"))}</button>` : "";
      return `<div class="pad"><div class="header">${pos === "left" ? power : ""}<div class="name">${esc(name)}</div>${pos === "right" ? power : ""}<div class="status"><span class="dot ${statusClass}"></span>${esc(statusText)}</div></div></div>`;
    }
    _isPowerOn() {
      const entity = this._config.power_entity;
      const state = this._state(entity);
      if (!state) return false;
      return !["off", "unavailable", "unknown", "false", "0", "closed"].includes(String(state.state).toLowerCase());
    }
    _dialog() {
      if (!this._confirmDialog) return "";
      const custom = this._confirmDialog === "button";
      const message = custom ? `${this._t("confirmAction")} ${this._pendingButton?.label || this._pendingButton?.name || ""}` : this._t("confirmOff");
      return `<div class="overlay" role="presentation"><div class="dialog" role="dialog" aria-modal="true"><p>${esc(message)}</p><div class="dialog-actions"><button class="action-btn" data-action="cancel-dialog">${esc(this._t("back"))}</button><button class="action-btn confirm" data-action="${custom ? "confirm-button" : "confirm-power-off"}">${esc(this._t(custom ? "confirmActionButton" : "confirm"))}</button></div></div></div>`;
    }
    _style() { return `<style>${COMMON_CSS}</style>`; }
    async _callService(domain, service, serviceData = {}, target = undefined) {
      if (!this._hass?.callService) throw new Error("Home Assistant service API is unavailable");
      return this._hass.callService(domain, service, serviceData, target);
    }
    async _toggleEntity(entity) {
      if (!entity) return;
      const domain = entity.split(".")[0];
      const state = this._state(entity);
      const isOn = state && !["off", "unavailable", "unknown", "false", "0", "closed"].includes(String(state.state).toLowerCase());
      const service = isOn ? "turn_off" : "turn_on";
      await this._callService(domain, service, {}, { entity_id: entity });
    }
    async _runButton(button) {
      if (!button) return;
      if (button.action === "url") {
        if (button.url && /^https?:\/\//i.test(button.url)) window.open(button.url, "_blank", "noopener,noreferrer");
        return;
      }
      if (button.action === "toggle") {
        await this._toggleEntity(button.entity);
        return;
      }
      const serviceText = String(button.service || "");
      const parts = serviceText.split(".");
      if (parts.length !== 2 || !parts[0] || !parts[1]) throw new Error(this._t("invalidService"));
      let serviceData = {};
      if (button.service_data) {
        serviceData = typeof button.service_data === "object" ? clone(button.service_data) : JSON.parse(button.service_data);
      }
      if (button.entity && !serviceData.entity_id) serviceData.entity_id = button.entity;
      await this._callService(parts[0], parts[1], serviceData);
    }
    async _onClick(event) {
      const actionEl = event.composedPath().find((node) => node?.dataset?.action);
      if (!actionEl) return;
      const action = actionEl.dataset.action;
      try {
        if (action === "power") {
          if (this._isPowerOn() && this._config.confirm_power_off !== false) { this._confirmDialog = true; this._render(); }
          else await this._toggleEntity(this._config.power_entity);
        } else if (action === "cancel-dialog") { this._confirmDialog = false; this._pendingButton = null; this._render(); }
        else if (action === "confirm-power-off") { this._confirmDialog = false; await this._callService("homeassistant", "turn_off", {}, { entity_id: this._config.power_entity }); this._render(); }
        else if (action === "section-button") {
          const section = this._config.sections?.[Number(actionEl.dataset.section)];
          const button = section?.items?.[Number(actionEl.dataset.item)];
          if (button?.confirm) { this._pendingButton = button; this._confirmDialog = "button"; this._render(); }
          else await this._runButton(button);
        } else if (action === "confirm-button") {
          const button = this._pendingButton; this._pendingButton = null; this._confirmDialog = false; await this._runButton(button); this._render();
        } else if (action === "entity-toggle") await this._toggleEntity(actionEl.dataset.entity);
        else if (action === "todo-add") await this._addTodo();
        else if (action === "todo-complete") await this._updateTodo(actionEl.dataset.uid, "completed");
        else if (action === "todo-remove") await this._removeTodo(actionEl.dataset.uid);
      } catch (error) {
        // Home Assistant's own service error is surfaced in the browser console; keep the card usable.
        console.warn("[HA 3Dprinter Card] Action failed:", error);
        this._confirmDialog = false; this._pendingButton = null; this._render();
      }
    }
    _maybeLoadTodo() {
      const entity = this._config.sections?.find((s) => s.type === "todo" && s.enabled !== false)?.entity;
      if (!entity || this._todoLoading) return;
      const state = this._state(entity);
      const marker = `${state?.state || ""}|${state?.last_updated || ""}`;
      if (entity !== this._todoEntityLoaded || marker !== this._todoMarker) this._loadTodo(entity);
    }
    async _loadTodo(entity) {
      if (!this._hass?.callWS || !entity) return;
      this._todoLoading = true;
      this._todoError = false;
      try {
        const result = await this._hass.callWS({ type:"call_service", domain:"todo", service:"get_items", target:{ entity_id:entity }, return_response:true });
        const response = result?.response || result;
        const bucket = response?.[entity] || response?.[entity.replace(".", "\\.")] || Object.values(response || {})[0];
        this._todoItems = Array.isArray(bucket?.items) ? bucket.items : [];
        this._todoEntityLoaded = entity;
        const state = this._state(entity);
        this._todoMarker = `${state?.state || ""}|${state?.last_updated || ""}`;
      } catch (error) {
        this._todoError = true;
        console.warn("[HA 3Dprinter Card] Could not load todo items:", error);
      } finally {
        this._todoLoading = false;
        this._render();
      }
    }
    async _refreshTodo() {
      const entity = this._config.sections?.find((s) => s.type === "todo" && s.enabled !== false)?.entity;
      if (entity) { this._todoEntityLoaded = ""; await this._loadTodo(entity); }
    }
    async _addTodo() {
      const section = this._config.sections?.find((s) => s.type === "todo" && s.enabled !== false);
      const entity = section?.entity;
      const input = this.shadowRoot.querySelector("[data-todo-input]");
      const item = input?.value?.trim();
      if (!entity || !item) return;
      await this._callService("todo", "add_item", { item }, { entity_id: entity });
      await this._refreshTodo();
    }
    async _updateTodo(uid, status) {
      const entity = this._config.sections?.find((s) => s.type === "todo" && s.enabled !== false)?.entity;
      if (!entity || !uid) return;
      await this._callService("todo", "update_item", { item: uid, status }, { entity_id: entity });
      await this._refreshTodo();
    }
    async _removeTodo(uid) {
      const entity = this._config.sections?.find((s) => s.type === "todo" && s.enabled !== false)?.entity;
      if (!entity || !uid) return;
      await this._callService("todo", "remove_item", { item: uid }, { entity_id: entity });
      await this._refreshTodo();
    }
  }

  class Ha3dprinterCardMini extends PrinterCardBase {
    static getConfigElement() { return document.createElement("ha-3dprinter-card-editor").configureFor("mini"); }
    static getStubConfig() { return { type:"custom:ha-3dprinter-card-mini", language:"auto", offline_image:"ender3v3", power_button_position:"none", show_camera:true, show_model:true, show_layer:true, show_progress:true }; }
    getCardSize() { return 3; }
    getGridOptions() { return { columns:6, min_columns:3, rows:"auto" }; }
    _render() {
      if (!this.shadowRoot || !this._config) return;
      const online = this._isOnline();
      let content = "";
      if (online === false) {
        content = `<div class="offline-wrap"><img class="offline-image" src="${esc(this._offlineImage())}" alt="${esc(this._config.name || this._t("defaultPrinter"))}" /></div>`;
      } else {
        const showCamera = this._config.show_camera !== false;
        const camera = this._config.camera_entity;
        const cameraHtml = showCamera && camera ? `<img class="camera" src="${esc(this._imageSrc(camera))}" alt="${esc(this._t("cameras"))}" />` : "";
        const model = this._formatted(this._config.model_entity, this._config.model_attribute, "");
        const layer = this._value(this._config.layer_entity);
        const total = this._value(this._config.total_layers_entity);
        const progressRaw = this._value(this._config.progress_entity);
        const progressValue = Number(progressRaw);
        const progressValid = progressRaw !== "" && Number.isFinite(progressValue);
        const progress = progressValid ? Math.max(0, Math.min(100, progressValue)) : 0;
        const rows = [];
        if (this._config.show_model !== false && this._config.model_entity) rows.push(`<div class="model">${esc(model || "—")}</div>`);
        if (this._config.show_layer !== false && this._config.layer_entity) rows.push(`<div class="subline"><span>${esc(this._t("layer"))} ${esc(layer || "—")}${this._config.total_layers_entity ? ` ${esc(this._t("layerOf"))} ${esc(total || "—")}` : ""}</span>${this._config.show_progress !== false && this._config.progress_entity ? `<span>${progressValid ? `${Math.round(progress)}%` : "—"}</span>` : ""}</div>`);
        else if (this._config.show_progress !== false && this._config.progress_entity) rows.push(`<div class="subline"><span>${esc(this._t("progress"))}</span><span>${progressValid ? `${Math.round(progress)}%` : "—"}</span></div>`);
        if (this._config.show_progress !== false && this._config.progress_entity) rows.push(`<div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>`);
        content = `<div class="body"><div class="mini-main" style="${cameraHtml ? "" : "grid-template-columns:minmax(0,1fr)"}">${cameraHtml}<div class="details">${rows.join("") || `<div class="empty">${esc(this._t("empty"))}</div>`}</div></div></div>`;
      }
      this.shadowRoot.innerHTML = `${this._style()}<ha-card>${this._header()}${content}${this._dialog()}</ha-card>`;
    }
  }

  class Ha3dprinterCard extends PrinterCardBase {
    static getConfigElement() { return document.createElement("ha-3dprinter-card-editor").configureFor("large"); }
    static getStubConfig() { return { type:"custom:ha-3dprinter-card", language:"auto", offline_image:"enclosed", power_button_position:"left", confirm_power_off:true, sections:clone(DEFAULT_SECTIONS) }; }
    getCardSize() { return 8; }
    getGridOptions() { return { columns:12, min_columns:6, rows:"auto" }; }
    _render() {
      if (!this.shadowRoot || !this._config) return;
      const online = this._isOnline();
      let content = "";
      if (online === false) {
        content = `<div class="offline-wrap"><img class="offline-image" style="max-height:420px" src="${esc(this._offlineImage())}" alt="${esc(this._config.name || this._t("defaultPrinter"))}" /></div>`;
      } else {
        const sections = (this._config.sections || []).filter((section) => section && section.enabled !== false).map((section, index) => this._renderSection(section, index)).filter(Boolean).join("");
        content = sections ? `<div class="large-body">${sections}</div>` : `<div class="large-body"><div class="empty">${esc(this._t("sectionHint"))}</div></div>`;
      }
      this.shadowRoot.innerHTML = `${this._style()}<ha-card>${this._header()}${content}${this._dialog()}</ha-card>`;
    }
    _renderSection(section, index) {
      const type = section.type || "custom";
      const title = section.title || this._t(type in I18N.en ? type : "custom");
      const items = Array.isArray(section.items) ? section.items : [];
      let body = "";
      if (type === "cameras") {
        const cameras = items.filter((item) => item.enabled !== false && item.entity).map((item) => `<div class="camera-tile"><img src="${esc(this._imageSrc(item.entity))}" alt="${esc(item.label || item.entity)}" /><div class="camera-label">${esc(item.label || this._t("cameras"))}</div></div>`).join("");
        body = cameras ? `<div class="camera-grid">${cameras}</div>` : "";
      } else if (type === "controls") {
        const buttons = items.map((button, itemIndex) => ({ button, itemIndex })).filter(({ button }) => button.enabled !== false).map(({ button, itemIndex }) => {
          const icon = button.icon ? `<span>${esc(button.icon)}</span>` : "";
          const cls = button.dangerous ? "action-btn danger" : "action-btn";
          return `<button class="${cls}" data-action="section-button" data-section="${index}" data-item="${itemIndex}">${icon}${esc(button.action === "preset" && button.command ? this._t(button.command) : (button.label || button.name || this._t("controls")))}</button>`;
        }).join("");
        body = buttons ? `<div class="button-grid">${buttons}</div>` : "";
      } else if (type === "automations") {
        const rows = items.filter((item) => item.enabled !== false && item.entity).map((item) => {
          const state = this._state(item.entity);
          const on = state && !["off", "unavailable", "unknown", "false", "0"].includes(String(state.state).toLowerCase());
          return `<div class="automation-row"><span>${esc(item.label || item.entity)}</span><button class="entity-toggle ${on ? "on" : ""}" data-action="entity-toggle" data-entity="${esc(item.entity)}" aria-label="${esc(item.label || item.entity)}"></button></div>`;
        }).join("");
        body = rows ? `<div class="automation-list">${rows}</div>` : "";
      } else if (type === "todo") {
        const active = this._todoItems.filter((item) => item.status !== "completed");
        const done = this._todoItems.filter((item) => item.status === "completed");
        const rows = [...active, ...done].map((item) => {
          const uid = item.uid || item.id || item.item;
          return `<div class="todo-row ${item.status === "completed" ? "done" : ""}"><button data-action="todo-complete" data-uid="${esc(uid)}" aria-label="${esc(item.summary || item.item || this._t("completeTodo"))}">${item.status === "completed" ? "☑" : "☐"}</button><span>${esc(item.summary || item.item || "")}</span><button data-action="todo-remove" data-uid="${esc(uid)}" aria-label="${esc(this._t("remove"))}">×</button></div>`;
        }).join("");
        body = `<div class="todo-form"><input data-todo-input placeholder="${esc(this._t("item"))}" /><button class="todo-add" data-action="todo-add">${esc(this._t("add"))}</button></div><div class="todo-list">${rows || `<div class="empty">${esc(this._todoLoading ? "…" : this._t("noTodo"))}</div>`}</div>`;
      } else {
        const rows = items.filter((item) => item.enabled !== false && (item.entity || item.value !== undefined)).map((item) => {
          let value = item.entity ? this._formatted(item.entity, item.attribute, item.unit) : `${item.value ?? ""}${item.unit ? ` ${item.unit}` : ""}`;
          return `<div class="metric"><span class="metric-label">${esc(item.label || item.entity || "")}</span><span class="metric-value">${esc(value)}</span></div>`;
        });
        if (type === "energy" && section.energy_entity) {
          const energyRaw = this._value(section.energy_entity);
          const kwh = Number(energyRaw);
          const price = Number(section.price_per_kwh);
          if (energyRaw !== "" && Number.isFinite(kwh) && Number.isFinite(price) && section.price_per_kwh !== "") rows.push(`<div class="metric"><span class="metric-label">${esc(this._t("energyCost"))}</span><span class="metric-value">${esc((kwh * price).toFixed(2))} ${esc(section.currency || "EUR")}</span></div>`);
        }
        if (type === "spoolman" && section.url && /^https?:\/\//i.test(section.url)) rows.push(`<div><a class="action-btn" href="${esc(section.url)}" target="_blank" rel="noopener noreferrer">${esc(section.url)}</a></div>`);
        body = rows.length ? `<div class="metric-list">${rows.join("")}</div>` : "";
      }
      if (!body) return "";
      const defaultWide = ["cameras", "controls", "todo"].includes(type);
      const wide = section.wide === undefined ? defaultWide : section.wide === true;
      return `<section class="section ${wide ? "wide" : ""}"><h3 class="section-title">${esc(title)}</h3>${body}</section>`;
    }
  }

  class Ha3dprinterCardEditor extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode:"open" });
      this._config = {};
      this._hass = null;
      this._kind = "large";
      this._lang = "en";
      this._onChange = (event) => this._fieldChanged(event);
      this._onClick = (event) => this._buttonClicked(event);
      this._onFileChange = (event) => this._fileChanged(event);
      this.shadowRoot.addEventListener("change", this._onChange);
      this.shadowRoot.addEventListener("change", this._onFileChange);
      this.shadowRoot.addEventListener("value-changed", this._onChange);
      this.shadowRoot.addEventListener("click", this._onClick);
    }
    configureFor(kind) { this._kind = kind; this._render(); return this; }
    setConfig(config) { this._config = clone(config || {}); this._lang = this._language(); this._render(); }
    set hass(value) {
      this._hass = value;
      const signature = Object.keys(this._hass?.themes?.themes || {}).sort().join("|");
      if (signature !== this._themeSignature) { this._themeSignature = signature; this._render(); }
      else this._renderPickers();
    }
    get hass() { return this._hass; }
    _language() {
      const setting = this._config.language || "auto";
      return setting === "auto" ? baseLang(this._hass?.locale?.language || this._hass?.language || navigator.language || "en") : baseLang(setting);
    }
    _t(key) { return t(this._lang, key); }
    _field(label, path, value, type = "text", options = []) {
      const safeValue = esc(value ?? "");
      if (type === "entity") return `<label class="field"><span>${esc(label)}</span><div class="entity-host" data-picker-path="${esc(path)}" data-value="${safeValue}"></div></label>`;
      if (type === "file") return `<label class="field"><span>${esc(label)}</span><input type="file" accept=".svg,image/svg+xml" data-file-path="${esc(path)}" /></label>`;
      if (type === "select") return `<label class="field"><span>${esc(label)}</span><select data-path="${esc(path)}">${options.map((option) => `<option value="${esc(option.value)}" ${String(value) === String(option.value) ? "selected" : ""}>${esc(option.label)}</option>`).join("")}</select></label>`;
      if (type === "textarea") return `<label class="field"><span>${esc(label)}</span><textarea rows="5" data-path="${esc(path)}">${safeValue}</textarea></label>`;
      if (type === "checkbox") return `<label class="check"><input type="checkbox" data-path="${esc(path)}" ${value !== false ? "checked" : ""}/><span>${esc(label)}</span></label>`;
      return `<label class="field"><span>${esc(label)}</span><input type="${type}" data-path="${esc(path)}" value="${safeValue}" /></label>`;
    }
    _render() {
      if (!this.shadowRoot) return;
      this._lang = this._language();
      const c = this._config;
      const languageOptions = [{value:"auto",label:"Auto"},{value:"en",label:"English"},{value:"pl",label:"Polski"},{value:"de",label:"Deutsch"},{value:"es",label:"Español"},{value:"fr",label:"Français"},{value:"pt",label:"Português"},{value:"ar",label:"العربية"},{value:"hi",label:"हिन्दी"},{value:"zh",label:"中文"},{value:"ja",label:"日本語"}];
      const presetOptions = [{value:"ender3v3",label:this._t("openFramePrinter")},{value:"a1mini",label:"Bambu Lab A1 mini"},{value:"enclosed",label:this._t("enclosedPrinter")},{value:"custom",label:this._t("customSvg")}];
      const positionOptions = [{value:"none",label:this._t("hidden")},{value:"left",label:this._t("left")},{value:"right",label:this._t("right")}];
      const themeNames = Object.keys(this._hass?.themes?.themes || {}).sort();
      const themeOptions = [{value:"",label:this._t("activeTheme")}, ...themeNames.map((name) => ({value:name,label:name}))];
      if (c.theme && !themeNames.includes(c.theme)) themeOptions.push({value:c.theme,label:c.theme});
      let html = `<style>
        :host{display:block;color:var(--primary-text-color);font-family:var(--paper-font-body1_-_font-family,Roboto,sans-serif)}.editor{display:grid;gap:14px}.group{border:1px solid var(--divider-color);border-radius:12px;padding:14px;display:grid;gap:11px}.group h3{font-size:1rem;margin:0;font-weight:600}.fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:10px}.field{display:grid;gap:5px;min-width:0;font-size:.86rem;color:var(--secondary-text-color)}input,select,textarea{box-sizing:border-box;width:100%;min-width:0;border:1px solid var(--input-fill-color,var(--divider-color));border-radius:8px;background:var(--secondary-background-color);color:var(--primary-text-color);padding:9px 10px;font:inherit;font-size:.92rem}textarea{resize:vertical}.entity-host{min-width:0}.check{display:flex;align-items:center;gap:8px;font-size:.88rem}.check input{width:auto}.section-editor{border:1px solid var(--divider-color);border-radius:10px;padding:11px;display:grid;gap:10px}.section-head{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.section-head strong{flex:1}.btn{background:var(--secondary-background-color);border:1px solid var(--divider-color);color:var(--primary-text-color);border-radius:8px;padding:7px 10px;font:inherit;cursor:pointer}.btn.primary{background:var(--primary-color);color:var(--text-primary-color,#fff);border-color:transparent}.item-editor{border-top:1px solid var(--divider-color);padding-top:10px;display:grid;gap:9px}.muted{color:var(--secondary-text-color);font-size:.82rem}.row-actions{display:flex;gap:6px;flex-wrap:wrap}.item-title{font-weight:600;font-size:.88rem}.help{color:var(--secondary-text-color);font-size:.82rem;line-height:1.45}.preset-choices{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:9px}.preset-choice{border:1px solid var(--divider-color);border-radius:9px;padding:7px;background:var(--secondary-background-color);color:var(--primary-text-color);cursor:pointer;display:grid;gap:5px;text-align:center;font:inherit;font-size:.78rem}.preset-choice.selected{border:2px solid var(--primary-color);padding:6px}.preset-choice img{width:100%;height:70px;object-fit:contain}.preset-choice span{overflow-wrap:anywhere}
      </style><div class="editor">`;
      html += `<div class="group"><h3>${esc(this._t("printerName"))}</h3><div class="fields">${this._field(this._t("printerName"), "name", c.name || c.printer_name || "")}${this._field(this._t("language"), "language", c.language || "auto", "select", languageOptions)}${this._field(this._t("theme"), "theme", c.theme || "", "select", themeOptions)}</div><div class="help">${esc(this._t("selectTheme"))}. ${esc(this._t("themeHelp"))}</div></div>`;
      html += `<div class="group"><h3>${esc(this._t("power"))} / ${esc(this._t("online"))}</h3><div class="fields">${this._field(this._t("onlineEntity"), "status_entity", c.status_entity || c.online_entity || "", "entity")}${this._field(this._t("powerEntity"), "power_entity", c.power_entity || "", "entity")}${this._field(this._t("position"), "power_button_position", c.power_button_position || (c.show_power_button === false ? "none" : this._kind === "mini" ? "none" : "left"), "select", positionOptions)}</div>${this._field(this._t("onlineStates"), "online_states", c.online_states || "")}${this._field(this._t("refresh"), "camera_refresh", c.camera_refresh ?? 20, "number")}${this._field(this._t("confirmOff"), "confirm_power_off", c.confirm_power_off !== false, "checkbox")}</div>`;
      const presets = [{value:"ender3v3",label:"Ender 3 V3"},{value:"a1mini",label:"Bambu Lab A1 mini"},{value:"enclosed",label:this._t("enclosedPrinter")},{value:"custom",label:this._t("customSvg")}];
      const presetChoices = presets.map((preset) => `<button type="button" class="preset-choice ${(c.offline_image || "ender3v3") === preset.value ? "selected" : ""}" data-editor-action="preset" data-value="${preset.value}">${preset.value === "custom" ? "<span>SVG</span>" : `<img src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(presetSvg(preset.value))}" alt="${esc(preset.label)}"/>`}<span>${esc(preset.label)}</span></button>`).join("");
      html += `<div class="group"><h3>${esc(this._t("preset"))}</h3><div class="fields">${this._field(this._t("preset"), "offline_image", c.offline_image || "ender3v3", "select", presetOptions)}</div><div class="preset-choices">${presetChoices}</div>${c.offline_image === "custom" ? `${this._field(this._t("uploadSvg"), "offline_svg", "", "file")}${this._field(this._t("customSvg"), "offline_svg", c.offline_svg || "", "textarea")}${this._uploadError ? `<div class="help">${esc(this._uploadError)}</div>` : ""}` : ""}<div class="help">${esc(this._t("svgHelp"))}</div></div>`;
      if (this._kind === "mini") {
        html += `<div class="group"><h3>${esc(this._t("model"))} / ${esc(this._t("progress"))}</h3><div class="fields">${this._field(this._t("modelEntity"), "model_entity", c.model_entity || "", "entity")}${this._field(this._t("layerEntity"), "layer_entity", c.layer_entity || "", "entity")}${this._field(this._t("totalLayersEntity"), "total_layers_entity", c.total_layers_entity || "", "entity")}${this._field(this._t("progressEntity"), "progress_entity", c.progress_entity || "", "entity")}${this._field(this._t("cameraEntity"), "camera_entity", c.camera_entity || "", "entity")}</div><div class="fields">${this._field(this._t("showCamera"), "show_camera", c.show_camera !== false, "checkbox")}${this._field(this._t("showModel"), "show_model", c.show_model !== false, "checkbox")}${this._field(this._t("showLayer"), "show_layer", c.show_layer !== false, "checkbox")}${this._field(this._t("showProgress"), "show_progress", c.show_progress !== false, "checkbox")}</div></div>`;
      } else {
        html += `<div class="group"><h3>${esc(this._t("sections"))}</h3><div class="help">${esc(this._t("sectionHelp"))}</div><div class="section-list">${(c.sections || []).map((section, index) => this._renderSectionEditor(section, index)).join("")}</div><button class="btn primary" data-editor-action="add-section">+ ${esc(this._t("addSection"))}</button></div>`;
      }
      html += `</div>`;
      this.shadowRoot.innerHTML = html;
      this._renderPickers();
    }
    _renderSectionEditor(section, index) {
      const s = section || {};
      const typeOptions = SECTION_TYPES.map((type) => ({value:type,label:this._t(type in I18N.en ? type : "custom")}));
      let html = `<div class="section-editor"><div class="section-head"><strong>${esc(s.title || this._t(s.type in I18N.en ? s.type : "section"))}</strong><div class="row-actions"><button class="btn" data-editor-action="up" data-index="${index}" title="${esc(this._t("moveUp"))}">↑</button><button class="btn" data-editor-action="down" data-index="${index}" title="${esc(this._t("moveDown"))}">↓</button><button class="btn" data-editor-action="remove-section" data-index="${index}">${esc(this._t("remove"))}</button></div></div><div class="fields">${this._field(this._t("type"), `sections.${index}.type`, s.type || "custom", "select", typeOptions)}${this._field(this._t("title"), `sections.${index}.title`, s.title || "")}${this._field(this._t("enabled"), `sections.${index}.enabled`, s.enabled !== false, "checkbox")}${this._field(this._t("fullWidth"), `sections.${index}.wide`, s.wide === undefined ? ["cameras", "controls", "todo"].includes(s.type) : s.wide === true, "checkbox")}</div>`;
      if (s.type === "todo") html += this._field(this._t("todoEntity"), `sections.${index}.entity`, s.entity || "", "entity");
      if (s.type === "energy") html += `<div class="fields">${this._field(this._t("entity") + " (kWh)", `sections.${index}.energy_entity`, s.energy_entity || "", "entity")}${this._field(this._t("price"), `sections.${index}.price_per_kwh`, s.price_per_kwh ?? "", "number")}${this._field(this._t("currency"), `sections.${index}.currency`, s.currency || "EUR")}</div>`;
      if (s.type === "spoolman") html += this._field(this._t("spoolmanUrl"), `sections.${index}.url`, s.url || "", "url");
      if (s.type !== "todo") {
        html += `<div class="item-list">${(s.items || []).map((item, itemIndex) => this._renderItemEditor(s, item, index, itemIndex)).join("")}</div><button class="btn" data-editor-action="add-item" data-index="${index}">+ ${esc(this._t("addItem"))}</button>`;
      }
      html += `</div>`;
      return html;
    }
    _renderItemEditor(section, item, sectionIndex, itemIndex) {
      const prefix = `sections.${sectionIndex}.items.${itemIndex}`;
      const itemData = item || {};
      let html = `<div class="item-editor"><div class="section-head"><span class="item-title">${esc(itemData.label || itemData.entity || `${this._t("entity")} ${itemIndex + 1}`)}</span><button class="btn" data-editor-action="remove-item" data-index="${sectionIndex}" data-item="${itemIndex}">${esc(this._t("remove"))}</button></div><div class="fields">${this._field(this._t("label"), `${prefix}.label`, itemData.label || "")}${this._field(this._t("entity"), `${prefix}.entity`, itemData.entity || "", "entity")}${this._field(this._t("enabled"), `${prefix}.enabled`, itemData.enabled !== false, "checkbox")}`;
      if (["cameras"].includes(section.type)) {
        // Camera rows are intentionally just a label and camera entity.
      } else if (section.type === "controls") {
        const actionOptions = [{value:"toggle",label:this._t("toggle")},{value:"service",label:this._t("service")},{value:"preset",label:this._t("printerCommand")},{value:"url",label:this._t("url")}];
        html += `${this._field(this._t("action"), `${prefix}.action`, itemData.action || "toggle", "select", actionOptions)}${this._field(this._t("icon"), `${prefix}.icon`, itemData.icon || "")}`;
        if (itemData.action === "service" || itemData.action === "preset") {
          if (itemData.action === "preset") html += this._field(this._t("command"), `${prefix}.command`, itemData.command || "pause", "select", [{value:"pause",label:this._t("pause")},{value:"resume",label:this._t("resume")},{value:"cancel",label:this._t("cancel")},{value:"emergency",label:this._t("emergency")}]);
          html += `${this._field(this._t("serviceName"), `${prefix}.service`, itemData.service || "")}${this._field(this._t("serviceData"), `${prefix}.service_data`, itemData.service_data || "")}`;
        }
        if (itemData.action === "url") html += this._field(this._t("url"), `${prefix}.url`, itemData.url || "", "url");
        html += this._field(this._t("dangerous"), `${prefix}.dangerous`, itemData.dangerous === true, "checkbox") + this._field(this._t("confirmBefore"), `${prefix}.confirm`, itemData.confirm === true, "checkbox");
      } else {
        html += `${this._field(this._t("attribute"), `${prefix}.attribute`, itemData.attribute || "")}${this._field(this._t("unit"), `${prefix}.unit`, itemData.unit || "")}`;
      }
      html += `</div></div>`;
      return html;
    }
    _renderPickers() {
      if (!this._hass) return;
      this.shadowRoot.querySelectorAll(".entity-host").forEach((host) => {
        if (host.firstElementChild) return;
        const picker = document.createElement("ha-entity-picker");
        picker.hass = this._hass;
        picker.value = host.dataset.value || "";
        picker.allowCustomEntity = true;
        picker.addEventListener("value-changed", (event) => {
          const path = host.dataset.pickerPath;
          this._setPath(path, event.detail?.value ?? picker.value);
          this._fireChanged();
        });
        host.appendChild(picker);
      });
      this.shadowRoot.querySelectorAll("ha-entity-picker").forEach((picker) => { picker.hass = this._hass; });
    }
    _setPath(path, value) {
      if (!path) return;
      const parts = path.split(".");
      let target = this._config;
      for (let i = 0; i < parts.length - 1; i += 1) {
        const key = /^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i];
        if (target[key] === undefined || target[key] === null) target[key] = /^\d+$/.test(parts[i + 1]) ? [] : {};
        target = target[key];
      }
      const final = /^\d+$/.test(parts[parts.length - 1]) ? Number(parts[parts.length - 1]) : parts[parts.length - 1];
      target[final] = value;
    }
    _fileChanged(event) {
      const target = event.composedPath().find((node) => node?.dataset?.filePath);
      const file = target?.files?.[0];
      if (!target || !file) return;
      if (!/\.svg$/i.test(file.name) || file.size > 512 * 1024) {
        this._uploadError = this._t("invalidSvg");
        this._render();
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const svg = sanitizeSvg(String(reader.result || ""));
        if (!svg) {
          this._uploadError = this._t("invalidSvg");
          this._render();
          return;
        }
        this._uploadError = "";
        this._setPath(target.dataset.filePath, svg);
        this._fireChanged();
        this._render();
      };
      reader.onerror = () => { this._uploadError = this._t("invalidSvg"); this._render(); };
      reader.readAsText(file);
    }
    _fieldChanged(event) {
      const target = event.composedPath().find((node) => node?.dataset?.path);
      if (!target) return;
      const path = target.dataset.path;
      let value;
      if (target.type === "checkbox") value = target.checked;
      else if (target.type === "number") value = target.value === "" ? "" : Number(target.value);
      else value = target.value;
      this._setPath(path, value);
      if (path === "language") { this._lang = this._language(); this._render(); }
      else if (path === "offline_image" || /\.type$/.test(path) || /\.action$/.test(path)) this._render();
      this._fireChanged();
    }
    _buttonClicked(event) {
      const button = event.composedPath().find((node) => node?.dataset?.editorAction);
      if (!button) return;
      const action = button.dataset.editorAction;
      const index = Number(button.dataset.index);
      if (action === "preset") { this._config.offline_image = button.dataset.value; this._render(); this._fireChanged(); return; }
      if (action === "add-section") {
        const sections = this._config.sections || (this._config.sections = clone(DEFAULT_SECTIONS));
        sections.push({ id:slug(), type:"custom", title:"", enabled:true, items:[] });
      } else if (action === "remove-section") this._config.sections.splice(index, 1);
      else if (action === "up" && index > 0) [this._config.sections[index - 1], this._config.sections[index]] = [this._config.sections[index], this._config.sections[index - 1]];
      else if (action === "down" && index < this._config.sections.length - 1) [this._config.sections[index + 1], this._config.sections[index]] = [this._config.sections[index], this._config.sections[index + 1]];
      else if (action === "add-item") {
        const section = this._config.sections[index];
        section.items = section.items || [];
        section.items.push(section.type === "controls" ? { label:this._t("newButton"), action:"toggle", entity:"" } : { label:this._t("newItem"), entity:"" });
      } else if (action === "remove-item") this._config.sections[index].items.splice(Number(button.dataset.item), 1);
      else return;
      this._render();
      this._fireChanged();
    }
    _fireChanged() {
      this.dispatchEvent(new CustomEvent("config-changed", { detail:{ config:clone(this._config) }, bubbles:true, composed:true }));
    }
  }

  if (!customElements.get("ha-3dprinter-card")) customElements.define("ha-3dprinter-card", Ha3dprinterCard);
  if (!customElements.get("ha-3dprinter-card-mini")) customElements.define("ha-3dprinter-card-mini", Ha3dprinterCardMini);
  if (!customElements.get("ha-3dprinter-card-editor")) customElements.define("ha-3dprinter-card-editor", Ha3dprinterCardEditor);

  window.customCards = window.customCards || [];
  window.customCards.push({ type:"ha-3dprinter-card", name:"HA 3Dprinter Card", description:"Configurable 3D printer dashboard and control card", preview:true,  });
  window.customCards.push({ type:"ha-3dprinter-card-mini", name:"HA 3Dprinter Card Mini", description:"Compact 3D printer status card", preview:true,  });
  console.info(`%c HA 3Dprinter Card %c ${VERSION} `, "background:#168f79;color:white;font-weight:bold;padding:2px 5px", "background:transparent;color:var(--primary-text-color);font-weight:bold");
})();
