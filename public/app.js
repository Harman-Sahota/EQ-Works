<script>{

  
    /**
     * api used - express,npm,jsdom.node-geocoder.chart.js
     * Populates a HTML table with some data
     * @param {HTMLDivElement} root
     *  
     */
    

    async function tabledata(root){
        
        const table = root.querySelector("table");
        const response = await fetch(root.dataset.url);
        const data = await response.json();

       //cleartable
       table.querySelector("thead tr").innerHTML="";
       table.querySelector("tbody tr").innerHTML="";

       //populate headers
      
       for (const header of data.headers){
           table.querySelector("thead tr").insertAdjacentHTML("beforeend",'<th>'+ header +'</th>');
           
 }

 for(const row of data.rows){
    table.querySelector("tbody").insertAdjacentHTML("beforeend",
    '<tr>'+ '<td>' + 
      row.poi_id + '</td>' +
      '<td>' + 
      row.name + '</td>' +
      '<td>' + 
      row.lat + '</td>' +
      '<td>' + 
      row.lon + '</td>' +
    '</tr>'
    );
}
    }
      
   

        for(const root of document.querySelectorAll(".table-poi[data-url]")){
            const table = document.createElement("table");
            
            
           
            table.classList.add("table" , "table-striped");
            table.id = "table";

            table.innerHTML = '<thead><tr></tr></thead><tbody><tr><td>loading</td></tr></tbody>';

            root.append(table);
           tabledata(root);
        }


         function searchFunc() {
 
            let filter = document.getElementById("search").value.toUpperCase();
            let table = document.getElementById("table");
            let tr = table.getElementsByTagName("tr");

            for (var i=0 ; i<tr.length; i++){
                let td = tr[i].getElementsByTagName('td')[1];

                if(td){
                    let textvalue = td.textContent || td.innerHTML;

                    if(textvalue.toUpperCase().indexOf(filter) > -1){
                        tr[i].style.display = "";
                    } else{
                        tr[i].style.display = "none";
                    }
                }
            }

        }

    
        
    }
</script>
