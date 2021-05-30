$(function()
{
   var elemt = document.getElementById("devToolDiv");
   var tab = document.getElementById("devTool");
   setTab(elemt, tab);

   function reset()
   {
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
         tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablink");
      for (i = 0; i < tablinks.length; i++) {
         tablinks[i].style.backgroundColor = "";
      }
   }

   function setTab(elemt, tab)
   {
      reset();
      elemt.style.display="block";
      tab.style.backgroundColor="green";
   }


   $('#devTool').on('click', function()
   {
      var elemt = document.getElementById("devToolDiv");
      var tab = document.getElementById("devTool");
      setTab(elemt, tab);
   });

   $('#apiTool').on('click', function()
   {
      var elemt = document.getElementById("apiToolDiv");
      var tab = document.getElementById("apiTool");
      setTab(elemt, tab);
      //$('#aboutDiv').css("display", "block");
   });

   function getReplacedString(input, find, replace)
   {
      find = new RegExp(find, 'g');
      if(document.getElementById('replaceNewLine').checked) 
      {
         return input.split(find).join("\n")
      }
      find = new RegExp(find, 'g');
      return input.replace(find, replace)
   }

   function checkFieldsAndReplace(elements)
   {
      var input, find, replace;
      input = elements[0].value;
      find = elements[1].value;
      replace = elements[2].value;
      if(input == '')
      {
         alert("Input Field is Mandatory");
      }
      else
      {
         $('#outputField').val(getReplacedString(input, find, replace));
      }
   
   }

   $('#compute').on('click', function()
      {
         var input =  document.getElementById("input");
         var find = document.getElementById("findField");
         var replace = document.getElementById("replaceField");
         checkFieldsAndReplace([input, find, replace]);
      }
   );
   $('#outputField').on('click', function()
   {
      var copyText = document.getElementById("outputField");

      /* Select the text field */
      copyText.select();    
      /* Copy the text inside the text field */
      document.execCommand("copy");
      /* Alert the copied text */

   });
});
