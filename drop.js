class tDropDown extends HTMLElement {
  constructor() {
    super();
    var gs = this;
    this.selected = "none";
    this.open = false;
    this.shadow = this.attachShadow({mode:'open'});
    var styleElement = document.createElement("style");
    styleElement.innerHTML = "@import url( 'drop.css' );";
    this.shadow.appendChild(styleElement);
    this.master = document.createElement("div");
    this.shadow.appendChild(this.master)
    this.master.classList.add("wrapper-dropdown-2");
    this.stext = document.createElement("div");
    this.stext.innerText="Select";
    this.master.appendChild(this.stext);
    this.options = document.createElement("ul");
    this.master.appendChild(this.options);
    this.options.classList.add("dropdown");
    this.onactivate = ()=>{};
    this.master.onclick=function(){
      gs.master.classList.toggle("active");
      gs.onactivate();
    }
  }

  addOption(color,text,element){
    var gs = this;
    var optiontop = document.createElement("li");
    var option = document.createElement("a");
    option.style="border-left-color: "+color+";";
    option.innerText = text;
    if(typeof element != "undefined"){
        option.appendChild(element);
    }
    optiontop.appendChild(option);
    this.options.appendChild(optiontop);
    optiontop.addEventListener('click',function(e){gs.selected = text;gs.stext.innerText=text; gs.master.style="border-left-color: "+color+";";});
    return option;
  }

  reset(){
    var myNode = this.options;
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }
}

customElements.define('x-drop', tDropDown);
