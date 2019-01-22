if(typeof module.hot !== 'undefined'){
  module.hot.accept();

  const oldApp = document.getElementsByClassName('app')[0];
  if(typeof oldApp !== 'undefined' && oldApp!==null){
    oldApp.remove();
  }
}
document.body.appendChild(
  document
    .createElement("div")
    .appendChild(document.createTextNode("hello world,aa"))
);
