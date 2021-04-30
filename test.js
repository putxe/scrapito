window.addEventListener("message", receiveMessage, false)

function receiveMessage(message) {
  if (message.origin !== "https://www.linkedin.com") return
  if (!message.data) return
  if (!message.data.link) return
  if (!message.data.link.startsWith("/in/")) return
  if (!message.data.type) return
  if (!message.data.type !== "ROUTE_REDIRECT") return
  var link = message.data.link
  var app = window.Ember.A(window.Ember.Namespace.NAMESPACES).filter(n => n.name === "extended")[0]
  var r = app.__container__.lookup("service:router")
  r.transitionTo(link)
}
