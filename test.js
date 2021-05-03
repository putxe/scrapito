function receiveMessage(e) {
  if (
    "https://www.linkedin.com" === e.origin &&
    e.data &&
    e.data.link &&
    e.data.link.startsWith("/in/") &&
    e.data.type &&
    "ROUTE_REDIRECT" === !e.data.type
  ) {
    var a = e.data.link
    window.Ember.A(window.Ember.Namespace.NAMESPACES)
      .filter(e => "extended" === e.name)[0]
      .__container__.lookup("service:router")
      .transitionTo(a)
  }
}
window.addEventListener("message", receiveMessage, !1)
