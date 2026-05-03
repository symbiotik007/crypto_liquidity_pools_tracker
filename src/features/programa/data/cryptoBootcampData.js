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
      resumen:"La curva de aprendizaje cripto puede ser fuerte; este inicio se enfoca en Bitcoin antes de cubrir todo el mercado.",
      estado:"Contenido cargado",
      sourceUrl:"https://www.babypips.com/crypto/learn/getting-started-bitcoin",
      contenido:[
        {
          titulo:"Por qué empezar con Bitcoin",
          texto:"El mercado cripto tiene miles de activos y puede ser abrumador. Bitcoin es el punto de partida natural porque fue la primera criptomoneda y muchos conceptos del ecosistema nacen de su diseño.",
        },
        {
          titulo:"Definición inicial",
          puntos:[
            "Bitcoin es una moneda digital descentralizada basada en software abierto.",
            "Las transacciones se registran en una blockchain pública y distribuida.",
            "La red usa conceptos como minería, prueba de trabajo, llaves públicas, firmas digitales y funciones hash.",
            "Aunque suena técnico al principio, el curso propone construir el vocabulario paso a paso.",
          ],
        },
        {
          titulo:"Meta de aprendizaje",
          texto:"La lección busca reducir la intimidación inicial. Si entiendes Bitcoin, tendrás una base más sólida para comprender otros criptoactivos, sus riesgos y sus diferencias.",
        },
      ],
      imagenes:[
        { alt:"Guía inicial de Bitcoin", src:"https://www.babypips.com/crypto/learn/getting-started-bitcoin" },
      ],
    },
  ];

  const clasesModulo2 = [
    {
      id: "crypto-02-1",
      titulo: "¿Qué es Bitcoin?",
      resumen: "Bitcoin es el dinero digital original: una moneda descentralizada que te permite guardar, enviar y recibir valor por internet sin bancos ni intermediarios. En esta lección descubres qué lo hace único y por qué marcó un antes y un después en las finanzas.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-bitcoin",
      contenido: [
        {
          titulo: "¿Qué es Bitcoin?",
          texto: "Bitcoin es un nuevo tipo de \"dinero\" — una moneda digital diseñada para que puedas guardar, enviar y recibir valor por internet sin necesitar bancos ni ninguna otra institución financiera.\n\nBitcoin es conocido como la criptomoneda original. La primera de su tipo.",
        },
        {
          titulo: "Bitcoin es como el email, pero para dinero",
          texto: "Bitcoin funciona de forma muy parecida al correo electrónico. Así como puedes crear una dirección de email para enviar, guardar y recibir mensajes, también puedes crear una \"wallet\" (billetera) de Bitcoin para enviar, guardar y recibir dinero.\n\nCualquier persona con conexión a internet puede crear una wallet de Bitcoin y empezar a usarla — sin solicitar permiso a ningún banco.",
        },
        {
          titulo: "Bitcoin está descentralizado",
          texto: "Bitcoin es una moneda descentralizada: no está controlada por ninguna entidad única, como un gobierno o un banco central. Nadie lo controla.\n\nEsto lo hace radicalmente diferente al dólar, el euro o cualquier otra moneda tradicional, que dependen de un banco central que las emite y regula.",
        },
        {
          titulo: "¿Quién creó Bitcoin?",
          texto: "Bitcoin fue creado por una persona (o grupo) bajo el seudónimo Satoshi Nakamoto. La idea era construir un sistema de pagos digitales único que permitiera transacciones financieras sin fronteras y sin necesidad de intermediarios como los bancos.\n\nEl 31 de octubre de 2008 — día de Halloween — Satoshi Nakamoto publicó el famoso whitepaper titulado \"Bitcoin: A Peer-to-Peer Electronic Cash System\", un documento técnico de 12 páginas que describía cómo funcionaría todo el sistema.",
        },
        {
          titulo: "Suministro fijo: solo 21 millones",
          texto: "El software de Bitcoin impone un suministro total fijo de 21 millones de monedas. Jamás existirán más de 21 millones de bitcoins.\n\nEsta escasez programada es una de las razones por las que muchos comparan Bitcoin con el oro: ambos son limitados, difíciles de obtener y no pueden ser creados arbitrariamente por ningún gobierno.",
        },
        {
          titulo: "¿Cómo se crean los bitcoins? La minería",
          texto: "Los bitcoins se crean a través de un proceso llamado \"minería\". Computadoras especializadas compiten entre sí para resolver un complejo juego matemático, y la computadora ganadora (el \"minero\") es recompensada con bitcoins recién creados.\n\nEste proceso también es el mecanismo que valida y registra todas las transacciones en la red.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Bitcoin es una moneda digital descentralizada — sin bancos, sin gobierno que la controle.",
            "Funciona como el email para el dinero: solo necesitas una wallet y conexión a internet.",
            "Fue creado en 2008 por el pseudónimo Satoshi Nakamoto.",
            "Solo existirán 21 millones de bitcoins en total — su escasez es una característica de diseño.",
            "Los nuevos bitcoins se crean a través de la minería, que también protege y valida la red.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-02-2",
      titulo: "¿Por qué fue creado Bitcoin?",
      resumen: "Antes de Bitcoin, crear efectivo digital era un problema sin solución. Todos los intentos anteriores fracasaron por el mismo obstáculo: el doble gasto. Satoshi Nakamoto resolvió esto de forma brillante. Aquí entiendes el problema y la solución que cambió todo.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/why-was-bitcoin-created",
      contenido: [
        {
          titulo: "La visión de Satoshi Nakamoto",
          texto: "Según el whitepaper de Bitcoin, Satoshi Nakamoto quería crear:\n\n\"…efectivo electrónico que permitiría enviar pagos en línea directamente de una parte a otra sin pasar por una institución financiera.\"\n\nSuena simple. Pero antes de que Satoshi lo lograra, todos los intentos previos de crear efectivo digital habían fallado.",
        },
        {
          titulo: "El problema del intermediario de confianza",
          texto: "Antes de Bitcoin, cualquier pago digital dependía de una autoridad central — un banco, una empresa de tarjetas de crédito — para llevar el registro de transacciones y saldos.\n\nEste intermediario era necesario porque sin él, ¿cómo podías estar seguro de que alguien no estaba gastando el mismo dinero digital dos veces? A esto se le llama el problema del \"doble gasto\".",
        },
        {
          titulo: "El problema del doble gasto",
          texto: "El doble gasto es el gran desafío del dinero digital. Los datos digitales — texto, fotos, archivos — son fáciles de copiar. Si el dinero fuera solo un archivo digital, nada te impediría enviarte una copia a ti mismo y gastar ese mismo dinero dos veces.\n\nEste problema es trivial con dinero físico (no puedes darle el mismo billete a dos personas al mismo tiempo), pero en el mundo digital era un obstáculo aparentemente insuperable.",
        },
        {
          titulo: "La solución de Bitcoin: consenso distribuido",
          texto: "Bitcoin resolvió el problema del doble gasto de una forma nunca antes lograda: eliminando al intermediario y reemplazándolo con un sistema de consenso distribuido.\n\nEn lugar de que un banco central decida qué transacciones son válidas, todos las computadoras de la red Bitcoin tienen que llegar a un acuerdo por \"consenso\" sobre cuáles transacciones son legítimas. Si la mayoría de la red acuerda que una transacción es válida, se registra permanentemente.",
        },
        {
          titulo: "Peer-to-peer: de persona a persona",
          texto: "\"Una versión puramente peer-to-peer de efectivo electrónico permitiría enviar pagos en línea directamente de una parte a otra sin pasar por una institución financiera.\"\n— Satoshi Nakamoto, Bitcoin Whitepaper\n\nEsta fue la promesa de Bitcoin: que dos personas pudieran intercambiar valor directamente, como si se pasaran efectivo en la calle, pero por internet y sin fronteras.",
        },
        {
          titulo: "¿Por qué fracasaron los intentos anteriores?",
          texto: "Antes de Bitcoin existieron otros intentos de crear moneda digital: DigiCash, e-gold, B-money, Bit Gold. Todos fracasaron por distintas razones:\n\n- Dependían de un servidor central que podía ser atacado, censurado o cerrado.\n- No resolvían el problema del doble gasto sin confiar en una entidad central.\n- Eran vulnerables a ataques del tipo \"51%\" o a la manipulación del operador.\n\nBitcoin fue el primero en resolver todos estos problemas a la vez.",
        },
        {
          titulo: "Puntos clave",
          puntos: [
            "Bitcoin nació para crear efectivo digital sin intermediarios (bancos, gobiernos).",
            "El principal obstáculo era el doble gasto: gastar el mismo dinero digital dos veces.",
            "Bitcoin lo resolvió con un sistema de consenso distribuido entre miles de computadoras.",
            "Es peer-to-peer: las transacciones van directamente de persona a persona, sin terceros.",
            "Todos los intentos anteriores de dinero digital fracasaron — Bitcoin fue el primero en lograrlo.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-02-3",
      titulo: "El sistema Bitcoin y sus componentes",
      resumen: "Bitcoin no es solo una moneda — es un sistema completo. En esta lección conoces los componentes que lo forman: el software, la red, el protocolo y cómo encajan entre sí para crear algo que nadie controla pero todos pueden usar.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/bitcoin-system-introduction",
      contenido: [
        {
          titulo: "Bitcoin es un sistema, no solo una moneda",
          texto: "Cuando la gente dice \"Bitcoin\", generalmente se refiere a la criptomoneda. Pero en realidad, Bitcoin es mucho más que eso — es un sistema completo.\n\nComo cualquier sistema, el sistema Bitcoin es una colección de elementos o componentes que trabajan juntos como un todo. Entender cada pieza es clave para entender cómo funciona realmente.",
        },
        {
          titulo: "Componente 1: El software de Bitcoin",
          texto: "En el corazón del sistema está el software de Bitcoin. Básicamente, el sistema Bitcoin es un conjunto de computadoras que \"hablan\" entre sí por internet. Para poder comunicarse, cada computadora tiene instalado el software de Bitcoin.\n\nEste software es de código abierto (open source), lo que significa que cualquier persona puede ver el código fuente. No pertenece a ninguna persona ni empresa — es libre de usar y modificar.",
        },
        {
          titulo: "Componente 2: La red de Bitcoin",
          texto: "Todas esas computadoras con el software instalado forman la red de Bitcoin. Es una red global, distribuida y sin un punto central de control.\n\nA diferencia de los servidores de un banco (que están en ubicaciones físicas controladas por esa empresa), los nodos de Bitcoin están repartidos por todo el mundo. Nadie puede apagar la red cerrando un solo punto.",
        },
        {
          titulo: "Componente 3: El protocolo de Bitcoin",
          texto: "Un protocolo es un conjunto de reglas o procedimientos que gobiernan un sistema. El protocolo de Bitcoin es el conjunto de reglas que definen cómo opera el sistema: cómo se validan las transacciones, cómo se crean nuevos bitcoins, cómo deben comunicarse los nodos.\n\nEstas reglas están escritas directamente en el código del software y son las mismas para todos. Nadie puede cambiarlas unilateralmente.",
        },
        {
          titulo: "Componente 4: El libro mayor distribuido (blockchain)",
          texto: "Para entender cómo funciona Bitcoin, es fundamental entender el concepto de libro mayor distribuido (distributed ledger).\n\nEn un banco, hay un libro mayor centralizado donde se registran todas las transacciones — y solo el banco tiene acceso a él. En Bitcoin, ese libro mayor es público y está distribuido en miles de computadoras simultáneamente. Cada nodo de la red tiene una copia completa de todas las transacciones que jamás han ocurrido en Bitcoin.",
        },
        {
          titulo: "Componente 5: La minería",
          texto: "La minería es lo que hace que todo el sistema funcione. Los mineros son computadoras especializadas que:\n\n1. Validan las nuevas transacciones (verificando que no haya doble gasto).\n2. Las agrupan en bloques y las añaden al libro mayor público (la blockchain).\n3. A cambio, reciben bitcoins nuevos como recompensa.\n\nSin mineros, no habría nadie procesando transacciones ni manteniendo la red segura.",
        },
        {
          titulo: "Cómo encajan los componentes",
          puntos: [
            "El software define las reglas del juego (protocolo) y se comunica con otros nodos.",
            "La red es el conjunto de todos los nodos ejecutando ese software en el mundo.",
            "El libro mayor distribuido (blockchain) guarda el historial completo de transacciones.",
            "Los mineros validan transacciones, crean nuevos bloques y mantienen la red segura.",
            "Ningún componente funciona solo — todos dependen del resto del sistema.",
          ],
        },
      ],
      imagenes: [],
    },
    ...Array.from({ length: 2 }, (_, i) => ({
      id: `crypto-02-${i + 4}`,
      titulo: `Clase ${i + 4}`,
      resumen: "Contenido de la lección pendiente por cargar.",
      estado: "Contenido pendiente",
    })),
  ];

  return {
    ...mod,
    clases: mod.id === "crypto-01"
      ? clasesModulo1
      : mod.id === "crypto-02"
      ? clasesModulo2
      : Array.from({ length: mod.lessons }, (_, i) => ({
          id: `${mod.id}-${i + 1}`,
          titulo: `Clase ${i + 1}`,
          resumen: "Contenido de la lección pendiente por cargar.",
          estado: "Contenido pendiente",
        })),
  };
});
