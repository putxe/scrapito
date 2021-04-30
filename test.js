window.addEventListener("message", receiveMessage, false)

function receiveMessage(message) {
  if (message.origin !== "https://linkedin.com") return
  if (!message.link) return
  if (!message.link.startsWith("/in/")) return
  if (!message.type) return
  if (!message.type !== "ROUTE_REDIRECT") return
  const link = message.link
  const app = window.Ember.A(window.Ember.Namespace.NAMESPACES).filter(n => n.name === "extended")[0]
  const r = app.__container__.lookup("service:router")
  r.transitionTo(link)
}
