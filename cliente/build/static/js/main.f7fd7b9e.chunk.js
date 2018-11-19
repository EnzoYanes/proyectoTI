(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e,t,a){e.exports=a(32)},32:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(17),c=a.n(o),l=a(3),i=a(4),s=a(7),u=a(6),h=a(8),m=a(35),p=a(34),d=a(18),g=a.n(d)()(),b=function(){function e(){Object(l.a)(this,e),this.logout=this.logout.bind(this),this.isAuthenticated=this.isAuthenticated.bind(this),this.getAccessToken=this.getAccessToken.bind(this)}return Object(i.a)(e,[{key:"getAccessToken",value:function(){var e=localStorage.getItem("access_token");return e||new Error("Hubo un error al generar el token")}},{key:"setSession",value:function(e){var t=JSON.stringify(3e5+(new Date).getTime());localStorage.setItem("access_token",e),localStorage.setItem("expires_at",t),g.replace("/")}},{key:"logout",value:function(){localStorage.removeItem("access_token"),localStorage.removeItem("expires_at"),g.replace("/")}},{key:"isAuthenticated",value:function(){var e=JSON.parse(localStorage.getItem("expires_at"));return(new Date).getTime()<e}}]),e}(),v=a(11),f=a(5),E=a(33),j=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={username:"",password:""},a.login=a.login.bind(Object(f.a)(Object(f.a)(a))),a.handleChange=a.handleChange.bind(Object(f.a)(Object(f.a)(a))),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(v.a)({},a,n))}},{key:"login",value:function(e){var t=this;fetch("http://localhost:5000/api/user/login",{method:"POST",body:JSON.stringify(this.state),headers:{Accept:"application/jason","Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){e.status?window.M.toast({html:e.status}):(t.props.auth.setSession(e.token),t.props.history.push("/"))}).catch(function(e){return console.log(e)}),e.preventDefault()}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s5"},r.a.createElement("h1",null,"Bienvenidos!"),r.a.createElement("form",{onSubmit:this.login},r.a.createElement("input",{name:"username",value:this.state.username,onChange:this.handleChange,type:"text",placeholder:"username"}),r.a.createElement("input",{name:"password",value:this.state.password,onChange:this.handleChange,type:"password",placeholder:"password"}),r.a.createElement("button",{type:"submit",className:"btn light-blue darken-4"},"Iniciar"),r.a.createElement(E.a,{to:"/register",className:"btn light-blue darken-4 right"},"Registrarse")))))}}]),t}(n.Component),O=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={username:"",password:"",nombre:"",apellido:"",fechaNac:"",correo:"",tipo:"",categoria:"",nombreEmpresa:"",linkEmpresa:""},a.handleChange=a.handleChange.bind(Object(f.a)(Object(f.a)(a))),a.addUser=a.addUser.bind(Object(f.a)(Object(f.a)(a))),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(v.a)({},a,n))}},{key:"addUser",value:function(e){var t=this;fetch("http://localhost:5000/api/user/register",{method:"POST",body:JSON.stringify(this.state),headers:{Accept:"application/jason","Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){e.status?window.M.toast({html:e.status}):(window.M.toast({html:"Usuario creado"}),t.props.history.push("/login"))}).catch(function(e){return console.log(e)}),e.preventDefault()}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s5"},r.a.createElement("h1",null,"Registro"),r.a.createElement("form",{onSubmit:this.addUser},r.a.createElement("select",{name:"tipo",value:this.state.tipo,onChange:this.handleChange,className:"browser-default"},r.a.createElement("option",{value:""},"Seleccione tipo"),r.a.createElement("option",{value:"Cliente"},"Cliente"),r.a.createElement("option",{value:"Proveedor"},"Proveedor")),r.a.createElement("input",{name:"username",value:this.state.username,onChange:this.handleChange,type:"text",placeholder:"Nick",required:!0}),r.a.createElement("input",{name:"password",value:this.state.password,onChange:this.handleChange,type:"password",placeholder:"Contrase\xf1a",required:!0}),r.a.createElement("input",{name:"nombre",value:this.state.nombre,onChange:this.handleChange,type:"text",placeholder:"Nombre",required:!0}),r.a.createElement("input",{name:"apellido",value:this.state.apellido,onChange:this.handleChange,type:"text",placeholder:"Apellido",required:!0}),r.a.createElement("input",{name:"fechaNac",value:this.state.fechaNac,onChange:this.handleChange,type:"date",required:!0}),r.a.createElement("input",{name:"correo",value:this.state.correo,onChange:this.handleChange,type:"text",placeholder:"Correo electr\xf3nico",required:!0}),r.a.createElement("select",{name:"categoria",value:this.state.categoria,onChange:this.handleChange,className:"browser-default"},r.a.createElement("option",{value:""},"Seleccione categor\xeda"),r.a.createElement("option",{value:"Free"},"Free"),r.a.createElement("option",{value:"Silver"},"Silver"),r.a.createElement("option",{value:"Gold"},"Gold")),r.a.createElement("input",{name:"nombreEmpresa",value:this.state.nombreEmpresa,onChange:this.handleChange,type:"text",placeholder:"Nombre de la Empresa"}),r.a.createElement("input",{name:"linkEmpresa",value:this.state.linkEmpresa,onChange:this.handleChange,type:"text",placeholder:"Link de la Empresa"}),r.a.createElement("button",{type:"submit",className:"btn light-blue darken-4"},"Crear"),r.a.createElement(E.a,{to:"/",className:"btn light-blue darken-4 right"},"Inicio")))))}}]),t}(n.Component),C=function(e){var t=e.informacion,a=t.imagen,n=t.nombre,o=t.precio,c=t.id;return r.a.createElement("li",null,r.a.createElement("img",{src:"img/".concat(a,".png"),alt:n}),r.a.createElement("p",null,n," ",r.a.createElement("span",null," $ ",o)),r.a.createElement(E.a,{to:"/articulo/".concat(c),className:"btn"},"M\xe1s Informaci\xf3n"))},y=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={articulos:[]},a.queryAPI=function(){fetch("http://localhost:5000/articulos").then(function(e){return e.json()}).then(function(e){a.setState({articulos:e})})},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){this.queryAPI()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"center"},r.a.createElement("h2",null,"Nuestros Articulos"),r.a.createElement("ul",null,Object.keys(this.state.articulos).map(function(t){return r.a.createElement(C,{informacion:e.state.articulos[t],key:t})})))}}]),t}(n.Component),w=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={articulo:""},a.getArticulo=function(){fetch("http://localhost:5000").then(function(e){return e.json()})},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this.props.auth.isAuthenticated,t=this.props.location.pathname.replace("/articulo/","");return r.a.createElement("div",null,e()&&r.a.createElement("h3",null,"Detalles del articulo id: ",t),!e()&&r.a.createElement("div",null,r.a.createElement("p",null,"Para ver el contenido debes estar logueado"),r.a.createElement(E.a,{to:"/login"},"Iniciar Sesi\xf3n")))}}]),t}(n.Component),k=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={nombre:"",idPadre:"",categorias:[]},a.handleChange=a.handleChange.bind(Object(f.a)(Object(f.a)(a))),a.addCategoria=a.addCategoria.bind(Object(f.a)(Object(f.a)(a))),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){this.getCategorias()}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(v.a)({},a,n))}},{key:"getCategorias",value:function(){var e=this;fetch("http://localhost:5000/api/categoria/").then(function(e){return e.json()}).then(function(t){e.setState({categorias:t})})}},{key:"addCategoria",value:function(e){var t=this;fetch("http://localhost:5000/api/categoria/",{method:"POST",body:JSON.stringify(this.state),headers:{Accept:"application/jason","Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){e.message?window.M.toast({html:e.message}):(window.M.toast({html:"Categoria creada"}),t.setState({nombre:"",categorias:[]}),t.getCategorias())}).catch(function(e){return console.log(e)}),e.preventDefault()}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s5"},r.a.createElement("h4",null,"Alta categoria"),r.a.createElement("form",{onSubmit:this.addCategoria},r.a.createElement("select",{name:"idPadre",value:this.state.tipo,onChange:this.handleChange,className:"browser-default"},r.a.createElement("option",{value:""},"Seleccione padre"),this.state.categorias.map(function(e){return r.a.createElement("option",{key:e._id,value:e._id},e.nombre)})),r.a.createElement("input",{name:"nombre",value:this.state.nombre,onChange:this.handleChange,type:"text",placeholder:"Nombre",required:!0}),r.a.createElement("button",{type:"submit",className:"btn light-blue darken-4"},"Crear")))))}}]),t}(n.Component),N=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).cerrarSesion=function(){a.props.auth.logout()},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e;return e=(0,this.props.auth.isAuthenticated)()?r.a.createElement("a",{className:"btn",onClick:this.cerrarSesion},"Cerrar Sesi\xf3n"):r.a.createElement("div",null,r.a.createElement(E.a,{to:"/login",className:"waves-effect waves-light btn"},"Iniciar sesi\xf3n"),r.a.createElement(E.a,{to:"/registro",className:"waves-effect waves-light btn"},"Registrarse")),r.a.createElement("nav",{className:"nav-wrapper"},r.a.createElement("div",{className:"left hide-on-med-and-down"},r.a.createElement(E.a,{to:"/altaCategoria",className:"waves-effect waves-light btn"},"Alta Categor\xeda")),r.a.createElement("ul",{className:"right hide-on-med-and-down"},r.a.createElement(E.a,{to:"/",className:"brand-logo center"},"Logo"),e))}}]),t}(n.Component),S=a(19),A=a.n(S),I=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(A.a,{url:"http://localhost:5000/articulos  ",showRoot:!0})}}]),t}(n.Component),x=new b,T=r.a.createElement(m.a,{history:g},r.a.createElement("div",null,r.a.createElement(N,{auth:x}),r.a.createElement(p.a,{path:"/login",render:function(e){return r.a.createElement(j,Object.assign({auth:x},e))}}),r.a.createElement(p.a,{path:"/registro",component:O}),r.a.createElement(p.a,{exact:!0,path:"/",component:y}),r.a.createElement(p.a,{path:"/altaCategoria",component:k}),r.a.createElement(p.a,{exact:!0,path:"/articulo/:articuloId",render:function(e){return r.a.createElement(w,Object.assign({auth:x},e))}}),r.a.createElement(p.a,{path:"/tree",component:I}))),P=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,T)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[21,2,1]]]);
//# sourceMappingURL=main.f7fd7b9e.chunk.js.map