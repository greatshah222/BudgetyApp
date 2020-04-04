// Budget Controller

var budgetController = (function(){
// This var Expense is called function constructor
   var Expense = function(id,description,value){
       this.id =id;
       this.description =description;
       this.value = value;
   };
    var Income = function(id,description,value){
        this.id =id;
        this.description =description;
        this.value = value;
    };

  var data = {
      allItems:{
          exp:[],
          inc:[]
      },
      totals:{
          exp:0,
          inc:0
      }
  }

}) ();


// UI Controller


var UIController = (function(){

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription : '.add__description',
        inputValue: '.add__value',
        inputBtn:'.add__btn'

    }

    return{
        getInput: function(){

            return {
            type: document.querySelector(DOMstrings.inputType).value , // will be either inc or exp
            description : document.querySelector(DOMstrings.inputDescription).value,
            value :document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings : function(){
            return DOMstrings;

        }
    };

}) ();




//  GLOBAL APP Controller

var controller =(function(budgetCtrl,UIctrl){
    var setupEventListner = function(){
        var DOM = UIctrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
        
        document.addEventListener('keydown',function(event){
            if(event.key === 13 ||  event.which === 13){
                event.preventDefault();
    /// THis prevents the eneter key froma also triggering a click event . Without this statement if you first pressed the click button and then the enter button then the enter button will give u 2 times the console output
                ctrlAddItem();  
            }    
        });



    };


    var ctrlAddItem = function(){
    // get the input field data
    var input = UIctrl.getInput();
    // add the item to the budget controleer
    // add the item to the UI
    // calculate the budget
    // display the budget on UI

 };
 return {
     init: function(){

        console.log('APP STARTED');
        setupEventListner();


     }
 };
})(budgetController,UIController);

controller.init();