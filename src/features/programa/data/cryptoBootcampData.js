export const CRYPTO_BOOTCAMP = [
  { id:"crypto-01", titulo:"Introducción", lessons:4, sourcePath:"/crypto/learn/introduction" },
  { id:"crypto-02", titulo:"Bitcoin desde cero", lessons:5, sourcePath:"/crypto/learn/bitcoin-for-beginners" },
  { id:"crypto-03", titulo:"Cómo funciona la red Bitcoin", lessons:4, sourcePath:"/crypto/learn/bitcoin-network-for-beginners" },
  { id:"crypto-04", titulo:"Hashing y seguridad criptográfica", lessons:4, sourcePath:"/crypto/learn/hashing-for-beginners" },
  { id:"crypto-05", titulo:"Minería de Bitcoin y consenso", lessons:4, sourcePath:"/crypto/learn/bitcoin-mining-for-beginners" },
  { id:"crypto-06", titulo:"Fundamentos de blockchain", lessons:2, sourcePath:"/crypto/learn/blockchain-for-beginners" },
  { id:"crypto-07", titulo:"Wallets, llaves y autocustodia", lessons:8, sourcePath:"/crypto/learn/bitcoin-wallets-for-beginners" },
  { id:"crypto-08", titulo:"Firmas digitales y prueba de propiedad", lessons:7, sourcePath:"/crypto/learn/digital-signatures-for-beginners" },
  { id:"crypto-09", titulo:"Altcoins, narrativas y ciclos de mercado", lessons:4, sourcePath:"/crypto/learn/altcoins-for-beginners" },
  { id:"crypto-10", titulo:"Exchanges cripto y ejecución segura", lessons:12, sourcePath:"/crypto/learn/crypto-exchanges-for-beginners" },
  { id:"crypto-11", titulo:"Estafas cripto: señales de alerta y defensa", lessons:4, sourcePath:"/crypto/learn/crypto-scams-for-beginners" },
  { id:"crypto-12", titulo:"Ethereum, smart contracts y gas", lessons:7, sourcePath:"/crypto/learn/ethereum-for-beginners" },
  { id:"crypto-13", titulo:"Trading cripto: mercado, riesgo y estrategia", lessons:8, sourcePath:"/crypto/learn/crypto-trading-for-beginners" },
  { id:"crypto-14", titulo:"NFTs, utilidad y economía digital", lessons:9, sourcePath:"/crypto/learn/nfts-for-beginners" },
  { id:"crypto-15", titulo:"ETFs cripto y acceso institucional", lessons:5, sourcePath:"/crypto/learn/crypto-etfs-for-beginners" },
  { id:"crypto-16", titulo:"Análisis on-chain para tomar decisiones", lessons:12, sourcePath:"/crypto/learn/on-chain-analysis-for-beginners" },
].map((mod) => {
  const clasesModulo1 = [
    {
      id:"crypto-01-1",
      titulo:"¿Qué es una criptomoneda?",
      resumen:"Una criptomoneda es un nuevo tipo de dinero digital que funciona sin bancos ni gobiernos, usando criptografía y software descentralizado. En esta lección entiendes qué las hace únicas y por qué están cambiando el sistema financiero.",
      estado:"Contenido completo",
      sourceUrl:"https://www.babypips.com/crypto/learn/what-is-cryptocurrency",
      contenido:[
        {
          titulo:"¿Qué es una criptomoneda?",
          texto:"Una criptomoneda (o \"cripto\") es un término general para un nuevo tipo de \"dinero digital\" que depende de una combinación de tecnologías que le permiten existir fuera del control de autoridades centrales como gobiernos y bancos.\n\nLas criptomonedas se han vuelto extremadamente populares en los últimos años. Probablemente has visto comerciales de televisión sobre criptomonedas como \"la próxima gran cosa\", y quizás incluso a tu actor o atleta favorito promoviéndolas. Pero ¿qué son realmente? ¿En qué se diferencian de las monedas tradicionales?",
        },
        {
          titulo:"Las criptomonedas son digitales",
          texto:"Las criptomonedas no tienen forma física. No hay billetes de papel ni monedas metálicas. Son completamente digitales, lo que significa que literalmente son solo líneas de código de computadora. Todo se hace desde teléfonos y computadoras.",
          imagen:{ src:"/bootcamp/mod1-lec1/bitcoin-digital-currency.png", alt:"Bitcoin como moneda digital" },
        },
        {
          titulo:"Las criptomonedas son sin fronteras",
          texto:"Sin importar dónde vivas o quién seas, puedes enviarlas casi instantáneamente a otras personas en cualquier parte del mundo, sin preocuparte por distancias geográficas ni fronteras nacionales. Todo lo que necesitas es un dispositivo, como un teléfono o computadora, conectado a internet.",
        },
        {
          titulo:"Las criptomonedas no requieren permiso",
          texto:"Cualquier persona puede enviar y recibir criptomonedas. No necesitas registrar una cuenta ni llenar una solicitud. Ni siquiera necesitas dar tu nombre.\n\nEn lugar de nombres y números de cuenta, todo lo que necesitas proporcionar es una cadena de letras y números generada por computadora conocida como una \"dirección\". Esta dirección no está inherentemente vinculada a ninguna de tu información personal, por lo que teóricamente puedes enviar criptomonedas a otras personas sin que nunca conozcan tu identidad real.",
        },
        {
          titulo:"Las criptomonedas están descentralizadas",
          texto:"A diferencia de las monedas tradicionales (conocidas como monedas \"fiat\"), como el dólar estadounidense, las criptomonedas no están conectadas a ningún gobierno ni banco central.\n\nEl dólar estadounidense es emitido y controlado por la Reserva Federal (\"Fed\"), el euro por el Banco Central Europeo (BCE), y el yen japonés por el Banco de Japón (BOJ). Las criptomonedas no tienen este tipo de control central. Esta característica definitoria se conoce como descentralización.\n\nSi ningún banco central o gobierno emite criptomonedas, ¿entonces quién las crea? Las unidades se generan según reglas predeterminadas escritas en código, ejecutadas por software. Obviamente software que un humano creó.",
          imagen:{ src:"/bootcamp/mod1-lec1/bitcoin-decentralized-currency.png", alt:"Bitcoin como moneda descentralizada" },
        },
        {
          titulo:"Suministro: finito vs infinito",
          texto:"Dependiendo de las reglas escritas en el código del software, las criptomonedas pueden crearse y destruirse. Algunas criptomonedas tienen un suministro total finito o fijo, lo que significa que existe un número máximo de unidades que jamás estarán en circulación, creando escasez.\n\nOtras se lanzan con un suministro total infinito, lo que significa que no hay un límite máximo. Aunque puede haber un límite en el número de nuevas unidades que pueden crearse dentro de un cierto período de tiempo.",
          imagen:{ src:"/bootcamp/mod1-lec1/crypto-software.png", alt:"Las criptomonedas son creadas por software" },
        },
        {
          titulo:"Las criptomonedas son difíciles de falsificar",
          texto:"Las criptomonedas también están diseñadas para ser imposibles de falsificar. Aquí es donde entra la criptografía y cómo se utiliza para registrar y almacenar transacciones de forma segura.\n\nEn criptografía, el prefijo \"cripto\" significa \"oculto\" y el sufijo \"grafía\" significa \"escritura\". Incluso Julio César usaba criptografía para comunicarse con sus generales. En la era moderna, la criptografía está asociada con la protección de información informática mediante matemáticas avanzadas. De ahí viene el \"cripto\" en \"criptomonedas\".",
          imagen:{ src:"/bootcamp/mod1-lec1/cryptography-hidden-writing.png", alt:"Criptografía: escritura oculta" },
        },
        {
          titulo:"¿Qué hace especiales a las criptomonedas?",
          puntos:[
            "Son digitales. No tienen forma física; todo se hace desde teléfonos y computadoras.",
            "Son sin fronteras. Cualquier persona con conexión a internet puede enviar y recibirlas a cualquier parte del mundo, generalmente con comisiones menores y más rápido que las transferencias de dinero tradicionales.",
            "No requieren permiso y están disponibles para todos. No necesitas aprobación bancaria ni cuenta bancaria para usar criptomonedas.",
            "Proporcionan cierto grado de privacidad: puedes hacer transacciones sin usar tu nombre.",
            "Son descentralizadas: los gobiernos no pueden interferir ni controlarlas. Ninguna persona o entidad las posee o controla.",
            "Son creadas por software. El suministro de una criptomoneda NO está determinado por ningún banco central, sino por reglas predefinidas escritas en código de software.",
            "Son difíciles de falsificar, gracias a la forma en que la información de transacciones se registra y almacena.",
          ],
        },
        {
          titulo:"Conclusión",
          texto:"Debido a estas características especiales, las criptomonedas ofrecen el potencial de dar a las personas control total sobre su dinero sin ninguna intervención de terceros.\n\nSi la cripto puede cumplir este potencial aún está por verse. Su popularidad en el mundo financiero está creciendo y ahora se considera una clase de activo emergente.",
        },
      ],
      imagenes:[],
    },
    {
      id:"crypto-01-2",
      titulo:"Cripto como nueva clase de activo",
      resumen:"Las criptomonedas no son solo dinero digital — son una nueva clase de activo financiero en la que se puede invertir y especular. Pero ese mismo mercado también está lleno de proyectos inútiles y estafas. Aprende a distinguir.",
      estado:"Contenido completo",
      sourceUrl:"https://www.babypips.com/crypto/learn/cryptocurrencies-new-asset-class",
      contenido:[
        {
          titulo:"Cripto como activo financiero",
          texto:"Además de funcionar como un nuevo tipo de \"dinero digital\" para pagar bienes y servicios, las criptomonedas se usan más frecuentemente como activos financieros que las personas intercambian o en los que invierten.\n\nLa industria financiera tradicional (\"TradFi\") sigue dividida sobre si las criptomonedas deben considerarse un \"activo financiero\". El argumento popular es que es imposible valorarlas porque no tienen ganancias ni dividendos, pero también existen activos financieros con problemas similares como el oro y otras materias primas.",
        },
        {
          titulo:"Una nueva clase de activo",
          texto:"Las clases de activos son categorías de inversiones que tienen características similares y se comportan de manera parecida: acciones, bonos, materias primas, bienes raíces y efectivo (monedas fiat).\n\nY ahora... ¡cripto! La cripto representa la primera clase de activo verdaderamente nueva en décadas.",
          imagen:{ src:"/bootcamp/mod1-lec2/asset-classes.png", alt:"Ejemplos de clases de activos" },
        },
        {
          titulo:"Mercado cripto vs. Forex",
          texto:"Similar al mercado forex (el mercado financiero para monedas fiat), ahora existe un mercado cripto donde tanto traders como inversores pueden ganar dinero.\n\nPero mientras el mercado forex está abierto 24 horas al día, 5.5 días a la semana, ¡el mercado cripto está abierto 24 horas al día, los 7 días de la semana. Nunca cierra!\n\nIncluso Jerome Powell, el jefe de la Reserva Federal, ha dicho: \"La gente usa Bitcoin como activo especulativo. Es como el oro, solo que virtual, digital.\"",
        },
        {
          titulo:"Traders e Inversores",
          texto:"Los traders apuestan (\"especulan\") sobre la dirección del precio a corto plazo, mientras que los inversores compran y mantienen con la esperanza de que ciertas criptomonedas ganen mayor adopción y aumenten de valor a largo plazo.\n\nAgregar cripto ayuda a los inversores a diversificar sus carteras. Y los inversores cripto más experimentados incluso generan ingresos pasivos de diferentes criptomonedas que mantienen.\n\nDado que las criptomonedas son activos financieros en los que puedes invertir o hacer trading, también se les llama \"activos digitales\", \"criptoactivos\" o \"crypto assets\".",
        },
        {
          titulo:"Ejemplos de criptomonedas",
          texto:"La primera criptomoneda fue Bitcoin, y sigue siendo la más grande y conocida. También hay otras criptomonedas bien conocidas como Ether, XRP, Cardano, Solana, Dogecoin, Polkadot, Litecoin y muchas otras.",
          imagen:{ src:"/bootcamp/mod1-lec2/other-cryptocurrencies.png", alt:"Criptomonedas populares" },
        },
        {
          titulo:"Miles de criptomonedas — ojo con las estafas",
          texto:"Hoy en día existen MILES de criptomonedas, cada una intentando ofrecer nuevas funcionalidades o servir a un propósito diferente.\n\nDesafortunadamente, muchas son inútiles o, peor aún, estafas directas. Pero mucha gente las sigue comprando de todas formas.\n\n⚠ Importante: El término \"criptomoneda\" es en realidad engañoso porque, a diferencia de Bitcoin, la mayoría de las criptomonedas no funcionan como monedas reales.",
        },
        {
          titulo:"El FOMO y las monedas basura",
          texto:"Los principiantes crédulos que entran al mundo cripto escuchan sobre \"Una moneda que no solo cambiará el mundo, ¡sino también la galaxia!\". Piensan: \"¡Debo comprar esta Galaticoin!\" — compran la moneda dudosa sin entender la tecnología subyacente. Y la criptomoneda termina siendo inútil.",
          imagen:{ src:"/bootcamp/mod1-lec2/galaticoin.png", alt:"Galaticoin — ejemplo de cripto dudosa" },
        },
        {
          titulo:"No seas el ciervo de una pata",
          texto:"Algunas personas entran al mercado cripto con la mentalidad equivocada: creen que es una apuesta segura y que el dinero que ponen crecerá automáticamente.\n\nCon esta mentalidad, no es sorprendente que un estafador vea el mercado cripto actual como un tigre ve a un grupo de ciervos con una pata: muchas deliciosas oportunidades.",
          imagen:{ src:"/bootcamp/mod1-lec2/one-legged-deer.png", alt:"No seas vulnerable — no seas el ciervo de una pata" },
        },
        {
          titulo:"La misión del curso",
          puntos:[
            "No dejes que te conviertan en un \"ciervo de una pata\".",
            "Estudia antes de invertir. No todo token tiene valor real.",
            "El mercado cripto es altamente volátil — más que las acciones.",
            "Entiende qué compras, cómo funciona y qué puede salir mal.",
            "La educación es tu mejor defensa contra estafas, FOMO y decisiones impulsivas.",
          ],
        },
      ],
      imagenes:[],
    },
    {
      id:"crypto-01-3",
      titulo:"Conoce a Cryptoshi",
      resumen:"Cryptoshi es la mascota de The Crypto House, tu guía en este viaje por el mundo cripto. En esta lección conoces su misión: ayudarte a entender el mercado antes de arriesgar un solo peso.",
      estado:"Contenido completo",
      sourceUrl:"https://www.babypips.com/crypto/learn/meet-toshi-moshi",
      contenido:[
        {
          titulo:"¡Hola! Soy Cryptoshi",
          texto:"¡Bienvenido a la Escuela de Cripto de The Crypto House! Soy Cryptoshi, tu guía amigable en este recorrido.\n\nSi eres nuevo en las criptomonedas, llegaste al lugar correcto. Creé este curso para que los principiantes entiendan el mercado cripto de forma clara y práctica: Bitcoin, altcoins, tokens y cómo funciona todo esto.",
          imagen:{ src:"/bootcamp/mod1-lec3/cryptoshi-welcome.png", alt:"Cryptoshi da la bienvenida" },
        },
        {
          titulo:"El boom del cripto y sus peligros",
          texto:"La conciencia sobre cripto ha ido ganando impulso masivamente. Cada día más personas se suben al tren, ya sea por pasión genuina por el potencial de la tecnología o simplemente por FOMO (miedo a quedarse fuera).\n\nPero junto con ese mayor interés, también han llegado consejos cuestionables y desinformación. Cada día aparecen más estafadores, shillers y personajes turbios que buscan aprovecharse de quienes no saben lo que están comprando.",
          imagen:{ src:"/bootcamp/mod1-lec3/shady-coin-homeless.png", alt:"Cuidado con las estafas cripto" },
        },
        {
          titulo:"El error más común: querer enriquecerse rápido",
          texto:"Muchos nuevos inversores cometen el error de querer entrar lo más rápido posible, esperando ganancias inmediatas. Es asombroso ver cuánta gente apuesta su dinero sin entender nada — en TikTok, Twitter y Reddit abundan los que buscan comprarse un lambo.\n\nEn The Crypto House defendemos un enfoque diferente. Nunca vas a escuchar mensajes de \"hazte rico rápido\" de nuestra parte. Te animamos a ser conservador y a destinar solo una pequeña porción de tu capital total.",
        },
        {
          titulo:"Cryptoshi te advierte: sé cauteloso",
          texto:"No es exageración decir que las criptomonedas son extremadamente especulativas. Si no gestionas bien tu riesgo, la probabilidad de perder mucho (si no todo) tu dinero es alta.\n\nNo caigas en el típico discurso de ventas fáciles:\n\"¡No te preocupes si no lo entiendes. Los que sí lo entienden dicen que va a ser enorme. ¡Es la próxima gran cosa!\"\n\nNo estoy de acuerdo. TÚ sí necesitas entenderlo.",
          imagen:{ src:"/bootcamp/mod1-lec3/cryptoshi-caution.png", alt:"Cryptoshi advierte sobre el riesgo" },
        },
        {
          titulo:"La historia que no quieres contarle a tus nietos",
          texto:"En el futuro, cuando tus nietos te visiten, ¿cuál de estas dos historias quieres contarles?\n\n1. \"Perdí la oportunidad del cripto.\"\n2. \"Aposté los ahorros de mi vida en cripto, lo perdí todo porque no entendía lo que compraba y me engañó un estafador carismático.\"\n\n¡Ojalá no tengas que contar ninguna de las dos!",
          imagen:{ src:"/bootcamp/mod1-lec3/old-crypto-trader.png", alt:"El trader arruinado: una historia de advertencia" },
        },
        {
          titulo:"La misión de Cryptoshi",
          texto:"Quiero evitar que te conviertas en una víctima. Es fundamental tener al menos una comprensión básica de la tecnología y los conceptos de las criptomonedas antes de poner cualquier cantidad de dinero.\n\nEspero que este curso sirva como base sólida para quienes comienzan su viaje en el mundo cripto. Al final, podrás decidir si este mundo es para ti.",
          imagen:{ src:"/bootcamp/mod1-lec3/cryptoshi-welcome-aboard.png", alt:"Cryptoshi da la bienvenida al curso" },
        },
        {
          titulo:"Lo que vas a aprender",
          puntos:[
            "Cómo funciona realmente el mercado cripto, más allá del hype.",
            "Qué es Bitcoin, qué son las altcoins y en qué se diferencian.",
            "Cómo tomar decisiones informadas sobre qué comprar y cuándo.",
            "Cómo identificar estafas, proyectos sin valor y señales de alerta.",
            "Cómo gestionar el riesgo correctamente para proteger tu capital.",
          ],
        },
        {
          titulo:"💡 Clave del éxito",
          texto:"Educarte es la clave del éxito al hacer trading o invertir en cripto. Puede ser la diferencia entre generar riqueza y perderlo todo.",
        },
      ],
      imagenes:[],
    },
    {
      id:"crypto-01-4",
      titulo:"Primeros pasos con Bitcoin",
      resumen:"El mundo cripto tiene miles de monedas y puede ser abrumador. Esta lección explica por qué empezamos por Bitcoin, qué esperar del curso y cómo vamos a dominar el jerga técnica que tanto intimida a los principiantes.",
      estado:"Contenido completo",
      sourceUrl:"https://www.babypips.com/crypto/learn/getting-started-bitcoin",
      contenido:[
        {
          titulo:"¿Por dónde empezar?",
          texto:"Hoy existen miles de criptomonedas en el mercado. Cuando los precios han subido, el valor total de todas esas criptomonedas ha superado los $3 billones (trillones en inglés), con un volumen diario de operaciones de más de $300 mil millones.\n\nEn otras palabras: el mercado cripto ha crecido rápidamente y es bastante grande. Para los principiantes, solo intentar saber por dónde empezar puede sentirse abrumador.\n\nPor eso, en lugar de intentar aprender todo el mercado cripto de golpe, vamos a empezar por Bitcoin.",
          imagen:{ src:"/bootcamp/mod1-lec4/bitcoin-yay.png", alt:"Guía de principiantes de Bitcoin" },
        },
        {
          titulo:"¿Por qué empezar con Bitcoin?",
          texto:"Bitcoin fue la criptomoneda original. Los avances técnicos que permitieron que Bitcoin existiera son la base de todas las demás criptomonedas.\n\nEntender Bitcoin — qué es, de dónde viene y cómo funciona — te proporciona una base sólida para poder navegar todo el espacio cripto. Muchos de los conceptos necesarios para entender Bitcoin se pueden aplicar a otras criptomonedas.\n\nAsí que si logras entender Bitcoin lo suficiente como para no estar perdido… que es el objetivo… tendrás un tiempo mucho más fácil entendiendo el resto del mundo cripto.",
        },
        {
          titulo:"La definición técnica de Bitcoin",
          texto:"Empecemos con una descripción muy simple de Bitcoin:\n\n\"Bitcoin es una moneda digital descentralizada, basada en un diseño de software de código abierto, que se utiliza para transmitir valor entre usuarios pseudónimos. Todas las transacciones, una vez confirmadas por los mineros mediante PoW (Prueba de Trabajo) como mecanismo de consenso, se almacenan en un libro de contabilidad distribuido, llamado blockchain.\"\n\n¿Entendiste todo eso?",
          imagen:{ src:"/bootcamp/mod1-lec4/toshi-jargon-overload.png", alt:"Sobrecarga de jerga cripto" },
        },
        {
          titulo:"¡No te intimides!",
          texto:"No pasa nada si no entendiste la definición técnica. Esta es la GUÍA PARA PRINCIPIANTES de Bitcoin y partimos de cero conocimiento técnico.\n\nPero como puedes ver claramente, ¡el mundo cripto está lleno de jerga técnica! Meterse en cripto introduce una gran cantidad de términos con los que la mayoría de personas no estarán familiarizadas.",
          imagen:{ src:"/bootcamp/mod1-lec4/crypto-jargon.png", alt:"¿Qué es toda esta jerga cripto?" },
        },
        {
          titulo:"El plan: destruir la jerga",
          texto:"Si realmente quieres entender las criptomonedas y en qué se diferencian, es muy importante que te familiarices con ciertos conceptos fundamentales.\n\nNuestro objetivo es cubrir los términos y frases que quizás no conozcas ahora, pero que sí necesitas saber. Juntos, vamos a destruir la jerga para que puedas hablar el idioma del mundo cripto con facilidad.",
          imagen:{ src:"/bootcamp/mod1-lec4/jargon-blaster.png", alt:"Destruyendo la jerga cripto" },
        },
        {
          titulo:"Un vocabulario común y claro",
          texto:"También hemos encontrado muchas inconsistencias en cómo ciertos términos se usan o definen en internet. Queremos establecer un vocabulario común con definiciones claras de conceptos y términos.\n\nEsto ayudará a asegurar que cada vez que aparezca una palabra de moda o una frase técnica a lo largo del curso, se use de forma consistente y correcta.\n\nNo podemos enfatizar lo suficiente la importancia de aprender los conceptos detrás de toda esta maravillosa jerga.",
        },
        {
          titulo:"De \"cripto ignorante\" a \"cripto competente\"",
          texto:"Al final de este curso, PODRÁS entender la definición técnica de Bitcoin que escribimos antes en esta lección. Tendrás el conocimiento suficiente para enfrentarte a terminología cripto desconocida con confianza.\n\nPasarás de ser \"cripto ignorante\" a \"cripto competente\".",
          imagen:{ src:"/bootcamp/mod1-lec4/crypto-party.png", alt:"Celebrando el conocimiento cripto" },
        },
        {
          titulo:"Puntos clave",
          puntos:[
            "El mercado cripto tiene miles de monedas y puede ser abrumador — por eso empezamos con Bitcoin.",
            "Bitcoin fue la criptomoneda original: entenderlo te da la base para entender todo lo demás.",
            "Los conceptos de Bitcoin se aplican a la mayoría de otras criptomonedas.",
            "El mundo cripto está lleno de jerga técnica — este curso la va a desmenuzar paso a paso.",
            "El objetivo es pasar de cero a entender Bitcoin con confianza, sin importar tu nivel técnico.",
          ],
        },
      ],
      imagenes:[],
    },
  ];

  const clasesModulo2 = [
    {
      id: "crypto-02-1",
      titulo: "¿Qué es Bitcoin?",
      resumen: "Bitcoin es el dinero digital original: una moneda descentralizada que te permite guardar, enviar y recibir valor por internet sin bancos ni intermediarios. Descubre quién lo creó, cómo nació, por qué su suministro es limitado y cómo ha evolucionado su precio a lo largo de los años.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-bitcoin",
      contenido: [
        {
          titulo: "Bitcoin: la criptomoneda original",
          texto: "A menos que hayas estado viviendo bajo una roca, probablemente hayas escuchado hablar de Bitcoin.\n\nBitcoin es conocido como la criptomoneda original. La primera de su tipo.\n\nBitcoin es un nuevo tipo de \"dinero\" — una moneda digital diseñada para que puedas guardar, enviar y recibir valor por internet sin necesitar bancos ni ninguna otra institución financiera.",
          imagen: { src: "/bootcamp/mod2-lec1/bitcoin-first-cryptocurrency.png", alt: "Bitcoin fue la primera criptomoneda" },
        },
        {
          titulo: "¿Cómo funciona Bitcoin?",
          texto: "A diferencia de las monedas fiat (como el dólar o el euro), Bitcoin no está controlado por ningún banco central ni gobierno. Las reglas que gobiernan su uso y su suministro están escritas en software.\n\nBitcoin funciona de forma muy parecida al correo electrónico. Así como puedes crear una dirección de email para enviar y recibir mensajes, puedes crear una \"wallet\" (billetera) de Bitcoin para enviar, guardar y recibir dinero. Cualquier persona con conexión a internet puede crear una wallet y empezar a usarla — sin pedirle permiso a ningún banco.",
        },
        {
          titulo: "¿Quién creó Bitcoin? El \"Bitcoin God\"",
          texto: "En 2008, Bitcoin fue creado por una misteriosa persona (o grupo) bajo el seudónimo \"Satoshi Nakamoto\". Hasta la fecha, su verdadera identidad sigue siendo anónima. Nadie sabe (al menos públicamente) quién es Satoshi Nakamoto.\n\nPuede ser un hombre, una mujer, un grupo de personas, o incluso un alienígena altamente inteligente. ¡Nadie lo sabe!",
          imagen: { src: "/bootcamp/mod2-lec1/bitcoin-god.png", alt: "Satoshi Nakamoto — el Bitcoin God" },
        },
        {
          titulo: "El Whitepaper de Bitcoin (Halloween, 2008)",
          texto: "El 31 de octubre de 2008 — día de Halloween — Satoshi Nakamoto publicó el famoso whitepaper titulado \"Bitcoin: A Peer-to-Peer Electronic Cash System\".\n\nFue un resumen de 12 páginas que describía el funcionamiento técnico de Bitcoin y cómo operaría el sistema en la práctica.\n\nUn whitepaper es un documento escrito por el creador de un proyecto cripto que explica su propósito y proporciona información técnica sobre la tecnología subyacente.",
        },
        {
          titulo: "El primer software de Bitcoin (enero 2009)",
          texto: "A principios de enero de 2009, se lanzó la primera versión del software de Bitcoin, la versión 0.1, en una lista de correo poco conocida.\n\nCon el tiempo, el código fuente original fue refinado por otros desarrolladores de software, muchos de los cuales trabajaron de forma voluntaria, similar a los voluntarios que escriben y editan las páginas de Wikipedia.",
        },
        {
          titulo: "Suministro fijo: solo 21 millones de bitcoins",
          texto: "El software de Bitcoin impone un suministro total máximo de 21 millones de monedas. Jamás existirán más de 21 millones de bitcoins.\n\nHasta hoy, más de 19 millones ya han sido creados (o \"minados\"), y se espera que el último bitcoin sea minado en el año 2140.\n\nEste suministro fijo contrasta con las monedas fiat tradicionales (como el dólar estadounidense), que pueden ser creadas a voluntad y en cantidades ilimitadas por los bancos centrales. Los defensores de Bitcoin creen que precisamente esta escasez es lo que le da su valor.",
        },
        {
          titulo: "Código abierto: de todos, para todos",
          texto: "Satoshi Nakamoto hizo que el código fuente de Bitcoin fuera público y animó a otros a continuar desarrollándolo.\n\nEl software de código abierto significa que el código fuente no es propietario. Cualquier desarrollador puede verlo y modificarlo. Esto garantiza que nadie pueda «secuestrar» Bitcoin en secreto.",
        },
        {
          titulo: "Satoshi Nakamoto desaparece",
          texto: "A finales de abril de 2011, Satoshi Nakamoto envió un breve correo a uno de los desarrolladores con el mensaje: \"I've moved on to other things.\" (Me he dedicado a otras cosas.) Y desapareció. Nunca más se supo de él.\n\nSatoshi Nakamoto le dio un ghosting a la comunidad Bitcoin. Pero su desaparición no fue fatal para Bitcoin. Después de más de una década, Bitcoin sigue funcionando con fuerza, permitiendo a usuarios de todo el mundo hacer transacciones entre sí.\n\nCuriosamente, Satoshi Nakamoto todavía posee más de 1 millón de bitcoins. Pero enriquecerse no fue la razón por la que creó Bitcoin.",
          imagen: { src: "/bootcamp/mod2-lec1/satoshi-nakamoto-exits.png", alt: "Satoshi Nakamoto se despide y desaparece" },
        },
        {
          titulo: "Historia del precio de Bitcoin",
          texto: "En octubre de 2009 se registró el primer tipo de cambio de Bitcoin: con $1 podías comprar ¡1,309 bitcoins!\n\nNo fue hasta febrero de 2011 que el precio de Bitcoin alcanzó la paridad con el dólar: $1 = 1 bitcoin.\n\nA medida que la confianza en Bitcoin creció, también lo hizo la demanda, lo que elevó su precio.",
          puntos: [
            "10 de febrero de 2011: $1",
            "31 de marzo de 2013: $100",
            "28 de noviembre de 2013: $1,000",
            "29 de noviembre de 2017: $10,000",
            "4 de diciembre de 2024: $100,000 🚀",
          ],
        },
        {
          titulo: "Satoshi no creó Bitcoin para hacerse rico",
          texto: "A pesar de que Satoshi es hoy un multimillonario (con más de 1 millón de bitcoins), hacerse rico no fue la motivación para crear Bitcoin.\n\nEn la próxima lección aprenderás las razones reales por las que fue creado.",
          imagen: { src: "/bootcamp/mod2-lec1/satoshi-nope.png", alt: "Satoshi Nakamoto no creó Bitcoin para enriquecerse" },
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Bitcoin es la criptomoneda original — la primera de su tipo.",
            "Es una moneda digital descentralizada: sin bancos ni gobierno que la controlen.",
            "Fue creado en 2008 por el misterioso Satoshi Nakamoto, cuya identidad real se desconoce.",
            "El whitepaper se publicó el 31 de octubre de 2008 (Halloween).",
            "El primer software se lanzó en enero de 2009.",
            "Solo existirán 21 millones de bitcoins en total — la escasez es parte del diseño.",
            "Más de 19 millones ya han sido minados; el último se minará en 2140.",
            "El código es open source: cualquier desarrollador puede verlo y contribuir.",
            "Satoshi desapareció en 2011 pero Bitcoin sigue siendo más fuerte que nunca.",
            "El precio pasó de $0.001 (2009) a más de $100,000 (diciembre 2024).",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-02-2",
      titulo: "¿Por qué fue creado Bitcoin?",
      resumen: "Para entender Bitcoin hay que entender los problemas que intentaba resolver. La historia de Ursula la Unicornio y Molly la Sirena te explica de forma sencilla por qué el efectivo digital descentralizado era tan difícil de crear — y por qué Bitcoin fue el primero en lograrlo.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/why-was-bitcoin-created",
      contenido: [
        {
          titulo: "Primero, entendamos el problema",
          texto: "¿Qué es exactamente Bitcoin? Dependiendo de a quién le preguntes, la palabra \"Bitcoin\" puede tener muchas definiciones diferentes. Y cuando alguien empieza a explicar qué es, es cuando normalmente empiezas a escuchar la jerga técnica: \"blockchain\", \"protocolo\", \"redes peer-to-peer\", \"ledgers distribuidos\"...\n\nEn lugar de ir por ese camino, es mejor empezar por los PROBLEMAS que Bitcoin intentaba resolver. Una vez que entiendas eso, todo lo demás se volverá mucho más claro.",
          imagen: { src: "/bootcamp/mod2-lec2/bitcoin-jargon.png", alt: "La jerga técnica de Bitcoin puede ser abrumadora" },
        },
        {
          titulo: "¿Por qué fue creado Bitcoin?",
          texto: "Según el whitepaper de Bitcoin, Satoshi Nakamoto quería crear:\n\n\"…efectivo electrónico que permitiría enviar pagos en línea directamente de una parte a otra sin pasar por una institución financiera.\"\n\nEn otras palabras: el efectivo físico me permite hacer transacciones directamente en el MUNDO REAL con otra persona sin necesitar un banco. Quiero esa misma libertad EN LÍNEA. Necesito una versión digital del efectivo.\n\nLa respuesta de Satoshi: Bitcoin. El concepto suena simple, pero antes de que Satoshi lo lograra, todos los intentos anteriores habían fallado. Esto nunca se había logrado antes.",
        },
        {
          titulo: "El caso de Ursula y Molly: efectivo en persona",
          texto: "Pongamos un ejemplo. Digamos que Ursula la Unicornio hornea y vende cupcakes especiales — ¡son impermeables y cantan! Y cada cupcake solo cuesta $1, con entrega aérea por unicornio incluida.\n\nMolly la Sirena quiere comprar un cupcake. Se encuentran y hacen la transacción con efectivo físico.",
          imagen: { src: "/bootcamp/mod2-lec2/ursula-the-baker.png", alt: "Ursula la Unicornio: panadera de cupcakes especiales" },
        },
        {
          titulo: "Cómo funciona una transacción en efectivo",
          texto: "Cuando Molly le da el billete de $1 a Ursula, esto es lo que ocurre:\n\n• El billete de $1 ahora es físicamente propiedad de Ursula.\n• Ursula confía en que el billete es único y real.\n• El billete es único y real porque puede verificarse, ya que es emitido por un banco central.\n• Debido a estas propiedades, el billete funciona como medio de intercambio — otras personas están dispuestas a cambiarlo por bienes y servicios.\n• Ursula le da el cupcake a Molly.\n\nTodo perfecto.",
          imagen: { src: "/bootcamp/mod2-lec2/cash-transaction.png", alt: "Transacción en efectivo entre Molly y Ursula" },
        },
        {
          titulo: "El problema: Molly está demasiado lejos",
          texto: "Ahora digamos que Molly está tan lejos que incluso Ursula no puede volar hasta allá para entregar el cupcake. Tendrá que enviarlo por courier. Ursula quiere que Molly pague primero... en línea.\n\nPero ¿cómo puede Molly enviar efectivo por internet? Ahí está el problema.",
          imagen: { src: "/bootcamp/mod2-lec2/digitize-cash.png", alt: "¿Cómo digitalizar el efectivo?" },
        },
        {
          titulo: "El efectivo es físico — no se puede enviar por internet",
          texto: "El efectivo es dinero en forma física: billetes de papel y monedas de metal. No puedes enviar efectivo físico por internet.\n\nLos compradores y vendedores tienen que estar físicamente presentes en el mismo lugar para hacer transacciones en efectivo, lo cual no siempre es posible.\n\nSi el efectivo se vuelve digital, puede copiarse fácilmente. ¿Cómo evitas que alguien gaste el mismo dinero digital dos veces?",
          imagen: { src: "/bootcamp/mod2-lec2/face-to-face-transaction.png", alt: "El efectivo requiere presencia física" },
        },
        {
          titulo: "El problema del banco: el intermediario de confianza",
          texto: "Si Molly quiere enviar efectivo electrónicamente (en forma digital), ahora tiene que depender de una institución financiera como un banco. Pero ¿qué pasa si Molly no tiene una cuenta bancaria? Sin cupcake para Molly.\n\nY cuando dependemos de instituciones financieras, esto presenta un riesgo. Por ejemplo, digamos que los codiciosos tiburones que dirigen el banco adoran las galletas y odian los cupcakes...",
          imagen: { src: "/bootcamp/mod2-lec2/shark-banker.png", alt: "El banquero tiburón — el intermediario codicioso" },
        },
        {
          titulo: "El banco puede censurar, bloquear y congelar",
          texto: "Al banco, al no ser fan de los cupcakes, puede abusar de su poder y decidir bloquear la transacción de Molly. ¡El banco no permitirá ninguna transacción relacionada con cupcakes!\n\nO el banco puede cobrar tarifas adicionales por transacciones no locales. O puede que el banco tenga problemas con Molly porque es una sirena y la considera \"sospechosa\".\n\nComo resultado, el banco puede congelar la cuenta de Molly y ahora Molly ni siquiera puede acceder a su dinero. El banco está reteniendo el dinero de Molly como rehén. El banco es la entidad única que controla todo su dinero. Dado que hay una sola entidad a cargo, esto se considera CENTRALIZADO.",
          imagen: { src: "/bootcamp/mod2-lec2/bank-censorship.png", alt: "Censura bancaria — el banco controla tu dinero" },
        },
        {
          titulo: "La solución que Molly necesita: efectivo digital descentralizado",
          texto: "Molly solo quiere su cupcake y está frustrada:\n\n\"¡Si pudiera usar efectivo, no tendría que pasar por mi banco! ¡Desearía que existiera una forma digital de efectivo que yo controlara totalmente — que pudiera usarla sin necesitar la aprobación de ninguna persona, empresa o institución!\"\n\nMolly básicamente quiere dos cosas:\n• Dinero digital que pueda usarse en línea como el efectivo físico.\n• Que sea descentralizado.\n\nDescentralizado significa que el control y la toma de decisiones se comparten entre los participantes — no hay una sola entidad a cargo. Esto te da la libertad de gastar dinero digital como quieras, sin el riesgo de que tus transacciones sean bloqueadas o tu dinero sea congelado.\n\nPero esto es extremadamente difícil de lograr. Bitcoin fue el primero en conseguirlo.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Bitcoin nació para crear efectivo digital directo: sin bancos, sin intermediarios.",
            "El efectivo físico funciona perfecto en persona, pero no puede enviarse por internet.",
            "Si el efectivo se digitaliza, puede copiarse — el problema del doble gasto.",
            "Los bancos resuelven este problema, pero a cambio te dan control centralizado sobre tu dinero.",
            "Los bancos pueden bloquear transacciones, cobrar tarifas, congelar cuentas.",
            "Bitcoin ofrece efectivo digital descentralizado: tú controlas tu dinero, nadie más.",
            "Esto nunca se había logrado antes de Bitcoin — todos los intentos anteriores fallaron.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-02-3",
      titulo: "El sistema Bitcoin y sus componentes",
      resumen: "Bitcoin es mucho más que una moneda — es un sistema completo formado por software, protocolo, nodos y red. En esta lección conoces cada componente, cómo se crearon y cómo encajan entre sí para formar algo que nadie controla pero todos pueden usar.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/bitcoin-system-introduction",
      contenido: [
        {
          titulo: "Bitcoin es un sistema, no solo una moneda",
          texto: "Aunque \"Bitcoin\" se menciona habitualmente como una criptomoneda, es mucho más que eso.\n\nBitcoin es en realidad un sistema. Como cualquier sistema, el sistema Bitcoin es una colección de elementos o componentes que trabajan juntos como un todo.\n\nEn esencia, el sistema Bitcoin es básicamente un conjunto de computadoras que \"hablan\" entre sí por internet. Para poder comunicarse, en cada computadora está instalado el software de Bitcoin.",
          imagen: { src: "/bootcamp/mod2-lec3/bitcoin-computer.png", alt: "Computadora con software de Bitcoin instalado" },
        },
        {
          titulo: "Componente 1: El software de Bitcoin",
          texto: "El software de Bitcoin es de código abierto (open source), lo que significa que cualquiera puede ver el código fuente.\n\nOpen source significa que el software no es propiedad de nadie ni de ninguna empresa. Es libre de usar y modificar. El código está diseñado para ser públicamente accesible — cualquiera puede verlo, modificarlo y distribuirlo.\n\nEste software, conocido como el cliente Bitcoin, fue creado por Satoshi Nakamoto a finales de 2008.",
          imagen: { src: "/bootcamp/mod2-lec3/developer.png", alt: "Satoshi Nakamoto creó el software de Bitcoin" },
        },
        {
          titulo: "Bitcoin Core: la implementación de referencia",
          texto: "La implementación original del software es ahora conocida como Bitcoin Core. Satoshi Nakamoto fue el mantenedor original de Bitcoin Core hasta que desapareció a finales de 2010.\n\nDebido a que el código de Bitcoin Core es open source, hoy existen múltiples implementaciones del código de Bitcoin. Pero Bitcoin Core sigue siendo la más popular y se usa como versión de referencia para otro software de Bitcoin.\n\nActualmente, este software está instalado en miles de computadoras distribuidas por todo el mundo.",
        },
        {
          titulo: "Componente 2: El protocolo de Bitcoin",
          texto: "¿Qué hace el software? Ejecuta el protocolo de Bitcoin.\n\nUn protocolo es un conjunto de reglas o procedimientos que gobiernan un sistema. Por lo tanto, el protocolo de Bitcoin es el conjunto de reglas que definen cómo opera el sistema Bitcoin.\n\nPor ejemplo, hay una regla que especifica una cantidad máxima de bitcoins que jamás estarán en circulación. Otra regla especifica qué determina que una transacción sea válida.\n\nEste protocolo, o conjunto de reglas, puede describirse por escrito, pero en el caso de Bitcoin está expresado en código de computadora, que luego se compila en software.",
          imagen: { src: "/bootcamp/mod2-lec3/bitcoin-software-code.png", alt: "El código del protocolo de Bitcoin" },
        },
        {
          titulo: "Componente 3: Los nodos de Bitcoin",
          texto: "El software está instalado en miles de computadoras repartidas por todo el mundo. Estas computadoras se llaman nodos de Bitcoin.\n\nSi una computadora (\"nodo\") está conectada a internet y empieza a ejecutar el software, se convierte en parte de la red de Bitcoin. Una vez que los nodos están conectados a la red, comienzan a comunicarse y a compartir información entre sí.",
        },
        {
          titulo: "Componente 4: La red de Bitcoin",
          texto: "Todos los nodos conectados y ejecutando el software de Bitcoin forman la red de Bitcoin — una red global, distribuida y sin un punto central de control.\n\nA diferencia de los servidores de un banco (en ubicaciones físicas controladas por una empresa), los nodos de Bitcoin están repartidos por todo el mundo. Nadie puede apagar la red cerrando un solo punto.",
          imagen: { src: "/bootcamp/mod2-lec3/global-network.png", alt: "La red global de Bitcoin" },
        },
        {
          titulo: "El mapa del sistema Bitcoin",
          texto: "Hasta aquí, los componentes del sistema Bitcoin que hemos visto son:\n\n• Software de Bitcoin — el código open source que cada nodo ejecuta.\n• Protocolo de Bitcoin — las reglas que definen cómo opera el sistema.\n• Nodos de Bitcoin — las computadoras que ejecutan el software.\n• Red de Bitcoin — el conjunto de todos los nodos conectados.\n\nEstos componentes son solo el comienzo. A medida que avances en el curso, el mapa del sistema se irá completando con más piezas como la blockchain, los mineros y las wallets.",
          imagen: { src: "/bootcamp/mod2-lec3/bitcoin-as-a-system.png", alt: "Mapa inicial del sistema Bitcoin" },
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Bitcoin no es solo una moneda — es un sistema completo de componentes interconectados.",
            "El software de Bitcoin es open source: cualquiera puede verlo, usarlo y modificarlo.",
            "El cliente original se llama Bitcoin Core, creado por Satoshi Nakamoto en 2008.",
            "El protocolo son las reglas que gobiernan el sistema: límite de 21M bitcoins, validación de transacciones, etc.",
            "Los nodos son las computadoras que ejecutan el software y forman la red.",
            "La red de Bitcoin es global, distribuida y sin un punto central de control.",
            "Ningún componente funciona solo — todos dependen del resto del sistema.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-02-4",
      titulo: "¿Qué problemas resolvió Bitcoin?",
      resumen: "Bitcoin no surgió de la nada: existían intentos previos de crear dinero digital que fallaron por dos razones fundamentales. Satoshi Nakamoto identificó estos problemas y diseñó un sistema radicalmente nuevo para resolverlos ambos a la vez.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-problems-did-bitcoin-solve",
      contenido: [
        {
          titulo: "El reto del dinero digital",
          texto: "¿Qué hace a Bitcoin tan revolucionario? Antes de que Satoshi Nakamoto publicara su white paper en 2008, ya existían varios intentos de crear dinero electrónico descentralizado: b-money, Bit Gold, ecash, E-gold, Hashcash, Liberty Reserve y RPOW. Todos fracasaron por dos razones principales.\n\nA diferencia de una foto o un PDF, no puedes adjuntar dinero a un correo y enviarlo como si nada. Cuando transfieres VALOR entre dos personas, necesitas garantizar que la transferencia es real: que quien envió ya no tiene el dinero y quien recibió sí lo tiene.",
        },
        {
          titulo: "El problema del doble gasto",
          texto: "Imagina que tienes una foto del Hombre de Jengibre. Si me la envías por mensaje, yo recibo una copia, pero tú sigues teniendo el original. Con fotos esto no es grave, pero con dinero es un desastre.",
          imagen: { src: "/bootcamp/mod2-lec4/gingerbread-photo.png", alt: "Foto del hombre de jengibre — ejemplo de duplicación digital" },
        },
        {
          titulo: "La falsificación digital",
          texto: 'Imagina que Molly escanea su billete de $1 y lo llama "one-dollar.jpg". En formato digital, esa imagen puede copiarse infinitas veces. Molly podría gastar el mismo dólar cientos de veces simultáneamente.\n\nEsto se llama el "problema del doble gasto": la capacidad de gastar el mismo dinero digital más de una vez. Si múltiples personas tienen el mismo archivo "one-dollar.jpg", ¿quién es el verdadero dueño?',
          imagen: { src: "/bootcamp/mod2-lec4/scan-money.png", alt: "Escanear un billete crea copias infinitas del mismo dinero" },
        },
        {
          titulo: "El doble gasto en acción",
          texto: "El problema es que el valor neto de una transferencia debe ser cero: cuando Ursula envía $1 a Molly, Ursula debe perder $1 y Molly debe ganar $1. Con dinero físico esto ocurre de forma natural — le das el billete y ya no lo tienes. Con dinero digital, sin un sistema que lo controle, simplemente copias el archivo.",
          imagen: { src: "/bootcamp/mod2-lec4/double-spending.png", alt: "Diagrama del problema del doble gasto en dinero digital" },
        },
        {
          titulo: "La solución pre-Bitcoin: los bancos como árbitros",
          texto: "Antes de Bitcoin, la única solución era confiar en una autoridad central: un banco, PayPal, Venmo u otro intermediario financiero. El banco mantiene un registro (un ledger) de todos los saldos y transacciones.\n\nCuando Ursula envía $1 a Molly, el banco verifica que Ursula tiene fondos, reduce su saldo y aumenta el de Molly. No hay billetes físicos — solo anotaciones en el registro del banco.",
          imagen: { src: "/bootcamp/mod2-lec4/bank-payment.png", alt: "Transacción bancaria digital entre dos personas" },
        },
        {
          titulo: "El ledger bancario resuelve el doble gasto",
          texto: "El banco usa un ledger (libro contable) que cumple dos funciones: registrar quién tiene qué cantidad, y garantizar que cada transacción sea única e irrepetible. Cuando Molly transfiere $1 a Ursula, el ledger queda actualizado: Molly tiene $0 y Ursula tiene $1. La misma moneda no puede gastarse dos veces.",
          imagen: { src: "/bootcamp/mod2-lec4/bank-payment-with-ledger.png", alt: "Pago bancario con ledger que registra la transacción" },
        },
        {
          titulo: "El problema: la centralización",
          texto: "Resolver el doble gasto con bancos funciona, pero introduce un nuevo problema: tienes que confiar en ellos. Y esa confianza tiene riesgos reales:\n\n• El banco puede cometer errores en tu saldo.\n• Los gobiernos pueden presionar al banco para bloquear o confiscar tu dinero (censura financiera).\n• Si el banco quiebra, tus fondos pueden desaparecer.\n• El banco puede rechazar tu transacción sin darte una explicación.\n\nEsto se llama el problema de la centralización: un solo punto de control que puede fallar o ser manipulado.",
          imagen: { src: "/bootcamp/mod2-lec4/bitcoin-99-problems.png", alt: "Bitcoin tiene 99 problemas pero el doble gasto no es uno" },
        },
        {
          titulo: "Satoshi identificó ambos problemas",
          texto: "Satoshi Nakamoto resumió el desafío en dos problemas fundamentales del dinero digital:\n\n1. El doble gasto: cómo garantizar que el dinero digital no se gasta dos veces.\n2. La centralización: cómo evitar depender de una autoridad central que puede fallar o ser corrupta.\n\nY encontró la manera de resolver ambos a la vez.",
          imagen: { src: "/bootcamp/mod2-lec4/bitcoin-problems.png", alt: "Bitcoin resuelve los dos grandes problemas del dinero digital" },
        },
        {
          titulo: "La solución: descentralización total",
          texto: "Satoshi quería un dinero global, sin fronteras y sin estado: que funcionara como efectivo físico pero en formato digital, sin necesidad de bancos ni permisos de ningún gobierno.\n\nSu lema sería: 'Sin importar dónde vivas, puedes gastar tu dinero cuando quieras, en lo que quieras y con quien quieras.' Nadie, ningún gobierno, ninguna empresa, podría bloquear la transacción. Esto se conoce como resistencia a la censura.\n\nEn lugar de una cuenta bancaria, solo necesitarías una 'wallet' (cartera digital) que cualquiera puede crear.",
          imagen: { src: "/bootcamp/mod2-lec4/fiat-vs-bitcoin.png", alt: "Comparación entre el sistema fiat tradicional y Bitcoin" },
        },
        {
          titulo: "Bitcoin vs. bitcoin: mayúscula y minúscula",
          texto: "Satoshi tomó ideas de todos los intentos anteriores y las combinó de una forma nueva y original. Llamó a este sistema: Bitcoin.\n\n• Bitcoin (con B mayúscula) es el sistema completo que gestiona la creación y transferencia de su propia moneda.\n• bitcoin (con b minúscula) es la unidad de cuenta, la moneda en sí.\n• El código de divisa es BTC: 1 bitcoin = 1 BTC.\n• Un bitcoin es divisible hasta 8 decimales, por lo que puedes tener 0.00000001 BTC.",
          imagen: { src: "/bootcamp/mod2-lec4/bitcoin-name.png", alt: "Satoshi nombró su sistema Bitcoin" },
        },
        {
          titulo: "Cómo Bitcoin rastrea la propiedad",
          texto: "El sistema Bitcoin crea bitcoins y registra permanentemente cada cambio de propietario. Imagina que el banco central rastrea cada billete desde que se imprime hasta que se destruye. Bitcoin hace exactamente eso, pero sin banco central.\n\nCada transacción queda registrada en miles de copias del ledger distribuido alrededor del mundo. Si envías bitcoin a alguien, esa transacción es permanente e irrepetible: ese bitcoin no puede gastarse dos veces.\n\nEste archivo compartido y distribuido es el ledger de Bitcoin, también conocido como blockchain o cadena de bloques.",
          imagen: { src: "/bootcamp/mod2-lec4/track-ownership.png", alt: "El sistema Bitcoin rastrea la propiedad de cada bitcoin" },
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Los intentos anteriores de crear dinero digital fracasaron por el doble gasto y la centralización.",
            "El doble gasto ocurre cuando un archivo digital (dinero) se copia y se gasta varias veces.",
            "Los bancos resolvieron el doble gasto con ledgers centralizados, pero a costa de exigir tu confianza.",
            "La centralización crea riesgos: censura, confiscación, corrupción y punto único de fallo.",
            "Satoshi Nakamoto diseñó Bitcoin para resolver ambos problemas simultáneamente.",
            "Bitcoin (B mayúscula) es el sistema; bitcoin (b minúscula) es la moneda. 1 BTC = divisible en 8 decimales.",
            "El ledger de Bitcoin es distribuido: miles de computadoras en todo el mundo mantienen copias idénticas.",
            "Cada transacción en Bitcoin es permanente, verificable y no puede deshacerse ni censurarse.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-02-5",
      titulo: "¿Qué es un ledger distribuido?",
      resumen: "El primer paso para entender cómo funciona Bitcoin es comprender el concepto de ledger distribuido. En esta lección verás por qué los bancos existen, qué pasa cuando intentas prescindir de ellos, y cómo Bitcoin resolvió el problema de coordinación sin necesitar a nadie de confianza en el centro.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-distributed-ledger",
      contenido: [
        {
          titulo: "Recordatorio: Bitcoin como sistema de registro",
          texto: "En la lección anterior vimos que Bitcoin es un nuevo tipo de sistema de registro de transacciones creado por Satoshi Nakamoto para mover dinero en internet. Su objetivo es lograr dos cosas a la vez:\n\n1. Eliminar el doble gasto (que nadie pueda gastar el mismo dinero dos veces).\n2. Eliminar la dependencia de una autoridad central como un banco.\n\nLa clave de cómo lo logra está en su enfoque innovador de mantener y actualizar un registro de transacciones.",
          imagen: { src: "/bootcamp/mod2-lec5/online-bank-payment.png", alt: "Transacción digital bancaria tradicional" },
        },
        {
          titulo: "¿Por qué existe el banco en primer lugar?",
          texto: "Para entender la solución de Bitcoin, primero hay que entender el problema que los bancos resuelven. Imagina que Molly la Sirena y Ursula el Unicornio intentan hacerse pagos digitales sin ningún banco.\n\nCada una mantiene su propio archivo de registro (ledger) en su computadora. Cuando Molly paga $1 a Ursula, ambas actualizan su ledger. Si se tienen confianza mutua, esto funciona.\n\nPero, ¿qué pasa si Ursula es deshonesta?",
          imagen: { src: "/bootcamp/mod2-lec5/p2p-payment.png", alt: "Pago electrónico peer-to-peer entre dos personas" },
        },
        {
          titulo: "El problema de la confianza entre dos personas",
          texto: "Si Ursula edita su ledger para borrar el pago recibido de Molly y luego le pide que pague de nuevo, ambas tendrán registros diferentes y contradictorios. ¿A quién le crees?\n\nEste es exactamente el problema que justifica la existencia del banco: un tercero de confianza que mantiene el registro oficial y que todos aceptan como árbitro. Si hay un conflicto, el banco tiene la última palabra.\n\nPero nosotros no queremos depender de un banco. Necesitamos otra solución.",
        },
        {
          titulo: "La solución: añadir más participantes",
          texto: "¿Y si en lugar de solo dos personas, el ledger se comparte con una tercera? Añadamos a Pablo el Oso Polar a la red.\n\nAhora cuando Molly paga a Ursula, los tres actualizan su copia del ledger al mismo tiempo. Si Ursula intenta mostrar un ledger manipulado con saldo $0, la versión de Molly y la de Pablo mostrarán que sí recibió $1. Dos de tres ledgers la contradicen.\n\nUrsula no puede ganar esa discusión. La mayoría manda.",
          imagen: { src: "/bootcamp/mod2-lec5/simple-distributed-ledger.png", alt: "Ejemplo simple de ledger distribuido entre tres personas" },
        },
        {
          titulo: "Consenso y sincronización",
          texto: "Viendo que es imposible hacer trampa, Ursula confiesa que manipuló su ledger. Para recuperar la confianza del grupo, borra su versión corrupta y pide una copia actualizada a Molly o a Pablo. Los tres ledgers vuelven a estar sincronizados.\n\nEsto es un ledger distribuido en su forma más simple: el registro no está en un solo lugar sino repartido entre varios participantes. El resultado es que el ledger más honesto — el que comparte la mayoría — es el que prevalece.",
          imagen: { src: "/bootcamp/mod2-lec5/distributed-ledgers-sync.png", alt: "Ledgers distribuidos sincronizados tras detectar manipulación" },
        },
        {
          titulo: "¿Qué es un ledger distribuido?",
          texto: 'Un ledger distribuido es un registro que se replica y almacena en múltiples ubicaciones al mismo tiempo, en lugar de en un único punto central.\n\nCuando todos tienen una copia del mismo ledger, nadie puede modificarlo en secreto: los demás participantes detectarán inmediatamente cualquier discrepancia. Cuantos más participantes honestos haya, más robusto y confiable se vuelve el sistema.\n\nLa idea central de Bitcoin fue crear un ledger distribuido de transacciones, accesible para cualquier persona en el mundo, donde nadie — ninguna persona, empresa o gobierno — tenga el control.',
        },
        {
          titulo: "El desafío de escalar a miles de participantes",
          texto: "El ejemplo con tres amigos que se conocen y confían mucho entre sí es fácil de manejar. Pero Bitcoin es una red completamente pública donde cualquiera puede participar: miles de personas que no se conocen entre sí, muchas de las cuales podrían ser deshonestas.\n\nSi hay miles de Ursulas maliciosas editando sus ledgers al mismo tiempo, necesitas miles de Pablos para contrarrestarlas. El verdadero desafío no es técnico — es de coordinación:\n\n¿Cómo logras que miles de extraños que no se confían entre sí lleguen a un acuerdo sobre cuál versión del ledger es la correcta?",
        },
        {
          titulo: "El mecanismo de consenso",
          texto: "Esta pregunta — '¿Qué versión del ledger sigue todo el mundo?' — se llama consenso.\n\nEn una red pública con miles de copias del ledger, algunas potencialmente corruptas, necesitas un mecanismo de consenso: un sistema de reglas que permita a todos los participantes, sin conocerse ni confiar entre sí, ponerse de acuerdo sobre qué transacciones son válidas.\n\nSatoshi Nakamoto diseñó una solución técnica brillante para este problema — considerada un antes y un después en la historia de la informática. En las próximas lecciones exploraremos cómo funciona ese mecanismo por dentro.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Un ledger es un registro de transacciones que permite saber quién tiene qué.",
            "Los bancos resuelven el problema del doble gasto con un ledger centralizado, pero exigen confianza.",
            "Un ledger distribuido reparte el registro entre múltiples participantes en diferentes ubicaciones.",
            "Cuando la mayoría comparte el mismo ledger, resulta muy difícil que un actor deshonesto lo falsifique.",
            "Cuantos más participantes honestos haya, más seguro y confiable es el ledger distribuido.",
            "Bitcoin usa un ledger distribuido que es público, sin permisos y sin control central.",
            "El gran reto es el consenso: lograr que miles de extraños acuerden cuál versión del ledger es la verdadera.",
            "Satoshi Nakamoto diseñó un mecanismo de consenso innovador que resuelve este desafío — las próximas lecciones lo detallan.",
          ],
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo3 = [
    {
      id: "crypto-03-1",
      titulo: "¿Qué es una red?",
      resumen: "Bitcoin no lo gestiona ningún banco ni empresa central: lo ejecuta una red de miles de computadoras repartidas por el mundo. Para entender cómo funciona esa red, primero necesitas entender qué es una red de computadoras y cuáles son sus dos grandes tipos.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-network",
      contenido: [
        {
          titulo: "Bitcoin corre sobre una red",
          texto: "En lugar de un organismo central como un banco que gestione las transacciones, Bitcoin es operado por una red de miles de computadoras que ejecutan software y se encargan de enviar y recibir bitcoins entre sí.\n\nEsa red de computadoras se llama la red Bitcoin.\n\nAntes de entrar en detalle sobre cómo funciona específicamente la red Bitcoin, conviene hacer un paso atrás y revisar qué es una red de computadoras.",
        },
        {
          titulo: "¿Qué es una red de computadoras?",
          texto: "Una red es simplemente un conjunto de computadoras conectadas entre sí que pueden intercambiar datos.\n\nExisten dos formas básicas de organizar una red:\n\n1. Red cliente-servidor\n2. Red peer-to-peer (entre pares)\n\nCada una tiene una arquitectura distinta y consecuencias muy diferentes para la seguridad y la resistencia al fallo.",
        },
        {
          titulo: "Tipo 1: Red cliente-servidor",
          texto: "En una red cliente-servidor, existe una computadora centralizada llamada servidor que actúa como núcleo al que se conectan todas las demás computadoras, llamadas clientes.\n\nLos clientes (tu laptop, tu smartphone) solicitan datos, y el servidor los entrega. Así funciona la banca digital tradicional: tu teléfono es el cliente que se conecta al servidor central del banco.\n\nEsta configuración de tipo hub-and-spoke (cubo y radios) es muy eficiente, pero tiene un punto crítico de vulnerabilidad: si el servidor cae, toda la red se cae con él.",
          imagen: { src: "/bootcamp/mod3-lec1/client-server-network.png", alt: "Diagrama de red cliente-servidor centralizada" },
        },
        {
          titulo: "El punto único de fallo",
          texto: "El servidor es el cuello de botella de toda la red: un único punto de fallo (en inglés, Single Point of Failure o SPOF).\n\nSi el servidor sufre un ataque, un corte eléctrico o una avería técnica, nadie en la red puede operar. Esto es exactamente el tipo de fragilidad que Satoshi Nakamoto quería eliminar con Bitcoin.",
        },
        {
          titulo: "Tipo 2: Red peer-to-peer (P2P)",
          texto: "En una red peer-to-peer no hay servidor central. En lugar de servidores y clientes, todas las computadoras son simplemente nodos que pueden actuar a la vez como cliente Y como servidor.\n\nUna red P2P se estructura como una telaraña: cada nodo está conectado directamente a otros nodos. No hay un punto central por el que tenga que pasar toda la información.\n\nEjemplos conocidos de redes P2P: el propio internet, Napster (el pionero del intercambio de música), y BitTorrent.",
          imagen: { src: "/bootcamp/mod3-lec1/p2p-network.png", alt: "Diagrama de red peer-to-peer descentralizada" },
        },
        {
          titulo: "Características de una red P2P",
          texto: "En una red peer-to-peer:\n\n• Cada nodo es igual a los demás — no hay jerarquía.\n• Cada nodo tiene los mismos derechos y responsabilidades.\n• Los nodos funcionan simultáneamente como clientes y servidores.\n• Si un nodo falla, el resto de la red sigue funcionando sin problemas.\n\nEsta arquitectura es mucho más resistente al fallo y a los ataques que una red cliente-servidor.",
        },
        {
          titulo: "¿Qué tiene que ver esto con Bitcoin?",
          texto: "La red Bitcoin está configurada como una red peer-to-peer. Eso significa que no existe un servidor central que pueda ser atacado, apagado o controlado por un gobierno o empresa.\n\nCualquier computadora del mundo puede unirse a la red Bitcoin como nodo, sin pedir permiso a nadie. Y si un nodo desaparece, los miles de nodos restantes siguen manteniendo la red en marcha.\n\nEn la próxima lección veremos exactamente por qué esta elección arquitectónica es tan importante para el funcionamiento y la seguridad de Bitcoin.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Bitcoin es gestionado por una red de miles de computadoras, no por ningún organismo central.",
            "Una red cliente-servidor tiene un nodo central (servidor) del que dependen todos los demás — es el punto único de fallo.",
            "Si el servidor de una red cliente-servidor cae, toda la red cae con él.",
            "Una red peer-to-peer (P2P) no tiene servidor central: todos los nodos son iguales.",
            "En una red P2P, cada computadora actúa simultáneamente como cliente y servidor.",
            "La red P2P se estructura como una telaraña: más resiliente y sin puntos únicos de fallo.",
            "La red Bitcoin es una red peer-to-peer pública a la que cualquiera puede unirse sin permiso.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-03-2",
      titulo: "¿Qué es la red Bitcoin?",
      resumen: "La red Bitcoin es una red peer-to-peer formada por miles de computadoras que corren el software de Bitcoin. En esta lección entenderás por qué esa arquitectura descentralizada hace que Bitcoin sea imposible de apagar y cómo reemplaza al intermediario tradicional con consenso colectivo.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-the-bitcoin-network",
      contenido: [
        {
          titulo: "Una red peer-to-peer",
          texto: 'La red Bitcoin es una red peer-to-peer (P2P). En palabras del propio Satoshi Nakamoto:\n\n"Una versión puramente peer-to-peer de efectivo electrónico permitiría enviar pagos en línea directamente de una parte a otra sin pasar por una institución financiera."\n\nLa red Bitcoin está formada por computadoras que ejecutan el software de Bitcoin, también conocido como cliente Bitcoin. Ese software es lo que hace funcionar todo el sistema.',
          imagen: { src: "/bootcamp/mod3-lec2/bitcoin-client-network.png", alt: "Red Bitcoin: clientes corriendo el software de Bitcoin" },
        },
        {
          titulo: "Cómo se ve la red en el mundo real",
          texto: "En el diagrama ideal, cada nodo se conecta directamente con todos los demás. En la práctica, el mundo es demasiado grande para eso. No todas las computadoras pueden conectarse entre sí de forma directa.\n\nLo que realmente ocurre es que cada nodo se conecta con un subconjunto de otros nodos, y la información se propaga a través de la red saltando de nodo en nodo hasta llegar a todos. El resultado sigue siendo una red sin centro, solo que con una topología más orgánica.",
          imagen: { src: "/bootcamp/mod3-lec2/bitcoin-client-network-realistic.png", alt: "Configuración real de la red Bitcoin en el mundo" },
        },
        {
          titulo: "Red centralizada vs. red descentralizada",
          texto: "La diferencia fundamental entre los dos tipos de red es quién tiene el control:\n\n• Red centralizada (cliente-servidor): existe un nodo central del que todos dependen. Si ese servidor cae, toda la red cae.\n• Red descentralizada (P2P): no hay nodo central. Cada computadora opera de forma independiente. Si una falla, el resto sigue funcionando.\n\nBitcoin es una red descentralizada. Sus nodos pueden funcionar de forma completamente independiente entre sí.",
          imagen: { src: "/bootcamp/mod3-lec2/decentralized-vs-centralized.png", alt: "Comparación visual: red centralizada vs. red descentralizada" },
        },
        {
          titulo: "Sin punto único de fallo",
          texto: "En una red centralizada, el servidor central es el cuello de botella: si cae, la red entera se va con él. A esto se le llama punto único de fallo (SPOF por sus siglas en inglés).\n\nEn la red Bitcoin, si una computadora se desconecta o falla, la red continúa funcionando como si nada hubiera ocurrido. No hay ningún servidor que derribar.\n\nEsto significa que la red Bitcoin no puede ser apagada. No existe un interruptor central. No hay un servidor al que atacar para detener el sistema.",
          imagen: { src: "/bootcamp/mod3-lec2/central-point-of-failure.png", alt: "El punto central de fallo en redes centralizadas vs. Bitcoin" },
        },
        {
          titulo: "Consenso descentralizado",
          texto: "En el sistema bancario tradicional, cuando haces una transferencia, necesitas un intermediario de confianza — el banco — que valide la transacción restando fondos de una cuenta y sumándolos a otra. Si el banco lo aprueba, la transacción es válida. El consenso sobre la validez depende de una autoridad central.\n\nBitcoin funciona de otra manera: usa consenso descentralizado. En lugar de confiar en un intermediario, TODAS las computadoras de la red tienen que ponerse de acuerdo sobre qué transacciones son válidas.\n\nEl intermediario es reemplazado por una red de computadoras.",
          imagen: { src: "/bootcamp/mod3-lec2/decentralized-consensus.png", alt: "Consenso descentralizado en la red Bitcoin" },
        },
        {
          titulo: "¿Cómo llegan a un acuerdo miles de computadoras?",
          texto: "Esto es exactamente lo que hace a Bitcoin tan revolucionario y también tan complejo de entender: ¿cómo logran miles de computadoras que no se conocen entre sí, distribuidas por todo el mundo, ponerse de acuerdo sobre qué transacciones son válidas sin ningún árbitro central?\n\nEl mecanismo concreto que usa Bitcoin para lograr ese consenso — el corazón del sistema — se explicará en detalle en las próximas lecciones. Por ahora, lo importante es entender que ese consenso existe y que es descentralizado.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "La red Bitcoin es una red peer-to-peer (P2P) formada por miles de computadoras que corren el software de Bitcoin.",
            "Cualquier computadora de la red puede comunicarse directamente con otras sin pasar por un servidor central.",
            "En el mundo real, los nodos no se conectan todos entre sí: la información salta de nodo en nodo hasta propagarse.",
            "Al ser descentralizada, la red no tiene punto único de fallo: si un nodo cae, la red sigue funcionando.",
            "La red Bitcoin no puede ser apagada porque no existe un servidor central al que atacar o desconectar.",
            "Bitcoin usa consenso descentralizado: todas las computadoras de la red acuerdan colectivamente qué transacciones son válidas.",
            "El banco como intermediario es reemplazado por la red completa de nodos de Bitcoin.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-03-3",
      titulo: "¿Qué hace la red Bitcoin?",
      resumen: "La red Bitcoin está formada por miles de computadoras (nodos) repartidas por todo el mundo que se comunican entre sí compartiendo transacciones. En esta lección entenderás qué hace cada nodo, cómo se propaga la información por la red y por qué cualquiera puede unirse sin pedir permiso.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-does-the-bitcoin-network-do",
      contenido: [
        {
          titulo: "Los nodos: las computadoras de la red",
          texto: "La red Bitcoin está formada por computadoras que ejecutan el software de Bitcoin. Cada una de esas computadoras se llama nodo (node).\n\nLos nodos de Bitcoin básicamente chismean. Les encanta hablar entre sí.\n\nPero en lugar de hablar de los últimos escándalos de famosos, se comunican sobre lo que está ocurriendo en la red: transacciones, nuevos bloques, actualizaciones del estado del ledger.",
          imagen: { src: "/bootcamp/mod3-lec3/bitcoin-network-message.png", alt: "Los nodos de Bitcoin enviándose mensajes entre sí" },
        },
        {
          titulo: "Mensajes con transacciones",
          texto: "En Bitcoin, cada mensaje que un nodo envía a otro contiene información sobre una nueva transacción.\n\nLos nodos forman la red conectándose entre sí y compartiendo transacciones. Este intercambio de información es lo que permite que todas las computadoras de la red estén sincronizadas y actualizadas, algo esencial para que una moneda digital funcione en internet.\n\nCuando un nodo recibe un mensaje, lo verifica y luego lo reenvía a los nodos a los que está conectado. Así la información se propaga por toda la red como una ola.",
          imagen: { src: "/bootcamp/mod3-lec3/bitcoin-network-propagate.png", alt: "Propagación de mensajes entre nodos de la red Bitcoin" },
        },
        {
          titulo: "Cualquiera puede unirse",
          texto: "Cualquier computadora que ejecute el software cliente de Bitcoin pasa a formar parte de la red automáticamente. Los únicos requisitos son:\n\n• Tener conexión a internet.\n• Descargar e instalar el software de Bitcoin (cliente Bitcoin).\n• Dejar la aplicación ejecutándose.\n\nNo hay filtros, aprobaciones ni permisos. No importa quién eres, dónde vives ni cuánto dinero tienes. Si tienes el software corriendo, eres un nodo de la red Bitcoin.",
        },
        {
          titulo: "Cliente, nodo y servidor: los tres en uno",
          texto: 'En tecnología, un "cliente" es un programa que se conecta a un servidor para pedir datos. Por ejemplo, Chrome es un cliente web que se conecta a los servidores de los sitios web.\n\nEn Bitcoin, un cliente es un software que se conecta a otros clientes de forma peer-to-peer. No hay un servidor Bitcoin central al que conectarse. Cada cliente Bitcoin es a la vez cliente Y servidor.\n\nPara evitar confusión, se usa la palabra "nodo" en lugar de "cliente". Un nodo es simplemente una computadora participando en la red Bitcoin.',
          imagen: { src: "/bootcamp/mod3-lec3/bitcoin-network-nodes.png", alt: "Red de nodos Bitcoin: cualquiera puede unirse y convertirse en nodo" },
        },
        {
          titulo: "Más de 15.000 nodos en todo el mundo",
          texto: "La red Bitcoin es una red de nodos conectados de todo el planeta. En el momento en que se escribió esta lección, había más de 15.000 nodos activos distribuidos geográficamente por todos los continentes.\n\nEsta distribución global es lo que hace a la red tan resiliente: no hay ningún país, región o empresa que controle la mayoría de los nodos. Apagar la red requeriría apagar simultáneamente miles de computadoras independientes en todo el mundo.",
          imagen: { src: "/bootcamp/mod3-lec3/map-bitcoin-nodes.jpg", alt: "Mapa mundial de la distribución geográfica de los nodos Bitcoin" },
        },
        {
          titulo: "Una red sin líder",
          texto: "Piensa en la red Bitcoin como una red sin líder formada por computadoras independientes que operan de forma autónoma siguiendo las reglas del software de Bitcoin.\n\nNadie está al mando. No hay CEO, no hay sede central, no hay junta directiva. Las reglas están escritas en el software, y cualquier computadora que lo ejecute las sigue automáticamente.\n\nEsto es lo que significa cuando lees que Bitcoin 'es gestionado por una red peer-to-peer de computadoras que ejecutan software': miles de máquinas independientes coordinándose sin ningún centro.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Los nodos son las computadoras que forman la red Bitcoin ejecutando el software de Bitcoin.",
            "Los nodos se comunican entre sí enviándose mensajes que contienen información sobre nuevas transacciones.",
            "Cada mensaje se propaga de nodo en nodo hasta que toda la red está actualizada.",
            "Cualquiera puede unirse a la red Bitcoin: solo necesitas conexión a internet y el software instalado.",
            "En Bitcoin no hay 'clientes' y 'servidores' separados: cada nodo es las dos cosas al mismo tiempo.",
            "Existen más de 15.000 nodos distribuidos por todo el mundo, lo que hace la red extremadamente resiliente.",
            "La red Bitcoin no tiene líder: opera de forma autónoma según las reglas codificadas en el software.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-03-4",
      titulo: "¿Qué es un nodo Bitcoin?",
      resumen: "Un nodo Bitcoin es una computadora que corre el software de Bitcoin y cumple tres funciones esenciales: valida transacciones según las reglas del protocolo, las comparte con otros nodos, y almacena una copia completa de la blockchain. Juntos, los nodos hacen que la red sea imposible de apagar.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-bitcoin-node",
      contenido: [
        {
          titulo: "Definición: nodo completo (full node)",
          texto: "Un nodo Bitcoin — más específicamente, un nodo completo o full node — es simplemente una computadora que ejecuta el software de Bitcoin (también llamado cliente Bitcoin).\n\nPuede ser una PC de escritorio o un portátil, siempre que tenga suficiente almacenamiento para guardar los datos históricos de la red.\n\nExisten dos tipos de nodos: full nodes y light nodes. Los nodos ligeros (light nodes) dependen de los nodos completos para funcionar — no pueden operar de forma independiente. Por eso, cuando hablamos de «nodo» en Bitcoin, nos referimos siempre al nodo completo.",
        },
        {
          titulo: "Las tres funciones de un nodo",
          texto: "Cada nodo realiza tres tareas fundamentales:\n\n1. Valida transacciones — comprueba que cada transacción cumpla las reglas del protocolo antes de aceptarla.\n2. Propaga información — comparte las transacciones válidas con otros nodos de la red.\n3. Almacena la blockchain — guarda una copia completa del historial de transacciones confirmadas.",
        },
        {
          titulo: "El protocolo Bitcoin: las reglas del sistema",
          texto: "Cada nodo sigue un conjunto de reglas predefinidas llamado el protocolo Bitcoin. Un protocolo es un conjunto de reglas que dicta cómo opera la red y que todos los participantes deben cumplir para que el sistema funcione.\n\nCada nodo es autónomo: el software ya sabe qué hacer y toma sus propias decisiones basándose en el protocolo. La red no te dice qué hacer — el cliente Bitcoin ya lo sabe.\n\nComo las reglas están codificadas en el software, no hay margen para desacuerdos ni manipulaciones.",
        },
        {
          titulo: "Validación: solo pasan las transacciones legítimas",
          texto: "Gracias al protocolo, un nodo puede verificar cada transacción que recibe y solo reenviarla si todo está en orden. Si algo no cuadra, la transacción es rechazada y no se propaga.\n\nPor ejemplo, una regla básica es que una persona no puede enviar más bitcoins de los que tiene. Si alguien intenta hacerlo, todos los nodos de la red lo detectarán inmediatamente como inválido y lo rechazarán.\n\nComo cada nodo puede verificar toda la información por sí solo, no necesita confiar en ningún otro participante. Esto convierte a Bitcoin en un sistema sin necesidad de confianza (trustless).",
          imagen: { src: "/bootcamp/mod3-lec4/bitcoin-transaction-validation.png", alt: "Los nodos de Bitcoin validan transacciones según las reglas del protocolo" },
        },
        {
          titulo: "Dos tipos de transacciones que comparte un nodo",
          texto: "Los nodos comparten dos tipos de transacciones:\n\n• Transacciones frescas (fresh): nuevas, aún no confirmadas, que acaban de ser emitidas a la red.\n• Bloques de transacciones confirmadas: grupos de transacciones ya verificadas y añadidas permanentemente al registro.\n\n¿Qué es un bloque? Imagina que vas a una cafetería y cada visita genera un recibo (transacción). Después de varias visitas, juntas todos los recibos en un fajo. Ese fajo es un bloque. En Bitcoin, un bloque es un conjunto de transacciones empaquetadas juntas.",
          imagen: { src: "/bootcamp/mod3-lec4/fresh-vs-confirmed-transactions.png", alt: "Diferencia entre transacciones frescas y transacciones confirmadas en bloques" },
        },
        {
          titulo: "La blockchain: el ledger de transacciones confirmadas",
          texto: "Cada nodo también almacena todos los bloques de transacciones confirmadas. Estos bloques se encadenan unos a otros formando la blockchain.\n\n¿Qué es una cadena? Cada bloque nuevo se conecta al bloque anterior. Una vez conectado, es permanente: no se puede «desconectar». Las transacciones frescas circulan por la red hasta que son añadidas a la blockchain, convirtiéndose en transacciones confirmadas.\n\nNo existe una sola blockchain centralizada. Cada nodo tiene su propia copia. Todos los nodos se esfuerzan por mantenerse sincronizados entre sí.",
          imagen: { src: "/bootcamp/mod3-lec4/bitcoin-node-blockchain.png", alt: "Cada nodo Bitcoin almacena su propia copia de la blockchain" },
        },
        {
          titulo: "La resiliencia de la red: sin punto único de fallo",
          texto: "Como cada nodo tiene su propia copia de la blockchain, si un nodo (o varios) se desconectan, la red Bitcoin sigue funcionando sin problemas. Cuantos más nodos estén activos, más difícil es detener Bitcoin.\n\nSi un nodo se desconecta y vuelve, simplemente descarga la copia más reciente de la blockchain de sus vecinos y retoma su función.\n\nPara destruir Bitcoin habría que eliminar simultáneamente TODAS las copias de la blockchain en TODOS los nodos del mundo. Es prácticamente imposible.",
        },
        {
          titulo: "El siguiente paso: los mineros",
          texto: "Para que una transacción fresca pase a ser una transacción confirmada y sea añadida a la blockchain, tiene que pasar por un proceso llamado minería, realizado por un tipo especial de nodo conocido como minero.\n\nEntender cómo funciona la minería requiere antes entender otro concepto clave. En las próximas lecciones haremos ese recorrido paso a paso.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Un nodo Bitcoin (full node) es una computadora que ejecuta el software de Bitcoin de forma completa e independiente.",
            "Cada nodo cumple tres funciones: validar transacciones, propagarlas a otros nodos y almacenar la blockchain.",
            "El protocolo Bitcoin son las reglas codificadas en el software que todos los nodos deben seguir.",
            "Los nodos son autónomos: toman sus propias decisiones según el protocolo, sin necesitar instrucciones externas.",
            "Cualquier transacción que no cumpla las reglas es rechazada por todos los nodos automáticamente.",
            "Bitcoin es un sistema trustless: cada nodo verifica todo por sí solo, sin necesidad de confiar en nadie.",
            "Existen transacciones frescas (sin confirmar) y bloques de transacciones confirmadas que forman la blockchain.",
            "No hay una sola blockchain: cada nodo tiene su copia, lo que hace la red imposible de destruir con un solo ataque.",
            "Para añadir transacciones a la blockchain se necesita minería, realizada por nodos especiales llamados mineros.",
          ],
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo4 = [
    {
      id: "crypto-04-1",
      titulo: "¿Qué es el hashing?",
      resumen: "El hashing es el proceso matemático que convierte cualquier dato en una cadena de longitud fija llamada hash. Es uno de los conceptos más importantes de la criptografía y la piedra angular de cómo Bitcoin protege sus transacciones y su blockchain.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-hashing",
      contenido: [
        {
          titulo: "Un tipo de hash muy distinto",
          texto: "Cuando escuchas la palabra «hash» puedes pensar en hash browns o en ciertos concentrados vegetales. Pero en este contexto hablamos de algo completamente diferente: un concepto técnico fundamental para entender las criptomonedas.",
          imagen: { src: "/bootcamp/mod4-lec1/not-hashing.png", alt: "El hash del que hablamos no es ese" },
        },
        {
          titulo: "¿Qué es el hashing?",
          texto: "El hashing es un método de criptografía que convierte cualquier forma de datos en una cadena de texto única de longitud fija.\n\nLa criptografía es la práctica de proteger la comunicación frente a observadores externos. En la era digital, se usa para proteger datos e información informática. De ahí viene el «cripto» en criptomonedas.\n\nEl hashing es una parte fundamental de la criptografía y juega un papel enorme detrás del «cripto» en las criptomonedas.",
        },
        {
          titulo: "La función hash: de cualquier entrada a una salida fija",
          texto: "En términos simples, el hashing consiste en introducir texto de CUALQUIER longitud a través de una función hash, que produce una salida de longitud FIJA.\n\nCualquier dato puede ser «hasheado», sin importar su tamaño, tipo o longitud. El hash resultante siempre tendrá la misma longitud, independientemente del tamaño del dato original.",
          imagen: { src: "/bootcamp/mod4-lec1/hash-function.png", alt: "Diagrama de una función hash: entrada de cualquier longitud, salida de longitud fija" },
        },
        {
          titulo: "Ejemplo real: SHA-1",
          texto: "Usando la función hash SHA-1, independientemente de la longitud del dato introducido, la salida siempre tiene 40 caracteres exactos.\n\n• «Hello» → aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d\n• «BabyPips.com» → (40 caracteres)\n• «i» → (40 caracteres)\n\nLos tres producen salidas de la misma longitud aunque las entradas sean radicalmente distintas.",
          imagen: { src: "/bootcamp/mod4-lec1/hashing-example-hello.png", alt: "Ejemplo de hash SHA-1 con la palabra Hello" },
        },
        {
          titulo: "Los hashes son huellas digitales únicas",
          texto: "Un mismo dato siempre produce el mismo hash. Si pasas «Hello» un millón de veces por la función hash, obtendrás el mismo resultado un millón de veces.\n\nY si cambias aunque sea una letra — por ejemplo, de «Hello» a «hello» — el hash resultante será completamente diferente.\n\nPor eso se dice que los hashes son las huellas digitales de los datos: igual que tu huella dactilar es única para ti, un hash es único para un dato específico.",
          imagen: { src: "/bootcamp/mod4-lec1/fingerprint.png", alt: "Un hash es como una huella digital: único e irrepetible" },
        },
        {
          titulo: "Función de una sola vía: irreversible",
          texto: "Una función hash está diseñada para operar en un único sentido. Dado un hash, es imposible calcular cuál fue el dato original que lo produjo.\n\nEsto significa que si solo ves el hash, NO puedes descifrar la información original que representa. Los hashes son irreversibles.\n\nEsta propiedad es crucial: permite que los datos originales permanezcan seguros y desconocidos incluso si el hash es visible para todo el mundo.",
          imagen: { src: "/bootcamp/mod4-lec1/hashing-irreversible.png", alt: "Las funciones hash son de una sola vía: no se pueden revertir" },
        },
        {
          titulo: "SHA-256: la función hash de Bitcoin",
          texto: "Existen muchas funciones hash: MD5, SHA-1, SHA-2, SHA-3, entre otras. Para entender Bitcoin, la que necesitas conocer es SHA-256, perteneciente a la familia SHA-2.\n\nSHA-256 convierte cualquier texto en una cadena de 64 caracteres alfanuméricos, equivalente a 256 bits (de ahí el «256» en su nombre).\n\nNo importa si la entrada es una página de un libro o la enciclopedia entera: la salida siempre tendrá exactamente 64 caracteres. SHA-256 es la función hash usada en múltiples partes del sistema Bitcoin.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "El hashing convierte cualquier dato en una cadena de longitud fija llamada hash o digest.",
            "La función hash acepta entradas de cualquier tamaño pero siempre produce una salida del mismo tamaño.",
            "El mismo dato siempre produce el mismo hash — es determinista.",
            "Cambiar un solo carácter en la entrada produce un hash completamente diferente.",
            "Los hashes son huellas digitales: únicos e irrepetibles para cada dato.",
            "Las funciones hash son de una sola vía: no se puede calcular el dato original a partir del hash.",
            "SHA-256 es la función hash usada por Bitcoin y produce salidas de 64 caracteres alfanuméricos (256 bits).",
            "El hashing es la base de la criptografía moderna y el «cripto» en criptomonedas.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-04-2",
      titulo: "¿Cómo funciona el hashing?",
      resumen: "En esta lección exploramos el mecanismo interno del hashing: cómo cualquier dato se convierte en una cadena fija de caracteres, por qué un cambio mínimo produce un hash completamente distinto, y por qué es imposible revertir el proceso. Estos tres principios son los que hacen al hashing tan poderoso en Bitcoin.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-does-hashing-work",
      contenido: [
        {
          titulo: "El proceso: datos a binario a hash",
          texto: "El hashing es una operación matemática fácil de ejecutar pero extremadamente difícil de revertir.\n\nEl proceso ocurre en tres pasos:\n1. El dato de entrada se convierte a código binario (una secuencia de 0s y 1s).\n2. La función hash aplica un «revoltijo» secreto sobre esos números mediante un algoritmo criptográfico.\n3. El resultado es una cadena de 64 caracteres alfanuméricos — el hash.\n\nComo la fórmula de revoltijo es desconocida (está dentro del algoritmo), la cadena resultante no puede revertirse.",
          imagen: { src: "/bootcamp/mod4-lec2/hashing-concept.png", alt: "Concepto del hashing: del dato de entrada al hash de salida" },
        },
        {
          titulo: "¿Qué es una cadena (string)?",
          texto: "Una cadena (string) es simplemente una secuencia de caracteres: letras, números, espacios, signos de puntuación. Es básicamente cualquier texto.\n\nCuando introduces una cadena en la función hash, siempre obtendrás el mismo resultado. Si ejecutas esa misma cadena un millón de veces, obtendrás el mismo hash un millón de veces. Esta propiedad se llama determinismo.",
          imagen: { src: "/bootcamp/mod4-lec2/hashing-string.png", alt: "Una cadena de texto pasando por la función hash produce siempre el mismo resultado" },
        },
        {
          titulo: "El efecto avalancha: un cambio mínimo, hash totalmente distinto",
          texto: "Aquí viene una de las propiedades más importantes del hashing: si cambias aunque sea un solo carácter de la entrada — por ejemplo, cambiar el punto final de una frase por un signo de interrogación — el hash resultante será completamente diferente.\n\nEste comportamiento se llama efecto avalancha. Es crucial porque en las próximas lecciones verás cómo se usa para detectar cualquier manipulación de transacciones anteriores en la blockchain de Bitcoin.",
          imagen: { src: "/bootcamp/mod4-lec2/hashing-string-change.png", alt: "Un cambio mínimo en la entrada produce un hash totalmente diferente" },
        },
        {
          titulo: "Función de una sola vía: no hay vuelta atrás",
          texto: "La función hash solo funciona en una dirección. Dado un hash, es imposible calcular cuál fue la entrada original.\n\nNo puedes tomar el hash y hacer ingeniería inversa para descubrir qué dato lo generó. Si todo lo que tienes es el hash, no hay forma de saber cuál fue el input original. No se puede hackear ni revertir.",
          imagen: { src: "/bootcamp/mod4-lec2/hashing-one-way.png", alt: "La función hash es de una sola vía: no se puede revertir" },
        },
        {
          titulo: "Tamaño de salida fijo, sin importar el tamaño de entrada",
          texto: "La longitud del hash NO crece aunque la entrada sea más grande. Una función hash acepta datos de CUALQUIER tamaño y siempre devuelve una salida de longitud FIJA.\n\nSi introduces el texto completo de un libro de Harry Potter — más de 76.000 palabras — el hash de salida seguirá siendo exactamente 64 caracteres.\n\nEsto tiene una consecuencia poderosa: puedes saber al instante si un documento fue modificado simplemente comparando su hash antes y después, sin tener que revisar todo el contenido manualmente.",
          imagen: { src: "/bootcamp/mod4-lec2/hashing-harry-potter.png", alt: "Aunque la entrada tenga millones de palabras, el hash siempre tiene la misma longitud fija" },
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "El hashing convierte datos en binario y luego aplica un algoritmo para producir una cadena fija de caracteres.",
            "El proceso es fácil de ejecutar pero matemáticamente imposible de revertir.",
            "El hashing es determinista: el mismo input siempre produce el mismo output.",
            "Efecto avalancha: un cambio mínimo en la entrada produce un hash completamente diferente.",
            "La función hash es de una sola vía: dado el hash, es imposible recuperar el dato original.",
            "El tamaño del hash es siempre fijo, sin importar si la entrada es una letra o una enciclopedia entera.",
            "Esta propiedad permite detectar cualquier manipulación de datos con solo comparar hashes.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-04-3",
      titulo: "Ejemplos de hashing con SHA-256",
      resumen: "La mejor forma de entender el hashing es verlo en acción. En esta lección usamos SHA-256 — la función hash de Bitcoin — para demostrar sus propiedades clave con ejemplos reales: misma entrada, mismo hash; cambio mínimo, hash totalmente distinto.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/examples-of-hashing",
      contenido: [
        {
          titulo: "El hashing en acción",
          texto: "Ya sabes qué es el hashing y cómo funciona en teoría. Ahora es momento de verlo con ejemplos reales usando SHA-256, la función hash elegida por Bitcoin.",
          imagen: { src: "/bootcamp/mod4-lec3/hashing-in-action.png", alt: "Ve cómo funciona el hashing en acción" },
        },
        {
          titulo: "Ejemplo 1: «Ice is cool»",
          texto: 'Tomemos la frase "Ice is cool" y pasémosla por SHA-256. El resultado es:\n\n4a886de8ca97ff9e20359e5f2ba2f9b81e14e79e04d1a48b40a25a576a7e3c8a\n\nEl hash tiene exactamente 64 caracteres alfanuméricos. Parece completamente aleatorio — y esa es la idea. No hay ninguna pista en el hash que te diga cuál fue la entrada original.\n\nSi vuelves a pasar "Ice is cool" por SHA-256 un millón de veces, obtendrás siempre ese mismo hash. El hashing es determinista.',
        },
        {
          titulo: "Ejemplo 2: un solo carácter cambia todo",
          texto: 'Ahora hagamos un cambio mínimo: añadimos la letra "l" al inicio de "ice" para que diga "lice" (piojos). La frase es ahora "Lice is cool".\n\nEl nuevo hash SHA-256 es completamente diferente:\n\n9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08\n\nDos entradas prácticamente idénticas — solo un carácter de diferencia — producen hashes radicalmente distintos. Esto se llama efecto avalancha y es una propiedad fundamental del hashing criptográfico.',
          imagen: { src: "/bootcamp/mod4-lec3/lice-is-cool.png", alt: "Cambiar ice por lice produce un hash completamente diferente" },
        },
        {
          titulo: "Ejemplo 3: otra variación, otro hash distinto",
          texto: 'Hacemos un cambio más a la frase. El resultado vuelve a ser un hash de 64 caracteres completamente diferente a los dos anteriores.\n\nSin importar cuántas veces repitamos el experimento:\n• La misma entrada → siempre el mismo hash.\n• Entradas distintas → hashes distintos.\n• No existe ninguna forma de adivinar la entrada mirando el hash.\n\nCualquier tipo de dato puede entrar a la función hash — texto, números, archivos enteros — y el output siempre tendrá la misma longitud fija.',
        },
        {
          titulo: "Pruébalo tú mismo",
          texto: "Puedes experimentar con SHA-256 en cualquier generador de hashes online. Escribe cualquier texto y genera su hash. Luego cambia una sola letra y observa cómo el hash cambia por completo.\n\nEsta simple demostración deja claro por qué el hashing es tan poderoso: es prácticamente imposible manipular datos sin que el hash lo delate inmediatamente. En Bitcoin, esta propiedad protege cada transacción y cada bloque de la blockchain.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "SHA-256 es la función hash usada por Bitcoin y produce siempre 64 caracteres alfanuméricos.",
            "La misma entrada siempre produce el mismo hash — el hashing es determinista.",
            "El output parece aleatorio: no revela ninguna pista sobre la entrada original.",
            "Cambiar un solo carácter en la entrada produce un hash completamente diferente (efecto avalancha).",
            "Es imposible adivinar la entrada a partir del hash — la función es de una sola vía.",
            "Cualquier tipo y tamaño de dato produce siempre un hash de la misma longitud fija.",
            "Esta propiedad hace que cualquier manipulación de datos sea inmediatamente detectable.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-04-4",
      titulo: "¿Para qué sirve el hashing?",
      resumen: "El hashing no es solo un concepto teórico: lo usas todos los días sin saberlo. En esta lección verás dos usos clave del hashing en la vida real — verificar la integridad de mensajes y proteger contraseñas — y entenderás por qué estas mismas propiedades son fundamentales para Bitcoin.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-hashing-used-for",
      contenido: [
        {
          titulo: "El propósito principal del hashing: integridad de datos",
          texto: "La función principal del hashing es verificar la integridad de un dato: comprobar que no ha sido alterado sin autorización.\n\nComo el hash generado es ÚNICO para cada dato de entrada, actúa como una huella digital de ese dato. Esto lo hace muy útil para verificar que la información llegó intacta a través de canales inseguros como internet.\n\nSi el hash del dato recibido coincide con el hash del dato original, el contenido no fue modificado. Si difieren, algo cambió durante el tránsito.",
        },
        {
          titulo: "Ejemplo 1: verificar la integridad de un mensaje",
          texto: 'Imagina que vas a quedar con alguien para comer. Recordando el último encuentro, decides enviarle un mensaje: "Por favor usa desodorante."\n\nAntes de enviarlo, pasas ese texto por SHA-256 y obtienes su hash. Envías primero el hash, y luego el mensaje.\n\nAl recibirlo, el destinatario puede preguntarse: "¿Es este realmente el mensaje original, o fue interceptado y modificado en el camino?"',
          imagen: { src: "/bootcamp/mod4-lec4/body-odor.png", alt: "Ejemplo humorístico sobre verificar la integridad de un mensaje" },
        },
        {
          titulo: "Cómo se verifica el mensaje",
          texto: 'El receptor pasa el mensaje recibido por la misma función hash (SHA-256) y compara el hash resultante con el que recibió antes del mensaje.\n\nSi ambos hashes son idénticos, queda demostrado que:\n• El mensaje no fue alterado durante el tránsito.\n• El mensaje recibido es exactamente el que fue enviado.\n\nSi los hashes difieren, algo cambió — ya sea el mensaje o el hash fue interceptado. En la vida real, las computadoras hacen esta verificación automáticamente en milisegundos.',
          imagen: { src: "/bootcamp/mod4-lec4/armpit.png", alt: "Verificar la integridad del mensaje comparando hashes" },
        },
        {
          titulo: "Ejemplo 2: hashing de contraseñas",
          texto: "Probablemente uses el hashing varias veces al día sin saberlo: cada vez que inicias sesión en tu correo electrónico.\n\nCuando creas una contraseña, tu proveedor de email no guarda la contraseña tal como la escribiste. En su lugar, pasa la contraseña por una función hash y guarda únicamente el hash resultante.\n\nCada vez que intentas iniciar sesión, el sistema hashea la contraseña que introduces y la compara con el hash almacenado. Solo si ambos hashes coinciden se te concede el acceso.",
          imagen: { src: "/bootcamp/mod4-lec4/hashing-login-email.png", alt: "El inicio de sesión en email usa hashing para verificar contraseñas" },
        },
        {
          titulo: "¿Por qué no guardar la contraseña directamente?",
          texto: "Si los servidores guardaran las contraseñas en texto plano (sin hashear), un hacker que accediera al sistema podría robarlas todas directamente.",
          imagen: { src: "/bootcamp/mod4-lec4/password-plaintext.png", alt: "Guardar contraseñas en texto plano es peligroso" },
        },
        {
          titulo: "La solución: guardar solo el hash",
          texto: "Al guardar únicamente el hash de la contraseña, aunque un hacker entre al servidor solo encontrará hashes ilegibles — no las contraseñas reales.\n\nComo el hashing es irreversible, no pueden calcular la contraseña original a partir del hash. Y como el hash es único para cada contraseña, una contraseña incorrecta producirá un hash diferente y el acceso será denegado.\n\nEsta misma lógica se aplica en Bitcoin: el hashing protege las claves privadas y garantiza la integridad de cada bloque de la blockchain.",
          imagen: { src: "/bootcamp/mod4-lec4/password-hashed.png", alt: "Guardar solo el hash de la contraseña protege a los usuarios" },
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "El propósito principal del hashing es verificar la integridad de los datos: comprobar que no han sido alterados.",
            "El hash actúa como huella digital única de un dato — cualquier cambio produce un hash completamente diferente.",
            "Para verificar un mensaje: hashea el contenido recibido y compara con el hash original. Si coinciden, el dato es íntegro.",
            "Los proveedores de email guardan el hash de tu contraseña, no la contraseña real.",
            "Al iniciar sesión, el sistema hashea lo que escribes y lo compara con el hash almacenado.",
            "Una contraseña incorrecta produce un hash diferente → acceso denegado.",
            "Aunque un hacker robe la base de datos, solo obtiene hashes irreversibles — no las contraseñas.",
            "Estas mismas propiedades protegen las transacciones y los bloques en la blockchain de Bitcoin.",
          ],
        },
      ],
      imagenes: [],
    },
  ];

  return {
    ...mod,
    clases: mod.id === "crypto-01"
      ? clasesModulo1
      : mod.id === "crypto-02"
      ? clasesModulo2
      : mod.id === "crypto-03"
      ? clasesModulo3
      : mod.id === "crypto-04"
      ? clasesModulo4
      : Array.from({ length: mod.lessons }, (_, i) => ({
          id: `${mod.id}-${i + 1}`,
          titulo: `Clase ${i + 1}`,
          resumen: "Contenido de la lección pendiente por cargar.",
          estado: "Contenido pendiente",
        })),
  };
});
