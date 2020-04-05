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
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
            data.totals[type]= sum;


        });
    }
// global data model
  var data = {
      allItems:{
          exp:[],
          inc:[]
      },
      totals:{
          exp:0,
          inc:0
      },
      budget:0,
      percentage: -1 // -1 means not existence at this point of time 
  };

  return {
      addItem: function(type,des,val){
          var newItem ; 
           // Create new id 
            // if ther is no item length will be -1
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
      deleteItem:function(type,id){
           var ids = data.allItems[type].map(function(current){
            return current.id;
          });
          index = ids.indexOf(id);
          if(index!== -1){
              data.allItems[type].splice(index,1);
          }
      },
      calculateBudget: function(){
   // Calculate total income and expenses: Since we have to do the same thing 2 times for both the income and expense we create a function here 
   calculateTotal('exp');
   calculateTotal('inc');

   
   
   
   
   // Calculate the budget  :Income - Expense
   
   data.budget  = data.totals.inc - data.totals.exp;
   
   
   // Calculate the percentage of income that we spend
   if(data.totals.inc > 0){
       data.percentage = Math.round((data.totals.exp / data.totals.inc ) * 100);
       
   } else {
       data.percentage = -1;
   }
   
   
   
   
      },
      getBudget:function(){
          return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage : data.percentage
          }

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
        expensesContainer:'.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel:'.budget__income--value',
        expenseLabel:'.budget__expenses--value',
        percentageLabel:'.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'



    };
    var formatNumber=function(num,type){
           
            
        /*
        + or - before the number
        exactlly  2 decimal point
        comma sepearting the thousands
        
        
        2310.4567 -> + 2,310.46
        2000 -> 2,000.00
        */
        num = Math.abs(num);
        num = num.toFixed(2); 
        num = num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

       // method of the number prototype which puts exactly 2 decimal number
        
        
        
        return (type === 'exp' ? '-' : '+')+ ' ' + num ;
        
    };

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
  
deleteListItem: function(selectorID){
    var el = document.getElementById(selectorID);
     el.parentNode.removeChild(el);
     
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

displayBudget: function(obj){
    obj.budget > 0 ? type = 'inc':type = 'exp';
    document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
    document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
    
    document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp,'exp');
    
    
    if(obj.percentage > 0){
    document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
        
    } else{
         document.querySelector(DOMstrings.percentageLabel).textContent = '---';
    }
    


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
        // we will setup an event delegation in the parent element which is container . reason which in the pdf or lecture 90-91
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);



    };

    var updateBudget = function(){

    // calculate the budget
    budgetCtrl.calculateBudget();
    // return the budget
    var budget = budgetCtrl.getBudget();
    // display the budget on UI
    UIctrl.displayBudget(budget);


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
// callback function always has acess to event object 
// to know the target element
 var ctrlDeleteItem = function(event){
     // to move up in the parent we can write parent node
     // we write parent node 4 times because we have to have to move 4 times up  in the parent property
     var itemID, splitID,type,ID;
     itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
     // only want the delete property to trigger if there is only item id and here in our project we have given item id only in this context
     if(itemID){
         
         // th format was inc-1 or exp-8
         // the split divides our inc-1 into ['inc','1]
         splitID = itemID.split('-');
         type = splitID[0];
         ID = parseInt(splitID[1]);
         // delete the item from the data structure
         
         
         budgetCtrl.deleteItem(type,ID);
         // Delete the item from the UI
         UIctrl.deleteListItem(itemID);
         // Update and show the new budget
         
         updateBudget();
         // calculate and update the percentage
         
        // updatePercentage();
         
     }
     

 };
 return {
     init: function(){

        console.log('APP STARTED');
        UIctrl.displayBudget({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage : -1
        });
        
        setupEventListner();


     }
 }
})(budgetController,UIController);

controller.init();