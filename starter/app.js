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
  };
  return {
      addItem: function(type,des,val){
          var newItem ; 
           // Create new id 
            // if ther is no item 
            if( data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;}
                else {
                    ID =0;
                }
 // create new item based on inc or exp type
       

          if(type === 'exp'){
            newItem = new Expense(ID,des,val);

          } else if(type === 'inc'){
              newItem = new Income(ID,des,val);
          } 
          data.allItems[type].push(newItem);
          return newItem;

      },
      testing:function(){
          console.log(data);
      }
  };

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
    // add the item to the budget controller
     var newItem = budgetCtrl.addItem(input.type,input.description,input.value);
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