const { assert } = require('chai');
const fs = require('fs');
const Structured = require('structured');

// Importando os módulos necessários

// Desabilitando o console.log
console.log = function() {};

// Definindo a linha inicial para o código do aluno
let learnerCodeStart = 18;

// Lendo o arquivo main.js e extraindo o código do aluno
let code = fs.readFileSync('main.js', 'utf8').split('\n');
code = code.splice(learnerCodeStart, code.length - (learnerCodeStart - 1)).join("\n");

// Conjunto de testes
describe('', function () {
  it('', function() {
    // Definindo diferentes estruturas de código para comparar
    let structureOne = function() {
      close.$eventMethod;
    };
    
    let structureTwo = function(){
      close.addEventListener($event);
    }
    
    let structureThree = function(){
      close.addEventListener($event, $handler);
    }
    
    let structureFour = function(){
      close.$event = $handler;
    }
    
    // Callbacks de variáveis para comparação de estruturas
    let varCallbacks = {
      "$eventMethod": function(eventMethod){   
        if(eventMethod.name === 'addEventListener'){     
         let isMatchTwo = Structured.match(code, structureTwo);
         let isMatchThree = Structured.match(code, structureThree, {varCallbacks: addEventListenerCallbacks});

         assert.isOk(isMatchTwo, 'O primeiro argumento é um tipo de evento e o segundo argumento é uma função manipuladora de eventos?');
         assert.isOk(isMatchThree, addEventListenerCallbacks.failure || 'Você está fornecendo uma função manipuladora de eventos como segundo argumento?');
         return true;
       }
       
       if(eventMethod.name === 'onclick'){
         let isMatchFour= Structured.match(code, structureFour, {varCallbacks: onEventCallbacks});
         assert.isOk(isMatchFour, onEventCallbacks.failure || "Você definiu uma função manipuladora de eventos para a propriedade `onevent`?");
         
         return true;
       }
       
       return {failure: 'Você está usando `addEventListener()` ou `.onevent` para adicionar uma função manipuladora de eventos?'}
     }
    }
   
   // Callbacks para comparação de estruturas do addEventListener
   let addEventListenerCallbacks = {
     "$event, $handler": function(event, handler){
       if(event.type === 'Literal'){
         if(event.value !== 'click'){
            return {failure: "Você está usando `'click'` como tipo de evento?"}
         }
       }else{
          return {failure: 'Você está passando o tipo de evento como uma string?'}
       }
       
       if(handler.name !== 'textReturn'){
          return {failure: 'Você está definindo `textReturn` como seu segundo argumento de `addEventListener()`?'}
       }
       return true;
     }
   }
   
   // Callbacks para comparação de estruturas do onevent
   let onEventCallbacks = {
     "$event, $handler": function(event, handler){      
       if(event.name !== 'onclick'){
         if(event.name === 'innerHTML'){
           return {failure: "Você está definindo a função manipuladora de eventos como valor da propriedade `onevent`?"}
         }
         return {failure: "Você está usando a propriedade `onclick` para adicionar sua função manipuladora de eventos?"}
       }
       
       if(handler.name !== 'textReturn'){
         return {failure: "Você está definindo `textReturn` como sua função manipuladora de eventos?"}
       }
       return true;
     }   
   }

    // Comparando o código do aluno com a primeira estrutura
    let isMatchOne = Structured.match(code, structureOne, {varCallbacks});    
    assert.isOk(isMatchOne, varCallbacks.failure || 'Você adicionou uma função manipuladora de eventos para o elemento `close`?');
  });
});
