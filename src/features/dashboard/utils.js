export function buildWaUpgradeUrl(name, email) {
  const n = name || "un usuario interesado"
  const e = email || "no indicado"
  const msg = `Hola Oscar 👋 Soy *${n}* y me registré con el email *${e}*. Estoy interesado en actualizar mi plan al programa *Trader en Formación*. ¿Me puedes dar más información?`
  return `https://wa.me/573215646716?text=${encodeURIComponent(msg)}`
}
