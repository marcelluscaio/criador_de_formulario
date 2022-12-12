class Form{
   items = [];
   method = 'GET';

   constructor(container, method, action){
      this.container = document.querySelector(container);
      this.method = method;
      this.action = action;
   }

   addItem(item){
      this.items.push(item)
   }

   render(){
      let formElement = document.createElement('form');
      formElement.setAttribute('method', this.method);
      formElement.setAttribute('action', this.action);

      for(let item of this.items){
         item.render(formElement)
      }

      this.container.appendChild(formElement);
   }
}

class Input {
   required = false;
   _type = 'text';

   constructor(name, label){
      this.name = name;
      this.label = label;
   }

   get type(){
      return this._type;
   }   

   set type(type){
      let types = ['password', 'text', 'email', 'submit']
      if(types.includes(type)){
         this._type = type;
      } else{
         throw new Error(`Input ${type} doesn't exist`)
      }
   }

   render(form){
      let element = document.createElement('input');
      element.type = this.type;
      element.name = this.name;
      element.placeholder = this.label;
      element.required = this.required;
      form.appendChild(element);
   }
}

class Button extends Input{
   constructor(label){
      super('', label);
      this.type = 'submit';
   }

   render(form){
      let element = document.createElement('input');
      element.type = this.type;
      element.value = this.label;
      form.appendChild(element);
   }
}

let formulario = new Form('.form-area', 'POST', 'https://google.com');

let email = new Input('email', 'Digite seu email');
email.type = 'email';
email.required = true;
formulario.addItem(email);

let password = new Input('password', 'Digite a sua senha');
password.type = 'password';
formulario.addItem(password);

let button = new Button('Submit');
formulario.addItem(button);

formulario.render()


