export const CRYPTO_BOOTCAMP = [
  { id:"crypto-01", titulo:"Introducción", lessons:4, sourcePath:"/crypto/learn/introduction" },
  { id:"crypto-02", titulo:"Bitcoin desde cero", lessons:5, sourcePath:"/crypto/learn/bitcoin-for-beginners" },
  { id:"crypto-03", titulo:"Cómo funciona la red Bitcoin", lessons:4, sourcePath:"/crypto/learn/bitcoin-network-for-beginners" },
  { id:"crypto-04", titulo:"Hashing y seguridad criptográfica", lessons:4, sourcePath:"/crypto/learn/hashing-for-beginners" },
  { id:"crypto-05", titulo:"Minería de Bitcoin y consenso", lessons:4, sourcePath:"/crypto/learn/bitcoin-mining-for-beginners" },
  { id:"crypto-06", titulo:"Fundamentos de blockchain", lessons:2, sourcePath:"/crypto/learn/blockchain-for-beginners" },
  { id:"crypto-07", titulo:"Wallets, llaves y autocustodia", lessons:8, sourcePath:"/crypto/learn/bitcoin-wallets-for-beginners" },
  { id:"crypto-08", titulo:"Firmas digitales y prueba de propiedad", lessons:7, sourcePath:"/crypto/learn/digital-signatures-for-beginners" },
  { id:"crypto-09", titulo:"Tipos de Altcoins: Privacidad, Memes y Estables", lessons:4, sourcePath:"/crypto/learn/altcoins-for-beginners" },
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
      contenidoV2:[
        {
          titulo:"¿Qué es una criptomoneda?",
          texto:"Probablemente alguien te habló de cripto en una cena, lo viste en redes, o simplemente te picó la curiosidad. No importa cómo llegaste aquí — estás en el lugar correcto.\n\nUna criptomoneda (o \"cripto\") es un término general para un nuevo tipo de \"dinero digital\" que depende de una combinación de tecnologías que le permiten existir fuera del control de autoridades centrales como gobiernos y bancos.\n\nPero ¿qué son realmente? ¿En qué se diferencian de las monedas que ya conoces? Eso es exactamente lo que vas a descubrir en esta lección.",
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
          texto:"A diferencia de las monedas tradicionales — llamadas monedas \"fiat\" (del latín, significa \"que así sea\", porque su valor existe por decreto del gobierno) — las criptomonedas no están conectadas a ningún gobierno ni banco central.\n\nEl dólar estadounidense es emitido y controlado por la Reserva Federal (\"Fed\"), el euro por el Banco Central Europeo (BCE), y el yen japonés por el Banco de Japón (BOJ). Las criptomonedas no tienen este tipo de control central. Esta característica definitoria se conoce como descentralización.\n\nSi ningún banco central o gobierno emite criptomonedas, ¿entonces quién las crea? Las unidades se generan según reglas predeterminadas escritas en código, ejecutadas por software. Obviamente software que un humano creó.",
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
          texto:"Las criptomonedas ofrecen algo que no habíamos visto antes: la posibilidad de que las personas tengan control total sobre su dinero, sin intermediarios ni permisos.\n\nSi este potencial se cumple por completo aún está por verse. Pero lo que sí es cierto es que están cambiando la forma en que el mundo piensa sobre el dinero — y tú estás a punto de entender exactamente cómo funcionan.\n\nEso es lo que viene en este curso: no solo qué es la cripto, sino cómo funciona por dentro y cómo navegar este mundo con criterio.",
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
      contenidoV2:[
        {
          titulo:"Cripto como activo financiero",
          texto:"Además de funcionar como un nuevo tipo de \"dinero digital\" para pagar bienes y servicios, las criptomonedas se usan más frecuentemente como activos financieros que las personas intercambian o en los que invierten.\n\nLa industria financiera tradicional — conocida como \"TradFi\" (de \"Traditional Finance\", finanzas tradicionales) — sigue dividida sobre si las criptomonedas deben considerarse un activo financiero. El argumento popular es que es imposible valorarlas porque no tienen ganancias ni dividendos, pero también existen activos financieros con problemas similares, como el oro y otras materias primas.",
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
          texto:"Los principiantes que entran al mundo cripto sin preparación escuchan cosas como: \"¡Esta moneda no solo va a cambiar el mundo, sino la galaxia entera!\". Y piensan: \"¡Debo comprar Galaticoin ya mismo!\" — compran sin entender nada de la tecnología detrás. Y esa criptomoneda termina siendo inútil.\n\nEste patrón se repite una y otra vez. La buena noticia: tú ya estás haciendo algo diferente — estás educándote primero.",
          imagen:{ src:"/bootcamp/mod1-lec2/galaticoin.png", alt:"Galaticoin — ejemplo de cripto dudosa" },
        },
        {
          titulo:"No seas el ciervo de una pata",
          texto:"Imagina un ciervo que intenta cruzar la llanura con una pata rota: lento, vulnerable, fácil presa. Eso es lo que parece alguien que entra al mercado cripto creyendo que el dinero crece solo, sin entender nada.\n\nPara un estafador, un mercado lleno de inversores ingenuos es exactamente eso: un campo lleno de ciervos vulnerables. No seas uno de ellos.",
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
          cierre:"La cripto bien entendida puede ser una herramienta poderosa. La clave está en entenderla antes de usarla — y eso es exactamente lo que vas a hacer aquí.",
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
      contenidoV2:[
        {
          titulo:"¡Hola! Soy Cryptoshi",
          texto:"¡Bienvenido a la Escuela de Cripto de The Crypto House! Soy Cryptoshi, tu guía en este recorrido.\n\nSi eres nuevo en las criptomonedas, llegaste al lugar correcto. Creé este curso para que los principiantes entiendan el mercado cripto de forma clara y práctica: Bitcoin, altcoins, tokens y cómo funciona todo esto.\n\nTe voy a ser honesto desde el principio: hay cosas que van a sorprenderte, cosas que van a desafiarte — y cosas que, cuando las entiendas, van a cambiar la forma en que ves el dinero.",
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
          texto:"No es exageración decir que las criptomonedas son extremadamente especulativas. Si no gestionas bien tu riesgo, la probabilidad de perder mucho (si no todo) tu dinero es alta.\n\nNo caigas en el típico discurso de ventas fáciles:\n\"¡No te preocupes si no lo entiendes. Los que sí lo entienden dicen que va a ser enorme. ¡Es la próxima gran cosa!\"\n\nNo estoy de acuerdo. TÚ sí necesitas entenderlo. Esa es la diferencia entre los que sobreviven al mercado y los que no.",
          imagen:{ src:"/bootcamp/mod1-lec3/cryptoshi-caution.png", alt:"Cryptoshi advierte sobre el riesgo" },
        },
        {
          titulo:"La historia que no quieres contarle a tus nietos",
          texto:"En el futuro, cuando tus nietos te visiten, ¿cuál de estas dos historias quieres contarles?\n\n1. \"Perdí la oportunidad del cripto.\"\n2. \"Aposté los ahorros de mi vida en cripto, lo perdí todo porque no entendía lo que compraba y me engañó un estafador carismático.\"\n\n¡Ojalá no tengas que contar ninguna de las dos! Hay una tercera historia disponible — la de quien aprendió, actuó con criterio y salió adelante.",
          imagen:{ src:"/bootcamp/mod1-lec3/old-crypto-trader.png", alt:"El trader arruinado: una historia de advertencia" },
        },
        {
          titulo:"La misión de Cryptoshi",
          texto:"Quiero evitar que te conviertas en una víctima. Es fundamental tener al menos una comprensión básica de la tecnología y los conceptos de las criptomonedas antes de poner cualquier cantidad de dinero.\n\nEspero que este curso sirva como base sólida para quienes comienzan su viaje en el mundo cripto. Al final, podrás decidir si este mundo es para ti — con conocimiento real, no con ilusión.",
          imagen:{ src:"/bootcamp/mod1-lec3/cryptoshi-welcome-aboard.png", alt:"Cryptoshi da la bienvenida al curso" },
        },
        {
          titulo:"Lo que vas a aprender",
          puntos:[
            "Cómo saber si una cripto tiene valor real o es puro humo.",
            "Qué es Bitcoin, qué son las altcoins y por qué no todas valen lo mismo.",
            "Cómo leer el mercado para tomar decisiones informadas, no impulsivas.",
            "Las señales de alerta que usan los estafadores — para que nunca caigas.",
            "Por qué los que sobreviven al mercado cripto gestionan el riesgo de forma diferente.",
          ],
        },
        {
          titulo:"💡 Clave del éxito",
          texto:"Educarte es la clave del éxito al hacer trading o invertir en cripto. Puede ser la diferencia entre generar riqueza y perderlo todo.\n\n¿Listo para empezar? La siguiente lección es el primer paso concreto.",
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
      contenidoV2:[
        {
          titulo:"¿Por dónde empezar?",
          texto:"Hoy existen miles de criptomonedas en el mercado. Cuando los precios han subido, el valor total de todas esas criptomonedas ha superado los $3 billones, con un volumen diario de operaciones de más de $300 mil millones.\n\nEn otras palabras: el mercado cripto es enorme y crece rápido. Para un principiante, intentar saber por dónde empezar puede sentirse abrumador — como entrar a una biblioteca inmensa sin saber el idioma.\n\nPor eso, en lugar de intentar aprenderlo todo de golpe, vamos a empezar por Bitcoin.",
          imagen:{ src:"/bootcamp/mod1-lec4/bitcoin-yay.png", alt:"Guía de principiantes de Bitcoin" },
        },
        {
          titulo:"¿Por qué empezar con Bitcoin?",
          texto:"Bitcoin fue la criptomoneda original. Los avances técnicos que permitieron que Bitcoin existiera son la base de todas las demás criptomonedas.\n\nEntender Bitcoin — qué es, de dónde viene y cómo funciona — te proporciona una base sólida para navegar todo el espacio cripto. Muchos de los conceptos necesarios para entender Bitcoin aplican directamente a otras criptomonedas.\n\nSi logras entender Bitcoin lo suficiente como para no estar perdido, tendrás un tiempo mucho más fácil con todo lo demás. Ese es el objetivo.",
        },
        {
          titulo:"La definición técnica de Bitcoin",
          texto:"Empecemos con una descripción muy simple de Bitcoin:\n\n\"Bitcoin es una moneda digital descentralizada, basada en un diseño de software de código abierto, que se utiliza para transmitir valor entre usuarios pseudónimos. Todas las transacciones, una vez confirmadas por los mineros mediante PoW (Prueba de Trabajo) como mecanismo de consenso, se almacenan en un libro de contabilidad distribuido, llamado blockchain.\"\n\n¿Entendiste todo eso?",
          imagen:{ src:"/bootcamp/mod1-lec4/toshi-jargon-overload.png", alt:"Sobrecarga de jerga cripto" },
        },
        {
          titulo:"¡No te intimides!",
          texto:"No pasa nada si no entendiste la definición técnica. Esta es la GUÍA PARA PRINCIPIANTES de Bitcoin y partimos de cero conocimiento técnico.\n\nPero como puedes ver claramente, ¡el mundo cripto está lleno de jerga! Meterse en cripto introduce una gran cantidad de términos con los que la mayoría de personas no están familiarizadas.\n\nLa buena noticia: al final de este curso, vas a leer esa definición de nuevo — y la vas a entender completamente.",
          imagen:{ src:"/bootcamp/mod1-lec4/crypto-jargon.png", alt:"¿Qué es toda esta jerga cripto?" },
        },
        {
          titulo:"El plan: destruir la jerga",
          texto:"Si realmente quieres entender las criptomonedas y en qué se diferencian, es muy importante que te familiarices con ciertos conceptos fundamentales.\n\nNuestro objetivo es cubrir los términos y frases que quizás no conozcas ahora, pero que sí necesitas saber. Juntos, vamos a destruir la jerga — término por término, concepto por concepto — para que puedas hablar el idioma del mundo cripto con facilidad y confianza.",
          imagen:{ src:"/bootcamp/mod1-lec4/jargon-blaster.png", alt:"Destruyendo la jerga cripto" },
        },
        {
          titulo:"Un vocabulario común y claro",
          texto:"También hemos encontrado muchas inconsistencias en cómo ciertos términos se usan o definen en internet. Queremos establecer un vocabulario común con definiciones claras y consistentes.\n\nEsto garantiza que cada vez que aparezca una palabra técnica a lo largo del curso, sepas exactamente qué significa — sin confusiones, sin ambigüedades.",
        },
        {
          titulo:"De \"cripto ignorante\" a \"cripto competente\"",
          texto:"Al final de este curso, PODRÁS entender la definición técnica de Bitcoin que escribimos antes en esta lección. Tendrás el conocimiento suficiente para enfrentarte a terminología cripto desconocida con confianza.\n\nPasarás de ser \"cripto ignorante\" a \"cripto competente\".",
          imagen:{ src:"/bootcamp/mod1-lec4/crypto-party.png", alt:"Celebrando el conocimiento cripto" },
        },
        {
          titulo:"Lo que viene en los próximos módulos",
          puntos:[
            "Módulo 2 — Por qué fue creado Bitcoin y qué problema resuelve.",
            "Módulo 3 — Cómo funciona la red Bitcoin por dentro.",
            "Módulo 4 — Qué es el hashing y cómo protege cada transacción.",
            "Módulo 5 — La minería y cómo se llega al consenso sin un jefe.",
            "Y mucho más: wallets, altcoins, exchanges, trading, NFTs y análisis on-chain.",
          ],
          cierre:"Cada módulo construye sobre el anterior. Al terminar, tendrás una visión completa y práctica del mundo cripto.",
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
      resumen: "Las firmas digitales son el mecanismo que prueba que eres el dueño de los bitcoins que deseas enviar, sin revelar tu clave privada a la red.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-digital-signature",
      contenido: [
        {
          titulo: "¿Qué es una firma digital?",
          texto: "Cuando quieres enviar algunos bitcoins, tu wallet crea una \"transacción\" y la envía a un nodo en la red Bitcoin, que luego la difunde a otros nodos. Cuando inicias una transacción de Bitcoin, debes probar a cada nodo en la red que estás autorizado a gastar esos fondos.\n\nUna transacción es simplemente un mensaje que contiene información sobre el emisor, el destinatario y la cantidad de BTC a transferir (incluyendo una comisión de transacción). Antes de enviarlo, se te exige \"firmarlo\".",
          imagen: { src: "/bootcamp/mod8-lec1/math-magic-with-private-key.png", alt: "Magia matemática con clave privada" },
        },
        {
          titulo: "Clave pública, clave privada y dirección",
          texto: "Bitcoin usa criptografía de clave pública para crear un \"par de claves\" que controla el acceso a los bitcoins. La clave privada genera una clave pública. La clave pública luego genera una dirección — una cadena de letras y números que se comparte para recibir bitcoin.",
          imagen: { src: "/bootcamp/mod8-lec1/relationship-between-keys-and-addresses.png", alt: "Relación entre claves y direcciones" },
        },
        {
          titulo: "¿Qué significa tener bitcoin?",
          puntos: [
            "Existen bitcoins vinculados a una dirección específica.",
            "Esa dirección y la cantidad de bitcoins que contiene están registradas en la blockchain de Bitcoin.",
            "Tienes una clave privada que prueba matemáticamente que eres el dueño de esa dirección.",
            "Solo tú puedes \"mover\" o enviar esos bitcoins a una dirección diferente.",
          ],
        },
        {
          titulo: "Propósito de la firma digital",
          texto: "Para gastar bitcoins de una dirección, debes probar que conoces la clave privada vinculada a esa dirección — sin revelarla. La clave pública actúa como tu \"identidad\" en la blockchain de Bitcoin. Una firma digital es algo que puedes usar para probar que conoces la clave privada conectada a una clave pública, sin tener que revelar la clave privada real.",
          imagen: { src: "/bootcamp/mod8-lec1/digital-signature-math-magic.png", alt: "Magia matemática de la firma digital" },
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-08-2",
      titulo: "¿Qué es el cifrado?",
      resumen: "Para entender verdaderamente el concepto de las firmas digitales, primero debemos entender cómo funciona el cifrado. El cifrado es un concepto clave en criptografía.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-encryption",
      contenido: [
        {
          titulo: "¿Qué es el cifrado?",
          texto: "El cifrado es el proceso de transformar datos como texto legible (conocido como \"texto plano\" o \"plaintext\") usando un algoritmo (llamado \"cifrador\" o \"cipher\") para hacerlo ilegible para cualquiera excepto para quienes poseen un conocimiento especial, usualmente llamado una \"clave\".\n\nEl resultado del proceso es texto cifrado (conocido como \"ciphertext\").\n\nEn el sentido más básico, el cifrado significa usar \"matemáticas sofisticadas\" y un conjunto de instrucciones que sigue una computadora (un \"algoritmo\") para disfrazar y proteger datos.",
          imagen: { src: "/bootcamp/mod8-lec2/encryption-protects-data.png", alt: "El cifrado protege los datos" },
        },
        {
          titulo: "Cifrado y descifrado",
          texto: "Estos algoritmos convierten los datos en \"texto plano\" en un texto incomprensible conocido como \"texto cifrado\", que parece una cadena de caracteres sin sentido sin el uso de una clave especial que lo descifre.\n\nAquí hay un ejemplo de texto cifrado:\n\nEjQbCXilQmoEssL0tP1395IKLEAwSEhptF6ogdoHGZ1LHgpeon7PFWcADod/ir78\n\nUna vez que los datos están cifrados usando un algoritmo, no puedes interpretarlos ni adivinar el contenido original del mensaje a partir del texto cifrado.",
          puntos: [
            "Cifrado (Encryption): proceso de convertir texto plano en texto cifrado. El texto cifrado es incomprensible y oculta el mensaje original de personas no autorizadas.",
            "Descifrado (Decryption): proceso de convertir texto cifrado de vuelta en texto plano. Es básicamente el proceso inverso del cifrado.",
          ],
        },
        {
          titulo: "¿Cómo funciona el cifrado?",
          texto: "En la siguiente ilustración puedes ver cómo los datos cambian de texto plano a texto cifrado y de vuelta a texto plano mediante el uso de claves de cifrado y descifrado.",
          imagen: { src: "/bootcamp/mod8-lec2/how-encryption-works.png", alt: "Cómo funciona el cifrado" },
        },
        {
          titulo: "Dos tipos de cifrado",
          texto: "Las claves pueden ser idénticas (\"simétricas\") o únicas (\"asimétricas\"). Esto significa que hay dos tipos principales de cifrado:",
          puntos: [
            "Cifrado simétrico: este tipo de cifrado es recíproco, lo que significa que se usa LA MISMA clave para cifrar y descifrar los datos.",
            "Cifrado asimétrico: este tipo de cifrado usa DOS claves SEPARADAS para el cifrado y el descifrado: una clave privada y una clave pública.",
          ],
        },
        {
          titulo: "Las criptomonedas usan solo cifrado asimétrico",
          texto: "Si el remitente y el destinatario de los datos usan LA MISMA clave para cifrar y descifrar los datos, se llama cifrado simétrico. Y si las claves son DIFERENTES para el cifrado y el descifrado, entonces es cifrado asimétrico.\n\nEn criptografía, una \"clave\" es simplemente un número grande (un número grande y extenso con muchos dígitos) o una cadena de números y letras. Se usa para convertir el texto plano en texto cifrado y viceversa.\n\nLas criptomonedas solo hacen uso del cifrado asimétrico.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-08-3",
      titulo: "¿Qué es el cifrado asimétrico?",
      resumen: "El cifrado asimétrico es un tipo de cifrado que usa dos claves separadas pero matemáticamente conectadas: una clave privada y una clave pública. Juntas forman un \"par de claves\".",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-asymmetric-encryption",
      contenido: [
        {
          titulo: "¿Qué es el cifrado asimétrico?",
          texto: "El cifrado asimétrico es un tipo de cifrado que usa dos claves separadas pero matemáticamente conectadas para cifrar y descifrar datos y protegerlos de acceso o uso no autorizado.\n\nEstas claves se conocen como:\n1. Clave privada\n2. Clave pública\n\nJuntas se llaman un \"par de claves pública y privada\" o simplemente \"par de claves\".\n\nUna de las claves, la clave pública, está disponible para que cualquiera la use. La otra clave es la clave privada.\n\nLos datos cifrados con la clave pública SOLO pueden descifrarse con la clave privada. Por eso el cifrado asimétrico también se conoce como \"criptografía de clave pública\".",
        },
        {
          titulo: "Cómo funciona el cifrado asimétrico (ejemplo clásico)",
          texto: "Para enviar datos cifrados a alguien, debes cifrar los datos con la clave pública de esa persona, y la persona que recibe los datos los descifra con la clave privada correspondiente.\n\nTodos los datos que envías por internet están en texto plano. Esto significa que cualquiera que tenga acceso a ellos puede verlos y leerlos.\n\nSi no quieres que nadie pueda leer tus datos, lo que puedes hacer es cifrar los datos usando la clave pública del destinatario. Una vez que los datos se han convertido en texto cifrado, no puedes descifrarlo usando la misma clave. El texto cifrado solo puede descifrarse con la clave privada correspondiente, que solo tiene el destinatario.",
          imagen: { src: "/bootcamp/mod8-lec3/how-asymmetric-encryption-works-classic-example-2.png", alt: "Cómo funciona el cifrado asimétrico - ejemplo clásico" },
        },
        {
          titulo: "La carta de amor",
          texto: "Si te envío una carta de amor a tu mamá por internet y no quiero que tú puedas leerla, puedo usar el cifrado asimétrico.\n\nCifraría el mensaje con la clave pública de tu mamá y luego le enviaría el mensaje.\n\nPoder descifrar el texto de vuelta a un formato legible requeriría la clave privada, que solo tu mamá posee. ¡Así que SOLO ELLA podría leer el mensaje (¡no tú!) y conocer mis verdaderos sentimientos por ella!",
          imagen: { src: "/bootcamp/mod8-lec3/love-yo-mama.png", alt: "Carta de amor" },
        },
        {
          titulo: "Cómo funciona el cifrado asimétrico en las criptomonedas",
          texto: "El cifrado asimétrico se usó primero para cifrar y descifrar mensajes. Pero las criptomonedas ahora usan esta tecnología de una manera ligeramente diferente.\n\nEn el ejemplo clásico del cifrado asimétrico, expliqué cómo se usa una clave pública para cifrar datos y luego se necesita la clave privada para descifrar los datos.\n\nPero ¡el proceso INVERSO también funciona!\n\nTambién puedes usar una clave privada para cifrar datos y luego usar la clave pública para descifrar los datos.\n\n¡Y así es como se usa el cifrado asimétrico en las criptomonedas! En las criptomonedas, el remitente usa su clave privada para cifrar un mensaje especial y el destinatario usa la clave pública del remitente para descifrarlo.",
          imagen: { src: "/bootcamp/mod8-lec3/how-asymmetric-encryption-works-crypto-example.png", alt: "Cómo funciona el cifrado asimétrico en las criptomonedas" },
        },
        {
          titulo: "Autenticación: probar que eres quien dices ser",
          texto: "En Bitcoin (y otras criptomonedas), todas las transacciones son públicas, por lo que no necesita mantener los datos privados o confidenciales.\n\nUsa el cifrado asimétrico para un propósito completamente diferente: para la autenticación... para probar que eres quien dices ser.\n\nMás específicamente, cuando quieres enviar algunos bitcoins a otra persona, se usa para probar que TÚ eres el propietario real de los bitcoins que deseas enviar.\n\nSi cifras (\"bloqueas\") algo con tu clave privada, cualquiera puede descifrarlo (\"desbloquearlo\") con tu clave pública. Esto sirve como prueba de que eres el remitente original del mensaje porque eres el ÚNICO que podría haber cifrado el mensaje (porque tienes la clave privada correspondiente).\n\nY una vez que tu identidad (como el verdadero propietario de los bitcoins que deseas enviar) ha sido autenticada, ahora estás autorizado para enviar los bitcoins.",
          puntos: [
            "Identificación: significa reclamar SER alguien.",
            "Autenticación: significa probar que realmente eres quien afirmas ser.",
            "Autorización: significa obtener acceso a algo gracias a la identidad previamente autenticada.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-08-4",
      titulo: "Cómo funcionan las firmas digitales (casi)",
      resumen: "Antes de entrar en los detalles técnicos, esta historia de Batman te ayudará a entender la lógica detrás de las firmas digitales de una forma sencilla y divertida.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-digital-signatures-work",
      contenido: [
        {
          titulo: "Batman tiene una caja especial",
          batmanQuote: ["¡Hola! ¡Soy Batman!", "¡Miren mi caja!"],
          texto: "Imagina que Batman tiene una caja. Esta caja tiene un candado... un tipo de candado muy especial.",
          imagen: { src: "/bootcamp/mod8-lec4/box-with-lock.png", alt: "Caja con candado" },
        },
        {
          titulo: "El candado con tres estados",
          texto: "Este candado tiene TRES estados:",
          puntos: [
            "Bloqueado (A): cuando la llave se gira completamente a la izquierda, está bloqueado.",
            "Desbloqueado (B): cuando la llave está en el centro, está desbloqueado.",
            "Bloqueado (C): cuando la llave se gira completamente a la derecha, está bloqueado.",
          ],
          imagen: { src: "/bootcamp/mod8-lec4/digital-signature-lock-1.png", alt: "Candado con 3 estados" },
        },
        {
          titulo: "Dos llaves separadas",
          texto: "El candado tiene DOS llaves separadas: una llave negra y una llave amarilla.\n\nLa llave negra solo puede girar a la DERECHA (de A a B a C). La llave amarilla solo puede girar a la IZQUIERDA (de C a B a A).\n\nEsto significa que si la caja está bloqueada en la posición A, solo la llave negra puede abrirla girando a la derecha, a la posición B. Si la caja está bloqueada en la posición C, solo la llave amarilla puede abrirla girando a la izquierda, a la posición B.\n\nAsí que CUALQUIERA de las llaves puede cerrar la caja, pero una vez que está cerrada, solo la OTRA llave puede abrirla.",
          imagen: { src: "/bootcamp/mod8-lec4/digital-signature-two-keys.png", alt: "Dos llaves separadas" },
        },
        {
          titulo: "La clave privada y la clave pública",
          texto: "Como el negro es su color favorito, Batman escoge la llave negra y la guarda para sí mismo. Llamemos a esta llave su clave \"privada\" porque ahora solo Batman la tiene.\n\nLlamemos a la segunda llave, la llave amarilla, su clave \"pública\": Batman hace un millón de copias de ella y cuando conduce por las calles de Ciudad Gótica en su Batimóvil, las lanza por la ventana a los peatones.",
          imagen: { src: "/bootcamp/mod8-lec4/toss-public-keys-batmobile.png", alt: "Batman lanza claves públicas desde el Batimóvil" },
        },
        {
          titulo: "Batman se retira",
          batmanQuote: "Estoy cansado de esta rica y famosa vida de superhéroe.",
          texto: "Imagina que Bruce Wayne decide retirarse como \"Batman\" y dar todo su dinero a Alfred, su mayordomo.\n\nAsí que escribe en un papel: \"Dale 1 billón de dólares a Alfred LO ANTES POSIBLE\".\n\nBatman mete este papel en la caja. Usando su llave privada, gira su llave privada a la posición C... bloqueando la caja.",
          imagen: { src: "/bootcamp/mod8-lec4/batman-letter.png", alt: "La carta de Batman" },
        },
        {
          titulo: "La caja bloqueada con clave privada",
          batmanQuote: ["Dale esto a mi banquero.", "Si mi banquero no te cree, dale la caja bloqueada."],
          texto: "Luego toma otro papel y escribe el mismo mensaje, \"Dale 1 billón de dólares a Alfred LO ANTES POSIBLE\".\n\nLe da este papel a Alfred y le da instrucciones.\n\nAhora hay dos cartas con el mismo mensaje. Una está bloqueada en la caja. La otra está en el bolsillo de Alfred, técnicamente visible para cualquiera.",
          imagen: { src: "/bootcamp/mod8-lec4/box-locked-with-private-key.png", alt: "Caja bloqueada con clave privada" },
        },
        {
          titulo: "La noticia se difunde",
          texto: "Más tarde esa noche, Batman le dice a Robin que se retira y dará todo su dinero a Alfred. Robin filtra la noticia a la prensa y al día siguiente está en todos los canales de noticias.",
          imagen: { src: "/bootcamp/mod8-lec4/batman-news-flash.png", alt: "¡Batman en las noticias!" },
        },
        {
          titulo: "Alfred visita al banquero",
          texto: "El banquero de Batman, Daime Jimon, en el Banco Nacional de Gótica, está viendo las noticias en su oficina. Para su sorpresa, Alfred aparece pidiendo el dinero y le muestra el papel.\n\nDaime Jimon no cree las noticias y se niega. Alfred saca la caja bloqueada.",
          imagen: { src: "/bootcamp/mod8-lec4/alfred-with-box.png", alt: "Alfred con la caja" },
        },
        {
          titulo: "El mensaje y la clave pública",
          texto: "Ahora el banquero tiene tanto el mensaje como la caja. Al igual que todos en Ciudad Gótica, Daime Jimon tiene una llave amarilla que recogió de la calle.",
          imagen: { src: "/bootcamp/mod8-lec4/message-and-public-key.png", alt: "Mensaje con clave pública y firma digital" },
        },
        {
          titulo: "Verificación con la clave pública",
          texto: "Daime Jimon saca la llave \"pública\" de su bolsillo y ve si puede abrir la caja. Gira la llave \"pública\" en sentido contrario a las agujas del reloj hacia la izquierda a la posición B ¡y la caja se abre!\n\nDentro de la caja está la carta que escribió Batman. Y coincide con la primera carta que Alfred le mostró.",
          imagen: { src: "/bootcamp/mod8-lec4/batman-letter-matches.png", alt: "Las cartas de Batman coinciden" },
        },
        {
          titulo: "Conclusión: así funciona una firma digital",
          texto: "Daime Jimon se disculpa con Alfred y le pide a su asistente que prepare el dinero.\n\nSe da cuenta de que la única forma en que la caja estaba bloqueada era usando la llave \"privada\" de Batman, que solo Batman posee. Esto significa que nadie más podría haber metido la carta en la caja excepto Batman, ¡y prueba que la carta es, de hecho, de Batman!\n\nEl uso del \"par de llaves\" es cómo Batman puede probar que el mensaje provino de él, y solo de él, sin tener que proporcionar una firma física manuscrita. Y el uso de la caja bloqueada implica que el mensaje dentro siempre estuvo protegido e intacto una vez que la caja fue bloqueada.\n\nEste es un ejemplo crudo de cómo funciona una \"firma digital\".",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-08-5",
      titulo: "¿Cómo funcionan realmente las firmas digitales?",
      resumen: "Aprende cómo se crea y verifica una firma digital en Bitcoin paso a paso, incluyendo cómo probar la identidad del remitente y que el mensaje no fue alterado.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-do-digital-signatures-work",
      contenido: [
        {
          titulo: "Los bloques de construcción necesarios",
          texto: "Para llegar a este punto, tuvimos que aprender varios conceptos técnicos primero, ya que son los \"bloques de construcción\" necesarios para crear una firma digital:",
          puntos: [
            "Funciones hash",
            "Claves privadas y públicas",
            "Cifrado asimétrico",
          ],
        },
        {
          titulo: "¿Cómo se crea una firma digital?",
          texto: "Veamos cómo se crea una firma digital paso a paso:",
          puntos: [
            "Paso 1: Cuando quieres enviar bitcoin, tu wallet crea un mensaje de transacción. Este mensaje contiene información como la cantidad de bitcoins que deseas enviar y la dirección del destinatario.",
            "Paso 2: Este mensaje pasa por una función hash.",
            "Paso 3: La función hash produce una salida conocida como el \"hash del mensaje\" o simplemente \"hash\".",
            "Paso 4: Este hash del mensaje se cifra con tu clave privada.",
            "Paso 5: El hash del mensaje cifrado se convierte en la \"firma digital\".",
          ],
          imagen: { src: "/bootcamp/mod8-lec5/how-digital-signature-is-created.png", alt: "Cómo se crea una firma digital" },
        },
        {
          titulo: "La firma es única para cada transacción",
          texto: "Al final de este proceso, tu wallet ha creado dos \"elementos\": el mensaje de transacción y la firma digital (un hash cifrado del mensaje de transacción).\n\nNota que el mensaje de transacción en sí mismo es necesario como \"ingrediente\" para crear la firma digital. No solo usas tu clave privada para crear una firma digital... usas tu clave privada Y el hash del mensaje de transacción.\n\nEsto significa que no puedes usar esta firma digital para otra transacción. Si intentaras usar esta firma digital en una segunda transacción, sería rechazada por la red Bitcoin porque la firma digital se basa únicamente en los datos de la primera transacción.\n\nCada firma digital es única para una transacción específica.",
        },
        {
          titulo: "¿Cómo se verifica una firma digital?",
          texto: "Para gastar bitcoins de una dirección Bitcoin particular, uno debe probar \"propiedad\" (o: conocimiento) de la clave privada vinculada a la clave pública asociada a esa dirección. Pero quieres hacer esto sin tener que revelar tu clave privada.\n\nUna firma digital es algo que puedes usar para PROBAR que conoces la clave privada que está conectada a una clave pública, sin tener que revelar la clave privada real.",
          puntos: [
            "Paso 1: Tu wallet proporciona tres \"elementos\" a la red Bitcoin: el mensaje de transacción original, la firma digital y tu clave pública.",
            "Paso 2: Una vez que un nodo Bitcoin recibe estos \"elementos\", los separa.",
            "Paso 3: Toma el mensaje de transacción original y lo pasa por la misma función hash. En cuanto a la firma digital, usa la clave pública proporcionada para descifrarla.",
            "Paso 4: Ambos hashes se comparan entonces.",
            "Paso 5: ¿Coinciden exactamente ambos hashes?",
            "Paso 6: Si ambos hashes coinciden, esto prueba que eres el propietario real de los bitcoins que deseas enviar.",
          ],
          imagen: { src: "/bootcamp/mod8-lec5/how-digital-signature-is-validated.png", alt: "Cómo se verifica una firma digital" },
        },
        {
          titulo: "1. Poder descifrar con la clave pública prueba la identidad del remitente",
          texto: "Una vez que un nodo puede descifrar la firma digital, esto prueba tu \"identidad\".\n\nRecuerda, dado que una clave privada y una clave pública están matemáticamente vinculadas, si puedes descifrar un mensaje con mi clave pública, significa que lo cifré con mi clave privada.\n\nSi no pudieras descifrar el mensaje, significa que fue cifrado por la clave privada de otra persona. Y eso significa que el mensaje no provino de mí.",
        },
        {
          titulo: "2. Hashes que coinciden exactamente prueban que el mensaje no fue alterado",
          texto: "Verificar que ambos hashes coincidan exactamente garantiza que el mensaje original no ha sido alterado.\n\nEsto es importante porque, a diferencia de la firma digital que está cifrada, el mensaje de transacción original está en texto plano porque todas las transacciones de Bitcoin son públicas.\n\nRecuerda, cualquier pequeño cambio produciría un hash totalmente diferente. Así que si alguien interceptara el mensaje de transacción original en su camino a un nodo y lo modificara (como para enviar el bitcoin a su dirección), cuando el mensaje pase por la función hash, produciría un hash totalmente diferente al de la firma digital.",
          imagen: { src: "/bootcamp/mod8-lec5/digital-signature-process.png", alt: "El proceso completo de la firma digital" },
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-08-6",
      titulo: "Cómo funciona una transacción de Bitcoin",
      resumen: "En esta lección verás cómo funciona una transacción de Bitcoin de principio a fin, tanto desde la perspectiva del usuario como desde una vista general de la red.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-a-bitcoin-transaction-works",
      contenido: [
        {
          titulo: "¿Qué es una transacción de Bitcoin?",
          texto: "Una transacción de Bitcoin es una transferencia de una cierta cantidad de bitcoins de una dirección a otra dirección que queda registrada en la blockchain.\n\nIronman tiene 1 bitcoin que quiere enviarle a Batman.",
          imagen: { src: "/bootcamp/mod8-lec6/ironman-batman-bitcoin-transaction.png", alt: "Ironman envía 1 BTC a Batman" },
        },
        {
          titulo: "Perspectiva de Ironman — Paso 1: Abrir el wallet",
          texto: "Lo primero que haría Ironman es abrir su wallet de Bitcoin. En este ejemplo, está usando un wallet de software que instaló en su laptop.",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-transaction-step-1.png", alt: "Ironman inicia la transacción de Bitcoin" },
        },
        {
          titulo: "Paso 2: Obtener la dirección de Batman",
          texto: "Lo siguiente que hace es pedirle a Batman su dirección Bitcoin, que es donde Batman quiere recibir sus bitcoins. Batman le envía una dirección Bitcoin por correo electrónico e Ironman la copia y pega.",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-transaction-step-2.png", alt: "Ironman pide la dirección de Batman" },
        },
        {
          titulo: "Paso 3: Ingresar la cantidad",
          texto: "Ironman luego ingresa la cantidad de bitcoins que quiere enviarle a Batman.",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-transaction-step-3.png", alt: "Ironman ingresa 1 BTC" },
        },
        {
          titulo: "Paso 4: Presionar Enviar",
          texto: "Como sus enormes dedos de aleación de oro y titanio son propensos a errores tipográficos, verifica dos veces que ingresó el número correcto. Y presiona Enviar.",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-transaction-step-4.png", alt: "Ironman envía 1 BTC" },
        },
        {
          titulo: "Paso 5: El wallet firma la transacción",
          texto: "El software del wallet entonces pide la contraseña para confirmar la transacción.\n\nPara enviar bitcoin, Ironman necesita probar a la red Bitcoin que es realmente él quien envía el dinero y que tiene propiedad del bitcoin. Ahí es donde entra su clave privada (que está almacenada en el wallet).\n\nDespués de que Ironman ingresa la contraseña correcta, el software del wallet \"firma\" la transacción usando la clave privada de Ironman, creando un fragmento de datos separado conocido como una \"firma digital\". (Todo esto se hace entre bambalinas.)",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-transaction-step-5.png", alt: "El wallet de Bitcoin firma la transacción" },
        },
        {
          titulo: "Detrás de escenas — Paso 6: Los nodos validan",
          texto: "De aquí en adelante, la participación de Ironman ha terminado. El software del wallet se conecta a un nodo Bitcoin y envía el mensaje de transacción, junto con la \"firma digital\" y la clave pública.\n\nEl nodo verifica si la transacción es válida: ¿tiene el remitente suficiente BTC? ¿Está el remitente autorizado para enviar el BTC?\n\nPor defecto, los nodos no confían entre sí, por lo que validarán la transacción nuevamente por sí mismos. Y solo si la consideran válida, compartirán la transacción a los nodos a los que están conectados.",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-transaction-step-6.png", alt: "Transacción enviada a los nodos" },
        },
        {
          titulo: "Paso 7: La transacción entra al mempool",
          texto: "Si una transacción se considera válida, se almacena en un área de almacenamiento temporal conocida como el \"memory pool\" o \"mempool\".\n\nEn este punto, una transacción se considera \"no confirmada\" o \"pendiente\".",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-transaction-step-7.png", alt: "Transacción almacenada en el mempool" },
        },
        {
          titulo: "Paso 8: Los mineros empaquetan la transacción",
          texto: "Nodos especiales conocidos como \"mineros\" empaquetarán esta transacción junto con otras transacciones válidas de su mempool en un \"bloque\".",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-transaction-step-8.png", alt: "Los mineros agrupan transacciones en un bloque" },
        },
        {
          titulo: "Paso 9: Los mineros compiten",
          texto: "Los mineros competirán para ser los primeros en \"minar\" su bloque. Esto implica intentar encontrar un número que comience con una cantidad específica de ceros. La única forma de encontrar este número es por prueba y error, es decir, haciendo tantas conjeturas como sea posible.",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-transaction-step-9.png", alt: "Los mineros compiten" },
        },
        {
          titulo: "El primer minero que adivina correctamente gana",
          texto: "El primer minero en adivinar un número correcto es el primero en \"minar\" su bloque. En el momento en que el minero adivina correctamente, comparte su bloque junto con el \"número ganador\" a otros nodos en la red Bitcoin.",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-transaction-step-910.png", alt: "El primer minero en adivinar el nonce correcto gana" },
        },
        {
          titulo: "Paso 10-11: El bloque se añade a la blockchain",
          texto: "Los nodos de la red Bitcoin verifican que el minero ha adivinado el número correcto y si es correcto, añaden el bloque del minero ganador a su copia de la blockchain.\n\nDado que el bloque (que contiene la transacción) ahora se ha añadido a la versión \"oficial\" de la blockchain, la transacción ahora se considera \"confirmada\".\n\nUna vez que se crea ese bloque y la nueva transacción se verifica e incluye en ese bloque, se dice que la transacción tiene \"una confirmación\".",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-transaction-step-11.png", alt: "Los nodos validan el nuevo bloque" },
        },
        {
          titulo: "Perspectiva de Batman — La transacción confirmada",
          texto: "Batman ve que la transacción ha sido confirmada y verifica su wallet de Bitcoin para ver si el bitcoin ha sido transferido.\n\nCuantos más bloques se hayan construido sobre el bloque con la transacción de Ironman, más \"confirmada\" está la transacción en la blockchain. Cada bloque añadido se considera una \"confirmación adicional\". Esperar seis confirmaciones es el estándar actual para que la mayoría de las transacciones se consideren seguras.",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-transaction-step-12.png", alt: "Transacción de Bitcoin confirmada" },
        },
        {
          titulo: "Vista general: Ironman envía bitcoin",
          texto: "Tomemos una vista de pájaro de cómo funciona una transacción de Bitcoin. El wallet de Ironman se conecta a un nodo que transmite un mensaje a todas las computadoras (\"la red Bitcoin\") que ejecutan una copia de la base de datos actualizada (\"la blockchain de Bitcoin\").",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-sent-1.png", alt: "Bitcoin ha sido enviado" },
        },
        {
          titulo: "La red de nodos",
          texto: "Ironman tiene una cadena única de letras y números llamada \"clave privada\". Con esta clave privada, el software del wallet genera una \"firma digital\" que asegura que el mensaje proviene de él y no de nadie más.\n\nLas computadoras (\"nodos completos\") en la red Bitcoin pueden confirmar fácilmente si Ironman es quien realmente envió el mensaje usando una cadena diferente de letras y números que Ironman proporciona, llamada \"clave pública\".\n\nTodos los nodos se actualizan constantemente entre sí con la información más reciente (\"transacciones\") que se añade a la red Bitcoin.",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-network-transaction-1.png", alt: "Ironman y Batman como wallets moradas en la red" },
        },
        {
          titulo: "Los mineros y el mecanismo de consenso",
          texto: "Los mineros son computadoras dispersas por todo el mundo y forman una parte crítica de la red Bitcoin. Su trabajo es agrupar nuevas transacciones válidas, como la de Ironman, y proponerlas para su liquidación.\n\nEstos grupos de transacciones se llaman \"bloques\", que es de donde viene el \"bloque\" en \"blockchain\".\n\nEn cualquier momento, miles de estas computadoras compiten entre sí por el derecho a crear el siguiente bloque. La competencia implica resolver un \"puzzle\", y los mineros solo pueden proponer un nuevo bloque si resuelven el puzzle actual. Las probabilidades de adivinar un número correcto son aproximadamente 1 en 6 billones.",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-network-transaction-with-miners.png", alt: "Red Bitcoin con mineros" },
        },
        {
          titulo: "La transacción se confirma en toda la red",
          texto: "Si las transacciones son válidas y la solución al \"puzzle\" es correcta, los participantes de la red actualizan su copia de la base de datos para reflejar las nuevas transacciones.\n\nEn ese punto, la transacción de Ironman se considera liquidada o \"confirmada\". El 1 bitcoin ha pasado de la dirección de Ironman a la dirección de Batman y ha quedado oficialmente registrado en la blockchain.\n\nEste \"mecanismo de consenso\" de determinar qué transacciones quedan permanentemente registradas y \"confirmadas\" es el corazón del diseño de la blockchain de Bitcoin.",
          imagen: { src: "/bootcamp/mod8-lec6/bitcoin-network-transaction-blockchain-updated.png", alt: "La red Bitcoin sincroniza la blockchain" },
        },
        {
          titulo: "Resumen de la transacción Bitcoin",
          puntos: [
            "Si quieres enviar bitcoins a otra persona, proporcionas la dirección Bitcoin del destinatario y tu wallet se conectará a un nodo para iniciar una transacción.",
            "El nodo verificará la transacción, la validará y luego transmitirá y retransmitirá la transacción válida a otros nodos y mineros.",
            "Los mineros agrupan estas transacciones en un \"bloque candidato\" y compiten para ser el primero en publicar su bloque en la blockchain.",
            "El minero \"ganador\" publica este bloque temporal como un bloque permanente en la blockchain, confirmando la transacción.",
            "Los nodos reciben este bloque y verifican que el minero está siguiendo las reglas de la red.",
            "Siempre que un nodo recibe un nuevo bloque y lo considera válido, lo retransmite a otros nodos para que todos permanezcan sincronizados.",
            "Una vez que el nodo al que se conecta el wallet del destinatario ha recibido el nuevo bloque, el wallet del destinatario mostrará un saldo actualizado con los bitcoins recién recibidos.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-08-7",
      titulo: "Integrando todo: el sistema Bitcoin",
      resumen: "Ahora que has aprendido todos los conceptos, es hora de unirlos y entender qué es Bitcoin como sistema completo: nodos, red, protocolo, blockchain y minería.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/bitcoin-system-overview",
      contenido: [
        {
          titulo: "¿Qué es Bitcoin?",
          texto: "Bitcoin (con \"B\" mayúscula) es un nuevo SISTEMA que gestiona la creación y propiedad de \"dinero\" digital que existe de forma independiente de cualquier gobierno, banco central u otra institución central.\n\nEste \"dinero\" está denominado en bitcoins (con \"b\" minúscula).\n\nEl sistema Bitcoin es un sistema completamente autónomo que es básicamente un conjunto de computadoras, llamadas nodos, que \"hablan\" entre sí por internet.\n\nPara poder comunicarse entre sí, en cada computadora se instala el software de Bitcoin.",
          imagen: { src: "/bootcamp/mod8-lec7/bitcoin-software-code.png", alt: "Código del software Bitcoin" },
        },
        {
          titulo: "¿Qué es un nodo Bitcoin?",
          texto: "Cualquiera puede descargar e instalar este software. El software de Bitcoin es de código abierto, lo que significa que cualquiera puede ver el código fuente.\n\nSi la computadora está conectada a internet y comienza a ejecutar el software, se convierte en un nodo Bitcoin.",
          imagen: { src: "/bootcamp/mod8-lec7/bitcoin-node.png", alt: "Nodo Bitcoin" },
        },
        {
          titulo: "La red Bitcoin",
          texto: "Y cuando hay dos o más nodos Bitcoin en línea, ¡esto crea la red Bitcoin!\n\nLa red Bitcoin es una red de igual a igual (P2P) que funciona 24 horas al día, 7 días a la semana, y 365 días al año. En esta red, la comunicación entre computadoras (nodos) se realiza sin ninguna administración central ni servidor, lo que significa que todos los nodos tienen igual poder y realizan las mismas tareas.\n\nTambién es una red sin permisos. Esto significa que no necesitas permiso para ser parte de la red. Cualquiera puede unirse. O salir.",
          imagen: { src: "/bootcamp/mod8-lec7/Bitcoin-network.png", alt: "Red Bitcoin" },
        },
        {
          titulo: "El protocolo Bitcoin",
          texto: "El software ejecuta de forma autónoma el protocolo Bitcoin. Funciona en piloto automático.\n\nUn protocolo es simplemente una palabra elegante usada en el mundo del software informático que describe un conjunto de instrucciones de programación o \"reglas\" que permiten a las computadoras comunicarse e interactuar entre sí.\n\nPiensa en los protocolos como reglas estandarizadas que determinan lo que un sistema debe o no debe hacer.",
          imagen: { src: "/bootcamp/mod8-lec7/Bitcoin-protocol.png", alt: "Protocolo Bitcoin" },
        },
        {
          titulo: "El protocolo establece cómo opera la red",
          texto: "El protocolo Bitcoin se ejecuta sobre la red Bitcoin y proporciona a estas computadoras las instrucciones operativas y la información que necesitan para rastrear y verificar las transacciones que ocurren en la red.\n\nEstablece los pasos que las computadoras en la red deben realizar para llegar a un consenso sobre la validez de cada transacción.\n\nEl protocolo Bitcoin establece cómo opera la red Bitcoin como sistema.",
        },
        {
          titulo: "La blockchain",
          texto: "Además de ejecutar el protocolo Bitcoin, cada nodo almacena un archivo de datos que lleva los registros de TODAS las transacciones realizadas en la red Bitcoin, incluida la creación de nuevos bitcoins.\n\nEste archivo se llama la blockchain.",
          imagen: { src: "/bootcamp/mod8-lec7/blockchain-as-a-file.png", alt: "La blockchain como archivo" },
        },
        {
          titulo: "Bloques encadenados",
          texto: "La blockchain de Bitcoin consiste en una secuencia de bloques donde cada bloque se construye sobre el bloque anterior... creando una \"cadena de bloques\" o \"blockchain\".\n\nDentro de cada bloque hay información sobre transacciones. Más específicamente, la blockchain contiene transacciones \"archivadas\" o confirmadas, que están empaquetadas en \"bloques\".\n\nEl tiempo promedio entre bloques guardados en el archivo de datos (blockchain) es de 10 minutos.",
          imagen: { src: "/bootcamp/mod8-lec7/block.png", alt: "Bloque de transacciones" },
        },
        {
          titulo: "El mecanismo de consenso: la minería",
          texto: "Cada nodo actúa como un \"administrador\" de su propia versión de la blockchain. Cada nodo no confía en los demás, por lo que están constantemente reverificando los datos que se comparten entre sí.\n\nEstas computadoras también se preguntan constantemente: \"¿Son iguales nuestras blockchains?\"\n\nPara Bitcoin, el consenso se logra a través de un proceso llamado \"minería\". La minería es el proceso de confirmar transacciones y añadirlas a la blockchain.\n\nEn términos simples, los mineros agrupan transacciones válidas en un bloque y luego compiten para ser el primero en adivinar un número que comience con cierta cantidad de ceros. El primer minero en adivinar el número correcto comparte el bloque recién \"minado\" con la red Bitcoin. Los demás nodos verifican que el número adivinado es correcto, y si lo es, todos los demás actualizan su blockchain con el nuevo bloque.",
        },
        {
          titulo: "El sistema Bitcoin completo",
          texto: "Como puedes ver, hay muchas cosas sucediendo en el sistema Bitcoin. Lo notable es que TODO esto lo están haciendo automáticamente las computadoras, ¡y todo está sucediendo a la vista del público!\n\nDado que la blockchain lleva un registro de cada cambio en la propiedad de cada bitcoin, el público puede ver que alguien está enviando una cantidad a alguien más. Y dado que la propiedad de los bitcoins está vinculada a direcciones, esta información NO vincula directamente la transacción con información que identifique personalmente al remitente o al receptor.",
          imagen: { src: "/bootcamp/mod8-lec7/what-is-bitcoin-system.png", alt: "Bitcoin es un sistema" },
        },
        {
          titulo: "¡Felicitaciones!",
          texto: "¡Hemos terminado nuestro \"mapa\" simplificado del sistema Bitcoin en su conjunto!\n\nSi entiendes todo lo que se menciona en el mapa, encuentra a la persona más cercana a ti y grítale: \"¡AHORA ENTIENDO BITCOIN!\"\n\nY dale un gran choca esos cinco.",
          imagen: { src: "/bootcamp/mod8-lec7/high-five.png", alt: "¡Choca esos cinco!" },
        },
        {
          titulo: "¡Choca esos cinco tú mismo!",
          texto: "Si no hay nadie cerca de ti, puedes ir frente a un espejo y decirte a ti mismo: \"¡AHORA ENTIENDES BITCOIN!\"\n\nY chocarte esos cinco tú mismo.",
          imagen: { src: "/bootcamp/mod8-lec7/high-five-yourself.png", alt: "¡Chócate esos cinco tú mismo!" },
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo9 = [
    {
      id: "crypto-09-1",
      titulo: "¿Qué es un altcoin?",
      resumen: "Los altcoins son todas las criptomonedas distintas de Bitcoin. Surgieron porque el código de Bitcoin es abierto y cualquier desarrollador puede tomarlo como base para crear algo nuevo.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-an-altcoin",
      contenido: [
        {
          titulo: "Bitcoin es de código abierto",
          texto: "Cuando Satoshi Nakamoto creó Bitcoin, publicó su código fuente de forma abierta. Esto significa que cualquier persona en el mundo puede leer exactamente cómo funciona Bitcoin y hacer una copia para modificarla.",
          imagen: { src: "/bootcamp/mod9-lec1/bitcoin-open-source-code.png", alt: "Código abierto de Bitcoin" },
        },
        {
          titulo: "Cualquiera puede crear su propia versión",
          texto: "El código de Bitcoin funciona como una receta: cualquier desarrollador puede tomarlo, modificar sus ingredientes y crear una nueva criptomoneda. Algunos cambian la velocidad de las transacciones, otros el nivel de privacidad, y otros agregan funcionalidades completamente nuevas.\n\nEsta libertad dio lugar a una enorme variedad de criptomonedas alternativas.",
          imagen: { src: "/bootcamp/mod9-lec1/source-code-recipe.png", alt: "Código fuente como receta" },
        },
        {
          titulo: "¿Qué es un altcoin?",
          texto: "La palabra \"altcoin\" es una combinación de \"alternative\" y \"coin\" (moneda alternativa). Se usa para describir cualquier criptomoneda que no sea Bitcoin.\n\nHoy existen miles de altcoins con muy distintos propósitos: algunos buscan ser más rápidos que Bitcoin, otros ofrecen mayor privacidad, y otros habilitan contratos inteligentes o aplicaciones descentralizadas.",
        },
        {
          titulo: "El crecimiento de los altcoins",
          texto: "En los años siguientes al lanzamiento de Bitcoin, comenzaron a aparecer las primeras monedas alternativas. Los desarrolladores vieron oportunidades para mejorar aspectos que consideraban limitaciones de Bitcoin y experimentaron con nuevas ideas.\n\nAunque muchos proyectos fallaron, algunos crecieron enormemente y se convirtieron en activos relevantes dentro del ecosistema cripto.",
          imagen: { src: "/bootcamp/mod9-lec1/first-altcoins.png", alt: "Los primeros altcoins" },
        },
        {
          titulo: "Namecoin: el primer altcoin",
          texto: "Namecoin (NMC) fue el primer altcoin, lanzado en 2011. Tomó el código de Bitcoin y lo modificó para crear un sistema descentralizado de nombres de dominio, con el objetivo de resistir la censura en internet.\n\nAunque no tuvo un gran impacto comercial, fue el primero en demostrar que era posible construir sobre el modelo de Bitcoin.",
          imagen: { src: "/bootcamp/mod9-lec1/nmecoin.png", alt: "Namecoin, el primer altcoin" },
        },
        {
          titulo: "Litecoin (LTC)",
          texto: "Litecoin fue creado en 2011 por Charlie Lee, un ex ingeniero de Google. Su objetivo era ser una versión más rápida y ligera de Bitcoin, con tiempos de confirmación de transacciones cuatro veces más rápidos.\n\nLitecoin fue diseñado como \"la plata al oro de Bitcoin\" y sigue siendo uno de los altcoins más antiguos y conocidos.",
          imagen: { src: "/bootcamp/mod9-lec1/litecoin-1.png", alt: "Litecoin (LTC)" },
        },
        {
          titulo: "Dogecoin (DOGE)",
          texto: "Dogecoin fue creado en 2013 como una broma por Jackson Palmer y Billy Markus. Tomaron el código de Litecoin y lo rebautizaron usando el popular meme del perro Shiba Inu.\n\nPara sorpresa de sus creadores, Dogecoin desarrolló una comunidad activa y leal, convirtiéndose en uno de los altcoins más conocidos del mercado.",
          imagen: { src: "/bootcamp/mod9-lec1/dogecoin-1.png", alt: "Dogecoin (DOGE)" },
        },
        {
          titulo: "Ripple (XRP)",
          texto: "Ripple (XRP) fue lanzado en 2012 con un enfoque diferente al de Bitcoin. En lugar de pagos entre individuos, Ripple está diseñado para facilitar transferencias internacionales de dinero entre bancos e instituciones financieras de forma rápida y económica.\n\nA diferencia de Bitcoin, Ripple no depende de la minería para validar transacciones.",
          imagen: { src: "/bootcamp/mod9-lec1/ripples.png", alt: "Ripple (XRP)" },
        },
        {
          titulo: "Stellar (XLM)",
          texto: "Stellar (XLM) nació en 2014 de la mano de Jed McCaleb, uno de los co-fundadores de Ripple. Mientras Ripple apunta principalmente a instituciones financieras, Stellar está orientado a facilitar pagos transfronterizos para personas individuales, especialmente en regiones con acceso limitado a servicios bancarios.",
          imagen: { src: "/bootcamp/mod9-lec1/stellar-lumen.png", alt: "Stellar Lumens (XLM)" },
        },
        {
          titulo: "Ethereum (ETH)",
          texto: "Ethereum fue lanzado en 2015 por Vitalik Buterin y representa uno de los avances más importantes en el mundo cripto. A diferencia de Bitcoin, que es principalmente una moneda digital, Ethereum es una plataforma programable que permite a los desarrolladores crear aplicaciones descentralizadas y contratos inteligentes.\n\nEthereum impulsó la creación de toda una nueva generación de altcoins y proyectos basados en su red.",
          imagen: { src: "/bootcamp/mod9-lec1/ether.png", alt: "Ethereum (ETH)" },
        },
        {
          titulo: "¿Para qué sirven los altcoins?",
          puntos: [
            "Mejorar las limitaciones de Bitcoin: velocidad, costo, privacidad o escalabilidad.",
            "Habilitar nuevas funcionalidades como contratos inteligentes o aplicaciones descentralizadas.",
            "Servir a mercados específicos: pagos internacionales, privacidad financiera, finanzas descentralizadas (DeFi).",
            "Ofrecer alternativas de inversión con diferentes perfiles de riesgo y potencial.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-09-2",
      titulo: "¿Qué es una moneda de privacidad?",
      resumen: "Las monedas de privacidad son altcoins diseñados para ocultar la identidad del remitente, el destinatario y el monto de las transacciones, algo que Bitcoin no hace por defecto.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-privacy-coin",
      contenido: [
        {
          titulo: "El problema de la transparencia de Bitcoin",
          texto: "Muchas personas asumen que Bitcoin es completamente anónimo. En realidad, Bitcoin es seudónimo: las transacciones son visibles públicamente en la blockchain y cualquiera puede rastrear los movimientos de fondos si conoce la dirección de un usuario.\n\nEsto puede ser una preocupación para quienes desean mayor privacidad financiera.",
          imagen: { src: "/bootcamp/mod9-lec2/anonymous-identity.png", alt: "Identidad anónima" },
        },
        {
          titulo: "¿Qué es una moneda de privacidad?",
          texto: "Una moneda de privacidad es una criptomoneda diseñada específicamente para ocultar los detalles de una transacción: quién la envía, quién la recibe y cuánto se transfiere.\n\nA diferencia de Bitcoin, donde el historial de transacciones es transparente, las monedas de privacidad usan técnicas criptográficas avanzadas para hacer los datos de cada transacción irreconocibles o imposibles de rastrear.",
        },
        {
          titulo: "Dash (DASH)",
          texto: "Dash fue lanzado en 2014 y fue uno de los primeros proyectos en incorporar funciones de privacidad opcionales. Utiliza un mecanismo llamado CoinJoin, que agrupa múltiples transacciones para dificultar el rastreo individual. Esta función se llama PrivateSend.\n\nA diferencia de otras monedas de privacidad, en Dash la privacidad es una opción y no el comportamiento por defecto.",
          imagen: { src: "/bootcamp/mod9-lec2/dash-privacy-coin.png", alt: "Dash, moneda de privacidad" },
        },
        {
          titulo: "Monero (XMR)",
          texto: "Monero es considerado el estándar de oro en privacidad cripto. Fue lanzado en 2014 y todas sus transacciones son privadas de forma predeterminada, sin opción de hacerlas transparentes.\n\nUtiliza tres tecnologías clave para garantizar la privacidad:",
          puntos: [
            "Firmas de anillo (Ring Signatures): mezcla la transacción del remitente con otras para ocultar quién la envía.",
            "Direcciones ocultas (Stealth Addresses): genera una dirección de un solo uso para cada transacción, ocultando al destinatario.",
            "Transacciones confidenciales en anillo (RingCT): oculta el monto exacto transferido.",
            "Dandelion++: oculta la dirección IP del nodo que origina la transacción.",
          ],
          imagen: { src: "/bootcamp/mod9-lec2/monero.png", alt: "Monero (XMR)" },
        },
        {
          titulo: "Zcash (ZEC)",
          texto: "Zcash fue lanzado en 2016 y utiliza una tecnología criptográfica avanzada llamada zk-SNARKs (pruebas de conocimiento cero) para verificar transacciones sin revelar ningún dato sensible.\n\nZcash ofrece dos tipos de direcciones:",
          puntos: [
            "Direcciones T (transparentes): funcionan de forma similar a Bitcoin, visibles en la blockchain.",
            "Direcciones Z (blindadas): transacciones completamente privadas usando zk-SNARKs.",
          ],
          imagen: { src: "/bootcamp/mod9-lec2/zcash.png", alt: "Zcash (ZEC)" },
        },
        {
          titulo: "Otras monedas de privacidad",
          texto: "Además de Dash, Monero y Zcash, existen otros proyectos enfocados en la privacidad:",
          puntos: [
            "Secret (SCRT): una plataforma de contratos inteligentes con privacidad incorporada.",
            "Oasis Network (ROSE): combina privacidad con capacidades de computación de datos.",
            "Decred (DCR): enfocado en gobernanza y financiamiento descentralizado, con funciones de privacidad.",
          ],
        },
        {
          titulo: "¿Son legales las monedas de privacidad?",
          texto: "Las monedas de privacidad son legales en muchos países, pero han generado preocupación entre los reguladores por su potencial uso en actividades ilícitas.\n\nAlgunos exchanges han optado por no listar monedas de privacidad para cumplir con las regulaciones locales. Sin embargo, también tienen usos completamente legítimos: proteger la información financiera personal, resistir la vigilancia excesiva y garantizar la libertad económica en regiones con regímenes autoritarios.\n\nComo cualquier herramienta financiera, el impacto depende del uso que se le dé.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-09-3",
      titulo: "¿Qué es un meme coin?",
      resumen: "Los meme coins son criptomonedas creadas a partir de memes de internet y cultura popular. Surgieron como bromas, pero algunos alcanzaron capitalizaciones de mercado millonarias.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-meme-coin",
      contenido: [
        {
          titulo: "¿Qué es un meme?",
          texto: "El término \"meme\" fue acuñado en 1976 por el biólogo Richard Dawkins en su libro El gen egoísta. Lo definió como la unidad de transmisión cultural, un concepto que se replica y se propaga de persona a persona.\n\nHoy, un meme es una imagen, video o texto con contenido humorístico que se difunde rápidamente a través de internet y las redes sociales. En esencia, un meme es una broma en línea.",
          imagen: { src: "/bootcamp/mod9-lec3/meme.png", alt: "Un meme de internet" },
        },
        {
          titulo: "¿Qué es un meme coin?",
          texto: "Un meme coin es una criptomoneda basada en una broma de internet. Estas monedas no nacieron de la necesidad de resolver un problema técnico o financiero, sino del humor y la cultura viral de internet.\n\nLo interesante es que, pese a su origen humorístico, algunos meme coins alcanzaron valoraciones de miles de millones de dólares, impulsados por comunidades entusiastas y el respaldo de figuras públicas influyentes.",
        },
        {
          titulo: "Dogecoin (DOGE): el meme coin original",
          texto: "Dogecoin fue creado en 2013 por Jackson Palmer y Billy Markus como una broma para satirizar la proliferación de criptomonedas en ese momento. Tomaron el código de Litecoin y lo rebautizaron usando el popular meme del perro Shiba Inu.\n\nPara sorpresa de todos, la gente comenzó a tomarlo en serio. Se formó una comunidad activa y el precio de DOGE llegó a dispararse tras el apoyo público de figuras como Elon Musk y Mark Cuban, convirtiéndolo en una de las diez criptomonedas más grandes del mercado.",
          imagen: { src: "/bootcamp/mod9-lec3/dogecoin.png", alt: "Dogecoin (DOGE)" },
        },
        {
          titulo: "Shiba Inu (SHIB): el retador",
          texto: "El éxito de Dogecoin atrajo imitadores. El mayor competidor de DOGE es Shiba Inu (SHIB), lanzado en agosto de 2020 por un fundador anónimo conocido como \"Ryoshi\".\n\nSHIB es un token ERC-20 construido sobre la blockchain de Ethereum, lo que le otorga acceso a contratos inteligentes y más casos de uso potenciales que DOGE. En octubre de 2021, SHIB llegó brevemente a superar a DOGE como el meme coin más valioso.",
          imagen: { src: "/bootcamp/mod9-lec3/shiba-inu.png", alt: "Shiba Inu (SHIB)" },
        },
        {
          titulo: "Otros meme coins populares",
          texto: "Con el tiempo aparecieron cientos de meme coins. Entre los más conocidos más allá de DOGE y SHIB se encuentran PEPE (basado en el meme de la rana Pepe), FLOKI y TRUMP (lanzado antes de la inauguración presidencial de Donald Trump en 2025). Hoy existen más de 200 meme coins listados en los principales agregadores de mercado.",
        },
        {
          titulo: "Características comunes de los meme coins",
          texto: "A pesar de sus diferencias, la mayoría de los meme coins comparte ciertos rasgos:",
          puntos: [
            "Oferta circulante enorme, frecuentemente en el orden de los billones de unidades.",
            "Precio unitario muy bajo, a menudo fracciones de centavo, lo que los hace atractivos para quienes quieren acumular grandes cantidades.",
            "Alta volatilidad: pueden subir o bajar cientos de porcentajes en días.",
            "Comunidades grandes y apasionadas que impulsan el precio a través de las redes sociales.",
          ],
          imagen: { src: "/bootcamp/mod9-lec3/meme-coin-bro.png", alt: "Inversor de meme coins" },
        },
        {
          titulo: "Riesgos de los meme coins",
          texto: "La baja barrera de entrada puede llevar a los inversores a sobreestimar el potencial de un meme coin. Existen riesgos importantes que conviene conocer:",
          puntos: [
            "Alta especulación: el precio depende del sentimiento y las redes sociales, no del valor fundamental del proyecto.",
            "Manipulación del mercado: algunos creadores de meme coins conservan grandes cantidades de tokens y pueden venderlos cuando el precio sube, perjudicando a los pequeños inversores.",
            "Proyectos abandonados: muchos meme coins son abandonados por sus creadores poco después del lanzamiento.",
            "Investigar siempre antes de invertir y nunca arriesgar dinero que no se puede perder.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-09-4",
      titulo: "¿Qué es una stablecoin?",
      resumen: "Las stablecoins son altcoins diseñadas para mantener un precio estable vinculándose al valor de un activo externo, como el dólar estadounidense.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-stablecoin",
      contenido: [
        {
          titulo: "El problema de la volatilidad en cripto",
          texto: "Las criptomonedas como Bitcoin son conocidas por su alta volatilidad. No es raro que el precio del bitcoin caiga un 30 o 50 % en cuestión de semanas.\n\nEsta inestabilidad dificulta su uso como medio de intercambio cotidiano o como reserva de valor a corto plazo. Para dar respuesta a este problema surgieron las stablecoins.",
          imagen: { src: "/bootcamp/mod9-lec4/usdt-tetherd-usd.png", alt: "USDT anclado al dólar" },
        },
        {
          titulo: "¿Qué es una stablecoin?",
          texto: "Una stablecoin es un altcoin diseñado para mantener un precio estable a lo largo del tiempo. Lo logra \"anclando\" su valor a un activo subyacente, generalmente el dólar estadounidense, aunque también existen stablecoins vinculadas a otras monedas fiduciarias, materias primas como el oro u otras criptomonedas.\n\nHoy las stablecoins representan uno de los grupos más grandes del mercado cripto, con una capitalización total que supera los 150 mil millones de dólares.",
        },
        {
          titulo: "¿Cómo funcionan las stablecoins?",
          texto: "Las stablecoins mantienen su precio estable mediante un mecanismo de \"anclaje\" o peg. Dependiendo del tipo de stablecoin, este anclaje se logra de tres maneras distintas:\n\n1. Respaldo en activos reales (fiat o cripto).\n2. Sobrecolateralización con criptomonedas.\n3. Algoritmos que ajustan automáticamente la oferta según la demanda.",
        },
        {
          titulo: "¿Para qué sirven las stablecoins?",
          puntos: [
            "Almacenar valor de forma estable sin necesidad de una cuenta bancaria.",
            "Protegerse de la volatilidad del mercado cripto sin salir del ecosistema.",
            "Acceder a pares de trading contra otras criptomonedas sin necesidad de usar moneda fiduciaria.",
            "Transferir fondos rápidamente entre exchanges con menores fricciones que el dinero tradicional.",
            "Participar en protocolos de finanzas descentralizadas (DeFi) como préstamos, ahorro o provisión de liquidez.",
          ],
        },
        {
          titulo: "Tipos de stablecoins",
          puntos: [
            "Respaldadas por monedas fiduciarias (Fiat-backed): el tipo más común. Cada stablecoin está respaldada por una unidad de moneda fiat guardada en reservas.",
            "Respaldadas por criptomonedas (Crypto-backed): usан criptomonedas como colateral, generalmente en una proporción mayor a 1:1 para compensar la volatilidad.",
            "Algorítmicas (Algorithmic): no tienen activos de respaldo. Dependen de algoritmos que ajustan automáticamente la oferta para mantener el precio.",
          ],
        },
        {
          titulo: "Stablecoins respaldadas por monedas fiat",
          texto: "Las stablecoins respaldadas por monedas fiat están colateralizadas en una proporción 1:1. Por cada unidad de stablecoin en circulación, existe una unidad equivalente de moneda fiduciaria guardada en una cuenta bancaria o en activos equivalentes.\n\nSi el emisor tiene 1.000 millones de dólares en reservas, puede emitir exactamente 1.000 millones de stablecoins, cada una con un valor de $1.\n\nSi deseas canjear tus stablecoins por dinero real, el emisor te entrega el dinero y destruye o quema los tokens correspondientes.",
        },
        {
          titulo: "Stablecoins respaldadas por criptomonedas",
          texto: "Las stablecoins respaldadas por criptomonedas funcionan de manera similar a las fiat-backed, pero el colateral es una criptomoneda.\n\nDebido a la volatilidad de las criptomonedas, estas stablecoins están sobrecolateralizadas. La razón de colateralización más común es del 200 %, lo que significa que para obtener stablecoins por valor de $1.000 necesitas depositar criptomonedas por valor de $2.000.\n\nEjemplos de stablecoins cripto-colateralizadas son Dai (DAI), Alchemix USD (alUSD) y Magic Internet Money (MIM).",
        },
        {
          titulo: "Stablecoins algorítmicas",
          texto: "Las stablecoins algorítmicas no cuentan con activos de respaldo. En su lugar, dependen de un algoritmo que gestiona automáticamente la oferta de tokens para mantener el precio estable.\n\nSi el precio sube por encima del activo al que está anclada, el algoritmo emite más tokens para bajar el precio. Si el precio cae, el algoritmo destruye tokens para reducir la oferta y volver a subir el precio.\n\nEste mecanismo intenta crear una moneda descentralizada sin depender de reservas centralizadas, pero conlleva el mayor riesgo de los tres tipos: si el algoritmo no reacciona con suficiente rapidez, la stablecoin puede perder su ancla.",
        },
        {
          titulo: "Tether (USDT)",
          texto: "Lanzado en 2014, Tether fue la primera stablecoin. Está anclada al dólar estadounidense en una proporción 1:1. Es la stablecoin más popular y una de las cinco criptomonedas más grandes por capitalización de mercado.\n\nA lo largo de su historia, Tether ha generado controversia por las dudas sobre si sus reservas realmente respaldaban todos los USDT en circulación. En 2021 fue multada por declaraciones inexactas sobre su respaldo.",
          imagen: { src: "/bootcamp/mod9-lec4/tether.png", alt: "Tether (USDT)" },
        },
        {
          titulo: "USD Coin (USDC)",
          texto: "Lanzado en 2018, USDC es una stablecoin fiat-collateralized que opera sobre la blockchain de Ethereum y está anclada al dólar estadounidense. Cada USDC en circulación está respaldado por activos financieros (principalmente efectivo y bonos) mantenidos por el consorcio Centre, integrado por Coinbase y Circle.",
          imagen: { src: "/bootcamp/mod9-lec4/usd-coin.png", alt: "USD Coin (USDC)" },
        },
        {
          titulo: "TerraUSD (UST): una lección de riesgo",
          texto: "Lanzado en 2020, TerraUSD fue la stablecoin algorítmica más grande de su momento. Su valor estaba diseñado para mantenerse en $1 mediante un mecanismo que involucraba a LUNA, la criptomoneda nativa del ecosistema Terra.\n\nSin embargo, en mayo de 2022, el sistema colapsó. UST perdió su ancla al dólar y LUNA perdió prácticamente todo su valor en cuestión de días, causando pérdidas de miles de millones de dólares. Se convirtió en el ejemplo más conocido de los riesgos de las stablecoins algorítmicas.",
          imagen: { src: "/bootcamp/mod9-lec4/ust-coin-dead.png", alt: "La caída de TerraUSD (UST)" },
        },
        {
          titulo: "Binance USD (BUSD)",
          texto: "Binance USD (BUSD) es una stablecoin respaldada por el dólar estadounidense en una proporción 1:1. Fue emitida por Paxos, una empresa regulada que mantenía en custodia los dólares de respaldo. A pesar de llevar el nombre de Binance, el mayor exchange del mundo, fue Paxos quien actuó como emisor oficial del token.",
          imagen: { src: "/bootcamp/mod9-lec4/binance-usd.png", alt: "Binance USD (BUSD)" },
        },
        {
          titulo: "Dai (DAI)",
          texto: "Dai es una stablecoin respaldada por criptomonedas desarrollada por MakerDAO. Su valor está anclado al dólar estadounidense mediante un sistema de contratos inteligentes que gestiona el colateral.\n\nPara obtener DAI, debes depositar ether (ETH) u otras criptomonedas aceptadas como colateral en un contrato inteligente. Cuando deseas recuperar tu colateral, devuelves el DAI más una pequeña comisión. Es el ejemplo más representativo de las stablecoins descentralizadas.",
          imagen: { src: "/bootcamp/mod9-lec4/dai.png", alt: "Dai (DAI)" },
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo10 = [
    {
      id: "crypto-10-1",
      titulo: "¿Qué es un exchange de criptomonedas?",
      resumen: "Para comprar bitcoin y otras criptomonedas necesitas abrir una cuenta en un exchange. En esta lección conocerás qué son los exchanges, cómo funcionan y la diferencia entre los exchanges centralizados (CEX) y descentralizados (DEX).",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-crypto-exchange",
      contenido: [
        {
          titulo: "¿Qué es un exchange de cripto?",
          texto: "Si has leído las lecciones anteriores, ya sabes qué es una wallet de cripto, cómo configurarla y cómo enviar y recibir bitcoin.\n\nPero si no tienes bitcoins, ¿cómo consigues algunos?\n\n¿Cómo compras bitcoin?",
          imagen: { src: "/bootcamp/mod10-lec1/buy-and-sell-bitcoin.png", alt: "Comprar y vender Bitcoin" },
        },
        {
          titulo: "¿Qué es un exchange de criptomonedas?",
          texto: "Para comprar bitcoin necesitas abrir una cuenta en un \"exchange de criptomonedas\".\n\nUn exchange de cripto es donde compradores y vendedores pueden intercambiar cripto. El exchange te proporciona una plataforma de trading, generalmente en forma de una aplicación web o móvil, donde puedes comprar y vender cripto.",
        },
        {
          titulo: "",
          puntos: ["Los exchanges de cripto también se conocen como plataformas de trading de activos cripto (CTPs)."],
        },
        {
          titulo: "",
          texto: "Antes de los exchanges de cripto, las personas solo podían adquirir bitcoin (y otras criptomonedas) a través de la minería o negociando transacciones individuales en foros en línea, o incluso cara a cara.\n\nHoy en día, la mayoría de los principiantes en cripto entran al mundo cripto a través de un exchange. Estas empresas facilitan la compra de bitcoin con solo un par de clics.\n\nHay MUCHOS exchanges diferentes, algunos más enfocados en principiantes y otros diseñados para traders más experimentados.\n\nDiferentes exchanges soportan distintas criptomonedas, por lo que puede que necesites usar varios dependiendo de lo que quieras comprar o vender.",
        },
        {
          titulo: "¿Qué es un exchange de criptomonedas?",
          texto: "Los exchanges de cripto son sitios web y aplicaciones donde puedes intercambiar una criptomoneda que posees por otra.\n\nMás específicamente, un exchange de criptomonedas es una plataforma de trading en línea donde puedes comprar, vender e intercambiar criptomonedas.\n\nEstas plataformas se definen como un \"exchange\" porque su función es simplemente EMPAREJAR a compradores y vendedores sin estar involucradas directamente en la transacción. Sí cobran una comisión por facilitar cada transacción.\n\nDependiendo del exchange, puedes usar moneda fiat tradicional como dólares estadounidenses para comprar una criptomoneda. Por ejemplo, puedes comprar bitcoin (BTC) con dólares (USD). O puedes usar otras criptomonedas: si ya tienes bitcoins, puedes comprar litecoin (LTC) con tus BTC.",
        },
        {
          titulo: "En resumen, un exchange de cripto te permite:",
          puntos: [
            "Comprar bitcoin y otras criptomonedas.",
            "Convertir criptomonedas que posees por otras criptomonedas.",
            "Vender tus criptomonedas y retirar fondos.",
          ],
        },
        {
          titulo: "¿Cuáles son los tipos de exchanges de cripto?",
          texto: "En general, el término \"exchange\" describe cualquier plataforma que permite el intercambio de monedas. Pero en cripto, existen dos tipos:",
          puntos: [
            "Exchanges centralizados de cripto (CEX)",
            "Exchanges descentralizados de cripto (DEX)",
          ],
        },
        {
          titulo: "Exchange Centralizado (CEX)",
          texto: "Un exchange centralizado de cripto (CEX) es típicamente un negocio en línea donde los usuarios pueden crear una cuenta para comprar/vender, enviar/recibir y almacenar criptomonedas nativas como bitcoin (BTC). Es muy similar a las plataformas de trading de forex y acciones en las finanzas tradicionales.\n\nLos activos en la plataforma centralizada están bajo la custodia del negocio. Debido a que un CEX tiene tanto control sobre los fondos de los usuarios, estas empresas suelen estar muy reguladas.\n\nCumplir con las regulaciones financieras les permite que los usuarios puedan conectar sus cuentas bancarias para financiar sus cuentas en el CEX.",
        },
        {
          titulo: "Exchange Descentralizado (DEX)",
          texto: "Un exchange descentralizado de cripto (DEX) es donde los traders de cripto realizan transacciones directamente entre sí.\n\nSe considera una alternativa a los exchanges centralizados tradicionales.\n\nUn DEX no está controlado por ninguna persona o entidad y es esencialmente un programa de software que corre en internet.\n\nUn usuario conectaría su wallet de autocustodia a un DEX para intercambiar o \"swapear\" sus activos cripto. Las operaciones se ejecutan de manera automatizada por el código del software, sin necesidad de un intermediario.\n\nAlgoritmos, codificados como contratos inteligentes, determinan los precios de las criptomonedas en relación con otras.\n\nA diferencia de las transacciones en CEX que se manejan internamente, las transacciones en DEX se liquidan directamente en la blockchain. Los usuarios tienen control total de sus activos cripto. Es sin confianza, sin permisos y de código abierto.",
        },
        {
          titulo: "¿CEX o DEX?",
          texto: "Tanto los CEX como los DEX cobran comisiones de trading y la experiencia de usuario es relativamente simple en ambas plataformas, aunque los exchanges centralizados son más conocidos por tener una experiencia más amigable para el usuario y proporcionar servicio al cliente.\n\nDebido a la posibilidad de depositar y retirar moneda fiat, el acceso a soporte al cliente y la operación bajo supervisión regulatoria, se recomienda que los principiantes comiencen primero con un exchange centralizado de cripto (CEX).\n\nUn DEX es más para usuarios avanzados y tiene un conjunto diferente de riesgos. Usar un DEX requiere más habilidad técnica y familiaridad con las finanzas descentralizadas (DeFi).",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-10-2",
      titulo: "¿Qué es un Exchange Centralizado (CEX)?",
      resumen: "Un CEX es una empresa que proporciona una plataforma de trading cripto, servicios de cuenta y soporte al cliente. Aprende cómo funcionan y qué roles cumplen los exchanges centralizados.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-centralized-exchange-cex",
      contenido: [
        {
          titulo: "¿Qué es un exchange centralizado de cripto (CEX)?",
          texto: "Un exchange centralizado de cripto (CEX) es un negocio que te proporciona múltiples servicios: una plataforma de trading cripto (transacciones de compra y venta), servicios de cuenta (depósitos y retiros) y soporte al cliente.\n\nLos exchanges centralizados siguen siendo el método más utilizado para comprar y vender cripto. Un ejemplo de exchange centralizado es Crypto.com.\n\nSon atractivos para muchos usuarios de cripto ya que se consideran más convenientes y fáciles de usar que un exchange descentralizado (DEX).",
        },
        {
          titulo: "¿Qué es un Exchange Centralizado de Cripto (CEX)?",
          texto: "Un exchange centralizado (CEX) permite a cualquier persona con conexión a internet descubrir y transaccionar con activos cripto.\n\nEs propiedad y está operado por una empresa privada y requiere que los usuarios se registren y abran una cuenta para participar.\n\nLos CEX facilitan las transacciones de activos cripto entre compradores y vendedores al proporcionar una plataforma de trading en línea que mantiene un libro de órdenes: una colección de órdenes de compra y venta publicadas por traders individuales.",
        },
        {
          titulo: "",
          puntos: ["Las órdenes son solicitudes para comprar o vender una cantidad determinada de una criptomoneda específica a un precio especificado."],
        },
        {
          titulo: "",
          texto: "Un CEX agrega las órdenes en el libro de órdenes y luego usa un software especial para emparejar y ejecutar las órdenes de compra y venta correspondientes.\n\nEjemplos de exchanges centralizados incluyen Binance, Coinbase, Bybit, Gemini, Kraken y Kucoin.",
        },
        {
          titulo: "¿Qué hace un Exchange Centralizado de Cripto (CEX)?",
          texto: "Un exchange de criptomonedas tiene tres roles principales:",
        },
        {
          titulo: "1. Emparejamiento de Órdenes",
          texto: "En un exchange de cripto, los compradores y vendedores transaccionan entre sí. Esto significa que compras cripto de otro usuario del exchange y no del exchange mismo.\n\nEl exchange proporciona un LUGAR para las personas que quieren comprar cripto Y para las personas que quieren vender su cripto. Empareja compradores y vendedores.\n\nSi un comprador quiere comprar bitcoin (BTC) a $20,000 y un vendedor quiere vender bitcoin a $20,000, el exchange empareja las órdenes de estas dos personas.",
        },
        {
          titulo: "2. Contraparte Central de Liquidación",
          texto: "El exchange también actúa como contraparte central de liquidación.\n\nEsto es una forma elegante de decir que todas las órdenes emparejadas parecen ser contra el exchange mismo y no directamente entre los usuarios. Esto proporciona anonimato para ambas partes, ya que el comprador no sabrá quién es el vendedor y viceversa.\n\nComo contraparte central, el CEX maneja todo el proceso de la transacción y garantiza que todas las obligaciones se cumplan entre comprador y vendedor. Por ejemplo, si compraste 1 bitcoin (BTC) por $20,000, el exchange garantiza que tienes $20,000 (USD) y que ese USD se transfiere a la cuenta del vendedor y el BTC recién comprado se transfiere a tu cuenta.",
        },
        {
          titulo: "3. Custodio",
          texto: "El exchange también actúa como custodio de cualquier efectivo y/o cripto que tengas en tu cuenta.\n\nAlgunos exchanges te permiten depositar monedas fiat, como dólares o euros, mientras que otros solo permiten depositar criptomonedas como bitcoin (BTC) o ether (ETH).\n\nSea fiat o cripto, una vez depositados, están bajo la custodia del exchange. Esto significa que estás confiando en que el exchange mantenga tus fondos seguros, de la misma manera en que confiarías en la bóveda de un banco para guardar tu dinero.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-10-3",
      titulo: "¿Cómo funcionan los exchanges de cripto?",
      resumen: "Los exchanges centralizados operan de forma similar: creas una cuenta, la verificas, depositas fondos, compras y vendes cripto, y retiras. Aprende paso a paso cómo usar una plataforma de trading cripto.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-do-crypto-exchanges-work",
      contenido: [
        {
          titulo: "¿Cómo funcionan los exchanges de cripto?",
          texto: "Los exchanges centralizados de cripto (CEX) operan en diferentes países y soportan distintas monedas locales (fiat) y diferentes criptomonedas. Pero todos funcionan de manera similar. Los pasos son:",
          puntos: [
            "Crear tu cuenta",
            "Verificar tu cuenta",
            "Depositar fondos",
            "Comprar y vender cripto (\"Tradear\")",
            "Retirar fondos",
          ],
        },
        {
          titulo: "Crear una cuenta",
          texto: "Para usar un exchange de cripto, necesitas crear una cuenta.",
          imagen: { src: "/bootcamp/mod10-lec3/open-crypto-exchange-account.png", alt: "Abrir cuenta en exchange de cripto" },
        },
        {
          titulo: "",
          texto: "Al registrarte, se te pedirá proporcionar:",
          puntos: [
            "Tu dirección de correo electrónico",
            "Un nombre de usuario y una contraseña",
            "Tu país de residencia",
          ],
        },
        {
          titulo: "",
          texto: "Una vez enviada la información requerida, generalmente recibirás un correo electrónico para confirmar tu dirección.",
        },
        {
          titulo: "Verificar tu cuenta",
          texto: "Una vez creada tu cuenta, el siguiente paso es \"verificarla\". El propósito principal es verificar correctamente tu identidad. Esto requiere pasar por un proceso de \"Conozca a su Cliente\" (KYC).\n\nPara poder comprar y vender criptomonedas, deberás verificar tu cuenta y se te pedirá información personal como:",
          puntos: [
            "Nombre y apellido",
            "Fecha de nacimiento",
            "Dirección",
            "Ocupación",
            "Número de teléfono móvil",
          ],
        },
        {
          titulo: "",
          texto: "Luego se te pedirá \"probar\" que eres quien dices ser y que vives donde dices vivir. Esto se hace solicitando:",
          puntos: [
            "Prueba de identidad (licencia de conducir o pasaporte)",
            "Prueba de residencia (factura de servicios, estado de cuenta bancario o de tarjeta de crédito)",
          ],
        },
        {
          titulo: "",
          texto: "Además de estos documentos, solicitarán una selfie para asegurarse de que tu cara actual coincide con la cara en el documento de identidad.",
          imagen: { src: "/bootcamp/mod10-lec3/selfie-kyc.png", alt: "Selfie para KYC" },
        },
        {
          titulo: "",
          texto: "Una vez enviada tu selfie y los documentos, serán procesados. Si no hay problemas, tu cuenta quedará verificada. Dependiendo del exchange, este proceso puede ser instantáneo o tomar varios días.",
        },
        {
          titulo: "Depositar fondos",
          texto: "Una vez verificada tu cuenta, ¿ya puedes comprar cripto? ¡Todavía no!\n\nHay un paso más: financiar tu cuenta con moneda fiat.\n\nLas transferencias bancarias, tarjetas de crédito o débito, y aplicaciones de pago son las formas más comunes. Cada una tiene sus pros y contras.",
        },
        {
          titulo: "Transferencia bancaria (Wire Transfer)",
          texto: "Las transferencias bancarias implican completar formularios para que tu banco pueda transmitir la información a una institución financiera que convierte fiat a bitcoin.\n\nPueden tardar uno o dos días (o más) dependiendo de la ubicación. Las transferencias bancarias suelen tener comisiones más bajas que otras opciones, por lo que siguen siendo populares especialmente para compras grandes.",
        },
        {
          titulo: "Pago ACH",
          texto: "Otra forma de enviar dinero es vincular tu cuenta bancaria y dejar que una Cámara de Compensación Automatizada (ACH) procese tus solicitudes de transferencia.\n\nLa red ACH liquida transacciones en lotes, por lo que puede tardar de 1 a 3 días hábiles. Tu institución financiera también puede limitar la cantidad que puedes enviar.",
        },
        {
          titulo: "Tarjeta de crédito o débito",
          texto: "¿No quieres esperar para tu primer bitcoin? Una vez que hayas creado una cuenta y pasado el KYC, puedes usar tarjetas de débito o crédito para financiar tu cuenta o incluso comprar bitcoin directamente de forma instantánea.\n\nLa comodidad tiene un precio. Las compras con tarjeta de débito o crédito son mejores para transacciones de bajo volumen porque las comisiones del banco, la empresa procesadora de tarjetas y el exchange pueden ir del 0.75% hasta el 6% o incluso el 10% de tu transacción.",
        },
        {
          titulo: "Comprar y vender cripto",
          texto: "Una vez que el exchange haya completado la transferencia del depósito fiat, tu saldo se actualizará y ya puedes comprar y vender criptomonedas.\n\nAlgunos exchanges incluso te permiten comenzar a tradear cripto \"instantáneamente\", lo que significa que no tienes que esperar a que tu depósito se complete.",
        },
        {
          titulo: "1. Seleccionar un par de trading",
          texto: "Similar al mercado de forex, los precios cripto se cotizan en pares de divisas o \"pares de trading\". Y se ven así:\n\nBTC/USD: $1,000 — esto significa que 1 unidad de bitcoin (BTC) equivale a $1,000.\n\nLa primera moneda en un par representa la moneda base, mientras que la segunda representa la moneda de cotización.\n\nEn una orden de compra: pagas la moneda de cotización y recibes la moneda base. Por ejemplo, si seleccionas \"comprar\" BTC/USD, pagas en USD y recibes BTC.\n\nEn una orden de venta: vendes la moneda base y recibes la moneda de cotización. Por ejemplo, si seleccionas \"vender\" BTC/USD, vendes BTC y recibes USD.",
        },
        {
          titulo: "2. Completar el formulario de orden",
          texto: "Después de seleccionar tu par de trading, para comprar o vender debes completar un formulario de orden.",
          imagen: { src: "/bootcamp/mod10-lec3/order-form-182x360.png", alt: "Formulario de orden" },
        },
        {
          titulo: "",
          texto: "Se te presentarán al menos dos opciones para ingresar una orden:",
          puntos: [
            "Orden de mercado (Market order)",
            "Orden límite (Limit order)",
          ],
        },
        {
          titulo: "",
          texto: "Una orden de mercado se ejecuta inmediatamente al precio actual, por lo que solo podrás ingresar la cantidad que deseas comprar o vender.\n\nUna orden límite se ejecutará al precio que hayas establecido o mejor, una vez que el precio actual alcance tu precio límite.",
        },
        {
          titulo: "3. Enviar la orden",
          texto: "Después de seleccionar una orden de mercado o límite, puedes enviar tu orden.",
        },
        {
          titulo: "4. Esperar la ejecución de la orden",
          texto: "Una vez enviada tu orden, esperas a que se ejecute o se \"llene\".\n\nSi se seleccionó una orden de mercado, la orden se ejecutará inmediatamente. La plataforma te emparejará con una orden de venta al precio más bajo disponible.\n\nSi se seleccionó una orden límite, es posible que no se ejecute de inmediato pero podrás monitorear su estado. Las órdenes límite pueden verse en \"Órdenes abiertas\".",
          imagen: { src: "/bootcamp/mod10-lec3/open-buy-order.png", alt: "Orden de compra abierta" },
        },
        {
          titulo: "",
          texto: "Mientras tu orden no haya sido ejecutada, puedes cancelarla.\n\nCualquier orden que haya sido ejecutada o cancelada puede verse en \"Órdenes completadas\".",
          imagen: { src: "/bootcamp/mod10-lec3/completed-orders.png", alt: "Órdenes completadas" },
        },
        {
          titulo: "Retirar fondos",
          texto: "En algún momento, querrás retirar tu fiat o criptomoneda.",
          puntos: [
            "Si es moneda fiat, proporciona los datos de tu cuenta bancaria.",
            "Si es una criptomoneda, proporciona la dirección de tu wallet para esa criptomoneda específica.",
          ],
        },
        {
          titulo: "Cómo retirar fiat",
          texto: "Al igual que puedes comprar bitcoin mediante transferencias bancarias o ACH, estos métodos también están disponibles como opciones de retiro. Son populares porque tienen comisiones más bajas, aunque el tiempo de procesamiento puede ser mayor.\n\nEn la mayoría de los casos, el proceso de retiro es:\n\n1. Ve al panel de tu cuenta.\n2. Ve a la sección de Retiros o Transferencias.\n3. Elige entre las opciones de retiro disponibles.\n4. Ingresa la cantidad en moneda fiat que deseas retirar.\n5. Toma nota de la comisión y el tiempo de procesamiento.\n6. Verifica los detalles y haz clic en Enviar.\n\nEs posible que necesites confirmar las transacciones mediante 2FA antes de que se procesen. La transacción podría tardar unas horas o días en completarse.",
        },
        {
          titulo: "Cómo retirar cripto",
          texto: "Después de comprar cripto, si en lugar de venderla quieres enviar bitcoin (u otra cripto) a una wallet externa, solo necesitas la dirección o código QR de la wallet a la que deseas enviar.\n\nIngresa la cantidad que deseas transferir y haz clic en Enviar. ¡Es tan simple como enviar un correo electrónico! También es posible que necesites 2FA para autorizar la transacción.\n\nAhora que sabes cómo retirar cripto, hay algo importante que debo mencionar...\n\nLOS RETIROS DE CRIPTO SON IRREVERSIBLES.\n\nLéelo de nuevo. Interiorízalo. Asegúrate de verificar la dirección a la que estás enviando tu cripto porque una vez que haces clic en Enviar, no hay vuelta atrás. Un pequeño error puede significar perder tus fondos para siempre.",
          imagen: { src: "/bootcamp/mod10-lec3/losty-crypto.png", alt: "Cripto perdida para siempre" },
        },
        {
          titulo: "",
          texto: "Enviar cripto a una dirección incompatible (como BTC a una dirección BAT) también resultará en la pérdida permanente de fondos. ¡Siempre verifica la dirección antes de enviar!",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-10-4",
      titulo: "¿Cómo elegir un exchange de criptomonedas?",
      resumen: "Con cientos de exchanges para elegir, ¿cómo saber cuál es el mejor para ti? Esta lección te da la lista de criterios clave para evaluar cualquier exchange antes de abrir una cuenta.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-to-choose-a-crypto-exchange",
      contenido: [
        {
          titulo: "¿Cómo elegir el mejor exchange de cripto?",
          texto: "Hacer tu propia investigación (\"DYOR\") antes de operar en un exchange es importante. No elijas un exchange solo porque es el primero que aparece en Google o el más comentado en Reddit.\n\nHay muchos exchanges de criptomonedas para elegir pero, ¿cómo saber cuáles no son una porquería?\n\nDesafortunadamente, no existe el \"mejor\" exchange. Elegir el \"mejor\" es como intentar elegir el \"mejor\" platillo en un bufé... ¡depende de la persona!",
          imagen: { src: "/bootcamp/mod10-lec4/choosing-a-crypto-exchange.png", alt: "Cómo elegir un exchange de cripto" },
        },
        {
          titulo: "",
          puntos: ["¿Cuál es el mejor exchange de criptomonedas para MIS necesidades?"],
        },
        {
          titulo: "",
          texto: "Aquí está la lista de los factores importantes a considerar al elegir un exchange:",
          puntos: [
            "Reputación",
            "Seguridad",
            "Restricciones geográficas",
            "Acepta moneda fiat",
            "Disponibilidad de criptos",
            "Facilidad de uso",
            "Restricciones de depósito y retiro",
            "Comisiones",
            "Programas de lealtad o descuentos",
          ],
        },
        {
          titulo: "¿Cuál es su reputación?",
          texto: "¿Cuánto tiempo lleva operando el exchange? ¿Es confiable?\n\nLa confianza normalmente se construye a través de una relación de trabajo con el tiempo. Lo ideal es obtener referencias de amigos o familiares que ya lo estén usando.",
          imagen: { src: "/bootcamp/mod10-lec4/search-crypto-1-360x109.png", alt: "Buscar reviews del exchange en Google" },
        },
        {
          titulo: "",
          texto: "Si los amigos y la familia no pueden ayudar, busca en Google reseñas independientes de otros usuarios. Aquí hay otras cosas que puedes buscar:",
          puntos: [
            "Nombre de la empresa + \"review\" — lee las reseñas.",
            "Nombre de la empresa + \"scam\" — observa los resultados de búsqueda.",
            "Nombre de la empresa + \"withdraw\" — busca quejas sobre la imposibilidad de retirar fondos.",
            "Dónde está registrada la empresa y dónde están sus oficinas centrales. Verifica que sea una dirección real.",
          ],
        },
        {
          titulo: "",
          texto: "También puedes leer sitios web de la industria reconocidos y pasar tiempo en foros como BitcoinTalk o Reddit.\n\nBusca responder las siguientes preguntas: ¿Tiene el exchange reputación de ser una plataforma segura y confiable? ¿Dónde destaca y dónde falla? ¿Te lo recomendarían a tus amigos y familiares?\n\nMientras que los foros y las redes sociales también pueden ser fuentes de información, recuerda siempre tomar esos comentarios con cautela.",
          imagen: { src: "/bootcamp/mod10-lec4/grain-of-salt-150x150.png", alt: "Tomar la información con cautela" },
        },
        {
          titulo: "",
          texto: "Los influencers de cripto a menudo dominan la narrativa y a veces son pagados para promover positivamente un exchange. Por otro lado, hay personas que pueden ser excesivamente negativas, posiblemente difundiendo desinformación a propósito. La verdad suele estar en algún punto intermedio.\n\nSiempre haz tu propia investigación y no te quedes solo con la opinión de alguien más.",
        },
        {
          titulo: "¿Qué tan seguro es?",
          texto: "Como con todo lo relacionado con el dinero, la seguridad debe estar en lo alto de la lista al elegir un exchange de cripto.",
          imagen: { src: "/bootcamp/mod10-lec4/crypto-exchange-security.png", alt: "Seguridad en exchanges de cripto" },
        },
        {
          titulo: "",
          texto: "Ha habido muchos ejemplos trágicos de exchanges hackeados y fondos de clientes desaparecidos. Es importante saber qué medidas de seguridad tiene un exchange para mantener tus fondos seguros.\n\nAquí hay preguntas que debes hacer al investigar un exchange:",
          puntos: [
            "¿Ha sido alguna vez hackeado el exchange por datos o fondos de clientes?",
            "¿Ha experimentado tiempos de inactividad considerables o degradación del servicio?",
            "¿Está la empresa regulada? ¿Ha sido clausurada alguna vez por reguladores?",
            "¿Cómo custodia la empresa los fondos de los clientes? ¿Están esos fondos asegurados?",
            "¿Ofrece la plataforma 2FA (Autenticación de Dos Factores) al iniciar sesión, antes de realizar operaciones o antes de enviar cripto fuera del exchange?",
          ],
        },
        {
          titulo: "¿Tiene restricciones geográficas?",
          texto: "Debido a requisitos regulatorios, algunos exchanges solo permiten a personas de ciertos países abrir una cuenta y operar.",
          imagen: { src: "/bootcamp/mod10-lec4/binance-blocks-us-360x327.png", alt: "Restricciones geográficas en exchanges de cripto" },
        },
        {
          titulo: "",
          texto: "Algunos exchanges pueden no permitir ciudadanos o residentes de tu país. Asegúrate de elegir un exchange donde los ciudadanos o residentes de tu país no estén restringidos.",
        },
        {
          titulo: "¿Permite operar cripto con fiat?",
          texto: "Debes considerar el tipo de transacciones que deseas realizar. Los exchanges ofrecen:",
          puntos: [
            "Trading fiat a cripto",
            "Trading cripto a cripto",
            "Ambos: trading fiat a cripto y cripto a cripto",
          ],
        },
        {
          titulo: "",
          texto: "Si quieres comprar cripto con tu moneda local, deberás verificar qué monedas fiat acepta el exchange. Por ejemplo, si quieres comprar BTC con USD, necesitas un exchange que permita comprar criptomonedas con dólares.",
        },
        {
          titulo: "¿Qué tipos de cripto están disponibles?",
          texto: "Como principiante, probablemente comenzarás mirando bitcoin (BTC) o ether (ETH). Pero el mundo de la cripto es grande y crece cada día.\n\nCada exchange usa un proceso diferente para agregar activos cripto a su pool de trading. Eso significa que encontrarás una amplia gama de disponibilidad de tokens entre exchanges, así que asegúrate de verificar los activos disponibles antes de registrarte.\n\nSi no tienen lo que quieres tradear, todo lo demás no importa, ¿verdad?",
        },
        {
          titulo: "¿Es fácil de usar su plataforma?",
          texto: "Si eres un principiante en cripto, aprender a comprar y vender puede ser confuso.",
          imagen: { src: "/bootcamp/mod10-lec4/poor-usability.png", alt: "Exchange de cripto con mala usabilidad" },
        },
        {
          titulo: "",
          texto: "La usabilidad o \"facilidad de uso\" es un elemento muy importante para los nuevos traders, ya que una mala experiencia de usuario podría llevar a errores o suficiente frustración como para abandonar el trading.\n\nComo principiante en cripto, busca un exchange que ofrezca una interfaz de usuario (UI) simple y fácil de entender desde el principio.\n\nLa mayoría de los exchanges más conocidos tienen diseños visuales simples para escritorio y aplicaciones móviles y generalmente mantienen la funcionalidad limitada. A medida que ganas experiencia, puede que desees funciones adicionales como tipos de órdenes avanzadas, gráficas de velas y la capacidad de operar con margen.",
        },
        {
          titulo: "¿Cómo es su soporte al cliente?",
          texto: "Si tienes un problema con una transacción individual o con tu cuenta, ¿podrás contactar al soporte al cliente del exchange? ¿Y podrán resolver tu problema de manera oportuna?",
          imagen: { src: "/bootcamp/mod10-lec4/locked-out-of-account-again.png", alt: "Bloqueado de la cuenta del exchange" },
        },
        {
          titulo: "",
          texto: "Evaluar el servicio al cliente de un exchange te permite medir cuánto valora la empresa a sus clientes. Cosas a buscar:",
          puntos: [
            "¿Qué canales de soporte están disponibles? ¿Teléfono? ¿Correo electrónico? ¿Chat en vivo?",
            "¿Está disponible el soporte 24/7 o solo durante horas específicas?",
            "¿Hay un portal de soporte en línea donde puedas enviar un ticket de soporte?",
            "¿Proporciona el exchange una sección de soporte con preguntas frecuentes (FAQ)?",
          ],
        },
        {
          titulo: "¿Cuáles son sus métodos de depósito y retiro?",
          texto: "¿Qué métodos de depósito y retiro están disponibles en el exchange? Ejemplos incluyen:",
          puntos: [
            "Transferencia bancaria",
            "Transferencia bancaria internacional (wire transfer)",
            "Tarjeta de débito o crédito",
            "PayPal, Neteller, Skrill y otros servicios de pago en línea",
            "Transferencia de criptomonedas",
          ],
        },
        {
          titulo: "",
          texto: "Asegúrate de que tu exchange tenga métodos de depósito y retiro que TÚ quieras usar. Algunos métodos tienen tiempos de procesamiento más rápidos pero comisiones más altas (como tarjeta de crédito), mientras que otros son más lentos pero con comisiones mucho menores (como transferencia bancaria).",
        },
        {
          titulo: "¿Cuáles son los tiempos de procesamiento de depósito y retiro?",
          texto: "No olvides verificar los tiempos de procesamiento con los diferentes métodos de depósito y retiro.\n\n¿Cuánto tiempo tarda en completarse tu depósito? No querrás perder una oportunidad de trading porque tus fondos tardaron demasiado.\n\n¿Cuánto tiempo tardan en procesarse tus solicitudes de retiro? Esperar semanas para que un retiro llegue a tu cuenta bancaria o wallet no es divertido.\n\nNo tiene sentido comprar y vender cripto y terminar con ganancias si tarda una eternidad en retirarlas o no puedes retirarlas en absoluto.",
        },
        {
          titulo: "¿Hay límites de depósito o retiro?",
          texto: "¿Hay límites en la cantidad que puedes depositar o retirar? Estos límites pueden aplicarse a cada transacción o con base en el tiempo (diarios o semanales).\n\nAlgunos exchanges tienen límites de retiro que restringen cuánto puedes retirar a la vez. Si quieres retirar una cantidad grande, tendrás que dividirla en cantidades más pequeñas a lo largo de varios días.",
        },
        {
          titulo: "¿Cuáles son las comisiones?",
          texto: "Los exchanges de cripto son negocios lucrativos. Los más grandes son básicamente máquinas de dinero.",
          imagen: { src: "/bootcamp/mod10-lec4/money-machine.gif", alt: "Los exchanges son máquinas de dinero" },
        },
        {
          titulo: "",
          texto: "¿Cómo ganan dinero los exchanges? Cobrando comisiones. Diferentes exchanges cobran diferentes comisiones de diferentes maneras. Antes de comprar o vender en cualquier exchange, debes conocer las comisiones que aplican.",
          puntos: [
            "Comisiones de depósito. La mayoría de los exchanges no cobran comisiones al depositar, pero algunos sí. Varían según el método de depósito y la moneda.",
            "Comisiones de transacción. Típicamente calculadas como un porcentaje fijo del monto de cada transacción. Algunos exchanges cobran una tarifa plana para todas las transacciones; otros tienen comisiones \"maker\" y \"taker\" diferentes.",
            "Comisiones de retiro. Si quieres retirar fondos de tu wallet del exchange, es posible que se te cobre una comisión de retiro. Los retiros en fiat pueden tener una tarifa plana o basada en porcentaje; los retiros en cripto suelen tener una tarifa plana más la tarifa de red.",
          ],
        },
        {
          titulo: "¿Hay programas de lealtad o descuentos por volumen?",
          texto: "¿Hay maneras de calificar para comisiones de trading más bajas?\n\nPor ejemplo, algunos exchanges tienen su propia criptomoneda nativa que puede usarse para reducir las comisiones de trading.\n\n¿Hay una estructura de comisiones por niveles que recompense a los traders que operan con frecuencia?\n\nLas comisiones de trading generalmente se determinan por cuánto y con qué frecuencia operas. Si operas frecuentemente, la comisión puede disminuir si alcanzas umbrales de volumen de trading específicos.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-10-5",
      titulo: "¿Qué es el KYC?",
      resumen: "Los exchanges de cripto requieren un proceso de verificación de identidad llamado KYC (Conozca a su Cliente). Aprende por qué existe, cómo funciona y qué información necesitarás proporcionar.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-know-your-customer-kyc",
      contenido: [
        {
          titulo: "¿Qué es KYC?",
          texto: "Sé lo que podrías estar pensando...",
          imagen: { src: "/bootcamp/mod10-lec5/know-your-customer.png", alt: "Conozca a su Cliente" },
        },
        {
          titulo: "",
          texto: "No. Lo sentimos. Desafortunadamente, NO es un nuevo tipo de pollo de Kentucky.\n\nCuando abres una cuenta, es posible que notes que el exchange de cripto requiere completar algo llamado proceso de verificación \"KYC\".",
        },
        {
          titulo: "¿Qué es KYC?",
          texto: "Los exchanges de cripto en EE.UU. y muchos otros países están sujetos a leyes y regulaciones bancarias contra el lavado de dinero (AML).\n\nPara cumplir con estas regulaciones, los exchanges deben recopilar información específica sobre sus clientes. Este proceso se conoce típicamente como \"KYC\", que significa \"Know Your Customer\" (Conozca a su Cliente).\n\nEsto significa que deberás proporcionar información personal que confirme tu identidad.",
          imagen: { src: "/bootcamp/mod10-lec5/kyc-photo-id-1.png", alt: "Identificación fotográfica para KYC" },
        },
        {
          titulo: "",
          texto: "Para prevenir que los fondos sean utilizados para fraude, lavado de dinero, financiamiento del terrorismo y otras actividades ilegales, los exchanges deben ir más allá de simplemente pedir tu nombre.\n\nAl recopilar información sobre la identidad de sus clientes, se crea una base de datos que las agencias de aplicación de la ley pueden usar en sus investigaciones.",
          imagen: { src: "/bootcamp/mod10-lec5/anti-money-laundering-360x360.png", alt: "Contra el lavado de dinero" },
        },
        {
          titulo: "",
          texto: "El KYC no es exclusivo de las cripto y aplica a casi TODAS las instituciones financieras que mantienen fondos de clientes.\n\nPor ejemplo, ya pasas por un proceso KYC incluso al abrir una cuenta bancaria, o al solicitar una tarjeta de crédito, préstamo para automóvil o hipoteca.\n\nHay diferentes niveles de KYC, desde cero KYC hasta KYC muy exhaustivo. Aunque algunos exchanges aún pueden permitir a los usuarios depositar fondos sin pasar por KYC, se están convirtiendo en una especie en extinción ya que se está volviendo un estándar global. Hoy en día, la mayoría de los exchanges principales requieren KYC tan pronto como un nuevo usuario abre una cuenta.",
        },
        {
          titulo: "¿Cómo funciona el KYC?",
          texto: "Cuando te registras en un exchange, deberás proporcionar tu información básica como:",
          puntos: [
            "Tu nombre completo",
            "Tu fecha de nacimiento",
            "Tu dirección",
            "Tu dirección de correo electrónico",
            "Tu número de teléfono",
          ],
        },
        {
          titulo: "",
          texto: "Esta información es necesaria para garantizar que el exchange cumpla con los requisitos bajo las regulaciones Anti-Lavado de Dinero (AML).\n\nEl propósito de las regulaciones AML es prevenir que las personas oculten el origen, flujo y destino de las transferencias electrónicas de dinero, para que las agencias de aplicación de la ley puedan rastrear el flujo de fondos ilícitos.\n\nDependiendo de la plataforma o las leyes locales, el exchange también puede solicitar información adicional como:",
          puntos: [
            "Tu fuente de ingresos",
            "Tu número de seguridad social",
            "Una identificación fotográfica emitida por el gobierno, como una licencia de conducir o pasaporte",
            "Prueba de domicilio, como una copia de tu recibo de servicios",
            "Una foto tuya (selfie)",
            "Un escaneo biométrico facial (selfie en video)",
          ],
        },
        {
          titulo: "",
          imagen: { src: "/bootcamp/mod10-lec5/kyc-selfie-360x360.png", alt: "Selfie para KYC" },
        },
        {
          titulo: "",
          texto: "Si bien el proceso de registro inicial suele ser automatizado, las instituciones financieras tienen equipos de servicio al cliente encargados de verificar que la información proporcionada sea precisa. ¡Incluso pueden llamarte!\n\nPara conocer los requisitos KYC específicos de un exchange y cuánto tiempo puedes esperar que tome el proceso de verificación, busca la sección de soporte al cliente en su sitio web.\n\nTambién es común que los exchanges tengan más requisitos KYC para cuentas de mayor tamaño o grandes transacciones. ¡Solo se aseguran de que los fondos provengan de fuentes legítimas!\n\nComo puedes ver, es mucha información personal que deberás revelar. Por eso es importante asegurarte de estar tratando con un exchange de cripto confiable.\n\nAunque el KYC puede parecer una molestia, probablemente no tengas otra opción. Con miles de millones de dólares ingresando al mercado de cripto, más gobiernos están obligando a los exchanges a cumplir con sus procesos KYC y AML.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-10-6",
      titulo: "¿Qué es la 2FA?",
      resumen: "La mayoría de los exchanges requieren 2FA (Autenticación de Dos Factores). Aprende qué es, cómo funciona y por qué es una capa de seguridad esencial para proteger tu cuenta.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-two-factor-authentication-2fa",
      contenido: [
        {
          titulo: "¿Qué es la 2FA?",
          texto: "Después de registrarte en un exchange de cripto, probablemente se te pedirá configurar los ajustes de seguridad de tu cuenta y te encontrarás con algo llamado \"2FA\".\n\nPara iniciar sesión en cualquier cuenta en línea, se requiere autenticación. Autenticación es solo una forma elegante de decir \"probar la identidad de un usuario\".\n\n2FA es un tipo específico de proceso de autenticación que requiere dos métodos (también llamados \"factores\") para verificar tu identidad.",
          imagen: { src: "/bootcamp/mod10-lec6/2fa-login.png", alt: "Inicio de sesión con 2FA" },
        },
        {
          titulo: "¿Qué es la Autenticación de Dos Factores (2FA)?",
          texto: "Una contraseña sola NO es suficiente para mantener segura tu cuenta en el exchange de cripto.\n\nLa autenticación de dos factores, o 2FA, es un método para mejorar la seguridad de tu cuenta al requerir un \"factor\" adicional para probar la identidad del titular de la cuenta.\n\nHay 3 \"factores\" principales:",
          puntos: [
            "Algo que SABES (por ejemplo, contraseña, pregunta de seguridad, PIN)",
            "Algo que TIENES (por ejemplo, código proporcionado por un dispositivo)",
            "Algo que ERES (por ejemplo, huella dactilar, escaneo de iris, escaneo facial, escaneo de voz)",
          ],
        },
        {
          titulo: "",
          texto: "En 2FA, necesitas proporcionar DOS factores para autenticarte.\n\nLas preguntas de seguridad, como \"¿Cuál es el apellido de soltera de tu madre?\", NO se consideran 2FA porque sustituyen a tu contraseña. Básicamente, la pregunta de seguridad y tu contraseña están en la misma categoría.",
        },
        {
          titulo: "¿Cómo funciona la 2FA?",
          imagen: { src: "/bootcamp/mod10-lec6/2fa-process-780x276.png", alt: "Proceso de 2FA" },
        },
        {
          titulo: "",
          texto: "Hay dos opciones populares de 2FA:",
          puntos: [
            "SMS",
            "Aplicación de autenticación (Authenticator app)",
          ],
        },
        {
          titulo: "SMS",
          texto: "Originalmente, ingresar un código enviado a tu teléfono por mensaje de texto era la opción principal para el segundo \"factor\" de la autenticación 2FA.",
          imagen: { src: "/bootcamp/mod10-lec6/2fa-sms-code.png", alt: "Código 2FA por SMS" },
        },
        {
          titulo: "",
          texto: "Dado que la mayoría de las personas tienen un smartphone, era fácil proporcionar su número móvil y recibir un mensaje de texto con un código. Sin embargo, los hackers han ideado múltiples métodos para redirigir tu número de teléfono e interceptar estos mensajes de texto (como el SIM swapping).\n\nLas aplicaciones de autenticación han demostrado ser más seguras y confiables que el SMS.",
        },
        {
          titulo: "Aplicación de autenticación",
          texto: "Las aplicaciones de autenticación funcionan de manera similar a los mensajes SMS. Obtienes un código en una aplicación en tu smartphone y lo usas en combinación con tu nombre de usuario y contraseña para iniciar sesión en tus cuentas.",
          imagen: { src: "/bootcamp/mod10-lec6/2fa-code-360x315.png", alt: "Código 2FA" },
        },
        {
          titulo: "",
          texto: "La diferencia crítica es que el código NO se entrega a través de la red móvil y puede funcionar sin conexión. Esto hace que sea mucho más difícil para los hackers interceptar el código.\n\nPara que la aplicación funcione con la cuenta a la que intentas acceder, primero debes \"vincular\" la aplicación en tu smartphone con la cuenta. Si cambias de teléfono, debes repetir el proceso.\n\nDespués de iniciar sesión en tu exchange con tu nombre de usuario y contraseña, la 2FA requiere que ingreses una Contraseña de Un Solo Uso (OTP) enviada a tu smartphone. La OTP es un código de 6 dígitos generado por aplicaciones como Authy, Google Authenticator o Microsoft Authenticator.\n\nEsta OTP solo funciona una vez. Esto mejora tu seguridad ya que requiere una capa adicional de autenticación desde tu smartphone. En el escenario donde tu contraseña ha sido comprometida, un hacker aún necesitaría la OTP. Mientras tu teléfono esté en tu posesión, solo tú podrás proporcionarla.",
        },
        {
          titulo: "HOTP vs TOTP",
          texto: "Las aplicaciones de autenticación crean contraseñas de un solo uso (OTPs). Hay 2 tipos de estándares OTP:",
          puntos: [
            "HOTP (Contraseña de Un Solo Uso Basada en HMAC)",
            "TOTP (Contraseña de Un Solo Uso Basada en Tiempo)",
          ],
        },
        {
          titulo: "",
          texto: "La contraseña HOTP puede ser válida por un período de tiempo desconocido. En contraste, la contraseña TOTP cambia cada 30 segundos.\n\nTOTP es más seguro ya que el código es generado por tu aplicación cada 30 segundos y requiere sincronización entre la aplicación en tu dispositivo y el servidor de la aplicación.",
        },
        {
          titulo: "",
          puntos: ["¡Asegúrate de usar 2FA en todos lados! No solo para tu cuenta del exchange de cripto, sino también para tus cuentas bancarias en línea, cuentas de correo electrónico, tu gestor de contraseñas y cualquier otro servicio en línea que requiera inicio de sesión."],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-10-7",
      titulo: "¿Qué son los \"On-Ramps\" y \"Off-Ramps\" de fiat?",
      resumen: "Si alguna vez compraste cripto con dinero fiat, usaste un \"on-ramp de fiat\". Aprende qué significan estos términos y cómo conectan el mundo del dinero tradicional con el mundo cripto.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-are-fiat-on-ramps-and-off-ramps",
      contenido: [
        {
          titulo: "¿Qué son los on-ramps y off-ramps de fiat?",
          texto: "Si eres nuevo en el mundo cripto, pronto te encontrarás con las frases \"on-ramps de fiat\" y \"off-ramps de fiat\".\n\nEl proceso de transferir dinero entre fiat y cripto se conoce como \"on-ramping\" y \"off-ramping\".\n\nSi alguna vez compraste cripto con dinero fiat, habrías usado un \"on-ramp de fiat\" (también conocido como \"gateway de fiat\").\n\nLos on-ramps y off-ramps de fiat actúan como \"carreteras\" que conectan los mundos del fiat y la cripto.",
          imagen: { src: "/bootcamp/mod10-lec7/crypto-road-to-fiat-780x180.png", alt: "Carretera entre cripto y fiat" },
        },
        {
          titulo: "",
          texto: "Donde los on-ramps permiten a los usuarios convertir su moneda fiat en criptomonedas, los off-ramps son lo contrario.\n\nLos off-ramps te permiten \"cobrar\" tu cripto al permitirte intercambiar tus criptomonedas por moneda fiat.",
          imagen: { src: "/bootcamp/mod10-lec7/fiat-off-ramp-crypto-1.png", alt: "Off-ramp de fiat" },
        },
        {
          titulo: "",
          texto: "Una forma sencilla de pensar en los on-ramps y off-ramps de fiat es imaginar dos carreteras. Una carretera es parte del \"mundo fiat\" y la otra es parte del \"mundo cripto\".\n\nSi estás en el \"mundo fiat\" y deseas acceder al \"mundo cripto\", usas una rampa de entrada u \"on-ramp\".\n\nY si estás en el \"mundo cripto\" y deseas volver al \"mundo fiat\", usas una rampa de salida u \"off-ramp\".\n\nEstas rampas necesitan traer nuevos usuarios y nuevo dinero al mercado cripto.",
        },
        {
          titulo: "¿Qué es el \"fiat\"?",
          texto: "El término \"fiat\" es una palabra latina que a menudo se traduce como \"así sea\" o \"que se haga\".\n\nEn el contexto del dinero, los gobiernos modernos emiten \"moneda fiat\" para ser usada como el dinero principal en su economía.\n\nLa moneda fiat se refiere a una moneda emitida por un gobierno que no tiene valor intrínseco porque no está respaldada por nada (como materias primas como el oro o la plata).",
          imagen: { src: "/bootcamp/mod10-lec7/dollar-bill-fiat-360x360.png", alt: "El dólar como moneda fiat" },
        },
        {
          titulo: "",
          texto: "Por ejemplo, el dólar estadounidense es una moneda fiat. También lo son el yen japonés, el yuan chino, la libra esterlina, el peso filipino, el franco suizo, el baht tailandés, el real brasileño y el rand sudafricano.\n\nLa única razón por la que la moneda fiat se usa como dinero se debe al hecho de que el gobierno, usando su autoridad, \"lo ordena así\" al autorizar la moneda fiat como moneda de curso legal.",
          imagen: { src: "/bootcamp/mod10-lec7/fiiat-currency-legal-tender-360x360.png", alt: "La moneda fiat como curso legal" },
        },
        {
          titulo: "",
          texto: "El curso legal es cualquier cosa reconocida por la ley como medio para liquidar una deuda pública o privada, o cumplir una obligación financiera, como pagos de impuestos, contratos y multas legales.\n\nSi bien los gobiernos pueden controlar su moneda fiat y mantener su suministro, su valor depende completamente de cómo los poseedores perciben su valor y utilidad. Básicamente, para que la moneda fiat funcione, los poseedores deben tener fe en que tiene valor y lo mantendrá.",
        },
        {
          titulo: "¿Qué son los on-ramps y off-ramps de fiat?",
          texto: "Los on-ramps y off-ramps de fiat, también conocidos como gateways de fiat, son puertas de entrada y salida al mundo cripto.",
          imagen: { src: "/bootcamp/mod10-lec7/fiat-ti-crypto-gateway-360x360.png", alt: "Gateway entre fiat y cripto" },
        },
        {
          titulo: "",
          texto: "Si bien hay diferentes tipos de gateways de fiat, como transferencias bancarias o pagos con tarjeta de crédito, en términos generales, cualquier forma de depósito fiat en el mercado cripto es un gateway de fiat.",
        },
        {
          titulo: "¿Qué es un on-ramp de fiat?",
          texto: "Si quieres involucrarte en bitcoin u otras criptomonedas, a menos que te las regalen, tienes que comprar algunas. Y para comprarlas, necesitas intercambiar la moneda fiat que posees por criptomonedas. Para hacer eso, necesitas usar un \"on-ramp\".",
          imagen: { src: "/bootcamp/mod10-lec7/fiat-on-ramp-360x360.png", alt: "On-ramp de fiat" },
        },
        {
          titulo: "",
          texto: "Un \"on-ramp\" de fiat es un servicio que permite el intercambio de monedas fiat por criptomonedas.\n\nPor ejemplo, intercambias USD (moneda fiat) por BTC (criptomoneda).\n\nDado que la mayoría de las personas poseen moneda fiat, intercambiar fiat es el método más accesible para acceder a las criptomonedas.\n\nLos on-ramps te permiten salir del sistema monetario basado en fiat y entrar al sistema monetario descentralizado basado en blockchain.",
        },
        {
          titulo: "¿Qué es un off-ramp de fiat?",
          texto: "Lo opuesto de un on-ramp es un off-ramp.\n\nUn \"off-ramp\" es un servicio que permite el intercambio de criptomonedas por fiat.",
          imagen: { src: "/bootcamp/mod10-lec7/fiat-off-ramp-360x360.png", alt: "Off-ramp de fiat" },
        },
        {
          titulo: "",
          texto: "La disponibilidad de un off-ramp asegura a los usuarios que no están atrapados en una criptomoneda y pueden \"salir\" (vender cripto por fiat) en cualquier momento.\n\nLos off-ramps son complementarios a los on-ramps y sirven un papel crítico al proporcionar una forma de traer tu dinero de vuelta al mundo tradicional del fiat.\n\nPoder convertir criptomonedas de vuelta a fiat de manera relativamente fácil ayuda a aumentar la adopción de nuevos usuarios para cripto, ya que pueden \"salir\" si es necesario.\n\nEn resumen: los on-ramps te permiten salir del sistema monetario fiat tradicional y entrar al sistema monetario descentralizado basado en blockchain. Los off-ramps te permiten salir del sistema monetario blockchain y entrar al sistema monetario basado en fiat.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-10-8",
      titulo: "¿Qué es el precio Bid y Ask?",
      resumen: "En las plataformas de trading cripto verás el precio bid y el precio ask. Aprende qué son estos precios, qué significan y cómo los exchanges los usan para emparejar compradores y vendedores.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-bid-and-ask-price",
      contenido: [
        {
          titulo: "¿Qué son el precio bid y el precio ask?",
          texto: "En la plataforma de trading de tu exchange, cuando quieres operar una criptomoneda específica como bitcoin (BTC), verás una serie de números conocidos como los precios \"bid\" y \"ask\". ¿Pero qué son estos precios y qué significan?\n\nEntender la mecánica de los precios es crucial para entender cómo funcionan los exchanges de cripto.",
          imagen: { src: "/bootcamp/mod10-lec8/bid-and-ask-prices-347x360.png", alt: "Precios bid y ask" },
        },
        {
          titulo: "",
          texto: "Para que exista cualquier tipo de mercado, las transacciones deben ocurrir. Y para que las transacciones ocurran, necesitas tanto compradores como vendedores.\n\nEn un exchange spot de cripto, un comprador es alguien que quiere comprar una criptomoneda. Y el vendedor es alguien que posee una criptomoneda y quiere intercambiarla por moneda fiat como dólares (USD) o por otra criptomoneda como ether (ETH).\n\nLos precios bid y ask son los precios a los que otros compradores están dispuestos a comprar y los vendedores están dispuestos a vender.\n\nLos compradores hacen bids (pujas) y los vendedores hacen asks (ofertas).\n\nAl ingresar una orden de compra, tu orden necesita coincidir con un vendedor. Y al ingresar una orden de venta, tu orden necesita coincidir con un comprador.\n\nAsí que cuando ves una cotización de precio:\n- El bid es el precio al que puedes vender.\n- El ask (u oferta) es el precio al que puedes comprar.",
        },
        {
          titulo: "¿Cómo funcionan los precios bid y ask?",
          texto: "Un comprador quiere comprar al precio más bajo posible, mientras que un vendedor quiere vender al precio más alto posible.\n\nAsí que para que ocurra un trade, la persona que quiere comprar y la persona que quiere vender deben acordar un precio específico.\n\nUn exchange de cripto está estructurado para encontrar constantemente un precio en el que tanto el comprador como el vendedor estén de acuerdo.\n\nPara determinar un precio, el exchange proporciona una plataforma de trading donde los traders pueden enviar órdenes indicando a qué precio y cuántas unidades están dispuestos a comprar (Y vender) una criptomoneda específica.",
        },
        {
          titulo: "",
          texto: "En el mundo del trading:",
          puntos: [
            "La palabra \"bid\" es el precio que alguien está dispuesto a pagar al comprar.",
            "La palabra \"ask\" es el precio que alguien está dispuesto a aceptar al vender (a veces también referido como \"oferta\").",
          ],
        },
        {
          titulo: "",
          texto: "En circunstancias normales, el precio bid es menor que el precio ask.\n\nLa ligera diferencia entre estos dos precios se conoce como el \"spread bid-ask\" o simplemente el \"spread\".\n\n- El precio más alto que alguien está dispuesto a pagar por una cripto se conoce como el \"mejor bid\". Este garantiza el precio más alto posible para cualquier vendedor en ese momento particular.\n- El precio más bajo al que alguien está dispuesto a vender se llama el \"mejor ask\" o \"mejor oferta\". Este garantiza el precio más bajo posible para cualquier comprador en ese momento particular.\n\nEste mecanismo de \"mejor bid\" y \"mejor ask\" es una forma efectiva de mantener el mercado justo, diseñado para dar a los traders el mejor precio disponible en ese momento.",
        },
        {
          titulo: "¿Cómo usan los exchanges los precios bid y ask?",
          texto: "Los exchanges de cripto emparejan compradores y vendedores y automatizan todo el proceso.",
          imagen: { src: "/bootcamp/mod10-lec8/crypto-order-types.png", alt: "Tipos de órdenes de mercado y límite" },
        },
        {
          titulo: "",
          texto: "En su plataforma de trading, después de haber seleccionado un par de trading, cuando quieres comprar o vender, se te presentará un formulario de orden donde puedes colocar los siguientes tipos de órdenes:",
          puntos: [
            "Orden de mercado",
            "Orden límite",
          ],
        },
        {
          titulo: "",
          texto: "Una orden de mercado se ejecutará inmediatamente al mejor precio disponible actualmente:\n- Si estás comprando, tu trade se ejecutará al precio del \"mejor ask\".\n- Si estás vendiendo, tu trade se ejecutará al precio del \"mejor bid\".\n\nUna orden límite te permite establecer un precio específico para que se ejecute la orden:\n- Si estás comprando, puedes colocar una orden límite de compra y especificar un \"precio límite\", que es el precio máximo que estás dispuesto a pagar.\n- Si estás vendiendo, puedes colocar una orden límite de venta y especificar un \"precio límite\", que es el precio mínimo que estás dispuesto a aceptar.\n\nLos traders a menudo usan órdenes límite para tener más control sobre los precios de ejecución.\n\nY son las órdenes límite de compra y las de venta las que proporcionan liquidez en un exchange:\n- Las órdenes límite de compra son los BIDS.\n- Las órdenes límite de venta son los ASKS.",
        },
        {
          titulo: "",
          texto: "El exchange agrega estos bids y asks y, con estos datos, establece el mejor precio disponible actualmente (\"precio de mercado\") en tiempo real.\n\nLas barras verdes muestran el volumen de bids (órdenes de compra) y las rojas el volumen de asks (órdenes de venta).",
          imagen: { src: "/bootcamp/mod10-lec8/bid-and-ask-prices-crypto-exchange.png", alt: "Precios bid y ask en exchanges de cripto" },
        },
        {
          titulo: "",
          texto: "Cada vez que un precio bid y un precio ask se \"cruzan\", esto significa que un vendedor venderá a un precio que un comprador está dispuesto a pagar O un comprador comprará a un precio que un vendedor está dispuesto a aceptar.\n\nCuando esto sucede, el exchange inmediatamente empareja y llena tanto volumen como sea posible para esas órdenes. Esto asegura que los compradores siempre compren al precio ask más bajo y los vendedores vendan al precio bid más alto.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-10-9",
      titulo: "¿Qué es la liquidez?",
      resumen: "La liquidez es la facilidad con la que puedes comprar o vender un activo con un impacto mínimo en su precio. Aprende por qué la liquidez es crucial en los exchanges de cripto y cómo medirla.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-crypto-liquidity",
      contenido: [
        {
          titulo: "¿Qué es la liquidez?",
          texto: "¿Qué es la liquidez? Más específicamente, ¿qué es la liquidez de mercado?",
          imagen: { src: "/bootcamp/mod10-lec9/liquidity-150x150.png", alt: "Liquidez" },
        },
        {
          titulo: "",
          texto: "Una cosa es segura: no tiene nada que ver con comprar o vender agua.",
        },
        {
          titulo: "¿Qué es la liquidez?",
          texto: "La liquidez, o más específicamente, la liquidez de mercado, se refiere a la facilidad con la que puedes comprar o vender lo que intentas comprar o vender, con un impacto limitado en el precio.\n\nAlgo se describe como \"líquido\" si puede comprarse o venderse fácilmente sin mover sustancialmente su precio hacia arriba o hacia abajo. El factor \"facilidad\" se basa en el tiempo requerido para ejecutar la transacción.\n\nAlgo que tarda mucho tiempo y no puede venderse o intercambiarse fácilmente sin una pérdida sustancial en el precio tiene \"baja liquidez\". Si algo tiene baja liquidez, se describe como \"ilíquido\".\n\nTodos los exchanges de cripto necesitan liquidez. Sin ella, las órdenes no pueden emparejarse entre compradores y vendedores.\n\nLa cantidad de liquidez en un exchange es importante porque mientras más liquidez haya, menos efecto tiene una sola orden en el precio de una criptomoneda.",
        },
        {
          titulo: "",
          texto: "Cuando hay mucha liquidez, el precio de una criptomoneda no se verá excesivamente afectado por una sola orden.\n\nPor ejemplo, si quieres comprar algunos bitcoins (BTC) y no hay muchos traders en un exchange particular, comprar solo una pequeña cantidad podría causar un aumento masivo en el precio.\n\nCuanto más volumen de trading (órdenes reales de compra y venta ejecutadas), mayor la liquidez.\nMayor liquidez → precio más estable → más fácil comprar o vender al precio que deseas.",
        },
        {
          titulo: "¿Por qué es importante la liquidez?",
          texto: "Si comparas los precios de criptomonedas, como bitcoin (BTC), en múltiples exchanges, notarás que los precios no son los mismos y pueden variar ampliamente.\n\nEsto es porque cada exchange tiene su propia \"población\" de compradores y vendedores. Y el tamaño de esa \"población\" es lo que determina la cantidad de liquidez disponible.",
          puntos: [
            "Si hay una gran \"población\", esto generalmente implica que hay muchos compradores y vendedores presentes, y hay alta liquidez.",
            "Si hay una pequeña \"población\", esto generalmente implica que hay pocos compradores y vendedores, y hay baja liquidez.",
          ],
        },
        {
          titulo: "",
          texto: "Una buena forma de pensar en cada exchange de cripto es verlos como \"islas\" individuales. Cada isla tiene su propia \"población\" de compradores y vendedores.",
          imagen: { src: "/bootcamp/mod10-lec9/crypto-exchanges-as-islands.png", alt: "Los exchanges de cripto como islas" },
        },
        {
          titulo: "",
          texto: "Esto significa que no hay un precio \"oficial\" global para una criptomoneda. El precio se basa puramente en qué exchange estás y lo que esa \"población\" específica de traders está dispuesta a pagar.\n\nPor ejemplo, si hay dos exchanges y ambos ofrecen comprar y vender BTC/USD, el precio de BTC/USD podría ser $29,000 en uno y $29,100 en el otro.\n\nLa diferencia de precios se reduce a la cantidad de liquidez disponible en cada \"isla\" (exchange).\n\nEl nivel de liquidez en un exchange afecta la velocidad a la que puedes ejecutar trades. Si hay un alto nivel de liquidez, los trades deberían completarse rápidamente y fácilmente.",
        },
        {
          titulo: "¿Qué es el volumen?",
          texto: "\"Volumen\" o más específicamente, \"volumen de trading\" se refiere al número de órdenes (\"trades\") ejecutadas en un exchange dentro de un período de tiempo dado.\n\nLa liquidez generalmente está asociada con el volumen de trading: cuantas más unidades de una criptomoneda estén disponibles para ser \"tradeadas\" (compradas o vendidas) en un exchange, más \"líquida\" se dice que es.\n\nEn un exchange, cada criptomoneda tiene su propio libro de órdenes y volumen de trading. El volumen que ves publicado es un indicador de la liquidez del exchange para esa cripto específica.",
        },
        {
          titulo: "",
          puntos: ["Un libro de órdenes consiste en una lista de órdenes pendientes para comprar o vender a varios niveles de precio."],
        },
        {
          titulo: "",
          texto: "Los volúmenes de trading más altos permiten a los usuarios comprar o vender fácilmente la criptomoneda de su elección sin mucha dificultad. También, cuanto mayor sea el volumen de trading de un exchange, más se percibe como ampliamente confiado por muchos usuarios.",
        },
        {
          titulo: "",
          puntos: ["Para atraer más clientes, algunos exchanges han sido acusados de inflar artificialmente los volúmenes de trading para aparentar tener mayor liquidez. Esto se hace mediante el \"wash trading\", que es el acto ilegal de fabricar trades donde también actúas como la contraparte de la transacción. Básicamente, el exchange coloca una orden de compra y se vende a sí mismo, creando \"volumen de trading falso\"."],
        },
        {
          titulo: "¿Cuál es la diferencia entre liquidez y volumen?",
          texto: "Es importante conocer la diferencia entre \"liquidez\" y \"volumen\" ya que ambos términos se usan popularmente en el trading de cripto.\n\nEl término \"volumen\" se refiere a la cantidad total o el número total de unidades de una criptomoneda que se tradean durante un período de tiempo dado.\n\nEl término \"liquidez\" se refiere al nivel de rapidez o facilidad con la que una criptomoneda puede comprarse o venderse en un exchange a su precio de mercado.\n\nEl volumen puede usarse como indicador de liquidez.\n\nEs por eso que un alto volumen de trading es generalmente un indicador de un alto nivel agregado de liquidez para un exchange (aunque los niveles de liquidez pueden variar entre criptomonedas dentro del exchange).",
        },
        {
          titulo: "",
          puntos: ["Puedes encontrar datos de volumen de trading de los principales exchanges en sitios web como CoinMarketCap, CoinGecko, Nomics y The Block."],
        },
        {
          titulo: "¿Cómo se determina la liquidez?",
          texto: "Para determinar si un exchange tiene alta o baja liquidez, para la cripto que deseas tradear, presta especial atención al spread.\n\nUn spread pequeño o \"ajustado\" indica buena liquidez.\n\nEl spread es la diferencia entre el mejor bid (orden de compra más alta) y el mejor ask (orden de venta más baja).\n\nEn general, a mayor liquidez, menor o más \"ajustado\" es el spread.\n\n¿Por qué? Porque cuantas más órdenes de compra (\"bids\") y órdenes de venta (\"asks\") se coloquen para una criptomoneda, más cercanos estarán los precios bid y ask entre sí.\n\nSi el spread es pequeño o \"ajustado\", esto indica que las órdenes están bien emparejadas entre compra y venta, lo que crea un mercado líquido.\n\nOtra cosa a monitorear es si el libro de órdenes se repone con nuevas órdenes cuando las órdenes existentes son \"tomadas\" o ejecutadas. Si nuevas órdenes aparecen rápidamente para reemplazar las anteriores, esto es otro buen indicador de alta liquidez.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-10-10",
      titulo: "¿Qué es el libro de órdenes?",
      resumen: "El libro de órdenes es una lista de todas las órdenes de compra y venta pendientes para un par de trading. Aprende cómo funciona, cómo leerlo y cómo usarlo para ejecutar trades.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-an-order-book",
      contenido: [
        {
          titulo: "¿Qué es el libro de órdenes?",
          texto: "En el mercado cripto, la mayoría de los traders e inversores compran y venden criptomonedas en un exchange centralizado (CEX).\n\nUn concepto clave que debes entender antes de realizar tu primer trade cripto en un exchange es el \"libro de órdenes\" (order book).\n\nUn libro de órdenes ofrece una vista \"entre bastidores\" en tiempo real de la oferta y la demanda de una criptomoneda particular.\n\nUn libro de órdenes es una lista de todas las órdenes de compra y venta pendientes (o \"abiertas\") que están actualmente disponibles para un par de trading específico.\n\nEl libro de órdenes es público, lo que permite a todos los usuarios del exchange ver las órdenes en el mercado. A medida que los traders agregan, eliminan, cambian y ejecutan órdenes, el libro de órdenes cambia.",
        },
        {
          titulo: "",
          texto: "Por ejemplo, un exchange podría tener un libro de órdenes para el par de trading BTC/USD.\n\nEl libro de órdenes tendrá todas las órdenes límite de compra y venta que los clientes hayan colocado en el exchange para comprar o vender bitcoin (BTC) por dólares (USD).\n\nLos exchanges de cripto te permiten tradear múltiples pares de trading. Cada par tiene su propio libro de órdenes. ¡Así que en un exchange no hay solo un libro de órdenes, sino muchos!\n\nCualquier persona puede colocar una orden pendiente, también conocida como \"orden límite\", en un libro de órdenes. Esa orden permanecerá en el libro hasta que la persona que la colocó la cancele, o hasta que otra persona acepte tomarla.",
        },
        {
          titulo: "¿Cómo uso el libro de órdenes?",
          texto: "Cuando colocas una orden en el exchange, tienes dos opciones:",
          puntos: [
            "Puedes colocar una orden límite que \"se quede\" en el libro de órdenes y esperar a que alguien más la tome.",
            "Puedes tomar inmediatamente la orden límite de alguien más que ya \"está\" en el libro de órdenes.",
          ],
        },
        {
          titulo: "",
          texto: "Aquí hay un ejemplo de cómo se ve un libro de órdenes:",
          imagen: { src: "/bootcamp/mod10-lec10/crypto-exchange-order-book.png", alt: "Libro de órdenes de exchange de cripto" },
        },
        {
          titulo: "",
          texto: "Los asks se muestran en rojo y los bids se muestran en verde.\n\nPara cada nivel de precio, verás un \"Tamaño de Mercado\" o \"Cantidad Acumulada\". Esta es la cantidad de criptomoneda que están dispuestos a comprar o vender a ese precio específico.\n\nPuedes pensar en el libro de órdenes como representando la oferta y la demanda. Los asks son personas que ofrecen sus bitcoins para la venta en el exchange y proporcionan oferta para satisfacer la demanda de los compradores.",
          imagen: { src: "/bootcamp/mod10-lec10/crypto-order-book-example.png", alt: "Ejemplo de libro de órdenes" },
        },
        {
          titulo: "",
          texto: "Este libro de órdenes muestra las órdenes de compra y venta disponibles para el par BTC/USD.\n\n- El lado de compra (en verde) representa todas las órdenes de compra abiertas (\"bids\") por debajo del último precio tradeado.\n- El lado de venta (en rojo) representa todas las órdenes de venta abiertas (\"asks\") por encima del último precio tradeado.\n\nSi miras de cerca, cerca del centro, puedes ver el \"mejor bid\" y el \"mejor ask\".\n\nEl precio del \"mejor bid\" (el precio más alto que alguien está dispuesto a pagar por bitcoin) es 29968.79.\n\nEl precio del \"mejor ask\" (el precio más bajo al que alguien está dispuesto a vender su bitcoin) es 29969.62.\n\nLa brecha entre el precio de compra más alto (\"mejor bid\") y el precio de venta más bajo (\"mejor ask\") se llama el \"spread\". En este caso, el spread es de 0.81 USD.",
        },
        {
          titulo: "¿Qué pasa si quiero comprar?",
          texto: "Si quieres comprar BTC/USD, puedes:",
          puntos: [
            "Colocar una orden límite de compra en el lado de compra (texto verde).",
            "Tomar el mejor ask en el lado de venta (texto rojo).",
          ],
        },
        {
          titulo: "",
          texto: "Dado que el precio del mejor ask en el lado de venta es 29,969.62 USD, puedes \"tomar\" ese precio instantáneamente colocando una \"orden de mercado\". ¡Y te conviertes en el orgulloso nuevo propietario de 0.0276 bitcoin!\n\nDe lo contrario, necesitarías colocar (o \"hacer\") una orden límite de compra especificando un \"precio límite\" menor o igual a 29968.79 USD en el lado de compra.\n\nTodas estas órdenes límite de compra permanecen \"abiertas\" y simplemente \"esperan\" en el libro de órdenes hasta que alguien acepte vender o \"tomar\" al precio límite.\n\nNo hay garantía de que alguien más acepte vender al precio límite disponible, así que no sabes cuánto tiempo tu orden \"esperará\" antes de ser tomada.",
        },
        {
          titulo: "¿Qué pasa si quiero vender?",
          texto: "Si ya tienes algunos bitcoins y quieres vender BTC/USD, puedes:",
          puntos: [
            "Colocar una orden límite de venta en el lado de venta (texto rojo).",
            "Tomar el mejor bid en el lado de compra (texto verde).",
          ],
        },
        {
          titulo: "",
          texto: "Dado que el precio del mejor bid en el lado de venta es 29968.79 USD, puedes \"tomar\" ese precio instantáneamente colocando una \"orden de mercado\". ¡Y dices adiós a 0.0474 de tu bitcoin!\n\nTypicamente, un exchange de cripto cobrará una comisión más alta si \"tomas\" una orden versus si \"haces\" o colocas una orden límite para que otros la \"tomen\".\n\nEste modelo de comisiones utilizado por los exchanges se conoce como el modelo de comisiones \"maker-taker\" y se discutirá con más detalle en la próxima lección.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-10-11",
      titulo: "¿Qué es un gráfico de profundidad?",
      resumen: "Un gráfico de profundidad visualiza las órdenes de compra y venta del libro de órdenes. Aprende a leerlo, entender sus componentes y cómo las paredes de compra y venta revelan la dinámica del mercado.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-depth-chart",
      contenido: [
        {
          titulo: "¿Qué es un gráfico de profundidad?",
          texto: "Suena como algo que usaría un buzo.",
          imagen: { src: "/bootcamp/mod10-lec11/depth-360x360.png", alt: "Profundidad" },
        },
        {
          titulo: "",
          texto: "Pero no. Ese no es el caso.\n\nEn la mayoría de las plataformas de trading de los exchanges centralizados de cripto (CEX), además de un gráfico de precios, también se muestra un \"gráfico de profundidad\" (depth chart).\n\nUn gráfico de profundidad es una herramienta para entender la oferta y la demanda de una criptomoneda en un momento dado para un rango de precios.\n\nEs una representación visual del libro de órdenes, que es una lista organizada de órdenes de compra o venta pendientes de una criptomoneda específica a diferentes niveles de precio.\n\nComo trader de cripto, es importante entender qué es un gráfico de profundidad y cómo leerlo.",
        },
        {
          titulo: "Cómo leer un gráfico de profundidad",
          texto: "Un gráfico de profundidad es una representación visual de las órdenes de compra (\"bids\") y las órdenes de venta (\"asks\") del libro de órdenes.\n\nEs una forma ordenada de mostrar el volumen (o tamaño de orden) de las órdenes de compra y venta pendientes relativo a cada nivel de precio.\n\nAquí hay un ejemplo de cómo se ve un gráfico de profundidad:",
          imagen: { src: "/bootcamp/mod10-lec11/cryptodepth-chart.png", alt: "Gráfico de profundidad" },
        },
        {
          titulo: "",
          texto: "Si bien los gráficos de profundidad pueden diferir entre exchanges, generalmente consisten en los siguientes componentes:",
          puntos: [
            "Línea de bids",
            "Línea de asks",
            "Eje horizontal \"X\"",
            "Eje vertical \"Y\"",
          ],
        },
        {
          titulo: "¿Qué es la línea de bids?",
          texto: "La línea de bids muestra el valor acumulado de las órdenes de compra (\"bids\") en cada punto de precio. Está representada por una línea verde en el lado izquierdo del gráfico de profundidad.",
          imagen: { src: "/bootcamp/mod10-lec11/bid-line-on-depth-chart.png", alt: "Línea de bids en el gráfico de profundidad" },
        },
        {
          titulo: "¿Qué es la línea de asks?",
          texto: "La línea de asks muestra el valor acumulado de las órdenes de venta (\"asks\") en cada punto de precio. Está representada por una línea roja en el lado derecho del gráfico de profundidad.",
          imagen: { src: "/bootcamp/mod10-lec11/ask-line-on-depth-chart.png", alt: "Línea de asks en el gráfico de profundidad" },
        },
        {
          titulo: "¿Qué es el eje horizontal \"X\"?",
          texto: "El eje horizontal muestra los diferentes precios a los que se están colocando órdenes de compra y venta.",
          imagen: { src: "/bootcamp/mod10-lec11/price-levels-on-depth-chart.png", alt: "Niveles de precio en el gráfico de profundidad" },
        },
        {
          titulo: "",
          texto: "En el lado izquierdo (en verde), puedes ver todas las órdenes límite de compra (\"bids\") que las personas han colocado. Esto representa el lado bid del libro de órdenes.\n\nEn el lado derecho (en rojo), puedes ver todas las órdenes límite de venta (\"asks\") que las personas han colocado. Esto representa el lado ask del libro de órdenes.\n\nUna forma fácil de recordarlo:\n- Lado izquierdo (verde) = Lado bid (órdenes de compra)\n- Lado derecho (rojo) = Lado ask (órdenes de venta)",
        },
        {
          titulo: "¿Qué es el eje vertical \"Y\"?",
          texto: "El eje vertical representa la cantidad de órdenes colocadas en cada nivel de precio para una criptomoneda.",
          imagen: { src: "/bootcamp/mod10-lec11/quantity-on-depth-chart.png", alt: "Cantidad en el gráfico de profundidad" },
        },
        {
          titulo: "",
          texto: "La mayoría de los exchanges proporcionan gráficos de profundidad donde puedes pasar el cursor sobre cualquier punto en la línea de bid o ask y ver cuántas órdenes de compra o venta hay colocadas en ese precio.",
        },
        {
          titulo: "¿Cómo funciona un gráfico de profundidad?",
          texto: "Un gráfico de profundidad ilustra la oferta (interés en vender) y la demanda (interés en comprar).\n\nLa \"profundidad\" en un gráfico de profundidad se refiere a la capacidad de un mercado para una criptomoneda específica de sostener órdenes grandes (de compra o venta) sin que su precio se mueva significativamente.\n\nCuantas más órdenes pendientes haya en ambos lados del libro de órdenes, mayor será la \"profundidad\" del libro.\n\nSi el lado verde es más alto que el lado rojo, esto indica que hay mucho más interés de compra (por debajo del precio actual) que interés de venta (por encima del precio actual). Y viceversa.",
        },
        {
          titulo: "Paredes de Compra y Venta",
          texto: "¿Qué son las paredes de compra y venta (buy walls y sell walls)?",
          imagen: { src: "/bootcamp/mod10-lec11/buy-and-sell-walls.png", alt: "Paredes de compra y venta" },
        },
        {
          titulo: "",
          texto: "Las paredes de compra y venta indican un gran volumen de órdenes de compra u órdenes de venta en un precio dado.\n\nVisualmente, el volumen de órdenes forma una \"pared\" de color cuando se muestra frente a los niveles de precio.\n\nLas paredes de compra y venta listadas en un gráfico de profundidad pueden darte información sobre cómo los otros traders del mercado están prediciendo la dirección del precio.",
        },
        {
          titulo: "¿Qué es una pared de compra (Buy Wall)?",
          texto: "Una \"pared de compra\" se forma cuando hay un gran número de órdenes de compra (\"bids\") en un nivel de precio particular.\n\nCuantas más órdenes de compra pendientes existan a un precio dado, mayor la pared de compra.\n\nEn el ejemplo a continuación, hay una pared de compra para BTC/USD en 28,000.",
          imagen: { src: "/bootcamp/mod10-lec11/buy-wall.png", alt: "Pared de compra" },
        },
        {
          titulo: "",
          texto: "Las paredes de compra pueden ser creadas por múltiples órdenes al mismo precio o por una sola orden masiva colocada por una \"ballena\".\n\nUna gran pared de compra puede indicar que los traders creen que el precio no caerá por debajo de este nivel de precio debido al número de órdenes de compra pendientes. El volumen de estas órdenes es lo suficientemente grande como para potencialmente impulsar el precio hacia arriba si los trades se ejecutan.",
        },
        {
          titulo: "",
          puntos: ["Las paredes de compra también pueden crearse artificialmente. Dado que las órdenes de compra son dinámicas y pueden añadirse o eliminarse continuamente, las paredes de compra pueden usarse como una forma de manipulación del mercado y pueden no representar verdadero interés en comprar la criptomoneda a ese precio."],
        },
        {
          titulo: "¿Qué es una pared de venta (Sell Wall)?",
          texto: "Una pared de venta es lo opuesto a una pared de compra.\n\nUna \"pared de venta\" se forma cuando hay un gran número de órdenes de venta (\"asks\") en un nivel de precio particular.\n\nEn el ejemplo a continuación, hay una pared de venta para BTC/USD en 30,001.",
          imagen: { src: "/bootcamp/mod10-lec11/sell-wall.png", alt: "Pared de venta" },
        },
        {
          titulo: "",
          texto: "Las paredes de venta pueden ser creadas por múltiples órdenes al mismo precio o por una sola orden masiva colocada por una \"ballena\".\n\nUna gran pared de venta impide que los precios suban rápidamente porque crea una gran cantidad de órdenes de venta a cierto precio. El volumen de estas órdenes es lo suficientemente grande como para potencialmente impulsar el precio hacia abajo si los trades se ejecutan.\n\nLa presencia de la pared de venta puede incluso hacer que el precio caiga antes de que se ejecuten las órdenes. Esto se debe a que, a medida que el precio se acerca a la pared de venta, los traders creen que la oferta pronto superará a la demanda.\n\nUna gran pared de venta puede indicar que muchos traders no creen que el precio subirá por encima de cierto nivel.",
        },
        {
          titulo: "",
          puntos: ["Al igual que las paredes de compra, las paredes de venta también pueden ser manipuladas."],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-10-12",
      titulo: "¿Qué son las comisiones Maker y Taker?",
      resumen: "La mayoría de los exchanges usan un modelo de comisiones maker-taker. Aprende la diferencia entre una orden maker y una orden taker, cómo se calculan las comisiones y por qué los makers pagan menos.",
      estado: "Contenido completo",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-are-maker-taker-fees",
      contenido: [
        {
          titulo: "¿Qué son las comisiones Maker y Taker?",
          texto: "Tradear criptomonedas no es gratis. Cuando compras y vendes criptomonedas en una plataforma de trading de un exchange centralizado (CEX), debes pagar comisiones de trading.\n\nEs importante conocer los tipos de comisiones de trading que cobran los exchanges y entender cómo funcionan.\n\nEn general, al calcular comisiones en un exchange, las comisiones se basan en el tipo de orden que colocas y se cobran cuando la orden se ejecuta y empareja.\n\nLas órdenes generalmente se clasifican en dos categorías:",
          puntos: [
            "Órdenes cobradas con \"comisiones maker\"",
            "Órdenes cobradas con \"comisiones taker\"",
          ],
        },
        {
          titulo: "",
          texto: "Las comisiones maker son menores que las comisiones taker. Y ambas varían dependiendo de tu volumen de trading promedio durante un período de tiempo dado (generalmente los últimos 30 días).\n\nA medida que tu volumen de trading aumenta, tus comisiones como porcentaje del tamaño de tu trade disminuyen.",
        },
        {
          titulo: "¿Qué es un maker y un taker?",
          texto: "El propósito de un exchange de cripto es emparejar órdenes de clientes que quieren COMPRAR criptomonedas con órdenes de clientes que quieren VENDER criptomonedas.\n\nPor proporcionar este servicio de \"emparejamiento\", un exchange cobrará una comisión cuando tu orden se ejecute.\n\nLa comisión depende de lo siguiente:",
          puntos: [
            "El par de trading",
            "Tu volumen de trading dentro de un período de tiempo específico",
            "Si tu orden es maker o taker",
          ],
        },
        {
          titulo: "",
          texto: "La mayoría de los exchanges utilizan un modelo de comisiones \"maker-taker\" para determinar las comisiones de trading para todas las órdenes.\n\nEl modelo maker-taker es una forma de diferenciar las comisiones entre órdenes que agregan liquidez (órdenes \"maker\") y las que quitan liquidez (órdenes \"taker\").\n\nSi colocas una orden que se ejecuta inmediatamente, eres considerado un \"taker\" porque esta orden quita liquidez y se te cobrará una \"comisión taker\".\n\nSi colocas una orden que NO se ejecuta inmediatamente, sino que \"descansa\" o \"espera\" en el libro de órdenes, eres considerado un \"maker\" porque esta orden agrega liquidez y se te cobrará una \"comisión maker\".",
        },
        {
          titulo: "¿Qué es una comisión maker?",
          texto: "Una \"comisión maker\" se cobra por órdenes \"maker\".\n\nUna orden maker es una orden que colocas que NO se ejecuta o empareja inmediatamente con la orden de un comprador (o vendedor) en el libro de órdenes.\n\nMás específicamente, para ser considerada una orden maker:",
          puntos: [
            "Una orden de compra debe colocarse a un precio menor que la orden de venta más baja (o \"ask\") en el libro de órdenes.",
            "Una orden de venta debe colocarse a un precio mayor que la orden de compra más alta (o \"bid\") en el libro de órdenes.",
          ],
        },
        {
          titulo: "",
          texto: "Tu orden se AGREGA al libro de órdenes. Y cuando esto sucede, te conviertes en un \"maker\".",
        },
        {
          titulo: "Una orden límite es una orden maker",
          texto: "Una orden límite que NO se ejecuta inmediatamente se considera una orden maker.\n\nPor ejemplo, si BTC/USD actualmente cotiza a $31,000 y envías una orden límite de compra para 1 BTC a un precio límite de $30,000, esta orden no se ejecutará inmediatamente. En cambio, se agregará al libro de órdenes y \"descansará\" allí hasta que el precio caiga a $30,000.\n\nAl colocar esta orden, eres referido como un \"maker\" porque agregaste liquidez o \"hiciste\" un mercado. Si no hubieras colocado esa orden, puede que no haya otros traders dispuestos a comprar 1 BTC por $30,000.\n\nEsto es similar a publicar un artículo en eBay para la venta y que ningún comprador aparezca. No hay mercado para tu artículo. Pero con tu orden, puedes \"hacer un mercado\" porque ahora hay un comprador (tú) que comprará al vendedor.",
        },
        {
          titulo: "¿Qué es una comisión taker?",
          texto: "Una \"comisión taker\" se cobra por órdenes \"taker\".\n\nUna orden taker es una orden que se empareja inmediatamente con la orden de un comprador (o vendedor) ya en el libro de órdenes.\n\nMás específicamente, para ser considerada una orden taker:",
          puntos: [
            "Una orden de compra debe colocarse en la orden de venta más baja (o \"mejor ask\") en el libro de órdenes.",
            "Una orden de venta debe colocarse en la orden de compra más alta (o \"mejor bid\") en el libro de órdenes.",
          ],
        },
        {
          titulo: "",
          texto: "Tu orden elimina o TOMA órdenes existentes del libro de órdenes. Y cuando esto sucede, te conviertes en un \"taker\".",
        },
        {
          titulo: "Una orden de mercado es una orden taker",
          texto: "Una orden de mercado se considera una orden taker ya que se ejecuta inmediatamente.\n\nPor ejemplo, si BTC/USD actualmente cotiza a $31,000 y envías una orden de mercado para 1 BTC, esta orden se ejecutará inmediatamente.\n\nAl colocar esta orden, eres referido como un \"taker\" porque \"tomaste liquidez\" del mercado. Si no hubieras colocado esa orden, todavía habría una orden de venta pendiente en el libro de órdenes dispuesta a vender 1 BTC por $31,000.",
        },
        {
          titulo: "Ejemplos de comisiones Maker y Taker",
          texto: "Veamos un ejemplo de cómo un exchange de cripto te cobraría si fueras un \"maker\" versus un \"taker\".",
        },
        {
          titulo: "Ejemplo de comisión taker",
          texto: "Asumiremos lo siguiente:",
          puntos: [
            "Quieres comprar 3 bitcoin (BTC) a un precio de $30,000",
            "Tu volumen de trading de 30 días es actualmente de $100,000",
          ],
        },
        {
          titulo: "",
          texto: "Según el programa de comisiones del exchange, se te cobrará una de las siguientes:",
          puntos: [
            "La comisión maker del 0.15%",
            "La comisión taker del 0.25%",
          ],
        },
        {
          titulo: "",
          texto: "En este ejemplo, el costo total de tu orden equivale a 3 * $30,000 = $90,000.\n\nColocas tu orden como una orden de mercado y se llena inmediatamente.\n\nComo tu orden se ejecutó como un \"taker\", la comisión taker total puede calcularse:\n$90,000 * (0.25 / 100) = $225",
        },
        {
          titulo: "Ejemplo de comisión maker",
          texto: "En este ejemplo, quieres comprar 100 bitcoin (BTC) a un precio de $20,000 y tu volumen de trading de 30 días es actualmente de $10,000,000.\n\nSegún el programa de comisiones del exchange, se te cobrará una de las siguientes:",
          puntos: [
            "La comisión maker del 0.02%",
            "La comisión taker del 0.10%",
          ],
        },
        {
          titulo: "",
          texto: "El costo total de tu orden equivale a 100 * $20,000 = $2,000,000.\n\nActualmente, BTC/USD cotiza a $30,000, así que colocas una orden límite de compra a $20,000. Tu orden ahora está \"descansando\" en el libro de órdenes.\n\nA la mañana siguiente, el mercado cripto cae y bitcoin baja y tu orden se llena.\n\nComo tu orden se ejecutó como un \"maker\", la comisión maker total puede calcularse:\n$2,000,000 * (0.02 / 100) = $400\n\nComo notarás, la comisión maker es menor que la comisión taker. Esto incentiva a los traders a agregar liquidez.\n\nLa desventaja de las órdenes maker es que puede tomar tiempo para que se llene tu orden. Es posible que tu orden \"descanse\" en el libro de órdenes y nunca se llene si no hay muchos participantes en el mercado.",
        },
        {
          titulo: "Resumen",
          texto: "Un mercado para un par de trading dado está compuesto por makers y takers.\n\nLos makers agregan liquidez al mercado colocando órdenes que no se ejecutan inmediatamente y \"descansan\" en el libro de órdenes. Los takers quitan liquidez del mercado tomando órdenes existentes del libro de órdenes.\n\nLa mayoría de los exchanges cobran comisiones maker más bajas que las comisiones taker para incentivar a los traders a agregar liquidez al mercado.",
          imagen: { src: "/bootcamp/mod10-lec12/crypto-exchanges-quiz.png", alt: "Cuestionario de exchanges de cripto" },
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo11 = [
    {
      id: "crypto-11-1",
      titulo: "¿Qué es una estafa cripto?",
      resumen: "El mundo cripto crece rápidamente, y con él las estafas. Aprende qué es una estafa cripto y por qué son especialmente peligrosas.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-crypto-scam",
      contenido: [
        {
          titulo: "El auge del cripto y las estafas",
          texto: "El mundo del cripto está creciendo rápidamente. Y también el HYPE. Debido a los precios disparados (y desplomados) de las criptomonedas, y a la cantidad de personas que han ganado (y perdido) mucho dinero, el cripto ha atraído un enorme interés de los medios de comunicación masivos, amplificado por las redes sociales.",
          imagen: { src: "/bootcamp/mod11-lec1/crypto-buzz-scam.png", alt: "Buzz y estafas cripto" },
        },
        {
          titulo: "Las estafas cripto van en aumento",
          texto: "A medida que el interés público en el cripto ha crecido, también han crecido las estafas y el fraude. Los estafadores siempre buscan nuevas formas de robarte el dinero, y el enorme crecimiento del mercado cripto en los últimos años ha creado muchas oportunidades para actividades turbias.",
          imagen: { src: "/bootcamp/mod11-lec1/crypto-scam-coin.png", alt: "Moneda de estafa cripto" },
        },
        {
          titulo: "Cifras alarmantes",
          texto: "Con historias de personas de 20 y 30 años convirtiéndose en millonarios de la noche a la mañana con el cripto, los novatos se han lanzado a participar. Pero su falta de comprensión técnica y el deseo de «hacerse rico rápido» puede cegarlos ante los peligros. En 2021, el crimen relacionado con criptomonedas alcanzó un máximo histórico: los estafadores robaron $14 mil millones en cripto, un aumento del 79% respecto al año anterior.",
        },
        {
          titulo: "¿Qué es una estafa cripto?",
          texto: "Una estafa es un esquema engañoso o truco para quitarle algo a alguien. Un estafador se hace pasar por una persona o empresa creíble e intenta pedirte dinero, información personal, o ambas cosas. Una estafa cripto es similar, salvo que en lugar de pedir dólares u otra moneda fiduciaria, el estafador solicita criptomonedas.",
        },
        {
          titulo: "Métodos comunes de engaño",
          texto: "Los estafadores usan una variedad de fraudes para convencerte de comprar y enviarles criptomonedas. Los «anzuelos» suelen basarse en métodos probados de estafas tradicionales:",
          puntos: [
            "\"¡No te lo pierdas!\"",
            "\"¡Entra desde el principio!\"",
            "\"¡Cero riesgo!\"",
            "\"¡100% de retornos garantizados!\"",
          ],
        },
        {
          titulo: "Por qué las estafas cripto son más peligrosas",
          texto: "Aunque la mayoría de las estafas cripto son modificaciones de estafas tradicionales, son más peligrosas porque Bitcoin y otras criptomonedas no están reguladas por ningún gobierno, y una vez transferidas, la transacción es irreversible. Con una estafa bancaria o de tarjeta de crédito, puedes disputar la transacción con una autoridad central. Pero con las criptomonedas descentralizadas, no hay autoridad central a quien acudir. Si envías cripto a un tercero, no puedes revertirlo ni cancelarlo.",
          imagen: { src: "/bootcamp/mod11-lec1/shitcoin-by-babypips.png", alt: "Shitcoin - moneda sin valor" },
        },
        {
          titulo: "Sin protección legal",
          texto: "Si eres víctima de una estafa cripto, no existe protección legal ni proceso de disputa. Si arriesgas demasiado tu dinero y lo pierdes todo... estás solo.",
          imagen: { src: "/bootcamp/mod11-lec1/shady-coin-homeless.png", alt: "Consecuencias de las estafas cripto" },
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-11-2",
      titulo: "Tipos de estafas cripto",
      resumen: "Desde sitios web falsos hasta esquemas Ponzi y rug pulls: conoce los tipos de estafas más comunes en el mundo cripto.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/types-of-crypto-scams",
      contenido: [
        {
          titulo: "Eres vulnerable",
          texto: "Si posees bitcoin u otras criptomonedas, eres vulnerable al fraude y las estafas. Existen muchos tipos de estafas cripto ya que los estafadores siempre encuentran nuevas formas de robar tus holdings. La mayoría tiende a caer en dos categorías: el estafador te engaña para que le envíes criptomonedas directamente, o el estafador obtiene acceso a tu billetera cripto sin tu permiso.",
          imagen: { src: "/bootcamp/mod11-lec2/crypto-scam-idea.png", alt: "Idea de estafa cripto" },
        },
        {
          titulo: "Sitios web y apps falsos",
          texto: "Los estafadores crean plataformas de trading de criptomonedas (también conocidas como «exchanges») que son FALSAS. Incluso pueden crear versiones falsas de plataformas reales. Estos sitios web falsos se parecen mucho a los reales, lo que dificulta que los nuevos traders distingan la diferencia. Incluso la dirección web será similar, con solo un ligero cambio en la ortografía. Te tentarán con ofertas como «bitcoin gratis» o «bonos de depósito». Una vez que te registras y haces un depósito inicial, no podrás retirar, o peor, el sitio se cierra.",
          imagen: { src: "/bootcamp/mod11-lec2/fake-crypto-websites.png", alt: "Sitios web cripto falsos" },
        },
        {
          titulo: "Estafas de phishing",
          texto: "El phishing es un tipo de ataque de ingeniería social que usa correo electrónico, teléfono o mensajes de texto para incitar a las personas a proporcionar información sensible. En el contexto cripto, las estafas de phishing intentan obtener acceso a tu cuenta en un exchange o a tu billetera cripto. Un ataque de phishing comienza con el estafador contactándote y haciéndose pasar por alguien de confianza. Si haces clic en el enlace, serás enviado a un sitio web falso idéntico al exchange o wallet que usas. Si ingresas tus datos de acceso, le habrás dado esa información al estafador, quien podrá acceder a tu cuenta real y robar tu cripto.",
          imagen: { src: "/bootcamp/mod11-lec2/crypto-phishing-780x429.png", alt: "Estafa de phishing cripto" },
        },
        {
          titulo: "Estafas por mensaje directo (DM)",
          texto: "Ten cuidado con los estafadores que te envían un «DM» (mensaje directo) en Telegram, Discord, Instagram, Twitter y otras apps de redes sociales. Estos mensajes incluyen ofertas de «acceso anticipado» y «alpha» con enlaces sobre cómo participar. NO hagas clic en ningún enlace. Estas cuentas falsas solo intentan robar tu cripto. Si un desconocido te envía un DM sobre una nueva criptomoneda o proyecto cripto, asume que es una estafa.",
          imagen: { src: "/bootcamp/mod11-lec2/dm-scam-360x341.png", alt: "Estafa por mensaje directo" },
        },
        {
          titulo: "Estafas de inversión",
          texto: "Las estafas de inversión vienen en diferentes formas pero al final, todas intentan pedirte que «inviertas» dinero en cripto y ganes enormes retornos, a veces prometiendo ganancias garantizadas con poco o ningún riesgo. Pueden operarse como esquemas Ponzi, donde se te presenta una oportunidad «única en la vida» y se te pide pagar en criptomonedas. En realidad, los fondos de los nuevos inversores son los que se usan para pagar a los inversores anteriores.",
          imagen: { src: "/bootcamp/mod11-lec2/investment-scam.png", alt: "Estafa de inversión cripto" },
        },
        {
          titulo: "Estafas románticas",
          texto: "En 2021, se reportaron $1 mil millones en pérdidas por víctimas de estafas románticas. Un estafador usa la ilusión de una relación romántica o cercana para manipularte y robarte. Las víctimas son contactadas en redes sociales o apps de citas. Comienza con una solicitud de amistad aparentemente inocente de un desconocido que adopta una identidad falsa y usa palabras dulces para ganarse tu afecto. Una vez logrado, las conversaciones se desvían hacia solicitudes de criptomonedas o «oportunidades de inversión lucrativas».",
          imagen: { src: "/bootcamp/mod11-lec2/romance-scam-360x360.png", alt: "Estafa romántica cripto" },
        },
        {
          titulo: "Estafas de sorteos (Giveaways)",
          texto: "Una estafa de sorteo es cuando un estafador publica en redes sociales pidiendo a las personas que le envíen criptomonedas y prometiendo duplicar (o más) la cantidad enviada. Estas publicaciones parecerán genuinas, posiblemente mencionarán celebridades y tendrán respuestas de cuentas falsas afirmando que duplicaron su dinero. Cuando visitas el sitio web, se te pedirá «verificar» tu dirección de billetera enviando criptomonedas. Por supuesto, no hay ningún sorteo real.",
          imagen: { src: "/bootcamp/mod11-lec2/free-giveaways.png", alt: "Sorteos falsos cripto" },
        },
        {
          titulo: "Estafas de chantaje",
          texto: "El chantaje ocurre cuando un criminal amenaza con divulgar información vergonzosa a menos que entregues dinero. Los estafadores te enviarán un correo electrónico afirmando tener pruebas de que visitaste sitios web para adultos u otros sitios ilícitos. A menos que envíes criptomonedas o compartas tu frase semilla, esta «prueba» se compartirá públicamente. No caigas en ello: a menos que tu teléfono o computadora haya sido hackeada, la probabilidad de que el chantajista tenga algo es casi nula.",
          imagen: { src: "/bootcamp/mod11-lec2/blackmail-scam-360x360.png", alt: "Estafa de chantaje cripto" },
        },
        {
          titulo: "Estafas de Oferta Inicial de Moneda (ICO)",
          texto: "Una oferta inicial de moneda (ICO) es el equivalente cripto de una oferta pública inicial (IPO) para acciones. A diferencia de una IPO en un entorno regulado, una ICO ocurre en un entorno no regulado. Hubo un boom de ICOs en 2017, y menos de un año después, más de 1,000 ICOs estaban muertas. Los estafadores de ICO promovían un nuevo tipo de criptomoneda que supuestamente sería lo próximo grande, compartían materiales de marketing convincentes, pedían dinero para ser inversores tempranos y, una vez recolectado suficiente dinero, desaparecían con los fondos de todos.",
          imagen: { src: "/bootcamp/mod11-lec2/ico-scam.png", alt: "Estafa de ICO cripto" },
        },
        {
          titulo: "Esquemas de «Pump and Dump»",
          texto: "Un esquema de «pump and dump» involucra a un individuo o grupo que infla el precio de una criptomoneda para luego vender sus posiciones y hacer una fortuna rápida. El esquema comienza con los estafadores comprando una moneda particular. Una vez acumulada, de manera coordinada, comienzan a «bombear» la moneda a través de redes sociales, chats grupales, correo electrónico y foros. A medida que el precio sube por la fuerte presión compradora, los estafadores están vendiendo («dumping»). Eventualmente, cuando no hay más compradores, el precio comienza a caer.",
          imagen: { src: "/bootcamp/mod11-lec2/pump-and-dump-crypto-scam.png", alt: "Esquema pump and dump cripto" },
        },
        {
          titulo: "Estafas de «Rug Pull»",
          texto: "Los rug pulls ocurren cuando los creadores de un nuevo proyecto cripto promueven su nuevo token para atraer compradores en un exchange descentralizado (DEX), aumentando la demanda y el precio del token, antes de desaparecer con los fondos. Las personas que compraron quedan con un token sin valor. Una vez que el pool de liquidez estaba en funcionamiento, los dueños del proyecto promovieron masivamente el token para atraer nuevos compradores. Eventualmente desaparecieron con grandes cantidades de criptomonedas legítimas, dejando a las víctimas con tokens sin valor.",
          imagen: { src: "/bootcamp/mod11-lec2/rug-pull-crypto-scam-360x288.png", alt: "Estafa rug pull cripto" },
        },
        {
          titulo: "Estafas de suplantación de identidad",
          texto: "Una estafa de suplantación es cuando los estafadores se hacen pasar por una fuente de confianza para convencerte de completar una transacción cripto. Te contactarán por teléfono o correo electrónico haciéndose pasar por agencias gubernamentales, compañías de tarjetas de crédito, bancos o proveedores de servicios. Puede ser sobre una multa o una factura vencida que debes pagar con criptomonedas.",
          imagen: { src: "/bootcamp/mod11-lec2/impersonation-scam.png", alt: "Estafa de suplantación de identidad" },
        },
        {
          titulo: "Estafas de soporte técnico",
          texto: "Una estafa de soporte técnico es un tipo específico de suplantación donde alguien se hace pasar por un agente de soporte técnico para acceder a tus holdings cripto. El estafador te contactará y afirmará que algo está mal con tu cuenta y se ofrecerá a ayudar. Luego pedirá tu información de inicio de sesión y código 2FA. Otras tácticas incluyen pedirte que envíes cripto a otra dirección o que permitas acceso remoto a tu computadora. Es importante saber que una empresa legítima NUNCA pedirá tu información de inicio de sesión ni tu código 2FA.",
          imagen: { src: "/bootcamp/mod11-lec2/technical-support-scam.png", alt: "Estafa de soporte técnico" },
          puntos: [
            "Nombre de usuario de tu cuenta",
            "Contraseña de tu cuenta",
            "Tu código 2FA",
            "Direcciones de billetera o frases semilla",
            "Acceso remoto a tu computadora",
          ],
        },
        {
          titulo: "Falsas endorsaciones de celebridades",
          texto: "Similar a las estafas de suplantación, pero involucra específicamente a celebridades famosas e influencers. Los estafadores se harán pasar por ellos para promover su «inversión» cripto o pedirte directamente que les envíes cripto. Estos mensajes vendrán de cuentas de redes sociales que parecen reales o que han sido hackeadas. Si ves una publicación de una celebridad diciéndote que envíes criptomonedas, es una estafa.",
          imagen: { src: "/bootcamp/mod11-lec2/fake-elon-musk-crypto-scam-285x360.png", alt: "Falsa endorsación de celebridad cripto" },
        },
        {
          titulo: "Estafas de «Loader» o carga de cuenta",
          texto: "En esta estafa, un desconocido te pedirá tu información de inicio de sesión en tu exchange cripto porque necesita «una cuenta con un límite alto». Una vez que tienen acceso, «cargan» tu cuenta con cripto comprado usando información de tarjetas de crédito robadas. Cuando el titular legítimo de la tarjeta descubre el fraude, no será responsable de los cargos. Dado que las compras de cripto ocurrieron en tu cuenta, TÚ serás responsable de los cargos.",
          imagen: { src: "/bootcamp/mod11-lec2/loader-scam-360x341.png", alt: "Estafa de carga de cuenta cripto" },
        },
        {
          titulo: "Estafas de empleo",
          texto: "Una estafa de empleo ocurre cuando un estafador se hace pasar por un reclutador y engaña a los solicitantes de empleo para que les envíen cripto. Los estafadores buscarán personas que hayan publicado su currículum en línea y les enviarán «ofertas de trabajo», pero para unirte a la empresa debes primero pagar por la capacitación en criptomonedas. En realidad, no hay ningún trabajo. Otro tipo de estafa de empleo apunta a freelancers: te piden que te registres y pagues una tarifa o compres un producto usando criptomonedas antes de poder trabajar para ellos.",
          imagen: { src: "/bootcamp/mod11-lec2/employment-scam-360x360.png", alt: "Estafa de empleo cripto" },
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-11-3",
      titulo: "Cómo identificar estafas cripto",
      resumen: "Conocer las señales de alerta te permite detectar y evitar estafas cripto antes de convertirte en víctima.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-to-spot-crypto-scams",
      contenido: [
        {
          titulo: "La señal más clara: solo aceptan cripto",
          texto: "Una señal definitiva de estafa es cuando alguien dice que TIENES que pagar con criptomonedas. ¿Por qué una persona o empresa creíble SOLO aceptaría criptomonedas y se negaría a aceptar dólares u otra moneda fiduciaria, ya sea mediante tarjeta de débito, crédito, PayPal o transferencia bancaria? Los estafadores exigen cripto porque, a diferencia de otras opciones donde puedes disputar la transacción posteriormente, una vez que envías cripto no hay forma de revertir la transacción.",
          imagen: { src: "/bootcamp/mod11-lec3/text-message-scam-only-accept-crypto-360x360.png", alt: "Estafa que solo acepta cripto" },
        },
        {
          titulo: "Cómo identificar una estafa cripto",
          texto: "Si sabes cómo detectar una estafa cripto, puedes prevenirla. Aquí hay algunas señales de alerta o banderas rojas a tener en cuenta:",
          imagen: { src: "/bootcamp/mod11-lec3/how-to-spot-crypto-scam.png", alt: "Cómo detectar estafas cripto" },
        },
        {
          titulo: "Señales de alerta",
          puntos: [
            "🚩 Un discurso que afirma que la inversión no tiene riesgo. No creas tales promesas, aunque incluyan endorsaciones de celebridades o testimonios, probablemente son falsos.",
            "🚩 Una «garantía» de que ganarás dinero. Ninguna inversión financiera puede garantizar retornos futuros positivos.",
            "🚩 Una oferta de «dinero gratis». Ya sea en efectivo o criptomonedas, cualquier oferta de dinero gratis probablemente sea falsa.",
            "🚩 Grandes afirmaciones sin detalles. Si alguien te presenta una «oportunidad» con detalles vagos o ninguno, probablemente sea una estafa.",
            "🚩 Contenido mal escrito o descuidado. Presta atención a errores gramaticales en mensajes, perfiles de redes sociales y sitios web.",
            "🚩 Sentido de urgencia. Los estafadores intentan crear urgencia para persuadirte de actuar de inmediato.",
            "🚩 Mensajes aleatorios de un amigo. Un amigo te contacta de la nada, afirmando estar en una emergencia y necesitar ayuda financiera urgente, pero solo a través de criptomonedas.",
          ],
        },
        {
          titulo: "Cómo detectar un sitio web cripto sospechoso",
          texto: "Si no estás seguro de si un sitio web cripto específico es una estafa, usa esta lista para ayudarte:",
          imagen: { src: "/bootcamp/mod11-lec3/shady-crypto-website.png", alt: "Sitio web cripto sospechoso" },
          puntos: [
            "¿Escuchaste por primera vez sobre él en redes sociales (Reddit, TikTok, Instagram, Facebook, YouTube) o apps de chat (Discord, Telegram)? Estos canales son formas populares para que los estafadores encuentren nuevas víctimas.",
            "¿El sitio web se conecta de forma segura a través de https (no http)? Si la dirección comienza con «http» en lugar de «https», los datos que envíes no son seguros.",
            "¿La dirección del sitio web tiene errores ortográficos o de tipeo? Si es así, el sitio podría ser falso.",
            "¿El contenido del sitio contiene errores tipográficos, mala gramática o estructuras de oraciones confusas?",
            "¿El sitio web usa demasiadas imágenes de stock o parece creado a partir de una plantilla predeterminada?",
            "¿El contenido se enfoca en lo que impulsará el precio del cripto en lugar de discutir detalles técnicos?",
            "¿El sitio web garantiza altos retornos? Por ejemplo, ¿afirma que podrás triplicar tu dinero en una semana?",
            "¿Hay una página «Sobre nosotros»? ¿Proporciona detalles sobre dónde está incorporada la empresa? ¿Revela los nombres reales de las personas que la operan?",
            "¿El sitio web afirma contar con endorsaciones de celebridades o influencers? Estas suelen ser falsas.",
          ],
        },
        {
          titulo: "Esta lista no es infalible",
          texto: "Incluso si el sitio web puede superar todas las preguntas, es posible que aún sea una estafa. Pero la probabilidad habrá disminuido. Si hay algo en el sitio web que te parece sospechoso o suena demasiado bueno para ser verdad, lo más seguro es no hacer clic en nada ni enviar ninguna información y simplemente SALIR.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-11-4",
      titulo: "Cómo protegerte de las estafas cripto",
      resumen: "8 consejos prácticos para protegerte de las estafas cripto y evitar convertirte en víctima.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-to-protect-yourself-from-crypto-scams",
      contenido: [
        {
          titulo: "Los estafadores son cada vez más sofisticados",
          texto: "A medida que la popularidad de las criptomonedas ha crecido en todo el mundo, también ha crecido la creatividad de los estafadores que buscan apuntar a traders e inversores cripto sin experiencia. Incluso si no eres un usuario nuevo, no pienses que eres inmune a caer en esquemas turbios. Las estafas cripto se están volviendo más sofisticadas, pero hay formas de evitar convertirte en víctima.",
          imagen: { src: "/bootcamp/mod11-lec4/protect-yourself-from-crypto-scams-780x390.png", alt: "Cómo protegerte de estafas cripto" },
        },
        {
          titulo: "1. Nunca compartas la frase semilla de tu billetera",
          texto: "Si te piden compartir la frase semilla de tu billetera cripto para participar en una oportunidad de inversión o «restaurar» tu cuenta, es una estafa para robar tus holdings. ¡No caigas en ello! Nunca compartas tu frase semilla o claves privadas con nadie. Ni siquiera con tu mamá. Y recuerda guardar tu frase semilla en un lugar seguro.",
          imagen: { src: "/bootcamp/mod11-lec4/mom-asking-for-seed-phrase-scam-360x360.png", alt: "Nunca compartas tu frase semilla" },
        },
        {
          titulo: "2. Haz tu propia investigación (DYOR)",
          texto: "Si no estás familiarizado con una criptomoneda y no sabes qué la hace única, haz tu tarea. Busca en línea usando el nombre de la empresa y el nombre de la criptomoneda, y agrega «reseña», «estafa» o «queja» a tu búsqueda. Presta atención a los resultados y no solo los ojees. Las reseñas en línea pueden provenir de perfiles falsos. Siempre haz tu propia investigación (DYOR) antes de arriesgar cualquier dinero.",
          imagen: { src: "/bootcamp/mod11-lec4/do-your-own-research-shitcoin-360x360.png", alt: "Haz tu propia investigación" },
        },
        {
          titulo: "3. Ignora las solicitudes urgentes",
          texto: "Los estafadores intentan usar tácticas de alta presión para conseguir que envíes tu dinero rápidamente. Por ejemplo, pueden ofrecer descuentos o bonos si actúas ahora, o pretender ser un amigo en una emergencia que necesita dinero enviado como cripto. Las solicitudes de pago urgentes son una gran señal de advertencia. Si recibes estos tipos de solicitudes, simplemente elimina los mensajes e ignóralos.",
          imagen: { src: "/bootcamp/mod11-lec4/urgent-message-scam-360x341.png", alt: "Solicitudes urgentes son estafas" },
        },
        {
          titulo: "4. Sé escéptico ante las publicaciones en redes sociales",
          texto: "Las redes sociales son el método más rentable utilizado por los estafadores. Los estafadores cripto suelen usar apps como Twitter, Telegram y Discord para promover sus estafas. Pueden afirmar que influencers o celebridades respaldan sus proyectos. Todo esto es falso. Cuando veas la promoción intensa de una nueva criptomoneda en redes sociales, sé escéptico y haz tu propia investigación. Y si alguien aparece en tus redes sociales apresurando una amistad o romance, ¡cuidado con las estafas románticas!",
        },
        {
          titulo: "5. Ignora los DMs aleatorios",
          texto: "Si recibes un mensaje directo aleatorio de un desconocido intentando venderte una «oportunidad» de inversión cripto, es una estafa. Nunca transfieras tu cripto ni proporciones información personal a nadie que te contacte de forma no solicitada. Incluso si no es un completo desconocido y conoces a la persona, mantente suspicaz: esa persona puede haber sido convencida por un estafador, o su cuenta ha sido hackeada.",
          imagen: { src: "/bootcamp/mod11-lec4/random-text-message-scams-360x341.png", alt: "Ignora los DMs aleatorios" },
        },
        {
          titulo: "6. Verifica siempre la dirección del sitio web",
          texto: "Al visitar un sitio web relacionado con cripto, siempre verifica dos veces la dirección del sitio web (URL) antes de ingresar tu información. Si no estás familiarizado con el sitio de una criptomoneda, obtén la URL de una fuente oficial como la cuenta oficial de Twitter de la criptomoneda. También puedes usar sitios de seguimiento de precios conocidos como CoinMarketCap o CoinGecko. Siempre verifica la ortografía de las URLs en cualquier enlace antes de hacer clic.",
          imagen: { src: "/bootcamp/mod11-lec4/website-url-360x360.png", alt: "Verifica la dirección del sitio web" },
        },
        {
          titulo: "7. Descarga apps solo de plataformas oficiales",
          texto: "Al usar apps móviles cripto, descarga solo desde plataformas de distribución de apps móviles oficiales, también conocidas como «tiendas de apps». Para dispositivos iOS, esto sería la App Store de Apple. Para dispositivos Android, sería Google Play Store. Si te piden descargar una app fuera de estas tiendas, lo que se conoce como «sideloading», te recomiendo encarecidamente no hacerlo, ya que estas apps NO han sido revisadas por Apple o Google.",
          imagen: { src: "/bootcamp/mod11-lec4/app-stores-360x217.png", alt: "Descarga apps solo de tiendas oficiales" },
        },
        {
          titulo: "8. Evita todo lo que tenga «promesas» o «garantías»",
          texto: "Si alguien «promete» altos retornos, es una estafa. Y si los «garantiza», también es una estafa. Las inversiones legítimas que pueden garantizar altos retornos sin riesgo no existen. Mejor intenta encontrar una olla de oro al final de un arcoíris. ¿Ves testimonios brillantes o historias de éxito maravillosas? Probablemente son falsas. Si algo suena demasiado bueno para ser verdad, lo es.",
          imagen: { src: "/bootcamp/mod11-lec4/pot-of-gold-360x360.png", alt: "Promesas de ganancias garantizadas son estafas" },
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo12 = [
    {
      id: "crypto-12-1",
      titulo: "¿Qué es Ethereum?",
      resumen: "Ethereum es una plataforma de cómputo basada en blockchain donde los desarrolladores pueden escribir código y crear aplicaciones. Aprende qué es Ethereum y cómo se diferencia de Bitcoin.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-ethereum",
      contenido: [
        {
          titulo: "El origen del nombre",
          texto: "Si «Ethereum» suena como un concepto de ciencia ficción, es porque en cierta manera lo es. El nombre Ethereum se originó de «ether», un término hipotético que describía un medio invisible que llena todo el espacio y transporta y distribuye la luz. El ether en realidad no existe, pero al fundador le gustó el nombre genial Y la idea de un medio subyacente e invisible para cada aplicación.",
        },
        {
          titulo: "Un ordenador global",
          texto: "Para decirlo de forma simple, Ethereum permite que las aplicaciones se ejecuten sobre una red distribuida de computadoras que actúa como una especie de «computadora global».",
          imagen: { src: "/bootcamp/mod12-lec1/global-computer-360x360.png", alt: "Computadora global de Ethereum" },
        },
        {
          titulo: "¿Qué es una blockchain?",
          texto: "Una blockchain es una base de datos pública que almacena información en grupos conocidos como «bloques». Los bloques están organizados en cadenas para que el público sepa qué transacciones llegaron primero. Solo una red dedicada (pero distribuida) de computadoras puede agregar nuevos bloques de transacciones, usando criptografía para asegurarse de que las transacciones sean legítimas. El uso de criptografía hace que la cadena sea segura e inmutable, lo que básicamente significa que nadie puede cambiar el registro de transacciones en la blockchain. La naturaleza distribuida de las computadoras que construyen la blockchain permite que el libro contable sea descentralizado: ninguna autoridad única puede hacer cambios en la blockchain.",
        },
        {
          titulo: "Bitcoin como ejemplo de blockchain",
          texto: "Para entender cómo funciona la blockchain, veamos su ejemplo real más antiguo: Bitcoin. Bitcoin es ampliamente conocido como una moneda digital que permite a las personas enviar y recibir fondos a nivel global, sin depender de instituciones financieras o intermediarios. En lugar de que los bancos lleven el registro de transacciones en sus propios libros, estas transacciones se registran en la blockchain. Dado que la blockchain es un libro contable distribuido almacenado en una vasta red de computadoras, es prácticamente imposible que los datos se pierdan si los servidores fallan o sean manipulados por hackers.",
        },
        {
          titulo: "¿Qué es Ethereum?",
          texto: "En el caso de Ethereum, el «fuego» es la tecnología blockchain. Bitcoin representa el primer caso de uso de las blockchains. Pero entonces alguien llamado Vitalik se despertó y pensó: «¿Qué pasaría si ajustáramos el software de la blockchain para hacer más que solo transferir valor? ¿Qué pasaría si creáramos una computadora global?» Esto es esencialmente lo que hace Ethereum. No solo puede rastrear y transferir valor usando tecnología blockchain como Bitcoin, sino que también puede ejecutar programas de computadora. En lugar de ser un poni de un solo truco como Bitcoin, Ethereum es una plataforma de cómputo que permite a los desarrolladores construir sus propias aplicaciones con propósitos específicos.",
        },
        {
          titulo: "La Máquina Virtual de Ethereum (EVM)",
          texto: "Con la Máquina Virtual de Ethereum (EVM), Ethereum puede ejecutar programas llamados «contratos inteligentes». Una «máquina virtual» es un software que se comporta como una computadora física real que puede ejecutar programas y desplegar aplicaciones. Básicamente es un programa de software en una computadora que funciona como si fuera una computadora separada dentro de la computadora principal. Ethereum va más allá de las capacidades originales de Bitcoin en que puede soportar y ejecutar contratos inteligentes programables.",
        },
        {
          titulo: "Contratos inteligentes y dApps",
          texto: "Los contratos inteligentes son acuerdos escritos en código que tienen instrucciones predeterminadas que pueden ejecutarse tan pronto como se cumplan y verifiquen condiciones específicas. Al escribir estos programas («contratos inteligentes»), los desarrolladores pueden crear todo tipo de programas llamados aplicaciones descentralizadas o «dApps». Las finanzas descentralizadas (DeFi), por ejemplo, usan dApps basadas en contratos inteligentes que ejecutan transferencias entre pares, financiamiento, préstamos, endeudamiento y otras actividades financieras.",
        },
        {
          titulo: "Ethereum: máquina de estado distribuida",
          texto: "A diferencia de Bitcoin, la blockchain de Ethereum contiene más que solo historial de transacciones. Cuando se ejecutan nuevos contratos, el «estado» de la máquina cambia a un nuevo «estado» que contiene nuevos saldos de cuentas, activos transformados u otros datos. Este nuevo «estado» de la máquina es registrado por una red distribuida de máquinas participantes (nodos) que luego actualizan sus propios «estados». Por eso Bitcoin suele llamarse un libro contable distribuido, mientras que Ethereum se compara más frecuentemente con una máquina de estado distribuida.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-12-2",
      titulo: "¿Quién creó Ethereum?",
      resumen: "Aprende sobre la historia de Ethereum y el equipo detrás de su creación.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/who-created-ethereum",
      contenido: [
        {
          titulo: "Vitalik Buterin: el adolescente que cambió el cripto",
          texto: "Imagina esto: es 2013, y mientras la mayoría de los jóvenes de 19 años están decidiendo sus carreras universitarias, Vitalik Buterin está inventando casualmente una nueva plataforma blockchain. Después de frecuentar los círculos de Bitcoin (cofundó Bitcoin Magazine), Vitalik propuso a los desarrolladores de Bitcoin agregar más funcionalidades a su blockchain. Cuando básicamente dijeron «no, gracias», Vitalik hizo el clásico movimiento de adolescente: «Bien, voy a construir mi propia blockchain con contratos inteligentes y aplicaciones descentralizadas.» Vitalik nombró su creación «Ethereum» después de navegar por Wikipedia buscando elementos de ciencia ficción. Le gustó que contuviera la palabra «ether», que sonaba apropiadamente misterioso para su gran visión de una «computadora mundial».",
          imagen: { src: "/bootcamp/mod12-lec2/vitalik-buterin-360x320.png", alt: "Vitalik Buterin, fundador de Ethereum" },
        },
        {
          titulo: "Los cofundadores",
          texto: "Ethereum no sería un trabajo de un solo hombre. En verdadero estilo geek, Vitalik reclutó al resto de los «primeros cinco» cofundadores:",
          puntos: [
            "Mihai Alisie, quien también cofundó Bitcoin Magazine.",
            "Anthony Di Iorio, quien fundó el Toronto Bitcoin Meetup Group (TBMG), donde conoció a Vitalik Buterin. Actualmente es fundador y CEO de Decentral Inc.",
            "Amir Chetrit, quien trabajó en el proyecto Colored Coins donde conoció a Buterin.",
            "Charles Hoskinson, quien creó contenido para The Bitcoin Education Project y el TBMG. Es el fundador de Cardano.",
          ],
        },
        {
          titulo: "El equipo se amplía a ocho",
          texto: "El equipo fundador se expandió rápidamente a ocho para incluir algunos jugadores clave:",
          puntos: [
            "Gavin Wood, científico informático que se puso en contacto con Buterin después de leer el whitepaper de Ethereum. También fundó la Web3 Foundation y Polkadot.",
            "Jeffrey Wilcke, desarrollador principal de Mastercoin, uno de los proyectos que inspiró la red Ethereum. Actualmente cofundador de Grid Games.",
            "Joseph Lubin, CEO y cofundador de ConsenSys, la empresa de software de Ethereum más conocida por la billetera MetaMask.",
          ],
        },
        {
          titulo: "El aporte de Gavin Wood",
          texto: "El equipo tuvo la suerte de contar con el Dr. Gavin Wood, quien no solo ayudó a Buterin con su código en C++, sino que también fue responsable de cambiar la visión del proyecto de «dinero programable movido por contratos» a una plataforma de cómputo de propósito más general. También conceptualizó Solidity, el lenguaje de programación real que ejecuta Ethereum. Gracias a Solidity, los desarrolladores pueden crear dApps, diseñar contratos inteligentes y lanzar Ofertas Iniciales de Monedas (ICOs) en Ethereum.",
        },
        {
          titulo: "Lanzamiento oficial y recaudación de fondos (2014)",
          texto: "En enero de 2014, presentaron oficialmente Ethereum en una conferencia de Bitcoin en Miami. Para financiar el proyecto, establecieron una empresa suiza y una fundación sin fines de lucro, y lanzaron una de las primeras grandes preventas del cripto en julio y agosto de 2014. El discurso fue básicamente: «Danos tu Bitcoin, y te daremos tokens para una red que aún no existe.» Sorprendentemente, esto funcionó espectacularmente: recaudaron más de 31,000 BTC (alrededor de $18 millones en ese momento) y vendieron 60 millones de ETH. ¡Y esto fue antes de que la red siquiera se lanzara!",
        },
        {
          titulo: "¡Está vivo! La red Ethereum se lanza (2015)",
          texto: "Después de mucha programación, pruebas y probablemente una cantidad insalubre de cafeína, la primera versión pública de Ethereum, apodada «Frontier», se puso en marcha el 30 de julio de 2015. El Bloque 0 (el Bloque Génesis) fue minado, ¡y el gran experimento comenzó! Las personas podían minar ether y desplegar contratos inteligentes reales en una blockchain en vivo.",
        },
        {
          titulo: "El desastre del DAO (2016)",
          texto: "En 2016, Ethereum enfrentó su primera crisis existencial. La comunidad creó «The DAO», un fondo de capital de riesgo descentralizado que recaudó $150 millones en ETH. En junio de 2016, un hacker explotó una vulnerabilidad de código y extrajo alrededor de $50 millones en ETH. Después de intensos debates, la comunidad votó por realizar una bifurcación dura (hard fork) de la blockchain para revertir el robo, lo que creó drama de proporciones de telenovela: la mayoría se mudó a la nueva versión (ahora Ethereum ETH), mientras que una minoría de puristas se quedó con la cadena original que incluía el robo (Ethereum Classic).",
        },
        {
          titulo: "Los CryptoKitties y la congestión de la red (2017-2018)",
          texto: "2017 fue el año de despegue de Ethereum gracias al frenesí de las ICOs. La plataforma se convirtió en el centro de las ICOs, con cientos de proyectos recaudando millones en ETH. El punto álgido de esta locura fueron los CryptoKitties, gatos digitales que podías coleccionar y criar en la blockchain. Cuando estas mascotas virtuales se lanzaron en diciembre de 2017, se volvieron tan populares que casi colapsaron toda la red Ethereum. Sí, los gatos de dibujos animados casi derribaron una plataforma financiera de miles de millones de dólares.",
        },
        {
          titulo: "El largo camino hacia Ethereum 2.0 (2018-2021)",
          texto: "Los desarrolladores de Ethereum reconocieron los problemas de escalabilidad y comenzaron a trabajar en un gran plan conocido como «Ethereum 2.0». Los dos objetivos principales eran cambiar de la minería de prueba de trabajo (PoW) que consume mucha energía a la validación más eficiente de prueba de participación, e implementar la fragmentación (sharding) para procesar más transacciones en paralelo. En diciembre de 2020, Ethereum lanzó la Beacon Chain, una blockchain separada que corría junto a la red principal para probar la prueba de participación.",
        },
        {
          titulo: "\"La Fusión\" (The Merge) (2022)",
          texto: "Después de innumerables retrasos, Ethereum finalmente experimentó «La Fusión» el 15 de septiembre de 2022. Esto fue cirugía blockchain en su máxima expresión: ¡cambiar el mecanismo de consenso de prueba de trabajo a prueba de participación manteniendo al paciente con vida! El impacto ambiental fue enorme: el consumo de energía de Ethereum cayó más del 99% ya que ya no necesitaba enormes granjas de GPU minando todo el día.",
        },
        {
          titulo: "La vida después de La Fusión (2023 al presente)",
          texto: "En abril de 2023, Ethereum lanzó la actualización Shanghai (también llamada Shapella), que finalmente permitió a los apostadores retirar su ETH. Más recientemente, Ethereum se ha centrado en hacer la red más escalable y eficiente. La actualización Dencun en marzo de 2024 introdujo el proto-danksharding, que hace que las soluciones de Capa 2 como los rollups sean más baratas y efectivas. Desde un whitepaper escrito por un adolescente hasta una blockchain global y programable con un ecosistema valorado en cientos de miles de millones, el viaje de Ethereum ha sido cualquier cosa menos aburrido.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-12-3",
      titulo: "¿Qué es un contrato inteligente?",
      resumen: "Ethereum es conocido como una plataforma de contratos inteligentes. Pero, ¿qué diablos es un contrato inteligente?",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-smart-contract",
      contenido: [
        {
          titulo: "Ethereum como plataforma de contratos inteligentes",
          texto: "Ethereum es conocido como una «plataforma de contratos inteligentes». Una plataforma (o plataforma de cómputo) es un entorno operativo en el que un software, como programas o aplicaciones, puede ejecutarse. Pero, ¿qué diablos es un contrato inteligente? Los contratos inteligentes son programas de computadora automatizados que se alojan y ejecutan en una blockchain.",
          imagen: { src: "/bootcamp/mod12-lec3/smart-contract-code.png", alt: "Código de contrato inteligente" },
        },
        {
          titulo: "La analogía de la máquina expendedora",
          texto: "A pesar de su nombre, los «contratos inteligentes» no son necesariamente inteligentes ni legalmente vinculantes. Nick Szabo, quien acuñó el término a finales de los años 90, comparó los contratos inteligentes con una máquina expendedora. Los usuarios insertan monedas en la máquina y, asumiendo que la cantidad insertada es correcta, la máquina «se auto-ejecuta» y entrega los bienes solicitados. Nadie más estuvo involucrado, solo tú y la máquina expendedora. La interacción requiere poca o ninguna confianza: la máquina expendedora no tiene otra opción que entregar los bienes al recibir el dinero.",
          imagen: { src: "/bootcamp/mod12-lec3/smart-contract-vending-machine-exanoke.png", alt: "Contrato inteligente como máquina expendedora" },
        },
        {
          titulo: "Qué hace un contrato inteligente",
          texto: "Ahora imagina escribir acuerdos que tengan términos tan claros y predecibles como una máquina expendedora y luego usar tecnología blockchain para implementar automáticamente los términos de un acuerdo entre partes. Eso es lo que hace un contrato inteligente. En Ethereum, los contratos inteligentes son bits de instrucciones codificadas enviadas a la blockchain para que los participantes de la red puedan hacer cumplir y almacenar estos contratos de manera segura y sin necesidad de confianza. En términos más técnicos, un contrato inteligente es una colección de código y datos que reside en una dirección específica en la blockchain de Ethereum. Los contratos inteligentes también son deterministas, de modo que quienes participan en el contrato saben qué resultados esperar cuando el contrato se ejecute.",
        },
        {
          titulo: "¿Qué es la EVM?",
          texto: "Si los contratos inteligentes son instrucciones escritas en código, es la Máquina Virtual de Ethereum (EVM) la que los ejecuta en la blockchain de Ethereum. Una «máquina virtual» es un software que se comporta como una computadora física real que puede ejecutar programas y desplegar aplicaciones. Básicamente es un programa de software en una computadora física que funciona como si fuera una computadora separada dentro de la computadora principal.",
          imagen: { src: "/bootcamp/mod12-lec3/evm-360x360.png", alt: "Máquina Virtual de Ethereum (EVM)" },
        },
        {
          titulo: "Por qué se necesita la EVM",
          texto: "Dado que no todos los nodos de Ethereum (que son solo computadoras) usan el mismo hardware, sistema operativo y otras configuraciones, necesitas una forma de «abstraer» todo esto para que el código del contrato inteligente simplemente se ejecute sin tener que lidiar con todos los diferentes tipos de configuraciones de computadora. Los contratos inteligentes no quieren lidiar con todo este drama: quieren ser agnósticos al dispositivo y al sistema operativo. Aquí es donde entra la EVM. Proporciona un entorno de ejecución para los contratos inteligentes, lo que significa que un contrato inteligente puede ejecutarse en cualquier entorno. Los desarrolladores pueden escribir un contrato inteligente y estar seguros de que seguirá el estándar de la industria: «Escribe una vez, ejecuta en cualquier lugar».",
        },
        {
          titulo: "Turing-completa: cualquier aplicación es posible",
          texto: "Dado que el propósito de la EVM es ser el motor de cómputo integrado en todos los nodos completos de Ethereum, es Turing-completa. En términos informáticos, «Turing-completa» significa que la EVM puede teóricamente calcular cualquier cosa que puedas pensar en calcular. Entonces, en teoría, ¡CUALQUIER aplicación de computadora puede programarse y ejecutarse en la plataforma Ethereum! Los contratos inteligentes se escriben en código usando lenguajes de programación de alto nivel como Solidity, Vyper o Serpent. Este código se compila a algo llamado «bytecode» por la EVM, que luego se despliega en la blockchain de Ethereum.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-12-4",
      titulo: "¿Qué es una aplicación descentralizada (dApp)?",
      resumen: "¿Qué es una aplicación descentralizada (dApp)? ¿Qué la hace especial?",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-decentralized-app-dapp",
      contenido: [
        {
          titulo: "dApps: más allá de los contratos inteligentes",
          texto: "Ethereum es una plataforma de cómputo que te permite crear y ejecutar contratos inteligentes. La mayoría de los desarrolladores que crean contratos inteligentes lo hacen como parte de una aplicación descentralizada o «dApp» que están construyendo.",
          imagen: { src: "/bootcamp/mod12-lec4/dapp-frontend-360x360.png", alt: "Frontend de una dApp" },
        },
        {
          titulo: "¿Qué es una dApp?",
          texto: "Una aplicación descentralizada, también conocida como «dApp», «Dapp» o «dapp», es una aplicación de software que opera de forma autónoma usando contratos inteligentes. Las «dApps» son bastante similares a las aplicaciones web o móviles, excepto que las dApps están construidas usando contratos inteligentes y se ejecutan en una blockchain. En el sentido más simple, una dApp es un contrato inteligente y una interfaz de usuario web (UI). Combina una interfaz de usuario frontal que se parece a tu aplicación móvil o web de siempre con la funcionalidad de contratos inteligentes ejecutándose en el backend.",
        },
        {
          titulo: "Ventajas de las dApps",
          texto: "Las dApps permiten que dos partes realicen una transacción o acuerdo en código sin necesitar un intermediario o autoridad central. Simplemente pueden confiar en el código para asegurarse de que el contrato se cumpla. Las dApps también son de código abierto, lo que significa que el código fuente está disponible para que cualquiera lo vea. Esto hace que las dApps sean más fáciles de confiar ya que el código fuente puede ser inspeccionado y cualquier intención maliciosa puede (teóricamente) detectarse. Las dApps también son resistentes a la censura: los gobiernos o grandes corporaciones no tienen forma de bloquear ningún contenido o prohibir usuarios.",
        },
        {
          titulo: "Difíciles de desconectar",
          texto: "Uno de los grandes beneficios de las dApps es que son difíciles de poner fuera de línea. Las dApps se ejecutan en una red de computadoras descentralizadas (que podrían ser cientos o miles dependiendo de la blockchain) en todo el mundo. Incluso si algunas (o algunos cientos) se desconectan, el resto de la red sigue ejecutando la blockchain para garantizar virtualmente cero tiempo de inactividad.",
          imagen: { src: "/bootcamp/mod12-lec4/decentralized-app.png", alt: "Aplicación descentralizada en red global" },
        },
        {
          titulo: "Desventajas de las dApps",
          texto: "Vale la pena señalar que todavía hay algunas desventajas en las dApps, particularmente del lado de los desarrolladores. Debido a que el código y los datos publicados en la blockchain son más difíciles de modificar, puede ser un desafío adicional para los desarrolladores hacer actualizaciones en las dApps una vez desplegadas. Esto significa que corregir errores o introducir nuevas características puede ser complicado. Además, los beneficios de ejecutarse en la red Ethereum (seguridad, transparencia, descentralización y confiabilidad) vienen con un alto costo de procesamiento. Estos compromisos hacen que sea difícil para las dApps escalar.",
        },
        {
          titulo: "Ejemplo de dApp: Uniswap",
          texto: "Para tener una mejor idea de cómo funcionan las dApps en el mundo real, veamos Uniswap como ejemplo. Construida en la blockchain de Ethereum, Uniswap es un exchange descentralizado (DEX). Proporciona una aplicación que permite a los usuarios intercambiar o «hacer swap» de activos cripto fácilmente.",
          imagen: { src: "/bootcamp/mod12-lec4/uniswap-ui-780x505.png", alt: "Interfaz de usuario de Uniswap" },
        },
        {
          titulo: "Cómo funciona Uniswap",
          texto: "A diferencia de los exchanges tradicionales que usan libros de órdenes centralizados para gestionar la liquidez y establecer precios, el DEX de Uniswap funciona con tecnología AMM (creador de mercado automatizado), que es simplemente un contrato inteligente que depende de un pool de liquidez en lugar de un libro de órdenes. Uniswap no posee ninguno de los activos cripto en el exchange ni toma el lado opuesto de las operaciones. En cambio, las operaciones ocurren entre tú y un contrato inteligente. Otros usuarios depositan sus activos cripto para proporcionar liquidez y son compensados con una parte de la tarifa de trading. Dado que el DEX de Uniswap funciona con software de código abierto, los usuarios pueden verificar el código fuente. El protocolo es público y sin permisos, lo que significa que cualquiera puede usar la dApp si quiere comprar o vender activos cripto.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-12-5",
      titulo: "¿Qué es el ether (ETH)?",
      resumen: "Aprende qué es el ether (ETH) y cómo se usa esta criptomoneda en la red Ethereum.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-ether",
      contenido: [
        {
          titulo: "El ether: la moneda de Ethereum",
          texto: "El ether (ETH) es la moneda integrada utilizada en la red Ethereum. Al igual que el bitcoin (BTC), puede verse como un activo digital usado para almacenar y/o transferir valor en la blockchain. Pero el principal caso de uso del ether es facilitar el cómputo de contratos inteligentes y aplicaciones descentralizadas (dApps) en la red Ethereum. Cualquier persona que desee construir software en Ethereum debe pagar por el poder de cómputo con ether (ETH).",
          imagen: { src: "/bootcamp/mod12-lec5/ether.png", alt: "Ether (ETH)" },
        },
        {
          titulo: "El problema de la detención y las tarifas de transacción",
          texto: "Esto fue diseñado para resolver uno de los mayores problemas de una máquina Turing-completa: el problema de la detención. Si una aplicación está programada para ejecutarse en un bucle infinito, esa aplicación se ejecutará para siempre. Para desincentivar a los actores maliciosos de ejecutar código con bucles infinitos o saturar la red con contratos que requieren mucho cómputo, Ethereum impone tarifas de transacción (pagadas en ETH) para ejecutar contratos inteligentes. Es como la gasolina en un auto de carreras: sin gasolina, el auto no arranca.",
        },
        {
          titulo: "¿Qué es el gas?",
          texto: "El término «gas» fue creado para diferenciar entre el valor del ether (ETH) y el costo computacional de usar la máquina virtual de Ethereum (EVM). El gas es la forma en que la red Ethereum mide el esfuerzo computacional requerido para ejecutar transacciones. Se llama gas porque, de manera similar a como los automóviles necesitan gasolina para funcionar, la red Ethereum necesita gas para seguir operando. Por ejemplo, enviar 1 ETH de una persona a otra puede requerir 21,000 unidades de gas. Transacciones más complejas, como acuñar un NFT, podrían demandar 2,000,000 de gas o más.",
          imagen: { src: "/bootcamp/mod12-lec5/ethereum-gas.png", alt: "Gas de Ethereum" },
        },
        {
          titulo: "El precio del gas y el gwei",
          texto: "El gas no es tu tarifa de transacción en sí mismo; es una unidad usada para medir el esfuerzo computacional necesario. El precio de 1 unidad de gas sube cuando la red de Ethereum está ocupada y baja en horas de menor actividad. El gas se precio en ETH. Si una unidad de gas cuesta 0.000000015 ETH, tu transacción que requiere 21,000 unidades necesitaría al menos 0.000315 ETH. Con tantos decimales, se usa el gwei (giga-wei). El gwei representa una fracción de 1 ETH: 1 Gwei = 0.000000001 ETH. Entonces, en lugar de decir que el precio del gas es 0.000000015 ETH, puedes simplemente decir que el precio del gas es 15 Gwei.",
        },
        {
          titulo: "¿Cómo se calcula la tarifa de gas?",
          texto: "La tarifa de transacción no solo involucra el gas y los precios del gas. También incluye la TARIFA BASE, que es el precio requerido para poner una unidad de gas en el bloque de Ethereum. La tarifa base puede aumentar hasta un 12.5% por bloque si las transacciones del bloque anterior usaron más gas del que el tamaño objetivo del bloque permite. Además, para incentivar a los mineros a procesar tu transacción, puedes agregar una TARIFA DE PRIORIDAD (o PROPINA) por unidad de gas. La fórmula mínima de tarifa de transacción es: Tarifa de Tx = (unidades de gas que requiere la transacción) x (precio del gas igual al menos a la tarifa base + propina).",
        },
        {
          titulo: "Límite de gas y tarifa máxima",
          texto: "Para protegerte de gastar más de tu presupuesto, los usuarios suelen agregar un límite de gas a su transacción. El «Límite de Gas» es el número máximo de unidades de gas que estás dispuesto a pagar para ejecutar tu transacción. Alternativamente, los usuarios tienen la opción de establecer un LÍMITE DE TARIFA MÁXIMA para decirle a la red el máximo de gwei que estás dispuesto a gastar. Si una transacción alcanza su Límite de Gas o Máximo y «se queda sin gas» antes de ejecutarse, la transacción fallará y perderás el gas que los mineros ya consumieron. La fórmula con Límites de Gas es: Tarifa de Tx = (Límite de Gas) x (Tarifa Base + Propina).",
        },
        {
          titulo: "Resumen de conceptos de gas",
          puntos: [
            "Gas: Unidad de medida para el esfuerzo computacional necesario para ejecutar tu transacción y registrarla en la blockchain de Ethereum.",
            "Tarifa base/de bloque: La cantidad mínima de gas requerida para incluir la transacción en el último bloque de Ethereum. Las tarifas base se «queman» al final de cada transacción.",
            "Gwei: Abreviatura de gigawei. 1 Gwei = 0.000000001 ETH.",
            "Precio del gas: El número de gwei que estás dispuesto a pagar por una unidad de gas.",
            "Límite de gas: El número máximo de unidades de gas que estás dispuesto a pagar para ejecutar tu transacción.",
            "Tarifa máxima: El costo máximo (en gwei) que estás dispuesto a gastar en tu transacción.",
            "Tarifa de prioridad/propina: Una tarifa adicional que pagas a los mineros para incluir/priorizar tu transacción en la blockchain.",
            "Quema de gas: Cuando los usuarios pagan sus transacciones, su tarifa base de gas se destruye (eliminada permanentemente de circulación) por el protocolo.",
            "Fórmula de tarifa de transacción: (Límite de Gas) x (Tarifa Base + Propina).",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-12-6",
      titulo: "¿Por qué tiene valor el ETH?",
      resumen: "El ether tiene valor porque la gente cree que lo tiene. Aquí hay algunas razones por las que.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/why-does-ether-have-value",
      contenido: [
        {
          titulo: "¿Por qué tiene valor el ether?",
          texto: "En la lección anterior vimos qué es el ether y cómo se usa en Ethereum. Aprendiste que el ether se usa para pagar los recursos computacionales y las tarifas de transacción de cualquier transacción ejecutada en la red Ethereum. La siguiente pregunta es: ¿Por qué tiene valor el ether (ETH)?",
          imagen: { src: "/bootcamp/mod12-lec6/love-eth.png", alt: "Por qué tiene valor el ETH" },
        },
        {
          titulo: "Utilidad",
          texto: "Como con la mayoría de los activos, el valor suele basarse en si es útil o no. Al igual que la plata tiene valor práctico como semiconductor o componente electrónico, el ether tiene tanto utilidad práctica como valor intrínseco. La función principal del ether (ETH) es servir como gas para la red Ethereum. Cada operación que ocurre en Ethereum, ya sea una transacción o ejecución de un contrato inteligente, requiere cierta cantidad de gas. Además, el ether puede usarse para transferir fondos y poner precio a activos digitales en la blockchain de Ethereum. Puede prestarse y tomarse prestado, y también es aceptado como pago por algunos comerciantes. Sus propiedades únicas de ser resistente a la censura, sin permisos y pseudónimo añaden a su atractivo.",
        },
        {
          titulo: "Efecto de red",
          texto: "Si el valor del ether sube o baja puede depender de cuántas personas usen Ethereum. Aquí es donde entran las dApps, ya que ofrecen más formas de usar la blockchain de Ethereum más allá de las simples transacciones financieras. Cuanto más características innovadoras generen las dApps, mayor será el potencial de adopción masiva. Ethereum ya está siendo utilizado por traders de cripto, jugadores, coleccionistas de arte digital, creadores de contenido y más. A medida que la base de usuarios de Ethereum crece, las dinámicas de oferta y demanda también entran en juego para afectar el valor del ether.",
        },
        {
          titulo: "Tokenomics",
          texto: "La tokenomics es un término para todos los factores que intervienen en el valor de un token, como la oferta y la demanda, la tasa de inflación/deflación, la mecánica de distribución, la capitalización de mercado, etc. Ethereum comenzó con un bloque génesis pre-minado de 72 millones de ETH, que se distribuyó a los primeros contribuyentes, inversores y la Fundación Ethereum en 2015. Desde entonces, los mineros eran recompensados con 2 ETH por bloque, sumando una recompensa diaria de 13,500 ETH o aproximadamente 4.9 millones de ETH cada año.",
          imagen: { src: "/bootcamp/mod12-lec6/ethereum-tokenomics.png", alt: "Tokenomics de Ethereum" },
        },
        {
          titulo: "EIP 1559: mecanismo deflacionario",
          texto: "EIP 1559 dividió las tarifas en una tarifa base fija y una pequeña tarifa de prioridad. Esto permite estabilizar los costos de transacción para que no se disparen durante los períodos de mayor actividad. Además, EIP 1559 también quema la misma tarifa base, eliminando efectivamente esa cantidad de ETH de circulación. En resumen, EIP 1559 introdujo un mecanismo deflacionario en la red.",
        },
        {
          titulo: "Staking",
          texto: "Gracias a la aparición del mecanismo de consenso de Prueba de Participación (PoS), la red puede beneficiarse de la velocidad y eficiencia mientras los usuarios disfrutan de tarifas más bajas y una nueva fuente de ingresos. El staking ofrece una forma más accesible de ganar ingresos pasivos del mantenimiento de la blockchain. Simplemente requiere bloquear tokens en una billetera o pool para apoyar una red durante un período específico de tiempo, obteniendo retornos anuales conocidos como APR (tasa de porcentaje anual). Esto es similar a ganar intereses al depositar dinero en una cuenta bancaria, excepto que las recompensas potenciales son mucho mayores.",
        },
        {
          titulo: "Cómo funciona el staking",
          texto: "El staking también permite a los usuarios participar en la gobernanza de la blockchain. Cada vez que un bloque necesita ser verificado, la red asignará la tarea a validadores aleatoriamente. La probabilidad de que se seleccione un validador depende de cuánto han apostado y por cuánto tiempo han tenido los fondos bloqueados. Si el validador valida exitosamente el bloque asignado, gana la recompensa de staking. Si el validador aprueba una transacción fraudulenta, podría ser penalizado con el «slashing» (quema de una parte de sus tokens). El staking ayuda a asegurar la blockchain ya que los tokens apostados funcionan como garantía contra el mal comportamiento.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-12-7",
      titulo: "¿Qué factores influyen en el precio del ether?",
      resumen: "Aprende qué factores influyen en el precio del ether y generan sentimiento alcista o bajista.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-influences-ether-price",
      contenido: [
        {
          titulo: "Oferta y demanda: el motor del precio",
          texto: "En última instancia, el precio del ether se reduce a la oferta y la demanda. Si la oferta de ETH disminuye o la demanda de ETH aumenta, su precio subirá. Si la oferta de ETH aumenta o la demanda de ETH disminuye, su precio caerá. Desde 2015, el ether se ha convertido en un gran protagonista del mundo cripto, no solo como criptomoneda, sino como toda una plataforma donde las personas construyen apps, productos financieros (DeFi) y esas colecciones digitales con las que todos estaban obsesionados (NFTs). La oferta y demanda del ether se ven afectadas por múltiples factores, incluyendo factores específicos de Ethereum y factores más generales que van desde el mercado cripto hasta las condiciones financieras globales.",
        },
        {
          titulo: "Eventos históricos que movieron el precio",
          texto: "La historia nos muestra cómo ciertos eventos causaron grandes movimientos de precio:",
          puntos: [
            "El boom DeFi (2020-2021): Cuando las apps de finanzas descentralizadas explotaron en popularidad, los precios de ETH aumentaron ya que las personas lo necesitaban para usar estas apps.",
            "La fiebre de las NFTs (2021): Cuando el coleccionismo de arte digital se volvió popular, ETH era a menudo la moneda de elección.",
            "La Fusión (septiembre de 2022): Cuando Ethereum cambió a un sistema más eficiente energéticamente, la confianza de los inversores recibió un gran impulso.",
          ],
        },
        {
          titulo: "Actualizaciones del protocolo",
          texto: "Piensa en Ethereum como un software que recibe actualizaciones regulares, igual que tu teléfono. Estas actualizaciones (llamadas actualizaciones de protocolo) buscan hacer la red más rápida, segura y capaz, y suelen afectar el precio de ETH. Actualizaciones importantes como el London Hard Fork (agosto de 2021), que «quemó» una porción de las tarifas de transacción reduciendo la oferta total de ETH, y La Fusión (septiembre de 2022), que aumentó significativamente la confianza de los inversores, son ejemplos de cómo las actualizaciones impactan el precio. La historia muestra que las actualizaciones importantes suelen beneficiar el precio de ETH a largo plazo, aunque las reacciones a corto plazo pueden ser impredecibles.",
        },
        {
          titulo: "¿Qué tan de cerca sigue el ether los movimientos de precio de Bitcoin?",
          texto: "El ether y Bitcoin son como hermanos: no siempre se llevan bien, pero definitivamente se influyen mutuamente. Durante años, cuando el precio de Bitcoin se movía, Ethereum generalmente lo seguía, a veces con oscilaciones aún más dramáticas. El ether típicamente muestra una «beta» más alta en comparación con Bitcoin: cuando Bitcoin gana un 10%, ETH podría ganar un 15%, pero cuando BTC cae un 10%, ETH podría caer un 15%. El ratio ETH/BTC (esencialmente cuántos bitcoins podrías comprar con un ether) es una métrica importante que muchos traders siguen.",
        },
        {
          titulo: "Regulaciones gubernamentales",
          texto: "Las regulaciones gubernamentales pueden hacer que los inversores cripto sientan que están en una montaña rusa regulatoria. Las regulaciones más estrictas pueden perjudicar el precio del ETH reduciendo la actividad del mercado. Por el contrario, regulaciones claras y positivas pueden impulsar la confianza de los inversores. Una pregunta regulatoria importante ha sido si Ethereum debería clasificarse como un valor (como las acciones) o como una materia prima (como el oro). Un desarrollo positivo significativo fue la aprobación de la SEC de ETFs de ether al contado (Exchange-Traded Funds) en mayo de 2024, lo que facilita que los inversores tradicionales tengan exposición a ETH.",
        },
        {
          titulo: "Factores económicos globales",
          texto: "Lo que sucede en la economía regular tiene un gran impacto en el ETH también. El ether es un activo negociable y, al igual que cualquier otro activo negociable, los altos niveles de miedo y codicia del mercado pueden hacer que los traders olviden los titulares específicos de Ethereum en un instante. El sentimiento general del mercado suele verse influenciado por cambios en las políticas monetarias y fiscales, eventos geopolíticos y cambios en el rendimiento económico. Los cambios en la política monetaria tienden a ser los mayores movimientos del mercado, ya que las dinámicas de tasas de interés influyen fuertemente en los precios de los activos financieros.",
        },
        {
          titulo: "¿Cómo afecta el staking al precio y la oferta de ETH?",
          texto: "Cuando Ethereum cambió a Prueba de Participación en 2022 (La Fusión), cambió fundamentalmente cómo el nuevo ETH entra en circulación. Cuando el ETH está apostado, se elimina temporalmente de circulación, creando escasez que podría impulsar los precios (asumiendo que la demanda se mantiene igual o aumenta). Los números son impresionantes: más de $111 mil millones en ETH están actualmente apostados (hasta 2024), representando más de 34.7 millones de ETH bloqueados. La Fusión también redujo drásticamente la creación de nuevo ETH en aproximadamente un 87% en comparación con el sistema anterior. Además, una porción de las tarifas de transacción se «quema» (elimina permanentemente de circulación) gracias al mecanismo EIP-1559.",
        },
        {
          titulo: "Consejos prácticos para inversores en ETH",
          puntos: [
            "Mantente informado sobre las actualizaciones tecnológicas: las actualizaciones continuas de Ethereum son cruciales para su valor a largo plazo.",
            "Observa los movimientos de Bitcoin: aunque la relación puede estar debilitándose, Bitcoin aún influye en el mercado cripto más amplio.",
            "Sigue los cambios regulatorios: el panorama regulatorio está en constante evolución. La aprobación de ETFs de Ethereum es un desarrollo significativo a seguir.",
            "Considera la economía global: las condiciones económicas globales como la inflación, las tasas de interés y los eventos geopolíticos pueden impactar significativamente el sentimiento de los inversores.",
            "Analiza los datos de la red: métricas como el volumen de transacciones, la actividad de la red y las cifras de staking pueden proporcionar información sobre la salud y el uso de Ethereum.",
            "Gestiona el riesgo: el mercado cripto es inherentemente volátil. Siempre haz tu tarea, comprende los riesgos e invierte solo lo que puedas permitirte perder.",
          ],
        },
        {
          titulo: "Conclusión",
          texto: "El precio del ether está influenciado por una fascinante mezcla de factores: desde su tecnología subyacente y desarrollo, hasta las tendencias más amplias del mercado, los cambios regulatorios y las condiciones económicas globales. Las criptomonedas siguen siendo una clase de activos emergente y tecnología. La volatilidad del precio del ether es alta y seguirá siendo alta durante años. Gestiona tu riesgo en consecuencia. No uses apalancamiento para operar cripto si eres nuevo en el juego. Mantente actualizado regularmente con los desarrollos de Ethereum.",
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo13 = [
    {
      id: "crypto-13-1",
      titulo: "Introducción al trading de criptomonedas",
      resumen: "¿Estás listo para comenzar tu viaje en el arte del trading cripto?",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/trade-crypto-intro",
      contenido: [
        {
          titulo: "Un mundo de posibilidades (y riesgos)",
          texto: "El mundo del trading cripto es enorme en términos de lo que hay que aprender y de cómo operar realmente. Es un gran ejemplo del dicho famoso: «Hay un millón de maneras de hacer las cosas». Como trader, hay un millón de formas diferentes de gestionar el riesgo y obtener ganancias en los mercados.",
          imagen: { src: "/bootcamp/mod13-lec1/toshi-dead.png", alt: "Introducción al trading cripto" },
        },
        {
          titulo: "El objetivo de este curso",
          texto: "El objetivo de este curso es introducir a quienes son completamente nuevos en el mundo cripto a principios sólidos de trading y mostrar cómo aplicar esos principios para desarrollar estrategias y procesos de trading adecuados a sus propias necesidades individuales. La esperanza es que estos principios te ayuden a aprender y SOBREVIVIR durante esta etapa inicial como trader novato, hasta que descubras qué es lo que mejor te funciona para tener éxito.",
        },
        {
          titulo: "¿Qué es el trading?",
          texto: "¿Qué es el trading? ¿Qué hace un trader? Un trader busca construir riqueza a lo largo del tiempo con activos financieros, ya sea comprando activos para venderlos más tarde a un precio más alto, y/o tomando prestado un activo para venderlo caro y luego recomprarlo más barato para obtener una ganancia. Por simple que suene, operar activamente en los mercados financieros es, sin duda, una de las empresas más difíciles que existen. El comportamiento del mercado cambia constantemente ya que no solo está impulsado por fundamentos como datos económicos o métricas de empresas, sino también por eventos geopolíticos sorpresa y emociones humanas cambiantes.",
          imagen: { src: "/bootcamp/mod13-lec1/crypto-fortune-360x360.png", alt: "No hay bola de cristal en el trading" },
        },
        {
          titulo: "No hay garantías ni sistema perfecto",
          texto: "A menos que tengas una bola de cristal, no hay garantías de un resultado exitoso independientemente de la cantidad de trabajo que pongas. Y definitivamente NO existe ningún sistema de trading que garantice ganancias sin riesgo. También existe el hecho de que cada individuo tiene sus propias limitaciones personales, ya sea falta de tiempo o energía para seguir las dinámicas del mercado, capital limitado, o incapacidad para controlar las emociones al asumir riesgos.",
        },
        {
          titulo: "¿Vale la pena intentarlo?",
          texto: "El consejo financiero más común es que la mayoría de las personas debería limitarse a la inversión pasiva en una cartera diversificada. Dicho esto, hay quienes tienen un fuerte interés o profunda pasión por los mercados financieros y el cripto específicamente. Para ellos, este viaje hacia el trading activo de cripto definitivamente vale la pena considerar. Arriesgar dinero («capital») que estás dispuesto a perder y desarrollar las habilidades adecuadas para gestionar ese capital podría generar retornos superiores a la inversión pasiva. Por supuesto, nunca hay garantías de éxito y siempre existe la posibilidad de perder una gran parte del capital, especialmente en el mercado cripto.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-13-2",
      titulo: "Principios de trading para el trader de cripto",
      resumen: "Para empezar con buen pie en el trading, es importante aprender e interiorizar los principios fundamentales del trading.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/crypto-trading-principles",
      contenido: [
        {
          titulo: "Los 4 principios esenciales",
          texto: "Si eres nuevo en el cripto, para empezar con buen pie en tu viaje de trading, es importante aprender e interiorizar algunos principios importantes. Hay probablemente un millón de principios y «reglas» para el trading exitoso, pero dado que esta es una lección para principiantes, me limitaré a los que considero los 4 principales:",
          puntos: [
            "Conoce el mercado en el que estás operando.",
            "Los mercados son dinámicos y no operan en el vacío.",
            "La gestión del riesgo es la base del trading exitoso.",
            "La psicología influirá en tu rendimiento como trader.",
          ],
        },
        {
          titulo: "1. Conoce el mercado en el que estás operando",
          texto: "Aprende todo lo que puedas sobre el activo en el que vas a arriesgar tu dinero duramente ganado. Increíblemente, hay personas que invierten todos sus ahorros en una acción meme o moneda sin hacer NINGUNA investigación. Lo hacen porque lo vieron promocionado en redes sociales, o su primo que lleva tres meses en cripto dijo que iba a ser lo próximo grande. No sigas ciegamente a tu primo ni a nadie en redes sociales. Seguir a alguien a ciegas significa que no sabes nada sobre lo que es el activo, cómo funciona y cómo se comporta en diferentes condiciones de mercado. Por eso el primer paso para operar o invertir es hacer tu PROPIA INVESTIGACIÓN (DYOR).",
          imagen: { src: "/bootcamp/mod13-lec2/crypto-wild-west-360x360.png", alt: "El cripto es el salvaje oeste digital" },
        },
        {
          titulo: "2. Los mercados son dinámicos y no operan en el vacío",
          texto: "Una de las lecciones más grandes que muchos traders aprenden con la experiencia es cómo los factores exógenos a menudo tienen una fuerte influencia en la acción del precio de un activo, aunque estos factores parezcan no relacionados con el cripto. En muchas situaciones, verás que el precio de un cripto se mueve más con temas amplios del mercado o se ve afectado por eventos inesperados externos al cripto específico que estás siguiendo.",
          imagen: { src: "/bootcamp/mod13-lec2/reckless-crypto-trader-360x360.png", alt: "Trader impulsivo" },
        },
        {
          titulo: "Riesgo encendido vs. riesgo apagado (Risk-On vs. Risk-Off)",
          texto: "El sentimiento de riesgo es un concepto donde los activos financieros generalmente caen en una de dos categorías principales: un activo de «riesgo encendido» (risk-on) o de «riesgo apagado» (risk-off). Los activos «risk-on» son aquellos que típicamente atraen compradores cuando el sentimiento general del mercado es positivo. Las clases de activos que suelen caer en esta categoría son las acciones, materias primas y el cripto. Los activos «risk-off» tienden a atraer compradores cuando el mercado general es negativo o está lleno de miedo. Las clases de activos en esta categoría son típicamente los bonos, el oro y las monedas «refugio seguro» como el dólar estadounidense o el yen japonés.",
        },
        {
          titulo: "Ejemplo: la pandemia de COVID-19",
          texto: "En marzo de 2020, sin titulares específicos del espacio cripto, bitcoin (BTC) cayó más del 60% de más de $10,000 a menos de $4,000, mientras que ether (ETH) cayó casi un 70% de alrededor de $290 a $90. Y no pasó mucho tiempo antes de ver el otro lado del espectro del comportamiento de riesgo, cuando los participantes del mercado se volvieron alcistas en los activos risk-on después de una serie de acciones de apoyo iniciadas por gobiernos y bancos centrales desde abril de 2020, dando inicio a uno de los mayores rallys de la historia financiera.",
          imagen: { src: "/bootcamp/mod13-lec2/bitcoin-crash.png", alt: "Caída de Bitcoin durante COVID-19" },
        },
        {
          titulo: "3. La gestión del riesgo es la base del trading exitoso",
          texto: "Incluso si pones mucho trabajo para crear una idea de trade de alta convicción, el mercado podría ir en tu contra muy rápidamente por razones imprevisibles y/o que no puedes controlar. Esto nos lleva a la habilidad más importante para los traders: la gestión del riesgo y el trade. La gestión del riesgo y el trade son tan importantes, si no más, que las habilidades de análisis de mercado, la selección de trades y apostar en la dirección correcta. La preservación del capital debe ser la primera prioridad de la especulación exitosa en el mercado.",
          imagen: { src: "/bootcamp/mod13-lec2/managing-risk-360x360.png", alt: "Gestión del riesgo en trading cripto" },
        },
        {
          titulo: "Sin gestión del riesgo no sobrevivirás",
          texto: "Sin gestión del riesgo, no llegarás lejos como trader. La clave es entender que, a menos que puedas ver el futuro, ningún trade o inversión puede ser verdaderamente libre de riesgo. Habrá algunos trades que pierdan y eso es parte del juego. Pero si pones el trabajo puedes reducir significativamente tu riesgo inicial, o al menos limitar tu riesgo lo suficiente como para tomar decisiones racionales cuando el mercado te sorprenda con algo inesperado.",
          imagen: { src: "/bootcamp/mod13-lec2/unprofitable-trader-360x360.png", alt: "Trader sin gestión del riesgo" },
        },
        {
          titulo: "Ejemplo de retorno con buena gestión del riesgo",
          texto: "Por ejemplo, supongamos que realizas 10 trades con un riesgo máximo de $100 en cada uno, con un potencial máximo de retorno 3:1. Si ganas 4 trades con un ratio retorno/riesgo de 3:1 y pierdes 6 trades con una pérdida máxima de $100 en cada uno (40% de tasa de aciertos), aún así sales ganando neto con un retorno del 20% en todos tus trades (o una cartera que vale $1,200). Ahora imagina la volatilidad de los activos cripto donde los mercados han llegado a subir 100%–500% o más en poco tiempo. Por supuesto, es bien documentado que caídas del 60%–90% son una parte NORMAL de la historia cripto, lo que nos lleva de vuelta a por qué la gestión del riesgo es una habilidad aún más importante al tomar exposición a activos cripto.",
          imagen: { src: "/bootcamp/mod13-lec2/frustrated-crypto-trader-360x360.png", alt: "Trader frustrado por mala gestión" },
        },
        {
          titulo: "4. La psicología influirá en tu rendimiento como trader",
          texto: "El cuarto principio a entender e interiorizar es que tu estado psicológico será puesto a prueba, y tu capacidad para controlar tus emociones influirá enormemente en tu rendimiento como trader. Cuando hay un elemento de riesgo en lo que estás haciendo, habrá cierto nivel de ansiedad o miedo a la pérdida, que puede crecer exponencialmente a medida que ocurren las pérdidas.",
          imagen: { src: "/bootcamp/mod13-lec2/fearful-trader-360x360.png", alt: "Trader con miedo a las pérdidas" },
        },
        {
          titulo: "Miedo y exceso de confianza: dos enemigos del trader",
          texto: "El miedo puede llevar a decisiones irracionales como abandonar una buena idea de trade sin darle tiempo a desarrollarse, o doblar el riesgo para intentar recuperar las pérdidas. En ese punto, básicamente estás jugando. En el otro extremo del espectro psicológico, estar en medio de un trade con un potencial de recompensa masivo también puede llevar a un exceso de confianza potencialmente dañino. El exceso de confianza después de una gran ganancia podría llevar a cambios negativos en el análisis o en los procesos de gestión del riesgo, como apalancar una posición y/o ignorar un plan de stop loss. Si comprendes completamente el activo cripto y las condiciones generales del mercado, y tienes un plan sólido de gestión del riesgo, reduces significativamente las probabilidades de que tus emociones te lleven a decisiones de trading malas (y potencialmente catastróficas).",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-13-3",
      titulo: "Cómo construir tu propia estrategia de trading cripto",
      resumen: "Aprende un proceso simple para construir una estrategia de trading que incluye cómo analizar el mercado, generar ideas de trade y minimizar el riesgo.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-to-build-your-own-crypto-trading-strategy",
      contenido: [
        {
          titulo: "Una plantilla, no un dogma",
          texto: "Para quienes son completamente nuevos en el trading, compartiré un proceso simple para construir una estrategia de trading que incluye cómo analizar el mercado, generar ideas de trade y hacer apuestas direccionales de bajo riesgo usando los principios que aprendiste en la lección anterior. Esto NO debe tomarse estrictamente como EL proceso a usar, sino más como una plantilla para diseñar tu propio proceso de trading.",
          imagen: { src: "/bootcamp/mod13-lec3/trading-strategy-template-150x150.png", alt: "Plantilla de estrategia de trading" },
        },
        {
          titulo: "¿Qué es este proceso?",
          texto: "El proceso que compartiré puede describirse como una estrategia de trading discrecional enfocada en marcos temporales de mediano a largo plazo. El trading discrecional significa usar tu juicio e intuición como parte del proceso de trading. Lo opuesto al trading discrecional es el «trading automatizado» o «trading mecánico», donde todas las reglas de trading están completamente codificadas y el sistema no requiere discreción.",
        },
        {
          titulo: "Los 4 pasos del proceso",
          puntos: [
            "Usa el análisis fundamental para encontrar activos cripto que sean ideas de trade potenciales para «ir largo» (comprar) o «ir corto» (vender).",
            "Una vez determinado tu sesgo direccional (largo vs. corto), usa el análisis técnico (AT) y la acción del precio (AP) para buscar oportunidades de entrada potenciales.",
            "Desarrolla un plan de gestión del riesgo y el trade que incluya a qué precios entrarás y saldrás, el tamaño de la posición y cómo manejarás diferentes escenarios de mercado.",
            "Mantén tu diario de trading antes, durante y después del trade. Revisa tus notas y ve si hay lecciones que aprender o ajustes a realizar en tu proceso de trading.",
          ],
        },
        {
          titulo: "¿Por qué probar este proceso?",
          texto: "Esta estrategia discrecional es un buen punto de partida para la mayoría de los principiantes porque:",
          puntos: [
            "Es flexible: puede aplicarse a cualquier mercado, no solo al cripto, y adaptarse a entornos cambiantes.",
            "Esta estrategia busca tendencias. Las tendencias son cómo se crean los setups de trading con alta relación retorno/riesgo y a menudo tardan semanas o meses en desarrollarse.",
            "Operar en marcos temporales de mediano a largo plazo significa menos tiempo frente a la pantalla y minimiza las tarifas de transacción, que pueden comerse tus ganancias o empeorar tus pérdidas.",
            "Es una excelente práctica para aprender a identificar catalizadores y motores de la acción del precio (micro, sectorial y macro), lo que ayudará a desarrollar tus habilidades de anticipación del mercado.",
          ],
        },
        {
          titulo: "La anticipación como habilidad especial",
          texto: "No siempre tienes que atrapar un movimiento antes de que suceda para tener éxito, pero si puedes hacerlo, aumentas tus probabilidades de éxito ya que tus trades tendrán ratios retorno/riesgo más favorables. A medida que ganes experiencia a través de la práctica diaria usando este proceso de trading, deberías poder mejorar tu capacidad de anticipar movimientos del mercado con el tiempo.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-13-4",
      titulo: "Análisis fundamental en el trading cripto",
      resumen: "Entender el análisis fundamental te ayuda a evaluar si un cripto vale la pena comprar o vender.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/fundamental-analysis-in-crypto",
      contenido: [
        {
          titulo: "¿Qué es el análisis fundamental?",
          texto: "El análisis fundamental (AF) es un enfoque usado en los mercados financieros para determinar el «valor intrínseco» de un activo, que es una frase elegante para tratar de llegar a una medida objetiva de su valor. El objetivo del análisis fundamental es determinar si un activo está «sobrevalorado» o «infravalorado». Esto se hace investigando toda la información subyacente sobre un proyecto cripto (sus «fundamentos») que está disponible, como el tamaño de su base de usuarios, aplicaciones en el mundo real y posibles usos futuros. La suposición general es que un activo gravitará hacia su «valor intrínseco» con el tiempo.",
        },
        {
          titulo: "Cómo usar el análisis fundamental",
          texto: "Usar el análisis fundamental es cómo recopilas la información necesaria para comprender el entorno general del mercado y qué activos tiene sentido operar en ese entorno. Luego haces un análisis más profundo de esos activos que pretendes operar y desarrollas un sesgo direccional («alcista o bajista») en su precio, e identificas si habrá catalizadores para empujar el precio en tu favor. Durante este proceso, debes hacer tu investigación inicial sobre un activo cripto a través del whitepaper del proyecto y las actualizaciones oficiales del proyecto. Los proyectos cripto legítimos tienen un sitio web oficial y/o foros, junto con diferentes canales de comunicación oficiales como redes sociales (Twitter, Reddit), apps de chat (Telegram, Discord) y blogs como Medium o Substack.",
        },
        {
          titulo: "Lo mínimo que debe demostrar un proyecto cripto",
          puntos: [
            "Una solución única a un problema del mundo real.",
            "Una hoja de ruta clara que incluye un cronograma de cómo se construirá la solución.",
            "Un equipo de desarrolladores experimentados capaces de ejecutar la hoja de ruta.",
            "Tokenomics sólidas (economía general de un activo cripto específico, como se asignará y distribuirá, cuánta oferta se creará, incentivos para mantenerlo, etc.).",
          ],
        },
        {
          titulo: "Seguimiento rutinario del proyecto",
          texto: "Después de haber hecho la investigación inicial, puedes comenzar el proceso de seguimiento del proyecto/token regularmente. Debes mantener controles rutinarios de los canales de medios mencionados (diaria o semanalmente), así como de sitios de noticias cripto. También obtén una visión del sentimiento cripto general verificando noticias y acción del precio en los dos mayores activos cripto: bitcoin (BTC) y ether (ETH). La acción del precio en estos dos mercados tiende a influir fuertemente en el resto del espacio cripto. Finalmente, no olvides revisar los temas macro de alto nivel como las perspectivas de crecimiento e inflación global, perspectivas de política monetaria y fiscal de los bancos centrales globales, así como datos de sentimiento del consumidor/empresas.",
        },
        {
          titulo: "¿Qué es una idea de trade?",
          texto: "Después de investigar los fundamentos de tu cripto objetivo, el mercado cripto, los mercados financieros más amplios e identificar catalizadores de precio potenciales, probablemente tendrás suficiente información para desarrollar una idea de trade (o «tesis») y tu nivel de convicción sobre esta idea. Una idea de trade incluye cuál es tu sesgo direccional en un activo («¿Eres alcista o bajista?»), tu razonamiento para ser alcista o bajista, y cómo deseas expresar este sesgo direccional como una apuesta o trade.",
        },
        {
          titulo: "Preguntas para desarrollar tu idea de trade",
          puntos: [
            "¿Cuál es la narrativa o catalizador dominante que impulsará la demanda de este activo cripto o llevará a los traders a venderlo?",
            "¿Cuánto tiempo podría durar la narrativa dominante sobre este cripto?",
            "¿Ya se ha descontado completamente la narrativa en el precio?",
            "¿Qué catalizadores próximos podrían cambiar o apoyar el sentimiento alcista (o bajista) del mercado en el cripto?",
            "¿El mercado ha visto este setup potencial en el pasado? ¿Cómo se comportó entonces?",
            "¿Tu análisis fundamental de un activo cripto específico se alinea con el sentimiento actual del mercado cripto y el mercado global?",
          ],
        },
        {
          titulo: "Ejemplo: Poopoocoin (PPC)",
          texto: "Como ejemplo, supongamos que estás mirando el cripto Poopoocoin (PPC), un nuevo token utilitario para una blockchain que afirma tener velocidades de transacción mucho más rápidas que otras blockchains importantes. Has leído mucho y encontraste que a lo largo del último año, ha atraído 100 nuevos equipos independientes de desarrollo de software que trabajan en proyectos de DeFi, NFTs, Web3 y más. Además, su oferta de tokens está configurada para deflactarse después de una próxima actualización de la red. Con grandes instituciones también mirando comprar y bloquear el 30% del suministro de tokens durante el próximo trimestre, eso probablemente elevaría la convicción alcista aún más a una probabilidad del 70% de apreciación del precio. No es una ciencia exacta, pero es una buena práctica involucrar y un componente necesario de tu análisis al determinar cuándo y cómo quieres desplegar capital.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-13-5",
      titulo: "Análisis técnico y acción del precio en cripto",
      resumen: "Aprende cómo usar el análisis técnico (AT) y la acción del precio (AP) para identificar puntos de entrada y salida cuando haces trading de cripto.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/technical-analysis-and-price-action-in-crypto",
      contenido: [
        {
          titulo: "De la idea al punto de entrada",
          texto: "Una vez que tienes tu sesgo direccional basado en el análisis fundamental, es hora de determinar precios de entrada potenciales para tu trade, así como precios de salida para tomar ganancias o cortar tu pérdida. Para un trader discrecional, esto se hace típicamente usando el análisis técnico (AT) y la acción del precio (AP).",
        },
        {
          titulo: "¿Qué es el precio de mercado?",
          texto: "El precio es esencialmente el valor al que un comprador y un vendedor acuerdan realizar un intercambio. Por ejemplo, imagina que estás en un mercado de agricultores y un agricultor vende una bolsa de manzanas por $1.00. Si nadie compra a $1.00 ese día, el agricultor puede bajar el precio a $0.95 hasta que los clientes comiencen a comprar. Y viceversa: si los compradores compran todas las manzanas a $1.00 y piden más, el agricultor probablemente subirá su precio. Es igual con los activos financieros, pero en una escala mucho mayor. En los mercados financieros, podría haber miles de compradores y vendedores para un solo activo, todos con diferentes ideas de cuánto están dispuestos a comprar/vender y a qué precio.",
          imagen: { src: "/bootcamp/mod13-lec5/market-pricing-360x360.png", alt: "Precio de mercado determinado por oferta y demanda" },
        },
        {
          titulo: "¿Qué es la acción del precio? ¿Qué es el análisis técnico?",
          texto: "La acción del precio y el análisis técnico son la práctica de comprender el sentimiento del mercado de un activo a través de un marco visual o matemático alrededor del historial de precios. A través de esta perspectiva, un trader puede entender cuándo el sentimiento del mercado era alcista, bajista o neutral, y poder encontrar puntos potenciales de inflexión o cambio de sentimiento.",
          imagen: { src: "/bootcamp/mod13-lec5/chart-analysis-crypto-360x360.png", alt: "Análisis de gráfico cripto" },
        },
        {
          titulo: "Ejemplo de análisis: BTC/USD",
          texto: "Para ilustrar este concepto, hagamos un análisis rápido usando acción del precio y análisis técnico en bitcoin contra el dólar estadounidense (BTC/USD). En el gráfico de BTC/USD en marco temporal de cuatro horas, podemos ver que en noviembre, los traders fueron bajistas ya que llevaron el mercado desde cerca de $70,000 hasta tan bajo como $54,000 antes de fin de mes. También podemos ver que $58,000 y $60,000 fueron áreas fuertes de interés, actuando primero como soporte en octubre, luego rompiéndose en noviembre y convirtiéndose en un área de resistencia. El indicador MACD en la parte inferior del gráfico se usa para mostrar cuándo el impulso del precio puede estar alcanzando su pico. En este escenario, el movimiento al alza del MACD puede estar señalando que el salto a corto plazo en el precio de BTC/USD de $54,000 a $58,000 puede estar exagerado, añadiendo un argumento de AT de que los traders pueden reanudar la presión vendedora.",
          imagen: { src: "/bootcamp/mod13-lec5/BTC-TA-PAA-example.png", alt: "Ejemplo de análisis técnico en BTC/USD" },
        },
        {
          titulo: "Consejos para usar el análisis técnico y la acción del precio",
          texto: "Hay algunas cosas que tener en cuenta antes de comenzar tu viaje con el análisis técnico:",
          puntos: [
            "Existe tal cosa como «hacer demasiado» en el análisis técnico. Usar demasiados indicadores tiende a llevar a un fenómeno llamado «parálisis por análisis». Estudia las diferentes herramientas de AT y AP, y encuentra no más de 2 o 3 que tengan más sentido para comenzar tu viaje.",
            "Evita la multicolinealidad: no uses indicadores técnicos basados en la misma información o que produzcan señales redundantes.",
            "No uses el análisis técnico o la acción del precio solos como herramienta de generación de ideas de trade, especialmente para activos cripto. El AT y la AP siempre miran hacia atrás, por lo que NO te dirán cuándo hay catalizadores importantes por delante.",
            "Para principiantes, usa el análisis fundamental para generar ideas de trade, y luego usa el análisis técnico y la acción del precio para encontrar entradas y salidas.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-13-6",
      titulo: "3 conceptos clave de gestión del riesgo para traders de cripto",
      resumen: "Todo trader de cripto debe conocer estos tres conceptos críticos de gestión del trade y del riesgo.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/risk-management-concepts-crypto-traders-should-know",
      contenido: [
        {
          titulo: "El plan de gestión antes de abrir una posición",
          texto: "Hay un paso más necesario antes de abrir una posición real y exponer tu capital al riesgo (de pérdida): determinar tu plan de gestión del trade y plan de gestión del riesgo. La preservación del capital es la primera prioridad de la especulación exitosa en el mercado. Y para preservar el capital, necesitas gestionar el riesgo correctamente.",
          imagen: { src: "/bootcamp/mod13-lec6/crypto-trade-plan.png", alt: "Plan de trade cripto" },
        },
        {
          titulo: "Los tres conceptos clave",
          texto: "Los tres conceptos clave que debes conocer antes de comenzar son:",
          puntos: [
            "Stop losses (órdenes de pérdida máxima)",
            "Position sizing (dimensionamiento de la posición)",
            "Scaling (escalonamiento)",
          ],
        },
        {
          titulo: "¿Qué es un stop loss?",
          texto: "Un stop loss es la parte de tu plan de gestión del trade donde decides salir de la posición completamente. Esto puede basarse en una señal de acción del precio, señales de indicadores técnicos, escenarios fundamentales, o una combinación de los tres que invalide tu tesis de trade.",
          imagen: { src: "/bootcamp/mod13-lec6/avoid-loss.png", alt: "Evitar pérdidas con stop loss" },
        },
        {
          titulo: "¿Qué es el position sizing?",
          texto: "El position sizing (dimensionamiento de la posición) es la cantidad de cripto que vas a comprar o vender en corto, determinada por la cantidad máxima de valor que estás dispuesto a perder si el trade sale mal, también conocido como «riesgo máximo». Para principiantes, el riesgo máximo no debería superar el 1%–2% de tu cartera para trades a corto plazo, y el 5% en posiciones a largo plazo. Por ejemplo, si tienes una cuenta de cripto de $1,000 y quieres comprar un token con un precio de mercado de $10 por token, y quieres limitar tu riesgo máximo al 2% de tu cuenta ($20) con un stop loss si el token cae a $5, entonces tu tamaño de posición debería ser de 4 unidades. Una caída de $5 en valor del token x 4 tokens = -$20 de pérdida (2% de la cuenta de $1,000).",
        },
        {
          titulo: "¿Qué es el scaling (escalonamiento)?",
          texto: "Determinar el precio o momento exacto en que la dirección del mercado cambiará es casi imposible. A menos que tengas una convicción muy alta de un precio en el que quieres entrar, es una buena práctica dividir tus entradas y salidas en dos o más órdenes alrededor de tu área objetivo. Por ejemplo, si quieres comprar un token a $10 pero tu análisis dice que podría caer hasta $8 antes de que el sentimiento se vuelva completamente alcista, en lugar de comprar 4 tokens a $10, podrías considerar comprar un token a $10, uno a $9 y dos a $8. Esto te permite entrar al trade con una posición parcial si el token no cae más allá de $10, y si cae hasta $8, habrás escalado a un precio promedio más bajo de $8.75.",
        },
        {
          titulo: "¡NO USES APALANCAMIENTO!",
          texto: "El trading apalancado es donde puedes abrir una posición de mayor tamaño que el capital total depositado en la cuenta. Por ejemplo, si tienes $100 en tu cuenta y un exchange de cripto ofrece trading con margen al 10%, podrías abrir una posición de $1,000 (10x apalancamiento). Si el token gana un 10%, duplicarías tu cuenta. Pero si el token pierde solo un 10%, perderías el 100% de tu cuenta y serías liquidado. Si bien es posible ganar mucho dinero muy rápido con apalancamiento en cripto, también puedes perder mucho dinero igual de rápido. El apalancamiento puede ser una herramienta para algunos, principalmente traders experimentados con prácticas estrictas de gestión del riesgo. NO es para nuevos traders que probablemente sean terribles en el trading al principio.",
          imagen: { src: "/bootcamp/mod13-lec6/margin-vs-leverage.png", alt: "Margen vs apalancamiento" },
        },
        {
          titulo: "El sueño del apalancamiento",
          texto: "Muchos traders piensan en cuánto dinero podrían ganar cuando descubren el mundo del trading apalancado. Pero el apalancamiento es una espada de doble filo, lo que significa que puede destruir tu cuenta tan rápido como puede hacerla crecer.",
          imagen: { src: "/bootcamp/mod13-lec6/dreaming-to-be-rich.png", alt: "Soñar con hacerse rico con apalancamiento" },
        },
        {
          titulo: "La realidad del apalancamiento",
          texto: "Si una posición apalancada de $1,000 pierde solo un 10% ($100), y solo tenías $100 en tu cuenta como margen, esa pérdida de $100 elimina toda tu cuenta. Y porque estás sin dinero, ahora le estarías pidiendo a tu mamá que te deje volver a tu antigua habitación.",
          imagen: { src: "/bootcamp/mod13-lec6/poor-crypto-trader.png", alt: "Trader arruinado por el apalancamiento" },
        },
        {
          titulo: "Resumen: recomendaciones para nuevos traders",
          puntos: [
            "Limita tu exposición total al sector cripto a un pequeño porcentaje de tu capital líquido total. Comienza con el 1% y crece desde ahí.",
            "Limita tu exposición a un activo cripto específico a un pequeño porcentaje de tu cartera cripto total. 1%–2% de riesgo máximo en trades a corto plazo. Máximo 5% de riesgo en posiciones a largo plazo.",
            "Usa un stop loss con cada posición.",
            "El momento perfecto es casi imposible. Escala las posiciones de trading o promedia el costo en inversiones a largo plazo. Toma ganancias a lo largo del camino si un trade va a tu favor.",
            "NO USES APALANCAMIENTO.",
            "Solo despliega capital en tus mejores ideas (setups de bajo riesgo/alta recompensa en ideas de alta probabilidad).",
            "«Sin posición» es una posición perfectamente válida cuando no ves oportunidades convincentes.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-13-7",
      titulo: "¿Qué es un diario de trading cripto y por qué lo necesitas?",
      resumen: "Aprende qué es un diario de trading cripto, por qué lo necesitas y qué debe incluir.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-crypto-trading-journal",
      contenido: [
        {
          titulo: "El último componente del proceso discrecional",
          texto: "La última tarea requerida para nuestro proceso de trading discrecional es mantener un diario de trading.",
          imagen: { src: "/bootcamp/mod13-lec7/writing-risk-management-plan.png", alt: "Escribir el plan de gestión del riesgo" },
        },
        {
          titulo: "¿Qué es un diario de trading cripto?",
          texto: "Un diario de trading es un registro que usas para documentar tus trades. Rastrea tu rendimiento de trading y, lo más importante, te ayuda a reflexionar sobre trades anteriores y aprender de cualquier error cometido. Tomar notas y escribir tus pensamientos son habilidades que muchas personas no practican ni disfrutan regularmente, pero cuando se trata de alcanzar competencia en tu oficio, este es un hábito que debes adquirir rápidamente. Un trader disciplinado es un trader rentable, y mantener un diario de trading es el primer paso para construir tu disciplina.",
        },
        {
          titulo: "Por qué el diario es esencial",
          texto: "El registro y la documentación son procesos que parecen ser requeridos en la mayoría de las profesiones. Los médicos toman notas sobre la salud y los tratamientos de los pacientes. Los atletas profesionales analizan y revisan prácticas y partidos, tomando notas para encontrar formas de mejorar su oficio. En general, tomar notas y llevar un diario es una tarea valiosa para alcanzar cualquier objetivo en la vida. Como dice el refrán: «No puedes gestionar lo que no mides.» Sin un diario para rastrear tu negocio de trading, las probabilidades son bastante altas de que olvides piezas de tu análisis, plan de trading y catalizadores a vigilar. Probablemente cometerás los mismos errores una y otra vez, y nunca verás una mejora real en tu rendimiento de trading.",
        },
        {
          titulo: "¿Qué incluir en un diario de trading?",
          puntos: [
            "A medida que lees las noticias diariamente para tener una visión de cómo se comportan los mercados, anota cualquier noticia y evento notable y tus sesgos/expectativas.",
            "Usa el análisis fundamental para desarrollar un sesgo direccional y generar idea(s) de trade. Anótalas.",
            "Usa el análisis técnico y la acción del precio para identificar puntos de entrada y salida. Anótalos.",
            "Anota tu plan de gestión del trade y del riesgo.",
            "Separa tus ideas de trade entre las que están «listas para ir en vivo» y las que hay que «acechar» en una lista de vigilancia en tu diario de trading.",
            "Rastrea órdenes pendientes y trades abiertos.",
            "Ajusta tu plan de gestión del trade y del riesgo según los nuevos desarrollos. Documenta estos ajustes.",
            "Después de cerrar un trade, anota el comportamiento del mercado y escribe por qué tu trade funcionó o no.",
          ],
        },
        {
          titulo: "Revisa tu diario regularmente",
          texto: "Revisa regularmente tu diario de trading y mira si hay lecciones que aprender y ajustes que hacer en cualquiera de tus procesos en el futuro.",
          imagen: { src: "/bootcamp/mod13-lec7/junior-trading-journal.png", alt: "Diario de trading para principiantes" },
        },
        {
          titulo: "Mantenlo simple y sé consistente",
          texto: "El único truco que aumenta significativamente tus probabilidades de desarrollar con éxito un hábito de registro: mantenlo simple y sé consistente. Incluso si todo lo que tienes es una hoja de cálculo en línea con tres columnas de datos: «Fecha», «Pensamientos del mercado» y «Mis expectativas del mercado», es un excelente punto de partida. Recuerda que estás comenzando tu viaje y no tiene que ser perfecto. Si puedes desplazarte por TikTok cada día durante horas, entonces puedes dedicar una fracción de ese tiempo al diario. Mejorará con el tiempo siempre que te mantengas consistente con tus esfuerzos.",
          imagen: { src: "/bootcamp/mod13-lec7/maintain-trading-journal.png", alt: "Mantener el diario de trading" },
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-13-8",
      titulo: "Todo junto: un ejemplo de trade cripto",
      resumen: "Después de aprender los diferentes pasos para construir una estrategia de trading cripto, juntémoslo todo con un ejemplo simple.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/crypto-trade-example",
      contenido: [
        {
          titulo: "Poniendo todo junto",
          texto: "Voy a juntar todo con un ejemplo simple de un trade cripto usando nuestra criptomoneda ficticia de una lección anterior, Poopoocoin (PPC).",
          imagen: { src: "/bootcamp/mod13-lec8/put-together-crypto-trading-strategy-360x360.png", alt: "Uniendo todos los pasos de la estrategia cripto" },
        },
        {
          titulo: "¿Cuál es la idea de trade?",
          texto: "Supongamos que hice mi investigación sobre los mercados financieros en general y el entorno económico, y encontré que el sentimiento del mercado de los traders es «risk-on» ya que la economía global ha comenzado a crecer nuevamente. También aprendí que las grandes instituciones financieras buscan poner más capital a trabajar en el espacio cripto. Una investigación adicional me apuntó a PPC, que nuevamente es el token utilitario para una red blockchain en auge que afirma ser «rápida como el rayo». Me entero de que grandes instituciones buscan adoptar PPC para ser usado en servicios financieros. La narrativa sobre los fundamentos sugiere que PPC es un activo potencialmente atractivo que podría atraer compradores, lo que ahora me hace alcista en PPC. Ahora que he establecido mi sesgo direccional («alcista»), busco comprar o «ir largo», pero ¿qué dice el análisis del gráfico y la acción del precio?",
        },
        {
          titulo: "¿Dónde está una buena entrada? ¿Cómo sé si estoy equivocado?",
          texto: "Basado en la acción del precio, parece que el sentimiento se volvió bajista después de que la moneda alcanzó un máximo alrededor de $90, cayendo de nuevo al nivel de $40. También puedo ver que el área de $30–$50 fue un rango de consolidación anteriormente, lo que podría atraer algunas órdenes de compra si el mercado se vuelve alcista en PPC. Por supuesto, también tengo que asumir que si el mercado rompe por debajo de esa área, podría haber más caída por delante. Así que he establecido un sesgo fundamental alcista y, basado en la acción del precio, he encontrado un área de compra potencial y un área de invalidación del trade (una ruptura por debajo del nivel de $30). Con el nivel de $90 sirviendo como resistencia durante el último mercado alcista, creo que es un buen área para salir de parte o toda la posición con ganancia.",
          imagen: { src: "/bootcamp/mod13-lec8/crypto-trade-example-chart.png", alt: "Gráfico de ejemplo de trade cripto" },
        },
        {
          titulo: "¿Cuál es el plan?",
          texto: "Supongamos que tenemos una cuenta cripto ficticia con un saldo inicial de $600. Basado en mi análisis, creo que tardará 6–12 meses en que PPC regrese al nivel de $90, por lo que este tipo de trade a más largo plazo se conoce como position trading. Arriesgaré un máximo del 5% de nuestra cartera cripto. Al 5% de una cuenta de $600, mi riesgo máximo en dólares no debe superar los $30. Como no estoy seguro de dónde puede tocar fondo el precio, decidí «escalar» y establecer órdenes de compra de 1 PPC en el nivel de $40 y 1 PPC en el nivel de $30. Y estableceré mi stop loss basado en el gráfico en $20, porque si el mercado llega hasta ahí, está bastante claro que los bajistas siguen en control.",
        },
        {
          titulo: "¿Cuál es mi riesgo máximo?",
          texto: "Ahora que tenemos los números, hagamos las matemáticas para ver si mi RIESGO es aceptable:\n• Saldo de la cuenta $600 × 5% riesgo máximo = $30 de riesgo máximo\n• Orden de compra #1: Comprar 1 unidad de PPC a $40 con stop loss máximo en $20 = $20 de riesgo máximo\n• Orden de compra #2: Comprar 1 unidad de PPC a $30 con stop loss máximo en $20 = $10 de riesgo máximo\n• Riesgo total si se activan ambas órdenes de compra = $30 (o 5% de nuestra cuenta de $600)\nMi riesgo máximo es aceptable. Ahora veamos mi recompensa potencial.",
        },
        {
          titulo: "¿Cuál es mi recompensa potencial y ratio recompensa/riesgo?",
          texto: "Si ambas órdenes de compra se activan, tendré 2 posiciones largas con un precio de entrada promedio de $35. Si establezco mi objetivo en $90 (el área de resistencia principal anterior), entonces mi ganancia potencial es de $110 ($90 objetivo − $35 entrada promedio = $55 ganancia × 2 unidades = $110 total, o un aumento del 18% en la cuenta). Mi ratio recompensa/riesgo potencial (RRR) es: $110 ganancia total / $30 riesgo máximo = 3.67:1. Con más de un potencial retorno/riesgo de 3:1, junto con una fuerte convicción de que los fundamentos y el entorno de mercado positivo atraerán compradores, este trade probablemente vale la pena ejecutarlo de inmediato en lugar de añadirlo a mi lista de vigilancia.",
        },
        {
          titulo: "Resumen final",
          texto: "Eso es una idea de trade en pocas palabras, y ten en cuenta que este es un ejemplo muy simple. En un trade real, también tendrás que considerar escenarios alternativos potenciales del mercado y cambios inesperados en los fundamentos. En general, esto debería darte una imagen más clara de cómo armar un trade discrecional y qué debería ir en un diario de trading. Recuerda que NO necesitas arriesgar mucho para generar riqueza a largo plazo en cripto. Tómatelo con calma, interioriza los principios fundamentales del trading, practica la estrategia discrecionaria discutida y usa esa pasión para mejorar cada día como trader. Empezar pequeño y tomárselo con calma es un resultado mucho mejor que arriesgar mucho y perderlo TODO.",
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo14 = [
    {
      id: "crypto-14-1",
      titulo: "¿Qué son los NFTs?",
      resumen: "Aprende qué es un NFT y en qué se diferencia de una criptomoneda.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-are-nfts",
      contenido: [
        {
          titulo: "El problema de la autenticidad digital",
          texto: "Antes de que existiera la tecnología blockchain, era difícil verificar la autenticidad de cualquier activo único sin la ayuda de intermediarios o terceros de confianza. Los activos físicos como cédulas de identidad o entradas de conciertos podían falsificarse, mientras que bienes como bolsos de lujo o aceite de oliva eran objeto de falsificación con regularidad. Los activos digitales lo tienen aún más difícil: las imágenes se pueden copiar y pegar, y canciones o publicaciones se descargan fácilmente sin que los propietarios reciban un centavo.",
          imagen: { src: "/bootcamp/mod14-lec1/copy-paste-file.gif", alt: "Copiar y pegar archivo, no un NFT" },
        },
        {
          titulo: "¿Qué es un NFT?",
          texto: "Los Tokens No Fungibles (NFTs, por sus siglas en inglés), pronunciados como 'en-efe-tís', son activos digitales almacenados en blockchains. Los tokens no fungibles son representaciones (tokens) de información del mundo real y de activos físicos o digitales. Dicho de otro modo, los activos o la información se 'tokenizan' usando criptografía y se almacenan en un libro de contabilidad digital con todas las ventajas de la tecnología blockchain. Crear o 'mintear' NFTs en blockchains permite a los propietarios tener una prueba de propiedad segura, descentralizada e inmutable de un activo único y todo lo que representa. Muchos creadores de NFTs van un paso más allá e incluyen metadatos o establecen condiciones sobre la propiedad y la distribución futura del activo digital.",
        },
        {
          titulo: "Los NFTs son 'No Fungibles'",
          texto: "Los tokens no fungibles se llaman así porque no son fungibles, es decir, cada NFT es único y no puede sustituirse ni intercambiarse por otro. 'No fungible' significa que algo es único y no puede reemplazarse por otra cosa. Un billete de un dólar, aunque tenga un número de serie único, sigue siendo fungible porque cualquier otro billete de un dólar vale lo mismo y nadie dudaría en cambiarlo.",
          imagen: { src: "/bootcamp/mod14-lec1/dollar-bill-serial-number.png", alt: "Número de serie en un billete de dólar" },
        },
        {
          titulo: "Ejemplos de lo no fungible",
          texto: "Lo mismo ocurre con una taza de azúcar morena en tu despensa, que es indistinguible e intercambiable con cualquier taza del supermercado.",
          imagen: { src: "/bootcamp/mod14-lec1/sugar-bag.png", alt: "Azúcar" },
        },
        {
          titulo: "",
          texto: "En cambio, el dibujo de un niño en la puerta del refrigerador es no fungible porque no hay nada igual a él, y no puede intercambiarse con el dibujo de una mariposa de otro niño. Tu pasaporte también es no fungible porque contiene información única que lo diferencia de todos los demás. Un NFT es un identificador digital único registrado en una blockchain que se usa para certificar autenticidad y propiedad.",
          imagen: { src: "/bootcamp/mod14-lec1/fridge-drawing-nft.png", alt: "Dibujo en el refrigerador, un NFT" },
        },
        {
          titulo: "Los NFTs NO son criptomonedas",
          texto: "El hecho de que los NFTs sean activos basados en criptografía y usen blockchains no los convierte en criptomonedas. Las criptomonedas son fungibles: un ETH vale lo mismo que cualquier otro ETH en el mercado, mientras que un NFT es único y no puede sustituirse. Además, los NFTs se crean con un estándar de token diferente: los tokens populares como ETH, MATIC y SHIB usan el estándar ERC-20 de Ethereum, mientras que la mayoría de los NFTs actuales siguen los estándares ERC-721 o ERC-1155, que tienen reglas más específicas sobre propiedad y transferencia.",
          imagen: { src: "/bootcamp/mod14-lec1/eth-is-not-nft.png", alt: "ETH no es un NFT" },
        },
        {
          titulo: "",
          texto: "Por último, los NFTs no pueden negociarse en los exchanges de criptomonedas habituales. En cambio, hay que navegar por marketplaces de NFTs y tener una billetera compatible con NFTs para poder poseer uno.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-14-2",
      titulo: "Características de los NFTs",
      resumen: "Conoce las características que definen a los NFTs.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-are-characteristics-of-nfts",
      contenido: [
        {
          titulo: "Los NFTs son únicos",
          texto: "Una de las características definitorias de los NFTs es que son únicos. Por ejemplo, solo existe una Mona Lisa. Puede haber varias réplicas y falsificaciones de la Mona Lisa, pero solo una fue pintada por el propio Leonardo en el siglo XVI. Puedes tomar fotos de la Mona Lisa o enmarcar una impresión en alta resolución para colgar en tu sala, pero eso no se acercará en absoluto al valor monetario que se le otorga al original auténtico.",
          imagen: { src: "/bootcamp/mod14-lec2/mona-lisa.png", alt: "Mona Lisa" },
        },
        {
          titulo: "Propiedad digital verificada en blockchain",
          texto: "Al igual que la Mona Lisa es única en su especie, también lo es un NFT. Cuando se trata de grandes obras maestras del arte, la propiedad y la autenticidad se verifican a través de tasadores profesionales que emiten certificados. Con los NFTs, llevar el registro de quién posee qué se vuelve mucho más seguro gracias al uso de la tecnología blockchain. Quien tenga las claves privadas de la dirección donde se asigna un NFT en una blockchain tiene la propiedad digital y el control total del activo.",
          imagen: { src: "/bootcamp/mod14-lec2/nft-ownership.png", alt: "Propiedad de un NFT" },
        },
        {
          titulo: "Control total y permanencia",
          texto: "Esto significa que quien posea el NFT es el único con capacidad para venderlo o regalarlo. Si tienes un NFT que decides conservar, ¡es tuyo para siempre! Incluso después de que fallezcas, nadie puede simplemente apropiarse del NFT como ocurre con los activos del mundo real, a menos que le hayas dado acceso a tu billetera digital. Un NFT es un paquete compuesto por dos elementos clave: el token en sí y el contenido digital. Este contenido toma la forma de un archivo (texto, imagen, audio, video, etc.), conocido como 'metadatos'. Mientras el token se almacena 'on-chain' o directamente en una blockchain, los metadatos generalmente NO se almacenan en la blockchain, lo que se conoce como estar almacenados 'off-chain'.",
        },
        {
          titulo: "Programabilidad y permisividad",
          texto: "Dado que un NFT es técnicamente un fragmento de código en una blockchain, puede programarse para tener diversas funciones integradas. Un ejemplo es que se pueden programar regalías en los tokens, lo que significa que un artista puede seguir monetizando las ventas secundarias de su obra. Y dependiendo de la blockchain en la que esté construido el NFT, también puede ser 'permissionless' (sin permisos). Esto significa que se pueden desarrollar funciones de terceros sobre el NFT, permitiendo que se use de múltiples maneras, incluso más allá de lo que sus creadores originales pretendían.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-14-3",
      titulo: "¿Para qué se usan los NFTs?",
      resumen: "¿Cómo se usan los NFTs? Conoce sus casos de uso más populares.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-are-common-uses-for-nfts",
      contenido: [
        {
          titulo: "Arte",
          texto: "Al tokenizar una obra de arte en una blockchain, los artistas pueden 'firmar' su trabajo para demostrar que les pertenece. Luego pueden eliminar intermediarios y vender su obra a una audiencia global a través de exchanges de NFTs. También pueden establecer parámetros de transferencia mediante contratos inteligentes para tener más control sobre los márgenes y la distribución de su producto. Los artistas pueden ganar un pequeño ingreso cada vez que sus NFTs se intercambian, en lugar de solo ganar con la venta inicial. Del mismo modo, las grandes marcas pueden tokenizar su contenido para facilitar actividades de licenciamiento, y celebridades de mayor o menor fama pueden emitir NFTs para vender merchandising exclusivo a sus seguidores. Mientras tanto, los coleccionistas de arte pueden disfrutar de demostrar la propiedad de artículos físicos o digitales raros sin preocuparse de que sean falsificaciones.",
        },
        {
          titulo: "Gaming",
          texto: "¿Para qué molestarse gastando en pociones, habilidades y mejoras de armadura de tu personaje en un juego en línea si puedes perder el acceso a tu cuenta de un momento a otro? Por suerte, los juegos en línea se están adaptando a la tecnología blockchain, lo que permite a los jugadores ganar o comprar activos dentro del juego que poseen directamente y que pueden vender a otros jugadores. ¡Algunos NFTs de juegos incluso pueden intercambiarse o trasladarse a otros juegos!",
        },
        {
          titulo: "Propiedad fraccionada",
          texto: "Los NFTs por sí solos no pueden dividirse en partes, ya que esas partes serían fungibles por naturaleza. Sin embargo, los propietarios pueden bloquear NFTs en un contrato inteligente que generará un número específico de 'NFTs Fraccionados (F-NFTs)'. Estas participaciones fraccionadas son útiles para quienes quieren 'poseer' o vender un producto caro del mundo real. Una mansión de 14 habitaciones, por ejemplo, se vendería más rápido si varias personas acordaran poseerla parcialmente. La tecnología de F-NFTs puede facilitar ese escenario y hacer que la futura verificación y venta sea mucho más eficiente. Las pequeñas empresas también podrían obtener financiación adicional ofreciendo al público algunas de sus 'fracciones' (propiedad parcial del negocio a través de NFTs), de forma similar a como las corporaciones venden acciones en el mercado de valores.",
        },
        {
          titulo: "Gestión de identidad",
          texto: "Demostrar la propiedad de un dato y almacenarlo en una blockchain segura será muy útil para quienes busquen establecer información de identidad. La tecnología NFT puede dar a las personas acceso inmediato a sus actas de nacimiento, pasaportes, historial médico verificado y credenciales educativas. No solo eso, sino que también podrán compartir únicamente la información relevante con otras partes según sea necesario. Nadie puede reclamar tu acta de nacimiento como propia, y tampoco tendrás que rellenar 37 formularios cada vez que vayas a una clínica diferente o viajes al extranjero. Además, las empresas manufactureras que usen NFTs pueden confirmar el origen de sus materias primas, rastrear el progreso de sus productos a lo largo de la cadena de suministro y verificar la autenticidad de sus productos ante sus clientes. Por último, los NFTs pueden ayudar a organizadores de eventos deportivos y conciertos a prevenir la venta de entradas falsificadas y controlar la asistencia.",
        },
        {
          titulo: "Tokens sociales",
          texto: "Los tokens sociales son una amplia categoría de NFTs emitidos por personas y comunidades. Lanzar lotes numerados de NFTs abre la puerta a 'clubes' de membresía que ofrecen una experiencia exclusiva. Por ejemplo, el Bored Ape Yacht Club (BAYC) ofrece a sus miembros acceso exclusivo a su espacio de arte llamado Bathroom. Otros clubes pueden vender NFTs como tokens de membresía y ofrecer distintos privilegios. Los artistas pueden crear fan clubs oficiales, y abogados o floristas pueden vender tokens por sus servicios. ¡Los vendedores de tokens incluso pueden rastrear las actividades de los propietarios de NFTs y ofrecer recompensas por fidelidad o participación!",
        },
        {
          titulo: "Colateral",
          texto: "Los NFTs puede que no funcionen como criptomonedas, pero sí tienen un valor que puede aprovecharse para obtener préstamos denominados en criptomonedas o en moneda fiduciaria. Una vez que el prestatario y el prestamista acuerdan el valor del NFT y los parámetros del préstamo, usar NFTs como colateral puede no ser muy diferente a usar arte para obtener préstamos. Debido a la creciente demanda, las aplicaciones DeFi y CeFi están avanzando en el establecimiento de estándares de tasación de NFTs y préstamos con colateral.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-14-4",
      titulo: "Breve historia de los NFTs",
      resumen: "¿Cómo nacieron los NFTs y quién lo inició todo? Aquí tienes una brevísima historia.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/brief-history-of-nfts",
      contenido: [
        {
          titulo: "El nacimiento de una revolución digital",
          texto: "¿Cómo llegaron los NFTs a existir y quién lo inició todo? Algunos remontan sus orígenes a las Colored Coins (monedas de colores) de 2012, antes incluso de que el término NFT existiera. Las Colored Coins representaban pequeñas denominaciones de bitcoin con el objetivo de añadir metadatos a las transacciones, aunque resultaron ser un experimento fallido. Otros consideran que el primer NFT fue 'Quantum' de Kevin McCoy en mayo de 2014, una animación de octágono hipnótica acuñada en Namecoin, que muchos consideran la primera obra de arte NFT verdadera. En junio de 2021, esa pieza histórica se vendió en Sotheby's por la sorprendente suma de 1,47 millones de dólares.",
          imagen: { src: "/bootcamp/mod14-lec4/quantim-nft.gif", alt: "NFT Quantum" },
        },
        {
          titulo: "De los gatos cripto a los millones digitales",
          texto: "En 2017, apareció CryptoKitties, los gatos virtuales que casi rompieron Ethereum. Este juego permitía a los jugadores comprar, coleccionar y criar felinos digitales de edición limitada, cada uno un NFT único con su propio 'ADN digital'. CryptoKitties se volvió tan popular a finales de 2017 que las transacciones de cría saturaron literalmente toda la red de Ethereum. Algunos mascotas virtuales se vendieron por más de 100.000 dólares durante el apogeo de la fiebre por los gatos.",
          imagen: { src: "/bootcamp/mod14-lec4/cryptokitties-example.png", alt: "CryptoKitties" },
        },
        {
          titulo: "Axie Infinity y el play-to-earn",
          texto: "Axie Infinity se lanzó en 2018, permitiendo a los jugadores batallar y criar simpáticos monstruos NFT en un universo inspirado en Pokémon. Para 2021, Axie explotó como el máximo exponente del gaming 'play-to-earn'. Algunos jugadores, especialmente en Filipinas, llegaron a ganarse la vida con el juego. En su punto álgido, el juego contaba con más de 2,7 millones de usuarios diarios y más de 4.000 millones de dólares en transacciones en su marketplace.",
          imagen: { src: "/bootcamp/mod14-lec4/axie-infinity-1.jpg", alt: "Axie Infinity" },
        },
        {
          titulo: "La gran fiebre del oro NFT",
          texto: "El dinero siguió fluyendo hacia los NFTs, convirtiendo a varios artistas digitales en millonarios de la noche a la mañana. El caso más emblemático: el artista digital Beeple (Mike Winkelmann), cuya obra de arte NFT 'Everydays: The First 5000 Days', un collage de 5.000 imágenes digitales creadas a lo largo de muchos años, se vendió por la asombrosa suma de 69 millones de dólares en marzo de 2021. Esta venta en Christie's sorprendió al mundo y situó definitivamente a los NFTs en el mapa del mainstream.",
          imagen: { src: "/bootcamp/mod14-lec4/beeple.jpg", alt: "Everydays: The First 5000 Days, collage de Beeple" },
        },
        {
          titulo: "El flex digital: NFTs como foto de perfil",
          texto: "¿Recuerdas cuando la foto de perfil en redes sociales era simplemente una foto? Los NFTs cambiaron eso. Podías comprar avatares NFT para usarlos como fotos de perfil, el símbolo de estatus digital por excelencia. Twitter incluso lanzó un marco hexagonal especial en 2022 para verificar fotos de perfil NFT. Instagram y Facebook experimentaron brevemente con la visualización de NFTs en 2022, aunque Meta canceló el proyecto en 2023 al enfriarse el entusiasmo. En el mundo cripto, quienes desean demostrar su riqueza y conocimiento digital lo hacen con NFTs autenticados de colecciones de primer nivel, similar a lucir un Rolex o unas zapatillas de edición limitada en la vida real.",
        },
        {
          titulo: "Las marcas de lujo del mundo NFT",
          texto: "Unos pocos colecciones exclusivas de NFTs surgieron como los equivalentes cripto de Gucci o Louis Vuitton. CryptoPunks, lanzados gratis en 2017 por Larva Labs, se convirtieron en la marca NFT de lujo por excelencia: 10.000 personajes pixelados. En mayo de 2021, un conjunto de nueve CryptoPunks se vendió en Christie's por casi 17 millones de dólares.",
          imagen: { src: "/bootcamp/mod14-lec4/cryptopunks.png", alt: "CryptoPunks" },
        },
        {
          titulo: "Bored Ape Yacht Club",
          texto: "Luego llegó el Bored Ape Yacht Club (BAYC) en 2021, otra potencia en el universo NFT. La colección incluye 10.000 simios de caricatura con rasgos únicos y funciona como membresía de un 'club' exclusivo con ventajas como invitaciones a fiestas y lanzamientos adicionales de NFTs. En el apogeo de la locura, el precio mínimo (el Ape más barato disponible) superó los 100 ETH, equivalente a más de 300.000 dólares en el pico del mercado cripto. Celebridades como Stephen Curry y Justin Bieber compraron Apes por cientos de miles de dólares.",
          imagen: { src: "/bootcamp/mod14-lec4/bayc-avatar.png", alt: "Avatar de BAYC" },
        },
        {
          titulo: "¿Por qué no simplemente hacer una captura de pantalla?",
          texto: "Sí, puedes guardar la imagen, pero no puedes copiar la prueba de propiedad en blockchain que viene con el NFT. Esa prueba de autenticidad (registrada en un libro de contabilidad público) es donde reside gran parte del valor. Es como la diferencia entre tener un póster de la Mona Lisa versus poseer la Mona Lisa real en el Louvre.",
          imagen: { src: "/bootcamp/mod14-lec4/mona-lisa-on-amazon.png", alt: "Mona Lisa en Amazon" },
        },
        {
          titulo: "La 'roca de un millón de dólares' y la fiebre del oro NFT",
          texto: "Al ritmo en que la industria avanzaba, parecía que cualquiera podía asignar un certificado digital tokenizado a una roca y llamarlo NFT. Y así fue: imágenes de rocas en formato JPEG conocidas como EtherRocks se vendieron por más de un millón de dólares en agosto de 2021. Por supuesto, no todos los NFTs valían ni cerca de eso, y pronto el mercado se inundó de 'basura NFT'. Para 2022 existían decenas de miles de colecciones de NFTs, la mayoría de las cuales cayeron en el olvido cuando el entusiasmo disminuyó. Un análisis de finales de 2023 sugirió que alrededor del 95% de las colecciones de NFTs habían 'muerto', con casi ninguna actividad de trading ni valor residual.",
          imagen: { src: "/bootcamp/mod14-lec4/etherrocks.png", alt: "EtherRocks" },
        },
        {
          titulo: "El lado oscuro: estafas, falsificaciones y rug pulls",
          texto: "Como en toda fiebre del oro, el boom de los NFTs atrajo estafadores. En 2022, OpenSea admitió que más del 80% de los artículos creados con su herramienta gratuita de minteo eran copias plagiadas, colecciones falsas o spam. Los rug pulls ocurrían cuando los creadores de un proyecto aparentemente legítimo desaparecían con todo el dinero, dejando a los coleccionistas con tokens sin valor. Y en los esquemas de pump-and-dump, influencers compraban grandes cantidades de NFTs de bajo valor, los promocionaban ruidosamente en redes sociales y luego vendían en silencio cuando los precios subían, dejando a los últimos compradores con pérdidas.",
        },
        {
          titulo: "El gran crash de los NFTs en 2022",
          texto: "Para 2022, el furor de los NFTs enfrentaba un ajuste con la realidad. Un mercado cripto más amplio en caída libre (el 'invierno cripto' de 2022) enfrió significativamente la demanda. Después de que los volúmenes de trading alcanzaran máximos históricos a principios de 2022, se derrumbaron hacia finales del año, cayendo aproximadamente un 97% desde el pico. Los precios de NFTs 'blue chip' como Bored Apes y CryptoPunks cayeron drásticamente. La colección BAYC, que tenía un precio mínimo de unos 120 ETH a mediados de 2022, vio ese precio descender a apenas 10 ETH a finales de 2023, un descenso de más del 90%.",
        },
        {
          titulo: "Evolución y adaptación: los NFTs no han muerto",
          texto: "Sin embargo, los informes sobre la 'muerte' de los NFTs resultaron exagerados. Mientras el frenesí especulativo se calmaba, el ecosistema NFT continuó evolucionando en 2023 y 2024. Surgió Blur, un nuevo marketplace que ganó enorme tracción entre los traders. Grandes marcas como Nike, Starbucks y Reddit integraron NFTs en sus productos y programas de fidelidad. Las universidades han emitido diplomas NFT y los organizadores de eventos usan NFTs como entradas o insignias de asistencia. El concepto de 'Soulbound Tokens' introducido por Vitalik Buterin de Ethereum en 2022 (NFTs no transferibles para credenciales o logros) destacó que los NFTs no son solo para imágenes graciosas, sino que tienen usos prácticos de identidad y verificación.",
        },
        {
          titulo: "Lo fundamental: la propiedad digital",
          texto: "En definitiva, la breve historia de los NFTs nos ha mostrado algo: los seres humanos tienen un deseo innato de coleccionar y mostrar aquello que valoran, y ese instinto se traslada al ámbito digital. Ya sea un raro CryptoKitty, un BAYC, una parcela de tierra virtual o una insignia de asistencia a un evento en el metaverso, los NFTs tratan sobre la propiedad digital y la comunidad. Si decides adentrarte en los NFTs, recuerda las lecciones de la historia reciente: investiga bien, desconfía del hype, protege tus activos y solo gasta lo que puedas permitirte perder.",
          puntos: [
            "Investiga bien antes de comprar cualquier NFT.",
            "Desconfía del hype y las promesas exageradas.",
            "Protege tus activos con billeteras seguras.",
            "Solo gasta lo que puedas permitirte perder.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-14-5",
      titulo: "¿Deberías comprar NFTs?",
      resumen: "Comprar un NFT en este momento es increíblemente arriesgado. ¿Vale la pena?",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/should-you-buy-nfts",
      contenido: [
        {
          titulo: "¿Deberías comprar NFTs?",
          texto: "Esta es la pregunta del millón (¿o del billón?): ¿deberías comprar NFTs? La respuesta corta es: depende de si ves o no valor en ello. El concepto de valor, por supuesto, es altamente subjetivo.",
          imagen: { src: "/bootcamp/mod14-lec5/thinking-about-buying-nft.png", alt: "¿Deberías comprar NFTs?" },
        },
        {
          titulo: "El valor es subjetivo",
          texto: "Al igual que comprar una obra de arte original de un artista mundialmente famoso, un par de Nike Air Mags auténticos, recuerdos deportivos vintage o acciones de una empresa, el valor está en los ojos del observador. Incluso existen sitios web como NFT Price Floor que rastrean el precio mínimo, el historial de precios, los datos de ventas y el volumen de operaciones de las principales colecciones de NFTs.",
          imagen: { src: "/bootcamp/mod14-lec5/nft-price-floor.png", alt: "NFT Price Floor" },
        },
        {
          titulo: "Razones válidas para comprar un NFT",
          texto: "Algunos compran arte por razones sentimentales o por prestigio social. Algunos adquieren zapatillas raras para añadirlas a su colección. Algunos compran bienes vintage a buen precio para revenderlos con ganancia. Otros invierten en startups porque ven potencial de crecimiento. Si planeas comprar NFTs por razones similares, ¡adelante! Por otro lado, si vas a gastar miles de dólares en un NFT por puro FOMO, puede que quieras dar un paso atrás.",
        },
        {
          titulo: "Riesgos y consideraciones",
          texto: "No olvides que las piezas de arte o los artículos de colección, sean físicos o digitales, pueden ser difíciles de autenticar y tasar. Asegúrate de tener un sólido conocimiento del mercado de NFTs y realiza tu debida diligencia antes de gastar tu dinero. Los NFTs, e incluso las blockchains, son tecnologías e industrias todavía bastante jóvenes. Para que el ecosistema NFT madure, se necesitan protocolos más unificados, mayor interoperabilidad, regulaciones que protejan a los propietarios contra fluctuaciones especulativas de precios, medidas de seguridad mejoradas para evitar estafas, y estándares de tasación que ayuden a los participantes a fijar precios. Una vez que el ecosistema NFT avance en estos aspectos, podríamos estar ante un mundo donde casi todos los activos digitales y (tokens de) activos físicos se almacenen y negocien en blockchains globales.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-14-6",
      titulo: "¿Deberías crear NFTs?",
      resumen: "Estas son algunas cosas a considerar si estás pensando en crear un NFT.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/should-you-create-nfts",
      contenido: [
        {
          titulo: "¿Deberías crear un NFT?",
          texto: "Si los NFTs son tan interesantes, probablemente hayas pensado en crear (o 'mintear') uno tú mismo. Al fin y al cabo, técnicamente puedes convertir casi cualquier cosa en un NFT si quieres. ¿Y si pudieras lograr un Beeple y vender tu creación NFT por millones de dólares? Pero el hecho de que PUEDAS crear un NFT no garantiza que harás una fortuna. Es más, podrías incluso perder dinero si no tienes cuidado.",
          imagen: { src: "/bootcamp/mod14-lec6/create-nft-idea.png", alt: "¿Crear un NFT?" },
        },
        {
          titulo: "Elige bien la blockchain",
          texto: "Antes que nada, necesitas un conocimiento profundo de las dApps NFT y las blockchains para decidir cuál usar. Aunque la mayoría de los NFTs están construidos en Ethereum, existen otras blockchains como Tezos, Solana o Flow, cada una con sus ventajas e inconvenientes. Cada una tiene su propia criptomoneda, lo que significa que debes informarte sobre su dinámica de mercado y las tarifas de transacción correspondientes. ¡Asegúrate de que tus ingresos potenciales no se vean devorados por los costos!",
        },
        {
          titulo: "El valor para el comprador",
          texto: "Aunque hayas creado algo único e impresionante, eso no significa que el producto se venderá. Si tu creación NFT no aporta ningún tipo de valor para los compradores potenciales, ¡suerte vendiéndola! Sí, los avatares de simios aburridos o los jpegs de rocas no parecen valer nada en absoluto, pero para el público adecuado, sí lo hacen. Por supuesto, construir esa audiencia y ejecutar bien tu plan de marketing no es ninguna tarea fácil.",
          imagen: { src: "/bootcamp/mod14-lec6/NFT-buyer.png", alt: "Comprador de NFT" },
        },
        {
          titulo: "Preguntas clave antes de crear un NFT",
          texto: "Al igual que al iniciar un negocio, debes hacerte las siguientes preguntas para determinar si crear tu NFT puede ser rentable:",
          puntos: [
            "¿Qué estás ofreciendo a tus clientes potenciales?",
            "¿Qué problemas o vacíos de mercado están abordando tus NFTs?",
            "¿Hay suficiente demanda para tu NFT y cómo la mides?",
            "¿Existen NFTs similares y en qué se diferencia el tuyo de ellos?",
            "¿Cómo planeas llegar y construir tu mercado objetivo?",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-14-7",
      titulo: "¿Dónde comprar y vender NFTs?",
      resumen: "Si has decidido que vale la pena comprar o mintear NFTs, aquí tienes algunos lugares legítimos donde hacerlo.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/where-to-buy-and-sell-nfts",
      contenido: [
        {
          titulo: "Marketplaces centralizados vs. descentralizados",
          texto: "Si has decidido que vale la pena comprar o mintear NFTs, es hora de buscar lugares legítimos donde hacerlo. ¡No vayas a comprar alguna 'prometedora NFT con enorme potencial de ganancias' de un 'tipo de fintech' en un grupo de Discord! Existen dos tipos de marketplaces de NFTs: centralizados y descentralizados. Como su nombre indica, los marketplaces centralizados tienen una autoridad central que se encarga de los detalles. Esto incluye cosas como verificaciones de derechos de autor o autenticación de propietarios para los NFTs vendidos en su plataforma. A cambio, los marketplaces centralizados pueden imponer ciertas restricciones o añadir tarifas adicionales. Por otro lado, los marketplaces descentralizados no tienen autoridad central que supervise la actividad. Prácticamente cualquiera puede listar cualquier cosa, incluso NFTs falsos.",
        },
        {
          titulo: "OpenSea",
          texto: "OpenSea es el primer y mayor marketplace donde puedes comprar y vender NFTs. Hasta la fecha, hay aproximadamente 35 millones de NFTs en la plataforma, que cubren una amplia variedad de bienes digitales como obras de arte, coleccionables de juegos, bienes raíces virtuales y nombres de dominio. OpenSea también es compatible con las blockchains de Ethereum, Polygon y Klaytn. Los compradores pueden utilizar más de 150 tokens de pago y comprar NFTs a precio fijo o pujar en subastas.",
          imagen: { src: "/bootcamp/mod14-lec7/opensea.png", alt: "Marketplace de NFTs OpenSea" },
        },
        {
          titulo: "SuperRare",
          texto: "SuperRare es otro reconocido marketplace de obras de arte digitales entre particulares. Todavía se encuentra en sus primeras etapas y solo acepta pagos en ETH, requiriendo que los usuarios tengan una billetera MetaMask. Lo que hace único a SuperRare es que examina minuciosamente los perfiles de los artistas y solo lista a quienes cumplen sus criterios. Además, mantiene la exclusividad al alojar únicamente obras de arte únicas o de edición única.",
          imagen: { src: "/bootcamp/mod14-lec7/superrare.png", alt: "Marketplace de NFTs SuperRare" },
        },
        {
          titulo: "Rarible",
          texto: "Rarible también se encuentra entre los principales marketplaces de NFTs, especialmente para coleccionables digitales tokenizados. Permite a los usuarios mintear, comprar y vender artículos de diversas categorías de NFTs como arte, fotografía, música, animación, dominios, metaversos y juegos. Al igual que en OpenSea, algunos NFTs en Rarible se venden a precio fijo mientras que otros se subastan. Una ventaja de usar Rarible es que puedes ganar regalías por los NFTs que revendes, lo que puede crear un flujo de ingresos pasivos.",
          imagen: { src: "/bootcamp/mod14-lec7/rarible.png", alt: "Marketplace de NFTs Rarible" },
        },
        {
          titulo: "Otros marketplaces",
          texto: "Si quieres comprar F-NFTs para aprovechar el potencial alcista de los precios sin tener que desembolsar grandes sumas por una pieza NFT completa, marketplaces como Fractional y Niftex merecen ser explorados. Los principales exchanges de criptomonedas como Binance y Coinbase también lanzaron sus propios marketplaces de NFTs para hacerse con una parte del mercado en crecimiento.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-14-8",
      titulo: "Cómo comprar tu primer NFT",
      resumen: "¿Crees que estás listo para poseer tus primeros NFTs? Aprende cómo comprarlos.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/how-to-buy-your-first-nft",
      contenido: [
        {
          titulo: "Paso 1: Crea una billetera compatible con NFTs",
          texto: "Si has leído sobre qué son los tokens no fungibles y los riesgos potenciales de comprar y poseer uno, y estás seguro de que no actúas por puro FOMO, aquí tienes el proceso paso a paso para comprar tu primer NFT. Las billeteras cripto no almacenan literalmente tus monedas y tokens; almacenan las claves que te darán acceso a tus activos digitales. ¡Y lo que hacemos con las llaves es no perderlas! Una billetera caliente (hot wallet), por ejemplo, puede ofrecer acceso más fácil a tus activos digitales que una billetera fría (cold wallet) basada en hardware, pero también es más vulnerable a estafas que pueden agotar tus saldos.",
        },
        {
          titulo: "Compatibilidad de la billetera",
          texto: "Al comprar NFTs basados en blockchain, debes apuntar a billeteras compatibles con: la blockchain donde se crean y procesan tus NFTs, la criptomoneda o moneda fiduciaria en la que está denominado el NFT, y la plataforma que ofrece el NFT que quieres comprar. No todas las billeteras almacenan NFTs y no todas son compatibles con algunas blockchains, así que verifica bien antes de crear una. Los principiantes pueden comenzar obteniendo una billetera MetaMask, ya que soporta NFTs y algunas de las blockchains y criptomonedas más comúnmente usadas. Es fácil de acceder en Google Chrome donde puedes añadirla como extensión.",
          imagen: { src: "/bootcamp/mod14-lec8/metamask-browser-extension.png", alt: "Extensión de navegador MetaMask" },
        },
        {
          titulo: "Cómo configurar MetaMask",
          texto: "Se te pedirá que crees una billetera que generará la única FRASE SEMILLA, compuesta de unas 12 a 24 palabras, que desbloqueará tu billetera. Escribe tu frase semilla en un papel o guárdala en algún lugar donde nadie pueda verla, ni siquiera aplicaciones con acceso a tu portapapeles.",
          imagen: { src: "/bootcamp/mod14-lec8/metamask-secret-recovery-phrase.png", alt: "Frase de recuperación secreta de MetaMask" },
        },
        {
          titulo: "",
          texto: "Una vez que hayas ingresado tu frase semilla, deberías tener acceso a una billetera que muestra los saldos en diferentes redes.",
          imagen: { src: "/bootcamp/mod14-lec8/metamask-balance.png", alt: "Saldo en MetaMask" },
        },
        {
          titulo: "Paso 2: Conecta tu billetera a un marketplace de NFTs",
          texto: "¿Tu billetera es compatible con tu marketplace preferido? Los marketplaces populares de NFTs como OpenSea y Rarible listan las billeteras compatibles casi en cuanto visitas sus sitios. Algunas aplicaciones móviles también usan códigos QR para conectar billeteras. Los marketplaces generalmente caen en tres categorías: abiertos (cualquiera puede comprar, vender o mintear NFTs), cerrados (solo artistas seleccionados pueden vender y operar) y propietarios (venden NFTs con marca registrada o derechos de autor de la empresa que los opera).",
          imagen: { src: "/bootcamp/mod14-lec8/opensea-wallet-support.png", alt: "Billeteras soportadas por OpenSea" },
        },
        {
          titulo: "Paso 3: Asegura los fondos",
          texto: "Los grandes marketplaces de NFTs suelen permitir el uso de tarjetas de crédito o débito para comprar NFTs. Para todo lo demás, está el ETH. Ethereum no es la única blockchain en el mundo NFT, pero sí la más usada en los marketplaces. La forma más fácil de obtener ETH es comprarlo en un exchange centralizado. Binance, Coinbase y Gemini son algunos de los mayores exchanges centralizados.",
          imagen: { src: "/bootcamp/mod14-lec8/binance-cex.png", alt: "Comprar ETH en Binance" },
        },
        {
          titulo: "Transferir ETH a tu billetera",
          texto: "Las monedas y tokens almacenados en billeteras de exchanges significan que los exchanges tienen tus claves privadas. Puedes perder acceso a tus saldos si el exchange es hackeado o bloquea tu cuenta. Cuando se trata de exchanges, lo mejor es pensar: 'sin tus claves, no son tus monedas'. Por eso debes transferir tu saldo de ETH a tu billetera no-exchange tan pronto como lo compres. Para transferir ETH desde tu exchange a la billetera conectada al marketplace de NFTs: ve a la billetera de tu exchange y haz clic en Retirar, selecciona la billetera ETH y envía el ETH a la dirección pública de tu billetera no-exchange.",
          imagen: { src: "/bootcamp/mod14-lec8/copy-wallet-address.png", alt: "Copiar dirección de billetera" },
        },
        {
          titulo: "Paso 4: Elige tu NFT",
          texto: "Ahora que has conectado tu billetera al marketplace y tienes fondos, ¿cómo sabes qué NFTs comprar? Un buen punto de partida son los 'creadores' que ya conoces. Quizás tus artistas favoritos y referentes del trading tengan sus propias recomendaciones. Navegar por tus redes sociales en busca de hashtags o temas tendencia también puede darte pistas sobre qué está de moda en el mundo NFT. Por último, los propios marketplaces muestran obras, artistas y colecciones en tendencia.",
          imagen: { src: "/bootcamp/mod14-lec8/opensea-marketplace.png", alt: "Marketplace de OpenSea" },
        },
        {
          titulo: "Tipos de listados de NFTs",
          texto: "Una vez elegido tu NFT, presta atención a cómo puedes comprarlo. La mayoría de los listados operan en una subasta temporizada similar a eBay: el NFT va al mejor postor, o el vendedor puede aceptar cualquier oferta durante la subasta.",
          imagen: { src: "/bootcamp/mod14-lec8/pudgy-penguin.png", alt: "Pudgy Penguin" },
        },
        {
          titulo: "",
          texto: "Otros NFTs pueden simplemente comprarse directamente al precio listado.",
          imagen: { src: "/bootcamp/mod14-lec8/buy-nft-directly.png", alt: "Comprar NFT directamente" },
        },
        {
          titulo: "",
          texto: "Algunos marketplaces también permiten hacer ofertas por listados que actualmente no están en venta, o proponer precios marginalmente inferiores al precio listado.",
          imagen: { src: "/bootcamp/mod14-lec8/make-an-offer-for-nft.png", alt: "Hacer una oferta por un NFT" },
        },
        {
          titulo: "Revisar y confirmar la transacción",
          texto: "Una vez elegido un NFT, el marketplace generalmente te pedirá que verifiques los detalles de la compra: dirección pública del destinatario del pago, precio total del NFT, tarifas de gas estimadas y precio total de compra. Ten en cuenta que los precios de los NFTs y las tarifas de gas pueden cambiar cada pocos segundos. ¡Haz previsiones para las fluctuaciones de precio Y de gas!",
          imagen: { src: "/bootcamp/mod14-lec8/nft-transaction-example.png", alt: "Ejemplo de transacción NFT" },
        },
        {
          titulo: "",
          texto: "Una vez que apruebas la transacción, el marketplace puede tardar desde unos pocos segundos hasta varios minutos en reflejar tu compra. OpenSea, por ejemplo, muestra tus compras de NFTs en el perfil de tu cuenta. Puedes ver tus saldos de monedas y activos (incluidos NFTs) en portfolio.metamask.io o en la app móvil de MetaMask.",
          imagen: { src: "/bootcamp/mod14-lec8/nft-purchase.png", alt: "Compra de NFT" },
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-14-9",
      titulo: "5 consejos útiles para compradores y propietarios de NFTs",
      resumen: "Si planeas comprar NFTs, aquí tienes 5 consejos para maximizar tus inversiones.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/tips-for-nft-buyers",
      contenido: [
        {
          titulo: "1. Protege tu cartera",
          texto: "Si no puedes proteger NFTs que valen 30 dólares, ¿cómo vas a proteger activos de 300 o 3.000 dólares? Conoce las distintas billeteras cripto y NFT del mercado y elige una o dos que se adapten a tus necesidades. Invierte en una billetera fría si planeas hacer HODL de NFTs a largo plazo. Usa gestores de contraseñas, autenticación en dos pasos (2FA) y apps de autenticación para dificultar al máximo que los estafadores te roben monedas y NFTs.",
          imagen: { src: "/bootcamp/mod14-lec9/2fa-login.png", alt: "Login con 2FA" },
        },
        {
          titulo: "",
          texto: "Infórmate sobre las estafas de phishing que buscan obtener los detalles de tu cuenta/billetera NFT a través de formularios falsos en Twitter, Discord o 'airdrops' de nuevos proyectos. Del mismo modo, ten cuidado con las estafas de catfishing que imitan marketplaces legítimos, sitios web de proyectos y cuentas de redes sociales de influencers para conseguir que compartas los datos de tu billetera.",
        },
        {
          titulo: "2. Conoce el PRODUCTO",
          texto: "Al igual que no comprarías una acción o una propiedad inmobiliaria sin antes hacer tu investigación, tampoco deberías comprar NFTs sin conocer su valor. ¿El vendedor está vendiendo trabajo original? ¿O el diseño fue sacado del catálogo de un artista desprevenido? ¿El NFT comete infracción de derechos de autor? Si es así, probablemente no deberías comprar NFTs de memes de tus franquicias favoritas de la infancia. ¿Seguirá teniendo valor el NFT incluso durante un invierno cripto? Recuerda que la mayoría de los NFTs están denominados en criptomonedas: un mercado bajista puede arrastrar el valor de tu NFT.",
          imagen: { src: "/bootcamp/mod14-lec9/NFT-buyer.png", alt: "Comprador de NFT" },
        },
        {
          titulo: "3. Conoce al VENDEDOR",
          texto: "Incluso las obras de arte o tokens originales pueden perder valor si su popularidad se basa en el hype. ¿Quién está 'vendiendo' el NFT? ¿Son celebridades y 'líderes de opinión' pagados para decir 'confía en mí, esta colección va a la luna'? ¿O quizás el FOMO proviene de un grupo dedicado de 'primeros adoptantes' que se preparan para dumpear después del pump? Busca comunidades fuertes y resilientes que estén genuinamente entusiasmadas con un proyecto. Si hay demanda real, hay más posibilidades de que tu NFT continúe ganando valor.",
          imagen: { src: "/bootcamp/mod14-lec9/shady-nft-seller.png", alt: "Vendedor de NFT sospechoso" },
        },
        {
          titulo: "4. Conoce la PLATAFORMA",
          texto: "Si realmente quieres maximizar tus inversiones en NFTs, también debes ser consciente de las tarifas de red o blockchain que pueden recortar tus ganancias. Ten en cuenta las restricciones de los marketplaces que pueden limitar cómo compras, vendes o intercambias tus NFTs.",
          imagen: { src: "/bootcamp/mod14-lec9/nft-platform-opensea.png", alt: "Plataforma NFT" },
        },
        {
          titulo: "5. Inspírate en la comunidad",
          texto: "¿Planeas comprar bajo y vender alto para alcanzar el éxito en inversiones NFT? Puedes seguir a compradores populares de NFTs o artistas que puedan señalarte las tendencias futuras. Con suerte, incluso puedes rastrear sus compras en las blockchains y hacerte con obras similares. Suscribirse a grupos y marketplaces de NFTs también puede serte útil si te interesan los drops. ¿Planeas obtener NFTs de 'mayor valor'? Intenta aplicarte o registrarte en plataformas curadas que invitan a artistas NFT más exclusivos.",
          imagen: { src: "/bootcamp/mod14-lec9/nft-community.png", alt: "Comunidad NFT" },
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo15 = [
    {
      id: "crypto-15-1",
      titulo: "¿Qué es un ETF de futuros de Bitcoin?",
      resumen: "Aprende sobre los ETFs de futuros de Bitcoin y cómo ofrecen una vía segura y accesible para exponerse a los movimientos del precio de Bitcoin.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-bitcoin-futures-ef",
      contenido: [
        {
          titulo: "¿Qué es un ETF de futuros de Bitcoin?",
          texto: "Bitcoin ha recorrido un largo camino desde sus inicios, evolucionando hasta convertirse en una oportunidad de inversión legítima. Un hito enorme en este viaje fue la aparición de los ETFs de futuros de Bitcoin (Exchange-Traded Funds). Un ETF de futuros de Bitcoin es un fondo cotizado en bolsa que rastrea el precio de los contratos de futuros de Bitcoin, en lugar del precio spot (actual) de Bitcoin en sí. Los futuros de Bitcoin son contratos que especulan sobre el precio futuro de Bitcoin. Estos contratos se negocian en exchanges regulados como el Chicago Mercantile Exchange (CME).",
        },
        {
          titulo: "¿Qué es un ETF?",
          texto: "Un ETF (Exchange-Traded Fund, o Fondo Cotizado en Bolsa) es un tipo de fondo de inversión que cotiza en bolsas de valores, similar a las acciones. Está diseñado para rastrear el rendimiento de un índice, sector o clase de activo específico, como acciones, bonos o materias primas. Cuando compras acciones de un ETF, estas representan una porción de los activos que posee el fondo. En el caso de un ETF de futuros de Bitcoin, los activos son contratos de futuros de Bitcoin.",
        },
        {
          titulo: "¿Cómo funciona un ETF de futuros de Bitcoin?",
          texto: "Un ETF de futuros de Bitcoin opera invirtiendo en contratos de futuros de Bitcoin en lugar de comprar Bitcoin directamente. Estos contratos de futuros son acuerdos para comprar o vender Bitcoin a un precio predeterminado en una fecha futura específica. El rendimiento del ETF está vinculado a los movimientos de precio de estos contratos de futuros. Al comprar un ETF de futuros de Bitcoin, esencialmente estás especulando sobre si el mercado de Bitcoin subirá o bajará. Por ejemplo, considera un ETF de futuros de Bitcoin con un contrato para comprar 5 Bitcoin a un precio predeterminado de $65.000 en seis meses:",
          puntos: [
            "Si el precio actual de Bitcoin cae a $55.000, el valor del ETF disminuirá.",
            "Si el precio actual sube a $75.000, el valor del ETF aumentará.",
            "El valor de tu participación cambia según la ganancia probable del ETF.",
          ],
        },
        {
          titulo: "",
          texto: "El gestor del ETF generalmente renueva los contratos de futuros antes de que expiren. Esto significa que a medida que un contrato se acerca a su fecha de vencimiento, el gestor lo vende y compra otro contrato con una fecha de vencimiento posterior. Este proceso ayuda al ETF a mantener exposición a los movimientos de precio de Bitcoin sin tener que poseer la criptomoneda.",
        },
        {
          titulo: "Beneficios de los ETFs de futuros de Bitcoin",
          texto: "Los ETFs de futuros de Bitcoin ofrecen varias ventajas:",
          puntos: [
            "Accesibilidad: Permiten ganar exposición a Bitcoin sin necesidad de configurar una billetera digital o navegar por exchanges de criptomonedas. Se pueden comprar y vender a través de cuentas de corretaje tradicionales.",
            "Comodidad: Puedes operar el ETF como cualquier otra acción o fondo cotizado.",
            "Regulación: Al cotizar en exchanges regulados, ofrecen un nivel de supervisión y seguridad que suele faltar en el mercado cripto en general.",
            "Diversificación: Incluirlos en un portafolio diversificado puede dar exposición al mercado cripto sin necesidad de inversión directa en Bitcoin.",
            "Liquidez: Los ETFs son generalmente muy líquidos, lo que facilita comprar y vender participaciones en el mercado abierto.",
          ],
        },
        {
          titulo: "Riesgos de los ETFs de futuros de Bitcoin",
          texto: "Sin embargo, también existen riesgos a considerar:",
          puntos: [
            "Volatilidad: Bitcoin es conocido por su extrema volatilidad de precios, y esta característica se extiende a sus futuros. Prepárate para oscilaciones de precio significativas.",
            "Contango y backwardation: La renovación de contratos de futuros puede generar contango (cuando los precios de futuros son más altos que el precio spot, lo que genera pérdidas potenciales con el tiempo) o backwardation (lo contrario, que puede jugar a tu favor).",
            "Errores de seguimiento: Los ETFs de futuros de Bitcoin puede que no rastreen perfectamente el precio spot de Bitcoin debido a la complejidad de gestionar contratos de futuros.",
            "Comisiones: Los ETFs cobran comisiones de gestión que pueden reducir los rendimientos potenciales.",
          ],
        },
        {
          titulo: "¿Poseer Bitcoin directamente es necesario?",
          texto: "Aunque parezca contradictorio, no poseer Bitcoin directamente puede ser un beneficio para algunos inversores. Las razones incluyen los riesgos de seguridad al almacenar Bitcoin en una billetera digital (vulnerable a hackeos o pérdidas), la complejidad de custodia, los requisitos de cumplimiento regulatorio (AML y KYC), y el riesgo de contraparte. Sin embargo, este beneficio no aplica a todos. Los inversores que se sienten cómodos con los riesgos de la posesión directa, quieren mantener Bitcoin a largo plazo, o valoran la naturaleza descentralizada de Bitcoin y prefieren controlar sus propios activos, pueden preferir comprar Bitcoin directamente.",
        },
        {
          titulo: "Ejemplos de ETFs de futuros de Bitcoin",
          texto: "Varios ETFs de futuros de Bitcoin se han lanzado en los últimos años:",
          puntos: [
            "BITO – ProShares Bitcoin Strategy ETF: Lanzado en octubre de 2021, fue el primer ETF de futuros de Bitcoin aprobado por la SEC de EE.UU. Invierte principalmente en contratos de futuros de Bitcoin negociados en el CME.",
            "BTF – Valkyrie Bitcoin Strategy ETF: Invierte en contratos de futuros de Bitcoin para rastrear el rendimiento de Bitcoin.",
            "BITS – Global X Blockchain & Bitcoin Strategy ETF: Combina inversiones en futuros de Bitcoin con exposición a empresas blockchain.",
            "BITC – Bitwise Bitcoin Strategy ETF: Busca apreciación de capital a largo plazo a través de exposición gestionada a contratos de futuros de Bitcoin.",
          ],
        },
        {
          titulo: "Conclusión",
          texto: "Los ETFs de futuros de Bitcoin representaron un paso significativo en la evolución de los productos de inversión en criptomonedas. Ofrecen una forma regulada, accesible y potencialmente menos arriesgada de ganar exposición a los movimientos de precio de Bitcoin. Sin embargo, conllevan sus propios riesgos y complejidades que los inversores deben comprender. Como con cualquier inversión, es importante hacer tu propia investigación (DYOR) y considerar tu tolerancia al riesgo y tus objetivos de inversión antes de adentrarte en los ETFs de futuros de Bitcoin.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-15-2",
      titulo: "¿Qué es un ETF de Bitcoin al contado?",
      resumen: "Los ETFs de Bitcoin al contado hacen que invertir en Bitcoin sea fácil y accesible. Descubre cómo funcionan y por qué son populares para principiantes.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-spot-bitcoin-etf",
      contenido: [
        {
          titulo: "¿Qué son los ETFs de Bitcoin al contado?",
          texto: "Imagina invertir en Bitcoin sin las complicaciones de gestionar billeteras digitales o preocuparte por amenazas cibernéticas. Los ETFs de Bitcoin al contado son productos financieros que te permiten ganar exposición a Bitcoin sin tener que poseer la criptomoneda directamente. A diferencia de los ETFs de futuros de Bitcoin, que derivan su valor de contratos de futuros, los ETFs de Bitcoin al contado están directamente vinculados al precio de mercado actual (el 'precio spot') de Bitcoin. Esto significa que el ETF posee Bitcoin real, proporcionando a los inversores una forma más directa y sencilla de invertir en la criptomoneda.",
        },
        {
          titulo: "¿Qué es un ETF?",
          texto: "Un ETF (Exchange-Traded Fund, o Fondo Cotizado en Bolsa) es un tipo de fondo de inversión que cotiza en bolsas de valores, similar a las acciones individuales. Los ETFs suelen contener una colección de activos como acciones, bonos o materias primas, y permiten a los inversores comprar participaciones del fondo. Un ETF de Bitcoin al contado es un tipo específico de ETF que posee Bitcoin directamente. Al comprar participaciones de un ETF de Bitcoin al contado, puedes ganar exposición a los movimientos de precio de Bitcoin sin tener que comprar, almacenar ni gestionar la criptomoneda directamente. El valor del ETF está vinculado al precio de mercado actual de Bitcoin.",
        },
        {
          titulo: "ETFs de Bitcoin vs. ETPs: ¿Cuál es la diferencia?",
          texto: "En los medios financieros, probablemente te encontrarás con los términos 'Bitcoin ETPs' y 'Bitcoin ETFs'. Técnicamente, el término correcto es: Bitcoin ETP. Un ETP (Exchange-Traded Product, o Producto Cotizado en Bolsa) es un término amplio para inversiones que se pueden comprar y vender en el mercado de valores. Un ETF es un tipo específico de ETP que rastrea un grupo de inversiones para reducir el riesgo. Las nuevas inversiones en Bitcoin aprobadas en enero de 2024 por la SEC solo rastrean un activo: Bitcoin, por lo que son más correctamente llamados Bitcoin ETPs, aunque la mayoría de la gente sigue usando el término 'ETF'.",
        },
        {
          titulo: "¿Cómo funcionan los ETFs de Bitcoin al contado?",
          texto: "Los ETFs de Bitcoin al contado hacen el trabajo pesado por ti. Estos ETFs se sumergen en el mercado cripto, comprando y manteniendo Bitcoin real. Lo almacenan en cuentas de custodia ultra-seguras, a menudo usando almacenamiento en frío (cold storage) para protegerse de hackers. Cotizados en las principales bolsas de valores, puedes comprar y vender participaciones del ETF igual que cualquier otra acción, beneficiándote de los movimientos de precio de Bitcoin sin el drama cripto habitual. En el gráfico siguiente puedes ver un ejemplo de un ETF de Bitcoin al contado (línea negra) siguiendo de cerca el precio de Bitcoin (velas):",
          imagen: { src: "/bootcamp/mod15-lec2/spot-bitcoin-etf-vs-spot-bitcoin.png", alt: "Bitcoin vs. ETF de Bitcoin al contado" },
        },
        {
          titulo: "Ejemplo de operación con ETF de Bitcoin al contado",
          texto: "Imagina a Sara, una inversora intrigada por Bitcoin pero cautelosa con gestionar la criptomoneda directamente. Decide invertir en un ETF de Bitcoin al contado, el XYZ Bitcoin ETF, que cotiza en bolsa. Compra 10 participaciones a $50 cada una (total: $500). Al mes siguiente, el precio de Bitcoin sube un 20%. El ETF, siguiendo de cerca a Bitcoin, también sube. Las participaciones de Sara ahora valen $60 cada una. Satisfecha con sus ganancias, vende sus 10 participaciones a $60 cada una, obteniendo $600. Ganó $100 sin lidiar con billeteras, claves privadas ni riesgos de seguridad.",
        },
        {
          titulo: "Beneficios de los ETFs de Bitcoin al contado",
          puntos: [
            "Accesibilidad: Hacen Bitcoin accesible a una gama más amplia de personas, incluidas las que no se sienten cómodas invirtiendo directamente en criptomonedas.",
            "Simplicidad y comodidad: Ganas exposición a Bitcoin sin necesidad de gestionar billeteras, claves privadas ni preocupaciones de seguridad.",
            "Liquidez: Son instrumentos altamente líquidos que permiten comprar y vender participaciones fácilmente.",
            "Transparencia: Los inversores se benefician de divulgaciones claras y frecuentes de las tenencias de Bitcoin.",
            "Supervisión regulatoria: Están sujetos a regulaciones de autoridades financieras, proporcionando una capa adicional de seguridad y confianza.",
            "Protección del inversor: Suelen incluir salvaguardias como seguros para el Bitcoin en custodia.",
            "Eficiencia fiscal: Dependiendo de la jurisdicción, los ETFs pueden ofrecer ventajas fiscales sobre la compra directa de Bitcoin.",
          ],
          texto: "",
        },
        {
          titulo: "Riesgos de los ETFs de Bitcoin al contado",
          puntos: [
            "Volatilidad de mercado: Bitcoin es conocido por sus significativas oscilaciones de precio, y este riesgo es inherente a los ETFs de Bitcoin al contado también.",
            "Incertidumbre regulatoria: El entorno regulatorio para criptomonedas y productos financieros relacionados sigue evolucionando.",
            "Riesgos de custodia: Aunque los custodios implementan medidas de seguridad robustas, siempre existe un riesgo residual de robo o pérdida del Bitcoin subyacente.",
            "Horarios de trading limitados: Bitcoin está disponible 24/7, pero los ETFs solo se pueden comprar o vender durante el horario del mercado de valores. Podrías perder oportunidades si el precio cambia significativamente por la noche o en fines de semana.",
            "Errores de seguimiento: Aunque los ETFs al contado intentan seguir el precio de Bitcoin de cerca, puede haber pequeñas discrepancias debido a comisiones y otros factores operativos.",
          ],
          texto: "",
        },
        {
          titulo: "Cómo invertir en ETFs de Bitcoin al contado",
          texto: "Para invertir en ETFs de Bitcoin al contado, necesitas abrir una cuenta de inversión (cuenta de corretaje individual, conjunta o incluso una IRA). Pasos básicos:",
          puntos: [
            "Elige un bróker: Abre una cuenta con un bróker de buena reputación que ofrezca ETFs de Bitcoin al contado.",
            "Financia tu cuenta: Transfiere dinero a tu cuenta de corretaje.",
            "Investiga los ETFs disponibles: Compara comisiones, precisión de seguimiento y volumen de operaciones.",
            "Realiza una orden: Usa la plataforma de trading de tu bróker para realizar una orden de compra del ETF de tu elección.",
            "Monitorea tu posición: Sigue el rendimiento de tu posición y cómo se compara con el precio de Bitcoin.",
          ],
        },
        {
          titulo: "Ejemplos de ETFs de Bitcoin al contado",
          texto: "Algunos ejemplos destacados de ETFs de Bitcoin al contado disponibles:",
          puntos: [
            "GBTC – Grayscale Bitcoin Trust: Cotiza en NYSE Arca. Fue el primer vehículo de inversión en Bitcoin cotizado públicamente.",
            "BITB – Bitwise Bitcoin ETF: Cotiza en NYSE Arca, conocido por sus rigurosas medidas de seguridad y precios transparentes.",
            "HODL – VanEck Bitcoin Trust: Disponible en Cboe BZX, enfocado en soluciones de inversión de nivel institucional.",
            "ARKB – ARK 21Shares Bitcoin ETF: Cotiza en Cboe BZX, colaboración entre ARK Invest y 21Shares.",
            "FBTC – Fidelity Wise Origin Bitcoin Fund: Cotiza en Cboe BZX, beneficia de la extensa infraestructura financiera de Fidelity.",
            "IBIT – iShares Bitcoin Trust: Parte de la suite iShares de BlackRock, cotiza en Nasdaq.",
            "BTCW – WisdomTree Bitcoin Fund: Disponible en Cboe BZX, ofrece acceso transparente y regulado a Bitcoin.",
            "BRRR – Valkyrie Bitcoin Fund: Cotiza en Nasdaq, proporciona acceso institucional a Bitcoin.",
          ],
        },
        {
          titulo: "¿Qué tan grande puede llegar a ser el mercado de ETFs de Bitcoin al contado?",
          texto: "Con estimaciones que sugieren decenas de miles de millones de dólares en inversiones, los ETFs de Bitcoin podrían convertirse en lo más grande desde el propio Bitcoin. El crecimiento del mercado de ETFs de Bitcoin puede compararse con el éxito de los ETFs de oro: el SPDR Gold Shares (GLD) tiene más de $60.000 millones en activos bajo gestión. Dado que Bitcoin es aceptado cada vez más como 'oro digital', es plausible que los ETFs de Bitcoin puedan alcanzar una penetración de mercado similar o incluso mayor. La aprobación y adopción de ETFs de Bitcoin no se limita a Estados Unidos; regiones como Canadá y Europa también los han aprobado, ampliando el mercado.",
        },
        {
          titulo: "Conclusión",
          texto: "Los ETFs de Bitcoin al contado ofrecen una forma conveniente y regulada para que los inversores ganen exposición a los movimientos de precio de Bitcoin sin las complejidades de poseer la criptomoneda directamente. A medida que el mercado de criptomonedas evoluciona, los ETFs de Bitcoin al contado están posicionados para jugar un papel fundamental en tender el puente entre las finanzas tradicionales (TradFi) y el mundo de los activos digitales. Recuerda: el mercado cripto es conocido por su volatilidad, y el rendimiento pasado NO garantiza resultados futuros. Es crucial hacer tu propia investigación (DYOR), entender los riesgos involucrados y considerar consultar con un asesor financiero antes de tomar decisiones de inversión.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-15-3",
      titulo: "ETFs de Bitcoin al contado: ¿Impulsan el precio o simplemente lo siguen?",
      resumen: "Descubre si los flujos de los ETFs de Bitcoin al contado impulsan los precios o simplemente siguen la ola del mercado.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/bitcoin-price-impact-of-spot-etf-flows",
      contenido: [
        {
          titulo: "Enero de 2024: Wall Street se une a la fiesta de Bitcoin",
          texto: "¿Recuerdas el 10 de enero de 2024? La SEC de EE.UU. finalmente aprobó los ETFs de Bitcoin al contado después de años de rechazos. Once de ellos. ¡Todos a la vez! Los volúmenes de trading explotaron a $4-5 mil millones el primer día. El iShares Bitcoin Trust (IBIT) de BlackRock batió récords, convirtiéndose en el ETF más rápido de la historia en alcanzar tanto $10.000 millones como luego $50.000 millones en activos.",
          imagen: { src: "/bootcamp/mod15-lec3/bitcoin-etf-nav.png", alt: "NAV de ETFs de Bitcoin" },
        },
        {
          titulo: "La gran pregunta",
          texto: "La pregunta clave que esta lección explora: ¿Estos flujos realmente impulsan el precio de Bitcoin, o simplemente reflejan las mismas fuerzas de mercado que moverían el precio de todas formas? En otras palabras, ¿las entradas y salidas de los ETFs de Bitcoin están activamente empujando el precio hacia arriba o hacia abajo, o simplemente están reflejando la demanda y el sentimiento más amplios que ya existen en el mercado?",
          imagen: { src: "/bootcamp/mod15-lec3/btc-etf-flows-vs-btc-price.png", alt: "Flujos de ETFs de Bitcoin vs precio de BTC" },
        },
        {
          titulo: "¿Por qué importa esto?",
          texto: "Entender si los flujos de ETFs impulsan o reflejan el precio de Bitcoin te ayuda a interpretar los movimientos del mercado:",
          puntos: [
            "Si los flujos de ETFs son un impulsor principal, seguirlos podría ayudar a predecir cambios de precio.",
            "Si son principalmente un reflejo, son más un barómetro del sentimiento existente, no un indicador adelantado.",
          ],
        },
        {
          titulo: "¿Cómo funcionan estos ETFs de Bitcoin?",
          texto: "A diferencia de los ETFs basados en futuros, los ETFs al contado poseen Bitcoin real directamente. La magia ocurre a través del mecanismo de 'creación/redención':",
          puntos: [
            "Creación (cuando aumenta la demanda de ETF): Los traders compran participaciones del ETF, empujando su precio por encima del valor real de Bitcoin (NAV). Los 'Participantes Autorizados' (APs) entregan efectivo al emisor del ETF. El emisor compra Bitcoin real con ese efectivo. El emisor crea nuevas participaciones del ETF para el AP. El AP vende esas participaciones al precio de mercado más alto.",
            "Redención (cuando cae la demanda): Los traders venden participaciones del ETF, empujando el precio por debajo del NAV. Los APs compran las participaciones más baratas. Los APs devuelven esas participaciones al emisor. El emisor vende Bitcoin y entrega efectivo al AP.",
          ],
        },
        {
          titulo: "Flujos diarios de ETFs de Bitcoin",
          texto: "Este gráfico muestra los flujos diarios (en USD) para los ETFs de Bitcoin al contado que rastrean el precio actual de BTC, específicamente BlackRock (IBIT), Grayscale Bitcoin Trust (GBTC), Grayscale Bitcoin Mini Trust ETF (BTC), Fidelity (FBTC), Ark Invest/21Shares (ARKB), Bitwise (BITB), Franklin (EZBC), Invesco/Galaxy (BTCO), VanEck (HODL), Valkyrie (BRRR), WisdomTree (BTCW) y Hashdex (DEFI).",
          imagen: { src: "/bootcamp/mod15-lec3/bitcoin-etf-flows.png", alt: "Flujos diarios de ETFs de Bitcoin" },
        },
        {
          titulo: "¿Los flujos de ETFs impulsan el precio de Bitcoin?",
          texto: "La investigación muestra una relación positiva entre los flujos de ETFs y el precio de Bitcoin, pero es complicada:",
          puntos: [
            "Existe correlación: Cuando el dinero fluye hacia los ETFs, el precio de Bitcoin tiende a subir (y viceversa), pero la fuerza de esta relación varía considerablemente con el tiempo.",
            "Cierto poder predictivo: Los flujos de ETFs del día anterior pueden ayudar a predecir los movimientos de precio de BTC del día siguiente.",
            "Escala masiva: En algunos momentos, las compras diarias de ETFs han sido 5 veces mayores que el nuevo BTC minado.",
            "Eventos de mercado: Los precios récord de Bitcoin a menudo han seguido períodos de fuertes entradas de ETFs.",
          ],
        },
        {
          titulo: "El gran debate: ¿Impulsor o reflejo?",
          texto: "La visión del 'impulsor' sostiene que los ETFs activamente empujan el precio de Bitcoin porque: el mecanismo de creación/redención directamente requiere comprar/vender Bitcoin real; los ETFs desbloquearon dinero institucional MASIVO que estaba al margen; y la demanda de ETFs ha sido a veces 5 veces mayor que la nueva oferta de Bitcoin. Por otro lado, la visión del 'reflejo' argumenta que los ETFs mayormente reflejan lo que ya está ocurriendo porque: tanto los flujos de ETFs como el precio pueden estar reaccionando a las mismas noticias o el mismo sentimiento del mercado; y las grandes salidas frecuentemente ocurren DESPUÉS de que caen los precios, sugiriendo reacción más que causalidad.",
        },
        {
          titulo: "La realidad: es un bucle de retroalimentación",
          texto: "Los datos sugieren fuertemente que los flujos de ETFs son tanto un impulsor COMO un reflejo, operando en un sistema reflexivo. El bucle de retroalimentación positiva: las entradas iniciales de ETFs empujan los precios de Bitcoin más alto → los precios más altos generan cobertura mediática positiva → el FOMO atrae más inversores → más compras de ETFs empujan los precios aún más alto. El bucle de retroalimentación negativa: la caída de precios genera miedo → los inversores venden participaciones de ETFs → los emisores de ETFs venden Bitcoin subyacente → las caídas de precios adicionales amplían el pánico.",
        },
        {
          titulo: "Otras fuerzas que mueven el precio de Bitcoin",
          texto: "Los flujos de ETFs no operan en aislamiento. Varios factores interactúan con los efectos de los ETFs:",
          puntos: [
            "Condiciones macroeconómicas: Inflación, tasas de interés e incertidumbre económica.",
            "Dinámica de oferta de Bitcoin: Oferta limitada y el evento del 'halving' de abril de 2024.",
            "Regulación: Las decisiones gubernamentales sobre cripto pueden causar grandes movimientos de precio.",
            "Psicología de mercado: FOMO (miedo a perderse algo) y FUD (miedo, incertidumbre, duda).",
            "Influencia en redes sociales: Los influencers cripto y el sentimiento de la comunidad amplían las tendencias.",
            "Cambios tecnológicos: Mejoras en Bitcoin o competencia de otras criptomonedas.",
          ],
        },
        {
          titulo: "Lo que esto significa para tu estrategia de trading",
          texto: "Si buscas incorporar los flujos de ETFs en tu estrategia de trading, aquí está tu plan de acción:",
          puntos: [
            "Rastrea los flujos, pero contextualízalos: Los flujos significativos y sostenidos importan, pero son una pieza de un rompecabezas más grande.",
            "Observa las divergencias de flujos: Cuando los flujos y los precios se mueven en direcciones opuestas, algo interesante está ocurriendo.",
            "Ten en cuenta el retraso de tiempo: Los flujos reportados hoy reflejan las operaciones de ayer (liquidación T+1).",
            "Observa el volumen de trading de ETFs: Los días de alto volumen probablemente predigan datos de flujo significativos al día siguiente.",
            "Estate alerta a los efectos de amplificación: Los mecanismos de ETFs pueden magnificar tanto los movimientos de precio hacia arriba como hacia abajo.",
            "Anticipa posibles reversiones: Alrededor del 38% de los movimientos de precio impulsados por flujos tienden a revertirse dentro de cinco días.",
            "Sigue los patrones institucionales: A medida que más instituciones adopten Bitcoin en sus modelos, los flujos pueden volverse más estables y predecibles.",
          ],
        },
        {
          titulo: "Herramientas gratuitas para rastrear flujos de ETFs de Bitcoin",
          texto: "¿Quieres monitorear estos flujos tú mismo? Aquí tienes algunos recursos gratuitos:",
          imagen: { src: "/bootcamp/mod15-lec3/dellph-bitcoin-etf-chart.png", alt: "Flujos de ETFs de Bitcoin en Delphi Digital" },
        },
        {
          titulo: "",
          texto: "Recursos disponibles para rastrear los flujos de ETFs de Bitcoin:",
          puntos: [
            "CoinGlass: Ofrece un rastreador completo de ETFs de Bitcoin con datos en tiempo real de entradas y salidas para todos los principales ETFs de Bitcoin al contado.",
            "SoSoValue: Panel de ETFs de Bitcoin con acceso gratuito a entradas/salidas netas diarias, entradas netas acumuladas y visualizaciones de datos históricos.",
            "The Block: Publica gráficos diarios que rastrean los flujos de ETFs de Bitcoin al contado (en USD) para fondos principales como BlackRock, Fidelity y Grayscale.",
            "Delphi Digital: Proporciona una herramienta interactiva que muestra flujos netos diarios para ETFs de Bitcoin.",
          ],
        },
        {
          titulo: "Conclusión",
          texto: "Los ETFs de Bitcoin al contado han alterado fundamentalmente el panorama del mercado cripto. Sus flujos influyen en el precio a través de mecánicas de mercado directas, mientras que simultáneamente son influenciados por el precio a través de la psicología del inversor. No es una situación de uno u otro: es ambos. Los flujos de ETFs operan dentro de un sistema reflexivo donde causa y efecto se difuminan. Para los traders, los flujos de ETFs son ahora uno de tus indicadores más valiosos. Pero como cualquier indicador, funcionan mejor cuando se combinan con el contexto de mercado más amplio en lugar de verlos en aislamiento.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-15-4",
      titulo: "¿Qué es un ETF de Ether al contado?",
      resumen: "Descubre los ETFs de ether (ETH) al contado: una forma más sencilla de invertir en Ethereum sin necesidad de billeteras ni exchanges cripto.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-a-spot-ether-etf",
      contenido: [
        {
          titulo: "El lanzamiento de los ETFs de Ether al contado",
          texto: "La reciente aprobación y lanzamiento de los ETFs de ether (ETH) al contado en Estados Unidos marcó un hito significativo en el panorama de inversión en criptomonedas. El 23 de julio de 2024, nueve ETFs de ether al contado de ocho emisores diferentes recibieron la aprobación de la SEC de EE.UU. y comenzaron a cotizar. Estos productos financieros proporcionan a los inversores exposición directa al precio del ether, la criptomoneda nativa de la blockchain de Ethereum, a través de cuentas de corretaje tradicionales.",
        },
        {
          titulo: "¿Qué es Ether (ETH)?",
          texto: "Ether (ETH) es la criptomoneda nativa de la red blockchain de Ethereum. Creado por Vitalik Buterin y lanzado en 2015, el ether sirve tanto como moneda digital como el 'combustible' que alimenta el ecosistema de Ethereum. A diferencia de las monedas tradicionales, el ether está diseñado para habilitar contratos inteligentes y aplicaciones descentralizadas (dApps) en la plataforma Ethereum, lo que lo convierte en algo más que un simple medio de intercambio. Como la segunda criptomoneda más grande por capitalización de mercado, el ether juega un papel crucial en el panorama más amplio de blockchain y las finanzas descentralizadas (DeFi). Se utiliza para pagar las tarifas de transacción (conocidas como gas) en la red de Ethereum, para ejecutar contratos inteligentes, y como reserva de valor. Tras la transición de Ethereum al mecanismo de consenso de Prueba de Participación (PoS) en 2022, el ether también se ha vuelto fundamental para la seguridad y operación de la red a través del staking.",
        },
        {
          titulo: "¿Qué son los ETFs de Ether al contado?",
          texto: "Los ETFs de ether al contado son fondos de inversión que rastrean el precio de mercado actual del ether. A diferencia de los ETFs basados en futuros, que derivan su valor de contratos para comprar o vender ether en una fecha futura, los ETFs al contado poseen la criptomoneda real en sus reservas. Esto significa que el valor de un ETF de ether al contado refleja directamente las fluctuaciones de precio del ether en el mercado.",
        },
        {
          titulo: "ETFs de Ether vs. ETPs: ¿Cuál es la diferencia?",
          texto: "En los medios financieros, encontrarás los términos 'ether ETPs' y 'ether ETFs'. Técnicamente, el término correcto es ether ETP, ya que un ETP es un término amplio para inversiones que pueden comprar y venderse en el mercado de valores, mientras que un ETF es un tipo específico de ETP que rastrea un grupo de inversiones. Los nuevos productos de ether aprobados solo rastrean un activo: ether. Por eso son más correctamente llamados ether ETPs, aunque la mayoría continúa usando el término ETF.",
        },
        {
          titulo: "¿Cómo funcionan los ETFs de Ether al contado?",
          texto: "Los ETFs de ether al contado funcionan de manera similar a los ETFs tradicionales. Cuando compras participaciones de un ETF de ether al contado, esencialmente estás comprando una participación en las tenencias de ether del fondo. El proveedor del ETF es responsable de gestionar los activos del fondo, incluyendo la compra y el almacenamiento seguro del ether.",
        },
        {
          titulo: "Ejemplo de operación con ETF de Ether al contado",
          texto: "Supongamos que quieres invertir en Ether (ETH) a través de un ETF de ether al contado. Detalles del ETF: Nombre: Ether ETF (ETHTR), Exchange: NYSE Arca, Valor Activo Neto (NAV): $25,00 por participación, Ratio de gastos: 0,95% anual. Ejemplo de trade: compras 100 participaciones a $25,50 cada una (ligeramente por encima del NAV), con una inversión total de $2.550. Escenario 1 (ETH sube 10%): el nuevo NAV es $27,50 por participación; tus 100 participaciones valen ahora $2.750. Escenario 2 (ETH baja 10%): el nuevo NAV es $22,50 por participación; tus 100 participaciones valen ahora $2.250.",
        },
        {
          titulo: "Beneficios de los ETFs de Ether al contado",
          puntos: [
            "Accesibilidad: Puedes comprar y vender participaciones a través de tus cuentas de corretaje habituales, sin necesidad de exchanges de criptomonedas ni billeteras.",
            "Regulación: Están regulados por autoridades financieras, lo que proporciona mayor protección y transparencia.",
            "Diversificación: Los inversores pueden incluir ETFs de ether al contado en sus portafolios para diversificar sus tenencias y ganar exposición al ecosistema de Ethereum en crecimiento.",
            "Facilidad de uso: Simplifican el proceso de invertir en ether, haciéndolo accesible a una gama más amplia de inversores.",
          ],
          texto: "",
        },
        {
          titulo: "Riesgos de los ETFs de Ether al contado",
          puntos: [
            "Volatilidad: El mercado de criptomonedas es conocido por su volatilidad, y el precio del ether puede fluctuar significativamente.",
            "Comisiones: Los ETFs de ether al contado cobran comisiones de gestión que varían según el proveedor.",
            "Seguridad: Aunque los proveedores de ETFs toman medidas para asegurar sus tenencias de ether, siempre existe un riesgo de hackeo o robo.",
          ],
          texto: "",
        },
        {
          titulo: "Ejemplos de ETFs de Ether al contado",
          texto: "Los ETFs de ether al contado disponibles actualmente incluyen:",
          puntos: [
            "ETHA – iShares Ethereum Trust (BlackRock)",
            "FETH – Fidelity Ethereum Fund",
            "CETH – 21Shares Core Ethereum ETF",
            "ETHW – Bitwise Ethereum ETF",
            "ETHV – VanEck Ethereum ETF",
            "EZET – Franklin Ethereum ETF",
            "QETH – Invesco Galaxy Ethereum ETF",
            "ETHE – Grayscale Ethereum Trust",
            "ETH – Grayscale Ethereum Mini Trust",
          ],
        },
        {
          titulo: "Tamaño y futuro del mercado",
          texto: "El primer día de trading de los ETFs de ether al contado vio más de $1.000 millones en volumen, lo que indica un fuerte interés inicial. Galaxy Digital predice que las entradas netas en ETFs de ether serán del 20 al 50% de las entradas en ETFs de Bitcoin, con una estimación de $1.000 millones al mes. El lanzamiento de los ETFs de ether al contado se espera que incremente la participación institucional y minorista en el mercado de Ethereum, y podría llevar a mayor liquidez y legitimar aún más al ether como clase de activo.",
        },
        {
          titulo: "Conclusión",
          texto: "Los ETFs de ether al contado representan un paso significativo hacia adelante para los inversores que buscan exposición al mercado de Ethereum. Al proporcionar una forma regulada y accesible de invertir en ether, estos ETFs están posicionados para democratizar el acceso al creciente mundo de las finanzas descentralizadas (DeFi) y la tecnología blockchain. La aprobación de múltiples tipos de ETFs de criptomonedas al contado señala una aceptación creciente y potencial para más ETFs de cripto en el futuro. Sin embargo, como con cualquier inversión, es importante hacer tu propia investigación (DYOR) y entender los riesgos involucrados antes de tomar cualquier decisión.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-15-5",
      titulo: "¿Impulsa el macro los precios cripto? Descubriendo los impulsores ocultos del mercado",
      resumen: "¿La macroeconomía impulsa los precios cripto? Descubre cómo las fuerzas económicas globales impactan a Bitcoin y si cripto realmente se mueve de forma independiente.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/does-macro-drive-cryptocurrency-market-trends",
      contenido: [
        {
          titulo: "¿Qué es el 'macro' y por qué importa en cripto?",
          texto: "'Macro' es simplemente una forma elegante de hablar de las grandes fuerzas que mueven todo el mundo financiero. Cuando la gente dice 'macro' o 'factores macroeconómicos globales', se refiere a las fuerzas del panorama general en la economía global: los bancos centrales (como la Reserva Federal de EE.UU.) subiendo o bajando las tasas de interés, los inversores con mayor o menor disposición a asumir riesgos, y las enormes oscilaciones en los mercados de acciones o bonos. Tradicionalmente, estas fuerzas moldean lo que le ocurre a las acciones, los bienes raíces, el oro y más. Pero, ¿cuánto moldean lo que le pasa a las criptomonedas?",
          imagen: { src: "/bootcamp/mod15-lec5/bitcoin-and-global-macro.png", alt: "Bitcoin y el macro global" },
        },
        {
          titulo: "Tres fuerzas que mueven el precio de Bitcoin",
          texto: "Los precios de Bitcoin están impulsados por tres fuerzas principales:",
          puntos: [
            "Política monetaria: Cuando los bancos centrales cambian las tasas de interés o ajustan sus balances.",
            "Sentimiento de riesgo en los mercados tradicionales: Cuando el apetito de riesgo de los inversores cambia. Básicamente, cuando Wall Street se asusta, las criptos se desploman.",
            "Factores específicos de cripto: Elementos únicos del mundo cripto, como la actividad on-chain, hackeos de exchanges cripto, tweets de Trump, Michael Saylor o Elon Musk, y cualquier situación que surja en el ecosistema cripto esa semana.",
          ],
        },
        {
          titulo: "El sorprendente poder de la Fed sobre Bitcoin",
          texto: "Uno de los descubrimientos más llamativos del análisis reciente del mercado es cuánto impacta la Reserva Federal a BTC. En 2022, cuando BTC/USD se desplomó desde alrededor de $69.000 hasta por debajo de $20.000, el análisis muestra que más de dos tercios de este descenso se debieron a la subida de tasas de interés de la Fed. En pocas palabras: si la Fed no hubiera endurecido la política monetaria en 2022, Bitcoin podría haber caído solo hasta alrededor de $40.000 en lugar de por debajo de $20.000. Esto desafía la creencia común de que Bitcoin opera de forma independiente de los sistemas financieros tradicionales. Cuando la Fed sube las tasas, se vuelve más atractivo mantener activos 'seguros' como los bonos, lo que hace que los inversores vendan activos más arriesgados, incluyendo Bitcoin.",
          imagen: { src: "/bootcamp/mod15-lec5/fed-over-bitcoin.png", alt: "La Fed influye en las criptomonedas" },
        },
        {
          titulo: "Diferentes marcos temporales, diferentes impulsores",
          texto: "Un patrón interesante surge al examinar los movimientos de precio de Bitcoin: los movimientos día a día provienen principalmente de factores específicos de cripto, mientras que las tendencias a largo plazo están mucho más influenciadas por factores macro tradicionales como la política monetaria. Esto es como el tiempo meteorológico versus el clima: el 'tiempo' diario en los mercados cripto está impulsado principalmente por noticias específicas del ecosistema, el sentimiento y la actividad de trading. Pero el 'clima' a largo plazo está significativamente influenciado por las condiciones económicas más amplias.",
        },
        {
          titulo: "Las stablecoins: el refugio seguro del cripto",
          texto: "Cuando los mercados cripto entran en modo apocalipsis, ¿adónde corren los traders? No hacia el efectivo como haría gente sensata. No: se amontonan en stablecoins como USDT y USDC.",
          imagen: { src: "/bootcamp/mod15-lec5/usd-coin.png", alt: "USD Coin (USDC)" },
        },
        {
          titulo: "",
          texto: "Las stablecoins (criptomonedas vinculadas al dólar estadounidense) actúan como un 'refugio seguro' dentro del mercado cripto. Durante períodos de estrés en el mercado cripto: los inversores venden activos volátiles como Bitcoin, mueven los fondos a stablecoins en lugar de salir completamente del cripto, y este patrón es claramente visible durante eventos como grandes colapsos de exchanges.",
        },
        {
          titulo: "Ejemplos reales: el crash del COVID-19 (marzo 2020)",
          texto: "El 12 de marzo de 2020, Bitcoin se desplomó un 37%, el peor cierre diario en siete años. Perdió el 50% de su valor en una semana (del 7 al 14 de marzo). Cuando el COVID golpeó, Bitcoin se hundió junto con las acciones mientras los inversores huían hacia activos seguros. Fue un evento clásico de 'aversión al riesgo' donde tanto los mercados tradicionales como los cripto vieron ventas masivas.",
          imagen: { src: "/bootcamp/mod15-lec5/bitcoin-chart-during-covid-crash.png", alt: "Bitcoin durante el crash del COVID" },
        },
        {
          titulo: "El Invierno Cripto de 2022",
          texto: "La industria cripto perdió más de $1 billón en valor de mercado durante 2022. Aunque todos culparon a Terra Luna, FTX y varios otros desastres cripto, el verdadero villano estaba a la vista: esto no se trató solo de problemas específicos del cripto. Las agresivas subidas de tasas de la Fed para combatir la inflación fueron el principal impulsor del declive de Bitcoin, representando aproximadamente la MITAD de la caída del 64%.",
          imagen: { src: "/bootcamp/mod15-lec5/2022-crypto-winter-chart.png", alt: "Gráfico del Invierno Cripto 2022" },
        },
        {
          titulo: "Eventos de adopción institucional (2023 - hoy)",
          texto: "Cuando grandes instituciones como BlackRock entraron al mercado de Bitcoin, fue ampliamente visto como un respaldo significativo de la legitimidad de Bitcoin como clase de activo. El precio de Bitcoin subió debido a la reducción de la percepción de riesgo, ya que los inversores vieron a Bitcoin como más seguro con participación institucional.",
          imagen: { src: "/bootcamp/mod15-lec5/blackrock-etf-crypto.png", alt: "BlackRock lanza ETF de Bitcoin" },
        },
        {
          titulo: "",
          texto: "Las conversaciones y la anticipación alrededor de un ETF de Bitcoin al contado se intensificaron en junio de 2023 cuando BlackRock presentó su solicitud. En el momento de la presentación, Bitcoin cotizaba alrededor de $25.000-$26.000. A medida que la aprobación del ETF se volvía más probable, Bitcoin escaló hasta casi $46.000 para la aprobación oficial de la SEC el 10 de enero de 2024. El rally continuó tras el lanzamiento, con Bitcoin superando los $73.000 en marzo de 2024. El interés institucional continuo, particularmente de BlackRock y Fidelity, empujó a Bitcoin por encima de $100.000 por primera vez en diciembre de 2024, alcanzando $104.010 para mayo de 2025.",
          imagen: { src: "/bootcamp/mod15-lec5/bitcoin-institutional-adoption.png", alt: "Adopción institucional de Bitcoin" },
        },
        {
          titulo: "¿Qué significa esto para los traders de cripto?",
          texto: "Presta atención al panorama general: los grandes cambios en las tasas de interés o los pánicos masivos del mercado impactarán al cripto, a veces significativamente. Pero no ignores las noticias propias del cripto: la mayoría de la montaña rusa diaria se debe a cosas que ocurren dentro del propio ecosistema. Observa los flujos de stablecoins: si el dinero está fluyendo hacia las stablecoins, es una señal de que los inversores cripto se están poniendo nerviosos. El cripto tiene su propio carácter: a pesar de estar más conectado al sistema financiero mundial, los precios cripto a menudo hacen lo suyo y pueden moverse diferente a las acciones o los bonos.",
        },
        {
          titulo: "'El cripto es macro'",
          texto: "La frase 'el cripto es macro' significa que los precios en el mercado cripto son impulsados cada vez más por factores macroeconómicos, las mismas fuerzas económicas globales amplias que afectan a los mercados financieros tradicionales. Bitcoin se comporta algo como una acción tecnológica de alto riesgo, sensible a las tasas de interés y al sentimiento del mercado más amplio, pero con volatilidad adicional específica del cripto. Cuando la Fed está subiendo las tasas agresivamente, la historia sugiere que puede que no sea el mejor momento para cargar de Bitcoin. Pero cuando la política monetaria es laxa y el apetito de riesgo es alto, los activos cripto han tenido históricamente un buen rendimiento. Ignorar los factores macro al invertir en cripto podría ser un error costoso. La Fed puede que no controle la blockchain de Bitcoin, pero sin duda influye en si la gente quiere comprarlo.",
        },
      ],
      imagenes: [],
    },
  ];

  const clasesModulo16 = [
    {
      id: "crypto-16-1",
      titulo: "¿Qué es el análisis on-chain?",
      resumen: "Descubre cómo el análisis on-chain examina datos reales de la blockchain para entender el comportamiento de los participantes del mercado, más allá de lo que muestran los gráficos de precio.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-on-chain-analysis",
      contenido: [
        {
          titulo: "Una nueva forma de leer el mercado",
          texto: "La mayoría de los traders usan análisis técnico (gráficos e indicadores) o análisis fundamental (datos macroeconómicos y noticias). El análisis on-chain ofrece un enfoque diferente. Bitcoin opera en un libro contable público descentralizado llamado blockchain, que registra cada transacción realizada con la criptomoneda. Esta transparencia permite a cualquier persona rastrear y analizar el movimiento real de bitcoins a través de la red. Al estudiar estos datos, puedes descubrir perspectivas sobre tendencias de mercado, sentimiento de inversores y actividad de la red que no son visibles mediante métodos tradicionales.",
          imagen: { src: "/bootcamp/mod16-lec1/detective-toshi.png", alt: "Detective Toshi" },
        },
        {
          titulo: "¿Qué es el análisis on-chain?",
          texto: "El análisis on-chain (también llamado análisis de blockchain) es la práctica de examinar datos de la blockchain para entender el comportamiento de los participantes dentro de una red de criptomonedas. Te permite ver lo que está ocurriendo en tiempo real al rastrear transacciones (dinero moviéndose entre carteras), saldos de carteras (cuánta cripto están reteniendo las personas) y actividad de la red (qué tan activa está la blockchain). Piensa en el análisis on-chain como ser un detective: miras el 'libro contable público' (la blockchain) para ver cómo se mueve el BTC entre carteras, qué tan activos están los usuarios y si los grandes inversores (llamados 'ballenas') están comprando o vendiendo.",
        },
        {
          titulo: "Diferencias con el análisis de mercado tradicional",
          texto: "El análisis de mercado tradicional se basa en el análisis técnico (gráficos, patrones y volumen) y el análisis fundamental (rendimiento de empresas, cifras macroeconómicas y noticias). El análisis on-chain es diferente porque usa datos de blockchain reales y verificables, es transparente (cualquiera puede comprobar los datos), y es exclusivo de las criptomonedas. Esta transparencia y granularidad crean oportunidades únicas para entender y predecir el comportamiento del mercado que no existen en las finanzas tradicionales. Algunos métricas on-chain pueden incluso señalar movimientos de precio inminentes antes de que ocurran.",
        },
        {
          titulo: "Por qué puede ser valioso",
          texto: "El análisis on-chain te da perspectivas que simplemente no puedes obtener de los gráficos de precio solos: salud de la red (cuánta gente la usa realmente), movimientos de precio y ciclos, volumen de trading y liquidez, comportamiento de inversores (si las ballenas están comprando o vendiendo), adopción y participación, sentimiento del mercado (si los inversores son alcistas o bajistas), distribución de propiedad (quién posee la cripto y qué tan concentrada está), y señales tempranas de alerta (detectar problemas antes de que afecten al precio).",
        },
        {
          titulo: "Métricas on-chain básicas de Bitcoin",
          texto: "La capitalización de mercado es el valor total de todos los bitcoins en circulación, reflejando el tamaño general del mercado.",
          imagen: { src: "/bootcamp/mod16-lec1/glassnode-studio_btc-market-cap.png", alt: "Capitalización de mercado de BTC" },
        },
        {
          titulo: "Capitalización Realizada",
          texto: "La capitalización realizada calcula el valor de Bitcoin basándose solo en las monedas que realmente se han movido, proporcionando una valoración de mercado más realista que la capitalización de mercado tradicional.",
          imagen: { src: "/bootcamp/mod16-lec1/Bitcoin-Realized-Cap.png", alt: "Capitalización realizada de Bitcoin" },
        },
        {
          titulo: "Precio Realizado",
          texto: "El precio realizado es el precio promedio que la gente pagó cuando compró o movió su bitcoin por última vez. Muestra lo que el tenedor típico de bitcoin pagó por sus monedas.",
          imagen: { src: "/bootcamp/mod16-lec1/Bitcoin-Realized-Price.png", alt: "Precio realizado de Bitcoin" },
        },
        {
          titulo: "Direcciones Activas",
          texto: "El número de direcciones de cartera únicas que envían o reciben BTC en un período determinado. Indica cuántas personas están usando activamente la red.",
          imagen: { src: "/bootcamp/mod16-lec1/glassnode-studio_btc-number-of-active-addresses.png", alt: "Direcciones activas de BTC" },
        },
        {
          titulo: "Direcciones con más de X BTC",
          texto: "Rastrea el crecimiento anual de titulares de Bitcoin en tres grupos: direcciones con al menos 0,01 BTC (pequeños tenedores), al menos 0,1 BTC (medianos tenedores) y al menos 1 BTC (grandes tenedores).",
          imagen: { src: "/bootcamp/mod16-lec1/BM-Pro-Addresses-Holding-X-BTC.png", alt: "Direcciones que poseen X BTC" },
        },
        {
          titulo: "Volumen de Transacciones",
          texto: "El número total de todas las transacciones de Bitcoin en un período determinado. Un volumen alto sugiere fuerte actividad e interés en la red.",
          imagen: { src: "/bootcamp/mod16-lec1/glassnode-studio_btc-number-of-transactions.png", alt: "Volumen de transacciones de BTC" },
        },
        {
          titulo: "Tasa de Hash",
          texto: "Mide la potencia computacional total que asegura la red de Bitcoin. Una tasa de hash más alta significa mayor seguridad y confianza en la red.",
          imagen: { src: "/bootcamp/mod16-lec1/glassnode-studio_btc-mean-hash-rate.png", alt: "Tasa de hash de BTC" },
        },
        {
          titulo: "Flujos de Exchanges",
          texto: "Rastrea cuánto bitcoin está entrando o saliendo de los exchanges. Las grandes entradas pueden señalar presión de venta, mientras que las salidas pueden indicar acumulación.",
          imagen: { src: "/bootcamp/mod16-lec1/Bitcoin-Exchange-Netflow-Total-All-Exchanges.png", alt: "Flujos netos de exchanges de Bitcoin" },
        },
        {
          titulo: "Herramientas para el análisis on-chain",
          texto: "No necesitas ser un experto técnico para empezar. Varias plataformas ofrecen herramientas y paneles de control para el análisis on-chain: Glassnode (datos y métricas on-chain completos), CryptoQuant (datos en tiempo real sobre flujos de exchanges, actividad de mineros y más), Santiment (combina información on-chain, social y de desarrollo), y Nansen (interfaz fácil de usar para extraer perspectivas de datos blockchain sin necesidad de programar). En las lecciones siguientes exploraremos las métricas on-chain más útiles, como SOPR, NUPL y flujos de exchanges, dándote herramientas para identificar mínimos, máximos y todo lo que hay en medio.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-16-2",
      titulo: "NUPL: Ganancias/Pérdidas No Realizadas Netas",
      resumen: "Aprende a usar el NUPL para medir si el mercado en su conjunto está sentado sobre ganancias o pérdidas, y cómo identificar posibles techos y suelos del mercado.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-net-unrealized-profit-loss-nupl",
      contenido: [
        {
          titulo: "La analogía del puesto de frutas",
          texto: "Imagina al dueño de un puesto de frutas que compra cajas de manzanas a diferentes precios a lo largo del año. En cualquier momento, el dueño puede mirar el precio actual del mercado y compararlo con lo que pagó por cada caja. Pero como las manzanas no se han vendido todavía, cualquier ganancia o pérdida existe solo 'en papel'. El NUPL funciona exactamente igual para Bitcoin: es una fotografía de las ganancias y pérdidas 'en papel' de todo el mercado, que te ayuda a entender si los tenedores en conjunto están sentados sobre ganancias o sufriendo pérdidas.",
          imagen: { src: "/bootcamp/mod16-lec2/nupl-analogy.png", alt: "Analogía del NUPL" },
        },
        {
          titulo: "¿Qué es el NUPL?",
          texto: "El NUPL mide la diferencia entre las ganancias y pérdidas no realizadas en el mercado de Bitcoin en relación con la capitalización total de mercado. Se calcula con esta fórmula: NUPL = (Capitalización de Mercado - Capitalización Realizada) / Capitalización de Mercado. Un NUPL positivo (> 0) indica que, en promedio, los inversores están reteniendo sus monedas con ganancias. Un NUPL negativo (< 0) sugiere que, en promedio, los inversores están reteniendo sus monedas con pérdidas. Fue desarrollado por Tuur Demeester, Tamás Blummer y Michiel Lescrauwaet.",
          puntos: [
            "Euforia/Codicia (NUPL > 0,75): Alto nivel de ganancias no realizadas, a menudo precede a los techos del mercado.",
            "Creencia/Negación (0,5 < NUPL ≤ 0,75): Los inversores tienen ganancias significativas, el mercado puede estar acercándose a un pico.",
            "Optimismo/Ansiedad (0,25 < NUPL ≤ 0,5): Ganancias moderadas; la dirección del mercado es incierta.",
            "Esperanza/Miedo (0 < NUPL ≤ 0,25): Ganancias mínimas; el mercado puede estar recuperándose de mínimos.",
            "Capitulación (NUPL < 0): Los inversores están, en promedio, en pérdidas; posible suelo del mercado.",
          ],
        },
        {
          titulo: "Cómo leer el gráfico NUPL",
          texto: "Este gráfico titulado 'BTC: NUPL Ajustado por Entidad' muestra las ganancias/pérdidas no realizadas netas de Bitcoin a lo largo del tiempo. La línea naranja es el NUPL ajustado por entidad, la línea negra es el precio spot de BTC, y las regiones de colores representan las diferentes zonas de sentimiento. Cuando el NUPL supera 0,5 (zonas verde/azul), la mayoría del mercado está en ganancia, señal típica de mercados alcistas. Cuando cae por debajo de 0 (zona roja), la mayoría está en pérdidas netas, señal frecuente de capitulación y suelos de mercado.",
          imagen: { src: "/bootcamp/mod16-lec2/btc_entity_adjusted_nupl.png", alt: "BTC: NUPL ajustado por entidad" },
        },
        {
          titulo: "Por qué importa a los traders",
          texto: "Un NUPL alto (especialmente > 0,75) significa ganancias no realizadas extremas, con riesgo de toma de ganancias y posibles techos. Históricamente, estos períodos han sido buenos momentos para reducir exposición. Un NUPL bajo (< 0) indica pérdidas generalizadas y a menudo son señales de suelo. Para mejores resultados, el NUPL debe usarse junto con otros indicadores y datos del mercado para confirmar señales y gestionar el riesgo.",
          puntos: [
            "Estrategia de compra: Considera acumular cuando el NUPL es profundamente negativo o cerca de los umbrales históricos de suelo.",
            "Estrategia de venta: Considera tomar ganancias o reducir riesgo cuando el NUPL se acerca a los umbrales históricos de techo (por encima de 0,75 o 0,8).",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-16-3",
      titulo: "Base de costo on-chain: largo y corto plazo",
      resumen: "Aprende cómo rastrear el precio promedio de compra de tenedores de largo y corto plazo para identificar niveles de soporte y resistencia, y anticipar cambios en los ciclos del mercado.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/long-short-term-on-chain-cost-basis",
      contenido: [
        {
          titulo: "La ciudad con dos grupos de residentes",
          texto: "Imagina una ciudad bulliciosa con dos grupos distintos: los residentes de larga data que llevan décadas ahí, y los recién llegados. Los veteranos han soportado cada tormenta y conocen el valor real de sus hogares; son menos propensos a vender al primer signo de problemas. Los recién llegados, en cambio, son más sensibles a los cambios del mercado. En el mundo de Bitcoin, estos dos grupos son los Tenedores a Largo Plazo (LTH) y los Tenedores a Corto Plazo (STH), y entender el precio promedio que cada grupo pagó por sus monedas revela mucho sobre el sentimiento del mercado.",
          imagen: { src: "/bootcamp/mod16-lec3/long-term-vs-short-term-groups.png", alt: "Dos grupos: largo y corto plazo" },
        },
        {
          titulo: "¿Qué es la base de costo on-chain de largo/corto plazo?",
          texto: "Esta métrica on-chain mide el precio promedio de adquisición (base de costo) de las monedas retenidas por dos grupos distintos: los Tenedores a Largo Plazo (LTH), que han retenido su Bitcoin por más de 155 días, y los Tenedores a Corto Plazo (STH), que han retenido su Bitcoin por 155 días o menos. El umbral de 155 días se basa en el análisis estadístico de los patrones de retención de bitcoin: las monedas retenidas más de 155 días son cada vez menos propensas a gastarse, representando 'manos fuertes', mientras que las monedas retenidas por menos tiempo son más probables de ser negociadas o vendidas. Supón que el precio actual de Bitcoin es $50.000: si el precio realizado LTH es $30.000 y el STH es $48.000, y el mercado cae por debajo de $48.000, muchos STH estarán en pérdidas, lo que puede aumentar la presión vendedora.",
          puntos: [
            "LTH (Tenedores a Largo Plazo): poseen BTC por más de 155 días, representan 'manos fuertes' o inversores pacientes.",
            "STH (Tenedores a Corto Plazo): poseen BTC por 155 días o menos, más reactivos a la volatilidad del precio.",
            "Precio realizado LTH (línea azul): base de costo promedio de los tenedores de largo plazo.",
            "Precio realizado STH (línea roja): base de costo promedio de los compradores recientes.",
            "Precio realizado agregado (línea naranja): base de costo promedio de toda la red.",
          ],
        },
        {
          titulo: "Cómo leer el gráfico",
          texto: "El gráfico 'Bitcoin: Base de Costo On-chain de Largo/Corto Plazo' muestra el costo base on-chain promedio para diferentes grupos de tenedores y cómo se relacionan con el precio spot de BTC a lo largo del tiempo. Cuando el precio de BTC está por encima de todos los precios realizados, la mayoría de los tenedores están en ganancia, señal típica de mercados alcistas. Cuando el precio cae por debajo de los precios realizados LTH y STH (zonas moradas), la mayoría está en pérdidas, lo que históricamente ha estado asociado con fases de capitulación y acumulación.",
          imagen: { src: "/bootcamp/mod16-lec3/bitcoin_long_short_term_on_chain_cost_basis.png", alt: "Base de costo on-chain de largo/corto plazo de Bitcoin" },
        },
        {
          titulo: "Por qué importa a los traders",
          texto: "Esta métrica ayuda a identificar cambios de régimen del mercado: cuando el precio está por debajo del precio realizado, hay subvaloración y miedo; cuando está por encima, hay riesgo de sobrevaluación o confirmación de ruptura. También sirve para detectar cruces significativos: cuando el precio realizado STH cae por debajo del LTH, a menudo señala capitulación y suelos del mercado. Los niveles de costo base actúan como soporte o resistencia psicológicos importantes. Los LTH tienden a acumular durante mercados bajistas y a distribuir durante alcistas, mientras que los STH son más reactivos a la volatilidad del precio.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-16-4",
      titulo: "SOPR: Ratio de Ganancia de Salidas Gastadas",
      resumen: "Entiende cómo el SOPR mide si los titulares de Bitcoin están vendiendo con ganancias o pérdidas, y cómo usar esta información para identificar techos, suelos y señales de continuación del mercado.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-soor",
      contenido: [
        {
          titulo: "La venta de garage del vecindario",
          texto: "Imagina una venta de garage en el vecindario donde todos llevan un registro detallado de lo que pagaron originalmente por cada artículo. Si la mayoría de vendedores ponen precios más altos de lo que pagaron, el vecindario está experimentando una 'venta con ganancias'. Si los precios son más bajos que los costos originales, es una 'venta con pérdidas'. Esto es exactamente lo que hace el SOPR para las transacciones de Bitcoin: rastrea si las monedas que se mueven en la blockchain se están transfiriendo con ganancia o pérdida en comparación con cuando fueron adquiridas.",
          imagen: { src: "/bootcamp/mod16-lec4/sopr-analogy-garage-sale.png", alt: "Analogía del SOPR con una venta de garage" },
        },
        {
          titulo: "¿Qué es el SOPR?",
          texto: "El SOPR es una métrica que nos dice si los tenedores de BTC están vendiendo con ganancia o pérdida basándose en el precio al que adquirieron originalmente sus monedas. Se calcula así: SOPR = Precio vendido / Precio pagado. El SOPR analiza cada bitcoin que se mueve (se gasta) en la blockchain y verifica qué precio tenía cuando se adquirió originalmente y cuál es el precio actual al gastarse. Luego responde: ¿está la gente moviendo/vendiendo sus monedas con ganancia o pérdida? Fue desarrollado por Renato Shirakashi. Aunque el SOPR asume que las monedas movidas están siendo vendidas, esto no siempre es cierto ya que a veces los propietarios simplemente transfieren monedas entre sus propias carteras.",
          puntos: [
            "SOPR > 1: Las monedas se están vendiendo con ganancias (mercado generalmente tomando utilidades).",
            "SOPR = 1: Las monedas están en punto de equilibrio (precio actual = precio de adquisición).",
            "SOPR < 1: Las monedas se están vendiendo con pérdidas (señal bajista o de capitulación).",
          ],
        },
        {
          titulo: "Cómo leer el gráfico SOPR",
          texto: "El gráfico 'Bitcoin: Ratio de Ganancia de Salidas Gastadas (SOPR)' muestra qué tan rentables o no rentables son las transacciones de Bitcoin al momento en que se mueven las monedas, vinculándolo con la acción del precio de BTC. Las barras verdes indican SOPR > 0 (ganancias) y las barras rojas indican SOPR < 0 (pérdidas). Durante los mercados alcistas, el SOPR se mantiene mayormente en verde (los tenedores están tomando ganancias). En los mercados bajistas, el SOPR cae al rojo (pérdidas generalizadas, venta en pánico). Los picos rojos profundos en el SOPR (especialmente en 2018, 2020, 2022 y principios de 2023) a menudo señalan suelos de capitulación.",
          imagen: { src: "/bootcamp/mod16-lec4/BM-Pro-SOPR.png", alt: "Bitcoin: Ratio de Ganancia de Salidas Gastadas (SOPR)" },
        },
        {
          titulo: "Por qué importa a los traders",
          texto: "El valor de 1 en el SOPR a menudo actúa como soporte o resistencia psicológico. En mercados alcistas, el SOPR tiende a rebotar en 1, mientras que en mercados bajistas puede permanecer por debajo de 1 durante períodos prolongados. Un restablecimiento del SOPR a 1 después de caídas a menudo actúa como señal de continuación alcista. Los picos negativos extremos del SOPR a veces se interpretan como dolor máximo y suelo local.",
          puntos: [
            "Noviembre 2022 (Colapso de FTX): El SOPR cayó bruscamente de 0,99 a 0,87, indicando que muchos inversores vendían con pérdidas. Luego el precio de Bitcoin comenzó a recuperarse.",
            "Marzo 2021 (Toma de ganancias cerca de máximos): El SOPR subió por encima de 1,15 cuando BTC se acercó a su máximo histórico de $61.000, señalando toma significativa de ganancias antes de una corrección.",
            "Julio 2021 (Restablecimiento del SOPR y continuación alcista): El SOPR cayó por debajo de 1, sugiriendo un suelo del mercado. Las manos débiles salieron y las fuertes acumularon. Luego el precio reanudó su trayectoria alcista.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-16-5",
      titulo: "MVRV: Valor de Mercado a Valor Realizado",
      resumen: "Descubre cómo el ratio MVRV compara la capitalización de mercado actual con la capitalización realizada para determinar si Bitcoin está sobrevalorado, infravalorado o en su valor justo.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-mvrv",
      contenido: [
        {
          titulo: "El puesto de mangos",
          texto: "Imagina que tienes un puesto de mangos. Los mangos en tus estantes valen cierta cantidad si los vendieras todos hoy: ese es tu valor de mercado. Ahora piensa en cuánto pagaste realmente por esos mangos cuando los compraste al proveedor: ese es tu valor realizado. Si los precios actuales de los mangos son mucho más altos de lo que pagaste, estás sentado sobre grandes ganancias, pero también estás en mayor riesgo si los precios caen. En las criptomonedas, el ratio MVRV funciona de manera similar: compara el valor total actual de todas las monedas (valor de mercado) con lo que los inversores realmente pagaron por ellas (valor realizado).",
          imagen: { src: "/bootcamp/mod16-lec5/mango-stand.png", alt: "Puesto de mangos" },
        },
        {
          titulo: "¿Qué es el ratio MVRV?",
          texto: "MVRV significa 'Market Value to Realized Value' (Valor de Mercado a Valor Realizado). Es una métrica on-chain que compara la capitalización de mercado actual de un activo cripto (como bitcoin) con su capitalización realizada. Se calcula así: MVRV = Valor de Mercado ÷ Valor Realizado. El Valor de Mercado es el precio actual multiplicado por el suministro total en circulación (lo que ves en los sitios de seguimiento de monedas). El Valor Realizado calcula el valor basándose en el precio al que cada moneda se movió por última vez en la blockchain, representando lo que los inversores realmente pagaron por sus monedas, no lo que podrían vender hoy.",
          puntos: [
            "MVRV > 1: Los tenedores están en ganancia en promedio. Valores por encima de 3,5 han señalado históricamente techos del mercado.",
            "MVRV < 1: Los tenedores están en pérdidas en promedio. A menudo indica subvaloración y ha coincidido con suelos del mercado.",
            "MVRV tiende a revertir a su media a lo largo del tiempo, siendo útil para identificar posibles techos y suelos.",
          ],
        },
        {
          titulo: "Cómo leer el gráfico MVRV",
          texto: "El gráfico 'Bitcoin: Ratio MVRV' rastrea la relación entre la línea azul (Ratio MVRV) y la línea negra (Precio de Bitcoin en USD). Valores altos de MVRV sugieren crecientes ganancias no realizadas que pueden llevar a toma de ganancias o correcciones. Caídas bruscas en el MVRV típicamente se alinean con correcciones o eventos de capitulación. En mayo de 2025, el MVRV está alrededor de 2,2, indicando una fase de recuperación con el precio de BTC de nuevo por encima de $100.000.",
          imagen: { src: "/bootcamp/mod16-lec5/Bitcoin-MVRV-Ratio.png", alt: "Ratio MVRV de Bitcoin" },
        },
        {
          titulo: "Por qué importa a los traders",
          texto: "Valores altos de MVRV (históricamente por encima de 3,5-4,0 para BTC) indican que el precio de mercado es mucho más alto que la base de costo promedio de los tenedores, aumentando la probabilidad de toma de ganancias y señalando un mercado potencialmente sobrevalorado o en techo de ciclo. Valores bajos de MVRV (por debajo de 1) sugieren que el precio está por debajo de la base de costo promedio, históricamente coincidiendo con suelos y fases de acumulación. El MVRV es poderoso porque cuantifica la rentabilidad de la multitud y señala cuándo el mercado es probable que cambie del miedo a la codicia (o viceversa).",
          puntos: [
            "MVRV > 3,5-4,0: Alto riesgo de techo de mercado.",
            "MVRV 2,0-3,0: Alcista; monitorear para toma de ganancias.",
            "MVRV 1,0-2,0: Ganancias modestas; fase de acumulación o inicio de mercado alcista.",
            "MVRV < 1,0: Inversores en pérdidas; posible suelo o zona de miedo.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-16-6",
      titulo: "MVRV de Tenedores a Largo Plazo (LTH-MVRV)",
      resumen: "Aprende a usar el LTH-MVRV para identificar señales tempranas de extremos del mercado basándote en el comportamiento de los inversores más comprometidos de Bitcoin.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-long-term-mvrv",
      contenido: [
        {
          titulo: "La convención de cómics vintage",
          texto: "Imagina una convención de cómics raros donde conviven dos tipos de coleccionistas: los entusiastas casuales que cambian ejemplares frecuentemente según las modas actuales, y los archivistas dedicados que han preservado colecciones impecables durante décadas. Cuando estos veteranos, que normalmente resisten los caprichos del mercado, comienzan a exhibir sus valiosas piezas en la sección 'en venta', los compradores experimentados lo notan. Este comportamiento inusual a menudo señala que las valoraciones han alcanzado niveles insostenibles o que los precios han caído tan dramáticamente que hasta los más devotos están reconsiderando sus posiciones. El LTH-MVRV sirve como ese mismo indicador en el mercado de Bitcoin.",
          imagen: { src: "/bootcamp/mod16-lec6/comic-buyers-and-sellers.png", alt: "Mercado de cómics: compradores y vendedores" },
        },
        {
          titulo: "¿Qué es el LTH-MVRV?",
          texto: "El MVRV de Tenedores a Largo Plazo (LTH-MVRV) es una versión especializada del ratio MVRV que se enfoca exclusivamente en el bitcoin retenido por tenedores a largo plazo, específicamente monedas que no se han movido por más de 155 días. Se calcula como: LTH-MVRV = Valor de Mercado de Monedas LTH / Valor Realizado de Monedas LTH. Mide la relación entre el valor de mercado y el valor realizado para el bitcoin retenido por tenedores a largo plazo, reflejando cuánta ganancia o pérdida están acumulando los inversores a largo plazo. Los tenedores a largo plazo son considerados 'dinero inteligente'; su comportamiento puede ser un indicador líder de grandes cambios en el mercado.",
          puntos: [
            "LTH-MVRV > 1,0: Los tenedores a largo plazo están en ganancia.",
            "LTH-MVRV < 1,0: Los tenedores a largo plazo están en pérdidas (raro).",
            "Valores extremadamente altos: Pueden señalar techos del mercado debido a grandes ganancias no realizadas.",
          ],
        },
        {
          titulo: "Cómo leer el gráfico LTH-MVRV",
          texto: "El gráfico 'BTC: MVRV de Tenedores a Largo Plazo' muestra la línea naranja (LTH-MVRV) y la línea negra (precio de BTC en USD). Los picos históricos en el LTH-MVRV (2013, 2017, 2021) se alinean estrechamente con los principales techos de mercados alcistas. Los valles (alrededor de 1,0 o por debajo) han señalado históricamente mercados bajistas profundos o zonas principales de acumulación. La zona roja (MVRV > 20 aprox.) representa niveles eufóricos de ganancia, a menudo techos locales o burbujas. La zona verde (MVRV < 1,0-1,5 aprox.) representa períodos históricamente subvalorados.",
          imagen: { src: "/bootcamp/mod16-lec6/btc_long_term_holder_mvrv.png", alt: "BTC: MVRV de Tenedores a Largo Plazo" },
        },
        {
          titulo: "Por qué importa a los traders",
          texto: "Un LTH-MVRV en alza significa que los tenedores a largo plazo tienen ganancias cada vez mayores, representando un riesgo de toma de ganancias. Un LTH-MVRV bajo indica miedo, capitulación y a menudo acumulación por parte de manos fuertes. El precio realizado para tenedores a largo plazo a menudo actúa como un nivel de precio psicológico (soporte/resistencia) en el mercado. Las lecturas extremas han marcado históricamente importantes puntos de giro en los ciclos de precio de Bitcoin.",
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-16-7",
      titulo: "MVRV de Tenedores a Corto Plazo (STH-MVRV)",
      resumen: "Descubre cómo el STH-MVRV mide si los compradores recientes de Bitcoin están en ganancia o pérdida, y cómo esta información revela el sentimiento inmediato del mercado.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-sth-mvrv",
      contenido: [
        {
          titulo: "El estadio lleno de asistentes recientes",
          texto: "Imagina un estadio lleno de asistentes a un concierto reciente que compraron sus boletos a diferentes precios durante los últimos meses. El precio actual del boleto es lo que alguien pagaría si comprara uno hoy. El precio promedio de compra es lo que estos asistentes recientes realmente pagaron. El STH-MVRV es como comparar el precio actual del boleto con el precio promedio pagado por todos los que compraron en los últimos cinco meses. Si el precio actual es más alto que lo que la mayoría pagó, el grupo está 'en ganancia' y podría revender sus boletos por más de lo que gastaron. Si es más bajo, están 'en pérdida'. El STH-MVRV funciona de la misma manera para Bitcoin.",
          imagen: { src: "/bootcamp/mod16-lec7/ticket-booth.png", alt: "Taquilla de boletos" },
        },
        {
          titulo: "¿Qué es el STH-MVRV?",
          texto: "El MVRV de Tenedores a Corto Plazo (STH-MVRV) es una métrica on-chain que mide la ganancia o pérdida promedio del bitcoin retenido por tenedores a corto plazo. Es una versión especializada del ratio MVRV más amplio, pero se enfoca exclusivamente en las monedas que se han movido recientemente (en los últimos ~155 días), haciéndola más sensible a las dinámicas del mercado a corto plazo. Se calcula como: Valor de Mercado de Monedas STH ÷ Valor Realizado de Monedas STH. En términos más simples, es el precio actual de Bitcoin dividido entre el precio promedio de adquisición para los tenedores a corto plazo.",
          puntos: [
            "STH-MVRV > 1,0: Los tenedores a corto plazo están en ganancia (valores más altos = mayor ganancia).",
            "STH-MVRV < 1,0: Los tenedores a corto plazo están en pérdidas (valores más bajos = mayor pérdida).",
            "STH-MVRV = 1,0: Punto de equilibrio, que a menudo actúa como soporte/resistencia psicológico.",
          ],
        },
        {
          titulo: "Cómo leer el gráfico STH-MVRV",
          texto: "El gráfico 'BTC: MVRV de Tenedores a Corto Plazo' muestra la línea naranja (STH-MVRV) y la línea negra (precio de BTC en USD). Los picos en el MVRV a menudo coinciden con o preceden a los techos del mercado. Los valles (por debajo de 1,0) tienden a alinearse con los suelos del mercado, señalando capitulación o zonas de acumulación. En abril de 2025, el STH-MVRV cayó a 0,82, indicando que los tenedores a corto plazo enfrentaban una pérdida no realizada promedio del 18%. Históricamente, estos niveles coinciden con suelos del mercado y períodos de capitulación.",
          imagen: { src: "/bootcamp/mod16-lec7/btc_short_term_holder_mvrv.png", alt: "BTC: MVRV de Tenedores a Corto Plazo" },
        },
        {
          titulo: "Por qué importa a los traders",
          texto: "El nivel 1,0 actúa como punto de pivote para la acción del precio, ayudando a identificar posibles zonas de reversión o continuación. Cuando el STH-MVRV sube por encima de 1, puede señalar el inicio de una tendencia alcista. Cuando cae significativamente por debajo de 1,0, señala pérdidas no realizadas sustanciales entre los compradores recientes, alineándose históricamente con la capitulación del mercado y posibles suelos de precio. Las caídas bruscas a menudo preceden a reversiones de precio a medida que las manos débiles capitulán y los tenedores a largo plazo acumulan más BTC.",
          puntos: [
            "STH-MVRV < 1,0: Tenedores a corto plazo en pérdidas → posible suelo del mercado.",
            "STH-MVRV ~1,0: Zona de equilibrio → neutral.",
            "STH-MVRV > 1,5: Ganancias no realizadas moderadas → precaución: posible retroceso.",
            "STH-MVRV > 2,0: Altas ganancias no realizadas → precaución: posible techo local.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-16-8",
      titulo: "MVRV Z-Score",
      resumen: "Aprende a usar el MVRV Z-Score para identificar cuándo Bitcoin está extremadamente sobrevaluado o infravaluado respecto a su valor 'justo', combinando datos on-chain con análisis estadístico.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-mvrv-z-score",
      contenido: [
        {
          titulo: "El informe del clima del mercado",
          texto: "Imagina que estás revisando el clima, no solo para saber si hoy está soleado o lluvioso, sino para descubrir si la temperatura es inusualmente alta o baja para esta época del año. En el mundo de las criptomonedas, el MVRV Z-Score hace algo similar para el precio de bitcoin: actúa como un informe meteorológico del mercado, dándote pistas sobre cuándo las condiciones son inusualmente calurosas (sobrevaluadas) o frías (infravaluadas) respecto a la norma histórica.",
          imagen: { src: "/bootcamp/mod16-lec8/crypto-trader-weather-check.png", alt: "Trader de cripto revisando el clima del mercado" },
        },
        {
          titulo: "¿Qué es el MVRV Z-Score?",
          texto: "El MVRV Z-Score es una métrica on-chain que identifica períodos en los que BTC está extremadamente sobrevaluado o infravaluado respecto a su 'valor justo'. Combina datos de blockchain con análisis estadístico para crear un indicador de sentimiento del mercado. Su fórmula es: MVRV Z-Score = (Valor de Mercado - Valor Realizado) / Desviación Estándar (Valor de Mercado). Básicamente, captura el grado de desviación entre la capitalización de mercado (especulación del inversor) y la capitalización realizada (base de costo real), normalizado por la volatilidad. Fue desarrollado inicialmente por Murad Mahmudov y David Puell, y refinado por @aweandwonder.",
        },
        {
          titulo: "Cómo leer el gráfico MVRV Z-Score",
          texto: "El gráfico 'BTC: MVRV Z-Score' muestra cuánto se desvía el valor de mercado de Bitcoin de su valor realizado, estandarizado mediante un Z-score. La línea naranja es el MVRV Z-Score, la línea negra es el precio spot de BTC en USD. La zona roja (Z > 7 aprox.) indica sobrevaluación, y la zona verde (Z < 0 aprox.) indica infravaluación. Históricamente, cuando el valor de mercado es mucho más alto que el valor realizado, señala un techo del mercado (zona roja). Cuando el valor realizado supera al de mercado, a menudo marca un suelo (zona verde).",
          imagen: { src: "/bootcamp/mod16-lec8/btc_mvrv_z_score.png", alt: "BTC: MVRV Z-Score" },
        },
        {
          titulo: "Interpretando el Z-Score",
          texto: "El componente Z-Score es lo que transforma el ratio MVRV básico en el más poderoso MVRV Z-Score: mide cuánto se desvía la relación actual entre Valor de Mercado y Valor Realizado de la norma histórica, expresando la diferencia en términos de desviaciones estándar para dar contexto sobre cuán inusuales son las condiciones actuales. Permite comparaciones significativas entre diferentes ciclos del mercado y ayuda a detectar condiciones extremas del mercado que históricamente señalan grandes reversiones de tendencia.",
          puntos: [
            "Z-Score > 7 (Zona Roja): Bitcoin fuertemente sobrevaluado. Históricamente se alinea con techos del mercado (2011, 2013, 2017, 2021).",
            "Z-Score < 0 (Zona Verde): Bitcoin infravaluado, a menudo por debajo de la capitalización realizada. Se alinea con suelos del mercado (2011, 2015, 2019, 2022).",
            "Zona Neutral (~0-2): Bitcoin cotiza cerca de su valor justo, sin codicia ni miedo extremos.",
            "Z-Score 3-6: Aceleración alcista; precaución si se mantiene.",
            "Z-Score 1-3: Zona alcista saludable; tendencia de acumulación.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-16-9",
      titulo: "Volumen Spot",
      resumen: "Entiende qué es el volumen spot, por qué es la forma más pura de medir la actividad real del mercado de Bitcoin, y cómo interpretarlo para confirmar tendencias de precio.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-spot-volume",
      contenido: [
        {
          titulo: "¿Qué es el trading spot?",
          texto: "El volumen spot es una métrica clave en los mercados de criptomonedas, especialmente para activos como Bitcoin. En su núcleo, mide la actividad a través de la forma más directa de participación en el mercado. Cuando los traders participan en el trading spot, están ejecutando la compra o venta inmediata de BTC a los precios actuales del mercado, con la propiedad transfiriéndose en tiempo real. Estas transacciones ocurren en exchanges de cripto spot: plataformas especializadas de trading diseñadas para facilitar este intercambio directo de activos. A diferencia de las plataformas que operan con contratos o derivados que se liquidan en fechas futuras, los exchanges spot representan el frente donde la criptomoneda real cambia de manos.",
          imagen: { src: "/bootcamp/mod16-lec9/bitcoin-transfer-volume.png", alt: "Volumen de transferencia de Bitcoin" },
        },
        {
          titulo: "¿Qué es el volumen spot?",
          texto: "El volumen spot mide el valor total en USD de BTC negociado en exchanges de cripto spot a lo largo del tiempo. Esta cifra incluye todas las transacciones reales de compra y venta al precio de mercado actual. Refleja la presión real de compra y venta en el mercado. A diferencia del volumen de derivados (que mide contratos de futuros, opciones o productos apalancados), el volumen spot solo cuenta operaciones reales donde el BTC cambia de manos, no apuestas o contratos sobre precios futuros.",
        },
        {
          titulo: "Cómo leer el gráfico de Volumen Spot",
          texto: "El gráfico 'BTC: Volumen Spot' muestra las barras naranjas (Volumen Spot de BTC en USD) y la línea negra (precio de Bitcoin en USD). Los picos de volumen a menudo ocurren durante grandes movimientos de precio (al alza o a la baja) y cuando los participantes del mercado reaccionan a noticias o volatilidad. El volumen bajo típicamente implica falta de interés o posible consolidación. El volumen fue más fuerte entre noviembre y enero cuando BTC hizo un movimiento brusco hacia $105.000. Mientras BTC consolidó o corrigió en febrero-marzo, el volumen cayó significativamente. El volumen se mantuvo bajo incluso cuando BTC comenzó a recuperarse en abril-mayo, sugiriendo que el rally actual ocurre con participación relativamente ligera.",
          imagen: { src: "/bootcamp/mod16-lec9/glassnode_studio_btc_spot_volume.png", alt: "BTC: Volumen Spot" },
        },
        {
          titulo: "Por qué importa a los traders",
          texto: "El volumen spot proporciona contexto para los movimientos de precio: ¿está un rally impulsado por demanda real? ¿Está una caída causada por salidas masivas?",
          puntos: [
            "Alto volumen spot + rally de precio → confirmación alcista (fuerte interés comprador).",
            "Bajo volumen + rally de precio → potencial debilidad (falta de convicción, vulnerable a reversiones).",
            "Picos de volumen en días bajistas → posible capitulación o venta en pánico.",
            "Alto volumen + precio cayendo → venta en pánico o cambio de tendencia.",
            "Bajo volumen + precio cayendo → caída débil que puede encontrar soporte.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-16-10",
      titulo: "Delta de Volumen Spot",
      resumen: "Aprende a interpretar el delta de volumen spot para identificar si los compradores o vendedores están siendo más agresivos en los exchanges de cripto, y cómo esta información puede anticipar movimientos de precio.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-spot-volume-delta",
      contenido: [
        {
          titulo: "La cafetería que vende más o menos cada día",
          texto: "Imagina visitar tu cafetería favorita. Un día venden 100 tazas de café, y al día siguiente venden 120 tazas. El número total de tazas vendidas cada día refleja qué tan ocupada está la cafetería, como el volumen spot en el trading de cripto. Pero ¿y si quieres saber no solo qué tan ocupada está la cafetería, sino si se está volviendo más o menos concurrida comparada con el día anterior? Ahí entra el delta de volumen spot: es la diferencia en tazas vendidas entre hoy y ayer, mostrando el cambio en la actividad.",
          imagen: { src: "/bootcamp/mod16-lec10/toshi-barista.png", alt: "Toshi el barista" },
        },
        {
          titulo: "¿Qué es el delta de volumen spot?",
          texto: "El delta de volumen spot mide la diferencia neta entre el volumen de compra y el volumen de venta en los exchanges spot. Se calcula así: Delta de Volumen Spot = Volumen spot de hoy - Volumen spot de ayer (en BTC). Delta positivo: si el volumen spot de hoy es mayor que el de ayer, la actividad de trading ha aumentado, más BTC está siendo comprado y vendido. Delta negativo: si el volumen spot de hoy es menor que el de ayer, la actividad de trading ha disminuido, menos BTC se está negociando. Delta en alza indica creciente interés, posiblemente señalando el inicio de una nueva tendencia. Delta en caída sugiere interés decreciente, lo que podría significar que una tendencia está perdiendo impulso.",
        },
        {
          titulo: "Cómo leer el gráfico de Delta de Volumen Spot",
          texto: "El delta de volumen spot se muestra típicamente como un histograma con barras que van por encima (delta positivo) o por debajo (delta negativo) de una línea base. El gráfico 'BTC: Delta de Volumen Spot' muestra las barras verdes (Delta de Volumen Spot positivo: aumento en BTC negociado, más volumen de compra que de venta), las barras rojas (Delta negativo: disminución en BTC negociado, más volumen de venta), y la línea negra (precio de BTC en USD). En marzo-febrero: alto delta rojo de volumen y precio cayendo → interés en declive durante la fase de corrección. En abril-mayo tardíos: varios picos verdes cuando BTC superó los $100.000, mostrando fuerte confirmación del rally. Los picos en el delta a menudo preceden o coinciden con movimientos bruscos del precio.",
          imagen: { src: "/bootcamp/mod16-lec10/btc_spot_volume_delta.png", alt: "BTC: Delta de Volumen Spot" },
        },
        {
          titulo: "Por qué importa a los traders",
          texto: "El delta de volumen spot ayuda a identificar cambios de impulso en el mercado.",
          puntos: [
            "Grandes picos verdes → aumento repentino en el volumen de trading spot → típicamente ocurren durante rupturas de precio o grandes eventos de noticias.",
            "Grandes picos rojos → caída brusca en la actividad de trading → podría implicar enfriamiento del interés, indecisión o fin de una tendencia.",
            "Deltas negativos sostenidos (largas rachas rojas) → participación en declive y posiblemente baja convicción en la acción actual del precio.",
            "Delta positivo + precio alcista → confirmación de fortaleza alcista.",
            "Delta negativo + precio alcista → divergencia bajista (precio subiendo pero participación cayendo).",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-16-11",
      titulo: "Porcentaje de balance en exchanges",
      resumen: "Aprende a usar el porcentaje de balance en exchanges para medir cuánto Bitcoin se está acumulando o preparando para vender, y cómo esto afecta las tendencias del precio.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-percent-balance-on-exchanges",
      contenido: [
        {
          titulo: "El mercado del pueblo",
          texto: "Imagina un pequeño pueblo con un mercado central donde los residentes pueden intercambiar bienes. Cuando los habitantes mantienen sus objetos de valor en casa, sugiere que están contentos con lo que tienen. Pero cuando muchos empiezan a traer sus artículos al mercado, indica que están listos para vender. De manera similar, en el mercado cripto, cuando las monedas se mueven hacia o desde los exchanges, revela el sentimiento de los inversores y la posible dirección del mercado.",
          imagen: { src: "/bootcamp/mod16-lec11/marketplace.png", alt: "Mercado" },
        },
        {
          titulo: "¿Qué es el porcentaje de balance en exchanges?",
          texto: "Esta métrica rastrea el porcentaje del suministro total en circulación de Bitcoin que se retiene en carteras controladas por exchanges centralizados. Se calcula dividiendo la cantidad de bitcoin retenida en carteras de exchange por el suministro total en circulación de Bitcoin, expresándola como porcentaje. Por ejemplo: si 2 millones de bitcoins están en exchanges y el suministro total en circulación es 19 millones, el porcentaje de balance en exchanges sería: (2.000.000 / 19.000.000) × 100 ≈ 10,5%. Desde principios de 2022 ha habido una clara tendencia bajista en el % de BTC retenido en exchanges, del ~17,7% a menos del 14% en mayo de 2025.",
        },
        {
          titulo: "Cómo leer el gráfico",
          texto: "El gráfico 'BTC: Porcentaje de Balance en Exchanges' compara la línea naranja (% del suministro de BTC retenido en todos los exchanges) con la línea negra (precio de BTC en USD). Una línea naranja en alza significa que más BTC está siendo depositado en exchanges (posible presión vendedora). Una línea naranja en caída significa que BTC está siendo retirado de exchanges, normalmente hacia almacenamiento en frío o autocustodia (señal alcista). Históricamente, los picos en el balance de exchanges se han alineado con techos de precio, mientras que las caídas han apoyado tendencias alcistas.",
          imagen: { src: "/bootcamp/mod16-lec11/btc_percent_balance_on_exchanges.png", alt: "BTC: Porcentaje de balance en exchanges" },
        },
        {
          titulo: "Por qué importa a los traders",
          texto: "Un porcentaje en alza indica que más tenedores están moviendo su bitcoin a exchanges, posiblemente para vender. Un aumento en el balance puede ser bajista, señalando posibles ventas masivas o distribución por parte de inversores institucionales. Las grandes entradas a exchanges pueden preceder caídas de precio. Un porcentaje en caída significa que más bitcoin está siendo retirado de exchanges hacia carteras personales, lo que sugiere que los tenedores son menos propensos a vender a corto plazo (señal alcista de acumulación y retención a largo plazo).",
          puntos: [
            "Porcentaje en alza en exchanges: Monedas fluyendo hacia exchanges → posible distribución / presión vendedora.",
            "Porcentaje en caída en exchanges: Monedas siendo retiradas → acumulación / alcista.",
            "Caída brusca: Almacenamiento agresivo en frío o escasez de oferta → cambio estructural alcista.",
          ],
        },
      ],
      imagenes: [],
    },
    {
      id: "crypto-16-12",
      titulo: "Volumen neto de transferencias",
      resumen: "Descubre cómo el volumen neto de transferencias rastrea el movimiento de Bitcoin hacia y desde los exchanges para revelar en tiempo real si los inversores están acumulando o preparándose para vender.",
      estado: "disponible",
      sourceUrl: "https://www.babypips.com/crypto/learn/what-is-net-transfer-volume",
      contenido: [
        {
          titulo: "Las mareas del mercado cripto",
          texto: "Imagina a los exchanges de cripto como puertos costeros, con las criptomonedas fluyendo hacia dentro y fuera como las mareas. El volumen neto de transferencias actúa como un medidor de mareas, midiendo si más bitcoins están fluyendo hacia los puertos (marea alta) o retrocediendo hacia el mar abierto de las carteras privadas (marea baja). Así como los pescadores estudian las mareas para planificar sus actividades, los traders observan estas mareas digitales para tomar decisiones: las mareas altas (entradas) a menudo advierten de posibles tormentas (caídas de precio), mientras que las mareas bajas (salidas) frecuentemente señalan buen tiempo por delante (subidas de precio).",
          imagen: { src: "/bootcamp/mod16-lec12/net-transfer-volume.png", alt: "Volumen neto de transferencias" },
        },
        {
          titulo: "¿Qué es el volumen neto de transferencias?",
          texto: "El Volumen Neto de Transferencias (también conocido como 'Flujo Neto de Exchange' o 'Netflow de Exchange') mide la diferencia entre el bitcoin (BTC) que fluye hacia las carteras del exchange versus el que fluye hacia afuera en un período específico: Volumen neto de transferencias = BTC fluyendo hacia exchanges menos BTC fluyendo hacia afuera. Las barras verdes (valores positivos) indican entradas netas: más BTC se movió hacia los exchanges que el que se retiró. Las barras rojas (valores negativos) indican salidas netas: más BTC se movió fuera de los exchanges que el depositado. Típicamente se denomina en valor en USD, no en unidades de BTC.",
          puntos: [
            "Entradas netas positivas: Más BTC enviado a exchanges → a menudo interpretado como posible presión vendedora, ya que los usuarios típicamente depositan BTC en exchanges para vender o hacer trading.",
            "Salidas netas negativas: Más BTC retirado de exchanges → a menudo interpretado como alcista, ya que los usuarios mueven BTC a carteras personales, sugiriendo acumulación o retención a largo plazo.",
          ],
        },
        {
          titulo: "Cómo leer el gráfico",
          texto: "El gráfico 'BTC: Volumen Neto de Transferencias desde/hacia Exchanges' visualiza las barras verdes y rojas (volumen neto de transferencia de Bitcoin hacia/desde todos los exchanges en USD) y la línea negra (precio de BTC en USD). Las entradas a exchanges (barras verdes) se interpretan a menudo como potencial presión de venta de traders que mueven BTC para posiblemente cobrar. Las salidas (barras rojas) sugieren acumulación o HODLing de inversores que sacan BTC de exchanges al almacenamiento en frío. En el gráfico mostrado (febrero a mayo de 2025): el inicio de marzo vio grandes salidas, que coincidieron con el suelo del precio de BTC alrededor de $80.000. Las salidas sostenidas en abril y mayo coincidieron con un fuerte rally del precio, sugiriendo que la oferta se estaba retirando de los exchanges durante la acumulación.",
          imagen: { src: "/bootcamp/mod16-lec12/btc_net_transfer_volume_from_to_exchanges.png", alt: "BTC: Volumen neto de transferencias desde/hacia exchanges" },
        },
        {
          titulo: "Por qué importa a los traders",
          texto: "Esta métrica ofrece información sobre la intención del inversor. Combinada con la acción del precio, ayuda a validar si un movimiento está impulsado por la oferta o la demanda.",
          puntos: [
            "Entradas al exchange (barras verdes): Podrían preceder ventas masivas o toma de ganancias.",
            "Salidas del exchange (barras rojas): A menudo son alcistas, especialmente si son persistentes y de gran volumen.",
            "Altas entradas → Mayor liquidez → Posibles caídas de precio.",
            "Altas salidas → Menor liquidez → Posible movimiento alcista del precio y mayor volatilidad.",
            "Entrada neta: BTC movido a exchanges → posible presión vendedora.",
            "Salida neta: BTC movido fuera de exchanges → alcista; tendencia de acumulación.",
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
      : mod.id === "crypto-09"
      ? clasesModulo9
      : mod.id === "crypto-10"
      ? clasesModulo10
      : mod.id === "crypto-11"
      ? clasesModulo11
      : mod.id === "crypto-12"
      ? clasesModulo12
      : mod.id === "crypto-13"
      ? clasesModulo13
      : mod.id === "crypto-14"
      ? clasesModulo14
      : mod.id === "crypto-15"
      ? clasesModulo15
      : mod.id === "crypto-16"
      ? clasesModulo16
      : Array.from({ length: mod.lessons }, (_, i) => ({
          id: `${mod.id}-${i + 1}`,
          titulo: `Clase ${i + 1}`,
          resumen: "Contenido de la lección pendiente por cargar.",
          estado: "Contenido pendiente",
        })),
  };
});
