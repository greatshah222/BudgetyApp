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
        inputBtn:'.add__btn',
        incomeContainer:'.income__list',
        expensesContainer:'.expenses__list'



    }

    return{
        getInput: function(){

            return {
            type: document.querySelector(DOMstrings.inputType).value , // will be either inc or exp
            description : document.querySelector(DOMstrings.inputDescription).value,
            value :parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        addListItem : function(obj,type){
            var html, newHtml,element;
        // Create Html string with place holder text
            
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                
                html =  '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>';
} else if(type === 'exp'){
        element = DOMstrings.expensesContainer;
    
     html =' <div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>  <div class="right clearfix"><div class="item__value"> %value%</div> <div class="item__percentage">21%</div>  <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div> </div>'}
            
                                   
                          
                           
                    
                                   
 // replace place holder test with actual data
                 
 newHtml = html.replace('%id%',obj.id);
 newHtml = newHtml.replace('%description%',obj.description);
 newHtml = newHtml.replace('%value%',obj.value);
  
 
 
 
 
 /// Insert the html into the dom
 document.querySelector(element).insertAdjacentHTML('beforeend',newHtml)
 ;
 
 
 
},       

clearFields : function(){
    var fields, fieldsArr;
    
    // querySelectorall returns us a list instead of an array. List is similar to an array but we need to convert to an array. we can do it by using slice method.we cannot pass directly slice to our list method since it is not an array so we use the prototype properties 
        fields =  document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
        // Array is the function constructor for all array
         fieldsArr = Array.prototype.slice.call(fields);
    // name.foreach(callback function and it can receive upto 3 element(element intself in the array,index value of the array ,array)
    fieldsArr.forEach(function(current , index, array){
        current.value = "";
        
        
    });
    
    fieldsArr[0].focus();
    
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

    var updateBudget = function(){

    // calculate the budget
    // return the budget
    // display the budget on UI


    };


    var ctrlAddItem = function(){
    // get the input field data
    var input = UIctrl.getInput();

    if(input.description !== "" && (input.value >0 && !isNaN(input.value)))
    // add the item to the budget controller
    {
    var newItem = budgetCtrl.addItem(input.type,input.description,input.value);
    // add the item to the UI
        UIctrl.addListItem(newItem,input.type);
        // clear the fiels
        UIctrl.clearFields();
        // calculate and update budget
        updateBudget();
    }

    
 };
 return {
     init: function(){

        console.log('APP STARTED');
        setupEventListner();


     }
 };
})(budgetController,UIController);

controller.init();