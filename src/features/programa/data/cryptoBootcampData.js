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
          texto: "Puedes experimentar con SHA-256 directamente aquí. Escribe cualquier texto y genera su hash. Luego cambia una sola letra y observa cómo el hash cambia por completo.\n\nEsta simple demostración deja claro por qué el hashing es tan poderoso: es prácticamente imposible manipular datos sin que el hash lo delate inmediatamente. En Bitcoin, esta propiedad protege cada transacción y cada bloque de la blockchain.",
          componente: "SHA256Widget",
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

  const clasesModulo5 = [
    {
      id: "crypto-05-1",
      titulo: "¿Qué es la minería de Bitcoin?",
      resumen: "La minería es el proceso que confirma transacciones y las añade a la blockchain. En esta lección entenderás por qué la minería es necesaria para que el sistema Bitcoin funcione y cómo resuelve el problema del doble gasto.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-bitcoin-mining",
      contenido: [
        {
          titulo: "¿Qué es la minería en Bitcoin?",
          texto: "La «minería» es el proceso de confirmar transacciones y añadirlas a la blockchain.\n\nLos nodos que participan en la minería se conocen como mineros y forman una parte crítica de la red Bitcoin. Como parte del proceso de minería, se crean nuevos bitcoins, que se «pagan» a los mineros.\n\nUna buena forma de entender la minería es ver primero cómo funcionaría Bitcoin si NO tuviera minería.",
        },
        {
          titulo: "El archivo: la blockchain",
          texto: "Imagina que esto es un archivo. Está almacenado en un ordenador. Piénsalo como si fuera un documento de Word.\n\nLlamemos a este archivo la «blockchain».\n\nUna blockchain es un libro de contabilidad distribuido de «bloques». Cada bloque contiene un conjunto de transacciones.",
          imagen: { src: "/bootcamp/mod5-lec1/blockchain-file.png", alt: "Archivo llamado blockchain" },
        },
        {
          titulo: "La red de Bitcoin",
          texto: "Imagina que esto es la red Bitcoin.\n\nSon todos ordenadores conectados entre sí a través de internet, ejecutando el software de Bitcoin. Todos comparten una copia del mismo archivo: la blockchain.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-bitcoin-network-diagram.png", alt: "Imagina que esto es la red Bitcoin" },
        },
        {
          titulo: "Cómo funciona una transacción",
          texto: "Si quieres enviar un bitcoin a alguien, o transferir la propiedad de un bitcoin a otra persona, inicias una transacción.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-send-bitcoin.png", alt: "Minería de Bitcoin: Enviar Bitcoin" },
        },
        {
          titulo: "La transacción: una línea de datos",
          texto: "La transacción no es más que una línea de datos.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-transaction-line.png", alt: "Una transacción de Bitcoin es una línea de datos" },
        },
        {
          titulo: "La transacción llega a un nodo",
          texto: "Cuando inicias una transacción, se envía a un nodo de la red Bitcoin.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-transactio-sent-to-node.png", alt: "La transacción de Bitcoin se envía a un nodo" },
        },
        {
          titulo: "Sin minería: registro directo en la blockchain",
          texto: "Si Bitcoin NO tuviera minería, este ordenador registraría la transacción directamente en la blockchain, el archivo compartido.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-transaction-written-straight-to-blockchain.png", alt: "Transacción de Bitcoin escrita directamente en la blockchain" },
        },
        {
          titulo: "Propagación a los demás nodos",
          texto: "Luego, el ordenador pasaría la transacción a los otros nodos a los que está conectado, y ellos escribirían los datos de la transacción en su propio archivo.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-transaction-written-straight-to-blockchain-other-nodes.png", alt: "Transacción propagada a otros nodos de Bitcoin" },
        },
        {
          titulo: "Y así sucesivamente…",
          texto: "Esos nodos pasarían la transacción a todos los nodos a los que están conectados y también escribirían los datos en su propio archivo. Y así sucesivamente…\n\nEsto continuaría hasta que la transacción se hubiera propagado por TODA la red Bitcoin. Y todos los nodos la habrían escrito en su archivo.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-transaction-written-straight-to-blockchain-other-nodes-and-so-on.png", alt: "Los nodos de Bitcoin registran la transacción directamente en su blockchain" },
        },
        {
          titulo: "Un libro de contabilidad distribuido",
          texto: "Así tendríamos un archivo compartido o un «libro de contabilidad compartido» de transacciones: un «ledger distribuido».",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-transaction-written-straight-to-blockchain-fully-propogated.png", alt: "La transacción de Bitcoin se ha propagado por toda la red" },
        },
        {
          titulo: "La transacción se completa",
          texto: "Cuando todos los nodos han actualizado su copia del archivo, la propiedad del bitcoin habrá pasado de una persona a la siguiente.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-transaction-written-straight-to-blockchain-tx-completed.png", alt: "Todos los nodos de Bitcoin han actualizado su copia del archivo" },
        },
        {
          titulo: "El problema: el doble gasto",
          texto: "Pero hay un problema que necesita resolverse si se hiciera de esta manera.\n\nSupongamos que quieres vender tu bitcoin al personaje morado. Creas una transacción para enviarle el bitcoin y la envías al nodo de este lado de la red.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-purple-dude.png", alt: "Enviar bitcoin al personaje morado" },
        },
        {
          titulo: "El intento de doble gasto",
          texto: "Pero como eres del tipo pícaro, creas una SEGUNDA transacción que envía el MISMO bitcoin a una persona diferente: el personaje rojo (en el lado derecho). Luego envías esta transacción a otro nodo de la red.\n\n¡Acabas de insertar DOS transacciones separadas en la red que intentan gastar el MISMO bitcoin! Puedes hacer esto porque es una red de ordenadores ubicados en distintos lugares del mundo.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-purple-dude-send-to-node.png", alt: "Enviar la transacción de Bitcoin al nodo de este lado de la red" },
        },
        {
          titulo: "Dos transacciones, un mismo bitcoin",
          texto: "Las dos transacciones comienzan a propagarse por la red. Algunos nodos recibirán la transacción morada. Otros nodos recibirán la transacción roja.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-red-dude.png", alt: "Enviar el mismo bitcoin al personaje rojo" },
        },
        {
          titulo: "Un nodo rechaza la transacción conflictiva",
          texto: "Cuando un ordenador intenta pasar su transacción roja, este ordenador ya ha recibido la transacción morada que gasta ese mismo bitcoin, por lo que la rechazará.\n\nEso está bien, pero aquí está el problema: ahora tienes dos transacciones CONFLICTIVAS en la red.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-node-rejects-transaction-1.png", alt: "Un nodo de Bitcoin rechaza la transacción" },
        },
        {
          titulo: "El problema del doble gasto",
          texto: "Recuerda: todos los ordenadores de la red deben compartir el MISMO archivo exacto. Algunos tienen la transacción morada; otros, la roja. Todos deben elegir una.\n\nTODOS los ordenadores deben quedarse con la transacción roja O con la morada.\n\nSi Bitcoin funcionara así — escribiendo las transacciones directamente en el archivo — se crearía el problema del doble gasto.",
          imagen: { src: "/bootcamp/mod5-lec1/bitcoin-mining-conflicting-transactions.png", alt: "Transacciones conflictivas en la red Bitcoin" },
        },
        {
          titulo: "La minería es la solución",
          texto: "Bitcoin resuelve este problema de que no haya transacciones conflictivas escritas en la blockchain, el «archivo» compartido.\n\nY aquí es donde entra la minería.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "La minería es el proceso de confirmar transacciones y añadirlas a la blockchain.",
            "Los nodos que realizan minería se llaman mineros y son una parte crítica de la red Bitcoin.",
            "Como recompensa por minar, se crean nuevos bitcoins que se pagan a los mineros.",
            "Sin minería, las transacciones se escribirían directamente en la blockchain, creando el problema del doble gasto.",
            "El problema del doble gasto ocurre cuando alguien intenta gastar el mismo bitcoin en dos transacciones distintas al mismo tiempo.",
            "La minería es la solución de Bitcoin para evitar transacciones conflictivas en la blockchain.",
            "Todos los nodos de la red deben compartir exactamente el mismo archivo — la minería garantiza ese consenso.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-05-2",
      titulo: "¿Qué es un Mempool?",
      resumen: "Las transacciones de Bitcoin no se añaden directamente a la blockchain. Primero pasan por un área de espera llamada mempool (memory pool). En esta lección aprenderás cómo funciona el mempool y cómo resuelve el problema de las transacciones conflictivas.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-mempool",
      contenido: [
        {
          titulo: "¿Cuál transacción conservar?",
          texto: "Bitcoin responde a la pregunta: «¿Qué transacción conservar?»\n\nLa forma en que Bitcoin responde esta pregunta es brillante.\n\nAsí funciona…\n\nTodos los nodos de la red Bitcoin comparten información sobre nuevas transacciones.",
        },
        {
          titulo: "El área de espera: el mempool",
          texto: "Las transacciones realizadas en la red Bitcoin NO se añaden directamente a la blockchain. Primero se recopilan y almacenan en lo que se llama el «memory pool».\n\nTODO ordenador que ejecuta el programa Bitcoin crea un área de almacenamiento temporal para transacciones llamada «memory pool», también conocida como «mempool».\n\nA grandes rasgos, un mempool es una cola organizada donde las transacciones se almacenan y ordenan antes de ser añadidas a un bloque recién creado.",
        },
        {
          titulo: "Cada nodo tiene su propio mempool",
          texto: "Cada nodo de Bitcoin tiene su propio mempool, donde almacena la cola de transacciones que ha verificado y considera válidas.",
          imagen: { src: "/bootcamp/mod5-lec2/bitcoin-mining-mempool.png", alt: "Memory pool de un nodo de Bitcoin" },
        },
        {
          titulo: "Todos los nodos de Bitcoin tienen un mempool",
          texto: "Todos los nodos completos de la red Bitcoin tienen un memory pool.",
          imagen: { src: "/bootcamp/mod5-lec2/bitcoin-mining-mempool-all-nodes-1.png", alt: "Todos los nodos de Bitcoin tienen un memory pool" },
        },
        {
          titulo: "Mempool vs. Blockchain",
          puntos: [
            "El memory pool contiene transacciones «frescas» o no confirmadas (almacenadas como transacciones individuales).",
            "La blockchain contiene transacciones «archivadas» o confirmadas (empaquetadas en «bloques»).",
          ],
        },
        {
          titulo: "Las transacciones conflictivas entran al mempool",
          texto: "Supongamos que inicias una transacción en este lado de la red (transacción morada). Y luego, desde otro lado, usas el MISMO bitcoin e insertas la transacción roja en otro ordenador.\n\nEstas dos transacciones NO se escriben directamente en el archivo. Ambas se almacenan primero en el mempool de cada ordenador.",
          imagen: { src: "/bootcamp/mod5-lec2/bitcoin-mining-mempool-purple-transaction-1.png", alt: "Transacción morada en el mempool" },
        },
        {
          titulo: "Ambas transacciones se almacenan en el mempool",
          texto: "Ambas transacciones se propagarán por la red. Este ordenador rechazará la transacción roja porque ya recibió la morada.\n\nAhora AMBAS transacciones están en la red, pero NO están escritas en el archivo todavía, por lo que el archivo aún no ha sido actualizado.",
          imagen: { src: "/bootcamp/mod5-lec2/bitcoin-mining-mempool-stores-both-transactions.png", alt: "Ambas transacciones almacenadas en el mempool" },
        },
        {
          titulo: "Un nodo rechaza la transacción conflictiva",
          texto: "Este ordenador rechazará la transacción roja porque ya recibió la transacción morada.",
          imagen: { src: "/bootcamp/mod5-lec2/bitcoin-mining-node-rejects-transaction-from-mempool.png", alt: "La transacción es rechazada del mempool" },
        },
        {
          titulo: "Las transacciones esperan en el mempool",
          texto: "Lo que ocurrirá entonces es que todos estos ordenadores trabajarán e intentarán llevar sus transacciones desde su mempool al archivo.",
          imagen: { src: "/bootcamp/mod5-lec2/bitcoin-mining-transactions-in-mempool.png", alt: "Ambas transacciones esperando en el mempool" },
        },
        {
          titulo: "Los nodos compiten",
          texto: "Competirán para ser los primeros en conseguir que sus transacciones del mempool se añadan al archivo.",
          imagen: { src: "/bootcamp/mod5-lec2/bitcoin-mining-none-competes.png", alt: "Los nodos de Bitcoin compiten" },
        },
        {
          titulo: "El primer nodo en lograrlo",
          texto: "Supongamos que este ordenador (en amarillo) es el primero en conseguirlo.",
          imagen: { src: "/bootcamp/mod5-lec2/bitcoin-mining-none-is-first.png", alt: "El primer nodo de Bitcoin en añadir la transacción a la blockchain" },
        },
        {
          titulo: "La transacción se añade a la blockchain",
          texto: "Añade su transacción del mempool al archivo. Y cuando lo ha hecho…",
          imagen: { src: "/bootcamp/mod5-lec2/bitcoin-mining-none-adds-to-blockchain.png", alt: "El nodo de Bitcoin añade la transacción a la blockchain" },
        },
        {
          titulo: "El nodo comparte su copia actualizada",
          texto: "Pasará su copia actualizada del archivo a todos los demás nodos a los que está conectado, y ellos actualizarán sus copias.",
          imagen: { src: "/bootcamp/mod5-lec2/bitcoin-mining-node-shares-blockchain-copy.png", alt: "El nodo de Bitcoin comparte su copia de la blockchain" },
        },
        {
          titulo: "Se expulsa la transacción conflictiva",
          texto: "En este punto, este nodo recibe el archivo actualizado que contiene la transacción morada gastando el mismo bitcoin. ¿Qué pasa con la transacción roja conflictiva en su mempool?\n\nComo el mismo bitcoin ya ha sido gastado en la transacción morada, expulsará la transacción roja de su mempool.",
          imagen: { src: "/bootcamp/mod5-lec2/bitcoin-mining-node-kicks-out-conflicting-transaction.png", alt: "El nodo de Bitcoin expulsa la transacción conflictiva" },
        },
        {
          titulo: "Todos los nodos expulsan la transacción conflictiva",
          texto: "Este nodo pasará el archivo actualizado. Y los demás nodos harán lo mismo: expulsarán cualquier transacción conflictiva de su mempool.\n\nTodos los ordenadores tienen ahora el archivo actualizado.",
          imagen: { src: "/bootcamp/mod5-lec2/bitcoin-mining-node-kicks-out-conflicting-transaction-again.png", alt: "Todos los nodos de Bitcoin expulsan la transacción conflictiva" },
        },
        {
          titulo: "Transacción exitosa",
          texto: "Así es como se resuelve el problema de tener dos transacciones conflictivas en la red. En este ejemplo, el personaje morado recibiría el bitcoin.",
          imagen: { src: "/bootcamp/mod5-lec2/successful-bitcoin-transaction.png", alt: "La transacción de Bitcoin es exitosa" },
        },
        {
          titulo: "Transacción fallida",
          texto: "Pero cuando tu yo pícaro intenta gastar el mismo bitcoin con el personaje rojo, no va a funcionar.",
          imagen: { src: "/bootcamp/mod5-lec2/failed-bitcoin-transaction.png", alt: "La transacción de Bitcoin falla" },
        },
        {
          titulo: "La minería: la competencia por el mempool",
          texto: "Literalmente, solo tienes un «área de espera» (mempool) para transacciones pendientes y los nodos compiten e intentan añadir sus transacciones al archivo.\n\nEste proceso de nodos compitiendo para llevar sus transacciones del mempool al archivo (la «blockchain») se llama MINERÍA.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Las transacciones de Bitcoin NO se añaden directamente a la blockchain; primero van al mempool.",
            "El mempool (memory pool) es un área de almacenamiento temporal de transacciones no confirmadas.",
            "Cada nodo de Bitcoin tiene su propio mempool donde guarda transacciones válidas pendientes.",
            "El mempool contiene transacciones «frescas» (no confirmadas); la blockchain contiene transacciones «archivadas» (confirmadas).",
            "Las transacciones conflictivas (doble gasto) coexisten en el mempool hasta que un nodo las resuelve.",
            "Los nodos compiten para ser los primeros en añadir sus transacciones del mempool a la blockchain.",
            "Cuando una transacción es confirmada, los nodos expulsan cualquier transacción conflictiva de su mempool.",
            "Este proceso de competencia entre nodos para añadir transacciones al archivo se llama MINERÍA.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-05-3",
      titulo: "¿Qué es un minero de Bitcoin?",
      resumen: "Un minero de Bitcoin es un nodo especial que hace trabajo adicional: confirmar transacciones y crear nuevos bloques. En esta lección aprenderás qué distingue a un minero del resto de nodos, cómo funciona el hardware de minería y qué es un bloque candidato.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-bitcoin-miner",
      contenido: [
        {
          titulo: "¿Un minero de Bitcoin usa picos y palas?",
          texto: "¿Qué es un minero de Bitcoin?\n\n¿Involucra picos, palas o cuevas?\n\nPara nada.",
          imagen: { src: "/bootcamp/mod5-lec3/btc-miner.png", alt: "Minero de Bitcoin" },
        },
        {
          titulo: "Las transacciones conflictivas, de nuevo",
          texto: "Aquí tenemos de nuevo la red Bitcoin con las transacciones conflictivas del ejemplo de la lección anterior.\n\nAlgunos nodos contienen la transacción «morada» mientras que otros contienen la transacción «roja». Pero ambas transacciones intentan gastar el mismo bitcoin.\n\n¿Cómo llegan los ordenadores a un ACUERDO sobre cuál transacción es la legítima?\n\nAquí es donde entra la «minería».",
          imagen: { src: "/bootcamp/mod5-lec3/bitcoin-mining-which-is-legit-transaction.png", alt: "¿Cuál transacción de Bitcoin es la legítima?" },
        },
        {
          titulo: "Una mirada al interior de un nodo",
          texto: "Entremos dentro de este ordenador y echemos un vistazo más de cerca.",
          imagen: { src: "/bootcamp/mod5-lec3/bitcoin-mining-deeper-look.png", alt: "Vista interior de un nodo de Bitcoin" },
        },
        {
          titulo: "¿Qué es un minero de Bitcoin?",
          texto: "Este nodo es un «minero».\n\nUn nodo minero es un nodo completo de Bitcoin que realiza trabajo adicional confirmando transacciones.\n\nTodos los mineros son nodos, pero no todos los nodos son mineros. Un minero de Bitcoin no puede operar sin ejecutar un nodo, pero un nodo completo no es necesariamente un minero.\n\nMientras que un nodo completo recibe, almacena y transmite transacciones a otros nodos, un nodo minero hace lo mismo pero también intenta crear nuevos bloques de transacciones y luego intenta transmitirlos a otros nodos, que los aceptarán o rechazarán.",
        },
        {
          titulo: "Hardware especializado de minería",
          texto: "Como verás en la siguiente lección, debido a cómo funciona la «minería», un minero requiere el uso de hardware especializado.\n\nAquí tienes un ejemplo de una máquina minera:",
          imagen: { src: "/bootcamp/mod5-lec3/antminer-1.png", alt: "Antminer" },
        },
        {
          titulo: "¿Cómo «mina» un minero de Bitcoin?",
          texto: "Entremos más a fondo y echemos un vistazo al interior de un minero para ver cómo «mina» las transacciones del mempool hacia su archivo (la «blockchain»).",
          imagen: { src: "/bootcamp/mod5-lec3/bitcoin-mining-node-deeper-look.png", alt: "Vista más profunda del interior de un minero de Bitcoin" },
        },
        {
          titulo: "El mempool del minero: una transacción",
          texto: "Ahora estamos mirando dentro del mempool de un minero.\n\nTiene la transacción morada ahí dentro.",
          imagen: { src: "/bootcamp/mod5-lec3/bitcoin-miner-memory-pool-one-tx.png", alt: "Minero de Bitcoin con una transacción en el memory pool" },
        },
        {
          titulo: "El mempool del minero: varias transacciones",
          texto: "Pero con un mempool puedes tener más de una transacción. Así que imaginemos que hay más transacciones frescas.\n\nPor ejemplo, este mempool contiene cuatro transacciones. (En la realidad, un mempool puede contener miles.)",
          imagen: { src: "/bootcamp/mod5-lec3/bitcoin-miner-memory-pool-four-tx.png", alt: "Minero de Bitcoin con cuatro transacciones en el memory pool" },
        },
        {
          titulo: "¿Qué es un bloque candidato?",
          texto: "¿Qué hace el minero con todas estas transacciones en su mempool?\n\nCreará un contenedor llamado «bloque candidato», que es simplemente un contenedor para transacciones.\n\nPiensa en un bloque candidato como un bloque temporal creado a partir de transacciones seleccionadas del mempool. Se llama «candidato» porque todavía no es un bloque válido. Solo los bloques que han sido añadidos a la blockchain son bloques válidos.",
          imagen: { src: "/bootcamp/mod5-lec3/bitcoin-miner-candidate-block.png", alt: "El minero de Bitcoin crea un bloque candidato" },
        },
        {
          titulo: "Llenando el bloque candidato",
          texto: "Lo que hará este minero es llenar el bloque candidato con transacciones del mempool.",
          imagen: { src: "/bootcamp/mod5-lec3/bitcoin-miner-candidate-block-fill.png", alt: "Bitcoin llenará el bloque candidato" },
        },
        {
          titulo: "El bloque candidato está listo",
          texto: "Así…\n\nComo el espacio es limitado, solo un número limitado de transacciones puede incluirse en cada bloque. Los mineros tienen incentivos para priorizar las transacciones con las comisiones más altas.\n\nY luego intentará añadir este «bloque» de transacciones al archivo (la «blockchain»).",
          imagen: { src: "/bootcamp/mod5-lec3/bitcoin-miner-candidate-block-filled-with-tx.png", alt: "El minero de Bitcoin llena el bloque candidato con transacciones" },
        },
        {
          titulo: "¿Cómo se añade el bloque candidato a la blockchain?",
          texto: "¿Cómo consigue el bloque candidato ser añadido a la blockchain?\n\nEchemos un vistazo más de cerca al bloque candidato…",
          imagen: { src: "/bootcamp/mod5-lec3/bitcoin-miner-add-candidate-block-to-blockchain.png", alt: "¿Cómo se añade el bloque candidato a la blockchain?" },
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Un nodo minero es un nodo completo de Bitcoin que hace trabajo adicional: confirmar transacciones y crear nuevos bloques.",
            "Todos los mineros son nodos, pero no todos los nodos son mineros.",
            "Un nodo completo recibe, almacena y transmite transacciones; un minero hace todo eso y además intenta crear nuevos bloques.",
            "La minería requiere hardware especializado debido a cómo funciona el proceso.",
            "El minero recopila transacciones de su mempool y las mete en un «bloque candidato».",
            "Un bloque candidato es un bloque temporal que aún no es válido — solo lo es cuando se añade a la blockchain.",
            "El espacio en cada bloque es limitado, por lo que los mineros priorizan transacciones con comisiones más altas.",
            "El objetivo del minero es conseguir que su bloque candidato sea añadido a la blockchain.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-05-4",
      titulo: "¿Cómo funciona la minería de Bitcoin?",
      resumen: "En esta lección descubres el proceso completo de la minería: la anatomía del bloque candidato, el Block Header, el Merkle Root, el nonce, la dificultad de minería, la recompensa por bloque y cómo el Proof-of-Work garantiza el consenso de toda la red.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-bitcoin-mining-works",
      contenido: [
        {
          titulo: "¿Cómo funciona la minería de Bitcoin?",
          texto: "En la lección anterior aprendiste qué es un minero de Bitcoin, cómo almacena transacciones frescas en su mempool y cómo inicia el proceso de «minería» creando un bloque candidato.\n\nAhora veamos más de cerca ese bloque candidato…",
        },
        {
          titulo: "Las dos partes de un bloque candidato",
          texto: "Al igual que una persona puede dividirse en dos partes básicas — cabeza y cuerpo — un bloque candidato también tiene dos partes.\n\nSi miramos más de cerca un bloque candidato, en realidad NO contiene solo transacciones. Cuando el minero crea el bloque, incluye un «encabezado de bloque» (área amarilla). El «cuerpo» del bloque (área gris) contiene las transacciones.",
          imagen: { src: "/bootcamp/mod5-lec4/bitcoin-candidate-block-two-parts.png", alt: "Encabezado y cuerpo del bloque" },
        },
        {
          titulo: "Anatomía del bloque candidato",
          texto: "Los metadatos son datos que proporcionan información sobre otros datos. En este caso, los metadatos proporcionan información sobre el propio bloque. Esta información se conoce como el «encabezado del bloque» (Block Header).\n\nDentro del Block Header hay varios datos. Para esta lección, los vamos a simplificar.",
          imagen: { src: "/bootcamp/mod5-lec4/bitcoin-candidate-block-anatomy.png", alt: "Anatomía del bloque candidato" },
        },
        {
          titulo: "El Timestamp (marca de tiempo)",
          texto: "El primer dato dentro del Block Header es el «Timestamp» (marca de tiempo).\n\nEl timestamp indica cuándo fue creado el bloque.",
          imagen: { src: "/bootcamp/mod5-lec4/bitcoin-candidate-block-timestamp.png", alt: "Timestamp" },
        },
        {
          titulo: "El Hash del Bloque Anterior (Previous Block Hash)",
          texto: "El siguiente dato se llama «Previous Block» o, más específicamente, el «Previous Block Hash».\n\nEl Previous Block Hash es el hash del bloque anterior en la blockchain. Para entender qué significa esto, necesitamos echar un vistazo al archivo.",
          imagen: { src: "/bootcamp/mod5-lec4/bitcoin-candidate-block-previous-block-hash.png", alt: "Hash del bloque anterior" },
        },
        {
          titulo: "Mirando dentro de la blockchain",
          texto: "Ahora que miramos dentro del archivo, podemos ver que los datos están estructurados de una manera específica.",
          imagen: { src: "/bootcamp/mod5-lec4/look-inside-blockcahin.png", alt: "Vista del interior de la blockchain" },
        },
        {
          titulo: "La estructura de la blockchain",
          texto: "Visualicemos esto como la blockchain.\n\nEl bloque candidato que ha creado el minero debe añadirse encima del bloque más reciente.",
          imagen: { src: "/bootcamp/mod5-lec4/blockchain-structure.png", alt: "Vista del interior del archivo y la estructura de la blockchain" },
        },
        {
          titulo: "Añadir el bloque encima del más reciente",
          texto: "Digamos que el bloque más reciente es el de color azul.\n\nComo el Block Hash del bloque azul es el bloque más reciente del archivo (la «blockchain»), ese es el bloque sobre el que el minero quiere construir.",
          imagen: { src: "/bootcamp/mod5-lec4/add-block-top-of-blockchain.png", alt: "El bloque debe añadirse encima del bloque más reciente" },
        },
        {
          titulo: "El Block Hash: el ID del bloque",
          texto: "Piensa en el Block Hash como un número de identificación generado a medida para un bloque.\n\nLo que hará el minero es añadir este Block Hash como «Previous Block Hash» en el Block Header de SU PROPIO bloque candidato.",
          imagen: { src: "/bootcamp/mod5-lec4/most-recent-block-in-blockchain.png", alt: "El bloque más reciente en la blockchain" },
        },
        {
          titulo: "El Previous Block Hash en el bloque candidato",
          imagen: { src: "/bootcamp/mod5-lec4/block-hash-addedas-previousl-block-hash.png", alt: "El Block Hash se añade como Previous Block Hash del bloque candidato" },
        },
        {
          titulo: "El Resumen de Transacciones: el Merkle Root",
          texto: "El siguiente dato es lo que llamaré «Transaction Summary» Hash (hash de resumen de transacciones).\n\nComo su nombre indica, proporciona un «resumen» de todas las transacciones del bloque expresado como una cadena de caracteres.\n\nSin entrar en detalles, lo que ocurre es que todas las transacciones del bloque se introducen en una función hash y se hashean en un orden determinado, obteniendo un único hash.",
          imagen: { src: "/bootcamp/mod5-lec4/merkle-root-hash-function.png", alt: "Merkle Root" },
        },
        {
          titulo: "El Merkle Root como huella digital",
          texto: "Este hash es el que se usa como «Transaction Summary» Hash. Lo que proporciona este hash es una «huella digital» única basada en todas las transacciones incluidas en un bloque.\n\nEsto ayuda a garantizar que las transacciones no hayan sido manipuladas.\n\nEste «Transaction Summary» Hash se llama en realidad «Merkle Root».\n\nRecuerda: un cambio mínimo en los datos cambia el hash por completo. Si alguien intentara alterar cualquier transacción del bloque, el Merkle Root cambiaría completamente respecto al valor original en el Block Header, revelando la manipulación de inmediato.",
          imagen: { src: "/bootcamp/mod5-lec4/merkle-root-hash-1.png", alt: "Ejemplo de Merkle Root" },
        },
        {
          titulo: "El Merkle Root protege las transacciones",
          imagen: { src: "/bootcamp/mod5-lec4/transaction-hash-summary-as-fingerprint.png", alt: "El Merkle Root como huella digital" },
        },
        {
          titulo: "Ejecutar el Block Header por la función hash",
          texto: "Hasta ahora, el Block Header contiene tres datos: Timestamp, Previous Block Hash y Transaction Summary Hash (Merkle Root).\n\nEl siguiente paso es pasar estos datos del Block Header por una función hash. Esto producirá un número aleatorio llamado «Block Hash».\n\nAl igual que el Previous Block Hash mencionado antes, piensa en el Block Hash como un número de identificación generado a medida que se asignará al bloque candidato.",
          imagen: { src: "/bootcamp/mod5-lec4/run-block-header-through-hash-function.png", alt: "Ejecutar el block header por la función hash" },
        },
        {
          titulo: "El requisito: zeros al inicio",
          texto: "Para que el minero consiga añadir su bloque a la blockchain, debe encontrar un Block Hash que cumpla un cierto requisito.\n\nSi NO puede cumplir este requisito, el bloque NO será válido y el minero no podrá añadirlo.\n\nMás concretamente, el Block Hash debe ser un número que comience con una cierta cantidad de ceros.",
          imagen: { src: "/bootcamp/mod5-lec4/bitcoin-mining-process-no-nonce.png", alt: "Proceso de minería de Bitcoin sin nonce" },
        },
        {
          titulo: "La minería es como el baile del limbo",
          texto: "¿Cuántos ceros exactamente? Varía. El software del sistema Bitcoin determina el número mínimo de ceros con los que debe comenzar el Block Hash.\n\nOriginalmente, el requisito era un número pequeño de ceros, pero a medida que más mineros se unieron, el software de Bitcoin empezó a exigir más ceros.\n\nEsto es como el «baile del limbo»: cuanto más bajo es el umbral, más ceros se requieren, y más difícil es encontrar un Block Hash «correcto».\n\nEncontrar un valor que comience con tres ceros como «000123…» es mucho más difícil que encontrar uno con seis ceros como «000000123…».",
          imagen: { src: "/bootcamp/mod5-lec4/bitcoin-mining-like-limbo-dance.png", alt: "La minería de Bitcoin es como un baile del limbo" },
        },
        {
          titulo: "Ejemplo real de un Block Hash válido",
          texto: "Aquí tienes un ejemplo reciente de un Block Hash válido real:\n\n0000000000000000000586b367c292dfd274bf2e67575cf8b4d00735fc1df6ff\n\nFíjate en la cantidad de ceros con los que empieza.\n\nEsta «cierta cantidad de ceros» proviene de lo que se llama la «dificultad de minería». Se ajusta automáticamente hacia arriba o hacia abajo según el número de mineros: cuantos más ordenadores estén minando, mayor es la dificultad y más ceros se necesitan al inicio.",
        },
        {
          titulo: "El nonce: la pieza clave",
          texto: "Si el minero ejecuta el Block Header que ya contiene el Timestamp, el Previous Block Hash y el Transaction Summary Hash por la función hash de nuevo, siempre obtendrá el mismo resultado.\n\nEl minero necesita alterar los datos de alguna manera antes de intentar hashear el Block Header de nuevo. ¡Bitcoin lo permite!\n\nEn el Block Header hay un campo extra llamado «nonce» (caja azul claro). Es una parte especial del Block Header que los mineros pueden rellenar con cualquier número arbitrario.",
          imagen: { src: "/bootcamp/mod5-lec4/block-header-contains-nonce.png", alt: "El block header contiene un nonce" },
        },
        {
          titulo: "El nonce es como una cerradura de combinación",
          texto: "El nonce está completamente separado de las transacciones del bloque. Su único propósito es permitir a los mineros rellenarlo con un número y cambiarlo si el Block Hash no cumple el requisito de comenzar con un número determinado de ceros.\n\nUsando un nonce, el minero puede manipular la salida de la función hash para «adivinar» la salida deseada.\n\nPuedes pensar en este proceso como intentar encontrar la combinación de un candado. No hay atajos posibles: tienes que probar cada combinación posible hasta que, por casualidad, encuentres la correcta. ¡Tienes que adivinar una y otra vez hasta que tengas suerte!",
          imagen: { src: "/bootcamp/mod5-lec4/combination-lock.png", alt: "Candado de combinación" },
        },
        {
          titulo: "Nonce = 0: primer intento",
          texto: "Por ejemplo, supongamos que el Block Hash necesita comenzar con al menos cuatro ceros.\n\nLa única manera de encontrar un Block Hash con el número requerido de ceros iniciales es elegir aleatoriamente un valor de nonce y ejecutar el Block Header por la función hash.\n\nEn este escenario, el minero empieza con «0» como valor del nonce.",
          imagen: { src: "/bootcamp/mod5-lec4/nonce-at-zero.png", alt: "El nonce es 0" },
        },
        {
          titulo: "Nonce = 1: segundo intento",
          texto: "Si el resultado no es el deseado, el minero cambia el nonce y vuelve a intentarlo.\n\nComo el valor «0» no funcionó, el minero cambia el nonce a «1» y ejecuta el Block Header por la función hash de nuevo.\n\nEl Block Hash no empieza con ceros, por lo que tampoco funciona.",
          imagen: { src: "/bootcamp/mod5-lec4/nonce-changed-to-1.png", alt: "El nonce cambia a 1" },
        },
        {
          titulo: "Nonce = 2: ¡éxito!",
          texto: "El minero cambia el nonce a «2» y vuelve a ejecutar el Block Header por la función hash.\n\nEn este caso, el Block Hash comienza con cuatro ceros y cumple el criterio. ¡Resultado exitoso!\n\nComo puedes ver, es impredecible qué nonce producirá un Block Hash con el número correcto de ceros, por lo que el minero debe seguir probando nonces diferentes para encontrar el valor correcto.\n\nLos mineros pueden minar durante largos periodos sin garantía de encontrar nunca el nonce correcto. ¡La mayoría nunca lo encontrará!",
          imagen: { src: "/bootcamp/mod5-lec4/nonce-changed-to-2.png", alt: "El nonce cambia a 2" },
        },
        {
          titulo: "El proceso de minería completo",
          texto: "El nonce se usa como contador, cuyo valor se incrementa constantemente hasta que el minero encuentra el Block Hash correcto o lo hace otro minero.\n\n¡Es como un juego de adivinar números! Simplemente intentas encontrar un hash que comience con un cierto número de ceros cambiando el valor del nonce.\n\nCuanto más potentes sean sus ordenadores, más «intentos» pueden hacer. Este proceso de «adivinar» se conoce como minería.",
          imagen: { src: "/bootcamp/mod5-lec4/bitcoin-mining-process.png", alt: "Proceso de minería de Bitcoin" },
        },
        {
          titulo: "La recompensa por bloque",
          texto: "El minero «ganador» es recompensado con un número determinado de bitcoin (más comisiones de transacción) llamado «recompensa por bloque». Aproximadamente cada 10 minutos, un minero gana la recompensa por bloque.\n\nDebido a que los mineros dedican tanto tiempo y energía a «adivinar» el nonce correcto y confirmar transacciones en la blockchain de Bitcoin, el software de Bitcoin los recompensa con:\n\n• Bitcoin recién creado — Cuando un minero confirma transacciones y añade el bloque a la blockchain, se emiten nuevos bitcoins como pago. A partir del halving de abril de 2024, la recompensa es de 3.125 BTC por bloque. El próximo halving está previsto para abril de 2028, cuando la recompensa pasará a 1.5625 BTC.\n\n• Comisiones de transacción — Cuando las personas realizan transacciones con bitcoin, pagan una comisión al minero para incentivarle a confirmar su transacción.",
        },
        {
          titulo: "El hash rate",
          texto: "«Hash rate» indica la «potencia de adivinanza» de un ordenador de minería. Cuantos más hashes puedas adivinar por segundo, mayor es tu hash rate. Por ejemplo, 1 billón de intentos por segundo equivale a un hash rate de 1 terahash (TH/s).\n\nLa minería es un proceso monótono y repetitivo: toma un Block Header con el nonce, hashéalo, comprueba si el hash comienza con un número determinado de ceros, y si no, repite el proceso con un nonce diferente.\n\nAsí que cuando leas o escuches que la minería implica «resolver problemas matemáticos complejos», ya sabes que eso no es una descripción correcta. ¡No hay nada complejo en la minería! El proceso en sí es bastante simple: solo intentas adivinar un número correcto lo más rápido posible.",
        },
        {
          titulo: "El bloque se añade a la blockchain del minero",
          texto: "Una vez que el minero ha encontrado el nonce para generar un Block Hash que cumple los requisitos, el bloque se añade a su copia del archivo (la «blockchain»).\n\nRecuerda que el bloque azul era el más reciente en la blockchain del minero. Ya no lo es. Dado que el minero pudo adivinar el nonce correcto, pudo añadir su bloque a la blockchain (en verde).",
          imagen: { src: "/bootcamp/mod5-lec4/mined-block.png", alt: "Bloque añadido a la blockchain" },
        },
        {
          titulo: "La blockchain del minero queda actualizada",
          imagen: { src: "/bootcamp/mod5-lec4/bitcoin-node-blockchain-updated.png", alt: "La blockchain del minero se actualiza" },
        },
        {
          titulo: "El minero propaga el nuevo bloque",
          texto: "El nodo transmite este bloque a los nodos cercanos a los que está conectado directamente. Los nodos lo comprueban, lo verifican y se aseguran de que el Block Header produce un Block Hash que cumple los criterios.",
          imagen: { src: "/bootcamp/mod5-lec4/bitcoin-miner-propogates-new-block.png", alt: "El minero de Bitcoin propaga el nuevo bloque" },
        },
        {
          titulo: "Las transacciones conflictivas son expulsadas",
          texto: "Estos nodos actualizarán su archivo (la «blockchain») añadiendo el bloque. Todas las transacciones de sus mempools que forman parte del bloque ganador pasan de estado «fresco» (no confirmado) a «confirmado» y se añaden permanentemente al archivo. Cualquier transacción conflictiva será expulsada.\n\nGracias al proceso de minería, solo la transacción morada entrará en la blockchain.",
          imagen: { src: "/bootcamp/mod5-lec4/conflicting-transactions-kicked-out.png", alt: "La blockchain sincronizada en toda la red" },
        },
        {
          titulo: "Los nodos pasan el nuevo bloque",
          texto: "Estos nodos pasarán el bloque a otros nodos. Una vez que el nuevo bloque es aceptado por la mayoría de los mineros, todos los mineros empiezan de nuevo y crean un nuevo bloque candidato, y el proceso de minería se repite.",
          imagen: { src: "/bootcamp/mod5-lec4/bitcoin-nodes-pass-new-block.png", alt: "Los nodos pasan el nuevo bloque a otros nodos" },
        },
        {
          titulo: "El nuevo Block Hash como referencia",
          texto: "El Block Hash del bloque recién creado será utilizado por los mineros como «Previous Block Hash» en sus nuevos bloques candidatos. El Block Hash actúa como la «cadena».\n\nLos mineros deben incluir el Block Hash del bloque anterior en el nuevo bloque que están creando. Por ejemplo, para minar el bloque 101, los mineros necesitan conocer el hash del bloque 100. Hasta que el bloque 101 haya sido minado, el bloque 102 no puede minarse. Esto obliga a los mineros a centrarse en el bloque 101.",
          imagen: { src: "/bootcamp/mod5-lec4/new-block-hash.png", alt: "El bloque recién creado será utilizado por los mineros" },
        },
        {
          titulo: "Una cadena de bloques enlazados",
          texto: "Esto implica que cada bloque está enlazado con el anterior, y es lo que crea una «cadena de bloques» conocida como blockchain. Esta cadena de bloques no está unida por números de bloque, sino por hashes de bloque.\n\nSi alguien quisiera alterar una transacción en el bloque 80, tendría que rehacer todos los cálculos de los bloques 80 al 100 Y también hacer el bloque 101. ¡Son 21 bloques de costosos cálculos! No solo eso, sino que tendría que hacerlo todo antes de que los otros mineros en la red terminen el bloque actual. Esto es básicamente imposible.",
          imagen: { src: "/bootcamp/mod5-lec4/miners-include-new-block-hash.png", alt: "Los mineros incluyen el nuevo block hash en el nuevo bloque" },
        },
        {
          titulo: "Bitcoin como sistema completo (con minería)",
          imagen: { src: "/bootcamp/mod5-lec4/bitcoin-as-a-system-after-mining.png", alt: "Bitcoin como sistema (con minería añadida)" },
        },
        {
          titulo: "Proof-of-Work: el mecanismo de consenso",
          texto: "El proceso de minería se denomina a menudo «Proof-of-Work» o PoW.\n\nEl PoW es el «mecanismo de consenso» que Bitcoin utiliza para que todos los nodos estén de acuerdo en la copia «oficial» de la blockchain de Bitcoin. Es la forma en que Bitcoin puede llegar a un consenso sin necesidad de resolución de disputas ni intervención de una autoridad central.\n\nEl término «prueba de trabajo» hace referencia al hecho de que se necesita «trabajo» para encontrar un hash de bloque por debajo de cierto umbral. Y una vez que lo encuentras, cualquiera puede verificarlo, lo que proporciona la «prueba».",
        },
        {
          titulo: "El ajuste de dificultad",
          texto: "Si aumenta el número de mineros, el PoW se ajustará para que sea más difícil encontrar un hash de bloque válido. Si esa mayor dificultad desanima a demasiados mineros, la dificultad disminuirá.\n\nEste proceso, conocido como «ajuste de dificultad», ocurre aproximadamente cada dos semanas y garantiza que se añadan nuevos bloques a la blockchain aproximadamente cada 10 minutos, independientemente de cuántos mineros entren o salgan.\n\nEl ajuste de dificultad es importante porque garantiza que los mineros no puedan minar demasiado del suministro de bitcoin demasiado rápido.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Un bloque candidato tiene dos partes: el Block Header (metadatos) y el cuerpo (transacciones).",
            "El Block Header contiene: Timestamp, Previous Block Hash y Transaction Summary Hash (Merkle Root).",
            "El Merkle Root es la huella digital de todas las transacciones del bloque — cualquier alteración lo cambia por completo.",
            "El minero ejecuta el Block Header por una función hash para obtener el Block Hash.",
            "Para añadir el bloque a la blockchain, el Block Hash debe comenzar con un número determinado de ceros.",
            "El nonce es un número arbitrario en el Block Header que el minero puede cambiar libremente para obtener un Block Hash diferente.",
            "La minería consiste en probar nonces diferentes hasta encontrar uno que produzca un Block Hash con los ceros requeridos.",
            "El minero ganador recibe la recompensa por bloque: bitcoins recién creados más comisiones de transacción.",
            "Aproximadamente cada 10 minutos, un minero gana la recompensa por bloque.",
            "El hash rate es la «potencia de adivinanza» del hardware de minería: más hashes por segundo = mayor hash rate.",
            "Una vez minado, el bloque se propaga a la red; los nodos lo verifican y actualizan su blockchain.",
            "Las transacciones conflictivas son expulsadas del mempool cuando el bloque confirmado se añade.",
            "El Block Hash de cada bloque es el «Previous Block Hash» del siguiente — así se forma la cadena.",
            "Alterar una transacción pasada exigiría rehacer todos los bloques posteriores, lo que es computacionalmente imposible.",
            "Este proceso se llama Proof-of-Work (PoW): el mecanismo de consenso de Bitcoin.",
            "La dificultad de minería se ajusta cada ~2 semanas para mantener el ritmo de un bloque cada ~10 minutos.",
          ],
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo6 = [
    {
      id: "crypto-06-1",
      titulo: "¿Qué es una blockchain?",
      resumen: "Una blockchain es una forma completamente nueva de registrar datos en internet de manera que resulta imposible o extremadamente difícil modificarlos una vez guardados. En esta lección aprenderás qué es, cómo funciona, cómo la usa Bitcoin y en qué se diferencia de una base de datos distribuida.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-blockchain",
      contenido: [
        {
          titulo: "¿Qué es una blockchain?",
          texto: "Una «blockchain» o «tecnología blockchain» es una forma completamente nueva de registrar datos en internet de manera que resulta imposible o extremadamente difícil modificar esos datos una vez registrados.\n\nBitcoin, junto con otras criptomonedas, se basa en la tecnología blockchain para funcionar. Para entender las criptomonedas, necesitas entender la blockchain.\n\nUna blockchain es una base de datos descentralizada distribuida en una red peer-to-peer (P2P) que puede consultarse públicamente en tiempo real. Básicamente lleva un registro de quién posee qué.\n\nLa mayoría de las bases de datos normales tienen a alguien a cargo que puede escribir o cambiar las entradas. Una blockchain es un tipo diferente de base de datos porque nadie está a cargo. Cualquiera puede añadir nuevas entradas siempre que se sigan todas las reglas predefinidas. Pero una vez añadidos los datos, no pueden modificarse.",
        },
        {
          titulo: "Los datos se almacenan en «bloques»",
          texto: "En términos simples, una blockchain es un tipo especial de base de datos: una forma de almacenar información digital o «datos» en múltiples ordenadores de manera que resulta imposible modificarlos.\n\nEl tipo de datos registrados en una blockchain puede adoptar cualquier forma. Su uso más popular es registrar el historial de transacciones de criptomonedas.\n\nPor ejemplo, la blockchain de Bitcoin guarda los detalles de una transacción: la dirección del receptor, la dirección del emisor, la cantidad de bitcoins y cuándo ocurrió (conocido como «timestamp»).\n\nLo que la hace especial es cómo organiza los datos que almacena. Los datos en una blockchain se guardan en «bloques», que se añaden siguiendo un conjunto de reglas especiales (conocido como «mecanismo de consenso»). Estos bloques se enlazan en orden cronológico lineal… creando una «cadena de bloques» o «blockchain».",
        },
        {
          titulo: "Cómo se enlazan los bloques",
          texto: "Una colección de bloques (que contienen datos) enlazados en un orden específico representa la estructura de una blockchain.\n\nCada bloque usa dos elementos para «enlazarse» o «encadenarse» con el siguiente:\n\n1. Un hash: cadena única de letras y números que resume TODOS los datos de un bloque. Si los datos del bloque cambian, el hash también cambia.\n2. El hash del bloque anterior: cuando se añade un nuevo bloque a la blockchain, también contiene el hash del bloque anterior como parte de sus propios datos. Básicamente, un bloque no puede generar su propio hash sin incluir el hash del bloque que lo precedió. Esto es lo que crea la «cadena».\n\nUna vez creado un bloque, se genera un hash. El hash de un bloque es como una «huella digital» numérica que identifica el bloque y su contenido.",
        },
        {
          titulo: "La blockchain como torre vertical de bloques",
          texto: "Como los bloques se construyen «unos encima de otros», generalmente prefiero imaginar una blockchain en forma vertical, como una torre de bloques.",
          imagen: { src: "/bootcamp/mod6-lec1/blockchain-vertical-tower-of-blocks.png", alt: "La blockchain como una torre" },
        },
        {
          titulo: "La blockchain en forma horizontal",
          texto: "Pero para ahorrar espacio, giremos la blockchain en nuestra mente y veámosla en forma horizontal, como una torre de lado…",
          imagen: { src: "/bootcamp/mod6-lec1/blockchain-horiontal-tower-of-blocks.png", alt: "La blockchain como una torre de lado" },
        },
        {
          titulo: "La blockchain como un tren",
          texto: "O como un tren…\n\nAsí luce la blockchain:",
          imagen: { src: "/bootcamp/mod6-lec1/blockchain-as-a-train.png", alt: "La blockchain como un tren" },
        },
        {
          titulo: "Diagrama de la blockchain",
          texto: "Como puedes ver, cada bloque incluye una referencia al bloque que lo precede, y puedes seguir los enlaces hacia atrás desde el bloque más reciente hasta el primero (conocido como el «Bloque Génesis»).",
          imagen: { src: "/bootcamp/mod6-lec1/blockchain-diagram.png", alt: "La blockchain es una cadena de bloques" },
        },
        {
          titulo: "Solo se puede añadir — no modificar",
          texto: "Como los bloques se enlazan cronológicamente, una blockchain es «append-only» (solo se puede añadir): se pueden añadir nuevos datos, pero los datos existentes NO pueden modificarse ni eliminarse. Con una blockchain puedes añadir nuevos bloques, pero una vez añadido un bloque, es permanente.\n\nLa forma única en que los bloques están enlazados significa que alterar un bloque requeriría alterar todos los bloques anteriores también. Esto hace que sea (casi) imposible comprometer datos ya escritos.\n\nLa información en una blockchain se conoce como «inmutable». La inmutabilidad simplemente significa que la información es resistente a la manipulación.",
        },
        {
          titulo: "Descentralizada en una red P2P",
          texto: "Una blockchain está distribuida en una red P2P. Esto significa que ninguna persona o institución tiene el control de la red. En su lugar, ordenadores de todo el mundo (llamados «nodos») trabajan juntos para mantener la blockchain actualizada y precisa.\n\nPor eso es difícil cambiar los datos una vez registrados en una blockchain. Para cambiar los datos y que la blockchain alterada se convierta en la copia «oficial», tendrías que alterar TU copia de la blockchain almacenada en tu ordenador Y además conseguir que más de la mitad de todos los nodos de la red Bitcoin actualicen las suyas también. Decir que esto es casi imposible se queda corto.",
        },
        {
          titulo: "¿Cómo usa Bitcoin la blockchain?",
          texto: "Bitcoin fue la primera cripto en implementar con éxito la tecnología blockchain.\n\nSin internet no habría redes sociales. Y sin la blockchain no habría Bitcoin. El concepto de usar una blockchain para registrar transacciones fue creado para hacer posible Bitcoin.\n\nSatoshi Nakamoto creó la blockchain de Bitcoin para resolver dos problemas:\n\n1. En una red online donde los miembros pueden enviarse dinero digital entre sí, ¿cómo puedes asegurarte de que otros no dupliquen su dinero? Es decir, ¿cómo puede quien recibe dinero digital estar seguro de que no fue enviado simultáneamente a otra persona?\n2. En una red peer-to-peer donde los miembros no se conocen y NO se tienen confianza, ¿cómo pueden llegar a un acuerdo colectivo sobre una verdad específica? Es decir, ¿cómo pueden personas totalmente desconocidas llegar a un consenso sin depender de un tercero de confianza?",
        },
        {
          titulo: "Blockchain de Bitcoin: el libro de contabilidad distribuido",
          texto: "La blockchain de Bitcoin lleva un registro de la propiedad de todos los bitcoins. Esto garantiza que todos saben qué bitcoins pertenecen a quién.\n\nEn Bitcoin, cada «bloque» contiene datos sobre transacciones, que representan transferencias de bitcoin de una dirección a otra. Un «bloque» es simplemente un lote de transacciones confirmadas recientemente.\n\nSi piensas en la blockchain como un «libro» que almacena el registro de cada transacción ocurrida en la red Bitcoin, entonces un bloque es como una «página» que se añade a este «libro» cada vez que se mueven bitcoins de una dirección a otra.\n\nA esto se le llama «libro de contabilidad distribuido descentralizado»:\n• Un libro de contabilidad (ledger) es un registro secuencial de transacciones.\n• Un libro distribuido es un libro replicado y compartido entre múltiples participantes.\n• Un libro descentralizado es uno donde ninguna autoridad puede controlar lo que se escribe.",
        },
        {
          titulo: "Los nodos validan de forma independiente",
          texto: "Cada nodo de Bitcoin almacena una copia completa de la blockchain y los nodos se comunican entre sí para garantizar que todos estén al día con los últimos cambios.\n\nCuando se transmite una nueva transacción o se añade un nuevo bloque a la blockchain, los nodos retransmiten esa información a otros nodos.\n\nLos nodos no dependen de terceros de confianza para saber si las transacciones son válidas o no. En su lugar, validan de forma independiente las transacciones nuevas usando las reglas de la red Bitcoin. La mayoría de los nodos debe estar de acuerdo en cada transacción antes de que pueda añadirse a la blockchain.",
        },
        {
          titulo: "Blockchain vs. Bitcoin: no son lo mismo",
          texto: "Porque la blockchain y Bitcoin se inventaron juntos, a menudo se mencionan juntos, pero Bitcoin NO es blockchain.\n\nLa blockchain es la tecnología subyacente de Bitcoin. Es lo que hace posible Bitcoin (y otras criptomonedas).\n\nPiensa en Bitcoin como la inspiración para la blockchain. Cuando Bitcoin se lanzó en 2009, fue el primer ejemplo real de una blockchain usada en el mundo real.\n\nBitcoin no sería posible sin la tecnología blockchain, pero los dos son completamente diferentes. Mientras que Bitcoin fue el primero, ahora existen muchas otras criptomonedas con sus propias blockchains: Ethereum, Binance Smart Chain, Cardano, Cosmos, Solana, Polkadot y Avalanche.",
        },
        {
          titulo: "Blockchain vs. Libro de contabilidad distribuido",
          texto: "Los términos «blockchain» y «libro de contabilidad distribuido» (DLT) se usan a menudo indistintamente, pero no son lo mismo.\n\nUna blockchain se centra en cómo los datos están organizados y enlazados entre sí: los datos se almacenan en «bloques» y luego los bloques se «encadenan» en orden cronológico.\n\nUn libro de contabilidad distribuido (DLT) se centra en compartir el libro entre todos los miembros («nodos») de la red. El libro no reside en un solo lugar: se copia en nodos distribuidos geográficamente por todo el mundo.\n\nLos libros distribuidos no tienen que ser una blockchain para considerarse «distribuidos». Una blockchain es un tipo de DLT. Es solo un tipo de libro distribuido. Así que toda blockchain es un DLT, pero no todos los DLT son blockchains.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Una blockchain es una base de datos especial que almacena datos en «bloques» enlazados cronológicamente — una «cadena de bloques».",
            "Los datos en una blockchain son inmutables: una vez añadidos, no pueden modificarse ni eliminarse.",
            "Cada bloque contiene un hash propio y el hash del bloque anterior, lo que crea el «encadenamiento».",
            "Si se altera un bloque, su hash cambia, invalidando todos los bloques posteriores.",
            "La blockchain está distribuida en una red P2P: ninguna entidad la controla.",
            "Para alterar la blockchain «oficial» necesitarías el control de más del 50% de todos los nodos — casi imposible.",
            "Bitcoin fue la primera criptomoneda en implementar con éxito la tecnología blockchain.",
            "La blockchain de Bitcoin es un «libro de contabilidad distribuido descentralizado» de todas las transacciones.",
            "Cada nodo de Bitcoin guarda una copia completa de la blockchain y valida transacciones de forma independiente.",
            "Bitcoin y blockchain son cosas distintas: la blockchain es la tecnología subyacente que hace posible a Bitcoin.",
            "Toda blockchain es un DLT (Distributed Ledger Technology), pero no todo DLT es una blockchain.",
            "Satoshi Nakamoto nunca usó el término «blockchain» en su whitepaper — usó «block» y «chain» por separado.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-06-2",
      titulo: "¿Qué hace especial a la blockchain?",
      resumen: "Antes de la blockchain, cualquier dato importante necesitaba una autoridad central que lo controlara. Descubre cómo Satoshi Nakamoto revolucionó esto con un libro de contabilidad distribuido donde ninguna entidad tiene el control, y por qué esto es tan importante como la electricidad o internet.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-makes-blockchain-special",
      contenido: [
        {
          titulo: "¿Qué hace especial a la tecnología blockchain?",
          texto: "Preguntar qué tiene de especial la blockchain es como preguntar qué tiene de especial internet. O la electricidad. O la bombilla.\n\nEs así de especial.",
          imagen: { src: "/bootcamp/mod6-lec2/lightbulb.png", alt: "La blockchain, tan importante como la bombilla" },
        },
        {
          titulo: "El problema de los datos centralizados",
          texto: "Antes de la blockchain, si necesitabas almacenar datos importantes en un ordenador, necesitabas que alguien o alguna entidad POSEYERA y CONTROLARA esos datos. Eso significaba que era necesaria una autoridad central.\n\nPor ejemplo, el saldo de tu cuenta bancaria. El banco posee esos datos y controla cómo se actualizan.\n\nTu banco se asegura de que cada transacción sea válida y esté autorizada por el cliente cuyos fondos mueve. El banco nunca te dejará modificar su base de datos directamente, aunque lo pidas por favor.\n\nEl banco tiene que contratar personal de seguridad informática para proteger sus datos de hackers y otras personas no autorizadas.",
          imagen: { src: "/bootcamp/mod6-lec2/bank-security.png", alt: "El banco necesita seguridad informática para proteger sus datos" },
        },
        {
          titulo: "Un problema que viene de lejos",
          texto: "Incluso antes de los ordenadores, esto ya era un problema.\n\nPara llevar una cuenta o cualquier tipo de registro de transacciones, siempre era necesario designar a una persona o entidad como «autoridad central».\n\nEsta autoridad central era quien mantenía el LIBRO DE CONTABILIDAD (ledger), es decir, el registro de transacciones.\n\nAntigüamente, un libro de contabilidad era básicamente un trozo de papel o un cuaderno de cuero artesanal, actualizado a mano y guardado en un lugar seguro.",
          imagen: { src: "/bootcamp/mod6-lec2/book-ledger.png", alt: "Un libro como libro de contabilidad" },
        },
        {
          titulo: "Registros en papel",
          imagen: { src: "/bootcamp/mod6-lec2/paper-record.png", alt: "Registro de transacciones en papel" },
        },
        {
          titulo: "De papeles a bases de datos centralizadas",
          texto: "Una vez disponibles los ordenadores, el libro de contabilidad se trasladó a una base de datos almacenada en el disco duro de un ordenador central (con suerte, bien protegido).\n\nMás adelante, los informáticos se dieron cuenta de que probablemente no era buena idea tener la base de datos en un solo ordenador, porque si el disco duro fallaba o el ordenador se sobrecalentaba, los datos se perderían para siempre.\n\nAsí que la base de datos se REPLICÓ en varios ordenadores para mantener los datos seguros.\n\nPero incluso con múltiples copias, todas seguían dependiendo de la base de datos principal u «oficial», que seguía siendo propiedad de y estaba controlada por una autoridad central.\n\nEsto también significaba que si alguien conseguía hackear la base de datos principal u «oficial», podía manipular el libro de contabilidad y hacer cosas malas como… añadir ceros de más al saldo de su cuenta bancaria.\n\n**Este punto único de control es una gran debilidad de depender de una autoridad central.**\n\n¿Y si existiera una forma mejor? ¿Y si hubiera una manera de mantener un libro de contabilidad sin necesitar que un banco u otra autoridad central lo poseyera y controlara?",
        },
        {
          titulo: "La solución: tecnología blockchain",
          imagen: { src: "/bootcamp/mod6-lec2/blockcian-technology.png", alt: "Tecnología Blockchain" },
        },
        {
          titulo: "La solución de Satoshi: una red distribuida",
          texto: "Antes de que Satoshi Nakamoto ideara el concepto de blockchain, nadie había encontrado una solución para mantener un libro de contabilidad descentralizado.\n\n¡Pero el genio de Bitcoin lo resolvió!\n\nEn lugar de necesitar un «propietario» para la base de datos, su enfoque fue almacenar la base de datos en una red de ordenadores.\n\nUna red de ordenadores es simplemente un conjunto de ordenadores ubicados físicamente en distintos lugares del mundo que se comunican entre sí a través de internet.\n\nCada ordenador de la red almacena su PROPIA copia «oficial» de la base de datos.\n\nEso significa que no hay una copia «principal». ¡Cada copia de la base de datos ES la copia principal!\n\nDe aquí viene el concepto de «libro de contabilidad distribuido».\n\nLos ordenadores están físicamente ubicados en distintos lugares del mundo. Y cada ordenador guarda una copia del «libro de contabilidad» (la base de datos).",
          imagen: { src: "/bootcamp/mod6-lec2/peer-to-peer-network-of-computers.png", alt: "Red de ordenadores peer-to-peer en blockchain" },
        },
        {
          titulo: "Una red pública y distribuida",
          texto: "Los ordenadores comprueban y verifican las transacciones para asegurarse de que todas son legítimas antes de realizar cambios en la base de datos.\n\nCada vez que se realizan actualizaciones, la base de datos se comparte por toda la red para garantizar que todos los ordenadores mantienen la misma copia.\n\nLa parte «distribuida» viene del hecho de que los ordenadores están geográficamente distribuidos en distintas ubicaciones y se comunican entre sí en una red para asegurarse de que todos utilizan el mismo «libro de contabilidad» (base de datos).\n\nEsta base de datos también es PÚBLICA para que todos puedan consultarla en tiempo real, incluidos los cambios.",
          imagen: { src: "/bootcamp/mod6-lec2/computers-across-global-network.png", alt: "Ordenadores en una red global" },
        },
        {
          titulo: "Consenso en lugar de autoridad central",
          texto: "La blockchain eliminó la necesidad de una propiedad y control CENTRALIZADO de los datos digitales.\n\nEn lugar de depender de una «autoridad central» para decidir cuándo actualizar el libro de contabilidad, la blockchain se basa en el «consenso» entre todos los ordenadores de la red.\n\nLa forma en que los ordenadores llegan a un consenso se basa en un conjunto de reglas e instrucciones programadas llamado protocolo.\n\nEste protocolo funciona mediante una aplicación de software instalada en todos los ordenadores de la red.",
          imagen: { src: "/bootcamp/mod6-lec2/blockchain-software-protocol.png", alt: "Protocolo de software en blockchain" },
        },
        {
          titulo: "Autoridad vs. Consenso",
          texto: "Imagina cuándo tienes que tomar una decisión en grupo.\n\nUna forma de decidir es mediante la regla de «autoridad», donde una persona toma la decisión por todo el grupo.\n\nOtra forma es mediante «consenso», donde cada persona del grupo acepta apoyar la decisión.\n\nLa primera es cómo se mantenían y se hacían precisos los libros de contabilidad digitales o registros de transacciones («bases de datos») ANTES de la blockchain.\n\nLa segunda es el gran avance que logró la blockchain.\n\nImagina a miles de personas aleatorias (u ordenadores) que no se conocen entre sí y que no confían entre sí… todos acordando que un archivo con el historial de todas las transacciones es preciso… sin necesitar ningún tipo de intermediario de terceros para «verificar» su exactitud.",
        },
        {
          titulo: "El genio de la blockchain: eliminar al intermediario",
          texto: "El genio de la tecnología blockchain es que elimina al intermediario pero mantiene una infraestructura que permite que desconocidos traten entre sí.\n\nLo hace quitando el papel de «yo mantendré el libro de contabilidad» de autoridades centrales como los bancos y entregándolo a una red de ordenadores autónomos donde «todos tendremos una copia del libro de contabilidad y lo mantendremos juntos».\n\nEsta transferencia de control y toma de decisiones desde una entidad centralizada (individuo, organización o grupo) a una red distribuida crea un SISTEMA DESCENTRALIZADO DE CONFIANZA que opera fuera del control de cualquier institución.",
          imagen: { src: "/bootcamp/mod6-lec2/cut-out-middleman.png", alt: "La blockchain elimina al intermediario" },
        },
        {
          titulo: "Una tecnología de propósito general",
          texto: "La blockchain hace posible compartir y mantener un conjunto de datos (como un registro de transacciones) entre muchos ordenadores que no confían entre sí. Pero los datos en sí pueden considerarse precisos y fiables.\n\n¡Esto nunca se había logrado antes!\n\nLa tecnología blockchain es una tecnología tan transformadora que ahora se clasifica como una tecnología de propósito general, como la máquina de vapor, la electricidad, los ordenadores, internet y el selfie.\n\nAunque el ejemplo más famoso de la tecnología blockchain es Bitcoin, ahora se utiliza fuera de Bitcoin por otras criptomonedas.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Antes de la blockchain, cualquier dato digital importante necesitaba una autoridad central que lo poseyera y controlara.",
            "Este punto único de control era (y es) una gran debilidad: hackear la base de datos principal significaba poder manipular los registros.",
            "Satoshi Nakamoto resolvió esto almacenando la base de datos en una red de ordenadores distribuidos — sin propietario único.",
            "Cada ordenador de la red guarda su propia copia «oficial» de la base de datos: no hay copia «principal» — todas lo son.",
            "Esto es el «libro de contabilidad distribuido»: los datos se replican y comparten por toda la red en tiempo real.",
            "En lugar de una autoridad central que decida las actualizaciones, la blockchain usa el «consenso» entre todos los ordenadores.",
            "Las reglas de consenso están programadas en un protocolo de software instalado en todos los nodos de la red.",
            "El genio de la blockchain: elimina al intermediario pero mantiene la confianza entre desconocidos.",
            "La blockchain transfiere el control de entidades centralizadas a redes distribuidas, creando un sistema descentralizado de confianza.",
            "La tecnología blockchain es ahora una tecnología de propósito general, comparable en impacto a la electricidad o internet.",
            "Aunque Bitcoin es su ejemplo más famoso, la blockchain se usa en muchas otras criptomonedas y aplicaciones.",
          ],
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo7 = [
    {
      id: "crypto-07-1",
      titulo: "¿Qué es una wallet de Bitcoin?",
      resumen: "Una wallet de Bitcoin es un dispositivo o programa que interactúa con la blockchain de Bitcoin. Aprende qué son las claves privadas, públicas y las direcciones, y cómo se relacionan entre sí.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-bitcoin-wallet",
      contenido: [
        {
          titulo: "¿Qué es una wallet de Bitcoin?",
          texto: "A diferencia de una cartera en el mundo real que guarda tu efectivo, una wallet de Bitcoin NO guarda realmente tus bitcoins.\n\nEn cambio, una wallet de Bitcoin es un dispositivo físico o programa de software que interactúa con la blockchain de Bitcoin proporcionando la información necesaria para crear transacciones.\n\nUn dato clave se llama \"dirección de wallet\" o simplemente \"dirección\". Las transacciones de Bitcoin se describen como la transferencia de bitcoins de una dirección a otra.",
          imagen: { src: "/bootcamp/mod7-lec1/bitcoin-wallet-holds-private-key.png", alt: "La wallet de Bitcoin guarda la clave privada" },
        },
        {
          titulo: "¿Qué son la clave privada, la clave pública y la dirección?",
          texto: "Para enviar y recibir dinero online normalmente necesitas un \"número de cuenta\" y una \"contraseña\". En el mundo Bitcoin esto se llama \"clave pública\" y \"clave privada\".\n\nBitcoin usa un sistema de dos claves: la clave pública te permite RECIBIR bitcoins, mientras que la clave privada es necesaria para ENVIAR bitcoins.",
          imagen: { src: "/bootcamp/mod7-lec1/public-and-private-key.png", alt: "Clave pública y clave privada" },
        },
        {
          titulo: "Clave Privada",
          texto: "La \"clave privada\" es un número secreto único que solo tú conoces. Se usa para \"firmar\" transacciones. Estas \"firmas digitales\" son necesarias para enviar bitcoin.\n\nPiénsala como una contraseña que te da la capacidad de probar la propiedad y gastar los bitcoins asociados a tu dirección. NUNCA, bajo ninguna circunstancia, compartas tu(s) clave(s) privada(s) con ninguna otra persona.",
          imagen: { src: "/bootcamp/mod7-lec1/private-key-is-random-number.png", alt: "La clave privada es un número aleatorio" },
        },
        {
          titulo: "Clave Pública",
          texto: "Tu clave pública se DERIVA de tu clave privada. Aunque la clave pública se crea a partir de la privada, no puedes hacer el proceso inverso para averiguar la clave privada.\n\nEsto es gracias a un algoritmo basado en la criptografía de curva elíptica (ECC), que impide deducir la clave privada aunque conozcas la pública. Tu clave privada está protegida por matemáticas muy serias.",
          imagen: { src: "/bootcamp/mod7-lec1/publick-key-derived-form-private-key.png", alt: "La clave pública se deriva de la clave privada" },
        },
        {
          titulo: "Dirección",
          texto: "La \"clave pública\" es un número extremadamente largo, por lo que se usa en su lugar una versión acortada llamada \"dirección\".\n\nUna dirección de Bitcoin es una cadena de 26 a 35 caracteres alfanuméricos que comienza con el número 1, 3 o \"bc\". También puede mostrarse como un código QR.\n\nCuando quieres enviar bitcoins a un amigo, le pides su \"dirección de Bitcoin\". Puede compartirse libremente con el público.",
          imagen: { src: "/bootcamp/mod7-lec1/address-publick-key.png", alt: "Dirección derivada de la clave pública" },
        },
        {
          titulo: "Código QR y dirección de wallet",
          texto: "Un código QR (Quick Response) es una representación gráfica de la dirección que puede ser leída por la cámara de tu teléfono móvil. Es la forma más cómoda de compartir tu dirección en persona.",
          imagen: { src: "/bootcamp/mod7-lec1/publick-key-qr-code.png", alt: "Código QR de la clave pública" },
        },
        {
          titulo: "¿De dónde vienen las claves y las direcciones?",
          texto: "Todo comienza con la clave privada, que es simplemente un número generado aleatoriamente. Este número largo se acorta convirtiéndolo a formato hexadecimal.\n\nEl sistema hexadecimal usa 16 dígitos posibles (0-9 y A-F) en lugar de los 10 habituales. Una clave privada puede ser cualquier número entre 1 y 115.792.089.237.316.195.423.570.985.008.687.907.852.837.564.279.074.904.382.605.163.141.518.161.494.337.",
          imagen: { src: "/bootcamp/mod7-lec1/hexadecimal.png", alt: "Sistema hexadecimal" },
        },
        {
          titulo: "Relación entre claves y direcciones",
          texto: "La clave privada y la clave pública están matemáticamente vinculadas. Es muy fácil producir una clave pública a partir de una clave privada, pero es prácticamente imposible producir la clave privada a partir de la clave pública.",
          imagen: { src: "/bootcamp/mod7-lec1/relationship-between-keys-and-addresses.png", alt: "Relación entre claves y direcciones" },
        },
        {
          titulo: "Proceso de generación de claves",
          imagen: { src: "/bootcamp/mod7-lec1/key-generation-process.png", alt: "Proceso de generación de claves" },
        },
        {
          titulo: "¿Qué pasa si pierdes tu clave privada?",
          texto: "Si alguien roba tu clave privada, no hay forma de probar que los bitcoins son tuyos. La persona que conoce la clave privada controla los fondos en una dirección de wallet.",
          imagen: { src: "/bootcamp/mod7-lec1/you-are-responsible-for-private-key.png", alt: "Eres responsable de tu clave privada" },
        },
        {
          titulo: "Resumen",
          puntos: [
            "Tu clave pública es como tu \"número de cuenta\".",
            "Tu dirección es una versión más corta de tu número de cuenta. Es la que das a la gente para que te envíen bitcoin.",
            "Tu clave privada es como tu \"contraseña\" que prueba la propiedad de los bitcoins asociados a una dirección.",
            "El remitente necesita la dirección del destinatario para enviar bitcoins. Una vez que los bitcoins están en la dirección del destinatario, podrá gastarlos con su clave privada.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-07-2",
      titulo: "¿Qué es una frase semilla (seed phrase)?",
      resumen: "La frase semilla te da la capacidad de generar un número casi ilimitado de claves privadas a partir de una 'clave privada maestra'. Aprende por qué es crucial mantenerla secreta y segura.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-seed-phrase",
      contenido: [
        {
          titulo: "¿Qué es una frase semilla?",
          texto: "En los primeros días de Bitcoin, una wallet solo generaba una clave privada. Hoy en día, las wallets cripto te dan la capacidad de generar un número casi ilimitado de claves privadas a partir de una \"clave privada maestra\".\n\nEste tipo de wallet se conoce como \"wallet Determinística Jerárquica\" o simplemente \"HD wallet\".",
          imagen: { src: "/bootcamp/mod7-lec2/deterministic-wallet.png", alt: "Wallet determinística jerárquica" },
        },
        {
          titulo: "¿Cómo funciona la frase semilla?",
          texto: "Cuando configuras por primera vez una wallet de Bitcoin, se te mostrará una serie de 12 a 24 palabras aparentemente aleatorias. No solo las palabras en sí son importantes, sino también el orden de las palabras.\n\nEsta serie de palabras listadas en un orden específico es la \"frase semilla\" de la wallet.",
          imagen: { src: "/bootcamp/mod7-lec2/seed-phrase.png", alt: "Frase semilla" },
        },
        {
          titulo: "Ejemplo de frase semilla",
          imagen: { src: "/bootcamp/mod7-lec2/seed-phrase-example.png", alt: "Ejemplo de frase semilla" },
        },
        {
          titulo: "Otros nombres para la frase semilla",
          texto: "Dependiendo de la wallet, una frase semilla puede tener otros nombres como:",
          puntos: [
            "frase de recuperación",
            "frase mnemónica",
            "frase secreta",
            "semilla mnemónica",
            "frase semilla mnemónica",
            "clave semilla",
            "semilla de wallet",
            "frase de recuperación secreta",
          ],
        },
        {
          titulo: "¿Cómo funciona internamente?",
          texto: "Las palabras se eligen de una lista definida de 2.048 palabras. La razón por la que la frase semilla es una serie de palabras en lugar de una contraseña numérica es que los números largos son difíciles de recordar y escribir.\n\nInternamente, esta serie de palabras se convierte en una cadena de dígitos llamada \"semilla\". Esta \"semilla\" genera la clave privada maestra, que a su vez genera las claves \"hijas\".",
        },
        {
          titulo: "¡Escribe tu frase semilla y guárdala en un lugar seguro!",
          texto: "Cuando el software de tu wallet genere una frase semilla, normalmente te indicará que la anotes en papel. Escribe tu frase semilla y guárdala en un lugar seguro. Para mayor seguridad, anótala en varios papeles y guarda cada uno en lugares diferentes.\n\nNunca tomes una captura de pantalla de tu frase semilla ni la guardes en un medio digital como un documento de Word/Google, email o mensaje de texto.",
          imagen: { src: "/bootcamp/mod7-lec2/safe-box.png", alt: "Guarda tu frase semilla en un lugar seguro" },
        },
        {
          titulo: "No compartas tu frase semilla",
          texto: "Mantén tu frase semilla privada. ¡No la compartas con otros! Cualquier persona con tu frase semilla tendrá acceso a tu wallet y a todos sus fondos. Si alguien te pide tu frase semilla, probablemente está intentando estafarte.",
          imagen: { src: "/bootcamp/mod7-lec2/sharing-seed-phrase-1.png", alt: "Nunca compartas tu frase semilla" },
        },
        {
          titulo: "¿Qué pasa si pierdes tu frase semilla?",
          texto: "Piensa en tu frase semilla como una contraseña especial. Es la ÚNICA forma de acceder a tu wallet. Si tu wallet se pierde, elimina, corrompe, rompe o destruye, tu frase semilla es lo único que puede restaurar y recuperar tu wallet.\n\nSin tu frase semilla, pierdes el acceso a tu cripto para siempre.",
          imagen: { src: "/bootcamp/mod7-lec2/lost-seed-phrase.png", alt: "Si pierdes tu frase semilla, pierdes tus fondos" },
        },
        {
          titulo: "¿Es posible que alguien adivine tu frase semilla?",
          texto: "Una frase semilla de 12 palabras tiene 777.788.267.247.859.345.059.141.959.844.041.626.185 combinaciones posibles. La probabilidad de que alguien adivine tu frase semilla es básicamente cero.",
          imagen: { src: "/bootcamp/mod7-lec2/guess-seed-phrase.png", alt: "Es prácticamente imposible adivinar una frase semilla" },
        },
        {
          titulo: "¿Cuál es la diferencia entre una frase semilla y una clave privada?",
          texto: "Cuando creas tu wallet, genera una frase semilla. La frase semilla genera una clave privada maestra. Y esta clave privada maestra puede crear un número casi ilimitado de claves privadas.\n\nSi piensas en cada clave privada como una \"contraseña\" que te permite enviar o gastar bitcoin, entonces la frase semilla actúa como una \"contraseña maestra\". Mientras conozcas la \"contraseña maestra\" (frase semilla), tienes acceso a TODAS las claves privadas de la wallet.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-07-3",
      titulo: "¿Por qué se necesitan las wallets de Bitcoin?",
      resumen: "Una wallet de Bitcoin da a las personas comunes la capacidad de realizar transacciones sin permiso sin involucrar a terceros. Descubre por qué son necesarias.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/why-bitcoin-wallets-are-needed",
      contenido: [
        {
          titulo: "El problema con el sistema bancario tradicional",
          texto: "Para entender por qué se necesitan las wallets de Bitcoin, necesitamos ver el enfoque tradicional de mover dinero entre dos personas usando cuentas bancarias.\n\nPara llevar el registro del dinero de cada cliente, un banco crea un libro mayor que registra los saldos basándose en números de cuenta. Este libro mayor es mantenido por un administrador que asigna números de cuenta a los clientes.",
          imagen: { src: "/bootcamp/mod7-lec3/bank-administrator.png", alt: "El administrador del banco controla las cuentas" },
        },
        {
          titulo: "El problema de la centralización",
          texto: "Para una moneda digital descentralizada como Bitcoin, depender de un administrador crea el problema de la centralización. ¡No tienes el control de tu cuenta! El administrador sí.\n\nUn administrador puede denegar el acceso a tu cuenta, bloquear o censurar transacciones, o incluso no permitirte abrir una cuenta en absoluto.",
          imagen: { src: "/bootcamp/mod7-lec3/transaction-denied.png", alt: "Transacción denegada por el banco" },
        },
        {
          titulo: "La solución: eliminar al administrador",
          texto: "Para que una moneda digital descentralizada funcione, cualquier persona debería poder abrir una \"cuenta\" y poder realizar transacciones con quien quiera. No deberías tener que pedir permiso.\n\nLa solución de Bitcoin: en lugar de números de cuenta, usa \"direcciones\".",
          imagen: { src: "/bootcamp/mod7-lec3/remove-bank-administrator.png", alt: "Eliminar al administrador bancario" },
        },
        {
          titulo: "Cómo las wallets hacen Bitcoin sin permisos",
          texto: "Al usar direcciones en lugar de números de cuenta, CUALQUIER persona puede crear sus propias \"cuentas\" con un software de wallet en su propio ordenador sin tener que pedirle un número de cuenta a un administrador.\n\nEl uso de direcciones, que una wallet crea para ti de forma gratuita, permite que Bitcoin sea sin permisos. Esto significa que los usuarios de Bitcoin no necesitan permiso de nadie para poder unirse a la red Bitcoin.",
          imagen: { src: "/bootcamp/mod7-lec3/mobile-crypto-wallet.png", alt: "Wallet móvil de cripto" },
        },
        {
          titulo: "Inclusión financiera",
          texto: "Las wallets también hacen que Bitcoin (y otras criptos) sean más accesibles para más personas. Mientras tengas una conexión a internet, puedes descargar una app de wallet, instalarla, crear una dirección de Bitcoin y ya estás listo.\n\nLa cripto mejora la inclusión financiera, proporcionando acceso más fácil a productos y servicios financieros útiles y asequibles a más de 1.700 millones de personas que permanecen sin acceso o con acceso limitado a la banca.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-07-4",
      titulo: "¿Cuáles son los diferentes tipos de wallets de Bitcoin?",
      resumen: "Existen múltiples wallets de Bitcoin disponibles que puedes usar. Aprende los diferentes tipos clasificados por medio, conectividad y custodia.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-are-different-types-of-bitcoin-wallets",
      contenido: [
        {
          titulo: "Tipos de wallets de Bitcoin",
          texto: "Existen múltiples wallets de Bitcoin disponibles. Para que sea más fácil de entender, clasifico cada \"tipo\" de wallet cripto en tres grupos:\n- Medio: ¿En qué tipo de medio se almacena la wallet?\n- Conectividad: ¿Está la wallet conectada a internet?\n- Custodia: ¿Quién tiene acceso y, por lo tanto, control de las claves privadas de la wallet?",
          imagen: { src: "/bootcamp/mod7-lec4/bitcoin-wallets-types-by-medium.png", alt: "Tipos de wallets de Bitcoin por medio" },
        },
        {
          titulo: "Wallets de Software",
          texto: "Una wallet de software es un programa de computadora o aplicación móvil que guarda claves privadas online. Se conecta a la red Bitcoin a través de nodos completos de confianza, servicios centralizados o siendo ellas mismas nodos completos.\n\nHay tres tipos: wallets de escritorio, wallets móviles y wallets basadas en web (extensiones de navegador).",
          imagen: { src: "/bootcamp/mod7-lec4/crypto-software-wallet.png", alt: "Wallet de software cripto" },
        },
        {
          titulo: "Wallets de Hardware",
          texto: "Una wallet de hardware es un pequeño dispositivo físico portátil (similar a una memoria USB) que mantiene tus claves privadas aisladas de internet en todo momento.\n\nPara realizar transacciones, se requiere una computadora y la aplicación del fabricante para autorizar (o \"firmar\") la transacción. Proporcionan una capa extra de seguridad respecto a las wallets de software.",
          imagen: { src: "/bootcamp/mod7-lec4/ledger-hardware-wallet.webp", alt: "Wallet de hardware Ledger" },
        },
        {
          titulo: "Wallets de Papel",
          texto: "Una wallet de papel es literalmente un trozo de papel con tu dirección y clave privada impresas o escritas en él. Se crean descargando software, ejecutándolo sin conexión a internet para generar un par de clave pública/privada que luego se imprime.",
          imagen: { src: "/bootcamp/mod7-lec4/bitcoin-paper-wallet.png", alt: "Wallet de papel de Bitcoin" },
        },
        {
          titulo: "Wallets de Cerebro (Brain Wallets)",
          texto: "Una wallet de cerebro se refiere a una clave privada almacenada en la memoria del usuario en forma de una frase semilla (una secuencia de 12 a 24 palabras). Es similar a una wallet de papel, excepto que nada está escrito en papel: todo está almacenado en la memoria.\n\nSi alguna vez has olvidado una contraseña, una wallet de cerebro definitivamente NO es para ti.",
          imagen: { src: "/bootcamp/mod7-lec4/useless-brain-wallet.png", alt: "Las brain wallets son peligrosas" },
        },
        {
          titulo: "Wallets Calientes (Hot Wallets) y Frías (Cold Wallets)",
          texto: "En términos de conectividad a internet, las wallets se dividen en dos categorías:\n\n🔥 Hot Wallet: Una wallet se considera \"caliente\" cuando puede ser accedida directamente a través de internet o cuando está en un dispositivo siempre conectado a internet.\n\n🧊 Cold Wallet: El \"frío\" en una cold wallet o almacenamiento en frío se refiere a la falta de conexión a internet. Dado que las wallets frías nunca están conectadas a internet, el robo online de tus bitcoins es imposible.",
          imagen: { src: "/bootcamp/mod7-lec4/bitcoin-wallets-types-by-connectivity.png", alt: "Wallets calientes vs wallets frías" },
        },
        {
          titulo: "Wallets Custodiales vs No Custodiales",
          texto: "En términos de custodia, las wallets de Bitcoin se dividen en:\n\nWallets Custodiales: el proveedor de wallet tiene acceso a tu bitcoin. Una wallet custodial es controlada por una entidad de confianza. Estas plataformas almacenan tus claves privadas por ti. Existe un dicho popular en el mundo cripto: \"si no controlas tus claves, no controlas tus monedas\".\n\nWallets No Custodiales: el proveedor de wallet NO tiene acceso a tu bitcoin. Te da control total sobre tus fondos y claves privadas asociadas. Significa que TÚ eres el único responsable de la seguridad de tus propias claves privadas.",
          imagen: { src: "/bootcamp/mod7-lec4/bitcoin-wallets-types-by-custody.png", alt: "Wallets custodiales vs no custodiales" },
        },
        {
          titulo: "Autocustodia (Self-Custody)",
          texto: "Cuando confías tus bitcoins a nadie y asumes la responsabilidad de tus propios fondos guardando tus claves privadas tú mismo, esto se conoce como \"autocustodia\". La \"soberanía individual\" es un concepto importante en cripto: significa que uno debería tener acceso a su criptomoneda sin necesitar depender de un banco u otro tercero de confianza.",
        },
        {
          titulo: "Conclusión",
          texto: "Los diferentes tipos de wallets ofrecen distintos niveles de seguridad y facilidad de uso. Si la seguridad y el almacenamiento a largo plazo son tu objetivo principal, una wallet fría es mejor opción que una caliente. Si quieres realizar transacciones frecuentes y rápidas sin ser el único responsable de la seguridad, una hot wallet custodial puede ser la mejor opción.",
          imagen: { src: "/bootcamp/mod7-lec4/bitcoin-wallet-security-vs-ease-of-use.png", alt: "Seguridad vs facilidad de uso en wallets" },
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-07-5",
      titulo: "¿Qué wallet de Bitcoin deberías usar?",
      resumen: "La mejor wallet de Bitcoin para ti dependerá de tus preferencias en tres dimensiones: conveniencia, seguridad y control.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/which-bitcoin-wallet-should-you-use",
      contenido: [
        {
          titulo: "Las tres dimensiones para elegir una wallet",
          texto: "La mejor wallet de Bitcoin para ti dependerá de tus preferencias en tres dimensiones:\n- Conveniencia\n- Seguridad\n- Control\n\nDependiendo de tus preferencias, hay compensaciones. No puedes tenerlo todo.",
        },
        {
          titulo: "Compensaciones entre seguridad y conveniencia",
          texto: "En general, una hot wallet es la más conveniente pero la menos segura (ya que las claves privadas están online y pueden ser robadas por hackers). Una cold wallet es la más segura pero la menos conveniente.\n\nSi valoras la conveniencia, una wallet móvil te permite realizar transacciones en cualquier lugar. Si valoras la seguridad, deberías evitar usar una wallet web. Si valoras el control total, una brain wallet, paper wallet o hardware wallet probablemente sea la mejor opción.",
          imagen: { src: "/bootcamp/mod7-lec5/crypto-wallet-trade-offs.png", alt: "Compensaciones entre tipos de wallets" },
        },
        {
          titulo: "Custodia vs conectividad",
          texto: "Por ejemplo, mantener tus bitcoins en almacenamiento frío no custodial proporciona la opción más segura, con más control, pero menos conveniente. Mientras que una hot wallet custodial proporciona la opción más conveniente, pero con menos seguridad y control.",
          imagen: { src: "/bootcamp/mod7-lec5/hot-vs-cold-wallets-by-custody.png", alt: "Wallets calientes vs frías por custodia" },
        },
        {
          titulo: "¿Con qué frecuencia usarás tus fondos?",
          texto: "Otra cosa a considerar es con qué frecuencia usarás tus fondos. Por ejemplo, ¿tus bitcoins se usan para trading o simplemente estás acumulando (HODLing)?\n\nSi estás haciendo trading, probablemente transferirás fondos con mucha más frecuencia entre tu plataforma de trading y tu wallet en comparación con solo mantener.",
        },
        {
          titulo: "Cómo empezar: pasos recomendados para principiantes",
          puntos: [
            "Descarga e instala una wallet móvil no custodial (como Trust Wallet, Exodus o Coinbase Wallet).",
            "Aprende a hacer copia de seguridad y restaurar tu frase semilla.",
            "Compra una pequeña cantidad de bitcoin en un exchange centralizado (CEX).",
            "El bitcoin (fraccionado) se almacenará en una wallet web alojada por el exchange de cripto.",
            "Transfiere fondos desde la wallet web a tu wallet móvil no custodial.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-07-6",
      titulo: "Cómo enviar Bitcoin",
      resumen: "Aprende a enviar bitcoin de forma segura: desde crear una transacción hasta difundirla a la red. Conoce las comisiones de red y cómo verificar el estado de tu transacción.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-to-send-bitcoin",
      contenido: [
        {
          titulo: "¿Qué necesitas para enviar bitcoin?",
          texto: "Para enviar o recibir bitcoins, necesitas una \"wallet\". El proceso exacto para enviar bitcoins dependerá del tipo de wallet que estés usando, pero lo principal que necesitarás es la \"dirección\" del destinatario.\n\nSimilar a una dirección de email, la dirección especifica la ubicación a la que se pueden enviar bitcoins. Una dirección de Bitcoin es una cadena alfanumérica.",
          imagen: { src: "/bootcamp/mod7-lec6/mobile-crypto-wallet.png", alt: "Wallet móvil de cripto" },
        },
        {
          titulo: "Paso 1: Crear una Transacción",
          texto: "Para enviar bitcoins, introduces la dirección del destinatario simplemente copiándola y pegándola en la app de la wallet.\n\nSi estás usando una wallet o app móvil y estás físicamente frente al destinatario, puedes simplemente pedirle su código QR y escanear con la cámara de tu teléfono.\n\nTen en cuenta que todas las transacciones de Bitcoin son irreversibles. Esto significa que si las envías a la dirección equivocada, es muy probable que nunca vuelvas a ver ese bitcoin. Una vez que hayas introducido la dirección del destinatario, introduces la cantidad de BTC que quieres enviar.",
        },
        {
          titulo: "Paso 2: Firmar una Transacción",
          texto: "Después de crear una transacción, el software de tu wallet te pedirá que confirmes la transacción y/o que introduzcas tu contraseña.\n\nHacer clic en \"Confirmar\" o introducir tu contraseña es lo que permite a tu wallet usar tu clave privada para \"firmar\" la transacción. Una vez \"firmada\", tu wallet difundirá la transacción junto con esta \"firma digital\" a la red Bitcoin.",
        },
        {
          titulo: "Paso 3: Difundir una Transacción",
          texto: "Para difundir una transacción, tu wallet necesitará acceso a la red Bitcoin. Una wallet no es un nodo, es una interfaz para interactuar con un nodo.\n\nTu wallet usa internet para conectarse a un nodo de Bitcoin y le envía tu transacción. Una vez que el nodo valida tu transacción, la difundirá a otros nodos. Una vez enviada, aparecerá como \"pendiente\" hasta ser confirmada.",
        },
        {
          titulo: "¿Qué es una comisión de red de Bitcoin?",
          texto: "Todas las transacciones de Bitcoin deben pagar una comisión para ser incluidas en la blockchain. Esta comisión se conoce como \"comisión de red\" o \"comisión de transacción\" y se paga a los mineros por procesar las transacciones.\n\nMuchas wallets de Bitcoin te permiten personalizar la comisión de red. Si tienes prisa, puedes \"acelerar\" el procesamiento de tu transacción pagando una comisión más alta. Una transacción de Bitcoin típicamente tarda entre 10 minutos y varias horas en confirmarse.",
        },
        {
          titulo: "¿Cómo sé si una transacción de Bitcoin se completó?",
          texto: "Si quieres saber el estado de una transacción, puedes usar algo llamado \"Explorador de Bloques\" (Block Explorer). Es una herramienta online para explorar la blockchain de una criptomoneda donde puedes ver en tiempo real todas las transacciones que ocurren.\n\nPara verificar el estado de una transacción saliente, solo tienes que introducir la dirección del destinatario o el ID de la transacción en el campo de búsqueda del Explorador de Bloques.",
          imagen: { src: "/bootcamp/mod7-lec6/bitcoin-block-explorer-example.png", alt: "Ejemplo de explorador de bloques de Bitcoin" },
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-07-7",
      titulo: "Cómo recibir Bitcoin",
      resumen: "Aprende a recibir bitcoin de forma segura. Solo necesitas proporcionar tu dirección de Bitcoin al remitente y esperar la confirmación.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-to-receive-bitcoin",
      contenido: [
        {
          titulo: "Recibir Bitcoin es simple",
          texto: "Recibir bitcoin es un proceso incluso más simple que enviarlo. Para recibir bitcoin, no tienes que hacer mucho. La mayor parte del trabajo lo hace el remitente.\n\nTodo lo que tienes que hacer es proporcionar UNA cosa al remitente: tu dirección de Bitcoin. Una dirección es cómo recibes fondos y actúa como una ubicación virtual a la que se pueden enviar los bitcoins.",
          imagen: { src: "/bootcamp/mod7-lec7/receive-bitcoins-waiting-1.png", alt: "Esperando recibir bitcoins" },
        },
        {
          titulo: "¿Cómo sé cuál es mi dirección de Bitcoin?",
          texto: "Para conocer tu dirección de Bitcoin, solo tienes que acceder a tu wallet de Bitcoin. Aunque cada wallet es un poco diferente, tu dirección de Bitcoin generalmente se mostrará claramente y será fácil de encontrar.\n\nTu wallet puede mostrar la dirección de dos formas:\n- Una cadena alfanumérica que puedes copiar/pegar.\n- Un código QR que puede ser escaneado por el remitente usando la cámara de su smartphone.",
          imagen: { src: "/bootcamp/mod7-lec7/satoshi-address.png", alt: "Dirección de Bitcoin en la blockchain" },
        },
        {
          titulo: "¿Cómo comparto mi dirección de Bitcoin?",
          texto: "Para facilitar compartir tu dirección, la mayoría de las wallets de Bitcoin te permiten copiar y pegar tu dirección. Puedes pegar la dirección en un mensaje y enviarlo por mensaje de texto o email.\n\nLa mayoría de las wallets también te proporcionarán un código QR. Si estás físicamente frente al remitente, él o ella puede escanear tu código QR para obtener tu dirección.",
          imagen: { src: "/bootcamp/mod7-lec7/bitcoin-public-address-QR-code.png", alt: "Código QR de dirección pública de Bitcoin" },
        },
        {
          titulo: "¿Es seguro compartir públicamente mi dirección de Bitcoin?",
          texto: "Puedes compartir tu dirección de Bitcoin de forma segura con amigos y familia. Sin embargo, dado que la blockchain de Bitcoin es públicamente visible, cualquiera que conozca tu dirección de Bitcoin puede ver exactamente cuántos bitcoins tienes y cada transacción que haya ocurrido en esa dirección.\n\nSi no quieres que la gente vea esta información, necesitarás usar una nueva dirección de Bitcoin para cada transacción. Afortunadamente, la mayoría de las wallets de Bitcoin ahora te permiten crear un número casi ilimitado de nuevas direcciones con solo un clic.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-07-8",
      titulo: "¿Las wallets de Bitcoin almacenan bitcoins?",
      resumen: "Algunas personas creen que las wallets de Bitcoin contienen bitcoins. Pero esto es falso. Una wallet no almacena bitcoins — almacena la clave privada que otorga acceso a tus bitcoins.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/do-bitcoin-wallets-store-bitcoins",
      contenido: [
        {
          titulo: "Un error común sobre las wallets",
          texto: "Un concepto erróneo popular sobre las wallets cripto es que contienen o almacenan cripto real. En el caso de Bitcoin, algunas personas creen que las wallets de Bitcoin realmente contienen bitcoins. Pero esto es falso.\n\nA diferencia de una cartera física en el mundo real que guarda efectivo, una wallet de Bitcoin NO guarda realmente tus bitcoins. Porque, a diferencia del efectivo, los bitcoins no existen en forma física. Son digitales. ¡No puedes almacenar físicamente algo que no existe físicamente!",
          imagen: { src: "/bootcamp/mod7-lec8/confused-about-crypto-wallets.png", alt: "Confusión sobre las wallets cripto" },
        },
        {
          titulo: "Los bitcoins son simplemente números",
          texto: "Los bitcoins están simplemente representados por números en un libro mayor: la blockchain de Bitcoin. Cuando digo \"tengo 3 bitcoins\", lo que realmente significa es que podemos mirar la blockchain de Bitcoin (que es pública), buscar mi dirección (generada por mi wallet de Bitcoin), y ver que tengo 3 bitcoins asociados a esta dirección.",
          imagen: { src: "/bootcamp/mod7-lec8/crypto-is-digital.png", alt: "Las criptomonedas son digitales" },
        },
        {
          titulo: "El analógico de la tarjeta de débito",
          texto: "Una forma útil de pensar en cómo funciona una wallet de Bitcoin es imaginar que tienes una cartera real que no guarda efectivo sino solo una tarjeta de débito.\n\nUna tarjeta de débito es una tarjeta de pago que deduce dinero directamente de tu cuenta corriente cuando se usa. Lo que la tarjeta de débito proporciona es \"acceso\" a los fondos en tu cuenta corriente.",
          imagen: { src: "/bootcamp/mod7-lec8/debit-card-in-hand.png", alt: "Tarjeta de débito en la mano" },
        },
        {
          titulo: "La wallet como billetera sin efectivo",
          texto: "Si el único contenido de tu cartera es una tarjeta de débito, tu cartera NO está almacenando dinero real. Lo que realmente está almacenando es algo (la tarjeta de débito) que te da \"acceso\" a tu dinero.\n\nDel mismo modo, una wallet de Bitcoin almacena una \"clave privada\". La clave privada es como la tarjeta de débito en el sentido de que si la posees, tienes acceso a una dirección específica y puedes \"gastar\" cualquier bitcoin vinculado a esa dirección.",
          imagen: { src: "/bootcamp/mod7-lec8/card-wallet.png", alt: "Cartera con tarjeta de débito" },
        },
        {
          titulo: "Cómo funcionan las transacciones de Bitcoin",
          texto: "Así como una tarjeta de débito y el conocimiento de tu PIN \"prueba\" que eres el propietario de una cuenta corriente específica, una clave privada \"prueba\" que eres el propietario de una dirección de Bitcoin específica.\n\nEn el caso de Bitcoin, en lugar de un PIN o una firma manuscrita, Bitcoin se basa en una \"firma digital\". Crear una \"firma digital\" es cómo un poseedor de clave privada autoriza una transacción de Bitcoin.",
          imagen: { src: "/bootcamp/mod7-lec8/card-terminal.png", alt: "Terminal de tarjeta de pago" },
        },
        {
          titulo: "Una wallet de Bitcoin no almacena bitcoins, pero otorga acceso a ellos",
          texto: "Los bitcoins NO están almacenados en la wallet. Los bitcoins están asignados a direcciones que están listadas en la blockchain de Bitcoin.\n\nUna wallet gestiona la clave privada que otorga acceso a la dirección donde están almacenados tus bitcoins. Lo que tienes es una clave privada que te permite probar que eres el propietario de una dirección y puedes \"gastar\" cualquier bitcoin vinculado a ella.",
          imagen: { src: "/bootcamp/mod7-lec8/cashier.png", alt: "El cajero verifica el acceso" },
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo8 = [
    {
      id: "crypto-08-1",
      titulo: "¿Qué es una firma digital?",
      resumen: "Las firmas digitales son un componente fundamental de las criptomonedas. Aprende qué son, para qué sirven y por qué son necesarias para demostrar propiedad sin revelar tu clave privada.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-digital-signature",
      contenido: [
        {
          titulo: "¿Qué es una transacción de Bitcoin?",
          texto: "Cuando quieres enviar algunos bitcoins, tu wallet crea una \"transacción\" y la envía a un nodo en la red Bitcoin, que luego la difunde a otros nodos.\n\nCuando inicias una transacción de Bitcoin, debes probar a cada nodo en la red que estás autorizado a gastar esos fondos.\n\nUna transacción es simplemente un mensaje que contiene información sobre el emisor, el destinatario y la cantidad de BTC a transferir (incluyendo una comisión de transacción).",
        },
        {
          titulo: "La firma de una transacción",
          texto: "Antes de enviar el mensaje (la \"transacción\"), se te pide que lo \"firmes\". Todas las transacciones necesitan ser \"firmadas\" antes de enviarse a la red.\n\nPara hacerlo, el software de tu wallet realiza cierta magia matemática sobre el mensaje de transacción y luego, después de eso, realiza más magia matemática con algo conocido como \"clave privada\".\n\nEl resultado de toda esta magia matemática es una pieza especial de información llamada \"firma digital\".",
          imagen: { src: "/bootcamp/mod8-lec1/math-magic-with-private-key.png", alt: "Magia matemática con la clave privada" },
        },
        {
          titulo: "¿Qué es una firma digital?",
          texto: "Es la \"firma digital\" la que prueba a la red Bitcoin que eres el verdadero propietario de los bitcoins que deseas enviar.\n\nBitcoin usa criptografía de clave pública para crear un \"par de claves\" que controla el acceso a los bitcoins. El par de claves consiste en una clave privada y una clave pública.",
          imagen: { src: "/bootcamp/mod8-lec1/digital-signature-math-magic.png", alt: "Magia matemática de la firma digital" },
        },
        {
          titulo: "Propiedad de bitcoins: claves y direcciones",
          puntos: [
            "La clave privada genera una clave pública.",
            "Las dos claves están matemáticamente vinculadas y son en realidad números muy grandes.",
            "La clave pública genera una dirección que se comparte con otros para poder recibir bitcoin.",
            "Hay bitcoins vinculados a una dirección específica.",
            "Esta dirección y la cantidad de bitcoins que contiene están registradas en el libro mayor de Bitcoin: la blockchain.",
            "Tienes una clave privada que demuestra matemáticamente que eres el propietario de esta dirección.",
            "Solo tú puedes \"mover\" o enviar estos bitcoins a una dirección diferente.",
          ],
        },
        {
          titulo: "El problema de revelar la clave privada",
          texto: "Para probar que eres el propietario de una dirección, podrías simplemente mostrar la clave privada al mundo. Pero esto NO es seguro: una vez que tu clave privada es conocida públicamente, cualquiera puede ahora acceder a la dirección donde residen tus bitcoins.\n\n¿Cómo puedes probar que eres el propietario real de una dirección (y clave pública) sin tener que revelar la clave privada vinculada a esa dirección?",
          imagen: { src: "/bootcamp/mod8-lec1/relationship-between-keys-and-addresses.png", alt: "Relación entre claves y direcciones" },
        },
        {
          titulo: "La solución: la firma digital",
          texto: "La solución es proporcionar lo que se llama una \"firma digital\".\n\nUna firma digital es algo que puede adjuntarse a un mensaje para probar que el remitente del mensaje ES el remitente real.\n\nEn Bitcoin, una firma digital se usa para demostrar que conoces la clave privada asociada a una dirección SIN tener que mostrar la clave privada real a la red Bitcoin.",
        },
        {
          titulo: "¿Cuál es el propósito de una firma digital?",
          texto: "Para gastar bitcoins desde una dirección de Bitcoin particular, uno debe probar la \"propiedad\" (o el conocimiento) de la clave privada que está emparejada con la clave pública asociada a esa dirección.\n\nUna firma digital es algo que puedes usar para probar que conoces la clave privada conectada a una clave pública, SIN tener que revelar la clave privada real.\n\nY para probar que eres el propietario de una dirección, necesitas probar que eres el propietario de la clave privada vinculada a la dirección.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-08-2",
      titulo: "¿Qué es el cifrado (Encryption)?",
      resumen: "Para entender verdaderamente el concepto de las firmas digitales, primero debes comprender cómo funciona el cifrado: el proceso de transformar información legible en un formato ilegible para protegerla.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-encryption",
      contenido: [
        {
          titulo: "¿Qué es el cifrado?",
          texto: "El cifrado (encryption) es el proceso de transformar información legible (texto plano o \"plaintext\") en un formato ilegible (texto cifrado o \"ciphertext\") usando un algoritmo y una clave.\n\nSolo quienes tengan la clave correcta pueden descifrar (decryption) el texto cifrado y volver a convertirlo en información legible.\n\nEl cifrado ha existido durante miles de años. Julio César usaba un cifrado simple desplazando letras del alfabeto para comunicarse con sus generales. En la era moderna, el cifrado usa matemáticas avanzadas.",
        },
        {
          titulo: "Conceptos clave del cifrado",
          puntos: [
            "Texto plano (Plaintext): el mensaje original y legible.",
            "Texto cifrado (Ciphertext): el mensaje después de ser cifrado, ilegible sin la clave.",
            "Algoritmo de cifrado: el método matemático usado para cifrar y descifrar.",
            "Clave (Key): la pieza de información que controla el proceso de cifrado y descifrado.",
            "Cifrado (Encryption): el proceso de convertir texto plano en texto cifrado.",
            "Descifrado (Decryption): el proceso de convertir texto cifrado de vuelta en texto plano.",
          ],
        },
        {
          titulo: "Cifrado simétrico",
          texto: "El cifrado simétrico usa la misma clave tanto para cifrar como para descifrar. Es rápido y eficiente, pero tiene un problema: ¿cómo compartes la clave de forma segura con la otra persona?\n\nSi interceptan la clave durante la transmisión, pueden leer todos tus mensajes cifrados. Este es conocido como el \"problema de distribución de claves\".",
        },
        {
          titulo: "La necesidad de un sistema más sofisticado",
          texto: "Para resolver el problema del cifrado simétrico, se desarrolló el cifrado asimétrico (también llamado criptografía de clave pública).\n\nEste sistema usa dos claves matemáticamente relacionadas: una clave pública y una clave privada. Lo que se cifra con una clave solo puede descifrarse con la otra.\n\nEste es el principio fundamental que hace posibles las firmas digitales y las criptomonedas.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-08-3",
      titulo: "¿Qué es el cifrado asimétrico?",
      resumen: "El cifrado asimétrico usa un par de claves matemáticamente vinculadas: una clave pública y una privada. Es el fundamento criptográfico de Bitcoin y las firmas digitales.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-asymmetric-encryption",
      contenido: [
        {
          titulo: "¿Qué es el cifrado asimétrico?",
          texto: "El cifrado asimétrico, también conocido como \"criptografía de clave pública\", usa dos claves matemáticamente relacionadas:\n\n- Clave pública: puede compartirse con cualquiera.\n- Clave privada: debe mantenerse en secreto absoluto.\n\nLo que se cifra con la clave pública solo puede descifrarse con la clave privada correspondiente, y viceversa.",
        },
        {
          titulo: "¿Cómo funciona?",
          texto: "Piensa en ello como un buzón de correo con una ranura abierta:\n\nCualquier persona puede meter una carta (cifrar un mensaje con tu clave pública). Pero solo tú tienes la llave para abrir el buzón y leer las cartas (descifrar con tu clave privada).\n\nLa magia matemática detrás de esto se basa en la criptografía de curva elíptica (ECC), que es extremadamente difícil de revertir incluso con las computadoras más potentes del mundo.",
        },
        {
          titulo: "La relación clave privada → clave pública",
          puntos: [
            "La clave privada es un número aleatorio enorme (256 bits en Bitcoin).",
            "La clave pública se deriva de la clave privada mediante una función matemática de una sola vía.",
            "Es computacionalmente imposible derivar la clave privada a partir de la clave pública.",
            "La dirección de Bitcoin es una versión acortada (hash) de la clave pública.",
            "Esta relación unidireccional es lo que garantiza la seguridad del sistema.",
          ],
        },
        {
          titulo: "Criptografía de curva elíptica (ECC)",
          texto: "Bitcoin usa específicamente la curva elíptica secp256k1. La multiplicación de puntos en una curva elíptica es la operación que convierte la clave privada en clave pública.\n\nEs fácil multiplicar un punto por un número (clave privada → clave pública), pero prácticamente imposible hacer el proceso inverso (clave pública → clave privada). Esta propiedad se conoce como el \"problema del logaritmo discreto de curva elíptica\" (ECDLP).",
        },
        {
          titulo: "Aplicación en Bitcoin",
          texto: "En Bitcoin, el cifrado asimétrico no se usa para cifrar mensajes sino para crear firmas digitales. La clave privada se usa para \"firmar\" transacciones, y cualquiera puede verificar esa firma usando la clave pública correspondiente, sin necesidad de conocer la clave privada.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-08-4",
      titulo: "Cómo funcionan las firmas digitales (introducción)",
      resumen: "Las firmas digitales pueden sonar complicadas, pero su lógica es elegante. Aprende el concepto fundamental detrás de cómo una firma digital prueba identidad sin revelar secretos.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-digital-signatures-work",
      contenido: [
        {
          titulo: "La analogía de la firma manuscrita",
          texto: "Una firma manuscrita en el mundo físico sirve para probar que quien firmó un documento es quien dice ser. Sin embargo, las firmas manuscritas tienen limitaciones: pueden falsificarse y no están vinculadas matemáticamente al contenido del documento.\n\nUna firma digital resuelve estos problemas: está matemáticamente vinculada tanto al firmante (a través de su clave privada) como al contenido exacto del mensaje.",
        },
        {
          titulo: "¿Cómo funciona una firma digital? (concepto)",
          texto: "Una firma digital funciona en dos etapas: firmar y verificar.\n\n1. Firmar: el remitente usa su clave privada para crear una firma sobre el mensaje.\n2. Verificar: cualquier persona puede usar la clave pública del remitente para verificar que la firma es válida.\n\nLo brillante del sistema es que solo quien tiene la clave privada puede crear una firma válida, pero cualquiera con la clave pública puede verificarla.",
        },
        {
          titulo: "Las tres propiedades de una firma digital",
          puntos: [
            "Autenticidad: prueba que el firmante es quien dice ser (tiene la clave privada).",
            "Integridad: cualquier cambio en el mensaje invalida la firma automáticamente.",
            "No repudio: el firmante no puede negar haber firmado el mensaje.",
          ],
        },
        {
          titulo: "El papel del hash en las firmas digitales",
          texto: "Antes de firmar, el mensaje pasa por una función hash (como SHA-256 en Bitcoin). Esto produce un \"resumen\" de tamaño fijo del mensaje, sin importar cuán largo sea el original.\n\nLa firma se aplica sobre este hash, no sobre el mensaje completo. Esto hace el proceso mucho más eficiente y además asegura que cualquier modificación al mensaje produzca un hash completamente diferente, invalidando la firma.",
        },
        {
          titulo: "¿Por qué son importantes en Bitcoin?",
          texto: "En Bitcoin, las firmas digitales son lo que permite que la red valide transacciones sin necesidad de un banco central o árbitro de confianza.\n\nCada nodo de la red puede verificar independientemente que una transacción fue autorizada por el verdadero propietario de los fondos, simplemente verificando la firma digital adjunta a la transacción.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-08-5",
      titulo: "¿Cómo funcionan realmente las firmas digitales?",
      resumen: "Aprende cómo funciona una firma digital en Bitcoin: el algoritmo ECDSA, el proceso de firma paso a paso y cómo los nodos verifican las firmas sin acceder a la clave privada.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-do-digital-signatures-work",
      contenido: [
        {
          titulo: "El algoritmo ECDSA",
          texto: "Bitcoin usa el Algoritmo de Firma Digital de Curva Elíptica (ECDSA, por sus siglas en inglés). Este algoritmo es el que permite crear y verificar firmas digitales usando criptografía de curva elíptica.\n\nECDSA fue seleccionado porque ofrece un alto nivel de seguridad con claves relativamente cortas, haciendo el sistema eficiente para las transacciones de Bitcoin.",
        },
        {
          titulo: "Paso 1: Crear el hash de la transacción",
          texto: "Cuando quieres enviar bitcoin, tu wallet primero toma los datos de la transacción (dirección de destino, cantidad, etc.) y los pasa por la función hash SHA-256 dos veces.\n\nEsto produce un hash de 256 bits que representa de forma única esa transacción específica. Incluso un cambio de un solo carácter en la transacción produciría un hash completamente diferente.",
        },
        {
          titulo: "Paso 2: Generar la firma con la clave privada",
          texto: "Tu wallet toma el hash de la transacción y lo combina con tu clave privada usando el algoritmo ECDSA. El resultado son dos números (llamados r y s) que juntos forman la firma digital.\n\nEsta firma es única para esa transacción específica y esa clave privada específica. Nadie puede reproducirla sin conocer la clave privada.",
        },
        {
          titulo: "Paso 3: Difundir la transacción firmada",
          texto: "La transacción (con los datos), junto con la firma digital (r, s) y la clave pública, se envía a la red Bitcoin.\n\nNótese lo importante: se envía la clave pública, no la clave privada. La clave privada nunca abandona tu wallet.",
        },
        {
          titulo: "Paso 4: Verificación por los nodos",
          texto: "Cada nodo que recibe la transacción la verifica:\n1. Toma la clave pública incluida en la transacción.\n2. Usa la clave pública y la firma (r, s) con el algoritmo ECDSA de verificación.\n3. Si la verificación es positiva, la firma es válida y la transacción fue autorizada por quien tiene la clave privada correspondiente.\n4. El nodo también verifica que la dirección corresponde a la clave pública (para confirmar la identidad del propietario).",
        },
        {
          titulo: "El resultado",
          texto: "Si la verificación es exitosa, el nodo acepta la transacción como válida y la propaga a otros nodos. Sin conocer la clave privada, la red puede confirmar con certeza matemática que el propietario legítimo autorizó la transacción.\n\nEste es el mecanismo que elimina la necesidad de un banco o árbitro central en Bitcoin.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-08-6",
      titulo: "Cómo funciona una transacción de Bitcoin",
      resumen: "Aprende cómo funciona una transacción de Bitcoin de principio a fin: desde que la creas en tu wallet hasta que queda confirmada en la blockchain.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-a-bitcoin-transaction-works",
      contenido: [
        {
          titulo: "¿Qué es una transacción de Bitcoin?",
          texto: "Una transacción de Bitcoin es esencialmente un mensaje firmado que anuncia al mundo: \"Yo, el propietario de esta dirección, autorizo el envío de X bitcoins a esta otra dirección\".\n\nEste mensaje contiene: las entradas (UTXOs — salidas de transacciones anteriores no gastadas), las salidas (las nuevas direcciones que recibirán los fondos) y la comisión de red para los mineros.",
        },
        {
          titulo: "UTXOs: el modelo de transacciones de Bitcoin",
          texto: "Bitcoin no funciona con \"saldos\" como los bancos. En cambio, usa el modelo UTXO (Unspent Transaction Output, o Salida de Transacción No Gastada).\n\nCada UTXO es como una moneda física: puedes gastarla entera o en partes, y el \"cambio\" regresa a ti como un nuevo UTXO. Cuando \"tienes\" 1 BTC, en realidad tienes uno o varios UTXOs que suman 1 BTC.",
        },
        {
          titulo: "El proceso completo de una transacción",
          puntos: [
            "Paso 1 — Tu wallet selecciona los UTXOs necesarios para cubrir el monto a enviar.",
            "Paso 2 — Se construye la transacción: entradas (UTXOs a gastar), salidas (dirección destino + cambio de vuelta a ti) y comisión para mineros.",
            "Paso 3 — La transacción se hashea con SHA-256.",
            "Paso 4 — Tu clave privada firma el hash (ECDSA) para crear la firma digital.",
            "Paso 5 — La transacción firmada (incluyendo la firma y tu clave pública) se difunde a la red.",
            "Paso 6 — Los nodos verifican la firma digital y que los UTXOs no han sido gastados.",
            "Paso 7 — La transacción válida entra al mempool (zona de espera).",
            "Paso 8 — Un minero incluye la transacción en un bloque y lo mina.",
            "Paso 9 — El bloque se añade a la blockchain: la transacción está confirmada.",
          ],
        },
        {
          titulo: "Confirmaciones",
          texto: "Una transacción se considera \"confirmada\" cuando está incluida en un bloque de la blockchain. Cada bloque adicional minado encima de ese bloque se llama una \"confirmación\".\n\nCon 1 confirmación la transacción ya es válida, pero es recomendable esperar al menos 6 confirmaciones (unos 60 minutos) para transacciones grandes, ya que hace prácticamente imposible revertir la transacción.",
        },
        {
          titulo: "Irreversibilidad",
          texto: "Una vez que una transacción tiene suficientes confirmaciones, es prácticamente irreversible. Esto es diferente a los sistemas bancarios donde los bancos pueden revertir transacciones.\n\nEn Bitcoin, no hay autoridad central que pueda deshacer una transacción confirmada. Por eso es tan importante verificar siempre la dirección de destino antes de enviar.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-08-7",
      titulo: "El sistema Bitcoin: integrándolo todo",
      resumen: "Has aprendido mucho sobre Bitcoin. Ahora unamos todas las piezas: claves, firmas digitales, transacciones, minería y la blockchain para ver cómo el sistema completo funciona en conjunto.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/bitcoin-system-overview",
      contenido: [
        {
          titulo: "Las capas del sistema Bitcoin",
          texto: "El sistema Bitcoin puede entenderse en capas que trabajan juntas:\n\n1. Criptografía: provee la seguridad fundamental (claves, firmas, hashing).\n2. Red P2P: los nodos se comunican entre sí sin un servidor central.\n3. Protocolo de consenso: las reglas que todos los nodos siguen (Proof of Work).\n4. Blockchain: el libro mayor público e inmutable.\n5. Wallets: la interfaz que los usuarios usan para interactuar con el sistema.",
        },
        {
          titulo: "El flujo completo: de wallet a blockchain",
          puntos: [
            "Generas un par de claves (privada/pública) → tu wallet crea una dirección.",
            "Compartes tu dirección con alguien para recibir bitcoin.",
            "Para enviar bitcoin, tu wallet crea una transacción y la firma con tu clave privada.",
            "La transacción firmada se difunde a la red P2P de nodos.",
            "Los nodos verifican la firma digital usando tu clave pública.",
            "La transacción válida entra al mempool esperando ser incluida en un bloque.",
            "Un minero selecciona transacciones del mempool y resuelve el Proof of Work.",
            "El bloque minado se añade a la blockchain.",
            "Todos los nodos de la red actualizan su copia de la blockchain.",
          ],
        },
        {
          titulo: "¿Por qué es ingenioso el sistema Bitcoin?",
          texto: "Lo que hace genial al sistema Bitcoin es que cada componente resuelve un problema específico sin necesidad de confianza centralizada:\n\n- Las firmas digitales resuelven el problema de autenticación: ¿quién autoriza el gasto?\n- Los UTXOs resuelven el problema del doble gasto: ¿se han gastado ya estos fondos?\n- La Proof of Work resuelve el problema del consenso: ¿en qué versión de la blockchain está de acuerdo la red?\n- La red P2P resuelve el problema de la centralización: no hay un único punto de falla.",
        },
        {
          titulo: "Descentralización y confianza",
          texto: "En el sistema bancario tradicional, confías en tu banco para que lleve el registro correcto de tus fondos. Si el banco comete un error o actúa de mala fe, estás expuesto.\n\nEn Bitcoin, no confías en ninguna entidad. En cambio, confías en las matemáticas. Las firmas digitales garantizan matemáticamente que solo el propietario legítimo puede gastar sus fondos. La blockchain garantiza que el historial de transacciones no puede alterarse retroactivamente.",
        },
        {
          titulo: "El papel de las firmas digitales en la seguridad de Bitcoin",
          texto: "Las firmas digitales son el componente que une todo el sistema:\n\n- Prueban propiedad sin revelar secretos (la clave privada nunca se expone).\n- Vinculan la autorización al contenido exacto de la transacción (cualquier cambio invalida la firma).\n- Permiten la verificación pública por cualquier nodo sin autoridad central.\n- Hacen que el robo de bitcoin requiera comprometer la clave privada del propietario.\n\nSin las firmas digitales, Bitcoin no podría funcionar como un sistema de dinero digital descentralizado.",
        },
        {
          titulo: "Resumen: las piezas del sistema Bitcoin",
          puntos: [
            "Clave privada: un número aleatorio secreto que solo tú conoces.",
            "Clave pública: derivada de la clave privada; puede compartirse públicamente.",
            "Dirección: versión acortada de la clave pública; donde recibes bitcoin.",
            "Firma digital: prueba que autorizaste una transacción sin revelar tu clave privada.",
            "Transacción: mensaje firmado que mueve bitcoins de una dirección a otra.",
            "UTXO: modelo de \"monedas\" no gastadas que Bitcoin usa para rastrear fondos.",
            "Nodo: computadora que valida transacciones y mantiene una copia de la blockchain.",
            "Minero: nodo especial que compite para añadir bloques a la blockchain.",
            "Blockchain: libro mayor público e inmutable de todas las transacciones.",
            "Proof of Work: mecanismo de consenso que asegura la blockchain.",
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
      : mod.id === "crypto-05"
      ? clasesModulo5
      : mod.id === "crypto-06"
      ? clasesModulo6
      : mod.id === "crypto-07"
      ? clasesModulo7
      : mod.id === "crypto-08"
      ? clasesModulo8
      : Array.from({ length: mod.lessons }, (_, i) => ({
          id: `${mod.id}-${i + 1}`,
          titulo: `Clase ${i + 1}`,
          resumen: "Contenido de la lección pendiente por cargar.",
          estado: "Contenido pendiente",
        })),
  };
});
