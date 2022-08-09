function reverseStr(str){
    var listOfChar= str.split('');
    var reversedListOfChar= listOfChar.reverse();

    var reverseStr=reversedListOfChar.join('');
    return reverseStr;
}

function isPalindrome(str){
    var reverse=reverseStr(str);
    if(str=== reverse)
    {
        return true;
    }
    else{
        return false;
    }

}

function convertDateToStr(date){
      var dateStr= {day:'',month:'', year:''};
      if(date.day<10){
        dateStr.day='0'+date.day;
      }
      else{
        dateStr.day= date.day.toString();
      }

      if(date.month<10)
      {
        dateStr.month='0'+date.month;
      }
      else{
        dateStr.month=date.month.to
        dateStr.month=date.month.toString();
      }
      
      dateStr.year=date.year.toString();
      return dateStr;
}

function getAllDateFormats(date){
    var dateStr=convertDateToStr(date);

    var ddmmyyyy= dateStr.day + dateStr.month+ dateStr.year;
    var mmddyyyy= dateStr.month + dateStr.day + dateStr.year;   
    var yyyymmdd=dateStr.year +dateStr.month + dateStr.day;
    var ddmmyy=dateStr.day+ dateStr.month+ dateStr.year.slice(-2);
    var mmddyy= dateStr.month +dateStr.day +dateStr.year.slice(-2);

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy];

}

function checkPalindromeForAllDateFormat(date){
    var listOfPAlindromes= getAllDateFormats(date);
    var Palindrome=false;
    for(var i=0; i<listOfPAlindromes.length;i++)
    {
        if(isPalindrome(listOfPAlindromes[i]))
        
          {  Palindrome=true;
            break;
        }
    }
    return Palindrome;
}

function getNextDate(date)
{
    var day=date.day+1;
    var month=date.month;
    var year=date.year;

    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

    if(month===2)
    {
        if(isLeapYear(year))
        {
           if(day>29)
           {
            day=1;
            month++;
           }
        }
        else
        {
            if(day>28)
            {
                day=1;
                month++; 
            }
        }

    }
    else 
    {
        if(day>daysInMonth[month-1])
        {
            day=1;
            month++;
        }
    }

    if(month>12)
    {
        month=1;
        year++;
    }

    return{
        day:day,
        month:month,
        year:year
    };
            
}        

function isLeapYear(year){
    if(year% 400===0)
    {
        return true;
    }
    
    if(year% 100===0)
    {
        return false;
    }

    if(year% 4 ===0)
    {
      return true;
    }
    return false
}

function getNextPalindromeDate(date){
    var ctr=0;
    var nextDate=getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome= checkPalindromeForAllDateFormat(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate=getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

var inputDate=document.querySelector("#date-input");
var checkButton=document.querySelector("#button");
var resultOutput= document.querySelector("#result-message");

function eventHandler()
{
     var Birthdate=inputDate.value;
     if(Birthdate !== '')
     {
         var listOfDates= Birthdate.split('-');
         console.log(listOfDates);
        var date={
            day: Number(listOfDates[2]),
            month:Number(listOfDates[1]),
            year: Number(listOfDates[0]),
        };
        console.log(date);
    
        var isPalindrome=checkPalindromeForAllDateFormat(date);
        console.log(isPalindrome);
    
        if(isPalindrome)
        {
            resultOutput.innerText="Your Birthdate is a Palindrome";
        }
        else{
            var[ctr,nextDate]=getNextPalindromeDate(date);
            resultOutput.innerText ="No, unfortunately your Birthdate is not a Palindrome. The next palindrome date is " + nextDate.day + "-"+ nextDate.month + "-" + nextDate.year +" . Which is in "+ ctr + " days"; 
        }

    } 
    else
    {
        resultOutput.innerText="please select a date";
    }
}

checkButton.addEventListener('click',eventHandler);