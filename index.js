import { Parking } from './parking.js'
import {CONSTANTS} from './constants.js'

let parking = new Parking()
let parkSpace = parking.getMap()

let divTable = document.getElementById('divTable');


document.getElementById("submit").addEventListener("click", findParkingSlot);

function findParkingSlot () {
    let size = document.getElementById("size").value; 
    let ent = document.getElementById("entrance").value; 
    if(!parking.park(size, ent)) {
        alert("No available parking space");
    } else {
        divTable.removeChild(divTable.firstElementChild);
        createMap()
    }
    // parking.park(size, ent)
    
  }

function createMap () {
    var table = document.createElement("TABLE");
    table.setAttribute("id", "myTable");
    table.setAttribute("class", "myTable");
    table.setAttribute("border", "1");
    divTable.appendChild(table);

    var x=document.getElementById('myTable');
    for(var r=0;r<parseInt(CONSTANTS.MAX_COLS,10);r++)
    {
        var x1 =x.insertRow(r);
     for(var c=0;c<parseInt(CONSTANTS.MAX_ROWS,10);c++)  
      {
          var y =  x1.insertCell(c);
         
          
          if ( parkSpace[c][r] !== "gateway" ) {
                          let p = parkSpace[c][r]
                        //   y.innerHTML="Row-"+p.row+" Column-"+p.col+"Occupied"+p.isAvailable+"Value"+p.size.value; 
                       createBox(y, p)
                    }else{
                          y.innerHTML="gateway";
                          
                      }
                      for(var entrance=0;entrance<CONSTANTS.ENTRANCE.length;entrance++){
                          let enPoint = CONSTANTS.ENTRANCE[entrance]
                          
                          if(enPoint.row == r && enPoint.col == c){
                              y.innerHTML="Entrance"+ enPoint.name;
                          }
                      }
      }
     }
}

function createBox(y, p) {
    let available;
    let vehicle = "";
    let textColor = "text-primary"
    if (p.isAvailable == false){
        available = "Available"
    }
    else{
        available = "Occupied"
        vehicle = "Vehicle size: "+ p.vehicle
        textColor = "text-danger"
    }
    p.isAvailabe
    y.innerHTML = `<div class="card" style="width: 18rem;">
        <div class="card-body Available">
        <h5 class="card-title ${textColor}" id = "">${available}</h5>
        <h5 class="card-subtitle mb-2 text-muted">Parking lot size: ${p.size.desc}</h5>
        <h5 class="card-subtitle mb-2 text-muted">${vehicle}</h5>
        </div>
        </div>`

}
createMap()