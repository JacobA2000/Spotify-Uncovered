(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){e.exports=a(31)},19:function(e,t,a){},26:function(e,t,a){},31:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(7),l=a.n(c),i=(a(19),a(2)),s=a(4),m=(a(23),a(5)),o=a.n(m),u=a(8),f=a(9),p=function(){function e(t){Object(u.a)(this,e),this.token=t}return Object(f.a)(e,[{key:"getProfile",value:function(){return fetch("https://api.spotify.com/v1/me",{headers:{Authorization:"Bearer ".concat(this.token)}}).then(function(e){return e.json()})}},{key:"getTopTracks",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"short_term";return fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=".concat(e),{headers:{Authorization:"Bearer ".concat(this.token)}}).then(function(e){return e.json()})}},{key:"getTopArtists",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"short_term";return fetch("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=".concat(e),{headers:{Authorization:"Bearer ".concat(this.token)}}).then(function(e){return e.json()})}}]),e}(),E=(a(26),a(3));a(29);function k(){var e=r.a.useState(o.a.get("spotifyAuthToken")),t=Object(i.a)(e,1)[0],a=r.a.useState(""),n=Object(i.a)(a,2),c=n[0],l=n[1],s=r.a.useState(""),m=Object(i.a)(s,2),u=m[0],f=m[1],k=r.a.useState(""),g=Object(i.a)(k,2),d=g[0],N=g[1],v=r.a.useState([]),T=Object(i.a)(v,2),b=T[0],y=T[1],j=r.a.useState([]),A=Object(i.a)(j,2),O=A[0],S=A[1],_=r.a.useState([]),w=Object(i.a)(_,2),C=w[0],B=w[1],P=r.a.useState([]),R=Object(i.a)(P,2),z=R[0],M=R[1],x=r.a.useState([]),I=Object(i.a)(x,2),J=I[0],L=I[1],D=r.a.useState([]),U=Object(i.a)(D,2),V=U[0],q=U[1];return r.a.useEffect(function(){if(t){var e=new p(t);e.getProfile().then(function(e){l(e.images[0].url),f(e.display_name),N(e.external_urls.spotify)}),e.getTopTracks("short_term").then(function(e){y(e.items)}),e.getTopArtists("short_term").then(function(e){S(e.items)}),e.getTopTracks("medium_term").then(function(e){B(e.items)}),e.getTopArtists("medium_term").then(function(e){M(e.items)}),e.getTopTracks("long_term").then(function(e){L(e.items)}),e.getTopArtists("long_term").then(function(e){q(e.items)})}},[t]),r.a.createElement("div",null,r.a.createElement("div",{className:"profile"},r.a.createElement("img",{className:"profile-img",src:c,alt:u}),r.a.createElement("p",{className:"profile-name"},u),r.a.createElement("a",{className:"profile-url",href:d,target:"_blank"},"View Profile on Spotify")),r.a.createElement(E.d,null,r.a.createElement(E.b,null,r.a.createElement(E.a,null,"Last Month"),r.a.createElement(E.a,null,"Last 6 Months"),r.a.createElement(E.a,null,"All-time")),r.a.createElement(E.c,null,r.a.createElement("h2",null,"Top Tracks"),r.a.createElement("ul",{className:"track-list"},b.map(function(e){return r.a.createElement("li",{className:"track-list-item",key:e.id,onClick:function(){return h(e.uri)}},r.a.createElement("div",{className:"track-info"},r.a.createElement("img",{className:"track-img",src:e.album.images[0].url,alt:e.name}),r.a.createElement("p",{className:"track-name"},e.name)))})),r.a.createElement("h2",null,"Top Artists"),r.a.createElement("ul",{className:"artist-list"},O.map(function(e){return r.a.createElement("li",{className:"artist-list-item",key:e.id,onClick:function(){return h(e.uri)}},r.a.createElement("div",{className:"artist-info"},r.a.createElement("img",{className:"artist-img",src:e.images[0].url,alt:e.name}),r.a.createElement("p",{className:"artist-name"},e.name)))}))),r.a.createElement(E.c,null,r.a.createElement("h2",null,"Top Tracks"),r.a.createElement("ul",{className:"track-list"},C.map(function(e){return r.a.createElement("li",{className:"track-list-item",key:e.id,onClick:function(){return h(e.uri)}},r.a.createElement("div",{className:"track-info"},r.a.createElement("img",{className:"track-img",src:e.album.images[0].url,alt:e.name}),r.a.createElement("p",{className:"track-name"},e.name)))})),r.a.createElement("h2",null,"Top Artists"),r.a.createElement("ul",{className:"artist-list"},z.map(function(e){return r.a.createElement("li",{className:"artist-list-item",key:e.id,onClick:function(){return h(e.uri)}},r.a.createElement("div",{className:"artist-info"},r.a.createElement("img",{className:"artist-img",src:e.images[0].url,alt:e.name}),r.a.createElement("p",{className:"artist-name"},e.name)))}))),r.a.createElement(E.c,null,r.a.createElement("h2",null,"Top Tracks"),r.a.createElement("ul",{className:"track-list"},J.map(function(e){return r.a.createElement("li",{className:"track-list-item",key:e.id,onClick:function(){return h(e.uri)}},r.a.createElement("div",{className:"track-info"},r.a.createElement("img",{className:"track-img",src:e.album.images[0].url,alt:e.name}),r.a.createElement("p",{className:"track-name"},e.name)))})),r.a.createElement("h2",null,"Top Artists"),r.a.createElement("ul",{className:"artist-list"},V.map(function(e){return r.a.createElement("li",{className:"artist-list-item",key:e.id,onClick:function(){return h(e.uri)}},r.a.createElement("div",{className:"artist-info"},r.a.createElement("img",{className:"artist-img",src:e.images[0].url,alt:e.name}),r.a.createElement("p",{className:"artist-name"},e.name)))})))))}function h(e){window.location=e}var g=function(){var e=r.a.useState(o.a.get("spotifyAuthToken")),t=Object(i.a)(e,2),a=t[0],n=t[1];return r.a.createElement("div",{className:"App"},a?r.a.createElement(k,null):r.a.createElement(s.b,{clientID:"0166a2461c6c4692b5dbb305776488d4",redirectUri:"http://localhost:3000/",scopes:[s.a.userReadEmail,s.a.userReadPrivate,s.a.userTopRead],onAccessToken:function(e){return n(e)}}))};l.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null)))}},[[10,2,1]]]);
//# sourceMappingURL=main.a5fe6162.chunk.js.map