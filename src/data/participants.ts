export interface Participant {
  id: string;
  dni: string;
  nombre: string;
  territorio: 'Antilla' | 'Pomacanchi' | 'Accha' | 'Colcha' | 'Omacha' | 'Ccapi' | 'Huanoquite' | 'Equipo CEDEP AYLLU';
  comunidad: string;
  cargo: string;
  compromiso: string;
  mensajeComunal: string;
  propositoAccion: string;
  ejeTematico: 'Cosecha de Agua con Calamina' | 'Qochas y Reservorios' | 'Reforestación con Nativas' | 'Plantas Medicinales' | 'Tejidos y Artesanías' | 'Manejo de Bofedales' | 'Educación y Concientización' | 'Sistematización y Asistencia Técnica';
  genero: 'F' | 'M';
  colorAcento: string;
  bgPatron: 'terrazas' | 'laguna' | 'semillas' | 'chacra' | 'cordillera' | 'textil';
}

export interface TerritorioInfo {
  nombre: 'Antilla' | 'Pomacanchi' | 'Accha' | 'Colcha' | 'Omacha' | 'Ccapi' | 'Huanoquite' | 'Equipo CEDEP AYLLU';
  region: string;
  descripcion: string;
  icono: string;
  color: string;
  bgGradiente: string;
  elementoSimbolo: string;
}

export const TERRITORIOS: TerritorioInfo[] = [
  {
    nombre: 'Antilla',
    region: 'Curahuasi - Apurímac / Cusco',
    descripcion: 'Población organizada en la cosecha de agua de lluvia con techos de calamina y reforestación de alisos.',
    icono: 'corn',
    color: '#D97706',
    bgGradiente: 'from-amber-900 via-amber-950 to-stone-950',
    elementoSimbolo: 'Cosecha de Agua con Calamina y Alisos'
  },
  {
    nombre: 'Pomacanchi',
    region: 'Acomayo - Cusco',
    descripcion: 'Líderes que impulsan qochas rústicas familiares, reservorios y crianza productiva con agua cosechada.',
    icono: 'waves',
    color: '#0284C7',
    bgGradiente: 'from-sky-900 via-sky-950 to-stone-950',
    elementoSimbolo: 'Qochas Rústicas y Galpones Familiares'
  },
  {
    nombre: 'Accha',
    region: 'Paruro - Cusco',
    descripcion: 'Valles y quebradas dedicadas a biohuertos de plantas medicinales, geomembranas y valores comunales.',
    icono: 'mountain',
    color: '#059669',
    bgGradiente: 'from-emerald-900 via-emerald-950 to-stone-950',
    elementoSimbolo: 'Plantas Medicinales y Geomembranas'
  },
  {
    nombre: 'Colcha',
    region: 'Paruro - Cusco',
    descripcion: 'Siembra y cosecha de agua, conducción de manantes a reservorios e impulso a la producción de paltos.',
    icono: 'trees',
    color: '#16A34A',
    bgGradiente: 'from-green-900 via-green-950 to-stone-950',
    elementoSimbolo: 'Puquios, Reservorios y Paltos'
  },
  {
    nombre: 'Omacha',
    region: 'Paruro - Cusco',
    descripcion: 'Gran movilización de lideresas y líderes para reforestación con 10,000 plantas, reservorios y tejidos.',
    icono: 'sun',
    color: '#EA580C',
    bgGradiente: 'from-orange-900 via-orange-950 to-stone-950',
    elementoSimbolo: 'Reforestación de 10,000 Queñuales y Tejidos'
  },
  {
    nombre: 'Ccapi',
    region: 'Paruro - Cusco',
    descripcion: 'Recuperación de bofedales, mantenimiento de amunas y zanjas, y declaratoria de reserva hídrica.',
    icono: 'sprout',
    color: '#7C3AED',
    bgGradiente: 'from-purple-900 via-purple-950 to-stone-950',
    elementoSimbolo: 'Amunas, Bofedales y Reserva Hídrica'
  },
  {
    nombre: 'Huanoquite',
    region: 'Paruro - Cusco',
    descripcion: 'Acondicionamiento y protección de manantes, educación ambiental en escuelas y programas radiales.',
    icono: 'droplet',
    color: '#2563EB',
    bgGradiente: 'from-blue-900 via-blue-950 to-stone-950',
    elementoSimbolo: 'Protección de Manantes y Concientización'
  },
  {
    nombre: 'Equipo CEDEP AYLLU',
    region: 'Acompañamiento, Sistematización y Asistencia Técnica',
    descripcion: 'Monitoreo de qochas (Osccollopata y Huillcuyo), sistematización escrita, guía de plantas medicinales y documental.',
    icono: 'users',
    color: '#B91C1C',
    bgGradiente: 'from-rose-950 via-red-950 to-stone-950',
    elementoSimbolo: 'Monitoreo de Qochas y Sistematización'
  }
];

export const PARTICIPANTES: Participant[] = [
  // 1. ANTILLA (3)
  {
    id: 'ant-01',
    dni: '41972268',
    nombre: 'Angélica Meza Barazorda',
    territorio: 'Antilla',
    comunidad: 'Antilla Central - Curahuasi',
    cargo: 'Lideresa de Concientización Social',
    compromiso: 'Seguir trabajando en el tema social para concientizar a la gente en Antilla e implementar la cosecha de agua de lluvia mediante techos de calamina.',
    mensajeComunal: 'El agua es fuente de vida para nuestras familias, cuidémosla y cosechémosla con responsabilidad comunal.',
    propositoAccion: 'Sensibilización social y cosecha de lluvia con techos de calamina.',
    ejeTematico: 'Cosecha de Agua con Calamina',
    genero: 'F',
    colorAcento: '#D97706',
    bgPatron: 'laguna'
  },
  {
    id: 'ant-02',
    dni: '31035215',
    nombre: 'Walter Borda Huachaca',
    territorio: 'Antilla',
    comunidad: 'Sector Antilla',
    cargo: 'Promotor Comunal de Cosecha de Agua',
    compromiso: 'Implementar en mi sector un sistema familiar de cosecha de agua de lluvia mediante canaletas en el techo de calamina para asegurar agua limpia.',
    mensajeComunal: 'Aprovechar cada gota de lluvia en nuestros techos es asegurar agua limpia para nuestros hogares.',
    propositoAccion: 'Instalación de canaletas y tanques de almacenamiento familiar.',
    ejeTematico: 'Cosecha de Agua con Calamina',
    genero: 'M',
    colorAcento: '#0284C7',
    bgPatron: 'terrazas'
  },
  {
    id: 'ant-03',
    dni: '23953901',
    nombre: 'Germán Borda Huachaca',
    territorio: 'Antilla',
    comunidad: 'Comunidad de Antilla',
    cargo: 'Coordinador de Forestación Comunal',
    compromiso: 'Coordinar con la comunidad para realizar jornadas de forestación en el mes de diciembre, aumentando la plantación de especies nativas autóctonas (como alisos).',
    mensajeComunal: 'Plantar árboles nativos es sembrar lluvia, proteger el suelo y garantizar el futuro de nuestra comunidad.',
    propositoAccion: 'Jornadas de forestación comunal con especies autóctonas como alisos.',
    ejeTematico: 'Reforestación con Nativas',
    genero: 'M',
    colorAcento: '#16A34A',
    bgPatron: 'chacra'
  },

  // 2. POMACANCHI (3)
  {
    id: 'pom-01',
    dni: '42344367',
    nombre: 'Gustavo Apaza Qquecaño',
    territorio: 'Pomacanchi',
    comunidad: 'Sector Pomacanchi - Acomayo',
    cargo: 'Promotor de Qochas Familiares',
    compromiso: 'Hablar con mi familia sobre la importancia del agua y su escasez, e implementar una pequeña represa (qocha rústica familiar) en mi parcela.',
    mensajeComunal: 'Dialogar en familia y construir pequeñas qochas rústicas nos protege de las épocas de sequía.',
    propositoAccion: 'Construcción de represa rústica familiar en parcela agrícola.',
    ejeTematico: 'Qochas y Reservorios',
    genero: 'M',
    colorAcento: '#0284C7',
    bgPatron: 'laguna'
  },
  {
    id: 'pom-02',
    dni: '24291329',
    nombre: 'Cirilo Quispe Huamani',
    territorio: 'Pomacanchi',
    comunidad: 'Comunidad Campesina de Pomacanchi',
    cargo: 'Productor Agropecuario y Ceramista',
    compromiso: 'Instalar cosecha de agua de lluvia con calamina para abastecer mi galpón de cuyes y fortalecer la producción artesanal de cerámica.',
    mensajeComunal: 'Cosechar agua limpia impulsa la crianza de nuestros animales y fortalece la producción artesanal.',
    propositoAccion: 'Cosecha de agua en galpón y desarrollo de cerámica tradicional.',
    ejeTematico: 'Cosecha de Agua con Calamina',
    genero: 'M',
    colorAcento: '#EA580C',
    bgPatron: 'semillas'
  },
  {
    id: 'pom-03',
    dni: '40123052',
    nombre: 'Valerio Huamani',
    territorio: 'Pomacanchi',
    comunidad: 'Sector Pomacanchi',
    cargo: 'Constructor de Reservorios',
    compromiso: 'Concluir y ampliar los trabajos de implementación de mi reservorio de agua familiar para riego durante la época de estiaje.',
    mensajeComunal: 'Ampliar nuestros reservorios familiares es asegurar el riego permanente de nuestros cultivos.',
    propositoAccion: 'Culminación y ampliación del reservorio de agua familiar.',
    ejeTematico: 'Qochas y Reservorios',
    genero: 'M',
    colorAcento: '#059669',
    bgPatron: 'terrazas'
  },

  // 3. ACCHA (5)
  {
    id: 'acc-01',
    dni: '25063204',
    nombre: 'Paulina H. Méndez Campana',
    territorio: 'Accha',
    comunidad: 'Sector Accha - Paruro',
    cargo: 'Lideresa de Cosecha y Geomembrana',
    compromiso: 'Concientizar a mi familia sobre el recurso hídrico e implementar un sistema de cosecha de agua con techos de calamina y almacenamiento seguro con geomembrana.',
    mensajeComunal: 'La geomembrana y los techos de calamina nos permiten almacenar agua de calidad para toda la temporada seca.',
    propositoAccion: 'Cosecha pluvial y almacenamiento seguro con geomembrana.',
    ejeTematico: 'Cosecha de Agua con Calamina',
    genero: 'F',
    colorAcento: '#D97706',
    bgPatron: 'laguna'
  },
  {
    id: 'acc-02',
    dni: '25063796',
    nombre: 'Martina Tairo Hancco',
    territorio: 'Accha',
    comunidad: 'Comunidad de Accha',
    cargo: 'Promotora de Valores Comunales',
    compromiso: 'Fomentar el valor y la práctica de la puntualidad y la responsabilidad en mi entorno familiar y con mis hijos para ser un ejemplo en la comunidad.',
    mensajeComunal: 'La puntualidad, el respeto y la responsabilidad en el hogar son la base para liderar con el ejemplo en la comunidad.',
    propositoAccion: 'Práctica de valores formativos en la familia y comunidad.',
    ejeTematico: 'Educación y Concientización',
    genero: 'F',
    colorAcento: '#7C3AED',
    bgPatron: 'textil'
  },
  {
    id: 'acc-03',
    dni: '40611438',
    nombre: 'Dorotea Hancco Huillca',
    territorio: 'Accha',
    comunidad: 'Comunidad de Accha',
    cargo: 'Promotora de Saberes de la Pasantía',
    compromiso: 'Compartir los aprendizajes adquiridos durante la pasantía y sensibilizar tanto a mi familia como a toda la comunidad sobre el cuidado y respeto al agua.',
    mensajeComunal: 'Los conocimientos adquiridos en la pasantía cobran verdadero valor cuando se comparten con toda la comunidad.',
    propositoAccion: 'Sensibilización comunitaria sobre el cuidado y respeto al agua.',
    ejeTematico: 'Educación y Concientización',
    genero: 'F',
    colorAcento: '#16A34A',
    bgPatron: 'semillas'
  },
  {
    id: 'acc-04',
    dni: '40298369',
    nombre: 'Magali Peña Quintano',
    territorio: 'Accha',
    comunidad: 'Comunidad Campesina de Accha',
    cargo: 'Lideresa de Biohuertos Familiares',
    compromiso: 'Implementar un sistema de cosecha de agua de lluvia mediante techos de calamina (almacenando inicialmente en cilindros) para asegurar el riego de mi biohuerto familiar.',
    mensajeComunal: 'Un biohuerto familiar con riego pluvial bien aprovechado garantiza comida sana y fresca todo el año.',
    propositoAccion: 'Riego pluvial por cilindros para biohuerto orgánico familiar.',
    ejeTematico: 'Cosecha de Agua con Calamina',
    genero: 'F',
    colorAcento: '#059669',
    bgPatron: 'chacra'
  },
  {
    id: 'acc-05',
    dni: 'S/D',
    nombre: 'Mercedes Enriquez Rojas',
    territorio: 'Accha',
    comunidad: 'Comunidad de Accha',
    cargo: 'Promotora de Medicina Tradicional',
    compromiso: 'Promover e implementar un biohuerto/proyecto comunitario de plantas medicinales nativas para la elaboración y empaque de filtrantes saludables.',
    mensajeComunal: 'Nuestras plantas medicinales autóctonas son salud natural y bienestar al alcance de todas las familias.',
    propositoAccion: 'Biohuerto comunitario y filtrantes de hierbas medicinales.',
    ejeTematico: 'Plantas Medicinales',
    genero: 'F',
    colorAcento: '#10B981',
    bgPatron: 'semillas'
  },

  // 4. COLCHA (2)
  {
    id: 'col-01',
    dni: '25063798',
    nombre: 'William Chirinos Farfán',
    territorio: 'Colcha',
    comunidad: 'Comunidad de Colcha - Paruro',
    cargo: 'Promotor Agroforestal de Frutales',
    compromiso: 'Sensibilizar a mi entorno, conducir el agua del puquio hacia un pequeño reservorio familiar e impulsar la plantación de paltos en parcelas tecnificadas.',
    mensajeComunal: 'Conducir el agua de los puquios hacia reservorios familiares hace posible cultivar frutales de alto valor.',
    propositoAccion: 'Conducción de manantiales y plantación de paltos.',
    ejeTematico: 'Qochas y Reservorios',
    genero: 'M',
    colorAcento: '#16A34A',
    bgPatron: 'chacra'
  },
  {
    id: 'col-02',
    dni: '41468707',
    nombre: 'Jorge Obando Ovalle',
    territorio: 'Colcha',
    comunidad: 'Sector Colcha',
    cargo: 'Líder Comunal de Siembra de Agua',
    compromiso: 'Sensibilizar a la población e implementar una qocha rústica a nivel familiar, promoviendo a su vez la siembra y cosecha de agua en toda la comunidad.',
    mensajeComunal: 'Sembrar agua con qochas rústicas familiares es la respuesta comunitaria frente al cambio climático.',
    propositoAccion: 'Qochas rústicas y siembra hídrica comunal.',
    ejeTematico: 'Qochas y Reservorios',
    genero: 'M',
    colorAcento: '#0284C7',
    bgPatron: 'laguna'
  },

  // 5. OMACHA (6)
  {
    id: 'oma-01',
    dni: '41606757',
    nombre: 'Jesús Molina',
    territorio: 'Omacha',
    comunidad: 'Comunidad de Omacha - Paruro',
    cargo: 'Promotor Comunitario de Pozas',
    compromiso: 'Implementar pozas pequeñas de retención hídrica a nivel comunal para aprovechar las escorrentías de lluvia en las partes altas.',
    mensajeComunal: 'Las pozas comunitarias permiten retener las lluvias y recargar los acuíferos de nuestras laderas.',
    propositoAccion: 'Implementación de pozas comunales de retención hídrica.',
    ejeTematico: 'Qochas y Reservorios',
    genero: 'M',
    colorAcento: '#0284C7',
    bgPatron: 'terrazas'
  },
  {
    id: 'oma-02',
    dni: '80144121',
    nombre: 'Rosa Cruz Mollinedo',
    territorio: 'Omacha',
    comunidad: 'Comunidad Campesina de Omacha',
    cargo: 'Lideresa de Infraestructura Comunal',
    compromiso: 'Apoyar activamente en la construcción del reservorio comunal e implementar a nivel familiar la cosecha de agua con techos de calamina.',
    mensajeComunal: 'El trabajo colectivo en el reservorio comunal y la cosecha en casa nos darán seguridad hídrica permanente.',
    propositoAccion: 'Apoyo activo al reservorio comunal y techos de calamina.',
    ejeTematico: 'Cosecha de Agua con Calamina',
    genero: 'F',
    colorAcento: '#D97706',
    bgPatron: 'laguna'
  },
  {
    id: 'oma-03',
    dni: '23960727',
    nombre: 'Cirila Papel Huamani',
    territorio: 'Omacha',
    comunidad: 'Comunidad de Omacha',
    cargo: 'Maestra Tejedora y Líder de Asamblea',
    compromiso: 'Brindar un informe de la pasantía ante la asamblea comunal e innovar en nuevos diseños y modelos de tejidos tradicionales andinos (chullos y mantas).',
    mensajeComunal: 'Nuestros tejidos tradicionales conservan la historia y el arte de nuestros pueblos con gran orgullo.',
    propositoAccion: 'Informe de pasantía y rescate de modelos de chullos tradicionales.',
    ejeTematico: 'Tejidos y Artesanías',
    genero: 'F',
    colorAcento: '#C026D3',
    bgPatron: 'textil'
  },
  {
    id: 'oma-04',
    dni: '25069658',
    nombre: 'Jesús Oruro Huamani',
    territorio: 'Omacha',
    comunidad: 'Sector Alto Omacha',
    cargo: 'Promotor de Reforestación Andina',
    compromiso: 'Hacer conocer a mi comunidad sobre el problema de la escasez de agua, y plantar 1,000 árboles nativos de chachacomo y queñual en las zonas de recarga.',
    mensajeComunal: 'Reforestar con mil queñuales y chachacomos revive nuestros manantes y protege las cabeceras de cuenca.',
    propositoAccion: 'Plantación de 1,000 árboles nativos en zonas de recarga.',
    ejeTematico: 'Reforestación con Nativas',
    genero: 'M',
    colorAcento: '#16A34A',
    bgPatron: 'cordillera'
  },
  {
    id: 'oma-05',
    dni: '80141756',
    nombre: 'Florencia Llamocca Quispe',
    territorio: 'Omacha',
    comunidad: 'Organización de Mujeres de Omacha',
    cargo: 'Lideresa de Movilización Femenina',
    compromiso: 'Movilizar a las mujeres de la organización para incentivar la construcción de reservorios, implementar la cosecha de agua de lluvia en casa y gestionar una campaña de reforestación comunal de hasta 10,000 plantones.',
    mensajeComunal: 'La fuerza organizada de las mujeres campesinas puede mover montañas y reforestar hasta diez mil árboles.',
    propositoAccion: 'Movilización comunal, reservorios y reforestación de 10,000 plantones.',
    ejeTematico: 'Reforestación con Nativas',
    genero: 'F',
    colorAcento: '#EA580C',
    bgPatron: 'semillas'
  },
  {
    id: 'oma-06',
    dni: 'S/D',
    nombre: 'Segundina Huaracallo',
    territorio: 'Omacha',
    comunidad: 'Sector Artesanal de Omacha',
    cargo: 'Coordinadora de Tejidos Tradicionales',
    compromiso: 'Promover la reactivación y producción de artesanías y tejidos típicos dentro de mi organización de mujeres para fortalecer la economía comunitaria.',
    mensajeComunal: 'La producción artesanal de tejidos brinda autonomía económica y fortalece la unión de las mujeres.',
    propositoAccion: 'Reactivación de artesanías y tejidos en la organización de mujeres.',
    ejeTematico: 'Tejidos y Artesanías',
    genero: 'F',
    colorAcento: '#E11D48',
    bgPatron: 'textil'
  },

  // 6. CCAPI (4)
  {
    id: 'cca-01',
    dni: 'S/D',
    nombre: 'Raúl León Huarancca',
    territorio: 'Ccapi',
    comunidad: 'Comunidad Campesina de Ccapi - Paruro',
    cargo: 'Especialista en Bofedales Altoandinos',
    compromiso: 'Demostrar con hechos el manejo de bofedales y ampliar las áreas de conservación y recuperación de bofedales en mi comunidad.',
    mensajeComunal: 'Los bofedales son esponjas vivas que retienen el agua; protegerlos con hechos es un deber de todos.',
    propositoAccion: 'Demostración práctica y ampliación de áreas de bofedales.',
    ejeTematico: 'Manejo de Bofedales',
    genero: 'M',
    colorAcento: '#059669',
    bgPatron: 'laguna'
  },
  {
    id: 'cca-02',
    dni: 'S/D',
    nombre: 'Jesús Chávez Merma',
    territorio: 'Ccapi',
    comunidad: 'Comunidad de Ccapi',
    cargo: 'Líder Social y Gestor Artesanal',
    compromiso: 'Socializar en asambleas y grupos comunales los conocimientos adquiridos en la pasantía, y apoyar el emprendimiento familiar de artesanía en cerámica de mi esposa tomando como modelo la experiencia de Pucará.',
    mensajeComunal: 'Compartir los aprendizajes del intercambio fortalece los emprendimientos familiares y comunales.',
    propositoAccion: 'Socialización comunal y apoyo al taller familiar de cerámica.',
    ejeTematico: 'Tejidos y Artesanías',
    genero: 'M',
    colorAcento: '#EA580C',
    bgPatron: 'semillas'
  },
  {
    id: 'cca-03',
    dni: '45979193',
    nombre: 'Alberto Qqueccaña Holguin',
    territorio: 'Ccapi',
    comunidad: 'Comunidad Campesina de Ccapi',
    cargo: 'Custodio de Amunas y Zanjas Ancestrales',
    compromiso: 'Realizar el mantenimiento y cuidado de las zanjas de infiltración y amunas comunitarias, e impulsar formalmente el reconocimiento de la parte alta comunal como zona de reserva.',
    mensajeComunal: 'El mantenimiento regular de amunas y zanjas es el verdadero secreto para que las fuentes de agua nunca se sequen.',
    propositoAccion: 'Cuidado de amunas y declaratoria de reserva comunal alta.',
    ejeTematico: 'Qochas y Reservorios',
    genero: 'M',
    colorAcento: '#0284C7',
    bgPatron: 'terrazas'
  },
  {
    id: 'cca-04',
    dni: '24002165',
    nombre: 'Victoria Ccasani Layme',
    territorio: 'Ccapi',
    comunidad: 'Organización de Mujeres de Ccapi',
    cargo: 'Lideresa de Alianzas y Reserva Hídrica',
    compromiso: 'Replicar las experiencias aprendidas con mi familia y con las organizaciones de mujeres de mi comunidad; coordinar con las instituciones aliadas (como DESCOSUR) para visitas de intercambio, e impulsar la declaratoria de la parte alta de la comunidad como zona de reserva hídrica.',
    mensajeComunal: 'Declarar la parte alta como reserva hídrica asegura el agua limpia para las presentes y futuras generaciones.',
    propositoAccion: 'Alianzas interinstitucionales y declaratoria de reserva hídrica.',
    ejeTematico: 'Educación y Concientización',
    genero: 'F',
    colorAcento: '#7C3AED',
    bgPatron: 'cordillera'
  },

  // 7. HUANOQUITE (3)
  {
    id: 'hua-01',
    dni: '80046410',
    nombre: 'Bernardino Choque Ramírez',
    territorio: 'Huanoquite',
    comunidad: 'Comunidad de Huanoquite - Paruro',
    cargo: 'Protector de Manantes y Puquios',
    compromiso: 'Realizar trabajos de limpieza, acondicionamiento y protección del manante ubicado cerca de mi vivienda para conservar su caudal limpio.',
    mensajeComunal: 'Acondicionar y limpiar los manantes cercanos garantiza agua cristalina y saludable para nuestros hogares.',
    propositoAccion: 'Limpieza y protección permanente de manantes locales.',
    ejeTematico: 'Qochas y Reservorios',
    genero: 'M',
    colorAcento: '#2563EB',
    bgPatron: 'laguna'
  },
  {
    id: 'hua-02',
    dni: '61829861',
    nombre: 'Hugo Quispe Chumbislla',
    territorio: 'Huanoquite',
    comunidad: 'Colegio Comunal de Huanoquite',
    cargo: 'Líder Estudiantil y Juvenil',
    compromiso: 'Sensibilizar a mi familia y compañeros de colegio sobre el cuidado del agua, mejorar la protección del manante familiar e implementar un reservorio en mi casa.',
    mensajeComunal: 'Como jóvenes estudiantes tenemos la misión de educar a nuestros compañeros y cuidar el agua en el hogar.',
    propositoAccion: 'Educación ambiental estudiantil y reservorio familiar.',
    ejeTematico: 'Educación y Concientización',
    genero: 'M',
    colorAcento: '#059669',
    bgPatron: 'chacra'
  },
  {
    id: 'hua-03',
    dni: '44739463',
    nombre: 'Evy Katty Quispe Chambi',
    territorio: 'Huanoquite',
    comunidad: 'Red Educativa de Huanoquite',
    cargo: 'Docente y Comunicadora Radial',
    compromiso: 'Concientizar y educar a los estudiantes y a la comunidad sobre el valor del agua a través del programa radial y las aulas, compartiendo lo aprendido sobre las experiencias de Santiago de Pupuja y la Reserva de Aguada Blanca.',
    mensajeComunal: 'A través de la radio y la escuela sembramos la semilla del amor y respeto por el agua en toda la comunidad.',
    propositoAccion: 'Educación ambiental en aulas y programa radial comunal.',
    ejeTematico: 'Educación y Concientización',
    genero: 'F',
    colorAcento: '#F59E0B',
    bgPatron: 'textil'
  },

  // 8. EQUIPO CEDEP AYLLU (4)
  {
    id: 'ced-01',
    dni: '43698532',
    nombre: 'Richard Nina Cusiyupanqui',
    territorio: 'Equipo CEDEP AYLLU',
    comunidad: 'Equipo de Asistencia Técnica y Acompañamiento',
    cargo: 'Especialista en Monitoreo de Qochas',
    compromiso: 'Brindar asistencia técnica permanente a los territorios, hacer seguimiento al cumplimiento de los compromisos e implementar el monitoreo de las qochas (especialmente Osccollopata y Huillcuyo).',
    mensajeComunal: 'El monitoreo constante de las qochas y el acompañamiento técnico garantizan que cada compromiso se cumpla en el campo.',
    propositoAccion: 'Asistencia técnica y monitoreo hídrico de qochas.',
    ejeTematico: 'Sistematización y Asistencia Técnica',
    genero: 'M',
    colorAcento: '#B91C1C',
    bgPatron: 'laguna'
  },
  {
    id: 'ced-02',
    dni: '74546495',
    nombre: 'Luis Fernando Lupinta',
    territorio: 'Equipo CEDEP AYLLU',
    comunidad: 'Área de Sistematización y Formación',
    cargo: 'Coordinador de Sistematización',
    compromiso: 'Liderar la sistematización general de la pasantía y coordinar con DESCO para la elaboración de una publicación/documento escrito que recoja testimonios, entrevistas y aprendizajes.',
    mensajeComunal: 'Escribir y sistematizar nuestras memorias vivas asegura que los saberes campesinos no se pierdan en el tiempo.',
    propositoAccion: 'Sistematización general y publicación con DESCO.',
    ejeTematico: 'Sistematización y Asistencia Técnica',
    genero: 'M',
    colorAcento: '#BE123C',
    bgPatron: 'textil'
  },
  {
    id: 'ced-03',
    dni: '73011231',
    nombre: 'Kelvin Robby Alvarez Cuno',
    territorio: 'Equipo CEDEP AYLLU',
    comunidad: 'Innovación Tecnológica y Saberes Tradicionales',
    cargo: 'Digitalizador y Redactor Técnico',
    compromiso: 'Digitalizar todos los materiales y memorias físicas generadas en el proceso, armar la red de comunicación por WhatsApp, y redactar junto al equipo el libro digital colorido sobre plantas medicinales nativas para su libre difusión comunitaria.',
    mensajeComunal: 'Poner la tecnología y la digitalización al servicio del conocimiento tradicional de plantas medicinales beneficia a todos.',
    propositoAccion: 'Digitalización técnica, redes de comunicación y guía de plantas medicinales.',
    ejeTematico: 'Plantas Medicinales',
    genero: 'M',
    colorAcento: '#0EA5E9',
    bgPatron: 'semillas'
  },
  {
    id: 'ced-04',
    dni: 'S/D',
    nombre: 'Gloria Velasco',
    territorio: 'Equipo CEDEP AYLLU',
    comunidad: 'Coordinación Metodológica y Comunicación',
    cargo: 'Coordinadora de Seguimiento y Documental',
    compromiso: 'Crear el grupo de seguimiento de la pasantía, difundir los acuerdos, acompañar los procesos territoriales y producir un documental que registre el proceso bajo la metodología de ver, juzgar y actuar.',
    mensajeComunal: 'Ver la realidad, juzgar con sabiduría y actuar unidos es la ruta para transformar nuestras comunidades.',
    propositoAccion: 'Seguimiento participativo y realización de documental comunal.',
    ejeTematico: 'Sistematización y Asistencia Técnica',
    genero: 'F',
    colorAcento: '#9333EA',
    bgPatron: 'cordillera'
  }
];
